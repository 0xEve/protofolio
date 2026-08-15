// setup.js
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const bundlePath = path.join(__dirname, "project.bundle.txt");
if (!fs.existsSync(bundlePath)) {
  console.error("project.bundle.txt not found. Put it in the same folder as setup.js and try again.");
  process.exit(1);
}

const raw = fs.readFileSync(bundlePath, "utf8");
const lines = raw.split(/\r?\n/);
const marker = /^===== FILE: (.+?) =====\s*$/;

const files = [];
let current = null;
let buffer = [];

for (const line of lines) {
  const m = line.match(marker);
  if (m) {
    if (current) files.push({ path: current, content: buffer.join("\n") });
    current = m[1].trim();
    buffer = [];
  } else if (current) {
    buffer.push(line);
  }
}
if (current) files.push({ path: current, content: buffer.join("\n") });

if (!files.length) {
  console.error("No files found in the bundle. Check project.bundle.txt format.");
  process.exit(1);
}

for (const f of files) {
  const target = path.join(__dirname, f.path);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, f.content.replace(/\n+$/, "") + "\n", "utf8");
  console.log("  created: " + f.path);
}

console.log("\nAll files created: " + files.length);
console.log("Running npm install...\n");

const isWin = process.platform === "win32";
const npm = spawn(isWin ? "npm.cmd" : "npm", ["install"], { stdio: "inherit" });
npm.on("error", () => {
  console.log("\nCould not run npm automatically. Run manually:\n  npm install\n  npm run dev");
});
npm.on("close", (code) => {
  if (code === 0) {
    console.log("\nReady! Start the site:\n  npm run dev\nThen open http://localhost:3000");
    console.log("Tip: put your CV at public/resume.pdf so the Download CV button works.");
  } else {
    console.log("\nnpm install exited with code " + code + ". Try manually:\n  npm install\n  npm run dev");
  }
});
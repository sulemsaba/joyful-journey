import { spawn } from "child_process";
import path from "path";

const viteBin = path.resolve("/home/z/my-project/node_modules/vite/bin/vite.js");

function startVite() {
  const child = spawn("node", [viteBin, "--port", "3000", "--host", "0.0.0.0"], {
    cwd: "/home/z/my-project",
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    console.log(`Vite exited with code ${code}, restarting in 2s...`);
    setTimeout(startVite, 2000);
  });

  child.on("error", (err) => {
    console.error(`Vite error: ${err.message}, restarting in 2s...`);
    setTimeout(startVite, 2000);
  });
}

startVite();

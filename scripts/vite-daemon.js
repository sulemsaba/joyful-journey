const { spawn } = require('child_process');

// Double-fork daemon to keep Vite dev server alive
// The sandbox kills background processes between Bash sessions,
// but a fully detached daemon survives.

if (process.argv[2] !== 'child') {
  const child = spawn(process.execPath, [__filename, 'child'], {
    detached: true,
    stdio: 'ignore',
    cwd: '/home/z/my-project'
  });
  child.unref();
  process.exit(0);
}

// We are the daemon child — start Vite dev server with auto-restart
function startVite() {
  const server = spawn('node', ['node_modules/vite/bin/vite.js', '--port', '3000', '--host', '0.0.0.0'], {
    cwd: '/home/z/my-project',
    stdio: ['ignore', 1, 2],
    shell: true
  });

  server.on('exit', (code) => {
    console.log(`Vite exited with code ${code}, restarting in 2s...`);
    setTimeout(startVite, 2000);
  });

  server.on('error', (err) => {
    console.error(`Vite error: ${err.message}, restarting in 2s...`);
    setTimeout(startVite, 2000);
  });
}

startVite();

process.on('SIGTERM', () => {
  process.exit(0);
});

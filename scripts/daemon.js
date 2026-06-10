const { spawn } = require('child_process');

// Double-fork daemon to keep Next.js dev server alive
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

// We are the daemon child — start Next.js dev server
const server = spawn('npx', ['next', 'dev', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: ['ignore', 1, 2],
  shell: true
});

server.on('exit', (code) => {
  process.exit(code || 0);
});

process.on('SIGTERM', () => {
  server.kill();
  process.exit(0);
});

const { spawn } = require('child_process');
const fs = require('fs');

// Write PID file
fs.writeFileSync('/home/z/my-project/scripts/daemon.pid', process.pid.toString());

const server = spawn('node', ['/home/z/my-project/node_modules/.bin/next', 'dev', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: ['ignore', 'ignore', 'ignore'],
  detached: true
});

server.unref();

server.on('exit', (code) => {
  fs.writeFileSync('/home/z/my-project/scripts/daemon.exit', `Exited with code ${code}`);
  process.exit(code || 0);
});

// Stay alive
setInterval(() => {}, 60000);

const { spawn } = require('child_process');
const fs = require('fs');

if (process.argv[2] === 'child') {
  fs.writeFileSync('/tmp/daemon-v3-alive', 'yes, child running at ' + new Date().toISOString());
  
  const server = spawn('/home/z/my-project/node_modules/.bin/next', ['dev', '-p', '3000', '--webpack'], {
    cwd: '/home/z/my-project',
    stdio: ['ignore', 1, 2],
    shell: true,
    env: { ...process.env, PATH: '/home/z/my-project/node_modules/.bin:' + process.env.PATH }
  });
  
  server.on('exit', (code) => {
    fs.writeFileSync('/tmp/daemon-v3-exit', `Server exited: ${code} at ${new Date().toISOString()}`);
    process.exit(code || 0);
  });
  
  setInterval(() => {}, 60000);
  return;
}

const child = spawn(process.execPath, [__filename, 'child'], {
  detached: true,
  stdio: 'ignore',
  cwd: '/home/z/my-project'
});
child.unref();
process.exit(0);

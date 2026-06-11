// Vite dev server wrapper as a mini-service
import { spawn } from 'child_process';

const child = spawn('npx', ['vite', '--port', '3000', '--host'], {
  cwd: '/home/z/my-project',
  stdio: 'inherit',
  shell: true,
  detached: true,
});

child.unref();

console.log(`Vite dev server started with PID ${child.pid}`);

// Keep the process alive
process.on('SIGTERM', () => {
  child.kill();
  process.exit(0);
});

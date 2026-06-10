// Next.js dev server wrapper as a mini-service
// This ensures the server persists independently
import { spawn } from 'child_process';

const child = spawn('npx', ['next', 'dev', '-p', '3000'], {
  cwd: '/home/z/my-project',
  stdio: 'inherit',
  shell: true,
  detached: true,
});

child.unref();

console.log(`Next.js dev server started with PID ${child.pid}`);

// Keep the process alive
process.on('SIGTERM', () => {
  child.kill();
  process.exit(0);
});

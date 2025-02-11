// build-backend.js
const { execSync } = require('child_process');

try {
  if (process.platform === 'win32') {
    execSync('pnpm run build:backend:windows', { stdio: 'inherit' });
  } else if (process.platform === 'darwin') {
    execSync('pnpm run build:backend:macos', { stdio: 'inherit' });
  } else {
    console.error(`Unsupported platform: ${process.platform}`);
    process.exit(1);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

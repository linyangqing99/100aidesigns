import { spawnSync } from 'node:child_process';
import { cp, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const site = new URL('designs/013-offscript/site/', root);
const destination = new URL('public/studies/013-offscript/', root);
const result = spawnSync('npm', ['run', 'build', '--', '--base=/studies/013-offscript/'], {
  cwd: fileURLToPath(site), stdio: 'inherit', shell: false,
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);

// Only replace this case's generated output, after its build succeeds.
await mkdir(new URL('public/studies/', root), { recursive: true });
await rm(destination, { recursive: true, force: true });
await cp(new URL('dist/', site), destination, { recursive: true });
console.log('OFFSCRIPT packaged at /studies/013-offscript/');

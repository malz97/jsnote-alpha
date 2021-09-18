import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'Port to run server on', '4005')
  .action((filename: string = 'notebook.js', options: { port: string }) => {
    const { port } = options;
    const parsedPort = Number.parseInt(port);
    const dir = path.join(process.cwd(), path.dirname(filename));
    serve(parsedPort, path.basename(filename), dir);
  });

import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'Port to run server on', '4005')
  .action(
    async (filename: string = 'notebook.js', options: { port: string }) => {
      const { port } = options;
      const parsedPort = Number.parseInt(port);
      const dir = path.join(process.cwd(), path.dirname(filename));

      try {
        await serve(parsedPort, path.basename(filename), dir, !isProduction);
        const successMessage = `Opened ${filename}. Navigate to http://localhost:${port} to edit the file.`;
        console.log(successMessage);
      } catch (err: any) {
        if (err.code === 'EADDRINUSE')
          console.error(
            'Port is already in use. Try running on a different port'
          );
        if (err.code !== 'EADDRINUSE') console.log('Problem is:', err.message);
        process.exit(1);
      }
    }
  );

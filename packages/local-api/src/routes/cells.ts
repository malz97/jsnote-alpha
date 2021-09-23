import express from 'express';
import path from 'path';
import fs from 'fs/promises';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const fullPath = path.join(dir, filename);

  router.get('/cells', async (request, response) => {
    // Read the file
    // If read throws error, inspect error if it says file does not existw
    try {
      const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
      response.send(JSON.parse(result));
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8');
        response.send([]);
      } else {
        throw error;
      }
    }
    // Parse a list of cells out of it
    // Send list of cells back to browser
  });

  router.post('/cells', async (request, response) => {
    // Make sure file exists
    // Take the list of cells from request object
    // Serialize them
    const { cells }: { cells: Cell[] } = request.body;
    // Write the list of cells to file
    await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    response.send({ status: 'ok' });
  });

  return router;
};

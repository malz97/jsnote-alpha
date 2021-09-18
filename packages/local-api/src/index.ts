export const serve = (port: number, filename: string, dir: string) =>
  console.log(
    `Serving traffic on port ${port}, saving/fetching cells from ${filename}, from ${dir}.`
  );

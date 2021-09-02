import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

const App = () => {
  const [input, setInput] = useState('');
  const serviceRef = useRef<any>();
  const iframeRef = useRef<any>();

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };
  const onClick = async () => {
    if (!serviceRef.current) return;
    // Resetting iframe
    iframeRef.current.srcdoc = html;
    const result = await serviceRef.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    const { outputFiles } = result;
    const [data] = outputFiles;
    iframeRef.current.contentWindow.postMessage(data.text, '*');
  };

  useEffect(() => {
    startService();
  }, []);

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          } catch(err) {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}>
        Hello world!
      </textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe
        title='code-preview'
        ref={iframeRef}
        srcDoc={html}
        sandbox='allow-scripts'
      ></iframe>
    </div>
  );
};

export default App;

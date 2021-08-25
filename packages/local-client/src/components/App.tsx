import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const serviceRef = useRef<any>();

  const startService = async () => {
    serviceRef.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };
  const onClick = async () => {
    if (!serviceRef.current) return;
    const result = await serviceRef.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });
    setCode(result.code);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea value={input} onChange={e => setInput(e.target.value)}>
        Hello world!
      </textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;

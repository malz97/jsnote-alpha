import { useRef, useEffect } from 'react';

import './styles/preview.css';

interface PreviewProps {
  code: string;
  bundlingStatus: string;
}

const html = `
  <html>
    <head>
      <style>html {background-color: white;}</style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        };

        // Catches asynchronous errors
        window.addEventListener('error', (event) => {
          event.preventDefault();
          handleError(event.error);
        })

        window.addEventListener('message', (event) => {
          try{
            eval(event.data);
          } catch(err) {
            handleError(err);
          }
        }, false);
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframeRef = useRef<any>();

  useEffect(() => {
    iframeRef.current.srcDoc = html;
    setTimeout(() => {
      iframeRef.current.contentWindow.postMessage(code, '*');
    }, 50);
  }, [code]);
  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        sandbox='allow-scripts'
        ref={iframeRef}
        srcDoc={html}
      />
      {bundlingStatus && <div className='preview-error'>{bundlingStatus}</div>}
    </div>
  );
};

export default Preview;

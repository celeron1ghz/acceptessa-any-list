import { useState, useEffect } from 'react';

export default function BrowserQrReader() {
  const [error, setError] = useState();

  useEffect(() => {
    if (typeof BarcodeDetector === 'undefined') {
      setError(1);
    }
  }, []);

  if (error) {
    return <div className='container' style={{ paddingTop: '8vh' }}>
      BarcodeDetectorに対応していません。ブラウザのQRリーダーか物理リーダーを利用してください。
    </div>
  }

  return (
    <div className='container_' style={{ paddingTop: '8vh' }}>
      <div style={{ border: '1px solid black' }}>
      </div>
      BrowserQr
    </div>
  );
}
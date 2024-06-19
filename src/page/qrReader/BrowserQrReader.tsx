import { useState, useEffect } from 'react';

import Container from '../../component/Container'

export default function BrowserQrReader() {
  const [error, setError] = useState();

  useEffect(() => {
    if (typeof BarcodeDetector === 'undefined') {
      setError(1);
    }
  }, []);

  if (error) {
    return (
      <Container>
        <div className="pico-background-pink-150" style={{ padding: '2vw 3vw', borderRadius: '3vw' }}>
          BarcodeDetectorに対応していません。ブラウザのQRリーダーか物理リーダーを利用してください。
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div style={{ border: '1px solid black' }}>
      </div>
      BrowserQr
    </Container>
  );
}
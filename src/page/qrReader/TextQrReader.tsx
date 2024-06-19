import { useState } from 'react';


export default function TextQrReader() {
  const [error, setError] = useState();

  return (
    <div className='container' style={{ paddingTop: '8vh' }}>
      <div style={{ border: '1px solid black' }}>
      </div>
      TextQr
    </div>
  );
}

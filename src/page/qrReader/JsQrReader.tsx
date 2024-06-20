// import { useState } from 'react';

import { useEffect, useRef, useState } from 'react';
import jsQr from 'jsqr';

import Alert from '../../component/Alert';
import Container from '../../component/Container'

type CAMERA_LOADING = {
  mode: 'CAMERA_LOADING',
};

type CAMERA_LOAD_ERROR = {
  mode: 'CAMERA_LOAD_ERROR',
  error: String,
};

type CAMERA_READY = {
  mode: 'CAMERA_READY',
};

type DUPLICATE_CODE = {
  mode: 'DUPLICATE_CODE',
};

type API_CALLING = {
  mode: 'API_CALLING',
};

type API_CALL_OK = {
  mode: 'API_CALL_OK',
  param: Object,
};

type API_CALL_ERROR = {
  mode: 'API_CALL_ERROR',
  param: Object,
};

type STATUS = CAMERA_LOADING | CAMERA_LOAD_ERROR | CAMERA_READY | DUPLICATE_CODE | API_CALLING | API_CALL_OK | API_CALL_ERROR

const videoWidth = 750;
const videoHeight = 750;

export default function JsQrReader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<STATUS>({ mode: 'CAMERA_LOADING' });
  const [lastSuccessCode, setLastSuccessCode] = useState<String>();

  // カメラを起動してvideo要素に接続する
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { ideal: videoWidth },
          height: { ideal: videoHeight },
          facingMode: {
            ideal: 'environment',
          },
          frameRate: {
            ideal: 10,
            max: 30,
          }
        }
      })
      .then(function (stream) {
        setState({ mode: 'CAMERA_READY' });

        if (!videoRef.current) {
          return;
        }

        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = function (e) {
          if (!videoRef.current) {
            return;
          }

          videoRef.current.play()
            // .then(() => { console.log("video tag ready to read") })
            .then(() => setState({ mode: 'CAMERA_READY' }))
            .catch(() => setState({ mode: 'CAMERA_LOAD_ERROR', error: 'video element play error' }));
        }
      })
      .catch((err) => {
        console.log("Error on getUserMedia():", err)
        setState({ mode: 'CAMERA_LOAD_ERROR', error: err.toString() });
      })
  }, []);

  // QRを読み取ってサーバーと通信する
  useEffect(() => {
    const id = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) {
        return;
      }

      const context = canvasRef?.current?.getContext('2d');
      const video = videoRef?.current;

      if (!context) {
        return;
      }

      if (state.mode !== 'CAMERA_READY') {
        // console.log(state.mode, "processing...");
        return;
      }

      // 画像を処理していく
      context.beginPath();
      context.fillStyle = 'rgb(0, 0, 0)';
      context.fillRect(0, 0, 500, 500);

      const w = canvasRef.current.width;
      const h = canvasRef.current.height;

      context.drawImage(video, 0, 0, w, h);
      const imageData = context.getImageData(0, 0, w, h);

      const ret = jsQr(imageData.data, w, h);

      if (ret && ret.data) {
        const code = ret.data;

        // 最後に読んだコードと同じだった場合はAPIを呼ばない。
        // 画面をチカチカさせてそれっぽくする
        if (lastSuccessCode == code) {
          setState({ mode: 'DUPLICATE_CODE' });

          setTimeout(() => {
            setState({ mode: 'CAMERA_READY' });
          }, 1000);
          return;
        }

        // 重複していないのでAPIを呼ぶ
        console.log("call api...")
        setState({ mode: 'API_CALLING' });

        setTimeout(() => {
          // 成功時
          setLastSuccessCode(code);
          setState({ mode: 'API_CALL_OK', param: {} });

          setTimeout(() => {
            setState({ mode: 'CAMERA_READY' });
          }, 500);

          // 失敗時
          // setState({ mode: 'API_CALL_ERROR', param: {} });

          // setTimeout(() => {
          //   setState({ mode: 'CAMERA_READY' });
          // }, 2000);
        }, 1000);
      } else {
        setState({ mode: 'CAMERA_READY' });
      }
    }, 100);

    return () => { clearInterval(id) };
  }, [state]);

  if (state.mode == 'CAMERA_LOADING') {
    return <Container>
      <Alert color='azure'>
        カメラを読み込み中です..
      </Alert>
    </Container>
  }

  if (state.mode == 'CAMERA_LOAD_ERROR') {
    return <Container>
      <Alert color='pink'>
        カメラが無いか、カメラの利用が拒否されたか、カメラの起動時にエラーが発生しました。カメラの設定を確認してください。
        <br />
        ({state.error})
      </Alert>
    </Container>
  }

  return (
    <Container>
      <h4>ブラウザQRリーダー読取画面</h4>
      <div style={{ height: '100vw' }}>
        <video
          ref={videoRef}
          style={{ border: "1px solid grey", margin: "0 -1rem", width: "100vw", height: '100vw', }}
          autoPlay
          playsInline
        />
        <div style={{ position: 'relative', top: '-100vw', height: '100vw', paddingTop: '2vw' }}>
          {
            state.mode === 'CAMERA_READY' &&
            <Alert color='azure'>
              QRコードを読み込んでください
            </Alert>
          }
          {
            state.mode === 'API_CALLING' &&
            <Alert color='amber'>
              サーバーに問合わせ中...
            </Alert>
          }
          {
            state.mode === 'DUPLICATE_CODE' &&
            <Alert color='pink'>
              前回読み込んだ値と同じ値です。追加するには下部のプラスボタンを押してください。
            </Alert>
          }
          {
            state.mode === 'API_CALL_OK' &&
            <Alert color='lime'>
              処理が完了しました！
            </Alert>
          }
          {
            state.mode === 'API_CALL_ERROR' &&
            <Alert color='pink'>
              処理が正しく完了しませんでした。
            </Alert>
          }
        </div>
      </div>
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid grey", margin: "0 -1rem", width: "100vw", height: '100vw', display: 'none' }}
        width={videoWidth}
        height={videoHeight}
      />
      <button style={{ padding: '1vw 2vw' }}>aaa</button>
      <div>
        最後に読み取りが成功したコード {lastSuccessCode}
      </div>
    </Container>
  );
}
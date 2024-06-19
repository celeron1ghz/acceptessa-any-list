import { useState, useRef } from 'react';

import Container from '../../component/Container'

type TEXT_INPUT_BLUR = {
  mode: 'TEXT_INPUT_BLUR',
  inputDisabled: false,
  message: 'テキストボックスにフォーカスを合わせてください',
  messageColor: 'pico-background-azure-100',
};

type TEXT_INPUT_FOCUS = {
  mode: 'TEXT_INPUT_FOCUS',
  inputDisabled: false,
  message: 'QRリーダーで読み取りを行ってください',
  messageColor: 'pico-background-indigo-100',
};

type TEXT_SENDING = {
  mode: 'TEXT_SENDING',
  inputDisabled: true,
  message: 'サーバーに問合わせ中...',
  messageColor: 'pico-background-amber-100',
};

type TEXT_RESULT_OK = {
  mode: 'TEXT_RESULT_OK',
  inputDisabled: false,
  message: '処理が完了しました',
  messageColor: 'pico-background-green-100',
}

type STATUS = TEXT_INPUT_BLUR | TEXT_INPUT_FOCUS | TEXT_SENDING | TEXT_RESULT_OK;

export default function TextQrReader() {
  const input = useRef<HTMLInputElement>(null);

  const [textBoxValue, setTextBoxValue] = useState<string>('');
  const [state, setState] = useState<STATUS>({ mode: 'TEXT_INPUT_BLUR', inputDisabled: false, message: 'テキストボックスにフォーカスを合わせてください', messageColor: 'pico-background-azure-100' });
  const [lastScanned, setLastScanned] = useState<{ serial: string, time: Date } | null>(null);

  const issueTicket = (e) => {
    if (e.key === 'Enter') {
      setState({ mode: 'TEXT_SENDING', inputDisabled: true, message: 'サーバーに問合わせ中...', messageColor: 'pico-background-amber-100' });

      setTimeout(() => {
        setTextBoxValue('');
        setState({ mode: 'TEXT_RESULT_OK', inputDisabled: false, message: '処理が完了しました', messageColor: 'pico-background-green-100' });
        setLastScanned({ serial: textBoxValue, time: new Date() });
        setTimeout(() => {
          input.current?.focus();
        }, 300);
      }, 500);
    }
  };

  return (
    <Container>
      <h4>物理QRリーダー読取画面</h4>
      <div className={"outline " + state.messageColor} style={{ padding: '2vw', margin: '4vw 0' }}>
        {state.message}
        {
          state.mode === 'TEXT_SENDING' &&
          ' (値=' + textBoxValue + ')'
        }
      </div>
      <input
        type="text"
        style={{ fontFamily: 'monospace', borderColor: state.mode === 'TEXT_INPUT_BLUR' ? 'red' : '' }}
        onFocus={() => setState({ mode: 'TEXT_INPUT_FOCUS', inputDisabled: false, message: 'QRリーダーで読み取りを行ってください', messageColor: 'pico-background-indigo-100', })}
        onBlur={() => setState({ mode: 'TEXT_INPUT_BLUR', inputDisabled: false, message: 'テキストボックスにフォーカスを合わせてください', messageColor: 'pico-background-azure-100', })}
        onKeyDown={issueTicket}
        onChange={e => setTextBoxValue(e.target.value)}
        disabled={state.inputDisabled}
        placeholder={state.mode === 'TEXT_INPUT_BLUR' ? '！！ここにフォーカスを合わせて！！' : ''}
        value={textBoxValue}
        ref={input}
      />
      ※日本語入力をオフにしてください
      {
        lastScanned &&
        <div>
          <h4>スキャンした値</h4>
          <div>{lastScanned.serial}</div>
          <h4>読込日付</h4>
          <div>{lastScanned.time.toISOString()} ({Math.floor((new Date().getTime() - lastScanned.time.getTime()) / 1000)}sec ago)</div>
        </div>
      }
    </Container>
  );
}

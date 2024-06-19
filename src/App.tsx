// import { useState } from 'react'
import { useState, useEffect } from 'react';
import { Switch, Router, Route, Link, useRoute } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faQrcode, faBarcode, faBars } from '@fortawesome/free-solid-svg-icons'

import Header from './Header'
import BrowserQrReader from './page/qrReader/BrowserQrReader'
import JsQrReader from './page/qrReader/JsQrReader'
import TextQrReader from './page/qrReader/TextQrReader'

function Container(prop: { children: React.ReactNode }) {
  return <div className='container' style={{ paddingTop: '8vh' }}>
      {prop.children}
  </div>
}

function App() {
  // const [user, setUser] = useState<any>(null);
  const [user, setUser] = useState<any>({ userId: 'moge' });

  if (!user) {
    return (
      <>
        <Header user={null} />
        <div className='container' style={{ paddingTop: '8vh' }}>
          <div>ログインしてください</div>
        </div>
      </>
    );
  }

  return (
    <Switch>
      <Router hook={useHashLocation}>
        <Header user={user} />
        <Route path="/" component={Root} />
        <Route path="/list/:id/menu" component={ListMenu} />
        <Route path="/list/:id/desc" component={ListDesc} />
        <Route path="/list/:id/qrReader/browser" component={BrowserQrReader} />
        <Route path="/list/:id/qrReader/js" component={JsQrReader} />
        <Route path="/list/:id/qrReader/text" component={TextQrReader} />
      </Router>
    </Switch>
  )
}

function LinkButton(prop: { href: string, label: any }) {
  return <Link role="button" type='button' style={{ width: "100%", margin: "1vw 0", textAlign: 'left' }} href={prop.href} {...prop}>
    {prop.label}
  </Link>;

}

function Root() {
  const [list, setList] = useState<Array<{ id: Integer; name: string }>>([
    { id: 111, name: 'あいうえお1' },
    { id: 222, name: 'あいうえお2' },
  ]);

  return <div className='container' style={{ paddingTop: '8vh' }}>
    <nav aria-label="breadcrumb">
      <ul>
        <li>リスト選択</li>
      </ul>
    </nav>
    {
      list.map(
        l => <LinkButton key={l.id} href={'/list/' + l.id + '/menu'} label={l.name} />
      )
    }
  </div >
}

function ListMenu() {
  const [match, params] = useRoute("/list/:id/menu");
  const listId = params?.id;

  return (
    <div className='container' style={{ paddingTop: '8vh' }}>
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link href="/">リスト選択</Link></li>
          <li>メニュー({listId})</li>
        </ul>
      </nav>
      <div>
        <h4>QRリーダーの起動</h4>
        <Link role="button" type='button' className="outline" style={{ width: "100%", margin: "1vw 0", textAlign: 'left' }} href={'/list/' + listId + '/qrReader/js'}><FontAwesomeIcon icon={faQrcode} /> QRリーダーを起動</Link>
        <Link role="button" type='button' className="outline" style={{ width: "100%", margin: "1vw 0", textAlign: 'left' }} href={'/list/' + listId + '/qrReader/browser'}><FontAwesomeIcon icon={faQrcode} /> QRリーダーを起動(experimental)</Link>
        <Link role="button" type='button' className="outline" style={{ width: "100%", margin: "1vw 0", textAlign: 'left' }} href={'/list/' + listId + '/qrReader/text'}><FontAwesomeIcon icon={faBarcode} /> 物理QRリーダー用画面を表示</Link>
      </div>
      <div>
        <h4>一覧</h4>
        <LinkButton href={'/list/' + listId + '/desc'} label={<><FontAwesomeIcon icon={faBars} /> 一覧を表示</>} />
        <LinkButton href={'/list/' + listId + '/setting'} label={<><FontAwesomeIcon icon={faCog} /> 設定</>} />
      </div>
    </div>
  )
}

function ListDesc() {
  const [match, params] = useRoute("/list/:id/desc");
  const listId = params?.id;

  // const [showSearch, setSearch] = useState<boolean>(false);
  const [showConfig, setConfig] = useState<boolean>(false);
  const [showDescription, setDescription] = useState<boolean>(false);

  return <div className='container' style={{ paddingTop: '8vh' }}>
    <div>
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link href="/">リスト選択</Link></li>
          <li><Link href={'/list/' + listId + '/menu'}>メニュー({listId})</Link></li>
          <li>一覧</li>
        </ul>
      </nav>
    </div>
    <form role="search">
      <input name="search" type="search" placeholder="検索" />
      <input type="submit" value="Search" />
    </form>

    <dialog open={showConfig}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={() => setConfig(false)}></button>
          <p>
            <strong>設定</strong>
          </p>
        </header>
        <p>
          We're excited to have you join us for our
          upcoming event. Please arrive at the museum
          on time to check in and get started.
        </p>
        <ul>
          <li>Date: Saturday, April 15</li>
          <li>Time: 10:00am - 12:00pm</li>
          <li>Time: 10:00am - 12:00pm</li>
        </ul>
      </article>
    </dialog>

    <dialog open={showDescription}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={() => setConfig(false)}></button>
          <p>
            <strong>詳細</strong>
          </p>
        </header>
        <p>
          We're excited to have you join us for our
          upcoming event. Please arrive at the museum
          on time to check in and get started.
        </p>
        ああああ
      </article>
    </dialog>

    <table className='striped'>
      <thead>
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>上限数</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>aaaa</td>
          <td>aaaa</td>
          <td>aaaa</td>
        </tr>
        <tr>
          <td>aaaa</td>
          <td>aaaa</td>
          <td>aaaa</td>
        </tr>
      </tbody>
    </table>
  </div>
}

export default App

import { useState } from 'react';
import { Switch, Router, Route } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';

import Header from './Header'
import Root from './page/RootPage';
import ListMenu from './page/MenuPage';
import ListDesc from './page/DescPage';

import BrowserQrReader from './page/qrReader/BrowserQrReader'
import JsQrReader from './page/qrReader/JsQrReader'
import TextQrReader from './page/qrReader/TextQrReader'

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

export default App

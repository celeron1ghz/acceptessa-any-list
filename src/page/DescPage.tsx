import { useState } from 'react';
import { Link, useRoute } from 'wouter';

import Container from '../component/Container';

export default function ListDesc() {
  const [match, params] = useRoute("/list/:id/desc");
  const listId = params?.id;

  // const [showSearch, setSearch] = useState<boolean>(false);
  const [showConfig, setConfig] = useState<boolean>(false);
  const [showDescription, setDescription] = useState<boolean>(false);

  return (
    <Container>
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
    </Container>
  );
}
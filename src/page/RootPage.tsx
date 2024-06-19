import { useState } from 'react';
import LinkButton from '../component/LinkButton';

export default function Root() {
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
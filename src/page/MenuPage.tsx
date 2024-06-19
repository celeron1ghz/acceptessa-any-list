
import { Link, useRoute } from 'wouter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faQrcode, faBarcode, faBars } from '@fortawesome/free-solid-svg-icons'

import Container from '../component/Container';
import LinkButton from '../component/LinkButton';

export default function ListMenu() {
  const [match, params] = useRoute("/list/:id/menu");
  const listId = params?.id;

  return (
    <Container>
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
    </Container>
  )
}
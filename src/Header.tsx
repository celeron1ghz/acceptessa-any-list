export default function Example(param: { user: { userId: string } | null }) {
  return (
    <div className='container-fluid' style={{ position: 'fixed' }}>
      <nav>
        <ul>
          <li>
            <strong>
              <a href="#/" style={{ color: 'none' }}>
                テッサのなんでもリスト
              </a>
            </strong>
          </li>
        </ul>
        <ul>
          {/* <li><a href="#" className="contrast">About</a></li> */}
          {/* <li><a href="#" className="contrast">Services</a></li> */}
          {
            param.user &&
            <li>ログイン中：{param.user.userId}</li>
          }
        </ul>
      </nav>
    </div>
  )
}

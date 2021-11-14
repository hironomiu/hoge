import Chat from './Chat'

const Main = () => {
  return (
    <>
      <header>ヘッダー</header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '10px',
          marginBottom: '10px',
        }}
      >
        <Chat key="1" />
        <Chat key="2" />
        <Chat key="3" />
      </div>

      <footer>フッター</footer>
    </>
  )
}

export default Main

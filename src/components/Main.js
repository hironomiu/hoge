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
        <Chat />
        <Chat />
        <Chat />
      </div>

      <footer>フッター</footer>
    </>
  )
}

export default Main

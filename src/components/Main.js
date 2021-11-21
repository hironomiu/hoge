import React from 'react'
import { Chat } from './Chat'

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
        <Chat key="1" value={1} />
        {/* <Chat value={2} />
        <Chat value={3} /> */}
      </div>

      <footer>フッター</footer>
    </>
  )
}

export default Main

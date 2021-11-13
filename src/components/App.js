import React, { useState } from 'react'
import Login from './Login'
import Main from './Main'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)

  return <>{isLogin ? <Main /> : <Login setIsLogin={setIsLogin} />}</>
}

export default App

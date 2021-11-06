import React, { useState, useEffect } from 'react'
import {
  updateMessage,
  deleteMessage,
  messagesRef,
  pushMessage,
  githubProvider,
  socialMediaAuth,
} from '../firebase'

const App = () => {
  const [name, setName] = useState('default')
  const [text, setText] = useState('text')
  const [messages, setMessages] = useState([])
  const [update, setUpdate] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const handleOnClick = async (provider) => {
    const res = await socialMediaAuth(provider)
    console.log(res)
    if (res.displayName) {
      setIsLogin(true)
      getMessages()
    } else {
      console.log(res)
    }
  }

  const getMessages = () => {
    messagesRef
      .orderByKey()
      .limitToLast(10)
      .on('value', (snapshot) => {
        const messages = snapshot.val()
        if (messages === null) return
        const entries = Object.entries(messages)
        const newMessages = entries.map((data) => {
          const [key, message] = data
          return { key, ...message }
        })
        setMessages(newMessages)
      })
  }
  useEffect(() => {
    getMessages()
  }, [])

  const main = () => {
    return (
      <>
        {messages.map((message) => (
          <div
            key={message.key}
            onClick={() => {
              setUpdate(message.key)
            }}
          >
            {update === message.key
              ? updateFunc(message.key)
              : message.name + ':' + message.text}
            <button onClick={() => deleteMessage(message.key)}>delete</button>
          </div>
        ))}
        <input
          type="text"
          value={name}
          onChange={(e) => setName((name) => (name = e.target.value))}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText((text) => (text = e.target.value))}
        />
        <button onClick={() => pushMessage({ name: name, text: text })}>
          push
        </button>
      </>
    )
  }
  const updateFunc = (key) => {
    return (
      <>
        <input
          type="text"
          value={name}
          onChange={(e) => setName((name) => (name = e.target.value))}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText((text) => (text = e.target.value))}
        />
        <button
          onClick={() => {
            updateMessage(key, { name: name, text: text })
            setUpdate('')
          }}
        >
          update
        </button>
      </>
    )
  }

  const login = () => {
    return (
      <>
        <button onClick={() => handleOnClick(githubProvider)}>github</button>
      </>
    )
  }
  return <>{isLogin ? main() : login()}</>
}

export default App

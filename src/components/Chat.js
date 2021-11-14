import { useRef, useState, useEffect } from 'react'
import {
  updateMessage,
  deleteMessage,
  messagesRef,
  pushMessage,
} from '../firebase'

const Chat = (props) => {
  const [name, setName] = useState('default')
  const [text, setText] = useState('text')
  const [updateName, setUpdateName] = useState('')
  const [updateText, setUpdateText] = useState('')
  const [messages, setMessages] = useState([])
  const [update, setUpdate] = useState('')
  const [updateFlag, setUpdateFlag] = useState(false)
  const refa = useRef(null)
  useEffect(() => {
    if (process.browser) {
      if (refa.current != null) {
        const scroll = refa.current.scrollHeight
        refa.current.scrollTop = scroll
      }
    }
  }, [messages])

  const getMessages = () => {
    messagesRef
      .orderByKey()
      .limitToLast(100)
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

  const updateFunc = (key) => {
    return (
      <>
        <input
          type="text"
          value={updateName}
          onChange={(e) =>
            setUpdateName((updateName) => (updateName = e.target.value))
          }
        />
        <input
          type="text"
          value={updateText}
          onChange={(e) =>
            setUpdateText((updateText) => (updateText = e.target.value))
          }
        />
        <button
          onClick={() => {
            const tempMessages = [...messages]
            const index = tempMessages.findIndex(
              (message) => message.key === key
            )
            tempMessages[index] = {
              key: key,
              name: updateName,
              text: updateText,
            }
            setMessages([...tempMessages])

            updateMessage(key, { name: updateName, text: updateText })

            setTimeout(() => {
              setUpdateName('')
              setUpdateText('')
              setUpdate('')
              setUpdateFlag(false)
            }, 0)

            // getMessages()
          }}
        >
          update
        </button>
      </>
    )
  }
  return (
    <div key={props.key}>
      <div style={{ marginLeft: '3px' }}>
        <div
          style={{
            border: '1px solid #999',
            width: '350px',
            height: '80vh',
            paddingLeft: '10px',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              overflow: 'auto',
              height: '80vh',
            }}
            ref={refa}
          >
            {messages.map((message) => (
              <div>
                <span
                  key={message.key}
                  onClick={() => {
                    setUpdateName(message.name)
                    setUpdateText(message.text)
                    setUpdate(message.key)
                    setUpdateFlag(true)
                  }}
                  style={{ paddingRight: '5px', display: 'inline-block' }}
                >
                  {updateFlag && update === message.key
                    ? updateFunc(message.key)
                    : message.name + ':' + message.text}
                </span>
                <button
                  onClick={() => deleteMessage(message.key)}
                  style={{ display: 'inline-block' }}
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </div>
  )
}

export default Chat

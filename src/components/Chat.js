import React, { useEffect, useRef } from 'react'
import { useChat } from '../hooks/useChat'
import { deleteMessage, pushMessage } from '../firebase'

const NoMemoChat = (props) => {
  const {
    name,
    setName,
    text,
    setText,
    updateName,
    setUpdateName,
    updateText,
    setUpdateText,
    messages,
    update,
    setUpdate,
    updateFlag,
    setUpdateFlag,
    getMessages,
    updateLine,
  } = useChat()

  const ref = useRef(null)

  useEffect(() => {
    if (process.browser) {
      if (ref.current != null) {
        const scroll = ref.current.scrollHeight
        ref.current.scrollTop = scroll
      }
    }
  }, [messages])

  useEffect(() => {
    getMessages()
  }, [getMessages])

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
        <button onClick={() => updateLine(key)}>update</button>
      </>
    )
  }
  return (
    <>
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
            ref={ref}
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
    </>
  )
}

export const Chat = React.memo(NoMemoChat)

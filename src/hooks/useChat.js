import { useState, useCallback } from 'react'
import { messagesRef, updateMessage } from '../firebase'

export const useChat = () => {
  const [name, setName] = useState('default')
  const [text, setText] = useState('text')
  const [updateName, setUpdateName] = useState('')
  const [updateText, setUpdateText] = useState('')
  const [messages, setMessages] = useState([])
  const [update, setUpdate] = useState('')
  const [updateFlag, setUpdateFlag] = useState(false)

  const getMessages = useCallback(() => {
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
  }, [])

  const updateLine = useCallback((key) => {
    const tempMessages = [...messages]
    const index = tempMessages.findIndex((message) => message.key === key)
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
  })

  return {
    name,
    setName,
    text,
    setText,
    updateName,
    setUpdateName,
    updateText,
    setUpdateText,
    messages,
    setMessages,
    update,
    setUpdate,
    updateFlag,
    setUpdateFlag,
    getMessages,
    updateLine,
  }
}

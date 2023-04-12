import { useEffect, useState } from 'react';
import Messages from './Components/Messages/Messages';

// interface IPayload {
//   username: string
//   message?: string
//   messages?: string[]
// }
// export interface IMessage {
//   event: string
//   payload: IPayload
// } 

const wss = new WebSocket('ws://localhost:5000')
function App() {
  const [username, setUsername] = useState<string>('')
  const [messageInput, setMessageInput] = useState<string>('')
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    wss.addEventListener('message', (e) => {
      const mes = JSON.parse(e.data)
      // console.log(mes);
      if(mes.payload.message) setMessages(prev => [...prev, mes.payload.message])
      if(mes.event === 'init') setMessages(mes.payload.messages)
    })
  }, [])
  const handleBtnConnectClick = () => {
    wss.send(JSON.stringify({ event: 'connect', payload: { username: username }}))
  }
  const handleBtnSendClick = () => {
    const mes = {
      event: 'send',
      payload: {
        username: username,
        message: messageInput
      }
    }
    wss.send(JSON.stringify(mes))
    setMessageInput('')
  }

  return (
    <div>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}/>
      <button onClick={handleBtnConnectClick}>Connect</button>
      <input type='text' value={messageInput} onChange={(e) => setMessageInput(e.target.value)}/>
      <button onClick={handleBtnSendClick}>Send</button>
      <Messages messages={messages} />
    </div>
  );
}

export default App;

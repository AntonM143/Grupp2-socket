import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import Layout from './components/Layout';
import ChatInput from "./components/chat/ChatInput";
import ChatList from './components/chat/ChatList';

function App() {


let name = "anton"
  useEffect(() => {
    const socket = io("http://localhost:8000")
    /* test */
    socket.emit("username", {name: name})
    
    
  }, )

  return (
    <Layout>
      <ChatList messageData={chatMessage} />
      <ChatInput />
    </Layout>
  );
}

export default App;

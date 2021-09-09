import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Layout from "./components/Layout";
import ChatInput from "./components/chat/ChatInput";
import ChatList from "./components/chat/ChatList";
import { v4 as uuid } from "uuid";


function App() {
  function date() {
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    return time;
  }
  const [socket, setSocket] = useState(null)
  const [enteredMessage, setEnteredMessage] = useState("");
  console.log(enteredMessage)
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket)
  },[]);
  
  const enteredMessageHandler = (currentValue) =>{
      setEnteredMessage(currentValue)
      console.log(currentValue)
    }
    const sendMessage = () =>{
      socket.emit("message", {
        id: uuid(),
        username: "Pelle",
        sendDate: date(),
        imgUrl: Math.floor(Math.random()* 4),
        message: enteredMessage,})
    } 

    if(socket) {
      socket.on("message", (message) => {
        setChatMessage([...chatMessage, message])
      })
    }
    
  return (
    <Layout>
      <ChatList messageData={chatMessage} />
      <ChatInput onEnteredMessage={enteredMessageHandler} message={enteredMessage} onSendMessage={sendMessage}/>
    </Layout>
  );
}

export default App;

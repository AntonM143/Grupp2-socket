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
  const [isTyping, setIsTyping] = useState({name: "", isTyping: false})
  const [socket, setSocket] = useState(null)
  const [enteredMessage, setEnteredMessage] = useState("");
  console.log(enteredMessage, "🤷‍♀️")
  const [chatMessage, setChatMessage] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket)
    socket.on("message", (message) => {
      setChatMessage([...chatMessage, message])
    })
    socket.on("isTyping", (message) =>{
      setIsTyping(message)
    })
  },[]);
 
  const enteredMessageHandler = (currentValue) =>{
    setEnteredMessage(currentValue)
    socket.emit("isTyping", {isTyping: true})
    }
    const sendMessage = () =>{
      socket.emit("message", {
        id: uuid(),
        username: "Pelle",
        sendDate: date(),
        imgUrl: 1,
        message: enteredMessage,})
        setEnteredMessage("")
        socket.emit("isTyping", {isTyping: false})
    } 

    if(socket) {
      
     
    }
 
  return (
    <Layout>
      <ChatList messageData={chatMessage} />
      <ChatInput onEnteredMessageHandler={enteredMessageHandler} enteredMessage={enteredMessage} onSendMessage={sendMessage} onIsTyping={isTyping} />
    </Layout>
  );
}

export default App;

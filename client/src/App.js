import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Layout from "./components/Layout";
import ChatInput from "./components/chat/ChatInput";
import ChatList from "./components/chat/ChatList";
import { v4 as uuid } from "uuid";
import date from "./components/handlers/date";


function App() {

 
  const [isTyping, setIsTyping] = useState({name: "", isTyping: false})
  const [socket, setSocket] = useState(null)
  const [enteredMessage, setEnteredMessage] = useState("");
  const [user, setUser] = useState({username: "Olle", avatar: 1})
  const [chatMessage, setChatMessage] = useState([]);
  console.log(chatMessage)

  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket)
    socket.on("message", (message) => {
      setChatMessage([...chatMessage, message])
    })
    socket.on("isTyping", (message) =>{
      setIsTyping(message)
    })
   
  },[chatMessage]);
 
  const enteredMessageHandler = (currentValue) =>{
    setEnteredMessage(currentValue)
    socket.emit("isTyping", {isTyping: true})
    }
    const sendMessage = () =>{
      socket.emit("message", {
        ...user,
        id: uuid(),
        sendDate: date(),
        message: enteredMessage,
        })
        setEnteredMessage("")
        socket.emit("isTyping", {isTyping: false})
    } 
    if(socket){
    }
    const sendItem = (url) => {
      socket.emit("message", {
        ...user,
        id: uuid(),
        sendDate: date(),
        imageUrl: url,})
        setEnteredMessage("")
    }
    
  return (
    <Layout>
      <ChatList messageData={chatMessage}  />
      <ChatInput onEnteredMessageHandler={enteredMessageHandler} enteredMessage={enteredMessage} onSendMessage={sendMessage} onIsTyping={isTyping} onSendItem={sendItem} />
    </Layout>
  );
}

export default App;

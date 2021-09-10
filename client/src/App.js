import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Layout from "./components/Layout";
import ChatInput from "./components/chat/ChatInput";
import ChatList from "./components/chat/ChatList";
import StartModal from "./components/StartModal";
import { v4 as uuid } from "uuid";
import date from "./components/handlers/date";


function App() {

 
  const [isTyping, setIsTyping] = useState("")
  const [socket, setSocket] = useState('')
  const [enteredMessage, setEnteredMessage] = useState("");

  const [chatMessage, setChatMessage] = useState([]);
  const [startModal, setStartModal] = useState(true);
  const [user, setUser] = useState(null);
  console.log(user, "👍")


  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket)
    
   

    return () => {

      socket.off('message')
    }
  },[]);

  
  if(socket){
    socket.on("message", (message) => {
      
      setChatMessage([...chatMessage, message])
    })
    socket.on("isTyping", (message) =>{
      setIsTyping(message)
    })
  }
  const enteredMessageHandler = (currentValue) =>{
    setEnteredMessage(currentValue)
    socket.emit("isTyping", {name: user.username, isTyping: true})
    }
    const sendMessage = () =>{
      socket.emit("message", {
        ...user,
        id: uuid(),
        sendDate: date(),
        message: enteredMessage,
      });
        setEnteredMessage("")
        socket.emit("isTyping", {isTyping: false})
    } 
    const usernameHandler = (username) => {
      setUser({
        username,
        avatar: Math.floor(Math.random() * 3),
      });
      setStartModal(false)
    } 
    const sendItem = (url) => {
      socket.emit("message", {
        ...user,
        id: uuid(),
        sendDate: date(),
        imageUrl: url,})
        setEnteredMessage("")
        socket.emit("isTyping", {isTyping: false})
    }
  return (
    <Layout>
      {startModal ? <StartModal onUsernameHandler={usernameHandler} /> : 
        <>
          <ChatList messageData={chatMessage} />
          <ChatInput onEnteredMessageHandler={enteredMessageHandler} enteredMessage={enteredMessage} onSendMessage={sendMessage} onIsTyping={isTyping} onSendItem={sendItem}/>
        </>
      }
    </Layout>
  );
}

export default App;

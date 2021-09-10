import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Layout from "./components/Layout";
import ChatInput from "./components/chat/ChatInput";
import ChatList from "./components/chat/ChatList";
import StartModal from "./components/StartModal";
import { v4 as uuid } from "uuid";
import date from "./components/handlers/date";

const socket = io("http://localhost:8000");

function App() {
  const [rooms, setRooms] = useState([]);
  const [isTyping, setIsTyping] = useState("")
  const [enteredMessage, setEnteredMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [startModal, setStartModal] = useState(true);
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('defaultRoom');
  const roomNameRef = useRef()
  const passwordRef = useRef()

  console.log(currentRoom)
  useEffect(() => {
    socket.on("message", (message) => {
      setChatMessage((prevState) => [...prevState, message]);
    })
  
    socket.on("isTyping", (message) =>{
      setIsTyping(message)
    })
    return () => {
      socket.off('message')
    }
  }, []);
  

  const enteredMessageHandler = (currentValue) =>{
    setEnteredMessage(currentValue)
    socket.emit("isTyping", {name: user.username, isTyping: true})
    }
    const sendMessage = () =>{
      socket.emit('message', {
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

    const roomHandler = (name) => {
      socket.emit('leave', currentRoom);
      socket.emit('join', name);
      setCurrentRoom(name)
      setChatMessage([])
    }

  
    const createRoomHandler = (e) => {
      e.preventDefault()
      setRooms((prevState) => [...prevState, {
        id: rooms.length + 1,
        name: roomNameRef.current.value,
      }])
    }



  return (
    <Layout>
      {startModal ? <StartModal onUsernameHandler={usernameHandler} /> : 
        <>
          <div className="p-10 text-gray-50">
            <form onSubmit={createRoomHandler} className="flex flex-col text-gray-600">
              <input placeholder="namn" type="text" ref={roomNameRef} />
              <input placeholder="password" type="text" ref={passwordRef} />
              <button>+</button>
            </form>
            {rooms.map((room) => (
            <ul key={room.id}>
              <li onClick={() => roomHandler(room.name)}>{room.name}</li>
            </ul>
          ))}
          </div>
          <ChatList messageData={chatMessage} />
          <ChatInput onEnteredMessageHandler={enteredMessageHandler} enteredMessage={enteredMessage} onSendMessage={sendMessage} onIsTyping={isTyping} onSendItem={sendItem}/>
        </>
      }
    </Layout>
  );
}

export default App;

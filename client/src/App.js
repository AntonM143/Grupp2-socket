import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Layout from "./components/Layout";
import ChatInput from "./components/chat/ChatInput";
import ChatList from "./components/chat/ChatList";
import StartModal from "./components/StartModal";
import RoomList from "./components/rooms/RoomList";
import ChatWrapper from "./components/chat/ChatWrapper";
import RoomModal from './components/rooms/RoomModal'
import { v4 as uuid } from "uuid";
import date from "./handlers/date";

const socket = io("http://localhost:8000");

function App() {
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isTyping, setIsTyping] = useState("")
  const [enteredMessage, setEnteredMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [startModal, setStartModal] = useState(true);
  const [user, setUser] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    socket.on('getRooms', (rooms) => {
      setRooms(rooms)
    })
    socket.on("message", (message) => {
      setChatMessage((prevState) => [...prevState, message]);
    })
    socket.on("isTyping", (message) =>{
      setIsTyping(message)
    })
    socket.on('updateRooms', (rooms) => {
      setRooms(rooms)
    })
    return () => {
      socket.off('message')
    }
  }, []);
  
  const enteredMessageHandler = (currentValue) =>{
    setEnteredMessage(currentValue)
    socket.emit("isTyping", { name: user.username, isTyping: true, currentRoom })
    }
    const sendMessage = () =>{
      socket.emit('message', {
        ...user,
        id: uuid(),
        sendDate: date(),
        message: enteredMessage,
        currentRoom: currentRoom,
      });
        setEnteredMessage("")
        socket.emit("isTyping", { isTyping: false, currentRoom })
    } 

    const usernameHandler = (username) => {
      setUser({
        username,
        avatar: Math.floor(Math.random() * 3),
      });
      setCurrentRoom(rooms[0].id)
    }
    
    const confirmUsername = () => {
      setStartModal(false)
      socket.emit('join', { roomId: currentRoom, user });
    }

    const sendItem = (url) => {
      socket.emit("message", {
        ...user,
        id: uuid(),
        sendDate: date(),
        imageUrl: url,
        currentRoom: currentRoom,
      })
        setEnteredMessage("")
        socket.emit("isTyping", { isTyping: false })
    }

    const roomHandler = (roomId) => {
      console.log(currentRoom)
      socket.emit('leave', currentRoom);
      socket.emit('join', { roomId, user });
      setCurrentRoom(roomId)
      setChatMessage([])
    }

    const addRoom = (roomName, password) => {
      socket.emit('addRoom', { roomName, password })

      setModalisOpen(false)
    }

    const toggleModal = () => setModalisOpen(!modalIsOpen)
    console.log(rooms)
  return (
    <Layout>
    { modalIsOpen && <RoomModal onAddRoom={addRoom} />}
      {startModal ? <StartModal onConfirm={confirmUsername} onUsernameHandler={usernameHandler} /> : 
        <>
          <RoomList onToggle={toggleModal} onRoomHandler={roomHandler} roomsData={rooms} />
          <ChatWrapper>
            <ChatList messageData={chatMessage} />
            <ChatInput 
              onIsTyping={isTyping}
              onEnteredMessageHandler={enteredMessageHandler}
              enteredMessage={enteredMessage}
              onSendMessage={sendMessage} 
              onSendItem={sendItem}
            />
          </ChatWrapper>
        </>
      }
    </Layout>
  );
}

export default App;

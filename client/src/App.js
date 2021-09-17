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
import RoomPassword from "./components/rooms/RoomPassword";

const socket = io("http://localhost:8000");



function App() {
  const [roomToJoin, setRoomToJoin] = useState('')
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [isTyping, setIsTyping] = useState()
  const [enteredMessage, setEnteredMessage] = useState("");
  const [chatMessage, setChatMessage] = useState([]);
  const [startModal, setStartModal] = useState(true);
  const [user, setUser] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [shrug, setShrug] = useState(false)
  const [enteredPassword, setEnteredPassword] = useState(null)
  const [passwordModal, setPasswordModal] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    socket.on('getRooms', (rooms) => {
      setRooms(rooms);
    })
    socket.on("message", (message) => {
      setChatMessage((prevState) => [...prevState, message]);
    })
      socket.on("isTyping", (userIsTyping) =>{
        setIsTyping(userIsTyping);
      })

    socket.on('updateRooms', (rooms) => {
      setRooms(rooms);
    })

    
    socket.on('joinSuccess', (status) => {
      setPasswordModal(false)
      setCurrentRoom(status.roomId)
      setChatMessage([]);
    })
    
    socket.on('joinFail', (status) => {
      setError(status)
    })
  
    return () => {
      socket.off('message');
    }
  }, []);

  const enteredMessageHandler = (currentValue) =>{
    setEnteredMessage(currentValue)
    socket.emit("isTyping", { user, isTyping: true, currentRoom })
  }
  const sendMessage = () =>{
      const messageToSend = shrug ? enteredMessage.replace("/shrug", "") + " ¯\\_(ツ)_/¯ " : enteredMessage
      socket.emit('message', {
        ...user,
        id: uuid(),
        sendDate: date(),
        message: messageToSend,
        currentRoom: currentRoom,
      });
        setEnteredMessage("")
        setShrug(false)
        socket.emit("isTyping", { isTyping: false, currentRoom })
    } 

    const usernameHandler = (username) => {
      setUser({
        username,
        avatar: Math.floor(Math.random() * 3),
      });
      setCurrentRoom(rooms[0].id);
    }
    
    const confirmUsername = () => {
      if (!user) {
        return;
      }
      setStartModal(false)
      socket.emit('firstJoin', { roomId: currentRoom, user });
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
        socket.emit("isTyping", { isTyping: false, currentRoom })
    }

    const joinRoomHandler = (roomId) => {
      setRoomToJoin(roomId)
      const room = rooms.find(room => room.id === roomId)
      if (room.passwordRequired) {
        setPasswordModal(true)
      } else {
        socket.emit('join', { roomId, user, password: enteredPassword });
      }
    }

    const roomHandler = () => {
      socket.emit('join', { roomId: roomToJoin, user, password: enteredPassword });
    }

    const addRoom = (roomName, password) => {
      socket.emit('addRoom', { roomName, password });
      setModalisOpen(false)
    }
    const toggleModal = () => setModalisOpen(!modalIsOpen)

    const shrugHandler = () => setShrug(true)

    const passwordHandler = (password) =>{
      setEnteredPassword(password)
    }

    let correct = rooms.find((room) => currentRoom === room.id)

  return (
    <Layout>
    {passwordModal && <RoomPassword roomHandler={roomHandler} onPasswordHandler={passwordHandler} errorHandler={error} />}
    { modalIsOpen && <RoomModal onAddRoom={addRoom} />}
    
      {startModal ? <StartModal onConfirm={confirmUsername} onUsernameHandler={usernameHandler} /> : 
        <>
          <RoomList onToggle={toggleModal} onJoinRoomHandler={joinRoomHandler} roomsData={rooms} highlightedRoom={currentRoom} />
          <ChatWrapper>
            <header className="bg-gray-700 font-bold text-gray-50 p-2 border-b border-gray-900">{correct.name}</header>
            <ChatList messageData={chatMessage} />
            <ChatInput 
              userData={user}
              onIsTyping={isTyping}
              onEnteredMessageHandler={enteredMessageHandler}
              enteredMessage={enteredMessage}
              onSendMessage={sendMessage} 
              onSendItem={sendItem}
              onShrug={shrugHandler}
            />
          </ChatWrapper>
        </>
      }
    </Layout>
  );
}

export default App;

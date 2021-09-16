import React from 'react'
import { IoMdChatboxes } from 'react-icons/io'
import RoomItem from './RoomItem'

const RoomList = (props) => {
  

const sendRoom = (id) => {
  props.onRoomHandler(id)
}
const toggleModal = () => {
  props.onToggle()
}

  return (
    <>
      <nav className="flex-col z-40 bg-gradient-to-t w-32 from-gray-800 to-gray-700 hidden md:flex">
        <header className="flex flex-col items-center my-3">
          <IoMdChatboxes className="text-4xl text-gray-800" />
          <p className="text-gray-50 font-semibold">ChattApp</p>
        </header>
        {props.roomsData.map((room) => (
          <div key={room.id} className={room.id === props.highlightedRoom ? "bg-gray-800 shadow-inner" : ''}>
            <ul onClick={() => sendRoom(room.id)} className="flex flex-col">
              <RoomItem  id={room.id} name={room.name} />
            </ul>
          </div>
        ))}
        <button onClick={toggleModal} className="opacity-50 w-20 h-20 bg-gray-500 rounded-lg my-4 mx-auto shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-110 hover:opacity-100">
          <div className="flex w-full h-full items-center text-xs text-gray-50 justify-center">
            <p className="text-center text-6xl">+</p>
          </div>
        </button>
      </nav>
    </>
  )
}

export default RoomList

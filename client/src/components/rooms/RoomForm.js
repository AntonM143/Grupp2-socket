import React, {useRef} from 'react'


const RoomForm = (props) => {
const roomNameRef = useRef()
const passwordRef = useRef()

  const addRoom = () => {
    props.onAddRoom(roomNameRef.current.value, passwordRef.current.value)
  }

  return (
    <div className="absolute flex flex-auto justify-center w-full mt-40">
      <div className="flex flex-col text-gray-50 font-semibold border border-gray-900 bg-gray-700 shadow-2xl items-center py-10 px-4 w-full xl:w-1/3 lg:w-2/3 md:2/3 mx-auto z-50">
      <header>Create Room</header>
        <input
        
          autoFocus
          placeholder="Room Name"
          ref={roomNameRef} className="text-gray-50 m-4 bg-gray-900 w-2/3 p-1"
          type="text" />
        <input placeholder="password" ref={passwordRef} className="text-gray-50 m-4 bg-gray-900 w-2/3 p-1" type="text" />
        <button className="bg-gray-800 rounded font-bold px-4 py-2 hover:bg-green-700" onClick={addRoom}>Add Room</button>
      </div>
    </div>
  )
}

export default RoomForm

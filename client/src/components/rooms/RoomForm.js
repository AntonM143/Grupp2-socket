import React, {useRef} from 'react'

const RoomForm = (props) => {
const roomNameRef = useRef()
const passwordRef = useRef()

  const addRoom = () => {
    props.onAddRoom(roomNameRef.current.value, passwordRef.current.value)
  }

  return (
    <div className="absolute flex flex-auto justify-center items-center w-full h-full">
    <div className="flex flex-col bg-gray-500 z-50 rounded-lg">
      Room Name
      <input ref={roomNameRef} className="text-gray-50 m-4 bg-gray-900" type="text" />
      Password
      <input ref={passwordRef} className="text-gray-50 m-4 bg-gray-900" type="text" />
      <button onClick={addRoom}>Lägg till room</button>
    </div>
    </div>
  )
}

export default RoomForm

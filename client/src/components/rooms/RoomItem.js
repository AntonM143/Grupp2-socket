import React from 'react'

const RoomItem = (props) => {
  
  return (
    <li className="w-20 h-20 bg-gray-500 rounded-lg my-4 mx-auto shadow-lg cursor-pointer transition duration-300 ease-in-out transform hover:scale-110">
      <div className="flex w-full h-full items-center text-xs text-gray-50 justify-center opacity-0 hover:opacity-100">
        <p className="text-center bg-gray-900 opacity-80 w-full">{props.name}</p>
      </div>
    </li>
  )
}

export default RoomItem

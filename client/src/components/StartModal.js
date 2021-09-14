import React from 'react';
import { IoMdChatboxes } from 'react-icons/io'
import './start.css'

const StartModal = ({ onUsernameHandler, onConfirm }) => {

  const enteredUsernameHandler = (e) => {
    onUsernameHandler(e.target.value)
  }
  
  const onChatHandler = () => {
    onConfirm()
  }

  return (
    <>
    <div className="flex flex-auto text-gray-50 flex-col container mx-auto">
        <div 
          className="flex flex-col border border-gray-900 bg-gray-700 shadow-2xl items-center py-10 px-4 w-full xl:w-1/3 lg:w-2/3 md:2/3 mx-auto">
          <header className="text-center text-5xl my-5">
            ChatApp
            <IoMdChatboxes className="text-gray-800" />
          </header>
          <input
            autoFocus
            onChange={enteredUsernameHandler} 
            placeholder="Enter nickname"
            className="bg-gray-800 my-4 py-1 px-1 text-center rounded font-semibold text-gray-50" 
            type="text"
          />
          <button  className="bg-gray-800 rounded font-bold px-4 py-2 hover:bg-gray-700" onClick={onChatHandler}>Start Chat!</button>
        </div>
    </div>
    </>
  )
}

export default StartModal

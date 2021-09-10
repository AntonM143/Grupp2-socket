import React, { useRef, useEffect } from 'react';
import './StartModal.module.css'

const StartModal = ({ onUsernameHandler }) => {
  const usernameRef = useRef('')
  useEffect(() => {
    usernameRef.current.focus();
  })
  const onChatHandler = () => {
    if (usernameRef.current.value === "") {
      return;
    }
    onUsernameHandler(usernameRef.current.value);
  }

  return (
    <div className="flex flex-auto text-gray-50 font-semibold flex-col mt-60 container mx-auto">

        <div 
          className="flex flex-col bg-gray-600 shadow-2xl items-center py-10 px-4 w-full xl:w-1/3 lg:w-2/3 md:2/3 mx-auto">
          <header className="text-5xl font-bold my-5">ChatApp</header>
          <input 
            placeholder="Enter nickname"
            ref={usernameRef} 
            className="bg-gray-800 my-4 py-1 px-1 text-center rounded font-semibold text-gray-50" 
            type="text"
          />
          <button className="bg-gray-800 rounded font-bold px-2 my-4 hover:bg-gray-700" onClick={onChatHandler}>Start Chat!</button>
        </div>
    </div>
  )
}

export default StartModal

import React, { useRef } from 'react'

const StartModal = ({ onUsernameHandler }) => {
  const usernameRef = useRef('')

  const onChatHandler = () => {
    onUsernameHandler(usernameRef.current.value)
  }

  return (
    <div className="flex text-gray-50 font-semibold flex-col justify-center items-center w-full h-full">
      <div className="flex flex-col items-center border w-1/6">
        <header>ChattApp</header>
        <input ref={usernameRef} className="bg-gray-500 font-semibold text-gray-50" type="text" />
        <button onClick={onChatHandler}>Start Chat!</button>
      </div>
    </div>
  )
}

export default StartModal

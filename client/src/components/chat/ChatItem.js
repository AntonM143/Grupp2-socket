import React from 'react';

const ChatItem = ({ username, sendDate, message, imgUrl }) => {
  return (
    <>
      <div className="flex py-5 rounded shadow-xl">
        <div className="flex mx-3">   
          <div className="w-20">
            <img className="object-contain h-full w-full" src={require(`../../assets/${imgUrl}.png`).default} alt="" />
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex items-center my-1">
            <h1 className="font-bold text-xl text-yellow-400">{username}</h1>
            <p className="font-extralight px-3 text-xs italic text-gray-400">{sendDate}</p>
          </header>
            <p className="text-gray-50 font-semibold">{message}</p>
        </div>
      </div>
    </>
  )
}

export default ChatItem

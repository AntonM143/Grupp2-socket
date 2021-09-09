import React from 'react';

const ChatItem = ({ username, sendDate, message, avatar, imageUrl }) => {
  return (
    <>
      <div className="flex pt-6">
        <div className="flex items-start mx-3">   
          <div className="w-16">
            {/* <img className="object-contain h-full w-full" src={require(`../../assets/${avatar}.png`).default} alt="" /> */}
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex items-center mb-1">
            <h1 className="font-bold text-xl text-yellow-400">{username}</h1>
            <p className="font-extralight px-3 text-xs italic text-gray-400">{sendDate}</p>
          </header>
            <p className="text-gray-50 font-semibold">{message}</p>
            <img src={imageUrl} alt="" />
        </div>
      </div>
    </>
  )
}

export default ChatItem

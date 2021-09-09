import React from 'react'

const ChatCommandModule = () => {
  const commandItems = ['gif', 'img', 'kick']
  const moduleItemStyle = "p-1 py-4 rounded-md hover:bg-gray-800 flex flex-1 cursor-pointer "

  const commandItemHandler = (command) => {
    console.log(command)
  }

  return (
    <div className="flex flex-col bg-gray-900 w-full text-gray-400 font-semibold container mx-auto">
      <header className="w-full text-gray-50 px-3 bg-gray-600 shadow-xl">Commands</header>
      {commandItems.map((command) => (
      <ul key={command} className="flex flex-col w-full p-2">
        <li onClick={
          () => {commandItemHandler(command)}} 
          className={moduleItemStyle}>/{command} 
          {command === 'kick' ? ' @user' : ' [search]'}
        </li>
      </ul>
    ))}
    </div>
  )
}

export default ChatCommandModule

import React from 'react'

const ChatWrapper = (props) => {
  return (
    <div className="flex flex-col w-full h-full">
      {props.children}
    </div>
  )
}

export default ChatWrapper

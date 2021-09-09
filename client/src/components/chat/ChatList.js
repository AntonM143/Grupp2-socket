import React, { useEffect, useRef } from 'react';
import ChatItem from './ChatItem';
import './chatScrollbar.module.css';

const ChatList = ( {messageData} ) => {
  const scrollElement = useRef(null);
  useEffect(() => {
    setScrollPosition()
  });

  const setScrollPosition = () => scrollElement.current.scrollTop = 10000;

  return (
    <div ref={scrollElement} 
      className="flex flex-auto flex-col container mx-auto overflow-auto xl:w-3/6">
      {messageData.map((message) => (
        <div key={message.id}>
          <ChatItem 
            username={message.username}
            sendDate={message.sendDate}
            imgUrl={message.imgUrl}
            message={message.message}
          />
        </div>  
      ))}
    </div>
  )
}

export default ChatList

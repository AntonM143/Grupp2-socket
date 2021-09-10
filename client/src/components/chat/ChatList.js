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
      className="flex flex-auto flex-col container mx-auto overflow-auto">
      {messageData.map((message) => (
        <div key={message.id}>
          <ChatItem 
            username={message.username}
            sendDate={message.sendDate}
            avatar={message.avatar}
            message={message.message}
          />
      </div>
      ))}
    </div>
  )
}

export default ChatList

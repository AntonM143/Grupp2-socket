import React, { useEffect, useRef } from 'react';
import ChatItem from './ChatItem';
import './chatScrollbar.module.css';

const ChatList = ( {messageData} ) => {
  const scrollElement = useRef(null);
  useEffect(() => {
    const setScrollPosition = () => scrollElement.current.scrollTop = 10000;
    setScrollPosition()
  });


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
            imageUrl={message.imageUrl}

           
            
          />
      </div>
      ))}
    </div>
  )
}

export default ChatList

import React, { useEffect, useRef } from 'react';
import { v4 as uuid } from "uuid";
import ChatItem from './ChatItem';
import './chatScrollbar.module.css';

const ChatList = ( {messageData} ) => {
  const scrollElement = useRef(null);
  useEffect(() => {
    const setScrollPosition = () => scrollElement.current.scrollTop = 10000;
    setScrollPosition()
  });

  return (
    <>
    <div ref={scrollElement} 
      className="flex flex-col flex-auto container mx-auto overflow-auto">
      {messageData.map((message) => (
        <div key={uuid()}>
          <ChatItem 
            username={message.username}
            sendDate={message.sendDate}
            avatar={message.avatar}
            message={message.message}
            imageUrl={message.imageUrl}
            userAction={message.userAction}
            type={message.type}
          />
      </div>
      ))}
    </div>
    </>
  )
}

export default ChatList

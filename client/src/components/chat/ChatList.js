import React from 'react';
import ChatItem from './ChatItem';

const ChatList = ( {messageData} ) => {
 
  return (
    <div className="container mx-auto">
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

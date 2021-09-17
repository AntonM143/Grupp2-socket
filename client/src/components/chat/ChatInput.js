import React,{ useState } from 'react'
import { FaRegPaperPlane } from "react-icons/fa";
import ChatCommandModule from "./ChatCommandModule";
import { v4 as uuid } from 'uuid'


const ChatInput = ({enteredMessage, onEnteredMessageHandler, onSendMessage, onIsTyping, onSendItem, onShrug, userData}) => {
  const [toggleCommandModule, setToggleCommandModule] = useState(false)
  const [reqType, setReqType] = useState("")

  const inputHandler = (e) =>{
  onEnteredMessageHandler(e.target.value)
  
    if(e.target.value === "/"){
     
      setToggleCommandModule(true)
    }
    if(e.target.value === "/gif"){
      setReqType("/gif")
    }
    if(e.target.value === "/img"){
      setReqType("/img")
    }
    if(e.target.value === "/shrug"){
      onShrug()
     
    }
    if(e.target.value === ""){
      setReqType('')
      setToggleCommandModule(false)
    }
  }

 const sendMessage = (e) =>{
   e.preventDefault()
  onSendMessage()
  setToggleCommandModule(false)

 }
 const onClose = () =>{
  setToggleCommandModule(false)
  setReqType('')
}

const onEnter = (e) => {
  if (e.nativeEvent.key === 'Enter') {
    onSendMessage()
    setToggleCommandModule(false)
  }
}
let filteredTypingList
if(onIsTyping) {
  filteredTypingList = onIsTyping.filter(user => user.user !== userData.username)
}

return (
  <div className="container mx-auto bg-gray-800">
      
      {onIsTyping && filteredTypingList.map(user => (
        user.isTyping ? <p key={uuid()} className="text-gray-50">{user.user} is typing...</p> : ''
      )) }
      {toggleCommandModule && <ChatCommandModule onClose={onClose} reqType={reqType} enteredMessage={enteredMessage} onSendItem={onSendItem}  />}
      <div className="flex content-center justify-center mx-auto">
        <div className="flex break-normal justify-between w-full text-gray-50 px-4 my-5 py-3 font-semibold rounded-xl bg-gray-600">
          <input onKeyUp={onEnter} onChange={inputHandler} value={enteredMessage} 
            className="flex flex-col w-11/12 justify-center text-gray-50 px-2 font-semibold bg-gray-600"
          />
          <div className="rounded-full object-contain text-2xl mx-2 cursor-pointer transition duration-500 ease-in-out hover:bg-gray-800 transform hover:scale-110">
            <FaRegPaperPlane onClick={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput

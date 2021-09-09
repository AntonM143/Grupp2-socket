import React,{ useState } from 'react'
import { FaRegPaperPlane } from "react-icons/fa";
import ChatCommandModule from "./ChatCommandModule";

const ChatInput = () => {
const [toggleCommandModule, setToggleCommandModule] = useState(false)

  return (
    <div className="container mx-auto bg-gray-800">
      {toggleCommandModule && <ChatCommandModule />}
      <div className="flex content-center justify-center mx-auto">
        <div className="flex break-normal justify-between w-full text-gray-50 px-4 my-5 py-3 font-semibold rounded-xl bg-gray-600">
          <div
            contentEditable="true"
            className="flex flex-col w-11/12 justify-center text-gray-50 px-2 font-semibold bg-gray-600"
          />
          <div className="rounded-full object-contain text-2xl mx-2 cursor-pointer transition duration-500 ease-in-out hover:bg-gray-800 transform hover:scale-110">
            <FaRegPaperPlane />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInput

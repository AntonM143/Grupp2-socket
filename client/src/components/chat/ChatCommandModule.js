import React, {useEffect, useState} from 'react'
import request from "../../handlers/request"

const ChatCommandModule = ({reqType, enteredMessage, onSendItem, onClose}) => {
  const commandItems = ['gif', 'img', 'shrug']
  const moduleItemStyle = "p-1 py-4 rounded-md hover:bg-gray-800 flex flex-1 cursor-pointer "
  const [searchValidation, SetSearchValidation] = useState(false)
  const [resultList, setResultList] = useState([])

  useEffect(()=>{
    const fetchData = async(reqType) =>{
      if (reqType === "/gif") {
        const search = enteredMessage.trim().replace(reqType, "")
        const response = await request.getGifs(search)
        let gifResult = response.data.map((item)=>{
          return {
            imageUrl: item.images.fixed_height_small.url,
            id: item.id
          }
        });
        setResultList(gifResult)
      }
      if(reqType === "/img") {
        const search = enteredMessage.trim().replace(reqType, "")
        const response = await request.getImgs(search)
        let imgResult = response.results.map((item)=>{
          return {
            imageUrl: item.urls.thumb,
            id: item.id
          }
        });
        setResultList(imgResult);
      }
    }
    const requestTimer = setTimeout(()=>{
      SetSearchValidation(enteredMessage.length > 2)
    }, 800)
    if(searchValidation){
      fetchData(reqType)
    }
    return () =>{
    
      clearTimeout(requestTimer)
    }
  },[reqType, searchValidation, enteredMessage])
  
  const commandItemHandler = (command) => {
  }
 const sendItem = (id) => {
   const imageToSend = resultList.find((item) =>item.id === id)
  onSendItem(imageToSend.imageUrl)
  onClose()
 }
 
  return (
    <div className="flex flex-col shadow-2xl rounded-xl bg-gray-800 w-full text-gray-400 font-semibold container mx-auto">
      <div className="border rounded-xl border-gray-900">
      <div className="divide-solid divide-y divide-gray-900">
      <header className="w-full text-gray-50 px-3 my-3">Commands</header>
      </div>
      <div className="container flex">
      {resultList.map((item) => (
        <ul key={item.id} className="flex w-full">
              <li onClick={() => {sendItem(item.id)}} className="cursor-pointer relative border-gray-400 flex-auto m-3 rounded-xl">
                <div  className="absolute rounded-xl z-20 hover:bg-gray-200 opacity-50 flex w-full h-full"></div>
                <img className="object-cover z-50 rounded-xl h-28 w-full" src={item.imageUrl} alt="" />
              </li>
            </ul>
          ))} 
      </div>
    { !reqType ?   <>
      {commandItems.map((command) => (
        <ul key={command} className="flex flex-col w-full p-2">
        <li onClick={
          () => {commandItemHandler(command)}} 
          className={moduleItemStyle}>/{command} 
          {command === 'kick' ? ' @user' : ' [search]'}
        </li>
      </ul>
    ))}
    </> : ""}
    </div>
    </div>
  )
}

export default ChatCommandModule

import React, {useEffect, useState} from 'react'
import request from "../handlers/request"


const ChatCommandModule = ({reqType, enteredMessage, onSendItem, onClose}) => {

  const commandItems = ['gif', 'img', 'kick']
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
        })
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
        })
        setResultList(imgResult)
       
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
    <div className="flex flex-col bg-gray-900 w-full text-gray-400 font-semibold container mx-auto">
      <header className="w-full text-gray-50 px-3 bg-gray-600 shadow-xl">Commands</header>
     
       
    
      <div className="container flex">
      {resultList.map((item) => (
            <ul key={item.id} className="flex">
              
              <img  className="object-cover" onClick={() => {sendItem(item.id)}} src={item.imageUrl} alt="" />
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
    </> : " "}
    </div>
  )
}

export default ChatCommandModule

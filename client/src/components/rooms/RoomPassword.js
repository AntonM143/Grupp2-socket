
const RoomPassword = (props) => {
  const submitPassword = () => {
    props.roomHandler()
  }

  return (
    <div className="absolute flex flex-auto justify-center w-full mt-40">
      <div className="flex flex-col text-gray-50 font-semibold border border-gray-900 bg-gray-700 shadow-2xl items-center py-10 px-4 w-full xl:w-1/3 lg:w-2/3 md:2/3 mx-auto z-50">
      <header>Enter room password</header>
       <p className="text-red-500" >{props.errorHandler.message}</p>
        <input 
          onChange={(e)=> props.onPasswordHandler(e.target.value)}
          autoFocus
          placeholder="password"
          className="text-gray-50 m-4 bg-gray-900 w-2/3 p-1" type="text" />
          <div className="flex">
            <button 
            onClick={submitPassword}
            className="bg-gray-800 rounded font-bold px-4 py-2 hover:bg-green-700 mx-4" >Join</button>
            <button onClick={props.onClose} className="bg-gray-800 rounded font-bold px-4 py-2 hover:bg-red-700" >Cancel</button>
          </div>
      </div>
    </div>
  )
}

export default RoomPassword

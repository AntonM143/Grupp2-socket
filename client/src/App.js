import { io } from "socket.io-client"
import { useEffect,useState } from "react"


function App() {

 
let name = "anton"
  useEffect(() => {
    const socket = io("http://localhost:8000")
    /* test */
    socket.emit("username", {name: name})
    
    

    
  }, )

  return (
    <div>
      <h1 className="container mx-auto text-2xl md:text-4xl lg:text-6xl shadow-2xl">Sockets</h1>
      
    </div>
  );
}

export default App;

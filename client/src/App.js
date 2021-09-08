import { io } from "socket.io-client"
import { useEffect } from "react"


function App() {

  useEffect(() => {
    const socket = io("http://localhost:8000")
    
  }, )

  return (
    <div>
      <h1 className="container mx-auto text-2xl md:text-4xl lg:text-6xl shadow-2xl">Sockets</h1>
    </div>
  );
}

export default App;

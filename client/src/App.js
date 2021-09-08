import Layout from './components/Layout';
import ChatList from './components/chat/ChatList';
import { io } from "socket.io-client"
import { useEffect,useState } from "react"


const dummy_data = [
  {
    id:'1',
    username: 'Robin',
    sendDate: new Date().getHours(),
    imgUrl: '1',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo?',
  },
  {
    id:'2',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'3',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'4',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'5',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'6',
    username: 'Robin',
    sendDate: new Date().getHours(),
    imgUrl: '1',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo?',
  },
  {
    id:'7',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'8',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'9',
    username: 'Robin',
    sendDate: new Date().getHours(),
    imgUrl: '1',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo?',
  },
  {
    id:'10',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
]

function App() {

 
let name = "anton"
  useEffect(() => {
    const socket = io("http://localhost:8000")
    /* test */
    socket.emit("username", {name: name})
    
    

    
  }, )

  return (
    <Layout>
      <ChatList messageData={dummy_data} />
    </Layout>
  );
}

export default App;

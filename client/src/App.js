import { useEffect } from "react"
import { io } from "socket.io-client"
import Layout from './components/Layout';
import ChatInput from "./components/chat/ChatInput";
import ChatList from './components/chat/ChatList';
import { v4 as uuid } from "uuid";

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
  {
    id:'11',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'12',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'13',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'14',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  },
  {
    id:'15',
    username: 'Anton',
    sendDate: new Date().getHours(),
    imgUrl: '2',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quaerat quibusdam animi aperiam, error nam repellat saepe magnam iusto. Rerum quae impedit consequuntur autem ad aut, dignissimos tempora quo? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ducimus architecto quidem eligendi voluptatem quibusdam nisi, facilis quas id cupiditate debitis illo ab dicta, ut sit in perferendis alias temporibus?' ,
  }, 
]

function App() {
  function date () {
    let today = new Date();
  let time = today.getHours() + ":" + today.getMinutes()
  return time
  
  }
  const [chatMessage, setChatMessage] = useState([{
    id: uuid(),
    username: 'Pelle',
    sendDate: date(),
    imgUrl: '1',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. ',
  }],)
let name = "anton"
  useEffect(() => {
    const socket = io("http://localhost:8000")
    /* test */
    socket.emit("username", {name: chatMessage.username})
    
    
  }, )

  return (
    <Layout>
      <ChatList messageData={chatMessage} />
      <ChatInput />
    </Layout>
  );
}

export default App;

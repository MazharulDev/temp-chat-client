import { useState } from 'react'
import './App.css';
import io from 'socket.io-client'
import Chats from './Components/Chats';
const socket = io.connect('https://simplechating.herokuapp.com');

function App() {
  const [userName, setUserName] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false);
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      socket.emit("join_room", room)
      setShow(true)
    }
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-700 '>
      {!show ?
        (
          <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-28'>
            <div className='text-white text-center'>
              <h3 className='text-4xl font-bold'>Join the room</h3>
              <p>Temporary chat app for anonymous use</p>
            </div>
            <div className='flex flex-col gap-5'>
              <input className='p-2 rounded-md' type="text" name="name" placeholder="Mazharul" onChange={(e) => { setUserName(e.target.value) }} />

              <input className='p-2 rounded-md' type="text" name="name" placeholder="Room ID..." onChange={(e) => { setRoom(e.target.value) }} />

              <button className='p-2 bg-green-700 rounded-md text-white' onClick={joinRoom}>Join a room</button>
            </div>
          </div>
        )
        :
        (
          <Chats socket={socket} userName={userName} room={room} />
        )}
    </div>
  );
}

export default App;

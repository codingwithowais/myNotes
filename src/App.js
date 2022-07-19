import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Navbar from "./components/Navbar";
import Home from "./components/Home";

import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from './context/notes/NoteState';
import { useState } from "react";




function App() {
  let name =  null;
  const getUser= async()=>{
  
   
  }
  const [alert, setAlert]  = useState(false);
  const alertToggle = ()=>{
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
      
    }, 2500);
    
  }
 

  
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar alertToggle={alertToggle} name = {name}/>
     
        
           {alert && <Alert/>  } 
   
          

          <div className="container my-3">


            <Routes>
              <Route exact path="/" element={<Home alertToggle={alertToggle}/>} />

              <Route exact path="/login" element={<Login alertToggle={alertToggle} getUser={getUser}/>}/>
              <Route exact path="/signup" element={<Signup alertToggle = {alertToggle} getUser={getUser}/>}/>
            </Routes>
          </div>

        </BrowserRouter>
      </NoteState>
    </>
  );


}

export default App;

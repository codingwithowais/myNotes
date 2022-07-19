import NotesContext  from "./noteContext";
import { useState,useEffect } from "react";

const port =200;
let alertCode = ""
let alert = false;
const NoteState = (props)=>{
 


    const userNotes = []
    
    
      const [notes , setNotes] = useState(userNotes);

      const AddNotes = async(title,description,tag) => {
        // API  Call
        
        let url = `http://localhost:${port}/api/notes/addnotes`
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'jwtToken':localStorage.getItem('jwtToken')
          },
          body:JSON.stringify({title,description,tag})
        });
        getNotes();
       

     
        
      }

      const updateNotes = async(title,description,tag,id)=>{
        // API call
        let url = `http://localhost:${port}/api/notes/updatenotes/${id}`
        const response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'jwtToken':localStorage.getItem('jwtToken')
          },
          body:JSON.stringify({title,description,tag})
        });
        getNotes();

        return;
      }

      const deleteNotes = async(id,alertToggle)=>{
        // API CALL
        let url = `http://localhost:${port}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
          method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'jwtToken':localStorage.getItem('jwtToken')
          }
        });
        getNotes();
        alertCheck("Note Deleted Successfully!")
        alertToggle();

          
        

       
        
      }
      const getNotes = async()=>{
        // API Call
        let url = `http://localhost:${port}/api/notes/fetchnotes/`

        const response = await fetch(url, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'jwtToken':localStorage.getItem('jwtToken')
          }
        });
        const json = await response.json();
        console.log(json);
        
        setNotes(json);
     

        }


        const alertCheck = (status)=>{
          alertCode = status ;
          alert= true;
        }
       const [name,setName] = useState(null);
       const [email,setEmail] = useState(null);
        const getUser = async()=>{
          console.log('hey')
          let url = 'http://localhost:200/api/auth/getuser'
          const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',
            headers: {
             
              'jwtToken':localStorage.getItem('jwtToken'),
        
           
            },
        
           
          });
          let json  =  await response.json();
          if(localStorage.getItem('jwtToken')){
           setName(json.name)
           setEmail(json.email)
            
          }
        
       

        }
    
       
        
      
     

    
    
  
  

    return (
        <NotesContext.Provider value={{notes ,setNotes, getNotes,deleteNotes,AddNotes,updateNotes, alertCheck, alertCode,alert,name,email,getUser}}>
                {props.children}
        </NotesContext.Provider>
    )
    
    }

export default NoteState;
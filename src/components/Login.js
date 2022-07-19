import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import notesContext from '../context/notes/noteContext' 

const Login = (props) => {
  const userNotes = useContext(notesContext);
  let {alertCheck,getUser} = userNotes;
  const[credentials, setCredentials] = useState({email:"" , password:"" })
  const navigate = useNavigate();
    const onClick = async(e)=>{
        e.preventDefault();
        let url = 'http://localhost:200/api/auth/login'
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',

         
          },

          body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        let json = await response.json();
        console.log(json)
        if(json.jwtToken){

          localStorage.setItem('jwtToken',json.jwtToken);
          navigate("/")
          getUser();
          alertCheck("Logged In Successfully!");
          props.alertToggle();
        }
        else{
          alert('Please login with correct credentials');

        }
        
       
       
    }
  const  onChange=(e)=>{
    
        setCredentials({...credentials , [e.target.name]:e.target.value})
      
    }
    document.title = 'StickyNotes-Login'
  return (
    <div className='mt-3'>
        <h1 className='mt-5'>Login to continue using StickyNotes</h1>
      <form onSubmit={onClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value= {credentials.email}aria-describedby="emailHelp" onChange={onChange} required />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password"  value= {credentials.password} onChange={onChange} required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login


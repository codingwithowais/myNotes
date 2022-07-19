import React,{useState,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import notesContext from '../context/notes/noteContext' 

const Signup = (props) => {
  const[credentials, setCredentials] = useState({name:"" ,email:"", password:"" ,cpassword:""})
  const userNotes = useContext(notesContext);
  let {alertCheck,getUser} = userNotes;
  const navigate = useNavigate();
  
    const onClick = async(e)=>{
        e.preventDefault();
        let url = 'http://localhost:200/api/auth/newuser'
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',

         
          },

          body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        let json = await response.json();
        console.log(json)
        if(json.jwtToken && credentials.password == credentials.cpassword){

          localStorage.setItem('jwtToken',json.jwtToken);
          navigate("/");
          getUser();
          alertCheck("Account Created!")
          props.alertToggle();
        }
        else{
          alert('Please try to Signup again');
        }

      
     
        
        
        
    }
      const  onChange=(e)=>{
        
        setCredentials({...credentials , [e.target.name]:e.target.value})
        
      }
      document.title = 'StickyNotes-Signup';
  return (
    <div>
    <form onSubmit={onClick} className='mt-3'>
      <h1 className='mt-5'>Sign Up filling the required Details to Avail StickyNotes</h1>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value= {credentials.name}  onChange={onChange} required />
   
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value= {credentials.email}aria-describedby="emailHelp" onChange={onChange} required />
  
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password"  value= {credentials.password} onChange={onChange} required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword"  value= {credentials.cpassword} onChange={onChange} required minLength={5}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup

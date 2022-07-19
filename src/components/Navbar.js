import React , {useContext} from 'react'
import {Link , useLocation,useNavigate} from "react-router-dom";
import notesContext from '../context/notes/noteContext'

const Navbar = (props) => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const userNotes = useContext(notesContext);
    let {alertCheck,name,email,getUser} = userNotes;

    const handleLogout = ()=>{
        localStorage.removeItem('jwtToken');
        navigate('/login');
        alertCheck('Logged Out Successfully!');
        props.alertToggle();

    }
    const toggleClick =(e)=>{
        e.preventDefault();
      
    }

 if(localStorage.getItem('jwtToken')){
    getUser();
 }

 



    
      
 
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">StickyNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?"active" : ""} `} aria-current="page" to="/">Home</Link>
                              
                            </li>
                            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?"active" : ""} `}aria-current="page" to="/about">About</Link>
                              
                            </li> */}
                         
                         
                        
                            
                        </ul>
                        <form className="d-flex" role="search" onClick={toggleClick}>
                            {localStorage.getItem('jwtToken') && <button className='btn btn-info mx-1'>{name}</button>}
                            {localStorage.getItem('jwtToken') && <button className='btn btn-info mx-2' onClick={toggleClick}>{email}</button>}
                       {!localStorage.getItem('jwtToken') ? <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>: <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
                      }

                       {!localStorage.getItem('jwtToken') && <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link> } 


                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

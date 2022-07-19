import React , {useContext, useEffect,useRef,useState} from 'react'
import notesContext from '../context/notes/noteContext'
import NoteItems from './NoteItems'
import { useNavigate } from 'react-router-dom'


const Notes = (props) => {
    
    let ref = useRef(null);
    let refClose = useRef(null);
    const navigate = useNavigate();
    useEffect(()=>{
      if(!localStorage.getItem('jwtToken')){
        navigate('/login')
      }
      else{
        getNotes();
      }
      
    },[])
    const userNotes = useContext(notesContext);
    let {notes,getNotes,updateNotes,alertCheck} = userNotes;


    const[note, setNote] = useState({title:"" , description:"" , tag:"",id:""})
    const onChange = (e)=>{
      setNote({...note , [e.target.name]:e.target.value})
    }
    
    const updateCall=(title,description,tag,id)=>{
      setNote({title,description,tag,id});

      ref.current.click();
    }
    const handleClick = ()=>{
      updateNotes(note.title,note.description,note.tag,note.id)
      refClose.current.click();
      alertCheck("Note Updated Successfully!")
      props.alertToggle();

    }
    
    
  return (

    <>
   
<button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className='container'>
            <form>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" placeholder="Title" onChange={onChange} />

                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description}placeholder="Description" onChange={onChange}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} placeholder="Description" onChange={onChange}/>
                </div>

            </form>
        </div>
      </div>
      <div className="modal-footer">
        <button ref= {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div> 
    <div className='row my-3'>
      {notes.length === 0 && <div className="container mx-2"><strong>No Saved Notes to show</strong></div> }
  
     
     {userNotes.notes.map((element)=>{
            return(
                <div className="col-md-4 my-2" key = {element._id}>
                    <NoteItems title = {element.title} description = {element.description} tag={element.tag} del={element._id} updateCall={updateCall} alertToggle={props.alertToggle}/>

                </div>

               
            )
          })}
     

      
    
      

    
   </div>
   </>
  )
}

export default Notes

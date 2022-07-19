import React , {useContext,useRef} from 'react'
import notesContext from '../context/notes/noteContext'

const NoteItems = (props) => {
  const userNotes = useContext(notesContext)
  const {deleteNotes,alertCheck} = userNotes;
    const {title , description ,tag, del, updateCall} = props
 
  return (
    <div>
          
         
                
            <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">

              <h5 className="card-title">{title?title:"Untitled"}...</h5>
              <div className='mx-2'>
              <i className="fa-solid fa-trash-can mx-2" onClick={(e)=>{
                deleteNotes(del,props.alertToggle) 
              }}></i>
              <i className="fa-solid fa-pen mx-2" onClick={()=>{updateCall(title,description,tag,del)}}></i>

              </div>

            
              
              
            </div>
              <p className="card-text">{description?description:"Undescribed"}....</p>
          </div>
            
        


     
    
   </div>
   </div>
  )
}

export default NoteItems;

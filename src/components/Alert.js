import React , {useContext} from 'react'
import notesContext from '../context/notes/noteContext'

const Alert = (props) => {
    const userNotes = useContext(notesContext);
    let {alertCode} = userNotes;
  
    
  return (
    <div>
          <div className="alert alert-success" role="alert">
             {alertCode} 
          </div>
    </div>
  )
}

export default Alert

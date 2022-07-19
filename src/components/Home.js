import React, {
 
} from 'react'
import Addnotes from './Addnotes'
import Notes from './Notes'




const Home = (props) => {
  document.title = 'StickyNotes'

  return (
    <div className='container my-3'>
      <div className="container my-3">
      <h1 className='mx-2'>Add Notes</h1>
        <Addnotes alertToggle={props.alertToggle} />
      </div>
     
     
      
      
        <div className="container my-2">
        <h1>Your Notes</h1>
          <Notes alertToggle = {props.alertToggle} />
        </div>
      
    </div>
  )
}

export default Home

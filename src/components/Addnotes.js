import React , {useState,useContext
}from 'react'
import notesContext from '../context/notes/noteContext'

const Addnotes = (props) => {
    const userNotes = useContext(notesContext);


    const[note, setNote] = useState({title:"" , description:"" , tag:""})
    const onChange = (e)=>{
        setNote({...note , [e.target.name]:e.target.value})
    }
    const {  AddNotes,alertCheck} = userNotes;
    const handleClick=(e)=>{
        e.preventDefault();
     
        AddNotes(note.title , note.description , note.tag);
        setNote({title:"" , description:"" , tag:""})
        alertCheck("Note Added Successfully!")
        props.alertToggle();

    }

    return (
        <div className='container'>
            <form onSubmit={handleClick}>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value = {note.title} aria-describedby="emailHelp" placeholder="Title" required minLength={5} onChange={onChange}  />

                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" name='description' value={note.description} placeholder="Description" required minLength={5} onChange={onChange}/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} placeholder="Tag" required minLength={3} onChange={onChange}/>
                </div>

                <button type="submit" disabled={note.title.length<5 && note.description.length<5} className="btn btn-primary" >Add</button>
            </form>
        </div>
    )
}

export default Addnotes

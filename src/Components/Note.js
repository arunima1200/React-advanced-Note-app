import {useState} from 'react';

function Note(props) {

    const [isEditing,setEditing] = useState(false);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

   
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function handleEdit(e) {
        e.preventDefault();
        props.edit(props.id,title,content); 
        setEditing(false);
    }

    const editingTemplate = (
        <form>
            <div className='input-group'>
                <label htmlFor='noteTitle'>Title</label>
                <input onChange={handleTitleChange} type='text' id='noteTitle' />
            </div>
            <div className='input-group'>
                <label htmlFor='noteContent'>Content</label>
                <input type='text' onChange={handleContentChange} id='noteContent' />
            </div>
            <button type='submit' onClick={handleEdit}>Save</button>
            <button onClick={()=>{setEditing(false);}}>Cancel</button>
        </form>
    );
    
    const viewTemplate = (
        <div className='note_container'>
            <div className='checkbox'><input type='checkbox' className='bigCheck' defaultChecked={props.isSelected} onChange={()=>{props.toggleSelect(props.id)}} id={props.id}/></div>
            <div className='tit cont'>{props.title}</div>
            <div className='content cont'>{props.content}</div>
            <div className='lastModified cont'>Last Modified at {props.lastModified}</div>
            
            <div className="btn-group">
                <button className='del' onClick={()=>{props.delete(props.id)}}>Delete</button>
                <button className='arch' onClick={()=>{props.archive(props.id)}}>
                {
                    props.isArchived ? 'Unarchive': 'Archive'
                }
                </button>
                <button className='edit' onClick={()=>{setEditing(true);}}>Edit</button>
            </div>
        </div>
    );


    return(
        <li>
            {isEditing ? editingTemplate : viewTemplate}
        </li>
    );
}
export default Note;
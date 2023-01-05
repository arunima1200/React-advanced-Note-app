import {useState} from 'react';

function Form(props) {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleContentChange(e) {
        setContent(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if(title!==''&&content!=='')
        {props.saveNote(title,content);}
        else{return;}
        e.target.reset();
        setTitle('');
        setContent('');
    }
    return(
        <form className='container' onSubmit={handleSubmit}>
            <input className='title' onChange={handleTitleChange} type='text' id='noteTitle' placeholder='Enter Title'/>
            <input className='desc' type='text' onChange={handleContentChange} id='noteContent' placeholder='Enter Description'/>
            <button type='submit' className='add-btn'>Add Note</button>
        </form>
    );
}
export default Form;
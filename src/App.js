import Header from './Components/Header';
import CreateNote from './Components/CreateNote';
import {useState} from 'react';
import MyNotes from './Components/MyNotes';
import './App.css';
import './Components/CreateNote.css';

let backup = [];


function App() {
  const date = new Date();

  const getNotes = () => {
    let myNotes = window.localStorage.getItem('storedNotes');
    if (myNotes) {
      return JSON.parse((window.localStorage.getItem('storedNotes')));
    }
    else {
      return [];
    }
  }
  
  backup = JSON.parse(window.localStorage.getItem('backup'))
  if (backup===null) {backup=[]}
  const [Notes, setNotes]=useState(getNotes());
  const [showMode,setShowMode] = useState('current');
  const [searchString,setSearchString] = useState('');
  
  function saveNote(title, content) {
    const newNote= {
      id: date.getTime(),
      title: title,
      content: content,
      isSelected: false,
      lastModified: date.toLocaleString(),
      isArchived: false
    }
    const addedNote=[...Notes,JSON.stringify(newNote)];
    setNotes(addedNote);
    window.localStorage.setItem('storedNotes', JSON.stringify(addedNote));
  }
  //when checkbox is clicked, make it reflect in Notes and localStorage
  function toggleSelect(id) {
    const selection = Notes.map((note)=>{
      let n=JSON.parse(note);
      if(id===n.id) {
        return JSON.stringify({...n,isSelected:!n.isSelected});
      }
      return note;
    });
    setNotes(selection);
    window.localStorage.setItem('storedNotes',JSON.stringify(selection));
  }

  //delete all selected notes
  function DeleteSelected() {
    let CurrentNotes=[];
    for (let note of Notes) {
      let n=JSON.parse(note);
      if (n.isSelected===false) {
        CurrentNotes.push(note);
      }
      else {
        n.isSelected=false;
        n.isArchived=false;
        backup.push(JSON.stringify(n));
      }
    }
    setNotes(CurrentNotes);
    window.localStorage.setItem('storedNotes',JSON.stringify(CurrentNotes));
    window.localStorage.setItem('backup',JSON.stringify(backup));
  }

  //delete the particular note whose delete button is clicked. Explicitly unarchieves notes if deleted note was an archived one
  function deleteNote(id) {
    let CurrentNotes=[];
    for (let note of Notes) {
      let n=JSON.parse(note);
      if (id!==n.id) {
        CurrentNotes.push(note);
      }
      else {
        n.isSelected=false;
        n.isArchived=false;
        backup.push(JSON.stringify(n));
      }
    }
    setNotes(CurrentNotes);
    window.localStorage.setItem('storedNotes',JSON.stringify(CurrentNotes));
    window.localStorage.setItem('backup',JSON.stringify(backup));
  }
  
  //retrieve all deleted notes. 
  function BackUp() {
    const allNotes=[...Notes,...backup];
    setNotes(allNotes);
    backup=[];
    window.localStorage.setItem('storedNotes',JSON.stringify(allNotes));
    window.localStorage.setItem('backup',JSON.stringify(backup));
  }
  
  //archive all selected notes
  function archiveNotes() {
    const CurrentNotes=Notes.map((note)=>{
      let n=JSON.parse(note);
      if(n.isSelected===true) {
        n.isArchived=true;
        n.isSelected=false;
        return JSON.stringify(n);
      }
      n.isSelected = false;
      return note;
    });
    setNotes(CurrentNotes);
    window.localStorage.setItem('storedNotes',JSON.stringify(CurrentNotes));
  }
  
  //archive the particular note whose archive button is clicked.
  function Archive(id) {
    const CurrentNotes=Notes.map((note)=>{
      let n=JSON.parse(note);
      if(n.id===id) {
        n.isArchived=!n.isArchived;
        n.isSelected=false;
        return JSON.stringify(n);
      }
      return note;
    });
    setNotes(CurrentNotes);
    window.localStorage.setItem('storedNotes',JSON.stringify(CurrentNotes));
  }

  //edit the particular note when save button is clicked in editing mode
  function editNote(id,title,content) {
    const editedNotes = Notes.map((note)=>{
      let n=JSON.parse(note);
      if(id===n.id) {
        return JSON.stringify({...n,title:title,content:content,lastModified:date.toLocaleString()});
      }
      return note;
    });
    setNotes(editedNotes);
    window.localStorage.setItem('storedNotes',JSON.stringify(editedNotes));
  }

  function SearchNotes(e) {
    setSearchString(e.target.value);
  }

  return (
    
   <div className='App'>
      <Header/>

    <div className='searchbar'>
        <input id='searchIp' type='text' placeholder='Search your note here...' onChange={SearchNotes} />
    </div>

    <div className='NoteCreator'>
    <CreateNote saveNote={saveNote}/>
   </div>

    <div> 
      {
        Notes.length > 0 ?
      (<div className="btns">
        <button className='btn' onClick={archiveNotes}>Archive</button>
        <button className='btn' onClick={BackUp}>Backup</button>
        <button className='btn' onClick={DeleteSelected}>Delete</button>
        <button className='btn' onClick={()=>{setShowMode('all');}}>Show All</button>
        <button className='btn' onClick={()=>{setShowMode('archives');}}>Show Archives</button>
        <button className='btn' onClick={()=>{setShowMode('current');}}>Show Active</button>
      </div>):''
      }
      
      <p className='notes_head'>My Notes</p>
      {
        Notes.length === 0 ?
        <p className='notes_msg'>No notes yet... Please Add new notes!!</p> : ''
      }
      
      <div className='notesBox'>
        <MyNotes Notes={Notes} toggleSelect={toggleSelect} delete={deleteNote} edit={editNote} archive={Archive} showMode={showMode} searchString={searchString}/>
      </div>
    </div>
    
   </div>
   
  );
}

export default App;

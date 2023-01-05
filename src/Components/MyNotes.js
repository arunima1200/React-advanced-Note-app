import Note from "./Note";
import './MyNotes.css';

function NoteList(props) {
    let n;
    if(props.showMode==='current') {
        n=props.Notes.filter((note)=>JSON.parse(note).isArchived===false);
    }
    else if(props.showMode==='archives') {
        n=props.Notes.filter((note)=>JSON.parse(note).isArchived===true);
    }
    else if(props.showMode==='all'){
        n=props.Notes;
    }
    if(props.searchString!=='')
    {
        n = n.filter((filtered) =>JSON.parse(filtered).title.toLowerCase().includes(props.searchString.toLowerCase()) ||
        JSON.parse(filtered).content.toLowerCase().includes(props.searchString.toLowerCase()))
    }
    return (
    <ul>
        {
          n.map((stringyNote)=>{
            let note=JSON.parse(stringyNote);
            return(
              <Note id={note.id}
                title={note.title}
                content={note.content}
                isSelected={note.isSelected}
                lastModified={note.lastModified}
                isArchived={note.isArchived}
                key={note.id}
                toggleSelect={props.toggleSelect}
                delete={props.delete}
                edit={props.edit}
                archive={props.archive}
              />
            );
          })
        }
      </ul>
    );
}
export default NoteList;
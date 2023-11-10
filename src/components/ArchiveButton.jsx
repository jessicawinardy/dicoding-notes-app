import React from 'react';

function ArchiveButton({id, onArchive, archived}){
    if(!archived){
        return(<button className='note-item__archive-button' onClick={()=>onArchive(id)}>Archive</button>);
    }
    else{
        return(
            <button className='note-item__archive-button' onClick={()=>onArchive(id)}>Active</button>
        );
    }
    }

export default ArchiveButton;
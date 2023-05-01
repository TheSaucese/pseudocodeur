import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import Declare from "./Declare";

import { fields } from "./fields";
import Operation from "./Operation";
import Read from "./Read";
import Trash from "./Trash";
import Type from "./Type";
import Variable from "./Variable";
import Write from "./Write";

export function SidebarField(props) {
  const { field, overlay } = props;
  const { title } = field;

  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
  }
  switch(title){
    case 'Declarer' : return <Declare className={className}/>
    case 'Operation' : return <Operation className={className}/>
    case 'Lire' : return <Read className={className}/>
    case 'Ecrire' : return <Write className={className}/>
    default : return 
    }
}

function DraggableSidebarField(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true
    }
  });

  return (
    <div
      ref={setNodeRef}
      className="sidebar-field"
      {...listeners}
      {...attributes}
    >
      <SidebarField field={field} {...rest} />
    </div>
  );
}

export default function Sidebar(props) {
  const {overid,show,fieldsRegKey } = props;
  const [tags, setTags] = useState([]); // Add state hook for tags array

  const OperationType = [
    {
      type: "+",
    },
    {
      type: "lire",
  
    },
    {
      type: "ecrire",
      
    },
    {
      type: "operation",
    
    },
  ];

  const handleTagsUpdate = (updatedTags) => {
    setTags(updatedTags);
  };


  return (
    <div key={fieldsRegKey} className="sidebar">
      <div>
      {show && fields.map((f) => (
        <DraggableSidebarField key={f.type} field={f} />
      ))}
      </div>
      {show && fields.map((f) => (
        <Type key={f.type} field={f} />
      ))}
      <div>
      {show && <Variable onTagsUpdate={handleTagsUpdate} tags={tags} key={'variable'} field={{type:'variable',title:'cool variable'}}/>}  
      </div>

      {!show && <Trash overid={overid}/>}
    </div>
  );
}

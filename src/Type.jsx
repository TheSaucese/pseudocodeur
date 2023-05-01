import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef, useState } from "react";
import Declare from "./Declare";

export function OpType(props) {
  const { field, overlay } = props;

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

export default function Type(props) {
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
      <OpType {...rest} />
    </div>
  );
}
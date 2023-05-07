import { useDraggable } from "@dnd-kit/core";
import { nanoid } from "nanoid";
import { useRef } from "react";

export function OpType(props) {
  const { field, overlay } = props;
  
  let className = "sidebar-field";
  if (overlay) {
    className += " overlay";
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
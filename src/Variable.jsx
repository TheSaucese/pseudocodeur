import { useDraggable } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";

function Variable(props) {
  const { field, tags, onTagsUpdate } = props; // Use tags prop and onTagsUpdate prop

  const ENTER = 13;
  const COMMA = 188;
  const BACKSPACE = 8;
  const [value, setValue] = useState("");

  const handleKeyUp = (e) => {
    const key = e.keyCode;
    if (key === ENTER || key === COMMA) {
      addTag();
    }
  };

  const handleKeyDown = (e) => {
    const key = e.keyCode;
    if (key === BACKSPACE && !value) {
      editTag();
    }
  };

  const addTag = () => {
    let tag = value.trim().replace(/,/g, "");
    if (!tag) return;
    let updatedTags = [...tags, tag];
    onTagsUpdate(updatedTags); // Call callback function to update parent prop
    setValue("");
  };

  const editTag = () => {
    let newTags = [...tags];
    setValue(newTags.pop());
    onTagsUpdate(newTags); // Call callback function to update parent prop
  };

  return (
    <div 
    className="">
        <input
          type="text"
          placeholder="Ajouter une variable..."
          autoFocus
          className="w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      <div
      className="flex flex-wrap">
        {tags.map((tag, index) => (
          <Taggers field={field} tag={tag} index={index} key={index}/>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Variable);
function Taggers(props) {

  const { field,tag,index } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef, } = useDraggable({
    id: id.current,
    data: {
      field,
      tag,
      fromSidebar: true
    }
  });

  return <div
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    key={index}
    className="tag">
    {tag}
  </div>;
}


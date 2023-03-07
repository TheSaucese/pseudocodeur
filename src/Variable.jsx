import { useDraggable } from "@dnd-kit/core";
import React, { useRef, useState } from "react";
import { nanoid } from "nanoid";

export default function Variable(props) {
  const { field, ...rest } = props;

  const id = useRef(nanoid());

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
      fromSidebar: true
    }
  });

  const ENTER = 13;
  const COMMA = 188;
  const BACKSPACE = 8;
  const [tags, setTags] = useState([]);
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
    setTags([...tags, tag]);
    setValue("");
  };

  const editTag = () => setValue(tags.pop());

  return (
    <div 
    className="">
        <input
          type="text"
          placeholder="Add tag..."
          autoFocus
          className="w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      <div
      ref={setNodeRef}
      {...listeners}
      {...attributes} 
      className="flex flex-wrap">
        {tags.map((tag, index) => (
          <div key={index} className="tag">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

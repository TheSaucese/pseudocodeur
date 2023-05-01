import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { renderers } from "./fields";

function getRenderer(type, variables,id) {
  if (type === "spacer") {
    return () => {
      return <div className="spacer">spacer</div>;
    };
  }

  const renderer = renderers[type];

  if (renderer) {
    return () => renderer({ variables,id });
  }

  return () => <div>No renderer found for {type}</div>;
}



export function Field(props) {
  const { field, overlay, variables, id, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type,variables,id);

  let className = "canvas-field";
  
  if (overlay) {
    className += " overlay";
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
}

function SortableField(props) {
  const { id, index, field, variables } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    data: {
      index,
      id,
      field
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} variables={variables} id={id} />
    </div>
  );
}

export default function Canvas(props) {
  const { fields,variables } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useDroppable({
    id: "canvas_droppable",
    data: {
      parent: null,
      isContainer: true
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      className="canvas"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className='bg-[#9579c0] m-auto rounded-md space-y-5 p-3 w-fit'>
    <div>début</div>
    <div className='bg-[#805bb8] shadow-inner min-w-[64rem] min-h-[32rem] ml-3 rounded-md'>
    <div className="canvas-fields">
      {fields?.map((f, i) => {
          return <SortableField key={f.id} id={f.id} field={f} variables={variables} index={i} />
        })} 
      </div>
    </div>
    <div>fin</div>
    </div>

    </div>
  );
}

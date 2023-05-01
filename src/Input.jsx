import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

function getRenderer(type,tag,vParentID,parentID) {
  console.log("Vparent is",vParentID)
  console.log("parent is",parentID)
  if (type === "spacer"&&vParentID===parentID) {
    return () => {
      return <div className="bg-gray-200 rounded-xl w-[1.5rem] h-[1.5rem]"></div>;
    };
  } else if (tag&&vParentID===parentID) {
    return () => {
      return <div className="bg-[#3b91ca] rounded-xl w-[1.5rem] mx-1">{tag}</div>;
    };
  } else {
    return () => {
      return 
    };
  }
  
}

export function Variable(props) {
  const { field, overlay,tag, vParentID, parentID, ...rest } = props;
  const { type } = field;

  const Component = getRenderer(type,tag,vParentID,parentID);

  return (
    <div>
      <Component {...rest} />
    </div>
  );
}


function SortableVariable(props) {
  const { id, index, field } = props;

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
      <Variable field={field} />
    </div>
  );
}

export default function Input({variables,parentID}) {

  console.log(variables)

  return (
    <div className="rounded-2xl w-[1.5rem] min-w-min h-[1.5rem] flex flex-row text-center shadow focus:shadow-outline focus:outline-none appearance-none bg-white">
  {variables?.map((f, i) => (
    <Variable key={f.id} id={f.id} field={f} index={i} tag={f.tag} vParentID={f.parentID} parentID={parentID} />
  ))}
</div>


  );
}

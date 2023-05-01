
let leftOrRight=null;

function getRenderer(type, tag, vParentID, parentID, Position, ParentType) {
  console.log("parent type",ParentType)
  if (ParentType==="operation") {
    if (Position === leftOrRight) {
      console.log("Position is",Position)
      if (type === "spacer" && vParentID === parentID) {
        return () => {
          return <div className="bg-gray-500 rounded-xl w-[1.5rem] h-[1.5rem]"></div>;
        };
      }
      else if (tag && vParentID === parentID) {
        return () => {
          return <div className="bg-[#3b91ca] rounded-xl w-[1.5rem] mx-1">{tag}</div>;
        };
      }
    }
  } else if (type === "spacer" && vParentID === parentID) {
    return () => {
      return <div className="bg-gray-500 rounded-xl w-[1.5rem] h-[1.5rem]"></div>;
    };
  } else if (tag && vParentID === parentID) {
    return () => {
      return <div className="bg-[#3b91ca] rounded-xl w-[1.5rem] mx-1">{tag}</div>;
    };
  } else {
    return () => {
      return null;
    };
  }
}

export function Variable(props) {
  const { type, tag, vParentID, parentID, Position, ParentType, ...rest } = props;


  const Component = getRenderer(type, tag, vParentID, parentID, Position, ParentType);

  if (Component) {
    return (
      <div>
        <Component {...rest} />
      </div>
    );
  } else {
    return null;
  }
}

export default function Input({ variables, pparentID, isFirstChild }) {
  console.log(variables)
  leftOrRight=isFirstChild;
  return (
    <div className="rounded-2xl w-[1.5rem] min-w-min h-[1.5rem] flex flex-row text-center shadow focus:shadow-outline focus:outline-none appearance-none bg-white">
      {variables?.map((f, i) => (
        <Variable key={f.id} id={f.id} type={f.type} index={i} tag={f.tag} vParentID={f.parentID} parentID={pparentID} Position={f.Position} ParentType={f.ParentType} />
      ))}
    </div>
  );
}

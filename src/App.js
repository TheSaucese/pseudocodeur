import { useRef, useState } from "react";
import { useImmer } from "use-immer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import Announcements from "./announcements";
import Canvas, { Field } from "./canvas";
import Sidebar, { SidebarField } from "./sidebar";

function getData(prop) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id,parentid }) {
  return {
    id,
    type: "spacer",
    title: "spacer",
    parentID : parentid
  };
}

export default function App() {

  const [show,setShow]=useState(true);
  const [overid,setoverid]=useState(false);
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now()
  );
  const spacerInsertedRef = useRef();
  const currentDragFieldRef = useRef();
  const [activeVariable,setActiveVariable] = useState();
  const [activeSidebarField, setActiveSidebarField] = useState(); // only for fields from the sidebar
  const [activeField, setActiveField] = useState(); // only for fields that are in the form.
  const [data, updateData] = useImmer({
    fields: []
  });
  const [dataVar, updateDataVar] = useImmer({
    variables: []
  });

  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    setActiveVariable(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  const handleDragStart = (e) => {
    const { active } = e;
    const activeData = getData(active);
    

    // This is where the cloning starts.
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveVariable(type==="variable"?activeData:null)
      setActiveSidebarField(field);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.
      if (type==="variable") {
        currentDragFieldRef.current = {
          id: active.id,
          type,
          name: `${type}${fields.length + 1}`,
          parent: null,
          tag: activeData.tag
        };
      }
      else {
        currentDragFieldRef.current = {
          id: active.id,
          type,
          name: `${type}${fields.length + 1}`,
          parent: null
        };
      }
      return;
    }
    else {
      setShow(false);
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    const { type } = field;
    // when you drag from canvas
    if(type==="variable") {
      console.log("here's the thing ")
      updateDataVar((draft) => {
        draft.variables.splice(index, 1, createSpacer({ id: active.id, }));
      });
    }
    else {
      updateData((draft) => {
        draft.fields.splice(index, 1, createSpacer({ id: active.id }));
      });
    }
    
  };

  const handleDragOver = (e) => {
    const { active, over } = e;
    const activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);
      const { field } = activeData;
      const { type } = field;

      if(type!=="variable") {
        if (!spacerInsertedRef.current) {
          const spacer = createSpacer({
            id: active.id + "-spacer"
          });
          updateData((draft) => {
            if (!draft.fields.length) {
              draft.fields.push(spacer);
            } else {
              const nextIndex =
                overData.index > -1 ? overData.index : draft.fields.length;

              draft.fields.splice(nextIndex, 0, spacer);
            }
            spacerInsertedRef.current = true;
          });
        } else if (!over) {
          // This solves the issue where you could have a spacer handing out in the canvas if you drug
          // a sidebar item on and then off
          updateData((draft) => {
            draft.fields = draft.fields.filter((f) => f.type !== "spacer");
          });
          spacerInsertedRef.current = false;
        } else {
          // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
          // we need to make sure we're updating the spacer position to reflect where our drop will occur.
          // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
          updateData((draft) => {
            const spacerIndex = draft.fields.findIndex(
              (f) => f.id === active.id + "-spacer"
            );

            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length - 1;

            if (nextIndex === spacerIndex) {
              return;
            }

            draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
          });
        }
      }
      else if (over?.id!="canvas_droppable") {
        console.log(over)
        if (!spacerInsertedRef.current) {
          console.log("holyshit")
          const spacer = createSpacer({
            id: active.id + "-spacer",
            parentid : over.id
          });
          updateDataVar((draft) => {
            if (!draft.variables.length) {
              draft.variables.push(spacer);
            } else {
              const nextIndex =
                overData.index > -1 ? overData.index : draft.variables.length;

              draft.variables.splice(nextIndex, 0, spacer);
            }
            spacerInsertedRef.current = true;
          });
        } else if (!over) {
          console.log("or here??/")
          // This solves the issue where you could have a spacer handing out in the canvas if you drug
          // a sidebar item on and then off
          updateDataVar((draft) => {
            draft.variables = draft.variables.filter((f) => f.type !== "spacer");
          });
          spacerInsertedRef.current = false;
        } else {
          console.log("maybe here ??")
          // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
          // we need to make sure we're updating the spacer position to reflect where our drop will occur.
          // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
          updateDataVar((draft) => {
            const spacerIndex = draft.variables.findIndex(
              (f) => f.id === active.id + "-spacer"
            );

            const nextIndex =
              overData.index > -1 ? overData.index : draft.variables.length - 1;

            if (nextIndex === spacerIndex) {
              return;
            }

            draft.variables = arrayMove(draft.variables, spacerIndex, overData.index);
          });
        }
      }
    }
    setoverid(!over?.id)
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    const activeData = getData(active);
    const { field } = activeData;
    const { type } = field;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData((draft) => {
        draft.fields = draft.fields.filter((f) => f.type !== "spacer");
      });
      setShow(true);
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    let nextField = currentDragFieldRef.current;

    if (nextField&&type!=="variable") {
      const overData = getData(over);

      updateData((draft) => {
        const spacerIndex = draft.fields.findIndex((f) => f.type === "spacer");
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0
        );
      });
    }
    else if (type==="variable") {
      const overData = getData(over);

      updateDataVar((draft) => {
        const spacerIndex = draft.variables.findIndex((f) => f.type === "spacer");
        draft.variables.splice(spacerIndex, 1, nextField);
        draft.variables = arrayMove(
          draft.variables,
          spacerIndex,
          overData.index || 0
        );
      });
      updateDataVar((draft) => {
        const lastVarIndex = draft.variables.length - 1;
        draft.variables[lastVarIndex].parentId = over.id;
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
    setShow(true);
  };

  const { fields } = data;
  const { variables } = dataVar;
  return (
    <div className="app">
      <div className="content">
        <DndContext
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          autoScroll
        >
          <Announcements />
          <Sidebar overid={overid} show={show} fieldsRegKey={sidebarFieldsRegenKey} />
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={fields.map((f) => f.id)}
          >
            <Canvas fields={fields} variables={variables} />
          </SortableContext>
          <DragOverlay  dropAnimation={false}>
            {activeSidebarField ?  (
              <SidebarField overlay field={activeSidebarField} />
            ) : null}
            {activeField ? <Field overlay field={activeField} /> : null}
            {activeVariable && !activeField && <div className="tag"> {activeVariable.tag} </div>}  
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}

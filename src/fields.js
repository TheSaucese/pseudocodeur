import Declare from "./Declare";
import Operation from "./Operation";
import Read from "./Read";
import Write from "./Write";

// These will be available from the sidebar
export const fields = [
  {
    type: "declare",
    title: "Declarer"
  },
  {
    type: "lire",
    title: "Lire"
  },
  {
    type: "ecrire",
    title: "Ecrire"
  },
  {
    type: "operation",
    title: "Operation"
  },
];

// These define how we render the field
export const renderers = {
  declare: (props) => <Declare variables={props.variables} id={props.id} />,
  operation: (props) => <Operation variables={props.variables} id={props.id} />,
  lire: (props) => <Read variables={props.variables} id={props.id}/>,
  ecrire: () => <Write />,
};




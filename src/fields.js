import Declare from "./Declare";
import Operation from "./Operation";
import Read from "./Read";
import Write from "./Write";

// These will be available from the sidebar
export const fields = [
  {
    type: "declare",
    title: "Declarer",
    subtype: "Entier"
  },
  {
    type: "declare",
    title: "Declarer",
    subtype: "Reel"
  },
  {
    type: "declare",
    title: "Declarer",
    subtype: "String"
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
    title: "Operation",
    subtype: "+"
  },
  {
    type: "operation",
    title: "Operation",
    subtype: "-"
  },
  {
    type: "operation",
    title: "Operation",
    subtype: "/"
  },
  {
    type: "operation",
    title: "Operation",
    subtype: "*"
  },
];

// These define how we render the field
export const renderers = {
  declare: (props) => <Declare variables={props.variables} id={props.id} subtype={props.subtype} />,
  operation: (props) => <Operation variables={props.variables} id={props.id} subtype={props.subtype} />,
  lire: (props) => <Read variables={props.variables} id={props.id}/>,
  ecrire: () => <Write />,
};




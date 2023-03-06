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
  declare: () => <Declare/>,
  operation: () => <Operation/>,
  lire: () => <Read/>,
  ecrire: () => <Write/>,
};

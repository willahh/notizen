import { LeafType } from '../Leaf';

interface IBoldLeafProps {}
export const BoldLeaf = (props: any) => {
  return (
    <strong {...props.attributes} className="font-bold">
      {props.children}
    </strong>
  );
};

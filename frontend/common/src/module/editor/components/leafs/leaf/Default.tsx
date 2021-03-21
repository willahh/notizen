interface IDefaultLeafProps {}
export const DefaultLeaf = (props: any) => {
  return <span {...props.attributes}>{props.children}</span>;
};

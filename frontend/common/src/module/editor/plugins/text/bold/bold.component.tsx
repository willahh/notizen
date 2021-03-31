import React from 'react';

const BoldLeaf = (props: any) => {
  return (
    <strong {...props.attributes} className="font-bold">
      {props.children}
    </strong>
  );
};

export default React.memo(BoldLeaf);

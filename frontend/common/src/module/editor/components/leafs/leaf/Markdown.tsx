export const MarkdownHeading1: React.FC = (props: any) => (
  <h1 {...props.attributes} className="font-semibold text-4xl">
    {props.children}
  </h1>
);
export const MarkdownHeading2: React.FC = (props: any) => (
  <h3 {...props.attributes} className="font-semibold text-2xl">
    {props.children}
  </h3>
);

export const MarkdownHeading3: React.FC = (props: any) => (
  <h3 {...props.attributes} className="font-semibold text-xl">
    {props.children}
  </h3>
);

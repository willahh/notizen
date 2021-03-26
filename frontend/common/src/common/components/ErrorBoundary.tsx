import React from 'react';

const logErrorToMyService = (error: any, info: any) => {
  console.error('[x] ERRRRRROR', error, info);
};

export class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: any, info: any) {
    console.log('[x] componentDidCatch', error, info);

    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      console.log('[x] hasError');

      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

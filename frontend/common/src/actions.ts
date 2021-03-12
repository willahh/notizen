export const actionNameToAction = new Map();

export const addAction = (name: string, action: any) => {
  actionNameToAction.set(name, action);
};

export const getAction = (name: string) => {
  actionNameToAction.get(name);
};


// debug only
declare global {
  interface Window {
    actionNameToAction: any;
  }
}
window.actionNameToAction = actionNameToAction;

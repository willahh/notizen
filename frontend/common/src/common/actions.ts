export const actionNameToAction = new Map();

export const addAction = (name: string, action: any) => {
  actionNameToAction.set(name, action);
};

export const getAction = (name: string) => {
  actionNameToAction.get(name);
};
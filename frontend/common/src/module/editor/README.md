# Editor module
This document describe the editor module.



## Executing action

- Each actions should be sent via dispatchCommand :

```javascript
dispatchCommand({
  name: unsetAction.type,
  action: unsetAction(unsetActionPayload),
  dispatch,
  payload: unsetActionPayload,
});
```

An `Action` encapsulate a `Redux Action`.

- Actions should be simple and precise :
  - Don't dispatch generic actions with type like `UPDATE_EDITOR` with a huge payload. Instead dispatch small actions like :  
    ```javascript
    dispatchCommand({
      name: 'INSERT_TEXT',
      payload: { text: 'Word', position: 100 },
    });
    ```
  - Don't dispatch toggle action :  
    Don't :
    ```javascript
    dispatchCommand({
      name: 'TOGGLE_BOLD',
      payload: { position: 100 },
    });
    ```
    Do :
    ```javascript
    dispatchCommand({
      name: 'SET_BOLD',
      payload: { position: 100 },
    });
    dispatchCommand({
      name: 'UNSET_BOLD',
      payload: { position: 100 },
    });
    ```

When an action need logic before dispatching a `Command`, write a new service into editor.service.ts :  
For example, when button need to do a toggle action.

## Creating a new action for an Element
1. Start by creating a new element 
- Add a new element folder file, follow the structure of default element :
 editor/components/elements/myElement
- editor/components/elements/elements.tsx
  - Import the new file
  - Add a new entry into ElementType enum :
```javascript
export enum ElementType {
  Default = 'DEFAULT',
  MyElement = 'MY_ELEMENT'
}
```
  - Add a new case into `renderElement`

2. 

import { useEffect, useRef, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Range } from 'slate';
import { CSSTransition } from 'react-transition-group';
import { NoteToolbarInline } from '../../../../note/components/noteDetail/NoteToolbarInline';

export const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      setIsDropdownOpen(false);
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    
    console.log('#rect ', rect);
    console.log('#el ', el);
    
    if (el) {
      const rect2 = el.getBoundingClientRect();
      el.style.top = rect.y - rect2.y + 'px';
      el.style.left = rect.x - rect2.x + 'px';
      // el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight - rect2.top}px`;
      // el.style.left = `${
      //   (rect.left - el.offsetWidth / 2 + rect.width / 2) -  rect2.left
      // }px`;
    } else {
      console.warn('!el');
    }

    setIsDropdownOpen(true);
  });

  return (
    <CSSTransition
      in={isDropdownOpen}
      timeout={400}
      classNames="dropdown"
      unmountOnExit
    >
      <span
        ref={ref}
        className=" absolute p-8 z-10 opacity-1 bg-white dark:bg-black
        inline-flex shadow-sm
        px-2 py-0.5"
      >
        <NoteToolbarInline editor={editor} />
      </span>
    </CSSTransition>
  );
};

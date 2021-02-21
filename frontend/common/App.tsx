import React from 'react';
import { SidebarDesktop } from '@notizen/frontend-common/components/SidebarDesktop';
import { MainArea } from '@notizen/frontend-common/components/MainArea';
import { AreaSecondary } from '@notizen/frontend-common/components/AreaSecondary';
import { MenuMobile } from '@notizen/frontend-common/components/MenuMobile';
import { Main } from '@notizen/frontend-common/components/Main';
import { ItemList } from '@notizen/frontend-common/components/ItemList';
import { NoteFilter } from '@notizen/frontend-common/components/NoteFilter';
import { NoteItem } from '@notizen/frontend-common/components/NoteItem';
import { NoteList } from '@notizen/frontend-common/componentsV2/NoteList';
import { NoteDetail } from '@notizen/frontend-common/componentsV2/NoteDetail';
import Text from '@notizen/frontend-common/components/Text';
import { Toolbar } from '@notizen/frontend-common/componentsV2/Toolbar';
const scrollbar = require('smooth-scrollbar-react');
const ScrollBar = scrollbar.default;

// const ResizePanelImport = require('react-resize-panel');
// const { default: ResizePanel } = ResizePanelImport;

function App() {
  const splitPos = localStorage.getItem('splitPos');

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-black">
      <MenuMobile></MenuMobile>
      <SidebarDesktop></SidebarDesktop>
      <Main>
        <AreaSecondary>
          <NoteFilter />
          <div></div>
          {/* // TODO: SplitPane */}
          {/* <SplitPane
            split="vertical"
            minSize={50}
            defaultSizes={
              JSON.parse(splitPos || '10')
            }
            onDragFinished={(size) =>
              localStorage.setItem('splitPos', JSON.stringify(size))
            }
          >
            <div>Item a </div>
            <div>Item b</div>
          </SplitPane> */}

          <NoteList />
        </AreaSecondary>
        <MainArea>
          <Toolbar />
          <NoteDetail />
        </MainArea>
      </Main>
    </div>
  );
}

export default App;

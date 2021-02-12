import React from 'react';
import { Counter } from './features/counter/Counter';
import { Card } from './components/Card';
import { SidebarDesktop } from './components/SidebarDesktop';
import { MainArea } from './components/MainArea';
import { AreaSecondary } from './components/AreaSecondary';
import { MenuMobile } from './components/MenuMobile';
import { Main } from './components/Main';
import './App.css';

function App() {
  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <MenuMobile></MenuMobile>
      <SidebarDesktop></SidebarDesktop>
      <Main>
        <MainArea>
          <Counter />
          <Card />
        </MainArea>
        <AreaSecondary>
        </AreaSecondary>
      </Main>
    </div>
  );
}

export default App;

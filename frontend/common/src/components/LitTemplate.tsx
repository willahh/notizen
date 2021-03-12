import React from 'react';
import { MenuMobile } from '@notizen/frontend-common/src/components/MenuMobile';
import { Main } from '@notizen/frontend-common/src/components/Main';

interface ILitTemplateProps {
  children: React.ReactElement | React.ReactElement[];
}

const LitTemplate: React.FC<ILitTemplateProps> = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-black">
      <MenuMobile></MenuMobile>
      {/* <SidebarDesktop></SidebarDesktop> */}
      <Main>{children}</Main>
    </div>
  );
};

export default LitTemplate;

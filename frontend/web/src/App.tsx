import React from 'react';
import { SidebarDesktop } from './components/SidebarDesktop';
import { MainArea } from './components/MainArea';
import { AreaSecondary } from './components/AreaSecondary';
import { MenuMobile } from './components/MenuMobile';
import { Main } from './components/Main';
import { ItemList } from './components/ItemList';
import { NoteFilter } from './components/NoteFilter';
import { NoteToolbar } from './components/NoteToolbar';
import { NoteItem } from './components/NoteItem';
import { SplitPane } from 'react-multi-split-pane';

const ResizePanelImport = require('react-resize-panel');
const { default: ResizePanel } = ResizePanelImport;

function App() {
  const splitPos = localStorage.getItem('splitPos');

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <MenuMobile></MenuMobile>
      <SidebarDesktop></SidebarDesktop>

      <Main>
        <AreaSecondary>
          <NoteFilter />
          <NoteToolbar />

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

          <ItemList>
            <NoteItem></NoteItem>
            <NoteItem></NoteItem>
            <NoteItem></NoteItem>
          </ItemList>
        </AreaSecondary>
        <MainArea>
          <div className="flex-shrink-0 bg-white border-b border-gray-200">
            {/* Toolbar*/}
            <div className="h-16 flex flex-col justify-center">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="py-3 flex justify-between">
                  {/* Left buttons */}
                  <div>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                      <span className="inline-flex sm:shadow-sm">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <svg
                            className="mr-2.5 h-5 w-5 text-gray-400"
                            x-description="Heroicon name: solid/reply"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>+note</span>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <svg
                            className="mr-2.5 h-5 w-5 text-gray-400"
                            x-description="Heroicon name: solid/pencil"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                          <span>Aa</span>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <svg
                            className="mr-2.5 h-5 w-5 text-gray-400"
                            x-description="Heroicon name: solid/user-add"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          </svg>
                          <span>[x]</span>
                        </button>
                      </span>
                      <span className="hidden lg:flex space-x-3">
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <svg
                            className="mr-2.5 h-5 w-5 text-gray-400"
                            x-description="Heroicon name: solid/archive"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                            <path
                              fillRule="evenodd"
                              d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>[-|-]</span>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <svg
                            className="mr-2.5 h-5 w-5 text-gray-400"
                            x-description="Heroicon name: solid/folder-download"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            <path
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 9v4m0 0l-2-2m2 2l2-2"
                            />
                          </svg>
                          <span>Move</span>
                        </button>
                      </span>
                      <span className="-ml-px relative block sm:shadow-sm lg:hidden">
                        <div>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3"
                            id="menu-3"
                            aria-haspopup="true"
                          >
                            <span className="sr-only sm:hidden">More</span>
                            <span className="hidden sm:inline">More</span>
                            <svg
                              className="h-5 w-5 text-gray-400 sm:ml-2 sm:-mr-1"
                              x-description="Heroicon name: solid/chevron-down"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-3"
                          style={{ display: 'none' }}
                        >
                          <div className="py-1">
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Note
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Assign
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Archive
                            </a>
                            <a
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900"
                              role="menuitem"
                            >
                              Move
                            </a>
                          </div>
                        </div>
                      </span>
                    </span>
                  </div>
                  {/* Right buttons */}
                </div>
              </div>
            </div>
            {/* Message header */}
          </div>

          <div className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 base-style">
            <div contentEditable="true">
              <h1>Heading title</h1>
              <h2>Heading 2</h2>
              <h3>Heading 3</h3>
              <p>Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.</p>
              <h3>Heading 3</h3>
              <p>Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in
              a rerum natus facere. Enim rerum eaque qui facilis. Numquam
              laudantium sed id dolores omnis in. Eos reiciendis deserunt
              maiores et accusamus quod dolor.</p>
              <ul>
                <li>Item list 1</li>
                <li>Item list 2</li>
                <li>Item list 3</li>
              </ul>

              <h3>Table</h3>
              <table>
                <tr>
                  <td>Item 1</td>
                  <td>Item 2</td>
                  <td>Item 3</td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Item 2</td>
                  <td>Item 3</td>
                </tr>
              </table>
            </div>
          </div>
        </MainArea>
      </Main>
    </div>
  );
}

export default App;

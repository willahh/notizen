import React from 'react';
import { SidebarDesktop } from '@notizen/frontend-common/components/SidebarDesktop';
import { MainArea } from '@notizen/frontend-common/components/MainArea';
import { AreaSecondary } from '@notizen/frontend-common/components/AreaSecondary';
import { MenuMobile } from '@notizen/frontend-common/components/MenuMobile';
import { Main } from '@notizen/frontend-common/components/Main';
import { ItemList } from '@notizen/frontend-common/components/ItemList';
import { NoteFilter } from '@notizen/frontend-common/components/NoteFilter';
import { NoteItem } from '@notizen/frontend-common/components/NoteItem';
import Text from '@notizen/frontend-common/components/Text';
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

          <ItemList>
            <NoteItem
              title="Chapter 1"
              tags={['Clojure for the Brave and True']}
              text="Building, Running, and the REPL
              In this chapter, you’ll invest a small amount of time up front to get familiar with a quick, foolproof way to build and run Clojure programs. It feels great to get a real program running. Reaching that milestone frees you up to experiment, share your work, and gloat to your colleagues who are still using last decade’s languages. This will help keep you motivated!
              "
              isSelected={true}
            ></NoteItem>
            <NoteItem
              title="Chapter 2"
              tags={['Clojure for the Brave and True']}
              text="Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
            <NoteItem
              title="Doloremque dolorem maiores assumenda dolorem facilis"
              tags={['Personal notes']}
              text="Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
            <NoteItem
              title="Doloremque dolorem maiores assumenda dolorem facilis"
              tags={['Personal notes']}
              text="Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
            <NoteItem
              title="Doloremque dolorem maiores assumenda dolorem facilis"
              tags={['Personal notes']}
              text="Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
            <NoteItem
              title="Doloremque dolorem maiores assumenda dolorem facilis"
              tags={['Personal notes']}
              text="Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
            <NoteItem
              title="Doloremque dolorem maiores assumenda dolorem facilis"
              tags={['Personal notes']}
              text="Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
            <NoteItem
              title="Doloremque dolorem maiores assumenda dolorem facilis"
              tags={['Personal notes']}
              text="Velit vel in a
          rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium
          sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus
          quod dolor."
              isSelected={false}
            ></NoteItem>
          </ItemList>
        </AreaSecondary>
        <MainArea>
          <div className="sticky top-0 h-16 flex-shrink-0 border-b-1 border-gray-200 bg-white dark:bg-black dark:border-gray-800">
            {/* Toolbar*/}
            <div className="flex flex-col justify-center">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="py-3 flex justify-between">
                  {/* Left buttons */}
                  <div>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md sm:shadow-none sm:space-x-3">
                      <span className="inline-flex sm:shadow-sm">
                        <button
                          type="button"
                          className="relative inline-flex items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800 dark:border-gray-800"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M21 5V3H3V5H21Z" fill="currentColor" />
                            <path d="M21 19V21H3V19H21Z" fill="currentColor" />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.0001 7.37636C11.602 7.35207 11.2112 7.56874 11.0325 7.95204L7.65154 15.2025C7.41815 15.7031 7.6347 16.2981 8.13522 16.5315C8.63577 16.7649 9.23074 16.5484 9.46417 16.0477L9.95278 14.9999H14.0473L14.5359 16.0477C14.7693 16.5484 15.3643 16.7649 15.8648 16.5315C16.3654 16.2981 16.5819 15.7031 16.3485 15.2025L12.9676 7.95204C12.7888 7.56874 12.3981 7.35207 12.0001 7.37636ZM13.1147 12.9999H10.8854L12.0001 10.6095L13.1147 12.9999Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-r-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </span>
                      <span className="hidden lg:flex space-x-3">
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="hidden sm:inline-flex -ml-px relative items-center px-4 py-2 rounded-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-white dark:bg-black dark:border-gray-800"
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                            />
                          </svg>
                        </button>
                      </span>
                      <span className="-ml-px relative block sm:shadow-sm lg:hidden">
                        <div>
                          <button
                            type="button"
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border-1 border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 sm:rounded-md sm:px-3 bg-white dark:bg-black"
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
                          className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-white dark:bg-black"
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
                      <span className="inline-flex sm:shadow-sm">
                        <div>
                          <button
                            type="button"
                            className="relative bg-gray-100 inline-flex items-center px-4 py-2 rounded-l-md border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-black dark:border-gray-800"
                          >
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 10h16M4 14h16M4 18h16"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="-ml-px relative inline-flex items-center px-4 py-2 border-1 border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md bg-white dark:bg-black dark:border-gray-800"
                          >
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                              />
                            </svg>
                          </button>
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
          <ScrollBar damping={0.5} thumbMinSize={20}>
            <div className="flex h-full       py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 base-style          items-center justify-center                   bg-gray-50 dark:text-gray-300 dark:bg-gray-900">
              <div className="max-w-lg text-justify">
                <h1>Chapter 1</h1>
                <h2>Building, Running, and the REPL</h2>
                <p>
                  In this chapter, you’ll invest a small amount of time up front
                  to get familiar with a quick, foolproof way to build and run
                  Clojure programs. It feels great to get a real program
                  running. Reaching that milestone frees you up to experiment,
                  share your work, and gloat to your colleagues who are still
                  using last decade’s languages. This will help keep you
                  motivated!
                </p>
                <p>
                  You’ll also learn how to instantly run code within a running
                  Clojure process using a Read-Eval-Print Loop (REPL), which
                  allows you to quickly test your understanding of the language
                  and learn more efficiently.
                </p>
                <p>
                  But first, I’ll briefly introduce Clojure. Next, I’ll cover
                  Leiningen, the de facto standard build tool for Clojure. By
                  the end of the chapter, you’ll know how to do the following:
                </p>

                <ul>
                  <li>Create a new Clojure project with Leiningen</li>
                  <li>Build the project to create an executable JAR file</li>
                  <li>Execute the JAR file</li>
                  <li>Execute code in a Clojure REPL</li>
                </ul>
                <h2>First Things First: What Is Clojure?</h2>
                <p>
                  Clojure was forged in a mythic volcano by Rich Hickey. Using
                  an alloy of Lisp, functional programming, and a lock of his
                  own epic hair, he crafted a language that’s delightful yet
                  powerful. Its Lisp heritage gives you the power to write code
                  more expressively than is possible in most non-Lisp languages,
                  and its distinct take on functional programming will sharpen
                  your thinking as a programmer. Plus, Clojure gives you better
                  tools for tackling complex domains (like concurrent
                  programming) that are traditionally known to drive developers
                  into years of therapy.
                </p>
                <p>
                  When talking about Clojure, though, it’s important to keep in
                  mind the distinction between the Clojure language and the
                  Clojure compiler. The Clojure language is a Lisp dialect with
                  a functional emphasis whose syntax and semantics are
                  independent of any implementation. The compiler is an
                  executable JAR file, clojure.jar, which takes code written in
                  the Clojure language and compiles it to Java Virtual Machine (
                  JVM) bytecode. You’ll see Clojure used to refer to both the
                  language and the compiler, which can be confusing if you’re
                  not aware that they’re separate things. But now that you’re
                  aware, you’ll be fine.
                </p>

                <h3>Table</h3>
                <table>
                  <tbody>
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
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollBar>
        </MainArea>
      </Main>
    </div>
  );
}

export default App;

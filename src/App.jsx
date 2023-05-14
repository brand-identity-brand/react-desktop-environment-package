import { useContext, useState, useEffect, useRef } from 'react';
import { WindowManagerContext } from './lib';
import { Window, Desktop, SpawnWindowButton } from './lib';
// import './App.css'
import ExampleWindow from './ExampleWindow';
import ExampleStart from './ExampleStart';

function App({id}) {
  const  { useMinimise }  = useContext(WindowManagerContext); 
  //!

  const { minimisedWindowIds, minimiseWindow, restoreMinimisedWindow } = useMinimise();

  // const masterRef = useRef();
  // const maxZIndex = 2147483647;

  return (<>
    <Desktop
      // ref={masterRef}
      id={id}
      minimisedWindowIds={minimisedWindowIds}
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <SpawnWindowButton
        Component={Window}
        // minimiseWindow= {(id) => {  minimiseWindow(id); }}
        // minimiseWindow= {'disable'}//{(id) => {  minimiseWindow(id); }}
        // moveWindow={'disable'}
        // closeWindow={'disable'}
        // resizeWindow={'disable'}
        initialPosition= {{ top: 300, left: 300} }
        initialSize= {{ width: 300, height: 500}}
        parentWindowId={id}
      >
        + window
      </SpawnWindowButton>
      <SpawnWindowButton
        Component={ExampleWindow}
        minimiseWindow= {(id) => {  minimiseWindow(id); }}
        // minimiseWindow= {'disable'}
        // moveWindow={'disable'}
        // closeWindow={'disable'}
        // resizeWindow={'disable'}
        parentWindowId={id}
        useMinimise={{ minimisedWindowIds, minimiseWindow, restoreMinimisedWindow }}
      >
        + example window
      </SpawnWindowButton>
    </Desktop>
    <ExampleStart id={id}/>
    </>
  )
}

export default App;
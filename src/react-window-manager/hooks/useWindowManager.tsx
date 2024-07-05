// import WindowManagerProvider from "../contexts/WindowManager";
// import WindowRenderer from "../../components/(removed)WindowRenderer";
import type { WindowId, Windows } from './useWindowManagerRegistry'
import { useState, useRef, useContext, useReducer } from 'react'
import { WindowManagerRegistryContext } from '../contexts/WindowManagerRegistry'

export default function useWindowManager(windowId: WindowId) {
  const { components, windowSpecsRef } = useContext(WindowManagerRegistryContext)

  const [windows, setWindows] = useState<Windows>(windowSpecsRef.current[windowId].windows)

  const { active, hidden, closed } = windows

  // render window with WindowManagerProvider
  function renderWindow(
    childWindowId: WindowId,
    Component: React.ComponentType<any>,
    props: React.ComponentProps<any>
  ): React.ReactNode {
    return (
      // <WindowRenderer Component={Component} props={props} key={childWindowId}/>
      <Component
        {...props}
        key={childWindowId}
      />
    )
  }
  function renderChildrenWindows(childrenWindowController): React.ReactNode {
    return active.map((childWindowId) => {
      const childWindowSpec = windowSpecsRef.current[childWindowId]
      const { componentName, props } = childWindowSpec
      return renderWindow(childWindowId, components[componentName], {
        windowId: childWindowId,
        windowController: childrenWindowController,
        ...props,
      })
    })
  }

  function renderHiddenWindowButtons(Component: React.ComponentType<any>) {
    return hidden.map((childWindowId) => {
      const childWindowSpec = windowSpecsRef.current[childWindowId]
      const {
        props: { title },
      } = childWindowSpec
      return (
        <Component
          {...{ title, windowId: childWindowId }}
          key={childWindowId}
          onClick_unhide={() => {
            childrenWindowController.unhideWindow(childWindowId)
          }}
        />
      )
    })
  }
  // TODO: improve DX
  const childrenWindowController = {
    moveWindowToTop: function (childWindowId: WindowId) {
      // do nothing if window is already at the top
      const windowPosition = active.indexOf(childWindowId)
      if (windowPosition === active.length - 1) return

      // rearrang childWindowId to the last position.
      setWindows((prev) => {
        const nextWithoutId = prev.active.filter((item) => {
          if (item === childWindowId) return false
          return true
        })
        const next = {
          active: [...nextWithoutId, childWindowId],
          hidden: prev.hidden,
          closed: prev.closed,
        }

        // setTargetWindowSpecsById(currentWindowId, { windows: next });
        return next
      })
    },
    hideWindow: function (childWindowId) {
      const nextActive = active.filter((value) => {
        if (value === childWindowId) return false
        return true
      })
      //checker0
      if (nextActive.length === active.length) return
      //checker0 passed
      setWindows((prev) => {
        const next = {
          active: nextActive,
          hidden: [...prev.hidden, childWindowId],
          closed: prev.closed,
        }
        // setTargetWindowSpecsById(currentWindowId, {windows: next});
        return next
      })
    },

    unhideWindow: function (childWindowId) {
      console.log(windowSpecsRef.current[childWindowId].props.initialPosition)
      const nextHidden = hidden.filter((value) => {
        if (value === childWindowId) return false
        return true
      })
      //checker0
      if (nextHidden.length === hidden.length) return
      //checker0 passed
      setWindows((prev) => {
        const next = {
          active: [...prev.active, childWindowId],
          hidden: nextHidden,
          closed: prev.closed,
        }
        // setTargetWindowSpecsById(currentWindowId, { windows: next } );
        return next
      })
    },
  }
  //TODO: maybe move this to utils.ts
  const windowInitialPropsUpdater = {
    updateInitialPosition: function (gridPosition) {
      windowSpecsRef.current[windowId].props.initialPosition = gridPosition
      console.log(windowSpecsRef.current[windowId])
    },

    updateInitialSize: function (gridSize) {
      windowSpecsRef.current[windowId].props.initialSize = gridSize
    },

    updateDraggable: function (isDraggable) {
      windowSpecsRef.current[windowId].props.draggable = isDraggable
    },
  }
  return {
    childrenWindowController,
    windowInitialPropsUpdater,
    // useWindows:()=>([windows, setWindows]),
    renderWindow,
    renderChildrenWindows,
    renderHiddenWindowButtons,
  }
}

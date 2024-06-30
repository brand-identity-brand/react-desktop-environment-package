import { useState, useRef } from 'react'
// {
// 	"id": {
// 		Component: 'Component.name',
// 		props: {},
// 		registeredIn: ['parentId'],
// 		windows: {
// 			active: ['childId'],
// 			hidden: [],
// 			closed: []
// 		},
// 		states: {}
// 	}
// }
export type WindowId = string & React.Key & PropertyKey //! actually only string will be assigned.
export type Windows = {
  active: WindowId[]
  hidden: WindowId[]
  closed: WindowId[]
}
interface WindowSpecs {
  componentName: string
  props: Object
  // states:{},
  windows: Windows
  registeredIn: WindowId[]
}
export type SessionWindowSpecs = Record<WindowId, WindowSpecs>

const emptyWindowSpecs: WindowSpecs = {
  componentName: '',
  props: {},
  // states:{},
  windows: { active: [], hidden: [], closed: [] },
  registeredIn: [],
}
export default function useWindowManagerRegistry(
  sessionWindowSpecs: SessionWindowSpecs = {}
): Object {
  const windowSpecsRef = useRef<SessionWindowSpecs>(sessionWindowSpecs)

  function initWindow(newWindowId: WindowId, newWindowSpecs: WindowSpecs = emptyWindowSpecs) {
    // if windowId exist, abort
    if (windowSpecsRef.current.hasOwnProperty(newWindowId)) {
      // TODO: bring the window of newWindowId to the top so visually user will see the window they intend to init
    } else {
      const resultWindowSpecs = { ...emptyWindowSpecs, ...newWindowSpecs }
      windowSpecsRef.current = { [newWindowId]: resultWindowSpecs, ...windowSpecsRef.current }
    }
  }

  return {
    windowSpecsRef,
    initWindow,
  }
}

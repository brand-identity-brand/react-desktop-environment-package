import { useState, useRef } from "react";
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
type WindowId = PropertyKey; //String only
type Windows = {
    active: WindowId[];
    hidden: WindowId[];
    closed: WindowId[];
};
interface WindowSpecs {
    ComponentName: String;
    props: Object;
    // states:{},
    windows: Windows,
    registeredIn: WindowId[]
}
export type SessionWindowSpecs = Record<WindowId, WindowSpecs>;

const emptyWindowSpecs: WindowSpecs = { 
    ComponentName:'',
    props:{},
    // states:{},
    windows:{active:[],hidden:[],closed:[]},
    registeredIn:[] 
}
export default function useWindowManagerRegistry(sessionWindowSpecs: SessionWindowSpecs = {}): Object{
    const windowSpecsRef = useRef<SessionWindowSpecs>(sessionWindowSpecs);

    function initWindow(newWindowId: WindowId, newWindowSpecs: WindowSpecs=emptyWindowSpecs){
        // if windowId exist, abort
        if ( windowSpecsRef.current.hasOwnProperty(newWindowId) ) {
            // TODO: bring the window of newWindowId to the top so visually user will see the window they intend to init
        } else {
            const resultWindowSpecs = { ...emptyWindowSpecs, ...newWindowSpecs };
            windowSpecsRef.current = { [newWindowId]:resultWindowSpecs, ...windowSpecsRef.current };
        }
    }
    return {
        initWindow,
    }
}
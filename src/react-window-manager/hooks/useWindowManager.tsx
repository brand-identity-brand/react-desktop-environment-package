import WindowManagerProvider from "../contexts/WindowManager";
import WindowRender from "../../components/WindowRenderer";
import type { WindowId, Windows } from "./useWindowManagerRegistry";
import { useState, useRef, useContext } from "react";
import { WindowManagerRegistryContext } from "../contexts/WindowManagerRegistry";


export default function useWindowManager(windowId:WindowId){
    const { components, windowSpecsRef } = useContext(WindowManagerRegistryContext);

    const [ windows, setWindows ] = useState<Windows>(windowSpecsRef.current[windowId].windows);

    const { active, hidden, closed } = windows;


    
    // render window with WindowManagerProvider
    function renderWindow(childWindowId: WindowId, Component: React.ComponentType<any>, props: React.ComponentProps<any>): React.ReactNode{ 
        return ( 
            // key is added so react and sync all instances
            <WindowManagerProvider windowId={childWindowId} key={childWindowId}>
                <WindowRender Component={Component} props={props} />
            </WindowManagerProvider>
        )
    }
    function renderChildrenWindows(): React.ReactNode{
        return active.map( childWindowId => {
            const childWindowSpec = windowSpecsRef.current[childWindowId];
            const { componentName, props } =childWindowSpec;
            return renderWindow( childWindowId, components[componentName], {windowId: childWindowId, ...props});
        });
    }

    return {
        renderWindow,
        renderChildrenWindows
    }
}





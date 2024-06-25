import { createContext } from "react";
import useWindowManager from "../hooks/useWindowManager";
import type { WindowId } from "../hooks/useWindowManagerRegistry";

export const WindowManagerContext = createContext<Record<PropertyKey, any>>({});
WindowManagerContext.displayName = 'WindowManagerContext';

interface WindowManagerProviderProps extends React.PropsWithChildren {
    windowId: WindowId
}

export default function WindowManagerProvider({windowId, children}: WindowManagerProviderProps){
    // console.log('WMP '+id)
    const value = useWindowManager(windowId);

    return(
        <WindowManagerContext.Provider value={ value }>
            {children}
        </WindowManagerContext.Provider>
    )
}
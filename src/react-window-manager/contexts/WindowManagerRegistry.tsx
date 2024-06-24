import { createContext } from "react";
import type {PropsWithChildren} from 'react';
import useWindowManagerRegistry from "../hooks/useWindowManagerRegistry";
import type { SessionWindowSpecs } from "../hooks/useWindowManagerRegistry";


export const WindowManagerRegistryContext = createContext({});
WindowManagerRegistryContext.displayName = 'WindowManagerRegistryContext';

interface WindowManagerRegistryProviderProps extends PropsWithChildren {
    windowSpecsFromLastSession: SessionWindowSpecs | undefined
}
export default function WindowManagerRegistryProvider({children, windowSpecsFromLastSession}: WindowManagerRegistryProviderProps){
    const value = useWindowManagerRegistry(windowSpecsFromLastSession);

    return(
        <WindowManagerRegistryContext.Provider value={value}>
            {children}
        </WindowManagerRegistryContext.Provider>
    )
}
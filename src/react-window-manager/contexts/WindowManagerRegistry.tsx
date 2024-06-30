import { createContext } from 'react'
import type { PropsWithChildren } from 'react'
import useWindowManagerRegistry from '../hooks/useWindowManagerRegistry'
import type { SessionWindowSpecs } from '../hooks/useWindowManagerRegistry'

export const WindowManagerRegistryContext = createContext<Record<PropertyKey, any>>({})
WindowManagerRegistryContext.displayName = 'WindowManagerRegistryContext'

interface WindowManagerRegistryProviderProps extends PropsWithChildren {
  sessionWindowSpecs: SessionWindowSpecs | undefined
  components: Record<PropertyKey, React.ComponentType<any>>
}
export default function WindowManagerRegistryProvider({
  children,
  sessionWindowSpecs,
  components,
}: WindowManagerRegistryProviderProps) {
  const windowManagerRegistry = useWindowManagerRegistry(sessionWindowSpecs)

  const value = {
    components,
    ...windowManagerRegistry,
  }
  return (
    <WindowManagerRegistryContext.Provider value={value}>
      {children}
    </WindowManagerRegistryContext.Provider>
  )
}

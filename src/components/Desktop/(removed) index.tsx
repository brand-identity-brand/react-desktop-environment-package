import useWindowManager from '../../react-window-manager/hooks/useWindowManager'

export default function Desktop({ windowId, children }) {
  // const s= useContext( WindowManagerContext);

  const { renderChildrenWindows, windows } = useWindowManager(windowId)

  return (
    <>
      {children}
      {renderChildrenWindows()}
    </>
  )
}
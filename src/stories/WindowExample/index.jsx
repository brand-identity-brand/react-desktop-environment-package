import css from './index.module.css'
import Window from '../../components/Window'
import useWindowManager from '../../react-window-manager/hooks/useWindowManager'
import StartBar from '../../components/Desktop/StartBar'
import HiddenWindowButton from '../../components/Desktop/StartBar/HiddenWindowButton'
export default function WindowExample(props) {
  const {
    windowId,
    title,
    windowType,
    // render
    windowController, 
    // prop drill. origin: Context Provider -> Window -> DraggableResizable
    windowBorderWidth,
    initialPosition,
    initialSize,
    draggable,
  } = props

  const { 
    renderChildrenWindows, //helper for mapping children with their Window component
    renderHiddenWindowButtons, //helper for mapping children with their Minimiseed component
    childrenWindowController, //this passes parent window state setters {active,hidden,closed} to children
    windowInitialPropsUpdater //helper for syncing Window component initial props when state setters are triggered
  } = useWindowManager(windowId);
  const {
    updateInitialPosition,

    updateInitialSize,

    updateDraggable,
  } = windowInitialPropsUpdater;
  return (
    <Window
      {...{
        windowId,
        title,
        windowType,
        windowBorderWidth,
        initialPosition,
        initialSize,
        draggable,
      }}
      onMouseDown={() => {
        windowController?.moveWindowToTop(windowId)
      }}
      onClick_minimise={() => {
        windowController?.hideWindow(windowId)
      }}
      controllerSideEffects={{
        updateGridPosition: (nextGridPosition) => {
          updateInitialPosition(nextGridPosition)
        },
        updateGridSize: (nextGridSize) => {
          updateInitialSize(nextGridSize)
        },
        updateIsDraggable: (nextIsDraggable) => {
          updateDraggable(nextIsDraggable)
        },
      }}
    >
      {renderChildrenWindows(childrenWindowController)}
      <StartBar>
        {renderHiddenWindowButtons(HiddenWindowButton)}
      </StartBar>
    </Window>
  )
}



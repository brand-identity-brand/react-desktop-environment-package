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
    // prop drill
    windowBorderWidth,
    initialPosition,
    initialSize,
    draggable,
  } = props

  const { renderChildrenWindows, renderHiddenWindowButtons, childrenWindowController } =
    useWindowManager(windowId)
  const {
    updateInitialPosition,

    updateInitialSize,

    updateDraggable,
  } = childrenWindowController
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



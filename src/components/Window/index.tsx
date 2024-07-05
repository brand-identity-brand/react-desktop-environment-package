import '../global.css'
import css from './index.module.css'
import DraggableResizable from '../DraggableResizable'
import type {
  DraggableResizableProps,
  DraggableResizableSetStateSideEffects,
} from '../DraggableResizable'

import { useRef } from 'react'
import WindowControllerButton from './WindowControllerButton'

interface WindowProps extends DraggableResizableProps {
  // windowId?: WindowId;
  title?: string
  windowType?: 'fullscreen' | 'collapse'
  // render?: (windowId: WindowId)=>React.ReactNode | undefined;
  // TODO
  onClick_minimise?: any
  controllerSideEffects? : DraggableResizableSetStateSideEffects
}
export default function Window({ children, onMouseDown, ...props }: WindowProps) {
  const {
    title,
    windowType = 'collapse',
    onClick_minimise,
    controllerSideEffects,
    //DraggableResizable
    windowBorderWidth,
    initialPosition,
    initialSize,
    draggable,
  } = props

  return (
    <DraggableResizable
      windowBorderWidth={windowBorderWidth}
      initialPosition={initialPosition}
      initialSize={initialSize}
      draggable={draggable}
      onMouseDown={(e) => {
        // e.stopPropagation();
        onMouseDown && onMouseDown(e)
      }}
      controllerSideEffects={controllerSideEffects}
      render={({ draggableProps, controllers }) => {
        const {
          maximise,
          unmaximise,
          isMaximised,
          useGridSize,
          // useGridPosition,
          // enableResize
        } = controllers
        const [windowSize, setWindowSize] = useGridSize()
        // const [windowPosition, windowPosition] = useGridPosition();
        //TODO: type
        const windowSizeBeforeCollapseRef = useRef<any>(undefined)

        function collapse() {
          windowSizeBeforeCollapseRef.current = windowSize
          console.log(windowSizeBeforeCollapseRef.current)
          setWindowSize({
            width: windowSize.width,
            //TODO: this should be dynamic based on props
            height: 20 + 2,
          })
        }
        function expand() {
          setWindowSize(windowSizeBeforeCollapseRef.current)
          windowSizeBeforeCollapseRef.current = undefined
        }

        return (
          <div className={css.Window}>
            <div
              className={css.WindowHeader}
              {...draggableProps}
            >
              {windowType === 'collapse' ? (
                <div className={css.WindowController}>
                  {windowSizeBeforeCollapseRef.current === undefined ? ( //state is not needed because size change will trigger rerender
                    <WindowControllerButton
                      controllerType={'expanded'}
                      onClick={collapse}
                    />
                  ) : (
                    <WindowControllerButton
                      controllerType={'collapsed'}
                      onClick={expand}
                    />
                  )}
                </div>
              ) : null}
              <div className={css.WindowTitle}>{title}</div>
              <div className={css.WindowController}>
                <WindowControllerButton
                  controllerType={'minimise'}
                  onClick={onClick_minimise}
                />
                {windowType === 'fullscreen' ? (
                  isMaximised() ? (
                    <WindowControllerButton
                      controllerType={'fullscreenExit'}
                      onClick={unmaximise}
                    />
                  ) : (
                    <WindowControllerButton
                      controllerType={'fullscreen'}
                      onClick={maximise}
                    />
                  )
                ) : null}
                <WindowControllerButton controllerType={'close'} />
              </div>
            </div>
            <div className={css.WindowBody}>{children}</div>
          </div>
        )
      }}
    />
  )
}

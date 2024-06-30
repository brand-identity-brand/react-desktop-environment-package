import css from './index.module.css'
import clsx from 'clsx'
import { useRef, useState, cloneElement, Children } from 'react'
import type { CSSProperties, DragEvent, PropsWithChildren } from 'react'
import { Border } from './Border'
// TODO: type for context

export interface DraggableResizableCSS extends CSSProperties {
  '--border-width': string
}

interface Position {
  top: number
  left: number
}
interface Size {
  width: number | 'max'
  height: number | 'max'
}

//TODO: rename
interface DraggableResizableSetStateSideEffects {
  updateGridPosition?: (nextGridPosition: Position) => void
  updateGridSize?: (nextGridSize: Size) => void
  updateIsDraggable?: (nextIsDraggable: boolean) => void
}
// React.ComponentProps<'div'> extends
export interface DraggableResizableProps extends React.ComponentProps<'div'> {
  //React.PropsWithChildren {
  /**
   *
   */
  draggable?: boolean
  /**
   * border width in px
   */
  windowBorderWidth?: Number
  /**
   * Position it first rendered at
   */
  initialPosition?: Position
  /**
   * Size it first rendered as
   */
  initialSize?: Size

  render?: (draggableProps: any) => React.ReactNode

  controllerSideEffects?: DraggableResizableSetStateSideEffects
}

export default function DraggableResizable({
  children,
  onMouseDown,
  ...props
}: DraggableResizableProps) {
  const {
    draggable = true,
    windowBorderWidth = 2,
    initialPosition = {
      left: 10,
      top: 10,
    },
    initialSize = {
      width: 100,
      height: 100,
    },
    render,
    controllerSideEffects,
  } = props
  const classNames = clsx(css.DraggableResizable)
  const divRef = useRef<HTMLElement>(null)

  const [gridPosition, _setGridPosition] = useState(initialPosition)
  function setGridPosition(nextGridPosition: Position) {
    _setGridPosition(nextGridPosition)
    controllerSideEffects?.updateGridPosition &&
      controllerSideEffects.updateGridPosition(nextGridPosition)
  }
  const [gridSize, _setGridSize] = useState(initialSize)
  function setGridSize(nextGridSize: Size) {
    _setGridSize(nextGridSize)
    controllerSideEffects?.updateGridSize && controllerSideEffects.updateGridSize(nextGridSize)
  }
  const [isDraggable, _setIsDraggable] = useState(draggable)
  function setIsDraggable(nextIsDraggable: boolean) {
    _setIsDraggable(nextIsDraggable)
    controllerSideEffects?.updateIsDraggable &&
      controllerSideEffects.updateIsDraggable(nextIsDraggable)
  }
  // Todo: setState sideeffect injections via props and custom non-react "reducer"

  /**
   * eample func setState(sideEffect){
   * _setState(nextState)
   * _sideEffect(nextState)
   */
  /**
   * mouse position relative to browser viewport: e.clientX,  e.clientY
   */
  const onDragStartMousePositionRef = useRef<Position | undefined>(undefined)
  function initialiseOnDragStartMousePositionRef(e) {
    onDragStartMousePositionRef.current = {
      left: e.clientX,
      top: e.clientY,
    }
  }
  function getOnDragMousePositionChange(e: DragEvent<HTMLElement>): Position {
    if (onDragStartMousePositionRef.current !== undefined) {
      const mousePositionChange = {
        left: e.clientX - onDragStartMousePositionRef.current.left,
        top: e.clientY - onDragStartMousePositionRef.current.top,
      }
      return mousePositionChange
    }
    return { top: 0, left: 0 }
  }
  const onDragStartGridPositionRef = useRef<Position | undefined>(undefined)
  function initialiseOnDragStartGridPositionRef() {
    onDragStartGridPositionRef.current = {
      left: gridPosition.left,
      top: gridPosition.top,
    }
  }
  const onDragStartGridSizeRef = useRef<Size | undefined>(undefined)
  function initialiseOnDragStartGridSizeRef() {
    onDragStartGridSizeRef.current = {
      width: gridSize.width,
      height: gridSize.height,
    }
  }
  // const onDragStartGridPositionRelativeToViewportRef = useRef<Position>({left: 0, top: 0});
  function inistialiseDrag(e: DragEvent<HTMLElement>): void {
    initialiseOnDragStartMousePositionRef(e)
    initialiseOnDragStartGridPositionRef()
    initialiseOnDragStartGridSizeRef()
  }
  function checkIfDragReady(): boolean {
    return (
      onDragStartGridPositionRef.current !== undefined &&
      onDragStartGridSizeRef.current !== undefined &&
      onDragStartGridSizeRef.current.width !== 'max' &&
      onDragStartGridSizeRef.current.height !== 'max'
    )
  }
  function endDrag(): void {
    onDragStartMousePositionRef.current = undefined
    onDragStartGridPositionRef.current = undefined
  }

  const draggableProps = {
    draggable: true,
    onDrag: (e: DragEvent<HTMLElement>) => {
      if (checkIfDragReady()) {
        const mousePositionChange = getOnDragMousePositionChange(e)
        // position
        const nextPosition = {
          left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
          top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
        }
        setGridPosition(nextPosition)
        e.preventDefault()
      }
    },
    onDragStart: (e: DragEvent<HTMLElement>) => {
      const dragImg = document.createElement('div')
      dragImg.setAttribute(
        'src',
        'data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      )
      e.dataTransfer.setDragImage(dragImg, 0, 0)
      inistialiseDrag(e)
    },
    // below deoesnt affect behaviour, but performance increases
    onDragLeave: (e: DragEvent<HTMLElement>) => {
      // prevent dragImage flyover when dropping
      e.preventDefault()
    },
    onDragOver: (e: DragEvent<HTMLElement>) => {
      // prevent dragImage flyover when dropping
      e.preventDefault()
    },
    onDragEnd: (e: DragEvent<HTMLElement>) => {
      endDrag()
      e.preventDefault()
    },
  }

  const gridSizeBeforeMaximisation = useRef<Size | undefined>(undefined)
  const gridPositionBeforeMaximisation = useRef<Position | undefined>(undefined)

  const controllers = {
    maximise: function () {
      gridSizeBeforeMaximisation.current = gridSize
      gridPositionBeforeMaximisation.current = gridPosition
      setGridSize({ width: 'max', height: 'max' })
      setGridPosition({ top: 0, left: 0 })
      setIsDraggable(false)
    },
    unmaximise: function () {
      setGridSize(gridSizeBeforeMaximisation.current)
      setGridPosition(gridPositionBeforeMaximisation.current)
      gridSizeBeforeMaximisation.current = undefined
      gridPositionBeforeMaximisation.current = undefined
      setIsDraggable(true)
    },
    isMaximised: function () {
      return (
        gridSize.width === 'max' &&
        gridSize.height === 'max' &&
        gridPosition.left === 0 &&
        gridPosition.top === 0
      )
    },
    //TODO:
    useGridSize: function () {
      return [gridSize, setGridSize]
    },
    //! unused
    useGridPostion: function () {
      return [gridPosition, setGridPosition]
    },
    enableResize: function (enable: boolean) {
      setIsDraggable(enable)
    },
  }

  return (
    <div
      ref={divRef}
      onMouseDown={(e) => {
        e.stopPropagation()
        onMouseDown && onMouseDown(e)
      }}
      className={classNames}
      style={
        {
          '--border-width': `${windowBorderWidth}px`,
          // "--border-colour": 'red',
          // ...style,
          top: `${gridPosition.top}px`,
          left: `${gridPosition.left}px`,
          width: gridSize.width === 'max' ? '100%' : `${gridSize.width}px`,
          height: gridSize.height === 'max' ? '100%' : `${gridSize.height}px`,
        } as DraggableResizableCSS
      }
    >
      {/* vertices */}
      <Border
        draggable={isDraggable}
        className={css.verticeTopLeft}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            console.log(mousePositionChange)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.verticeTopRight}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: onDragStartGridPositionRef.current.left,
              top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.verticeBottomLeft}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.verticeBottomRight}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            // postion doesnt change
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      {/* edges */}
      <Border
        draggable={isDraggable}
        className={css.edgeTop}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: onDragStartGridPositionRef.current.left,
              top: onDragStartGridPositionRef.current.top + mousePositionChange.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeBottom}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            // position unchanged
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeLeft}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeRight}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            // position unchanged
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height,
            }
            setGridSize(nextSize)
          }
        }}
      />
      {/* edge ends */}
      <Border
        draggable={isDraggable}
        className={css.edgeTopLeft}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeTopRight}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: onDragStartGridPositionRef.current.left,
              top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeBottomLeft}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeBottomRight}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            // postion doesnt change
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeLeftTop}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeLeftBottom}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
              top: onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeRightTop}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            const nextPosition = {
              left: onDragStartGridPositionRef.current.left,
              top: mousePositionChange.top + onDragStartGridPositionRef.current.top,
            }
            setGridPosition(nextPosition)
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height - mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <Border
        draggable={isDraggable}
        className={css.edgeRightBottom}
        onDragStart={(e) => {
          inistialiseDrag(e)
        }}
        onDragEnd={endDrag}
        onDrag={(e) => {
          if (checkIfDragReady()) {
            const mousePositionChange = getOnDragMousePositionChange(e)
            // position
            // postion doesnt change
            // size
            const nextSize = {
              width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
              height: onDragStartGridSizeRef.current.height + mousePositionChange.top,
            }
            setGridSize(nextSize)
          }
        }}
      />
      <div className={css.Body}>
        {
          //https://react.dev/reference/react/cloneElement
          // Children.map(children, (child, index) => {
          //     switch (typeof child){
          //         //TODO:
          //         case 'string': return child;
          //         case 'number': return child;
          //         case 'boolean': return child;
          //         default: return cloneElement(child, {...draggableProps})
          //     }
          // })
        }
        {/* {children}
            {render(draggableProps)} */}
        {render === undefined ? children : render({ draggableProps, controllers })}
      </div>
    </div>
  )
}

// DraggableResizable.displayName = "DraggableResizable"

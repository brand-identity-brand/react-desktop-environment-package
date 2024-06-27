import css from './index.module.css'
import clsx from 'clsx'
import { useRef, useState, cloneElement, Children } from 'react';
import type {CSSProperties, DragEvent, PropsWithChildren} from 'react';
import { Border } from './Border';
// TODO: type for context

export interface DraggableResizableCSS extends CSSProperties {
    '--border-width': string;
}

interface Position {
    top: number;
    left: number;
}
interface Size {
    width: number | 'max';
    height: number | 'max';
}
// React.ComponentProps<'div'> extends 
interface DraggableResizableProps extends React.ComponentProps<'div'> {//React.PropsWithChildren {
    /**
     * border width in px
     */
    windowBorderWidth: Number
    /**
     * Position it first rendered at
     */
    initialPosition: Position;
    /**
     * Size it first rendered as
     */
    initialSize: Size;

    render: (draggableProps:any)=>React.ReactNode | undefined;
}

export default function DraggableResizable({ children, ...props }: DraggableResizableProps) {
    const {
        windowBorderWidth = 2,
        initialPosition = {
            left: 10,
            top: 10
        },
        initialSize = {
            width: 100,
            height: 100
        },
        render
    } = props;
    const classNames = clsx(
        css.DraggableResizable, 
    )
    const divRef = useRef<HTMLElement>(null);

    const [ gridPosition, setGridPosition ] = useState(initialPosition);
    const [ gridSize, setGridSize ] = useState(initialSize);
    /**
        * mouse position relative to browser viewport: e.clientX,  e.clientY
     */
        const onDragStartMousePositionRef = useRef<Position | undefined>(undefined);
        function initialiseOnDragStartMousePositionRef(e){
            onDragStartMousePositionRef.current = {
                left: e.clientX, 
                top: e.clientY
            }
        }
        function getOnDragMousePositionChange(e: DragEvent<HTMLElement>): Position {
            if ( onDragStartMousePositionRef.current !== undefined ) {
                const mousePositionChange = {
                    left: e.clientX - onDragStartMousePositionRef.current.left,
                    top:  e.clientY - onDragStartMousePositionRef.current.top
                };
                return mousePositionChange;
            }
            return {top: 0 ,left:0};
        }
        const onDragStartGridPositionRef = useRef<Position | undefined>(undefined);
        function initialiseOnDragStartGridPositionRef(){
            onDragStartGridPositionRef.current = {
                left: gridPosition.left,
                top: gridPosition.top
            }
        }
        const onDragStartGridSizeRef = useRef<Size | undefined>(undefined);
        function initialiseOnDragStartGridSizeRef(){
            onDragStartGridSizeRef.current = {
                width: gridSize.width,
                height: gridSize.height
            }
        }
        // const onDragStartGridPositionRelativeToViewportRef = useRef<Position>({left: 0, top: 0});
        function inistialiseDrag(e: DragEvent<HTMLElement>):void{
            initialiseOnDragStartMousePositionRef(e)
            initialiseOnDragStartGridPositionRef()
            initialiseOnDragStartGridSizeRef()
        }
        function checkIfDragReady():boolean{
            return (
                onDragStartGridPositionRef.current !== undefined 
                && onDragStartGridSizeRef.current !== undefined 
                && onDragStartGridSizeRef.current.width !== 'max'
                && onDragStartGridSizeRef.current.height !== 'max'
            )
        }
        function endDrag():void{
            onDragStartMousePositionRef.current = undefined;
            onDragStartGridPositionRef.current = undefined;
        }

        const draggableProps = {
            draggable: true,
            onDrag:(e: DragEvent<HTMLElement>)=>{            
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition);
                    e.preventDefault();
                }
            },
            onDragStart:(e: DragEvent<HTMLElement>)=>{inistialiseDrag(e)},
            // below deoesnt affect behaviour, but performance increases
            onDragLeave:(e: DragEvent<HTMLElement>)=>{
                // prevent dragImage flyover when dropping
                e.preventDefault();
            },
            onDragOver:(e: DragEvent<HTMLElement>)=>{
                // prevent dragImage flyover when dropping
                e.preventDefault();
            },
            onDragEnd:(e: DragEvent<HTMLElement>)=>{
                endDrag();
                e.preventDefault();
            }
        }
  return (
    <div ref={divRef}
        className={classNames}
        style={{
            "--border-width": `${windowBorderWidth}px`,
            // "--border-colour": 'red',
            // ...style,
            top: `${gridPosition.top}px`,
            left: `${gridPosition.left}px`,
            width: gridSize.width==='max'? '100%' : `${gridSize.width}px`,
            height: gridSize.height==='max'? '100%' : `${gridSize.height}px`,
        } as DraggableResizableCSS}
    >
        {/* vertices */}
        <Border className={css.verticeTopLeft} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    console.log(mousePositionChange)
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.verticeTopRight} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.verticeBottomLeft} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height: onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.verticeBottomRight} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    // postion doesnt change
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        {/* edges */}
        <Border className={css.edgeTop} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: onDragStartGridPositionRef.current.left,
                        top:  onDragStartGridPositionRef.current.top + mousePositionChange.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeBottom} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    // position unchanged
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width,
                        height:  onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeLeft} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeRight} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    // position unchanged    
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        {/* edge ends */}
        <Border className={css.edgeTopLeft} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeTopRight} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeBottomLeft} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height: onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeBottomRight} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    // postion doesnt change
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeLeftTop} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeLeftBottom} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                        top:  onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width - mousePositionChange.left,
                        height: onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeRightTop} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    const nextPosition = {
                        left: onDragStartGridPositionRef.current.left,
                        top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                    }
                    setGridPosition(nextPosition)
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height - mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <Border className={css.edgeRightBottom} onDragStart={(e)=>{inistialiseDrag(e)}} onDragEnd={endDrag}
            onDrag={(e)=>{
                if ( checkIfDragReady() ){
                    const mousePositionChange = getOnDragMousePositionChange(e);
                    // position 
                    // postion doesnt change
                    // size 
                    const nextSize = {
                        width: onDragStartGridSizeRef.current.width + mousePositionChange.left,
                        height:  onDragStartGridSizeRef.current.height + mousePositionChange.top
                    }
                    setGridSize(nextSize)
                }
            }}
        />
        <div className={css.Body}>
            { //https://react.dev/reference/react/cloneElement
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
            { render === undefined 
                ? children
                :render(draggableProps)
            }
        </div>
    </div>
    )
}

// DraggableResizable.displayName = "DraggableResizable"
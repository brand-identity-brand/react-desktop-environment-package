import css from './index.module.css'
import clsx from 'clsx'
import { useRef, useState } from 'react';
import type {CSSProperties, DragEvent} from 'react';
import { Border } from './Border';

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

interface ComponentProps extends React.ComponentProps<'div'> {
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
}

export default function DraggableResizable({ children, ...props }: ComponentProps) {
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
    } = props;
    const classNames = clsx(
        css.DraggableResizable, 
    )
    const divRef = useRef<HTMLDivElement>(null);

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
        function getOnDragMousePositionChange(e: DragEvent<HTMLDivElement>): Position {
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
        function inistialiseDrag(e: DragEvent<HTMLDivElement>):void{
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

        function dragToMove(e){
            if ( checkIfDragReady() ){
                const mousePositionChange = getOnDragMousePositionChange(e);
                // position 
                const nextPosition = {
                    left: mousePositionChange.left + onDragStartGridPositionRef.current.left,
                    top:  mousePositionChange.top + onDragStartGridPositionRef.current.top
                }
                setGridPosition(nextPosition)
            }
        }
  return (
    <div ref={divRef}
        className={classNames}
        style={{
            "--border-width": `${windowBorderWidth}px`,
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
        <main className={css.Body}>
            {children}
        </main>
    </div>
  )
}
/**
 * this component is the dragable and resizable frame the is being used for Window components.
 */
import css from './index.module.css';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import type { ReactElement, DragEvent, Dispatch, SetStateAction } from 'react';


interface Position {
    top: number;
    left: number;
}
interface Size {
    width: number | 'max';
    height: number | 'max';
}

interface DraggbleResizableFrameProps extends React.ComponentProps<'div'> {
    /**
     * Is this resizable?
     */
    lockResize: boolean;
    /**
     * Position it first rendered at
     */
    initialPosition: Position;
    /**
     * Size it first rendered as
     */
    initialSize: Size;
    /**
     * Render function
     */
    renderContent?: ( 
        useGridPosition: [ 
            gridPosition: Position, 
            setGridPosition: Dispatch<SetStateAction<Position>>
        ] , 
        useGridSize: [ 
            gridSize: Size, 
            setGridSize:Dispatch<SetStateAction<Size>>
        ]
    ) => ReactElement;
}

export default function DraggbleResizableFrame({children, className='', style={}, onMouseDown, ...props}: DraggbleResizableFrameProps){
    const {
        lockResize = false,
        initialPosition = {
            left: 10,
            top: 10
        },
        initialSize = {
            width: 100,
            height: 100
        },
        renderContent= ()=><div></div>
    } = props;

    const gridRef = useRef<HTMLDivElement>(null);
    const [ gridPosition, setGridPosition ] = useState(initialPosition);
    const [ gridSize, setGridSize ] = useState(initialSize);


    return (
        <div
            ref={gridRef}
            className={clsx(css.windowGrid, className)}
            style={{
                ...style,
                top: `${gridPosition.top}px`,
                left: `${gridPosition.left}px`,
                width: gridSize.width==='max'? '100%' : `${gridSize.width}px`,
                height: gridSize.height==='max'? '100%' : `${gridSize.height}px`,
            }}
            onMouseDown={onMouseDown}
        >
            <Area 
                lockResize={lockResize}
                area={'nw'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                //  runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'nwn'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'nww'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'n'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                // className={css.horizontalSubGrid}
            />
            <Area 
                lockResize={lockResize}
                area={'ne'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'nen'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'nee'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'w'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            >
            </Area>
            <div
                className={grid['body'].className}
            >
               { renderContent([ gridPosition, setGridPosition ], [ gridSize, setGridSize ]) }
            </div>
            <Area 
                lockResize={lockResize}
                area={'e'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'sw'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'sws'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
            />
            <Area 
                lockResize={lockResize}
                area={'sww'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'s'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'se'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'ses'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
            <Area 
                lockResize={lockResize}
                area={'see'}
                useGridPosition={[ gridPosition, setGridPosition ]}
                useGridSize={[ gridSize, setGridSize ]}
                 // runAfterResize={runAfterResize}
            />
        </div>
    )
};



// Area


interface AreaProps extends React.ComponentProps<'div'> {
    lockResize?: boolean;
    area: 'nw' | 'nwn' | 'nww' | 'n' | 'ne' | 'nen' | 'nee' | 'e' | 'se' | 'ses' | 'see' | 's' | 'sw' | 'sww' | 'sws' | 'w' | 'body';
    useGridPosition: unknown;
    useGridSize: unknown;
}
function Area({className, style, children, ...props}: AreaProps) {
    const {
        lockResize,
        area,
        useGridPosition,
        useGridSize,
        // runAfterResize,
    } = props;
    const [ gridPosition, setGridPosition ]: any = useGridPosition;
    const [ gridSize, setGridSize ]: any = useGridSize;

    /**
     * mouse position relative to browser viewport: e.clientX,  e.clientY
     */
    // const mousePositionOffsetRef = useRef({left: 0, top: 0});
    const onDragStartMousePositionRef: any = useRef({left: 0, top: 0});
    const onDragStartGridSizeRef: any = useRef(undefined);
    const onDragStartGridPositionRelativeToViewportRef: any = useRef(undefined);
    const onDragStartGridPositionRef: any = useRef(undefined);
    return (
        <div 
            className={ clsx(grid[area].className, className, (lockResize? css['lock-resize'] : '') )}
            //
            draggable={ lockResize? false : true }
            onDragStart={(e: DragEvent<HTMLDivElement>): void=>{
                    // initialise mouse position offset
                    // setIsDragging(true);
                    // ! mousePositionOffsetRef.current = {
                    //     left: gridPosition.left - e.clientX, 
                    //     top: gridPosition.top - e.clientY
                    // }
                    onDragStartMousePositionRef.current = {
                        left: e.clientX, 
                        top: e.clientY
                    }
                    onDragStartGridSizeRef.current = gridSize;
                    // * USE getBoundingClientRect() e.g. e.target.getBoundingClientRect().left
                    // this is used to calculate the correct size as the position we get is relative to the parent div
                    onDragStartGridPositionRelativeToViewportRef.current = {
                        left: e.target.getBoundingClientRect().left,
                        top: e.target.getBoundingClientRect().top
                        // left: e.currentTarget.getBoundingClientRect().left,
                        // top: e.currentTarget.getBoundingClientRect().top
                    }
                    onDragStartGridPositionRef.current = gridPosition;
                    const dragImg = document.querySelector('#dragImg');
                    e.dataTransfer.setDragImage(dragImg, 0, 0);
                }
            }
            onDrag={(e)=>{
                    // calculate result position and size
                    // if statement prevent doing calculation on the last values which is going to be 0
                    if ( e.clientX !== 0 && e.clientY !== 0 ) {
                        setGridPosition( grid[area].calculatePosition( 
                            e, 
                            onDragStartMousePositionRef.current, 
                            onDragStartGridPositionRef.current
                        ));
                        setGridSize( grid[area].calculateSize( 
                            e, 
                            onDragStartGridSizeRef.current,
                            onDragStartGridPositionRelativeToViewportRef.current
                        ));
                    }
                }
            }
            // below deoesnt affect behaviour, but performance increases
            onDragLeave={(e)=>{
                // prevent dragImage flyover when dropping
                e.preventDefault();
            }}
            onDragOver={(e)=>{
                // prevent dragImage flyover when dropping
                e.preventDefault();
            }}
            onDragEnd={(e)=>{
                e.preventDefault();
                // runAfterResize(); 
            }}
        >
            {children}
        </div>
    )
}
// mousePositionOffset
// windowLeft - mouseLeft, 
// windowTop - mouseTop
// ! nested windows dont resize properly, mostlikely offset problems
// * order by position clockwise
// TODO: add positionChange limit so window dont move when its at minSzie
// * USE getBoundingClientRect() e.g. e.target.getBoundingClientRect().left
const grid = {
    'nw': {
        className: clsx(css.h12, css.v12, css.gridMax, css['nwse-resize']),
        calculatePosition: ( e,  onDragStartMousePosition, onDragStartGridPosition )=>{ //gridPosition
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            // onDragMousePosition almost=== gridPosition
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }

            return {
                width: onDragStartGridSize.width + sizeChange.width, //gridPosition.left - ( e.clientX + onDragMousePosition.left ) + gridSize.width, 
                height: onDragStartGridSize.height + sizeChange.height //gridPosition.top - ( e.clientY + onDragMousePosition.top ) + gridSize.height
            }
        }
    },
    'nwn': {
        className: clsx(css.h12, css.v23, css.gridMax, css['nwse-resize']),
        calculatePosition: ( e,  onDragStartMousePosition, onDragStartGridPosition )=>{ //gridPosition
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            // onDragMousePosition almost=== gridPosition
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }

            return {
                width: onDragStartGridSize.width + sizeChange.width, //gridPosition.left - ( e.clientX + onDragMousePosition.left ) + gridSize.width, 
                height: onDragStartGridSize.height + sizeChange.height //gridPosition.top - ( e.clientY + onDragMousePosition.top ) + gridSize.height
            }
        }
    },
    'nww': {
        className: clsx(css.h23, css.v12, css.gridMax, css['nwse-resize']),
        calculatePosition: ( e,  onDragStartMousePosition, onDragStartGridPosition )=>{ //gridPosition
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            // onDragMousePosition almost=== gridPosition
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }

            return {
                width: onDragStartGridSize.width + sizeChange.width, //gridPosition.left - ( e.clientX + onDragMousePosition.left ) + gridSize.width, 
                height: onDragStartGridSize.height + sizeChange.height //gridPosition.top - ( e.clientY + onDragMousePosition.top ) + gridSize.height
            }
        }
    },
    'n': {
       className: clsx(css.h12, css.v34, css.gridMax, css['ns-resize']),
       calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0, //e.clientX - onDragStartMousePosition.left, 
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: 0, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width, //
                height: onDragStartGridSize.height + sizeChange.height //gridPosition.top - ( e.clientY + onDragStartPosition.top ) + gridSize.height
            }
        }
    },
    'ne': {
        className: clsx(css.h12, css.v56, css.gridMax, css['nesw-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'nen': {
        className: clsx(css.h12, css.v45, css.gridMax, css['nesw-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'nee': {
        className: clsx(css.h23, css.v56, css.gridMax, css['nesw-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  e.clientY - onDragStartMousePosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: onDragStartGridPositionRelativeToViewport.top - e.clientY
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'e': {
        className: clsx(css.h34, css.v56, css.gridMax, css['ew-resize']),
        calculatePosition: ( e, onDragStartPosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0, //e.clientX - onDragStartPosition.left, 
                top:  0 //e.clientY - onDragStartPosition.top
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: 0 //gridPosition.top - e.clientY
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'se': {
        className: clsx(css.h56, css.v56, css.gridMax, css['nwse-resize']),
        calculatePosition: ( e, onDragStartPosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize,onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'ses': {
        className: clsx(css.h56, css.v45, css.gridMax, css['nwse-resize']),
        calculatePosition: ( e, onDragStartPosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize,onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'see': {
        className: clsx(css.h45, css.v56, css.gridMax, css['nwse-resize']),
        calculatePosition: ( e, onDragStartPosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize,onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: e.clientX - onDragStartGridPositionRelativeToViewport.left, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    's': {
        className: clsx(css.h56, css.v34, css.gridMax, css['ns-resize']),
        calculatePosition: ( e, onDragStartPosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: 0,
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{

            // console.log(onDragGridPositionOffsetViewport)
            const sizeChange = {
                width: 0, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'sw': {
        className: clsx(css.h56, css.v12, css.gridMax, css['nesw-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'sws': {
        className: clsx(css.h56, css.v23, css.gridMax, css['nesw-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'sww': {
        className: clsx(css.h45, css.v12, css.gridMax, css['nesw-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: e.clientY - onDragStartGridPositionRelativeToViewport.top, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'w': {
        className: clsx(css.h34, css.v12, css.gridMax, css['ew-resize']),
        calculatePosition: ( e, onDragStartMousePosition, onDragStartGridPosition )=>{
            const positionChange = {
                left: e.clientX - onDragStartMousePosition.left, 
                top:  0
            }
            return {    
                left: onDragStartGridPosition.left + positionChange.left, 
                top: onDragStartGridPosition.top + positionChange.top
            }
        },
        calculateSize: ( e, onDragStartGridSize, onDragStartGridPositionRelativeToViewport )=>{
            const sizeChange = {
                width: onDragStartGridPositionRelativeToViewport.left - e.clientX, 
                height: 0, 
            }
            return {
                width: onDragStartGridSize.width + sizeChange.width,
                height: onDragStartGridSize.height + sizeChange.height
            }
        }
    },
    'body': {
        className: clsx(css.h25, css.v25, css.gridMaxBody),
    },
    



}
import "../global.css";
import css from "./index.module.css";
import DraggableResizable from "../DraggableResizable";
import { useContext, useRef } from "react";
import WindowControllerButton from "./WindowControllerButton";

export default function Window({children,...props}){
    const { 
        windowId, 
        title = 'Example Title For Window'
    }  = props;

    return (
        <DraggableResizable
            initialPosition ={{left: 50,top: 100}}
            initialSize ={{width: 500,height: 300}}
            render={({draggableProps, controllers})=>{
                const {
                    maximise,
                    unmaximise,
                    isMaximised,
                    useGridSize,
                    // useGridPosition,
                    enableResize
                } = controllers;
                const [windowSize, setWindowSize] = useGridSize();
                // const [windowPosition, windowPosition] = useGridPosition();
                //TODO: type
                const windowSizeBeforeCollapseRef = useRef<any>(undefined);
                const isMaximisedRef = useRef<any>(undefined);

                function collapse(){
                    windowSizeBeforeCollapseRef.current = windowSize;
                    console.log(windowSizeBeforeCollapseRef.current)
                    setWindowSize({
                        width: windowSize.width,
                        //TODO: this should be dynamic based on props
                        height: 20 + 2
                    });
                }
                function expand(){
                    setWindowSize(windowSizeBeforeCollapseRef.current);
                    windowSizeBeforeCollapseRef.current = undefined;
                }
                return (
                    <div className={css.Window}>
                        <div className={css.WindowHeader} {...draggableProps}>
                            <div className={css.WindowController}>
                                {
                                    windowSizeBeforeCollapseRef.current === undefined //state is not needed because size change will trigger rerender 
                                        ?<WindowControllerButton controllerType={"expanded"} onClick={collapse}/>
                                        :<WindowControllerButton controllerType={"collapsed"} onClick={expand}/>
                                }

                            </div>
                            <div className={css.WindowTitle}>
                                {title}
                            </div>
                            <div className={css.WindowController}>
                                <WindowControllerButton controllerType={"minimise"}/>
                                {
                                    isMaximised()
                                        ? <WindowControllerButton controllerType={"fullscreenExit"} onClick={unmaximise}/>
                                        : <WindowControllerButton controllerType={"fullscreen"} onClick={maximise}/>
                                }
                                <WindowControllerButton controllerType={"close"}/>
                            </div>
                        </div>
                        <div>
                            {children}
                        </div>
                    </div>
                )
            }}
        />
    )
}
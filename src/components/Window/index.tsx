import "../global.css";
import css from "./index.module.css";
import DraggableResizable from "../DraggableResizable";
import { useContext } from "react";
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
            render={(draggableProps)=>{
                    return (
                        <div className={css.Window}>
                            <div className={css.WindowHeader} {...draggableProps}>
                                <div className={css.WindowController}>
                                    <WindowControllerButton controllerType={"expanded"}/>
                                </div>
                                <div className={css.WindowTitle}>
                                    {title}
                                </div>
                                <div className={css.WindowController}>
                                    <WindowControllerButton controllerType={"minimise"}/>
                                    <WindowControllerButton controllerType={"fullscreen"}/>
                                    <WindowControllerButton controllerType={"close"}/>
                                </div>
                            </div>
                            <div>
                                {children}
                            </div>
                        </div>
                    )
                }
            }
        />
    )
}
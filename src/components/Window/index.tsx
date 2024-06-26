import css from "./index.module.css";
import DraggableResizable from "../DraggableResizable";
import { useContext } from "react";

export default function Window({children,...props}){
    const { windowId}  = props;

    return (
        <DraggableResizable
            initialPosition ={{left: 50,top: 100}}
            initialSize ={{width: 500,height: 300}}
            render={(draggableProps)=>{
                    return (
                        <div className={css.Window}>
                            <div className={css.WindowHeader} {...draggableProps}>
                                <div className={css.WindowController}>
                                    1
                                </div>
                                <div className={css.WindowTitle}>
                                    Example Title For Window
                                </div>
                                <div className={css.WindowController}>
                                    123
                                </div>
                            </div>
                            <div>
                                {children}
                            </div>
                            <div>
                                c
                            </div>
                        </div>
                    )
                }
            }
        />
    )
}
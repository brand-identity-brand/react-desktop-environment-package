import css from "./index.module.css";
import DraggableResizable from "../DraggableResizable";
import { useContext } from "react";

export default function Window({...props}){
    const { draggableProps, windowId}  = props;
console.log(windowId)
    return (
        <DraggableResizable>
            <div className={css.Window}>
                <div className={css.WindowHeader}>
                    a
                </div>
                <div>
                    b
                </div>
                <div>
                    c
                </div>
            </div>
        </DraggableResizable>
    )
}
import css from "./index.module.css";
import DraggableResizable from "../DraggableResizable";
import { useContext } from "react";

export default function Window({...props}){
    const { draggableProps, windowId}  = props;
    
    return (
        <DraggableResizable initialPosition ={
            {left: 100,
            top: 100}
        }>
            <div className={css.Window}>
                <div className={css.WindowHeader} {...draggableProps}>
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
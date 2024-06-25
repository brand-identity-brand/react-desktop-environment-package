import css from "./index.module.css";
import DraggableResizable from "../DraggableResizable";

export default function Window(props){
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
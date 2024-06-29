import css from "./index.module.css"
import Window from "../../components/Window";
import useWindowManager from "../../react-window-manager/hooks/useWindowManager";

export default function WindowExample(props){
    const {
        windowId,
        title,
        windowType,
        // render
        windowController
    } = props;

    const { 
        renderChildrenWindows, 
        renderHiddenWindowButtons,
        childrenWindowController 
    
    } = useWindowManager(windowId);
    return (
        <Window {...{windowId, title, windowType}} 
            onMouseDown={()=>{windowController?.moveWindowToTop(windowId)}}
            onClick_minimise={()=>{windowController?.hideWindow(windowId)}}
        >
            { renderChildrenWindows(childrenWindowController) }

            <div className={css.StartBar}>
                { renderHiddenWindowButtons(HiddenWindowButton) }
            </div>

        </Window>
    )
}

function HiddenWindowButton({title, windowId, onClick_unhide}){
    return(
        <button type={"button"}
            onClick={onClick_unhide}
        >
            {title}
        </button>
    )
}

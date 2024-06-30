import css from "./index.module.css"

export default function StartBar({children}){
    return (
        <div className={css.StartBar}>
            {
                // renderHiddenWindowButtons(HiddenWindowButton)
                children
            }
        </div>
    )
}
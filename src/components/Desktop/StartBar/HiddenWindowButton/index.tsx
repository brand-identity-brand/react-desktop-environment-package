import css from "./index.module.css"

export default function HiddenWindowButton({ title, windowId, onClick_unhide }) {
    return (
      <button
        className={css.HiddenWindowButton}
        type={'button'}
        onClick={onClick_unhide}
      >
        {title}
      </button>
    )
}
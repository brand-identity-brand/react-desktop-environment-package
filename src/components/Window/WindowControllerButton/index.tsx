import '../../global.css'
import css from './index.module.css'

const buttons = {
  minimise: <span className={css.minimise}>-</span>,
  fullscreenExit: (
    <span
      className={'material-symbols-outlined rde-material-symbols-outlined'}
      style={{ fontSize: '12px' }}
    >
      {'fullscreen_exit'}
    </span>
  ),
  fullscreen: (
    <span
      className={'material-symbols-outlined rde-material-symbols-outlined'}
      style={{ fontSize: '12px' }}
    >
      {'fullscreen'}
    </span>
  ),
  close: (
    <span className={`material-symbols-outlined rde-material-symbols-outlined ${css.close_span}`}>
      {'close'}
    </span>
  ),
  collapsed: (
    <span className={'material-symbols-outlined rde-material-symbols-outlined'}>
      {'navigate_next'}
    </span>
  ),
  expanded: (
    <span
      className={`material-symbols-outlined rde-material-symbols-outlined ${css.expanded_span}`}
    >
      {'equal'}
    </span>
  ),
}

interface WindowControllerButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  controllerType: 'minimise' | 'fullscreenExit' | 'fullscreen' | 'close' | 'collapsed' | 'expanded'
  onClick?(e: React.MouseEvent<HTMLElement>): void
}
export default function WindowControllerButton({
  controllerType,
  onClick,
}: WindowControllerButtonProps) {
  return (
    <button
      className={css.WindowControllerButton + ' ' + 'rde-unselectable'}
      onClick={(e) => {
        onClick && onClick(e)
      }}
    >
      {buttons[controllerType]}
    </button>
  )
}

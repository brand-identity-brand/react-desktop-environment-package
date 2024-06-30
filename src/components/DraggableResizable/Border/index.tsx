import '../../global.css'
import css from './index.module.css'
import clsx from 'clsx'
import type { DragEvent } from 'react'

interface ComponentProps extends React.ComponentPropsWithoutRef<'div'> {
  onDragStart: (e: DragEvent<HTMLElement>) => void
  onDrag: (e: DragEvent<HTMLElement>) => void
  onDragEnd: (e: DragEvent<HTMLElement>) => void
}

export function Border({ className, draggable, ...props }: ComponentProps) {
  const { onDragStart, onDrag, onDragEnd } = props
  const style = clsx(css.Border, className)
  //TODO: disable forbidden cursor and disable drop zone
  // https://stackoverflow.com/questions/71050102/how-can-i-hide-or-change-the-drag-not-allowed-cursor-during-a-dragging
  // https://stackoverflow.com/questions/704564/disable-drag-and-drop-on-html-elements
  // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
  return (
    <div
      draggable={draggable}
      className={style}
      onDragStart={(e: DragEvent<HTMLElement>): void => {
        onDragStart(e)

        const dragImg = document.createElement('div')
        dragImg.setAttribute(
          'src',
          'data:image/png;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
        )
        e.dataTransfer.setDragImage(dragImg, 0, 0)
        e.stopPropagation()
        // e.stopImmidiatePropagation()
        // console.log(e.dataTransfer.dropEffect="none")
      }}
      onDrag={(e: DragEvent<HTMLElement>): void => {
        onDrag(e)

        e.stopPropagation()
      }}
      //! without onDragOver on the draggable, onDrag gets disabled after first drag event
      onDragOver={(e) => {
        e.dataTransfer.dropEffect = 'move'
        //// e.dataTransfer.dropEffect="none"
        // console.log(e.dataTransfer.effectAllowed="none")
        // prevent dragImage flyover when dropping
        e.preventDefault()
        //// e.stopPropagation();
      }}
      //! disabling this doesnt seem to do anything
      onDragEnd={(e) => {
        onDragEnd(e)
        e.preventDefault()
        e.stopPropagation()
      }}
    ></div>
  )
}

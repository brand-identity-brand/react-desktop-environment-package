import css from './index.module.css'
import clsx from 'clsx'
import type { DragEvent } from 'react'

interface ComponentProps extends React.ComponentProps<'div'> {
  className: string,
  onDragStart: (e: DragEvent<HTMLElement>) => void,
  onDrag: (e: DragEvent<HTMLElement>) => void,
  onDragEnd: (e: DragEvent<HTMLElement>) => void,
}

export function Border({ className, ...props }: ComponentProps) {
  const {
    onDragStart,
    onDrag,
    onDragEnd
  } = props;
  const style = clsx(
    css.Border, 
    className
  )

  return (
    <div
      draggable={true}
      className={style}
      onDragStart={(e: DragEvent<HTMLElement>): void=>{
        onDragStart(e);
        e.stopPropagation();
        // e.stopImmidiatePropagation()
      }}
      onDrag={(e: DragEvent<HTMLElement>): void=>{
        onDrag(e);
        e.stopPropagation();

      }}
      // below increase performance and avoids unwanted event firing at the end
      onDragLeave={(e)=>{
          // prevent dragImage flyover when dropping
          e.preventDefault();
          e.stopPropagation();

      }}
      onDragOver={(e)=>{
          // prevent dragImage flyover when dropping
          e.preventDefault();
          e.stopPropagation();

      }}
      onDragEnd={(e)=>{
        onDragEnd(e);
          e.preventDefault();
          e.stopPropagation();

      }}
    >
    </div>
  )
}
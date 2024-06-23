import css from './index.module.css'
import clsx from 'clsx'
import type { DragEvent } from 'react'

interface ComponentProps extends React.ComponentProps<'div'> {
  className: string,
  onDragStart: (e: DragEvent<HTMLDivElement>) => void,
  onDrag: (e: DragEvent<HTMLDivElement>) => void,
  onDragEnd: (e: DragEvent<HTMLDivElement>) => void,
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
      onDragStart={(e: DragEvent<HTMLDivElement>): void=>{
        onDragStart(e);
      }}
      onDrag={(e: DragEvent<HTMLDivElement>): void=>{
        onDrag(e);
      }}
        // below deoesnt affect behaviour, but performance increases
        onDragLeave={(e)=>{
          // prevent dragImage flyover when dropping
          e.preventDefault();
      }}
      onDragOver={(e)=>{
          // prevent dragImage flyover when dropping
          e.preventDefault();
      }}
      onDragEnd={(e)=>{
        onDragEnd(e);
          e.preventDefault();
      }}
    >
    </div>
  )
}
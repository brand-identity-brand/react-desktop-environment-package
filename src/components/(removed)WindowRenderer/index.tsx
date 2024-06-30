interface WindowRenderer extends React.ComponentProps<any> {
  Component: React.ComponentType<any>
  props: React.ComponentProps<any>
}

export default function WindowRenderer({ Component, props }: WindowRenderer): React.ReactNode {
  return <Component {...props} />
}

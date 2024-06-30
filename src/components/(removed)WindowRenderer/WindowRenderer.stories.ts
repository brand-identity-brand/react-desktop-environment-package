import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import WindowRenderer from '.'
import DraggableResizable from '../DraggableResizable'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Special Components/WindowRenderer',
  component: WindowRenderer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    Component: {
      description: 'the react component as WindowRenderer',
      table: {
        type: { summary: 'React.ComponentType<any>' },
      },
    },
    props: {
      description: 'props for prop.Component',
      table: {
        type: { summary: 'React.ComponentProps<any>' },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  ////args: { onClick: fn() },
} satisfies Meta<typeof WindowRenderer>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    Component: DraggableResizable,
    props: {
      windowBorderWidth: 10,
      initialPosition: {
        top: 50,
        left: 50,
      },
      initialSize: {
        width: 40,
        height: 70,
      },
    },
  },
}

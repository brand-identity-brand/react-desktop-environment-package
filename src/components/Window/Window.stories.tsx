import type { Meta, StoryObj } from '@storybook/react'
// import  { DraggableResizableContext } from "../DraggableResizable";
import { fn } from '@storybook/test'

import Window from '.'

const meta = {
  title: 'Components/Window',
  component: Window,
  parameters: {
    viewport: {
        defaultViewport: 'fullHD',
    },
  },
  tags: ['autodocs'],
//   decorators: [
//     (Story) => (
//         <div style={{ margin: '3em' }}>
//           <Story />
//         </div>
//     ),
//   ],
  args: {
    title: 'Example Title For Window'
    // onClick: fn(),
  },
} satisfies Meta<typeof Window>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
      
    }
};
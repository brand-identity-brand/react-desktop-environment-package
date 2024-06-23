import type { Meta, StoryObj } from '@storybook/react'
// import { fn } from '@storybook/test'

import DraggbleResizable from '.'

const meta = {
  title: 'Components/DraggbleResizable',
  component: DraggbleResizable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // this is props
  args: {
    // label: 'DraggbleResizableFrame',
    // onClick: fn(),
  },
} satisfies Meta<typeof DraggbleResizable>

export default meta
type Story = StoryObj<typeof meta>

export const FixedSize: Story = {
  args: {
    windowBorderWidth: 10,
    // lockResize: true,
  },
  render: (args) => (
    <div style={{width: '500px', height: '500px', boxSizing: "border-box"}}>
      <DraggbleResizable {...args}>
        <div>test</div>
      </DraggbleResizable>
    </div>
  ),
}
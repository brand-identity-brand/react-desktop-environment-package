import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import DraggbleResizableFrame from './index.js'

const meta = {
  title: 'Components/DraggbleResizableFrame',
  component: DraggbleResizableFrame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // this is props
  args: {
    // label: 'DraggbleResizableFrame',
    // onClick: fn(),
  },
} satisfies Meta<typeof DraggbleResizableFrame>

export default meta
type Story = StoryObj<typeof meta>

export const FixedSize: Story = {
  args: {
    lockResize: true,
  },
}

export const Resizable: Story = {
  args: {
    lockResize: false,
  },
}

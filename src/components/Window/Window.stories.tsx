import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import Window from './'

const meta = {
  title: 'Components/Window',
  component: Window,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    // label: 'Window',
    // onClick: fn(),
  },
} satisfies Meta<typeof Window>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    initialPosition: {
        top: 500,
        left: 700
    }
  },
}
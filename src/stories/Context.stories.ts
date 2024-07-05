import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Desktop from '../components/Desktop/(removed) index'
import Window from '../components/Window'
import WindowExample from './WindowExample'
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Desktop> = {
  title: 'Special Components/React Window Manager',
  component: Desktop,

  parameters: {
    storyType: 'withRWM',
    sessionWindowSpecs: {
      '1': {
        componentName: 'Desktop',
        props: {
          windowBorderWidth: 10,
          initialSize: {
            width: 500,
            height: 500,
          },
        },
        windows: { active: ['2'], hidden: [], closed: [] },
        registeredIn: [],
      },
      '2': {
        componentName: 'WindowExample',
        props: {
          windowType: 'fullscreen',
          windowBorderWidth: 5,
          initialPosition: {
            top: 50,
            left: 70,
          },
          initialSize: {
            width: 500,
            height: 500,
          },
        },
        windows: {
          active: [
            '3',
            '4',
          ],
          hidden: [],
          closed: [],
        },
        registeredIn: [],
      },
      '3': {
        componentName: 'WindowExample',
        props: {
          title: 'Example Title For Window 3',
          windowBorderWidth: 2,
          initialPosition: {
            top: 50,
            left: 70,
          },
          initialSize: {
            width: 500,
            height: 500,
          },
        },
        windows: { active: [], hidden: [], closed: [] },
        registeredIn: [],
      },
      '4': {
        componentName: 'WindowExample',
        props: {
          title: 'Example Title For Window 4',
          windowBorderWidth: 2,
          initialPosition: {
            top: 100,
            left: 120,
          },
          initialSize: {
            width: 500,
            height: 500,
          },
        },
        windows: { active: [], hidden: [], closed: [] },
        registeredIn: [],
      },
    },
    components: {
      Window: Window,
      Desktop: Desktop,
      WindowExample: WindowExample,
    },
  },
  tags: ['autodocs'],
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  ////args: { onClick: fn() },
  args: {
    windowId: '1',
    // windowBorderWidth: 10,s
    // initialSize: {
    //   width: 500,
    //   height: 500
    // }
  },
}

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: Story = {
  args: {},
}

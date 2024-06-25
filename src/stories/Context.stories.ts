import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Desktop from '../components/Desktop';
import DraggableResizable from '../components/DraggableResizable';
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Desktop> = {
  title: 'Special Components/React Window Manager',
  component: Desktop,

  parameters: {
    layout: 'centered',
    storyType: 'withRWM', 
    sessionWindowSpecs: {
      '1': { 
          componentName: "DraggableResizable",
          props:{
            windowBorderWidth: 10,
            
          },
          windows:{active:['2', '3'],hidden:[],closed:[]},
          registeredIn:[] 
      },
      '2': { 
        componentName: "DraggableResizable",
        props:{
          windowBorderWidth: 5,
          initialPosition: {
            top: 25,
            left: 50
          }
        },
        windows:{active:[],hidden:[],closed:[]},
        registeredIn:[] 
      },
      '3':{ 
        componentName: "DraggableResizable",
        props:{
          windowBorderWidth: 2,
          initialPosition: {
            top: 50,
            left: 70
          }
        },
        windows:{active:[],hidden:[],closed:[]},
        registeredIn:[] 
      }
    }, 
    components: {
      "DraggableResizable": DraggableResizable
    }
  },
  tags: ['autodocs'],
  argTypes: {
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  ////args: { onClick: fn() },
  args:{
    windowId:'1'
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example: Story = {
  args: {
  },
}


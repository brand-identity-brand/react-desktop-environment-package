import React from 'react'
import type { Preview } from '@storybook/react'

import WindowManagerRegistryProvider, {WindowManagerRegistryContext} from '../src/react-window-manager/contexts/WindowManagerRegistry';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators:[
    // 👇 Defining the decorator in the preview file applies it to all stories
    (Story, { parameters }) => {
      // 👇 Make it configurable by reading from parameters
      const { storyType, sessionWindowSpecs, components } = parameters;
      switch(storyType){
        case 'withRWM':
          return (
            <WindowManagerRegistryProvider components={components} sessionWindowSpecs={sessionWindowSpecs}> 
              <Story />
            </WindowManagerRegistryProvider>
          )
        default:
          return <Story/>
      }

    },
  ]
}

export default preview

import React from 'react'
import type { Preview } from '@storybook/react'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import WindowManagerRegistryProvider, {WindowManagerRegistryContext} from '../src/react-window-manager/contexts/WindowManagerRegistry';
const customViewports = {
  fullHD: {
    name: 'fullHD',
    styles: {
      width: '1920px',
      height: '1080px',
    },
  }
};
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        ...customViewports,
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
        // case 'Space':
        //   return (
        //     <div style={{width: '100vw', height: '100vh', boxSizing: "border-box"}}>
        //       <Story />
        //     </div>
        //   )
        default:
          return <Story/>
      }
    },
  ]
}

export default preview

import {useState, useRef} from 'react'
import type {Meta} from '@storybook/react-vite'
import {Button} from '../Button'
import {Box, Text} from '..'
import {Banner} from '../Banner'
import {default as Dialog} from './Dialog'

/* Dialog Version 1*/

export default {
  title: 'Deprecated/Components/DialogV1',
  component: Dialog,
} as Meta

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false)
  const returnFocusRef = useRef(null)
  return (
    <div>
      <Box sx={{mb: 3}}>
        <Banner
          title="This component is deprecated"
          description="We recommend using Dialog instead."
          variant="warning"
        />
      </Box>
      <Button data-testid="trigger-button" ref={returnFocusRef} onClick={() => setIsOpen(true)}>
        Show Dialog
      </Button>
      <Dialog
        returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="header"
      >
        <div data-testid="inner">
          <Dialog.Header id="header">Title</Dialog.Header>
          <Box p={3}>
            <Text>Some content</Text>
          </Box>
        </div>
      </Dialog>
    </div>
  )
}

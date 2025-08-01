import React, {useState, useMemo} from 'react'
import Box from '../Box'
import type {Meta} from '@storybook/react-vite'
import {Button} from '../Button'
import type {ItemInput} from '../deprecated/ActionList/List'
import {SelectPanel} from './SelectPanel'
import type {OverlayProps} from '../Overlay'
import {TriangleDownIcon} from '@primer/octicons-react'
import {ActionList} from '../deprecated/ActionList'
import FormControl from '../FormControl'
import {Stack} from '../Stack'
import {Dialog} from '../experimental'

const meta: Meta<typeof SelectPanel> = {
  title: 'Components/SelectPanel/Examples',
  component: SelectPanel,
} satisfies Meta<typeof SelectPanel>

export default meta

const NoResultsMessage = (filter: string): {variant: 'empty'; title: string; body: string} => {
  return {
    variant: 'empty',
    title: `No language found for \`${filter}\``,
    body: 'Adjust your search term to find other languages',
  }
}

function getColorCircle(color: string) {
  return function () {
    return (
      <Box
        bg={color}
        borderColor={color}
        width={14}
        height={14}
        borderRadius={10}
        margin="auto"
        borderWidth="1px"
        borderStyle="solid"
      />
    )
  }
}

const items = [
  {leadingVisual: getColorCircle('#a2eeef'), text: 'enhancement', id: 1},
  {leadingVisual: getColorCircle('#d73a4a'), text: 'bug', id: 2},
  {leadingVisual: getColorCircle('#0cf478'), text: 'good first issue', id: 3},
  {leadingVisual: getColorCircle('#ffd78e'), text: 'design', id: 4},
  {leadingVisual: getColorCircle('#ff0000'), text: 'blocker', id: 5},
  {leadingVisual: getColorCircle('#a4f287'), text: 'backend', id: 6},
  {leadingVisual: getColorCircle('#8dc6fc'), text: 'frontend', id: 7},
]

export const HeightInitialWithOverflowingItemsStory = () => {
  const [selected, setSelected] = useState<ItemInput[]>(items.slice(1, 3))
  const [filter, setFilter] = useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [open, setOpen] = useState(false)

  return (
    <FormControl>
      <FormControl.Label>Labels</FormControl.Label>
      <SelectPanel
        renderAnchor={({children, ...anchorProps}) => (
          <Button trailingAction={TriangleDownIcon} {...anchorProps}>
            {children}
          </Button>
        )}
        placeholder="Select labels" // button text when no items are selected
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        overlayProps={{width: 'small', height: 'initial', maxHeight: 'xsmall'}}
        message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
      />
    </FormControl>
  )
}
HeightInitialWithOverflowingItemsStory.storyName = 'Height: Initial, Overflowing Items'

export const HeightInitialWithUnderflowingItemsStory = () => {
  const underflowingItems = [items[0], items[1]]
  const [selected, setSelected] = useState<ItemInput[]>([underflowingItems[0]])
  const [filter, setFilter] = useState('')
  const filteredItems = underflowingItems.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [open, setOpen] = useState(false)

  return (
    <FormControl>
      <FormControl.Label>Labels</FormControl.Label>
      <SelectPanel
        renderAnchor={({children, ...anchorProps}) => (
          <Button trailingAction={TriangleDownIcon} {...anchorProps}>
            {children}
          </Button>
        )}
        placeholder="Select labels" // button text when no items are selected
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'small', height: 'initial', maxHeight: 'xsmall'}}
        message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
      />
    </FormControl>
  )
}
HeightInitialWithUnderflowingItemsStory.storyName = 'Height: Initial, Underflowing Items'

export const HeightInitialWithUnderflowingItemsAfterFetch = () => {
  const [selected, setSelected] = useState<ItemInput[]>([items[0]])
  const [filter, setFilter] = useState('')
  const [fetchedItems, setFetchedItems] = useState<typeof items>([])
  const filteredItems = useMemo(
    () => fetchedItems.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase())),
    [fetchedItems, filter],
  )

  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState<OverlayProps['height']>('auto')

  const onOpenChange = () => {
    setOpen(!open)
    setTimeout(() => {
      setFetchedItems([items[0], items[1]])
      setHeight('initial')
    }, 1500)
  }

  return (
    <FormControl>
      <FormControl.Label>Labels</FormControl.Label>
      <SelectPanel
        renderAnchor={({children, 'aria-labelledby': ariaLabelledBy, ...anchorProps}) => (
          <Button trailingAction={TriangleDownIcon} aria-labelledby={` ${ariaLabelledBy}`} {...anchorProps}>
            {children}
          </Button>
        )}
        placeholder="Select labels" // button text when no items are selected
        open={open}
        onOpenChange={onOpenChange}
        loading={fetchedItems.length === 0}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        overlayProps={{width: 'small', height, maxHeight: 'xsmall'}}
        message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
      />
    </FormControl>
  )
}
HeightInitialWithUnderflowingItemsAfterFetch.storyName = 'Height: Initial, Underflowing Items (After Fetch)'

export const AboveTallBody = () => {
  const [selected, setSelected] = useState<ItemInput[]>(items.slice(1, 3))
  const [filter, setFilter] = useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [open, setOpen] = useState(false)
  return (
    <FormControl>
      <FormControl.Label>Labels</FormControl.Label>
      <SelectPanel
        renderAnchor={({children, 'aria-labelledby': ariaLabelledBy, ...anchorProps}) => (
          <Button trailingAction={TriangleDownIcon} aria-labelledby={` ${ariaLabelledBy}`} {...anchorProps}>
            {children}
          </Button>
        )}
        placeholder="Select labels" // button text when no items are selected
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        showItemDividers={true}
        message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
      />
      <div
        style={{
          backgroundColor: '#9c27b0',
          height: '100vh',
          padding: '20px',
          margin: '20px',
          color: 'white',
        }}
      >
        This element makes the body really tall. This is to test that we do not have layout/focus issues if the Portal
        is far down the page
      </div>
    </FormControl>
  )
}

export const HeightVariationsAndScroll = () => {
  const longItems = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items]
  const [filter, setFilter] = useState('')
  // Example A
  const [selectedA, setSelectedA] = React.useState<ItemInput | undefined>(longItems[0])
  const filteredItemsA = longItems.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [openA, setOpenA] = useState(false)

  // Example B
  const [selectedB, setSelectedB] = React.useState<ItemInput | undefined>(longItems[0])
  const filteredItemsB = longItems.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [openB, setOpenB] = useState(false)

  return (
    <>
      <FormControl>
        <FormControl.Label>With height:medium</FormControl.Label>
        <SelectPanel
          renderAnchor={({children, ...anchorProps}) => (
            <Button trailingAction={TriangleDownIcon} {...anchorProps}>
              {children ?? 'Select Labels'}
            </Button>
          )}
          placeholder="Select labels" // button text when no items are selected
          open={openA}
          onOpenChange={setOpenA}
          items={filteredItemsA}
          selected={selectedA}
          onSelectedChange={setSelectedA}
          onFilterChange={setFilter}
          showItemDividers={true}
          overlayProps={{height: 'medium'}}
          message={filteredItemsA.length === 0 ? NoResultsMessage(filter) : undefined}
        />
      </FormControl>
      <br />
      <FormControl>
        <FormControl.Label>With height:auto, maxheight:medium</FormControl.Label>
        <SelectPanel
          renderAnchor={({children, ...anchorProps}) => (
            <Button trailingAction={TriangleDownIcon} {...anchorProps}>
              {children ?? 'Select Labels'}
            </Button>
          )}
          placeholder="Select labels" // button text when no items are selected
          open={openB}
          onOpenChange={setOpenB}
          items={filteredItemsB}
          selected={selectedB}
          onSelectedChange={setSelectedB}
          onFilterChange={setFilter}
          showItemDividers={true}
          overlayProps={{
            height: 'auto',
            maxHeight: 'medium',
          }}
          message={filteredItemsB.length === 0 ? NoResultsMessage(filter) : undefined}
        />
      </FormControl>
    </>
  )
}

export const CustomItemRenderer = () => {
  const items = [
    {text: 'src/SelectPanel/SelectPanel.tsx', id: 3},
    {text: 'src/SelectPanel/SelectPanel.stories.tsx', id: 4},
    {text: 'src/SelectPanel/SelectPanel.features.stories.tsx', id: 5},
    {text: 'src/SelectPanel/SelectPanel.examples.stories.tsx', id: 6},
  ]
  const [selected, setSelected] = useState<ItemInput[]>(items.slice(1, 3))
  const [filter, setFilter] = useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [open, setOpen] = useState(false)

  return (
    <FormControl>
      <FormControl.Label>Long string with truncation (not reviewed for accessibility)</FormControl.Label>
      <SelectPanel
        title="Select files"
        renderAnchor={anchorProps => (
          <Button trailingAction={TriangleDownIcon} {...anchorProps} aria-haspopup="dialog">
            Select files
          </Button>
        )}
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        overlayProps={{width: 'medium'}}
        renderItem={item => (
          <ActionList.Item
            {...item}
            text={undefined}
            sx={{
              mx: 2,
              '&[data-is-active-descendant="activated-directly"]': {
                backgroundColor: 'transparent',
                outline: '2px solid var(--focus-outlineColor, var(--color-accent-emphasis))',
                outlineOffset: '-2px',
              },
            }}
          >
            {' '}
            <Box
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {item.text}
            </Box>
          </ActionList.Item>
        )}
        message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
      />
    </FormControl>
  )
}

export const ItemsInScope = () => {
  // items are defined in the same scope as selection, so they could rerender and create new object references
  // We use item.id to track selection
  // Reported in: https://github.com/primer/react/issues/4315
  const items = [
    {text: 'enhancement', id: 1},
    {text: 'bug', id: 2},
    {text: 'good first issue', id: 3},
    {text: 'design', id: 4},
    {text: 'blocker', id: 5},
    {text: 'backend', id: 6},
    {text: 'frontend', id: 7},
  ]

  const [selected, setSelected] = useState<ItemInput[]>(items.slice(1, 3))
  const [filter, setFilter] = useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [open, setOpen] = useState(false)
  return (
    <FormControl>
      <FormControl.Label>Items in component scope</FormControl.Label>
      <SelectPanel
        title="Select labels"
        placeholder="Select labels" // button text when no items are selected
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
      />
    </FormControl>
  )
}

export const RepositionAfterLoading = () => {
  const [selected, setSelected] = React.useState<ItemInput[]>([items[0], items[1]])
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = React.useState('')
  const [filteredItems, setFilteredItems] = React.useState<typeof items>([])

  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    if (!open) setLoading(true)
    window.setTimeout(() => {
      if (open) {
        setFilteredItems(items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase())))
        setLoading(false)
      }
    }, 2000)
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    if (!loading) {
      setFilteredItems(items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase())))
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <>
      <Stack direction="vertical" justify="space-between" style={{height: 'calc(100vh - 300px)', width: 'fit-content'}}>
        <h1>Reposition panel after loading</h1>
        <SelectPanel
          loading={loading}
          title="Select labels"
          placeholderText="Filter Labels"
          open={open}
          onOpenChange={setOpen}
          items={filteredItems}
          selected={selected}
          onSelectedChange={setSelected}
          onFilterChange={setFilter}
          message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
        />
      </Stack>
    </>
  )
}

export const SelectPanelRepositionInsideDialog = () => {
  const [selected, setSelected] = React.useState<ItemInput[]>([items[0], items[1]])
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = React.useState('')
  const [filteredItems, setFilteredItems] = React.useState<typeof items>([])

  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    if (!open) setLoading(true)
    window.setTimeout(() => {
      if (open) {
        setFilteredItems(items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase())))
        setLoading(false)
      }
    }, 2000)
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  React.useEffect(() => {
    if (!loading) {
      setFilteredItems(items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase())))
    }
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <Dialog title="SelectPanel reposition after loading inside Dialog" onClose={() => {}}>
      <Stack direction="vertical" justify="space-between" style={{height: 'calc(100vh - 500px)', width: 'fit-content'}}>
        <p>other content</p>
        <SelectPanel
          loading={loading}
          title="Select labels"
          placeholderText="Filter Labels"
          open={open}
          onOpenChange={setOpen}
          items={filteredItems}
          selected={selected}
          onSelectedChange={setSelected}
          onFilterChange={setFilter}
          overlayProps={{anchorSide: 'outside-top'}}
          message={filteredItems.length === 0 ? NoResultsMessage(filter) : undefined}
        />
      </Stack>
    </Dialog>
  )
}

export const WithDefaultMessage = () => {
  const [selected, setSelected] = useState<ItemInput[]>(items.slice(1, 3))
  const [filter, setFilter] = useState('')
  const filteredItems = items.filter(item => item.text.toLowerCase().startsWith(filter.toLowerCase()))

  const [open, setOpen] = useState(false)

  return (
    <FormControl>
      <FormControl.Label>Labels</FormControl.Label>
      <SelectPanel
        title="Select labels"
        placeholder="Select labels" // button text when no items are selected
        subtitle="Use labels to organize issues and pull requests"
        renderAnchor={({children, ...anchorProps}) => (
          <Button trailingAction={TriangleDownIcon} {...anchorProps} aria-haspopup="dialog">
            {children}
          </Button>
        )}
        open={open}
        onOpenChange={setOpen}
        items={filteredItems}
        selected={selected}
        onSelectedChange={setSelected}
        onFilterChange={setFilter}
        width="medium"
      />
    </FormControl>
  )
}

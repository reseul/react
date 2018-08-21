import React from 'react'
import { Menu } from '@stardust-ui/react'

const items = [
  {
    key: 'editorials',
    content: 'Editorials test',
    onClick: () => {
      alert('test')
    },
  },
  {
    key: 'review',
    content: 'Reviews',
    onClick: () => {
      alert('test2')
    },
  },
  {
    key: 'events',
    content: 'Upcoming Events',
    onClick: () => {
      alert('test3')
    },
  },
]

const MenuExample = () => <Menu defaultActiveIndex={0} items={items} />

export default MenuExample

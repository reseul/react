import * as React from 'react'
import { Button, Chat, Header, Input, Layout, Provider, themes } from '@stardust-ui/react'

export default () => (
  <Provider theme={themes.teams}>
    <Layout vertical>
      <Header as="h1" content="" />
      <Header as="h1" content="Hello World Chart" />
      <Chat>
        <Chat.Item>
          <Chat.Message content="Hello" author="John Doe" timestamp="Yesterday, 10:15 PM" mine />
        </Chat.Item>
        <Chat.Item>
          <Chat.Message content="Hi" author="Jane Doe" timestamp="Yesterday, 10:15 PM" />
        </Chat.Item>
        <Chat.Item>
          <Chat.Message
            content="Would you like to grab a lunch?"
            author="John Doe"
            timestamp="Yesterday, 10:16 PM"
            mine
          />
        </Chat.Item>
      </Chat>
      <Layout>
        <Input placeholder="Type a message here" />
        <Button content="Send" primary />
      </Layout>
    </Layout>
  </Provider>
)

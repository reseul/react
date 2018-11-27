import { Provider, ProviderConsumer } from '@stardust-ui/react'
import * as faker from 'faker'
import * as _ from 'lodash'
import * as React from 'react'
import { Grid, Header, Segment } from 'semantic-ui-react'

import ColorBox, { colorBoxStyles, colorBoxVariables } from 'docs/src/components/ColorBox'
import ColorVariants, { colorVariantsStyles } from 'docs/src/components/ColorVariants'
import DocPage from 'docs/src/components/DocPage/DocPage'

const ColorPalette = () => (
  <Provider
    theme={{
      componentStyles: {
        ColorBox: colorBoxStyles,
        ColorVariants: colorVariantsStyles,
      },
      componentVariables: {
        ColorBox: colorBoxVariables,
      },
    }}
  >
    <ProviderConsumer
      render={({ siteVariables: { colors, contextualColors, emphasisColors, naturalColors } }) => (
        <DocPage title="Color Palette">
          <Header as="h2">Introduction</Header>
          <p>
            The color palette for a theme has many requirements and constraints. There is a need to
            be intentional and functional with color use. We analyzed existing frameworks and picked
            the best ideas from them.
          </p>
          <p>
            An each theme should match our color palette types fully. This will allow you to use our
            theming features completely and keep your palette structured.
          </p>

          <Header as="h2">Primitive colors</Header>
          <p>
            This part of the palette includes only <i>black</i> and <i>white</i> colors, we decided
            to separate by semantical ideas. There are nothing more blacker than black and nothing
            more whiter than white.
          </p>

          <Grid columns={2}>
            {_.map(['black', 'white'], color => (
              <Grid.Column key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color]} />
              </Grid.Column>
            ))}
          </Grid>

          <Header as="h2">Natural colors</Header>
          <p>
            This part of palette includes nine colors that are the most frequently used among
            popular frameworks. Each color includes ten gradients, this allows to satisfy all common
            needs. This decisition expirienced from Material UI and allows to define more variants
            than semantical naming (lightest, lighter, etc.).
          </p>

          <Grid columns={2}>
            {_.map(naturalColors, (variants, color) => (
              <Grid.Column key={color}>
                <ColorBox name={color} rounded value={colors[color][500]} />
              </Grid.Column>
            ))}
          </Grid>

          <Header as="h2">Contextual colors</Header>
          <p>
            This part of the palette includes primary and secondary (i.e. brand) colors and state
            colors. State colors can be just aliases for natural colors.
          </p>

          <Grid columns={2}>
            {_.map({ ...emphasisColors, ...contextualColors }, (variants, color) => (
              <Grid.Column key={color}>
                <ColorBox name={color} rounded size="big" value={colors[color][500]} />
              </Grid.Column>
            ))}
          </Grid>

          <Header as="h2">Text colors</Header>
          <p>
            Text variants are also separated as state color because in the most cases it's not
            correct to use grey color for text.
          </p>

          <Segment>
            {_.map(colors.text, color => (
              <p key={color} style={{ color }}>
                {faker.lorem.sentence()}
              </p>
            ))}
          </Segment>

          <Header as="h2">Color variables</Header>
          <Grid columns={2}>
            {_.map(
              { ...emphasisColors, ...contextualColors, ...naturalColors },
              (variants, color) => (
                <Grid.Column key={color}>
                  <ColorVariants name={color} />
                </Grid.Column>
              ),
            )}
          </Grid>
        </DocPage>
      )}
    />
  </Provider>
)

export default ColorPalette

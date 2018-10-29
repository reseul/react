import * as React from 'react'
import * as PropTypes from 'prop-types'

import { Extendable, ShorthandValue } from '../../../types/utils'
import { ComponentSlotStyle } from '../../themes/types'
import Downshift from 'downshift'
import Label from '../Label/Label'
import { UIComponent, customPropTypes } from '../../lib'
import Input from '../Input/Input'
import keyboardKey from 'keyboard-key'
import List from '../List/List'
import Text from '../Text/Text'
import Image from '../Image/Image'
import ListItem from '../List/ListItem'
import _ from 'lodash'

export interface DropdownProps {
  className?: string
  fluid?: boolean
  items?: DropdownListItem[]
  label?: ShorthandValue
  multiple?: boolean
  onChange?: (active: DropdownListItem[]) => any
  placeholder?: string
  search?: boolean
  styles?: ComponentSlotStyle<DropdownProps, DropdownState>
}

export interface DropdownState {
  active: DropdownListItem[]
  inputValue?: string
  focused: boolean
  message?: string
}

export interface DropdownListItem {
  key: string
  header: string
  content?: string
  image?: string
}

/**
 */
export default class Dropdown extends UIComponent<Extendable<DropdownProps>, DropdownState> {
  private inputRef: HTMLElement

  static displayName = 'Dropdown'

  static className = 'ui-dropdown'

  static propTypes = {
    /** Additional CSS class name(s) to apply.  */
    className: PropTypes.string,

    /** An input can take the width of its container. */
    fluid: PropTypes.bool,

    /** Shorthand array of props for ListItem. */
    items: customPropTypes.collectionShorthand,

    /** Dropdown can have a label. */
    label: customPropTypes.itemShorthand,

    /** A dropdown can have a multiple selection. */
    multiple: PropTypes.bool,

    /**
     * Event for request to change 'open' value.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} data - All props and proposed value.
     */
    onChange: PropTypes.func,

    /** A message to serve as placeholder. */
    placeholder: PropTypes.string,

    /** A dropdown can have a search field. */
    search: PropTypes.bool,

    /** Additional CSS styles to apply to the component instance.  */
    styles: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  state: DropdownState = { active: this.props.multiple ? [] : null, focused: false, inputValue: '' }

  public renderComponent({ ElementType, styles, variables }): React.ReactNode {
    const { label, search, multiple } = this.props
    const { inputValue } = this.state

    return (
      <ElementType>
        <Downshift
          onChange={this.onDropdownChange}
          inputValue={inputValue}
          itemToString={(item: DropdownListItem) => (item ? item.header : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            highlightedIndex,
            selectItemAtIndex,
            getLabelProps,
            getRootProps,
          }) => {
            return (
              <div>
                {Label.create(label, {
                  defaultProps: {
                    styles: styles.label,
                    ...getLabelProps(),
                  },
                })}
                <div style={styles.containerDiv} onClick={this.onContainerClick.bind(this, isOpen)}>
                  <span aria-live="assertive" style={styles.ariaLiveSpan}>
                    {this.state.message}
                  </span>
                  {multiple && this.renderActive(styles)}
                  {search &&
                    this.renderInputTrigger(
                      styles,
                      variables,
                      getRootProps,
                      getInputProps,
                      highlightedIndex,
                      selectItemAtIndex,
                    )}
                </div>
                {this.renderList(
                  styles,
                  variables,
                  getMenuProps,
                  getItemProps,
                  isOpen,
                  highlightedIndex,
                )}
              </div>
            )
          }}
        </Downshift>
      </ElementType>
    )
  }

  private renderInputTrigger(
    styles,
    variables,
    getRootProps,
    getInputProps,
    highlightedIndex,
    selectItemAtIndex,
  ): JSX.Element {
    const { multiple, placeholder } = this.props
    const { inputValue, active } = this.state
    const inputIntegratedProps = {
      ...getRootProps({ refKey: undefined }, { suppressRefError: true }),
      ...getInputProps({
        onBlur: this.onInputBlur,
        onKeyDown: this.onInputKeyDown.bind(this, highlightedIndex, selectItemAtIndex),
      }),
      'aria-haspopup': true,
      'aria-controls': undefined,
      'aria-labelledby': undefined,
    }

    return (
      <Input
        inputRef={input => (this.inputRef = input)}
        onFocus={this.onInputFocus}
        onKeyUp={multiple && this.onInputKeyUpIfMultiple}
        styles={styles.editTextDiv}
        wrapper={{ role: 'presentation' }}
        variables={{ inputFocusBorderColor: variables.editTextInputFocusBorderColor }}
        input={{
          type: 'text',
          styles: styles.editTextInput,
          placeholder: inputValue.length > 0 || (multiple && active.length > 0) ? '' : placeholder,
          ...inputIntegratedProps,
        }}
      />
    )
  }

  private renderList(styles, variables, getMenuProps, getItemProps, isOpen, highlightedIndex) {
    return (
      <List
        {...getMenuProps()}
        styles={styles.list}
        aria-hidden={!isOpen}
        items={isOpen ? this.renderItems(variables, getItemProps, highlightedIndex) : []}
      />
    )
  }

  private renderItems(variables, getItemProps, highlightedIndex) {
    const { items } = this.props
    if (items.length > 0) {
      return items.map((item, index) => {
        return (
          <ListItem
            key={item.key}
            content={item.content}
            header={item.header}
            media={<Image src={item.image} avatar />}
            variables={{
              ...(highlightedIndex === index && {
                headerColor: variables.listItemTextColor,
                contentColor: variables.listItemTextColor,
              }),
            }}
            styles={{
              backgroundColor:
                highlightedIndex === index
                  ? variables.listItemHighlightedBackgroundColor
                  : variables.listItemBackgroundColor,
            }}
            {...getItemProps({ index, item })}
          />
        )
      })
    }
    // render no match error.
    return [
      {
        key: 'people-picker-no-results-item',
        content: <Text weight="bold" content={`We couldn't find any matches.`} />,
      },
    ]
  }

  private renderActive(styles) {
    const active = this.state.active

    return active.length === 0
      ? null
      : active.map((item, index) => (
          <Label
            role="presentation"
            styles={styles.activeListLabel}
            circular
            key={`active-item-${index}`}
            content={item.header}
            image={{ src: item.image, avatar: true }}
            icon={{
              name: 'close',
              onClick: this.onCloseIconClick.bind(this, item),
              onKeyDown: this.onCloseIconKeyDown.bind(this, item),
              'aria-label': `Remove ${item['name']} from selection.`,
              'aria-hidden': false,
              role: 'button',
            }}
          />
        ))
  }

  onInputFocus = () => {
    this.setState({ focused: true })
  }

  onInputBlur = () => {
    this.setState({ focused: false })
  }

  onContainerClick = isOpen => {
    !isOpen && this.inputRef.focus()
  }

  onInputKeyUpIfMultiple = event => {
    const { inputValue, active } = this.state

    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Backspace:
        if (inputValue === '' && active.length > 0) {
          this.removeFromActive()
        }
      default:
        return
    }
  }

  onDropdownChange = element => {
    if (this.props.multiple) {
      this.addToActive(element)
      _.invoke(this.props, 'onChange', this.state.active)
    }
  }

  onCloseIconClick = (element, event) => this.handleCloseIconAction(element, event)

  onCloseIconKeyDown = (element, event) => {
    if (keyboardKey.getCode(event) === keyboardKey.Enter) {
      this.handleCloseIconAction(element, event)
    }
  }

  onInputKeyDown = (highlightedIndex, selectItemAtIndex, event) => {
    switch (keyboardKey.getCode(event)) {
      case keyboardKey.Tab:
        if (highlightedIndex !== undefined) {
          selectItemAtIndex(highlightedIndex)
        }
        return
      default:
        return
    }
  }

  private handleCloseIconAction(element, event) {
    this.removeFromActive(element)
    this.inputRef.focus()
    event.stopPropagation()
  }

  private addToActive(element: DropdownListItem) {
    this.setState(previousState => {
      const previousActive = previousState.active
      const active = [...previousActive, element]

      return { active, inputValue: '', message: `${element.header} has been selected.` }
    })
  }

  private removeFromActive(element?) {
    let { active } = this.state
    let poppedElement = element

    if (poppedElement) {
      active = active.filter(currentElement => currentElement !== element)
    } else {
      poppedElement = active.pop()
    }
    this.setState({
      active,
      message: `${poppedElement.header} has been removed.`,
    })
  }
}

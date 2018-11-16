import * as React from 'react'
import isElementTypeOfComponent from 'src/lib/isElementTypeOfComponent'
import { createMockComponent } from 'test/utils'

describe('isElementTypeOfComponent', () => {
  it('throws an error for invalid arguments', () => {
    expect(() => isElementTypeOfComponent(null, undefined)).toThrowError()
    expect(() => isElementTypeOfComponent(undefined, '')).toThrowError()
  })

  describe('for primitive components', () => {
    it('returns false if the element is not of component type', () => {
      expect(isElementTypeOfComponent(<p />, 'div')).toBeFalsy()
      expect(isElementTypeOfComponent(<div />, 'span')).toBeFalsy()
    })

    it('returns true if the element is of component type', () => {
      expect(isElementTypeOfComponent(<div />, 'div')).toBeTruthy()
      expect(isElementTypeOfComponent(<span />, 'span')).toBeTruthy()
    })
  })

  describe('for functional components', () => {
    const MyComponent = createMockComponent('MyComponent')
    const OtherComponent = createMockComponent('OtherComponent')

    it("returns false if the element is not of component's type", () => {
      expect(isElementTypeOfComponent(<MyComponent />, OtherComponent)).toBeFalsy()
      expect(isElementTypeOfComponent(<MyComponent />, 'OtherComponent')).toBeFalsy()
    })

    it("returns true if the element is of component's type", () => {
      expect(isElementTypeOfComponent(<MyComponent />, MyComponent)).toBeTruthy()
      expect(isElementTypeOfComponent(<OtherComponent />, 'OtherComponent')).toBeTruthy()
    })
  })
})

import { Props } from '../../types/utils'

const getComponentName = (component: React.ReactType) => {
  switch (typeof component) {
    case 'function':
      return component.displayName || component.name || null // unknown
    case 'string':
      return component
    default:
      return null // unknown
  }
}

const isElementTypeOfComponent = (
  element: React.ReactElement<Props>,
  component: React.ReactType,
): boolean => {
  const componentNameOfElement = getComponentName(element.type)
  const componentName = getComponentName(component)

  return (
    componentNameOfElement !== null &&
    componentName !== null &&
    componentNameOfElement === componentName
  )
}

export default isElementTypeOfComponent

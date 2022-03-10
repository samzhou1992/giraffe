import {useRef, useEffect} from 'react'

import {AnnotationTooltipOptions} from '../../types'
import {useTooltipStyle, useAnnotationStyle} from './useTooltipStyle'

/*
  Returns a DOM node that a tooltip can be rendered inside.

  The node will be created and appended to the end of the document body on
  mount. After every render, the tooltip is automatically positioned to be next
  to the mouse. It will be destroyed on unmount.  

  The returned node is intended to be used with `React.createPortal`. It is
  appended to the end of the document to circumvent z-index issues.
*/
export const useLegendElement = (className: string) => {
  const ref = useRef<HTMLDivElement>(null)

  let container = document.getElementById(className)
  if (!container) {
    container = document.createElement('div')
    container.id = className
    document.body.appendChild(container)
  }

  if (ref.current === null) {
    ref.current = document.createElement('div')
    ref.current.classList.add(className)

    container.appendChild(ref.current)
  }

  useEffect(() => () => container.removeChild(ref.current), [])

  useTooltipStyle(container as HTMLDivElement)

  return ref.current
}

/*
  Similar to useLegendElement but for Annotation tooltips
*/
export const useAnnotationTooltipElement = (
  className: string,
  options: AnnotationTooltipOptions
) => {
  const ref = useRef<HTMLDivElement>(null)

  if (ref.current === null) {
    ref.current = document.createElement('div')
    ref.current.classList.add(className)

    document.body.appendChild(ref.current)
  }

  useEffect(() => () => document.body.removeChild(ref.current), [])

  useAnnotationStyle(ref.current, options)

  return ref.current
}

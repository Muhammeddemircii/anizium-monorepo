export const onDoubleClick = <T extends HTMLElement = HTMLDivElement>(e: React.MouseEvent<T>) => {
  e.stopPropagation()
  e.preventDefault()
}

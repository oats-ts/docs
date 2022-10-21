export function getSizeWithAspectRatio(width: number, height: number, newWidth?: number, newHeight?: number): [number, number] {
  if (newWidth !== undefined && newHeight === undefined) {
    return [newWidth, (height / width) * newWidth]
  }

  if (newHeight !== undefined && newWidth === undefined) {
    return [newHeight, (width / height) * newHeight]
  }

  if (newWidth !== undefined && newHeight !== undefined) {
    return [newWidth, newHeight]
  }

  return [width, height]
}

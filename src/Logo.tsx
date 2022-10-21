import React, { FC } from 'react'
import { theme } from './v2/theme'

type LogoProps = {
  color?: string
  width?: number
  height?: number
}

const width = 172.439
const height = 111.543

const widthToHeight = width / height
const heightToWidth = height / width

function getDimensions(w?: number, h?: number): [number, number] {
  if (w !== undefined && h === undefined) {
    return [w, heightToWidth * w]
  }

  if (h !== undefined && w === undefined) {
    return [h, widthToHeight * h]
  }

  if (w !== undefined && h !== undefined) {
    return [w, h]
  }

  return [width, height]
}

export const Logo: FC<LogoProps> = ({ color = theme.colors.green, width, height }) => {
  const [w, h] = getDimensions(width, height)

  return (
    <svg width={w} height={h} viewBox="0 0 45.624 29.512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
      <path
        style={{
          fill: color,
          fillOpacity: 1,
          stroke: color,
          strokeWidth: 0.264583,
          strokeOpacity: 1,
        }}
        d="M188.401 134.6c-.477-.063-1.784-8.318.067-12.574 2.338-5.377 8.161-6.742 10.822-7.452 2.662-.71 5.057-2.395 5.057-2.395s2.129 7.54.532 11.798c-3.16 7.744-9.205 7.866-13.645 11.214-.648.5-.592-3.482 1.026-7.418 1.493-3.632 4.221-6.762 3.926-6.546-7.756 5.677-7.307 13.437-7.785 13.373z"
        transform="translate(-159.982 -111.963)"
      />
      <path
        style={{
          fill: color,
          fillOpacity: 1,
          stroke: color,
          strokeWidth: 0.330775,
          strokeOpacity: 1,
        }}
        d="M186.114 139.736c.561-.217-.27-10.632-3.768-15.262-4.418-5.85-11.895-5.801-15.337-5.883-3.442-.083-6.847-1.429-6.847-1.429s-.377 9.788 2.812 14.495c6.11 8.485 13.493 6.861 19.87 9.628.934.417-.301-4.405-3.422-8.715-2.88-3.976-7.112-6.98-6.69-6.804 11.09 4.626 12.82 14.188 13.382 13.97z"
        transform="translate(-159.982 -111.963)"
      />
    </svg>
  )
}

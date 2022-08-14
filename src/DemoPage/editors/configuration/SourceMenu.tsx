import { css, cx } from '@emotion/css'
import React from 'react'
import { FC } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import { colors } from '../../../colors'
import { SourceLanguage } from '../../../types'
import { useColorMode } from '../../../useColorMode'
import { tryTransformSource } from '../../model/tryTransformSource'
import { useGeneratorContext } from '../../model/useGenerator'

const containerStyle = css`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1000;
`

const darkContainerStyle = css`
  .menu {
    background-color: ${colors.dark.input};
    border-color: ${colors.dark.input};
    &:hover,
    &:focus {
      background-color: ${colors.dark.input};
      border-color: ${colors.dark.input};
    }

    .item {
      .text {
        color: ${colors.dark.text};
      }
      .icon {
        color: ${colors.dark.text};
      }
      &:hover {
        background-color: ${colors.dark.inputHightlight} !important;
        .text {
          color: ${colors.dark.text};
        }
      }
      &.dropdown {
        .menu {
          background-color: ${colors.dark.inputHightlight} !important;
          border: 1px solid ${colors.dark.inputHightlight} !important;
          .item,
          .item.active {
            color: ${colors.dark.text} !important;
            &:hover {
              background-color: ${colors.dark.itemHighlight} !important;
              color: ${colors.dark.text} !important;
            }
          }
          .item:hover,
          .item:focus,
          .item:active {
          }
        }
      }
    }
  }
`

export const SourceMenu: FC = () => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  const { configuration, isRemoteSampleLoading, setConfiguration } = useGeneratorContext()
  const { reader, active } = configuration

  const onInlineInputLanguageChange = (language: Exclude<SourceLanguage, 'mixed'>) => {
    if (reader.readerType !== 'inline') {
      return
    }
    if (language !== reader.inlineLanguage) {
      setConfiguration({
        ...configuration,
        reader: {
          ...reader,
          readerType: 'inline',
          inlineContent: tryTransformSource(reader.inlineLanguage, language, reader.inlineContent),
          inlineLanguage: language,
        },
      })
    }
  }

  if (active !== 'reader') {
    return null
  }

  return (
    <div className={cx(containerStyle, isDark ? darkContainerStyle : undefined)}>
      <Menu>
        {reader.readerType === 'inline' && (
          <Dropdown item text={reader.inlineLanguage === 'json' ? 'JSON' : 'YAML'}>
            <Dropdown.Menu>
              <Dropdown.Item
                disabled={isRemoteSampleLoading}
                value="json"
                active={reader.inlineLanguage === 'json'}
                onClick={() => onInlineInputLanguageChange('json')}
              >
                JSON
              </Dropdown.Item>
              <Dropdown.Item
                disabled={isRemoteSampleLoading}
                value="yaml"
                active={reader.inlineLanguage === 'yaml'}
                onClick={() => onInlineInputLanguageChange('yaml')}
              >
                YAML
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        <Dropdown item text={reader.readerType === 'inline' ? 'Inline' : 'Remote'}>
          <Dropdown.Menu>
            <Dropdown.Item
              active={reader.readerType === 'inline'}
              onClick={() =>
                setConfiguration({
                  ...configuration,
                  reader: { ...reader, readerType: 'inline' },
                  active: 'reader',
                })
              }
            >
              Inline
            </Dropdown.Item>
            <Dropdown.Item
              active={reader.readerType === 'remote'}
              onClick={() =>
                setConfiguration({
                  ...configuration,
                  reader: { ...reader, readerType: 'remote' },
                  active: 'reader',
                })
              }
            >
              Remote
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </div>
  )
}

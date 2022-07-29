import { css } from '@emotion/react'
import { colors } from './colors'

export const darkThemeFixes = css`
  .ui.inverted,
  .ui.inverted.form {
    &.loading.segment:before {
      background-color: rgba(70, 70, 70, 0.9) !important;
      z-index: 10000;
      border-radius: 0px !important;
    }

    h1,
    h2,
    h3 {
      color: #fff;
    }
    .checkbox,
    .checkbox:focus,
    .checkbox:active,
    .checkbox:hover,
    .checkbox:checked {
      label,
      label:hover {
        &::before,
        &::before {
          background-color: ${colors.dark.input};
          border-color: ${colors.dark.input};
          color: ${colors.dark.text};
          outline: none;
          &:hover {
            border-color: ${colors.dark.inputHightlight};
            outline: none;
          }
        }
      }
    }

    .dropdown {
      color: #fff;
      background-color: ${colors.dark.input};
      outline: none;

      &:focus,
      &:active,
      &:hover {
        border: 1px solid ${colors.dark.inputHightlight} !important;
        background-color: ${colors.dark.inputHightlight} !important;
        .menu {
          background-color: ${colors.dark.inputHightlight};
        }
        .icon {
          background-color: transparent;
          margin: 1px;
          padding: 1px;
        }
      }

      .text {
        color: #fff !important;
      }
      .menu {
        outline: none;
        background-color: ${colors.dark.input};
        border: 1px solid transparent !important;
        border-right: none !important;
        .item {
          border: 1px solid transparent !important;
          &:focus,
          &:hover {
            background-color: ${colors.dark.itemHighlight};
          }
        }
      }
      .icon {
        background-color: transparent;
        margin: 1px;
        padding: 1px;
      }
    }

    .input {
      input {
        color: #fff;
        border: 1px solid ${colors.dark.input};
        background-color: ${colors.dark.input};

        &:focus,
        &:active,
        &:hover {
          color: #fff;
          border: 1px solid ${colors.dark.inputHightlight};
          background-color: ${colors.dark.inputHightlight};
        }
      }
      .icon {
        &::before {
          color: #fff;
        }
      }
    }

    &.segment {
      border: none;
      // Really ugly hack, not sure how to overwrite otherwise
      border-left: none !important;
    }

    .button {
      background-color: ${colors.dark.button};
      color: ${colors.dark.text};
      &:hover {
        background-color: ${colors.dark.buttonHighlight};
        color: ${colors.dark.text};
      }
    }
  }
`

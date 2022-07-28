import { css } from '@emotion/react'

export const INPUT_COLOR = '#272829'
export const HIGHLIGHT_INPUT_COLOR = '#3a3b3d'

export const darkThemeFixes = css`
  .ui.inverted,
  .ui.inverted.form {
    &.loading.segment:before {
      background-color: rgba(70, 70, 70, 0.9) !important;
      z-index: 10000;
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
      label {
        &::before,
        &::before {
          background-color: ${INPUT_COLOR};
          outline: none !important;
          &:hover {
            background-color: ${HIGHLIGHT_INPUT_COLOR};
            outline: none !important;
          }
        }
      }
    }

    .dropdown {
      color: #fff;
      background-color: ${INPUT_COLOR};
      outline: none;

      &:focus,
      &:active,
      &:hover {
        border: 1px solid ${HIGHLIGHT_INPUT_COLOR} !important;
        background-color: ${HIGHLIGHT_INPUT_COLOR} !important;
        .menu {
          background-color: ${HIGHLIGHT_INPUT_COLOR};
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
        background-color: ${INPUT_COLOR};
        border: 1px solid transparent !important;
        border-right: none !important;
        .item {
          border: 1px solid transparent !important;
          &:focus,
          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
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
        border: 1px solid ${INPUT_COLOR};
        background-color: ${INPUT_COLOR};

        &:focus,
        &:active,
        &:hover {
          color: #fff;
          border: 1px solid ${HIGHLIGHT_INPUT_COLOR};
          background-color: ${HIGHLIGHT_INPUT_COLOR};
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
  }
`

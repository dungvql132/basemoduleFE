import { AnyAction } from '@reduxjs/toolkit'

export const THEME_DARK = 'THEME_DARK'
export const THEME_LIGHT = 'THEME_LIGHT'

export interface IThemePayload {
  token: {
    colorPrimary: string
  }
}

export interface ISetThemeAction extends AnyAction {
  type: string
  payload?: {
    token: {
      colorPrimary: string
    }
  }
}

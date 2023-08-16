import * as theme from '@src/theme'
import { ISetThemeAction, THEME_DARK, THEME_LIGHT } from './themeTypes'

export function setThemeDark(): ISetThemeAction {
  return {
    type: THEME_DARK,
    payload: theme.themeDark.value
  }
}
export function setThemeLight(): ISetThemeAction {
  return {
    type: THEME_LIGHT,
    payload: theme.themeLight.value
  }
}

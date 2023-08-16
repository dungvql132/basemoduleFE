import * as theme from '@src/theme'
import { THEME_DARK, THEME_LIGHT } from './themeTypes'
import { ISetThemeAction } from './themeTypes'

const initialState = {
  ...theme.themeDark.value
}

const themeReducer = (state = initialState, action: ISetThemeAction) => {
  switch (action.type) {
    case THEME_DARK:
      return {
        ...state,
        ...action.payload
      }
    case THEME_LIGHT:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default themeReducer

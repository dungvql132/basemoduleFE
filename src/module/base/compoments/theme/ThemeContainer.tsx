import { RootState } from '@src/redux/store'
import { ConfigProvider } from 'antd'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'

const mapState = (state: RootState) => ({
  theme: state.theme
})

const connector = connect(mapState)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  children: React.ReactNode
}

const ThemeContainer = (props: Props) => <ConfigProvider theme={props.theme}>{props.children}</ConfigProvider>

export default connector(ThemeContainer)

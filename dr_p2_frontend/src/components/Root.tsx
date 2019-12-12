import React from 'react'
import { Provider } from "react-redux"
import { Store } from 'redux'

import { I18nextProvider } from "react-i18next"

import i18n from "../i18n"

import App from './App'

const Root: React.FC<{store: Store}> = (props) => {
    const { store } = props

    return (
        <I18nextProvider i18n={i18n}>
            <Provider store={store}>
                <App />
            </Provider>
        </I18nextProvider>
    )
}

export default Root

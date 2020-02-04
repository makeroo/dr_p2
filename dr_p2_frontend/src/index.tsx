import React from 'react'
import ReactDOM from 'react-dom'

import createSagaMiddleware from 'redux-saga'

import * as serviceWorker from './serviceWorker'
import configureServices from './services'
import { Store } from "redux";
import { configureSaga } from './saga';

const loadRoot = async () => {
    const module = await import('./components/Root')
    return module.default
}

const render = async (store: Store) => {
    const target = document.getElementById('root')
    const Root = await loadRoot()

    ReactDOM.render(<Root store={store}/>, target)
};
  
(async function init() {
    Promise.all([
        (async () => {
            const services = await configureServices()

            return services
        })(),
        import("./store/index")
    ]).then(([services, storeModule]) => {
        const sagaMiddleware = createSagaMiddleware()
        const store = storeModule.buildStore(sagaMiddleware)

        return Promise.all([
            (async () => {
                await configureSaga(sagaMiddleware, services)
            })(),
            store
        ])
    }).then(([_, store]) => {
        render(store)
    }).catch((error) => {
        // TODO
        console.error(error)
    })
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

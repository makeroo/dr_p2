import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import configureServices from './services';
import configureActions from './modules';
import { Store } from "redux";
import { registerActions } from './context';

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
            const services = await configureServices();
            const actions = await configureActions(services); 
 
            return actions
        })(),
        import("./store/index")
    ]).then(([actions, store]) => {
        registerActions(actions)

        render(store.store);
    }).catch((error) => {
        // TODO
        console.error(error)
    })
})();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

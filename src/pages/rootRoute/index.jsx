import React from 'react';
import { Router, Route, } from 'react-router-dom';
import { Provider } from 'mobx-react';

import store from 'stores/index';
import history from 'utils/history'
import home from 'pages/home/index'

class rootRoute extends React.Component {
    constructor(props) {
        super(props)
    };

    render() {
        return (
            <div>
                <Provider {...store}>
                    <Router history={history}>
                        <div>
                            <Route path="/" component={home} />
                        </div>
                    </Router>
                </Provider>
            </div>
        )
    }
}

export default rootRoute
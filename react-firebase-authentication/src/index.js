import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from './components/App';
import Firebase, { FirebaseContext } from './components/Firebase';
ReactDOM.render(
<FirebaseContext.Provider value={new Firebase()}>
<App />
</FirebaseContext.Provider>,
document.getElementById('root'),
);
serviceWorker.unregister();
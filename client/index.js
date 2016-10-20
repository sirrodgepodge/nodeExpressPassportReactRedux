import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { DevTools} from './redux/DevTools';

// React's library for handling direct DOM interaction (vs. Virual DOM interaction),
// render alows us to place our React app into the DOM
import { render } from 'react-dom';

// Base of react app
import App from './App';

// styling
import './index.css';

// If we ever wanted to do server-side rendering, the intial state would get passed to the front end by passing
// the server-side store to the "__INITIAL_STATE__" client-side global variable via a script tag and "hydrating"
// our client-side state with it here
// const store = configureStore(window.__INITIAL_STATE__ || { user: null, posts: []});
const store = configureStore();


// Include DevTools if not in production
if (process.env.NODE_ENV === 'production') {
  render((
    <Provider store={store}>
      <App />
    </Provider>
  ), document.getElementById('root'));
} else {
  render((
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>
  ), document.getElementById('root'));
}

import React from 'react';
import ReactDom from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import LinkGoogle from './components/LinkGoogle.jsx';
import CreateEvent from './components/createEvent.jsx';
import LayoutComponent from './components/LayoutComponent.jsx';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
injectTapEventPlugin();
ReactDom.render(
	<MuiThemeProvider>
		<Router history={hashHistory}>
			<Route path='/' component={LinkGoogle}/>
			<Route path='/dashh' component={LayoutComponent}/>
			<Route path='/dash/:summary/:location' component={CreateEvent}/>
		</Router>
	</MuiThemeProvider>,
	document.getElementById("content")
);

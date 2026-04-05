import { createRoot } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import App from './App';
import './styles/app.scss';

const { nonce } = window.jwpStkDashboard || {};

if ( nonce ) {
	apiFetch.use( apiFetch.createNonceMiddleware( nonce ) );
}

const container = document.getElementById( 'jwp-stk-dashboard-app' );
if ( container ) {
	createRoot( container ).render( <App /> );
}

import { createRoot } from '@wordpress/element';
import App from './App';
import './style.css';

const container = document.getElementById( 'jwp-stk-dashboard-app' );
if ( container ) {
	const root = createRoot( container );
	root.render( <App /> );
}

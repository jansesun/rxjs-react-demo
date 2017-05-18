import { jsdom } from 'jsdom';
global.document = jsdom('<!document html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;
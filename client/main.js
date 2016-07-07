import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/routes.js';


render(renderRoutes(), document.getElementById('render-root'));

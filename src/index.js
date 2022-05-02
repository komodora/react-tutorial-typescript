import { createRoot } from 'react-dom/client';

import Game from './Tutorial/App';

// ========================================

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Game />); // eslint-disable-line

import { createRoot } from 'react-dom/client';

import Tutorial from './Tutorial/App';

// ========================================

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Tutorial />);

import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { findPage } from './routes';
import './styles/site.css';

const root = document.getElementById('root');
if (!root) throw new Error('Missing #root element in index.html');

const page = findPage(window.location.pathname);
const app = (
  <StrictMode>
    <App page={page} />
  </StrictMode>
);

// Production builds ship each page pre-rendered, so React attaches to that HTML (hydrate).
// The dev server and `npm run watch` ship an empty #root, so React renders from scratch.
if (root.dataset.page === page.path && root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  document.title = page.title;
  createRoot(root).render(app);
}

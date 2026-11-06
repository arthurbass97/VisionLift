// Used only at build time: renders each page to HTML so search engines and
// link previews get the full content without running JavaScript.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { notFound, pages, type Page } from './routes';

export const allPages: Page[] = [...pages, notFound];

export function render(page: Page): string {
  return renderToString(
    <StrictMode>
      <App page={page} />
    </StrictMode>
  );
}

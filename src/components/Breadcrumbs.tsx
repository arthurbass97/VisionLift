import { siteUrl } from '../content';
import JsonLd from './JsonLd';

export interface Crumb {
  label: string;
  /** Page path, e.g. "/services". */
  path: string;
}

/**
 * Visible breadcrumb trail (Home › Services) plus matching BreadcrumbList
 * structured data, so search engines can show the trail in results.
 * The last crumb is the current page.
 */
export default function Breadcrumbs({ trail, structuredData = true }: { trail: Crumb[]; structuredData?: boolean }) {
  const crumbs: Crumb[] = [{ label: 'Home', path: '/' }, ...trail];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: siteUrl + c.path,
    })),
  };

  return (
    <>
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((c, i) => {
            const isCurrent = i === crumbs.length - 1;
            return (
              <li key={c.path}>
                {isCurrent
                  ? <span aria-current="page">{c.label}</span>
                  : <a href={c.path}>{c.label}</a>}
              </li>
            );
          })}
        </ol>
      </nav>
      {structuredData && <JsonLd data={jsonLd} />}
    </>
  );
}

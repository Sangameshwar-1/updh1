import type { ExternalLink } from '../data/types';

export function ExternalLinksSection({
  links,
  title = 'Further Exploration & Archives',
  eyebrow = 'Curated Reference Material',
  description = 'Examine verified historical encyclopedias, government archives, and institutional collections to explore this subject in greater depth.',
}: {
  links: ExternalLink[];
  title?: string;
  eyebrow?: string;
  description?: string;
}) {
  if (!links || links.length === 0) return null;

  return (
    <section className="external-links-section" data-reveal>
      <div className="external-links-head">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="external-links-lead">{description}</p>
      </div>

      <div className="external-links-grid">
        {links.map((link, idx) => {
          let host = '';
          try {
            host = new URL(link.url).hostname.replace('www.', '');
          } catch {
            host = link.url;
          }

          return (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link-card"
            >
              <div className="external-link-top">
                <span className="source-tag">{link.source}</span>
                <span className="external-icon" aria-hidden="true">
                  ↗
                </span>
              </div>
              <h3 className="external-link-title">{link.title}</h3>
              {link.description && (
                <p className="external-link-desc">{link.description}</p>
              )}
              <span className="external-link-url">{host}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

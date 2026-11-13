import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { CloudinaryImage } from '../components/CloudinaryImage';
import {
  zones,
  HOME_FOLDER,
  EXHIBITION_TITLE,
  EXHIBITION_SUBTITLE,
} from '../data/zones';

export default function Home() {
  return (
    <article>
      <section className="hero">
        <div className="hero-media">
          {/* The one image above the fold, so the only one marked priority. */}
          <CloudinaryImage
            publicId={`${HOME_FOLDER}/hero`}
            alt="The exhibition entrance panel, From Stone to Smartphone"
            aspect="16:9"
            crop="fill"
            priority
            sizes="100vw"
          />
        </div>

        <div className="hero-inner">
          <p className="eyebrow">A pop-up museum · Team ChronoScribes</p>
          <h1>{EXHIBITION_TITLE}</h1>
          <p className="hero-sub">{EXHIBITION_SUBTITLE}</p>
          <p className="hero-body">
            Every message you have ever received travelled to you by some route. At
            each stop, ask four questions: how fast did it travel? How many people did
            it reach? Who could use it? Could you trust it?
          </p>
          <a href="#zones" className="btn">
            Enter the exhibition
          </a>
        </div>
      </section>

      <div className="wrap">
        <div className="zones" id="zones">
          {zones.map((zone, i) => (
            <section
              key={zone.id}
              className="zone-preview"
              style={{ '--zone': `var(--${zone.id})` } as CSSProperties}
            >
              <div className="zone-head">
                <span className="zone-num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h2>{zone.title}</h2>
                  <p className="lead">{zone.blurb}</p>
                </div>
              </div>

              <ul className="tile-grid">
                {zone.areas.map((a) => (
                  <li key={a.route}>
                    <Link to={a.route} className="tile">
                      <div className="tile-media">
                        <CloudinaryImage
                          publicId={`${a.folder}/tile`}
                          alt={a.title}
                          aspect="3:2"
                          crop="fill"
                          sizes="(max-width: 560px) 100vw, (max-width: 1100px) 50vw, 25vw"
                        />
                      </div>
                      <span className="tile-title">{a.title}</span>
                      <span className="tile-blurb">{a.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}

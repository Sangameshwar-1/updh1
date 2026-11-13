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
    <article className="home">
      <section className="hero">
        {/* The one image above the fold, so the only one marked priority. */}
        <CloudinaryImage
          publicId={`${HOME_FOLDER}/hero`}
          alt="The exhibition entrance panel, From Stone to Smartphone"
          aspect="16:9"
          crop="fill"
          priority
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-text">
          <h1>{EXHIBITION_TITLE}</h1>
          <p className="lead">{EXHIBITION_SUBTITLE}</p>
          <p className="lead">
            Every message you have ever received travelled to you by some route. This
            exhibition follows those routes across India. At each stop, ask four
            questions: how fast did the message travel? How many people did it reach?
            Who could use it? Could you trust it?
          </p>
        </div>
      </section>

      {zones.map((zone) => (
        <section key={zone.id} className="zone-preview">
          <h2>{zone.title}</h2>
          <p className="lead">{zone.blurb}</p>
          <ul className="tile-grid">
            {zone.areas.map((a) => (
              <li key={a.route}>
                <Link to={a.route} className="tile">
                  <CloudinaryImage
                    publicId={`${a.folder}/tile`}
                    alt={a.title}
                    aspect="3:2"
                    crop="fill"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <span className="tile-title">{a.title}</span>
                  <span className="tile-blurb">{a.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}

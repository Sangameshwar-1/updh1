import { Link } from 'react-router-dom';
import { CloudinaryImage } from '../components/CloudinaryImage';
import { exhibitsFor } from '../data/exhibits';

export default function About() {
  const team = exhibitsFor('about');

  return (
    <div className="wrap">
      <article className="about">
        <header className="area-header" data-reveal>
          <Link to="/" className="back-link">
            ← All zones
          </Link>
          <p className="eyebrow">UPDH Course Project</p>
          <h1>Team ChronoScribes</h1>
          <p className="lead">
            Our team chose what to show here, and we could not show everything. Many
            regional languages, oral traditions and local communication practices are
            not on these walls. Tell us what we missed.
          </p>
        </header>

        {team.length === 0 ? (
          <p className="empty">Team profiles have not been published yet.</p>
        ) : (
          <ul className="team-grid">
            {team.map((person) => (
              <li key={person.id}>
                <CloudinaryImage
                  publicId={person.publicId}
                  alt={person.alt}
                  aspect="1:1"
                  crop="face"
                  sizes="(max-width: 560px) 50vw, 170px"
                />
                <strong>{person.title}</strong>
                <span>{person.caption}</span>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}

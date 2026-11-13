import { CloudinaryImage } from '../components/CloudinaryImage';
import { exhibitsFor } from '../data/exhibits';

export default function About() {
  const team = exhibitsFor('about');

  return (
    <article className="about">
      <header className="area-header">
        <h1>About</h1>
        <p className="lead">The team behind the museum.</p>
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
                sizes="(max-width: 768px) 50vw, 20vw"
              />
              <strong>{person.title}</strong>
              <span>{person.caption}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

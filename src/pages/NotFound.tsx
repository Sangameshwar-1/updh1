import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="wrap">
      <article className="not-found">
        <p className="eyebrow">404</p>
        <h1>That exhibit is not here</h1>
        <p className="lead">
          The page you asked for does not exist. This is the application's own 404,
          which means routing is working.
        </p>
        <Link to="/" className="btn">
          Return to the entrance
        </Link>
      </article>
    </div>
  );
}

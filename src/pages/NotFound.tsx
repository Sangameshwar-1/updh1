import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <article className="not-found">
      <h1>That exhibit is not here</h1>
      <p className="lead">
        The page you asked for does not exist. This is the application's own 404, which
        means routing is working.
      </p>
      <Link to="/">Return to the entrance</Link>
    </article>
  );
}

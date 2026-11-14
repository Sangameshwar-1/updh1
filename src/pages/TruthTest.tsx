import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloudinaryImage } from '../components/CloudinaryImage';
import {
  ASSESSMENTS,
  LEARNING_OUTCOME,
  SKILLS,
  isCorrect,
  questions,
  type Assessment,
  type Question,
  type Skill,
} from '../data/truthTest';
import '../styles/truth-test.css';

type Phase = 'intro' | 'playing' | 'done';

/** Only ever one answer per question, so a map from id is enough. */
type Answers = Record<string, Assessment>;

export default function TruthTest() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [index, setIndex] = useState(0);
  const [choice, setChoice] = useState<Assessment | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Answers>({});
  const revealRef = useRef<HTMLDivElement | null>(null);

  const q = questions[index];
  const total = questions.length;

  // Bring the verdict into view once it appears, so the reveal is not missed
  // below the fold on a phone.
  useEffect(() => {
    if (!submitted) return;
    revealRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [submitted]);

  function begin() {
    setPhase('playing');
    setIndex(0);
    setChoice(null);
    setSubmitted(false);
    setAnswers({});
  }

  function submit() {
    if (!choice || submitted) return;
    setAnswers((a) => ({ ...a, [q.id]: choice }));
    setSubmitted(true);
  }

  function next() {
    if (index + 1 >= total) {
      setPhase('done');
      return;
    }
    setIndex((i) => i + 1);
    setChoice(null);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 1–4 picks an answer, Enter submits it, then Enter moves on.
  useEffect(() => {
    if (phase !== 'playing') return;
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|A|BUTTON)$/.test(target.tagName) && e.key === 'Enter') return;
      const n = Number(e.key);
      if (n >= 1 && n <= ASSESSMENTS.length && !submitted) {
        setChoice(ASSESSMENTS[n - 1].key);
        return;
      }
      if (e.key === 'Enter') {
        if (submitted) next();
        else submit();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (phase === 'intro') return <Intro onBegin={begin} />;
  if (phase === 'done') return <Result answers={answers} onRestart={begin} />;

  const verdict = submitted && choice ? isCorrect(q, choice) : null;

  return (
    <div className="wrap tt">
      <Crumb />

      <div className="tt-progress" aria-label={`Post ${index + 1} of ${total}`}>
        <div className="tt-progress-head">
          <span className="eyebrow">
            Post {index + 1} of {total}
          </span>
          <span className="tt-progress-skill">{SKILLS[q.skill].label}</span>
        </div>
        <ol className="tt-pips">
          {questions.map((item, i) => {
            const given = answers[item.id];
            const state = given
              ? isCorrect(item, given)
                ? 'right'
                : 'wrong'
              : i === index
                ? 'now'
                : 'todo';
            return <li key={item.id} className={`tt-pip tt-pip--${state}`} />;
          })}
        </ol>
      </div>

      <PostCard q={q} />

      <section className="tt-ask" aria-live="polite">
        <h2 className="tt-question">{q.question}</h2>
        <p className="tt-claim">
          <span>The claim</span> {q.claim}
        </p>

        <div className="tt-options" role="radiogroup" aria-label="Your assessment">
          {ASSESSMENTS.map((a, i) => {
            const picked = choice === a.key;
            const classes = ['tt-option'];
            if (picked) classes.push('is-picked');
            if (submitted) {
              if (a.key === q.correct || q.alsoAccepted?.includes(a.key)) classes.push('is-answer');
              else if (picked) classes.push('is-wrong');
            }
            return (
              <button
                key={a.key}
                type="button"
                role="radio"
                aria-checked={picked}
                disabled={submitted}
                className={classes.join(' ')}
                onClick={() => setChoice(a.key)}
              >
                <span className="tt-option-key">{i + 1}</span>
                <span>
                  <strong>{a.label}</strong>
                  <em>{a.hint}</em>
                </span>
              </button>
            );
          })}
        </div>

        {!submitted && (
          <button type="button" className="btn tt-submit" disabled={!choice} onClick={submit}>
            {choice ? 'Submit assessment' : 'Choose one answer'}
          </button>
        )}
      </section>

      {submitted && (
        <div ref={revealRef} className="tt-after">
          <Reveal q={q} correct={verdict === true} given={choice} />
          <button type="button" className="btn tt-next" onClick={next}>
            {index + 1 >= total ? 'See your result' : 'Next post →'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- The post ---------- */

function PostCard({ q }: { q: Question }) {
  const demo = q.provenance === 'demonstration';

  return (
    <article className={`tt-post tt-post--${q.platform}`} key={q.id}>
      <div className="tt-chrome">
        <span className="tt-platform">{q.platformLabel}</span>
        <span className={`tt-badge ${demo ? 'tt-badge--demo' : 'tt-badge--real'}`}>
          {demo ? 'Exhibition demonstration' : 'Documented case'}
        </span>
      </div>

      <header className="tt-meta">
        <span className="tt-avatar" aria-hidden="true" />
        <span>
          <strong>{q.account ?? 'No identifiable account'}</strong>
          <small>{q.postDate}</small>
        </span>
      </header>

      {q.screenshotPublicId && (
        <div className="tt-media">
          <CloudinaryImage
            publicId={q.screenshotPublicId}
            alt={q.claim}
            aspect="4:3"
            sizes="(max-width: 900px) 100vw, 700px"
          />
        </div>
      )}

      <p className="tt-text">{q.postText}</p>

      <footer className="tt-post-foot">
        {q.postTextProvenance === 'quoted' && <span>Wording reproduced from the fact-check.</span>}
        {q.postTextProvenance === 'representative' && (
          <span>Wording representative of how this circulated, not a single original post.</span>
        )}
        {q.postTextProvenance === 'written' && (
          <span>Written for this exhibition. Not a real post.</span>
        )}
        {q.engagement && <span>{q.engagement}</span>}
        {q.accountNote && <span>{q.accountNote}</span>}
        {q.imageAttribution && <span>{q.imageAttribution}</span>}
      </footer>
    </article>
  );
}

/* ---------- The verdict ---------- */

function Reveal({
  q,
  correct,
  given,
}: {
  q: Question;
  correct: boolean;
  given: Assessment | null;
}) {
  const label = ASSESSMENTS.find((a) => a.key === q.correct)?.label ?? q.correct;
  const yours = ASSESSMENTS.find((a) => a.key === given)?.label;

  return (
    <section className={`tt-reveal ${correct ? 'is-right' : 'is-wrong'}`}>
      <header className="tt-reveal-head">
        <span className="tt-reveal-mark" aria-hidden="true">
          {correct ? '✓' : '✕'}
        </span>
        <div>
          <p className="eyebrow">{correct ? 'You read it correctly' : 'Not this time'}</p>
          <h3>
            Correct assessment: {label}
            {q.alsoAccepted?.length ? <em> — “{ASSESSMENTS.find((a) => a.key === q.alsoAccepted![0])?.label}” also accepted</em> : null}
          </h3>
          {!correct && yours && <p className="tt-yours">You answered {yours}.</p>}
        </div>
      </header>

      <p className="tt-explain">{q.explanation}</p>

      <div className="tt-panels">
        <div className="tt-panel">
          <h4>Original context</h4>
          <p>{q.originalContext}</p>
        </div>
        <div className="tt-panel">
          <h4>Evidence</h4>
          <ul>
            {q.evidence.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="tt-sources">
        <h4>Where to check this yourself</h4>
        <ul>
          {q.factCheckUrl && (
            <li>
              <a href={q.factCheckUrl} target="_blank" rel="noopener noreferrer">
                {q.factCheckSource ?? 'Fact-check investigation'}
              </a>
            </li>
          )}
          {!q.factCheckUrl && q.factCheckSource && <li>{q.factCheckSource}</li>}
          {q.moreLinks.map((l) => (
            <li key={l.url}>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            </li>
          ))}
          {q.originalPostUrl && (
            <li>
              <a href={q.originalPostUrl} target="_blank" rel="noopener noreferrer">
                The original post
              </a>
            </li>
          )}
        </ul>
        {!q.factCheckUrl && !q.moreLinks.length && (
          <p className="tt-note">
            No fact-check applies: this item is a demonstration of a technique rather than a
            documented case.
          </p>
        )}
        {q.verificationNote && <p className="tt-note">{q.verificationNote}</p>}
      </div>

      <p className="tt-skill">
        <strong>{SKILLS[q.skill].label}.</strong> {SKILLS[q.skill].prompt}
      </p>
    </section>
  );
}

/* ---------- Opening and closing screens ---------- */

function Crumb() {
  return (
    <Link to="/zone-4/activities" className="back-link tt-back">
      ← Interactive Activities
    </Link>
  );
}

function Intro({ onBegin }: { onBegin: () => void }) {
  const counts = useMemo(() => {
    const documented = questions.filter((q) => q.provenance === 'documented').length;
    return { documented, demo: questions.length - documented };
  }, []);

  return (
    <div className="wrap tt tt-intro">
      <Crumb />
      <header className="area-header tt-rise">
        <p className="eyebrow">Interactive Activity · Zone 4</p>
        <h1>The Truth Test</h1>
        <p className="lead">
          Can you trust this post? {questions.length} items from a feed — forwards, photographs,
          headlines, a government notice. Decide what each one is before you are told.
        </p>
      </header>

      <div className="tt-intro-grid">
        <section className="tt-card tt-rise" style={{ '--i': 1 } as React.CSSProperties}>
          <h3>How it works</h3>
          <p>
            One post at a time. Choose <strong>True</strong>, <strong>False</strong>,{' '}
            <strong>Misleading</strong> or <strong>Needs verification</strong>, then submit. The
            answer, the evidence and the original context appear only after you commit.
          </p>
          <p className="tt-note">Keyboard: press 1–4 to choose, Enter to submit and to continue.</p>
        </section>

        <section className="tt-card tt-rise" style={{ '--i': 2 } as React.CSSProperties}>
          <h3>What you are looking at</h3>
          <p>
            {counts.documented} of these are <strong>documented cases</strong>, investigated and
            published by fact-checking organisations including BOOM, PIB Fact Check, Snopes, Factly
            and The Wire. Dates, verdicts and links are theirs, not ours.
          </p>
          <p>
            The other {counts.demo} are <strong>exhibition demonstrations</strong> written by Team
            ChronoScribes to show one technique. They are badged as such, and carry no account name,
            no engagement count and no URL — inventing those is the thing this activity warns
            against.
          </p>
        </section>

        <section className="tt-card tt-rise" style={{ '--i': 3 } as React.CSSProperties}>
          <h3>Not every post is false</h3>
          <p>
            Some are true. One is a message that sounds too good to be true and is real. One is an
            official notice that the government&rsquo;s own fact-checker wrongly called fake.
            Suspicion is not the same as checking.
          </p>
        </section>
      </div>

      <button type="button" className="btn tt-begin" onClick={onBegin}>
        Begin the challenge
      </button>
    </div>
  );
}

function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const attempted = questions.filter((q) => answers[q.id]);
  const right = attempted.filter((q) => isCorrect(q, answers[q.id]));
  const accuracy = attempted.length ? Math.round((right.length / attempted.length) * 100) : 0;

  // Group every miss by the habit it was testing, so the advice is specific.
  const missedBySkill = useMemo(() => {
    const m = new Map<Skill, number>();
    for (const q of attempted) {
      if (isCorrect(q, answers[q.id])) continue;
      m.set(q.skill, (m.get(q.skill) ?? 0) + 1);
    }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [answers, attempted]);

  return (
    <div className="wrap tt tt-result">
      <Crumb />
      <header className="area-header tt-rise">
        <p className="eyebrow">The Truth Test</p>
        <h1>Your result</h1>
      </header>

      <div className="tt-score tt-rise">
        <div className="tt-score-big">
          <strong>{accuracy}%</strong>
          <span>accuracy</span>
        </div>
        <dl className="tt-score-rows">
          <div>
            <dt>Posts attempted</dt>
            <dd>
              {attempted.length} of {questions.length}
            </dd>
          </div>
          <div>
            <dt>Correct assessments</dt>
            <dd>{right.length}</dd>
          </div>
          <div>
            <dt>Missed</dt>
            <dd>{attempted.length - right.length}</dd>
          </div>
        </dl>
      </div>

      <section className="tt-card tt-rise" style={{ '--i': 1 } as React.CSSProperties}>
        <h3>What this score is not</h3>
        <p>
          It is a score on ten items you were told to be suspicious of, in a room built to make you
          suspicious. Real misinformation arrives when you are not expecting it, from someone you
          trust, about something you already believe. No score here means you will catch that one.
          The habits below are what transfer; the number is not.
        </p>
      </section>

      <section className="tt-card tt-rise" style={{ '--i': 2 } as React.CSSProperties}>
        <h3>{missedBySkill.length ? 'Worth practising' : 'Keep doing this'}</h3>
        {missedBySkill.length ? (
          <ul className="tt-skill-list">
            {missedBySkill.map(([skill, n]) => (
              <li key={skill}>
                <strong>{SKILLS[skill].label}</strong>
                <span className="tt-skill-count">
                  {n} missed {n === 1 ? 'post' : 'posts'}
                </span>
                <p>{SKILLS[skill].prompt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="tt-skill-list">
            {Object.entries(SKILLS).map(([k, s]) => (
              <li key={k}>
                <strong>{s.label}</strong>
                <p>{s.prompt}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="tt-review tt-rise" style={{ '--i': 3 } as React.CSSProperties}>
        <h3>Every item, with its source</h3>
        <ol>
          {questions.map((q) => {
            const given = answers[q.id];
            const ok = given ? isCorrect(q, given) : null;
            return (
              <li key={q.id} className={ok === null ? '' : ok ? 'is-right' : 'is-wrong'}>
                <span className="tt-review-mark" aria-hidden="true">
                  {ok === null ? '–' : ok ? '✓' : '✕'}
                </span>
                <span>
                  <strong>{q.claim}</strong>
                  <em>
                    {ASSESSMENTS.find((a) => a.key === q.correct)?.label}
                    {q.provenance === 'demonstration' ? ' · exhibition demonstration' : ''}
                  </em>
                  {q.factCheckUrl && (
                    <a href={q.factCheckUrl} target="_blank" rel="noopener noreferrer">
                      {q.factCheckSource}
                    </a>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <blockquote className="tt-outcome tt-rise">
        {LEARNING_OUTCOME}
      </blockquote>

      <div className="tt-end-actions">
        <button type="button" className="btn" onClick={onRestart}>
          Restart the challenge
        </button>
        <Link to="/zone-4/activities" className="btn btn-quiet">
          Back to the activities
        </Link>
      </div>
    </div>
  );
}

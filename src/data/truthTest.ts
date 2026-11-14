/**
 * THE TRUTH TEST — question bank.
 *
 * Two kinds of item live here and they are labelled differently on screen:
 *
 *   provenance: 'documented'    A real case, investigated and published by a
 *                               named fact-checking organisation. Every field is
 *                               taken from that published work. Nothing about the
 *                               account, date, verdict or URL is invented. Where
 *                               a detail could not be confirmed it is null and
 *                               `verificationNote` says so.
 *
 *   provenance: 'demonstration' Written by Team ChronoScribes to teach one
 *                               specific habit. NOT a real post. It carries no
 *                               account name, no engagement count and no URL,
 *                               and the interface badges it as a demonstration.
 *
 * The exhibition's rule: we do not invent accounts, usernames, engagement
 * counts, post URLs or fact-check verdicts. If we cannot source it, it is null.
 */

export type Assessment = 'true' | 'false' | 'misleading' | 'needs-verification';

export type Platform =
  | 'whatsapp'
  | 'instagram'
  | 'x'
  | 'facebook'
  | 'newspaper'
  | 'government';

export type Skill = 'source' | 'date' | 'context' | 'evidence' | 'authority';

export type Link = { label: string; url: string };

export type Question = {
  id: string;
  provenance: 'documented' | 'demonstration';
  platform: Platform;
  /** The strip across the top of the post card. */
  platformLabel: string;
  /** When it was published, or when it circulated. Free text: forwards recur. */
  postDate: string;
  /** Account or publisher, only where a fact-check recorded one. */
  account: string | null;
  /** Why there is no account, or what the account is. */
  accountNote: string | null;
  postText: string;
  /**
   * 'quoted'         the wording is reproduced from the fact-check.
   * 'representative' the message circulated in many wordings; this is typical.
   * 'written'        ours, for a demonstration.
   */
  postTextProvenance: 'quoted' | 'representative' | 'written';
  /** Only where a fact-check recorded it. Never estimated. */
  engagement: string | null;
  originalPostUrl: string | null;
  screenshotPublicId: string | null;
  imageAttribution: string | null;
  /** What the post actually asserts, stated plainly. */
  claim: string;
  question: string;
  correct: Assessment;
  /** Where published fact-checks reasonably disagree on the label. */
  alsoAccepted?: Assessment[];
  explanation: string;
  /** What the material really was, or where it really came from. */
  originalContext: string;
  evidence: string[];
  factCheckSource: string | null;
  factCheckUrl: string | null;
  moreLinks: Link[];
  /** What this entry could not confirm. Shown to the visitor. */
  verificationNote: string | null;
  skill: Skill;
};

export const SKILLS: Record<Skill, { label: string; prompt: string }> = {
  source: {
    label: 'Checking the source',
    prompt:
      'Ask who is actually saying this. A forward has no author. An organisation named in a message has not said anything until you find it on their own site.',
  },
  date: {
    label: 'Checking the date',
    prompt:
      'Ask when this was made, not when it reached you. Most false forwards are real material with the wrong date attached.',
  },
  context: {
    label: 'Checking the context',
    prompt:
      'Ask where the photograph or video really came from. A reverse image search on a single frame answers this more often than not.',
  },
  evidence: {
    label: 'Checking the evidence',
    prompt:
      'Ask what the number counts, over what period, measured by whom. A figure without its definition cannot be judged, only repeated.',
  },
  authority: {
    label: 'Checking the authority',
    prompt:
      'Ask whether the body making the ruling is the body that would know. Official labels are strong evidence, not proof.',
  },
};

export const ASSESSMENTS: { key: Assessment; label: string; hint: string }[] = [
  { key: 'true', label: 'True', hint: 'Accurate, and supported by evidence.' },
  { key: 'false', label: 'False', hint: 'The claim is not true.' },
  {
    key: 'misleading',
    label: 'Misleading',
    hint: 'Real material, but it does not show what the post says it shows.',
  },
  {
    key: 'needs-verification',
    label: 'Needs verification',
    hint: 'Not enough here to judge either way. Go and check.',
  },
];

export const questions: Question[] = [
  {
    id: 'unesco-anthem',
    provenance: 'documented',
    platform: 'whatsapp',
    platformLabel: 'WhatsApp · Forwarded many times',
    postDate: 'Circulating since 2008; resurfaced in 2016, 2022 and 2024',
    account: null,
    accountNote:
      'A forward has no author. By the time it reaches you, everyone who sent it on is simply someone who also received it.',
    postText:
      'UNESCO has declared our "Jana Gana Mana" the BEST NATIONAL ANTHEM IN THE WORLD. Proud to be an Indian. Forward to every Indian you know.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution: null,
    claim: "UNESCO has declared Jana Gana Mana the world's best national anthem.",
    question: 'Do you trust this message?',
    correct: 'false',
    explanation:
      'UNESCO does not rank national anthems. It runs no competition, no award and no survey that could produce such a result, so there is no announcement to find. The message has been forwarded for more than fifteen years and nobody has ever been able to produce the source.',
    originalContext:
      'The claim began as an email chain in 2008 and returns every few years, often after a public figure repeats it. Versions of the same hoax have also claimed UNESCO named an Indian prime minister the best in the world and the ₹2,000 note the best currency.',
    evidence: [
      'Snopes traced the rumour to a 2008 email chain and found no UNESCO announcement of any kind.',
      'Fact Crescendo reports that UNESCO has itself clarified the message is only a rumour.',
      "Factly notes that UNESCO's own website lists the claim among items it has publicly debunked.",
      'No UNESCO programme exists that ranks or awards national anthems.',
    ],
    factCheckSource: 'Snopes',
    factCheckUrl: 'https://www.snopes.com/fact-check/unesco-india-national-anthem/',
    moreLinks: [
      {
        label: 'Factly — Jana Gana Mana was not declared the best anthem',
        url: 'https://factly.in/indias-jana-gana-mana-was-not-declared-as-the-worlds-best-anthem-by-unesco',
      },
      {
        label: 'The Quint — UNESCO did not recognise Jana Gana Mana',
        url: 'https://www.thequint.com/news/india/unesco-did-not-recognise-jana-gana-mana-as-worlds-best-anthem',
      },
    ],
    verificationNote:
      'The wording above is representative. This message circulates in dozens of slightly different versions, so no single text is the original.',
    skill: 'source',
  },

  {
    id: 'nasa-diwali',
    provenance: 'documented',
    platform: 'facebook',
    platformLabel: 'Facebook · Shared image',
    postDate: 'Shared every Diwali since around 2011',
    account: null,
    accountNote:
      'The image is re-uploaded by thousands of accounts each year, so there is no single original poster to check.',
    postText:
      "NASA's satellite photograph of India on Diwali night. Look at how the whole country lights up. Incredible! 🪔",
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution:
      'We do not reproduce the viral post. Follow the NASA Earth Observatory link below to see the genuine imagery.',
    claim: 'This satellite image shows India lit up on the night of Diwali.',
    question: 'Do you trust this image?',
    correct: 'misleading',
    alsoAccepted: ['false'],
    explanation:
      'The image is genuine satellite data. The caption is wrong about what it shows. It is a colour composite assembled in 2003 by NOAA scientist Chris Elvidge from the Operational Linescan System flown on US Defense Meteorological Satellite Program satellites, and it maps the spread of city lights over a decade. White marks lights visible before 1992; blue, green and red mark lights that appeared by 1992, 1998 and 2003. Not one pixel of it is Diwali.',
    originalContext:
      "NASA has said the extra light produced during Diwali is too subtle to appear in ordinary satellite imagery. NASA's Earth Observatory did publish a genuine image of South Asia at night around Diwali, acquired on 12 November 2012 by the VIIRS Day-Night Band on the Suomi NPP satellite.",
    evidence: [
      'The composite was built in 2003, from data collected between 1992 and 2003 — years before most of the posts that share it.',
      'Its colours encode dates, not brightness. A caption about one night cannot be true of an image whose colours mean different years.',
      'Snopes reports NASA saying festival light is not enough to be visible in normal satellite imagery.',
      'The real Diwali-period image exists, and looks nothing like the viral one.',
    ],
    factCheckSource: 'Snopes',
    factCheckUrl: 'https://www.snopes.com/fact-check/satellite-image-diwali/',
    moreLinks: [
      {
        label: 'NASA Earth Observatory — South Asian Night Lights',
        url: 'https://earthobservatory.nasa.gov/images/79682/south-asian-night-lights',
      },
      {
        label: 'Check Your Fact — not an image of India during Diwali',
        url: 'https://checkyourfact.com/2021/11/10/fact-check-not-image-india-during-diwali-space',
      },
    ],
    verificationNote:
      'Published fact-checks label this one differently: Digiteye rated it Misleading, Check Your Fact rated it False. They agree completely on the facts and differ only on the word. Both answers are marked correct here.',
    skill: 'context',
  },

  {
    id: 'laptop-scheme',
    provenance: 'documented',
    platform: 'whatsapp',
    platformLabel: 'WhatsApp · Forwarded message with a link',
    postDate: 'Flagged by PIB Fact Check on 4 June 2026; earlier versions in 2023 and 2025',
    account: null,
    accountNote: 'Forwarded into family and college groups, with no identifiable origin.',
    postText:
      'Good news! The Government of India is giving FREE LAPTOPS to all students under the National Student Laptop Scheme. Registration closes soon. Click the link, fill the form with your details and claim yours.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution: null,
    claim:
      'The Government of India is distributing free laptops to students under a national scheme.',
    question: 'Do you trust this message?',
    correct: 'false',
    explanation:
      'There is no such scheme. The government has denied launching any free laptop scheme or any application process for one. The link in the message is a phishing form: its purpose is to collect your personal details, not to register you for anything.',
    originalContext:
      'This hoax returns under a new name every year or two — Prime Minister Free Laptop Scheme in 2023, Students Laptop Scheme in 2025, National Student Laptop Scheme in 2026. The template never changes: a real-sounding scheme, an urgent deadline, and a form.',
    evidence: [
      'PIB Fact Check labelled the circulating message fake and warned people not to engage with its links or forms.',
      'The Ministry of Education has stated that no such scheme is being run.',
      'The government separately denied launching any free laptop scheme or application process.',
      'Real government schemes are announced on ministry websites and in the Gazette, not by forwarded message.',
    ],
    factCheckSource: 'PIB Fact Check, reported by News on AIR',
    factCheckUrl:
      'https://newsonair.gov.in/government-debunks-fake-whatsapp-message-claiming-free-laptops-under-national-student-laptop-scheme/',
    moreLinks: [
      {
        label: 'News on AIR — government denies launching any free laptop scheme',
        url: 'https://newsonair.gov.in/government-denies-launching-any-free-laptop-scheme-or-application-process/',
      },
      { label: 'PIB Fact Check Unit', url: 'https://www.pib.gov.in/aboutfactchecke.aspx' },
    ],
    verificationNote:
      'Wording is representative: each round of this hoax uses a different scheme name and a different link.',
    skill: 'source',
  },

  {
    id: 'child-lifting-video',
    provenance: 'documented',
    platform: 'whatsapp',
    platformLabel: 'WhatsApp · Video forward',
    postDate: 'Circulated from May 2017; at its peak through mid-2018',
    account: null,
    accountNote: 'No author. The video arrived in local groups already stripped of any source.',
    postText:
      'WARNING ⚠️ Child-kidnapping gangs have entered our area. Watch this CCTV footage — they took the child in seconds. Do not let children out alone. Forward to all groups.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution:
      'We do not reproduce the video or its frames. The original is a public-safety advertisement, and the forwarded edit was used to incite violence.',
    claim: 'This CCTV video shows a child being abducted by a kidnapping gang in the area.',
    question: 'Do you trust this video?',
    correct: 'false',
    explanation:
      'The footage is a Pakistani public-safety advertisement, edited to remove its ending. In the original the men bring the child straight back and hold up a sign about how quickly a child can disappear — the film was made to warn parents, not to record a crime. The forward cut the last few seconds, and the meaning inverted completely.',
    originalContext:
      'This is the most serious case in this exhibition. BOOM counted at least twenty-five lynchings in separate incidents during 2018 driven by these rumours, and in each case police found no evidence that the person attacked was a kidnapper. People were killed because a forward looked real.',
    evidence: [
      'BOOM identified the source as a doctored Pakistani public-safety commercial, and was the first Indian outlet to debunk it, from May 2017.',
      'The uncut original ends with the men returning the child and displaying a warning message.',
      'Unrelated images, including one from Syria, were attached to the same warnings in different regions.',
      'Police investigating the attacks found that no kidnapping had taken place in any of them.',
    ],
    factCheckSource: 'BOOM',
    factCheckUrl:
      'https://www.boomlive.in/child-kidnapping-rumours-in-india-being-spread-with-syria-image-pak-video',
    moreLinks: [
      {
        label: 'BOOM — rumours revived with unrelated images and audio',
        url: 'https://www.boomlive.in/child-kidnapping-rumours-revived-with-unrelated-images-whatsapp-audio-messages',
      },
      {
        label: 'BOOM — how a video from Karnataka spurred a mob attack in Malegaon',
        url: 'https://www.boomlive.in/how-a-video-from-karnataka-spurred-a-mob-attack-in-malegaon',
      },
    ],
    verificationNote:
      'The text above is representative. The warning circulated in many languages and wordings, attached to several different videos.',
    skill: 'context',
  },

  {
    id: 'ib-recruitment-notice',
    provenance: 'documented',
    platform: 'government',
    platformLabel: 'Government notice · Recruitment advertisement',
    postDate: '2020',
    account: 'Intelligence Bureau, Ministry of Home Affairs',
    accountNote: null,
    postText:
      'Advertisement inviting applications for recruitment to posts in the Intelligence Bureau, issued by the Ministry of Home Affairs.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution: null,
    claim: 'This Intelligence Bureau recruitment advertisement is genuine.',
    question: 'Do you trust this notice?',
    correct: 'true',
    explanation:
      'It was genuine — and the official fact-checker said it was not. In 2020 the PIB Fact Check Unit publicly flagged this recruitment advertisement as fake. The Intelligence Bureau then confirmed in writing that the advertisement was genuine, and the PIB post was deleted.',
    originalContext:
      "The PIB Fact Check Unit is the Government of India's own fact-checking body, and in 2023 it was designated an official fact-checking authority under the IT Rules. This case is why its rulings deserve weight without being treated as the last word: the body that issued the notice is the body that can settle whether it is real.",
    evidence: [
      'The Intelligence Bureau confirmed in writing that the advertisement was genuine.',
      'PIB subsequently deleted the post that had called it fake.',
      'The Wire documented the sequence, including the correspondence.',
      'Checking with the issuing department would have resolved it. Checking only the label would not.',
    ],
    factCheckSource: 'The Wire',
    factCheckUrl:
      'https://thewire.in/government/pib-fact-check-unit-goof-up-ib-recruitment-notice-fake-genuine',
    moreLinks: [
      {
        label: 'PIB Fact Check Unit — scope and how to submit a claim',
        url: 'https://www.pib.gov.in/aboutfactchecke.aspx',
      },
    ],
    verificationNote:
      'We describe the advertisement rather than reproduce it, and the original PIB post no longer exists to link to, having been deleted.',
    skill: 'authority',
  },

  {
    id: 'esanjeevani',
    provenance: 'documented',
    platform: 'whatsapp',
    platformLabel: 'WhatsApp · Forwarded message',
    postDate: 'Circulating since 2020',
    account: null,
    accountNote: 'A forward — but this time about a service that exists.',
    postText:
      'You can now consult a government doctor online, from home, free of cost, through eSanjeevani OPD. No fee, no card needed. Please share with anyone who needs it.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution: null,
    claim:
      'A free online doctor consultation service called eSanjeevani OPD is run by the Government of India.',
    question: 'Do you trust this message?',
    correct: 'true',
    explanation:
      'This one is real. eSanjeevani OPD is a national teleconsultation service launched by the Ministry of Health and Family Welfare in April 2020, built and maintained by C-DAC Mohali, and listed on the Government of India portal. It is free to use.',
    originalContext:
      'The service was launched during the first COVID-19 lockdown as "Stay Home OPD", and has since run into crores of consultations. The lesson here is the one visitors least expect: a message is not false because it is a forward. Checking works in both directions.',
    evidence: [
      'india.gov.in lists eSanjeevani as the first online OPD consultation service the government offers citizens.',
      'The Ministry of Health and Family Welfare launched the OPD module in April 2020.',
      'A Lok Sabha answer of February 2023 reported about 95.88 lakh consultations on the OPD module as of January 2023.',
      'The platform is developed and maintained by C-DAC Mohali under the ministry.',
    ],
    factCheckSource: 'PIB Fact Check marked a viral message about this service true',
    factCheckUrl:
      'https://www.india.gov.in/category/health-wellness/subcategory/health-resources/details/esanjeevani-programme-online-opd',
    moreLinks: [
      {
        label: 'News on AIR — eSanjeevani crosses 50 crore teleconsultations',
        url: 'https://newsonair.gov.in/esanjeevani-achieves-milestone-of-50-cr-teleconsultations-from-across-the-country/',
      },
      {
        label: 'Vikaspedia — how to use the eSanjeevani OPD portal',
        url: 'https://www.vikaspedia.in/health/health-care-innovations/how-to-use-esanjeevani-opd-portal',
      },
    ],
    verificationNote:
      'We could not locate the original PIB Fact Check post marking this claim true; that verdict is reported secondhand. The link above therefore goes to the government portal listing, which is the stronger evidence anyway.',
    skill: 'source',
  },

  {
    id: 'odisha-pigeons',
    provenance: 'documented',
    platform: 'newspaper',
    platformLabel: 'Online newspaper · News report',
    postDate: 'Reported repeatedly, including 2018 and 2023',
    account: 'National and international press',
    accountNote: null,
    postText:
      'The police in Odisha kept a service of homing pigeons to carry official messages, and used it for decades after the telephone reached India.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution: null,
    claim: 'Police in Odisha used homing pigeons to carry official messages into the 2000s.',
    question: 'Do you trust this report?',
    correct: 'true',
    explanation:
      'True, and it belongs in this exhibition. The Odisha Police Pigeon Service began in 1946 with two hundred birds handed over by the army, to reach places with no wireless or telephone link. Messenger use was formally retired around 2002, but the birds were never disbanded: lofts at Cuttack and Angul still hold over a hundred Belgian Homers.',
    originalContext:
      'During the catastrophic flood of 1982 the pigeon service was the only line of communication to the marooned town of Banki. That is the point of the claim: a technology looks obsolete right up until the newer one goes under water.',
    evidence: [
      'The service began in 1946, when the army handed two hundred pigeons to the Odisha police.',
      'In the 1982 flood the pigeons carried the only messages reaching Banki.',
      'Reporting in 2023 describes over a hundred Belgian Homer pigeons still kept, with ceremonial flights.',
      'The birds are retained as a backstop for disasters, when networks fail.',
    ],
    factCheckSource: null,
    factCheckUrl: null,
    moreLinks: [
      {
        label: 'ThePrint — Indian police retain carrier pigeons as a backstop against disasters',
        url: 'https://theprint.in/india/indian-police-retain-carrier-pigeons-as-backstop-against-disasters/1633287',
      },
      {
        label: 'Odisha Bytes — pigeons carry a missive on heritage conservation',
        url: 'https://odishabytes.com/flight-back-time-pigeons-carry-missive-heritage-conservation/',
      },
    ],
    verificationNote:
      'Sources disagree on the exact date messenger use ended: most say March 2002, one account says 2008. We say "around 2002" because we could not settle it against a primary record. The claim as worded — into the 2000s — holds under every version.',
    skill: 'evidence',
  },

  {
    id: 'flood-video',
    provenance: 'demonstration',
    platform: 'whatsapp',
    platformLabel: 'WhatsApp · Video forward',
    postDate: 'No date shown on the message',
    account: null,
    accountNote: 'No account, no location, no source. That is the whole exercise.',
    postText:
      '⚠️ HEAVY FLOODING IN OUR CITY RIGHT NOW. Water entering homes, people stuck on rooftops. Share immediately so everyone stays safe 🙏🙏',
    postTextProvenance: 'written',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: 'museum/zone-4/truth-test/flood-demo',
    imageAttribution: 'Exhibition demonstration graphic, Team ChronoScribes, 2026.',
    claim: 'This video shows flooding happening in your city right now.',
    question: 'Do you trust this message?',
    correct: 'needs-verification',
    explanation:
      'It might be true. From this message alone you cannot tell, and that is the correct answer. Nothing here says which city, which day, who filmed it, or where it was first posted. "Right now" is a claim about time made by whoever forwarded it, not by whoever shot it.',
    originalContext:
      'Flood, fire and accident footage is among the most recycled material on Indian social media. The same clips return during every monsoon, re-labelled with a new city. Alt News and BOOM resolve most of them by taking one frame and running a reverse image search.',
    evidence: [
      'Take a screenshot of one frame and run it through a reverse image search; older copies of the same frame usually surface.',
      'Look for the earliest upload rather than the loudest one.',
      'Check whether the local municipal body, the police or a newspaper has reported it.',
      'Look inside the frame: signboards, number plates, languages and weather can place it.',
    ],
    factCheckSource: null,
    factCheckUrl: null,
    moreLinks: [
      { label: 'BOOM — fact check archive', url: 'https://www.boomlive.in/fact-check' },
      { label: 'Alt News', url: 'https://www.altnews.in/' },
    ],
    verificationNote:
      'This is an exhibition demonstration written by Team ChronoScribes, not a real post. It carries no account, no engagement count and no URL, because inventing those would be the very thing this activity warns against.',
    skill: 'date',
  },

  {
    id: 'truncated-axis-chart',
    provenance: 'demonstration',
    platform: 'instagram',
    platformLabel: 'Instagram · Infographic post',
    postDate: 'Exhibition demonstration',
    account: null,
    accountNote: 'No account: the graphic was made for this exhibition.',
    postText: 'Visitor numbers have EXPLODED this week 📈 Five times the footfall!',
    postTextProvenance: 'written',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: 'museum/zone-4/truth-test/chart-demo',
    imageAttribution: 'Exhibition demonstration graphic, Team ChronoScribes, 2026.',
    claim: 'The chart shows visitor numbers rising dramatically across the week.',
    question: 'Do you trust this graphic?',
    correct: 'misleading',
    explanation:
      'Every number in the chart is accurate. The axis is not. It starts at 980 instead of 0, so a rise from 995 to 1,024 — about three per cent — fills the whole frame and looks like a fivefold jump. Nothing has been falsified. The picture still says something untrue.',
    originalContext:
      'A truncated axis is the most common way a chart misleads without lying, and it is easy to miss, because the eye reads bar height before it reads the scale. The same trick appears in advertising, in political graphics and in company results.',
    evidence: [
      'Read the vertical axis before the bars. Find out where it starts.',
      'Work out the actual change: 995 to 1,024 is a rise of 29, not a multiplication.',
      'Ask what is being counted, and over how long. Five days is not a trend.',
      'Redraw it from zero in your head — the bars become almost the same height.',
    ],
    factCheckSource: null,
    factCheckUrl: null,
    moreLinks: [],
    verificationNote:
      'An exhibition demonstration by Team ChronoScribes. The figures are illustrative and describe no real institution, including ours.',
    skill: 'evidence',
  },

  {
    id: 'mob-attack-figure',
    provenance: 'documented',
    platform: 'newspaper',
    platformLabel: 'Online newspaper · Headline',
    postDate: 'Figures published from 2018 onward',
    account: 'Press reporting on mob attacks driven by rumour',
    accountNote: null,
    postText: '33 killed in mob attacks driven by child-lifting rumours.',
    postTextProvenance: 'representative',
    engagement: null,
    originalPostUrl: null,
    screenshotPublicId: null,
    imageAttribution: null,
    claim: '33 people were killed in mob attacks driven by child-lifting rumours.',
    question: 'Do you trust this headline?',
    correct: 'needs-verification',
    explanation:
      "The figure is real and traceable, but the headline strips away everything needed to judge it. IndiaSpend's database counted 33 killed in 69 mob attacks from January 2017. Other organisations counted differently over different periods: CBC cited at least 18 deaths, and BOOM reported more than 30 since 2017. None of them is wrong. They are counting different things.",
    originalContext:
      'Counts of this kind depend on the cut-off dates, on what is classed as a rumour-driven attack, and on whether the database is built from media reports or from police records. A bare number with no period and no method attached cannot be assessed, only repeated.',
    evidence: [
      'IndiaSpend built its count from media reports, from January 2017, and recorded 33 killed in 69 attacks.',
      'CBC, writing in 2018, cited at least 18 deaths.',
      'BOOM reported more than 30 deaths since 2017, and at least 25 lynchings during 2018.',
      'The differences come from methodology and cut-off date, not from error.',
    ],
    factCheckSource: 'BOOM / IndiaSpend',
    factCheckUrl:
      'https://www.boomlive.in/child-lifting-rumours-33-killed-in-69-mob-attacks-since-jan-2017-before-that-only-1-attack-in-2012',
    moreLinks: [],
    verificationNote:
      'We did not open the underlying databases, and the counts above are as reported. That is precisely why the honest answer to the headline is to go and verify.',
    skill: 'evidence',
  },
];

export const LEARNING_OUTCOME =
  'Don’t believe something just because it looks real. Investigate the source, evidence, date and context before sharing.';

/** True when the visitor's single choice counts as correct. */
export function isCorrect(q: Question, choice: Assessment): boolean {
  return choice === q.correct || (q.alsoAccepted?.includes(choice) ?? false);
}

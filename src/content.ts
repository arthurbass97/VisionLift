// All site copy lives here. Edit any text below and rebuild (or save while `npm run dev` is running).

/** href: the page it opens. section: the matching section id on the home page (used to highlight the link while scrolling). */
export interface NavLink { label: string; href: string; section: string }
export interface Step { title: string; text: string }
export interface Audience { tag: string; title: string; points: string[] }

/** The live site's address, used for canonical URLs and structured data. */
export const siteUrl = 'https://visionlift.co.uk';

export const contact = {
  email: 'hello@visionlift.co.uk',
  phoneLabel: '07553 459129',
  phoneHref: 'tel:+447553459129',
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/', section: 'top' },
  { label: 'Services', href: '/services', section: 'services' },
  { label: 'How we work', href: '/how-we-work', section: 'process' },
  { label: 'About', href: '/about', section: 'about' },
  { label: 'Contact', href: '/contact', section: 'contact' },
];

export const hero = {
  title: 'Websites and apps that',
  titleAccent: 'lift your business',
  lead: 'Vision Lift designs and builds fast, modern websites and mobile apps for businesses in Clitheroe, across Lancashire and throughout the UK — from first idea to launch and beyond.',
};

export const servicesIntro = {
  title: 'What we do',
  lead: 'Everything you need to plan, design, build and grow your website or app, under one roof.',
};

// The services (short versions and full pages) live in serviceContent.ts.
export { services, type Service, type Faq } from './serviceContent';

export const about: {
  title: string; intro: string; storyTitle: string; paragraphs: string[]; facts: [label: string, value: string][];
} = {
  title: 'Design and development with a clear vision',
  intro: 'Vision Lift is a web and mobile studio based in Clitheroe, Lancashire, helping businesses look sharp online and grow with confidence.',
  storyTitle: 'Who we are',
  paragraphs: [
    "With more than ten years designing and building for the web, we've learned what makes a site succeed: a clear message, a fast and friendly experience, and solid code underneath.",
    "We keep things personal. You work directly with the people designing and building your project, with honest advice, plain-English updates and no surprises along the way.",
  ],
  facts: [
    ['Services', 'Design, build and support'],
    ['Experience', '10+ years'],
    ['Based in', 'Clitheroe, Lancashire'],
    ['Works with', 'Start-ups to established businesses'],
    ['Availability', 'Taking on new projects'],
  ],
};

export const processIntro = {
  title: 'A simple, clear process',
  lead: 'Five clear stages take your project from first conversation to launch — and we stay on hand after that.',
};

export const steps: Step[] = [
  { title: 'Discover', text: 'We learn about your business, your customers and your goals, and agree what success looks like.' },
  { title: 'Plan', text: 'We map out the pages, features and content, with a clear timeline and a fixed price.' },
  { title: 'Build', text: 'We design and develop your site or app, sharing progress regularly so you can give feedback early.' },
  { title: 'Launch', text: 'We test across devices, handle the go-live and make sure everything is fast, secure and ready for Google.' },
  { title: 'Support', text: "After launch we're here for updates, improvements and help whenever you need it." },
];

export const audiences: Audience[] = [
  {
    tag: 'Small businesses',
    title: 'A professional presence that wins customers',
    points: ['Websites that build trust', 'Simple to update yourself', 'Easy to find on Google'],
  },
  {
    tag: 'Start-ups',
    title: 'Launch quickly and grow with confidence',
    points: ['Prototypes and first versions', 'Web and mobile apps', 'Built to scale as you grow'],
  },
  {
    tag: 'Established companies',
    title: 'Modernise what you already have',
    points: ['Redesigns and rebuilds', 'Speed and SEO improvements', 'Ongoing development and support'],
  },
];

export const contactPage = {
  title: "Let's talk about your project",
  lead: "Tell us what you're planning — a new website, an app, or improvements to something you already have. We reply to every message within one working day.",
  nextSteps: [
    { title: 'We reply', text: 'You hear back from us within one working day.' },
    { title: 'Quick call', text: 'A short, no-obligation chat to understand what you need.' },
    { title: 'Clear proposal', text: 'A plan with timings and a fixed price, so you know exactly what to expect.' },
  ] as Step[],
};

export const footer = {
  tagline: 'Web & Mobile Design and Development',
  note: 'PS Archie James Bass',
};

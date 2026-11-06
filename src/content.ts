// All site copy lives here. Everything below is placeholder text — replace it.
import type { IconName } from './components/Icon';

export interface NavLink { label: string; href: string }
export interface Service { icon: IconName; title: string; text: string }
export interface Step { title: string; text: string }
export interface Audience { tag: string; title: string; points: string[] }

export const contact = {
  email: 'hello@visionlift.co.uk',
  phoneLabel: '07553 459129',
  phoneHref: 'tel:+447553459129',
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'How we work', href: '#process' },
  { label: 'Contact', href: '#contact' },
];

export const hero = {
  eyebrow: 'Headline label',
  title: 'Your main headline',
  titleAccent: 'goes here',
  lead: "One or two sentences that explain what Vision Lift does, who it's for, and why it matters.",
};

export const services: Service[] = [
  { icon: 'eye', title: 'Service one', text: 'One-line description of this service.' },
  { icon: 'arrow', title: 'Service two', text: 'One-line description of this service.' },
  { icon: 'screen', title: 'Service three', text: 'One-line description of this service.' },
  { icon: 'chart', title: 'Service four', text: 'One-line description of this service.' },
  { icon: 'star', title: 'Service five', text: 'One-line description of this service.' },
];

export const about: { title: string; paragraphs: string[]; facts: [label: string, value: string][] } = {
  title: 'A heading about Vision Lift',
  paragraphs: [
    'A paragraph about who you are, how you started and what you care about.',
    'A second paragraph about how you work with clients and what makes you different.',
  ],
  facts: [
    ['Services', 'Design, build and support'],
    ['Experience', '10+ years'],
    ['Based in', 'Lancashire'],
    ['Works with', 'Fact here'],
    ['Availability', 'Fact here'],
  ],
};

export const steps: Step[] = [
  { title: 'Discover', text: 'What happens in this step.' },
  { title: 'Plan', text: 'What happens in this step.' },
  { title: 'Build', text: 'What happens in this step.' },
  { title: 'Launch', text: 'What happens in this step.' },
  { title: 'Support', text: 'What happens in this step.' },
];

export const audiences: Audience[] = [
  { tag: 'Audience one', title: 'Heading for this audience', points: ['Point one', 'Point two', 'Point three'] },
  { tag: 'Audience two', title: 'Heading for this audience', points: ['Point one', 'Point two', 'Point three'] },
  { tag: 'Audience three', title: 'Heading for this audience', points: ['Point one', 'Point two', 'Point three'] },
];

export const footer = {
  tagline: 'Web & Mobile Design and Development',
  note: 'PS Archie James Bass',
};

// Copy for each service: the short version (shown in service lists) and the full
// page at /services/<slug>. Edit any text and rebuild.
import type { IconName } from './components/Icon';

export interface Faq { q: string; a: string }

export interface Service {
  /** Page address: /services/<slug>. Changing it changes the URL. */
  slug: string;
  icon: IconName;
  /** Short name, used in lists, the breadcrumb and the "other services" links. */
  title: string;
  /** One line, shown in service lists. */
  text: string;
  /** Search result title (keep to ~60 characters including " | Vision Lift"). */
  metaTitle: string;
  /** Search result description (keep to ~160 characters). */
  metaDescription: string;
  /** Main heading on the service page. */
  headline: string;
  /** Intro under the main heading. */
  intro: string;
  overview: string[];
  includes: string[];
  benefits: { title: string; text: string }[];
  faqs: Faq[];
}

export const services: Service[] = [
  {
    slug: 'website-design',
    icon: 'screen',
    title: 'Website design & development',
    text: 'Custom websites designed around your customers — fast, responsive and easy to update.',
    metaTitle: 'Website Design & Development in Clitheroe',
    metaDescription: 'Custom website design and development in Clitheroe, Lancashire. Fast, responsive, search-friendly websites built around your customers. Fixed-price quotes.',
    headline: 'Website design & development',
    intro: 'Fast, modern websites designed around your customers and built to turn visitors into enquiries — for businesses in Clitheroe, across Lancashire and throughout the UK.',
    overview: [
      'Your website is often the first impression people have of your business. We design and build custom websites that explain what you do clearly, look great on every device and make it easy for visitors to get in touch, buy or book.',
      "Every site starts with your goals and your customers, not a template. We plan the structure and content with you, design each page around what people need to find, then build it with modern, well-tested code that's fast to load and easy to look after.",
      "Whether you need a brand-new site, a redesign of something that's no longer working, or a more advanced build with bookings, payments or integrations, you'll get a clear plan and a fixed price before any work begins.",
    ],
    includes: [
      'Discovery session to understand your business and goals',
      'Site structure and content planning',
      'Custom design for desktop, tablet and mobile',
      'Responsive build that loads quickly on any device',
      'Search engine basics: titles, descriptions, sitemap and structured data',
      'Contact forms and analytics set up',
      'Content management so you can update pages yourself',
      'Testing across browsers and devices before launch',
      'Launch, hosting set-up and handover',
    ],
    benefits: [
      { title: 'Built around your customers', text: 'Clear messaging and simple journeys that guide visitors towards getting in touch.' },
      { title: 'Fast and found', text: 'Lightweight, well-structured pages that load quickly and give you a strong start in search.' },
      { title: 'Easy to manage', text: "Update your own content without needing a developer, with support on hand when you'd like it." },
    ],
    faqs: [
      { q: 'How much does a website cost?', a: "It depends on the number of pages, the features you need and how much content we're creating. After an initial chat we'll send a fixed-price proposal, so you know the full cost before anything starts." },
      { q: 'How long does it take to build a website?', a: 'Most small business websites take a few weeks from the first conversation to launch. Larger sites with more features take longer. We agree a timeline with you at the start and keep you updated throughout.' },
      { q: 'Will I be able to update the website myself?', a: "Yes. We can set your site up so you can edit text, images and pages yourself, and we'll show you how. If you'd rather we handle updates, we offer ongoing support too." },
      { q: 'Will my website work on mobile phones?', a: 'Yes. Every site we build is designed and tested for mobile, tablet and desktop, so it looks and works properly on any screen size.' },
      { q: 'Can you redesign my existing website?', a: "Yes. We'll review what's working and what isn't, keep anything worth keeping, and plan the redesign so you don't lose existing search rankings when the new site goes live." },
    ],
  },
  {
    slug: 'mobile-app-development',
    icon: 'mobile',
    title: 'Mobile app development',
    text: 'iOS and Android apps that feel at home on every device, from prototype to app store.',
    metaTitle: 'Mobile App Development in Lancashire',
    metaDescription: 'iOS and Android app development from Vision Lift in Clitheroe, Lancashire. From idea and prototype through to app store launch and ongoing support.',
    headline: 'Mobile app development',
    intro: 'iOS and Android apps that are simple to use, reliable and built to grow with your business — taken from first idea through to the app stores.',
    overview: [
      "A good app makes something easier for your customers or your team, whether that's ordering, booking, managing an account or getting work done on the move. We help you shape the idea, design an experience people enjoy using and build an app that works reliably on real devices.",
      "We start by defining what the first version needs to do, so you can launch sooner and learn from real users rather than building everything at once. From there we design the screens, build and test the app, and take care of submitting it to the Apple App Store and Google Play.",
      "Apps often need to work with other systems, such as your website, a booking platform or an internal database. We plan those connections from the start so everything fits together, and stay on hand after launch for updates and new features.",
    ],
    includes: [
      'Idea workshop and feature planning',
      'User journeys and clickable prototypes',
      'App design for iOS and Android',
      'Development and testing on real devices',
      'Connections to your website, systems or third-party services',
      'App Store and Google Play submission',
      'Analytics to see how the app is being used',
      'Post-launch updates and support',
    ],
    benefits: [
      { title: 'Start with what matters', text: 'A focused first version that gets you to launch sooner and in front of real users.' },
      { title: 'One app, both platforms', text: 'An app that feels at home on both iPhone and Android, without doubling the work.' },
      { title: 'Supported after launch', text: 'Updates for new operating system versions, fixes and new features as you grow.' },
    ],
    faqs: [
      { q: 'How much does it cost to build an app?', a: "App costs vary widely with the number of features, screens and integrations. We'll help you define a focused first version and give you a fixed-price proposal before work starts." },
      { q: 'Do you build for both iPhone and Android?', a: 'Yes. We build apps that work on both iOS and Android, which keeps costs and timescales down compared with building two separate apps.' },
      { q: 'Will you publish the app to the app stores?', a: 'Yes. We prepare the store listings and handle the submission process for both the Apple App Store and Google Play, including responding to any review feedback.' },
      { q: 'Can my app connect to my existing website or systems?', a: "In most cases, yes. We'll look at what you already use and plan how the app will share information with it, such as customer accounts, bookings or product data." },
      { q: 'What happens after the app is launched?', a: 'Apps need regular updates to keep working with new phone software. We offer ongoing support to handle updates, fix issues and add new features when you need them.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    icon: 'eye',
    title: 'UI & UX design',
    text: 'Clear, intuitive interfaces shaped by how your customers actually think and behave.',
    metaTitle: 'UI & UX Design Services in Lancashire',
    metaDescription: 'UI and UX design from Vision Lift in Clitheroe, Lancashire. Clear, intuitive website and app interfaces shaped around how your customers think and behave.',
    headline: 'UI & UX design',
    intro: 'Clear, intuitive designs for websites and apps, shaped around how your customers think and behave — so they find what they need and take action.',
    overview: [
      "Good design isn't just about looking good. It's about making things easy. User experience (UX) design is how a website or app works: what people need to do and how simply they can do it. User interface (UI) design is how it looks and feels: layout, typography, colour and the details that build trust.",
      "We start by understanding your customers and what they're trying to achieve, then map out the journeys and structure before designing anything visual. Wireframes and clickable prototypes let you see and try the design early, when changes are quick and inexpensive.",
      'You can use our design service on its own, to improve an existing website or app, or as the first stage of a new build. Either way, you get a clear, consistent design that your developers, or ours, can build from with confidence.',
    ],
    includes: [
      'Review of your current website or app',
      'User journeys and site or app structure',
      'Wireframes for key pages and screens',
      'Visual design in line with your brand',
      'Clickable prototypes to test ideas early',
      'Accessibility considered throughout',
      'Design files and guidance ready for development',
    ],
    benefits: [
      { title: 'Easier for customers', text: 'Simple, logical journeys that reduce frustration and help people take the next step.' },
      { title: 'Decisions made early', text: 'Prototypes let you try ideas before development, saving time and cost later.' },
      { title: 'Consistent and on-brand', text: 'A clear visual style that makes your business look professional at every touchpoint.' },
    ],
    faqs: [
      { q: 'What is the difference between UI and UX design?', a: 'UX (user experience) design is about how something works: the journeys, structure and ease of use. UI (user interface) design is about how it looks: layout, colours, typography and visual detail. We take care of both together.' },
      { q: 'Can you redesign just part of my existing website or app?', a: "Yes. We can focus on specific areas that aren't performing, such as a checkout, a sign-up form or your key landing pages, without redesigning everything." },
      { q: 'Will I see the design before it is built?', a: "Yes. You'll see wireframes and then full designs, usually as clickable prototypes you can try on your own phone or computer, and give feedback at each stage." },
      { q: 'Do you make designs accessible?', a: 'Yes. We consider accessibility throughout, including colour contrast, readable text sizes, clear focus states and layouts that work with screen readers and keyboards.' },
    ],
  },
  {
    slug: 'seo-and-performance',
    icon: 'search',
    title: 'SEO & performance',
    text: 'Speed, accessibility and technical SEO improvements that help the right people find you.',
    metaTitle: 'SEO & Website Performance in Clitheroe',
    metaDescription: 'Technical SEO, site speed and accessibility improvements from Vision Lift in Clitheroe, Lancashire. Help the right people find your business online.',
    headline: 'SEO & performance',
    intro: 'Technical SEO, speed and accessibility improvements that help search engines understand your site, and help the right customers find you.',
    overview: [
      "A great website only works if people can find it. Search engines favour sites that load quickly, are well structured and clearly explain what a business does and where it works. We focus on the technical foundations that make that possible.",
      "We start with an audit of your current site, looking at how it's built, how quickly it loads, how search engines see it and where it falls short. You'll get a clear, prioritised list of improvements in plain English, and we can carry out the work for you.",
      "For local businesses, being found in your area matters most. We make sure your site clearly signals where you are and who you serve, and give you practical advice on your Google Business Profile, reviews and listings, which all play a big part in local search.",
    ],
    includes: [
      'Technical SEO audit with a prioritised action plan',
      'Page titles, descriptions and heading structure',
      'Structured data so search engines understand your business',
      'Site speed and Core Web Vitals improvements',
      'Image optimisation',
      'Accessibility improvements',
      'XML sitemap and Google Search Console set-up',
      'Local SEO guidance for your area',
    ],
    benefits: [
      { title: 'Found by the right people', text: 'Clear signals to search engines about what you do and where you work.' },
      { title: 'Faster pages', text: 'Quicker load times that keep visitors on your site and support your rankings.' },
      { title: 'Plain-English advice', text: 'A clear plan of what to fix and why, without the jargon.' },
    ],
    faqs: [
      { q: 'How long does SEO take to work?', a: 'Technical fixes can be picked up by search engines within weeks, but rankings usually build over several months. Local results often improve sooner, especially alongside a well-maintained Google Business Profile and reviews.' },
      { q: 'Can you guarantee a first-place ranking on Google?', a: 'No one can honestly guarantee rankings, as search engines decide them. What we can do is make sure your site is fast, well built and clearly structured, giving you the best possible chance to rank.' },
      { q: 'Why does website speed matter?', a: 'Slow pages lose visitors before they even load, and page speed is one of the signals search engines use. Faster sites tend to keep people engaged and convert more enquiries.' },
      { q: 'Do you help with local SEO?', a: "Yes. We make sure your website clearly shows where you're based and the areas you serve, and give practical guidance on your Google Business Profile, reviews and business listings." },
    ],
  },
  {
    slug: 'support-and-maintenance',
    icon: 'shield',
    title: 'Support & maintenance',
    text: 'Updates, security checks and ongoing improvements, so your site keeps working for you.',
    metaTitle: 'Website Support & Maintenance in Lancashire',
    metaDescription: 'Website and app support from Vision Lift in Clitheroe, Lancashire. Updates, security checks, backups, fixes and ongoing improvements, all handled for you.',
    headline: 'Support & maintenance',
    intro: "Updates, security checks and ongoing improvements, so your website or app stays fast, secure and up to date — without you having to think about it.",
    overview: [
      "Websites and apps need regular care. Software updates, security patches, new browser and phone versions, and changes to your business all mean things need attention over time. Our support service takes care of that for you.",
      "We keep your site's software up to date, check that everything is working and backed up, and fix issues quickly if something goes wrong. When you need a change, such as a new page, an updated price list or a new feature, you have someone to ask who already knows your site.",
      "We support the websites and apps we build, and can also take over sites built by someone else. We'll start with a review so we understand how your site works and can tell you about anything that needs attention.",
    ],
    includes: [
      'Software, plugin and security updates',
      'Regular backups',
      'Uptime and error monitoring',
      'Fixes when something goes wrong',
      'Content updates and small changes',
      'Performance and security checks',
      'Advice on improvements as your business grows',
    ],
    benefits: [
      { title: 'Peace of mind', text: "Your site is kept updated, backed up and checked, so problems are caught early." },
      { title: 'One point of contact', text: 'A team who knows your site and can make changes quickly when you need them.' },
      { title: 'Always improving', text: 'Ongoing suggestions to keep your site fast, secure and working hard for your business.' },
    ],
    faqs: [
      { q: 'Can you support a website you did not build?', a: "Yes. We'll start with a review to understand how the site is built and hosted, flag anything that needs attention, and then look after it from there." },
      { q: 'What happens if my website goes down?', a: "We'll investigate and work to get it back online as quickly as possible. Regular backups mean we can restore your site if something goes seriously wrong." },
      { q: 'Can I ask for changes to my website?', a: 'Yes. Content updates, small changes and new features can all be handled as part of ongoing support. Larger additions are quoted separately so you always know the cost up front.' },
      { q: 'Why do websites need regular updates?', a: 'The software behind websites and apps is updated regularly to fix security issues and keep up with new browsers and devices. Keeping it current helps protect your site and keeps it working properly.' },
    ],
  },
];

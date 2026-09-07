// All content data for Membership Card Website

import heroBg from '../assets/hero.png'
import image1 from '../assets/image1.png'
import image2 from '../assets/image2.PNG'
import image3 from '../assets/image3.PNG'
import image4 from '../assets/image4.PNG'
import image5 from '../assets/image5].PNG'
import image6 from '../assets/image6.PNG'
import image7 from '../assets/image7.PNG'
import image8 from '../assets/image8.PNG'
import image9 from '../assets/image9.PNG'
import image10 from '../assets/image10.PNG'
import card from '../assets/card.png'
import logoImg from '../assets/logo.jpeg'

export const IMAGES = {
  // Hero / Intro backgrounds
  introBgPart1: heroBg,
  introBgPart1Mobile: heroBg,
  introBgPart2: heroBg,
  introBgPart2Mobile: heroBg,

  // Logo mini
  logoMini: logoImg,

  // Statistics illustrations - Waterpark, Hotel, Resort (Unsplash) — checked hotel now bedroom
  statistic1: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800&auto=format&fit=crop&q=80',
  statistic2: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=80',
  statistic3: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80',

  // About
  aboutIllustration: card,
  aboutLogo1: logoImg,
  aboutLogo2: logoImg,
  aboutLogo3: logoImg,

  // Featured experiences (retreats) — Unsplash content-matched (verified)
  retreat1: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80',
  retreat2: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
  retreat3: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&auto=format&fit=crop&q=80',
  retreat4: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
  retreat5: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&auto=format&fit=crop&q=80',
  retreat6: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop&q=80',
  retreat7: image7,
  retreat8: image8,
  retreat9: image9,
  retreat10: image10,

  // Property icons (using local or keeping CDN for now)
  pinIcon: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b12d0cfc7c0ffb4594ddd_200b069e26d5dbf25e7efe28a16ac85b_pin.svg',
  calendarIcon: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b12d013c40d035e576fc8_calendar.svg',
  usersIcon: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b12d0b38d158447cd2f5b_users.svg',
  starsIcon: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b13a6c05aa0554867732d_stars.svg',

  // Destinations
  destination1: image1,
  destination2: image2,
  destination3: image3,

  // How works icons
  howWorksIcon1: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b4ca99831f5d3ba3e38ac_icon-1.svg',
  howWorksIcon2: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b4caacaa12fec64081c6c_icon-2.svg',
  howWorksIcon3: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b4caae3cc55404d552d02_icon-3.svg',
  howWorksIcon4: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b4caa7fe5ce94a391888e_icon-4.svg',

  // Coaches (now Partners/Venues)
  coach1: image1,
  coach2: image2,
  coach3: image3,
  coach4: image4,

  // Practitioners
  plusIcon: 'https://cdn.prod.website-files.com/696eeb61714a6c90a5f18c9e/697b60b6b733ce8488627354_plus.svg',

  // Footer
  footerIllustration: image5,
}

export const STATISTICS = [
  {
    title: 'Waterpark',
    subtitle: '5 Person • Food Included • No Night Stay',
    detail: 'Tap for details',
    image: IMAGES.statistic1,
    hasRightBorder: true,
  },
  {
    title: 'Hotel',
    subtitle: '4 Person • Food Included with Stay',
    detail: 'Tap for details',
    image: IMAGES.statistic2,
    hasRightBorder: true,
  },
  {
    title: 'Resort',
    subtitle: '4 Person • Food Included • No Night Stay',
    detail: 'Tap for details',
    image: IMAGES.statistic3,
    hasRightBorder: false,
  },
]

export const NAV_LINKS = [
  { label: 'Experiences', href: '#experiences' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
]

export const RETREATS = [
  {
    title: '7 Day Mystic Mountain Retreat in Romania',
    price: '$1,000',
    image: IMAGES.retreat1,
    link: '#retreats',
    location: 'Nagpur, Maharashtra',
    date: 'Feb 15 - 21, 2026',
    duration: '(7 days, 6 nights)',
    guests: '12 guests',
    trusted: '190+',
  },
  {
    title: 'Yoga & Outdoor Retreat in Tuscany, Italy',
    price: '$1,328',
    image: IMAGES.retreat2,
    link: '#retreats',
    location: 'Nagpur, Maharashtra',
    date: 'Jan 15 - 21, 2026',
    duration: '(7 days, 6 nights)',
    guests: '6 guests',
    trusted: '125+',
  },
  {
    title: 'Photography Retreat & Tour in Magical Morocco',
    price: '$5,575',
    image: IMAGES.retreat3,
    link: '#retreats',
    location: 'Nagpur, Maharashtra',
    date: 'March 06 - 20, 2026',
    duration: '(15 days, 14 nights)',
    guests: '18 guests',
    trusted: '312+',
  },
  {
    title: 'Morocco Holiday & Desert Moon',
    price: '$3,829',
    image: IMAGES.retreat4,
    link: '#retreats',
    location: 'Nagpur, Maharashtra',
    date: 'April 12 - 20, 2026',
    duration: '(8 days, 7 nights)',
    guests: '6 guests',
    trusted: '412+',
  },
  {
    title: '8 Day Juice Detox, Retreat in Portugal',
    price: '$1,294',
    image: IMAGES.retreat5,
    link: '#retreats',
    location: 'Nagpur, Maharashtra',
    date: 'Feb 06 - 14, 2026',
    duration: '(8 days, 7 nights)',
    guests: '12 guests',
    trusted: '112+',
  },
  {
    title: '7 Day Solo Travelers Retreat: Fun in Bali',
    price: '$406',
    image: IMAGES.retreat6,
    link: '#retreats',
    location: 'Nagpur, Maharashtra',
    date: 'Jan | Feb | Mar | Apr | May',
    duration: '(7 days, 6 nights)',
    guests: 'Solo',
    trusted: '287+',
  },
]

export const COMBINE_STEPS = [
  {
    number: '01',
    title: 'Choose',
    title2: 'Retreat',
    hasDec1: true,
    hasDec5: true,
  },
  {
    number: '02',
    title: 'Match Boutique',
    title2: 'Stay',
    hasDec2: true,
  },
  {
    number: '03',
    title: 'Add Transfers &',
    title2: 'Extras',
    hasDec3: true,
    hasDec6: true,
  },
  {
    number: '04',
    title: 'Secure',
    title2: 'Payment',
    hasDec4: true,
  },
]

export const DESTINATIONS = [
  {
    name: 'Europe',
    count: '/ 289+ Retreats',
    image: IMAGES.destination1,
  },
  {
    name: 'Asia',
    count: '/ 90+ Retreats',
    image: IMAGES.destination2,
  },
  {
    name: 'USA',
    count: '/ 180+ Retreats',
    image: IMAGES.destination3,
  },
]

export const HOW_WORKS = [
  {
    icon: IMAGES.howWorksIcon1,
    count: '01',
    title: 'Tell us your goals',
    titleHighlight: 'goals',
    description: 'Trusted by travelers looking for more than ordinary vacations.',
    noBr: true,
  },
  {
    icon: IMAGES.howWorksIcon2,
    count: '02',
    title: 'Get curated matches',
    titleHighlight: 'matches',
    description: 'We recommend retreats and stays that fit.',
    noBr: true,
  },
  {
    icon: IMAGES.howWorksIcon3,
    count: '03',
    title: 'Customize your package',
    titleHighlight: 'package',
    description: 'Add transfers, spa, and extras in one checkout.',
    noBr: true,
  },
  {
    icon: IMAGES.howWorksIcon4,
    count: '04',
    title: 'Travel & track progress',
    titleHighlight: 'progress',
    description: 'Use VITA Journal to reflect and rebook.',
    noBr: true,
  },
]

export const COACHES = [
  {
    name: 'Lauren Thompson',
    role: 'Yoga Couch',
    location: 'Nagpur, Maharashtra',
    image: IMAGES.coach1,
    countries: '14',
    retreats: '18',
    bio: 'I work with yoga as a practical tool for improving mobility, balance, and body awareness. My sessions focus on breath, alignment, and calm strength, without pressure or competition. I support people who want to build a steady practice that fits real life and long-term wellbeing.',
    bio2: 'My approach is grounded, structured, and accessible for different experience levels.',
  },
  {
    name: 'Michael Wilson',
    role: 'Meditation Coach',
    location: 'Nagpur, Maharashtra',
    image: IMAGES.coach2,
    countries: '19',
    retreats: '56',
    bio: 'I work with meditation as a practical tool for emotional stability, focus, and self-discipline. My approach is structured and accessible, helping people build a consistent practice that fits into real life.',
    bio2: 'I support participants in developing awareness and resilience through techniques that can be applied both during retreats and in everyday situations.',
  },
  {
    name: 'Sarah Johnson',
    role: 'Nutrition Specialist',
    location: 'Nagpur, Maharashtra',
    image: IMAGES.coach3,
    countries: '17',
    retreats: '89',
    bio: 'I support retreat participants with nutrition that is simple, nourishing, and adapted to real needs. My work focuses on whole foods, energy balance, and practical eating habits that support focus and recovery. I help people understand how nutrition affects their physical and mental state, without strict rules or unnecessary restrictions, and with respect for individual lifestyles.',
    bio2: null,
  },
  {
    name: 'Isabelle Martin',
    role: 'Stress-Relief Guide',
    location: 'Nagpur, Maharashtra',
    image: IMAGES.coach4,
    countries: '14',
    retreats: '18',
    bio: 'I work with stress reduction through structured breathing practices, gentle movement, and nervous system regulation. My sessions focus on restoring balance, improving emotional stability, and reducing physical tension. I support people who experience long-term stress and want practical, repeatable tools they can use in everyday life. My approach is calm, grounded, and focused on sustainable recovery rather than quick fixes.',
    bio2: null,
  },
]

export const DESTINATION_DOTS_SVG = null // decorative dots handled in component
# Website Rebuild Project Instructions

## Overview

This project follows a specific workflow: deeply research an existing website, document all pages and content, then rebuild it as a modern React application while preserving **every word** of the original content and sourcing images directly from the original site.

---

## Phase 1: Deep Research

### 1.1 Systematic Site Crawling

Follow this methodical approach to ensure nothing is missed:

**Step 1: Map the Navigation**
```
1. Document primary navigation (main menu items)
2. Document secondary navigation (footer links, utility nav)
3. Check for mega menus or dropdowns with additional links
4. Look for "sitemap" page if available
```

**Step 2: Crawl Each Section**
```
For each main nav item:
├── Visit the landing page
├── Note all internal links on that page
├── Follow each link and document the subpage
├── Check for pagination (page 2, 3, etc.)
├── Look for "view all" or "see more" links
└── Check breadcrumbs for hierarchy clues
```

**Step 3: Find Hidden Pages**
- Check the footer for links not in main nav (Privacy Policy, Terms, etc.)
- Look for links within body content
- Check for PDF downloads or resource pages
- Look for news/blog archives
- Check for team member individual pages
- Look for project/portfolio detail pages

**Step 4: Document the Full Site Map**
```markdown
## Site Map
- Home (/)
- About (/about)
  - Our Team (/about/team)
  - History (/about/history)
- Services (/services)
  - Service A (/services/service-a)
  - Service B (/services/service-b)
- Projects (/projects)
  - [Individual project pages]
- Contact (/contact)
- Privacy Policy (/privacy)
```

### 1.2 Content Extraction (Per Page)

For **each page** on the site, document:

- **URL**: Full path (e.g., `/who-we-are`, `/services/manufacturing`)
- **Page Title**: The H1 or main heading
- **Meta Description**: If visible/accessible
- **All Body Text**: Copy **verbatim** - not a word changed
- **Image URLs**: Direct links to all images on the page
- **Image Alt Text**: Preserve accessibility text
- **CTAs/Buttons**: Text and where they link to
- **Lists/Features**: Bullet points, capability lists, etc.
- **Team Members**: Names, titles, bios, photos
- **Contact Info**: Addresses, phone numbers, emails

### 1.3 Create a Content Document

Create a structured document (markdown or JSON) cataloging:

```markdown
## Page: [Page Name]
URL: /original-path
Route: /new-path

### Hero
- Heading: "Exact heading text"
- Subheading: "Exact subheading text"
- Image: https://originalsite.com/path/to/image.jpg

### Content Sections
[All text blocks, exactly as written]

### Images
- https://originalsite.com/assets/image1.jpg
- https://originalsite.com/assets/image2.jpg

### Navigation Links
- Link text -> /destination
```

---

## Phase 2: Project Setup

### 2.1 Initialize Project

```bash
npm create vite@latest project-name -- --template react-ts
cd project-name
npm install
```

### 2.2 Install Dependencies

```bash
npm install react-router-dom framer-motion lucide-react react-helmet-async react-intersection-observer
npm install -D tailwindcss postcss autoprefixer @types/node
npx tailwindcss init -p
```

### 2.3 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── ui/
│       ├── Section.tsx
│       ├── Card.tsx
│       ├── PageHero.tsx
│       └── AnimatedElement.tsx
├── data/
│   ├── services.ts      # All service/product data
│   ├── projects.ts      # Project/portfolio items
│   ├── team.ts          # Team member data
│   ├── capabilities.ts  # Features/capabilities
│   └── insights.ts      # Blog/news articles
├── pages/
│   ├── Home.tsx
│   ├── [PageName].tsx   # One per main page
│   └── services/        # Subpages grouped
│       └── [Service].tsx
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css
```

---

## Phase 3: Implementation Rules

### 3.1 Content Fidelity

**CRITICAL**: Do not change, rephrase, or "improve" any content:

- Copy text **exactly** as it appears on the original site
- Preserve original capitalization, punctuation, and formatting
- Keep the same paragraph breaks and list structures
- Maintain original heading hierarchy

### 3.2 Image Handling

Source all images directly from the original website:

```typescript
// In data files
image: 'https://originalsite.com/assets/hero-image.jpg'

// In components
<img
  src="https://originalsite.com/assets/photo.jpg"
  alt="Original alt text preserved"
/>
```

**Why?** This is for demo/development purposes. Production deployment would replace with locally hosted assets.

### 3.3 Data Structure Pattern

Create typed data files for repeated content:

```typescript
// src/types/index.ts
export interface Service {
  id: string
  slug: string
  title: string
  description: string
  fullDescription: string[]
  capabilities: string[]
  image: string
}

// src/data/services.ts
export const services: Service[] = [
  {
    id: '1',
    slug: 'service-name',
    title: 'Exact Title From Site',
    description: 'Exact description from site...',
    // ... all content verbatim
  }
]
```

### 3.4 Routing

Match the original site's URL structure where sensible:

```typescript
// App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/who-we-are" element={<WhoWeAre />} />
  <Route path="/what-we-do" element={<WhatWeDo />} />
  <Route path="/what-we-do/:slug" element={<ServiceDetail />} />
  <Route path="/our-projects" element={<Projects />} />
  <Route path="/our-projects/:slug" element={<ProjectDetail />} />
  <Route path="/contact-us" element={<Contact />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## Phase 4: Brand Research & Design Implementation

### 4.1 Deep Brand Analysis

Before writing any code, thoroughly research and understand the business:

**Visual Identity**
- Extract the exact brand colors from the original site (use browser dev tools, color picker)
- Identify primary, secondary, and accent colors
- Note color usage patterns (what colors for headings, buttons, backgrounds, text)
- Document any gradients, overlays, or color treatments
- Identify the typography feel (bold/industrial, elegant/refined, friendly/approachable)

**Brand Voice & Messaging**
- What industry are they in? What makes them unique in that space?
- What tone does their copy use? (Professional, technical, warm, authoritative)
- What words/phrases do they repeat? These are their brand pillars
- Who is their target audience? B2B, B2C, technical buyers, general public?
- What problems do they solve? What value do they emphasize?

**Visual Themes & Motifs**
- Do they use photography heavily or illustrations?
- What style of imagery? (Industrial, people-focused, abstract, product shots)
- Are there recurring visual patterns, shapes, or design elements?
- What feeling should the site evoke? (Trust, innovation, heritage, precision)

### 4.2 Design Principles

**Create a Unique Experience**

The rebuilt site should feel crafted specifically for this business, not like a template. Every design decision should be informed by the brand research above.

**Things to AVOID:**

- Scroll indicators / "scroll down" arrows or animations
- Random statistics on the homepage ("500+ projects", "30 years experience") unless they're prominently featured on the original site as key messaging
- Generic hero text patterns ("Welcome to...", "Your trusted partner in...")
- Bouncing arrows or pulsing elements
- Cookie-cutter section layouts (alternating image-left, image-right)
- Generic stock-photo-style placeholder patterns
- Overly clever hover effects that distract from content
- "Learn more" as the only CTA text everywhere
- Animated counters/number tickers
- Generic testimonial carousels
- Footer columns with Lorem ipsum-style filler

**Things to EMBRACE:**

- Let the content breathe - generous whitespace informed by brand personality
- Typography that reflects the brand (industrial = bold weights, professional services = refined serifs or clean sans)
- Color usage that matches how the original brand uses color
- Imagery as a first-class citizen, not decoration
- Navigation that matches how users would actually explore this business
- Subtle motion that enhances without distracting
- Section designs that serve the specific content, not the other way around

### 4.3 Component Patterns

Build reusable components but customize their implementation per brand:

```typescript
// PageHero - Consistent page headers
<PageHero
  title="Page Title"
  subtitle="Tagline from original"
  image="https://originalsite.com/hero.jpg"
/>

// Section - Content sections with animations
<Section title="Section Heading" subtitle="Optional subtitle">
  {children}
</Section>

// AnimatedElement - Scroll-triggered animations
<AnimatedElement animation="fade-up">
  <Content />
</AnimatedElement>
```

### 4.4 Tailwind Configuration

Configure Tailwind to reflect the brand's actual colors:

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Extract ACTUAL brand colors from the original site
        primary: {
          DEFAULT: '#extracted-color',
          dark: '#darker-variant',
          light: '#lighter-variant',
        },
        secondary: {
          DEFAULT: '#extracted-secondary',
        },
        // Use semantic names that match the brand
        // e.g., 'steel', 'concrete', 'safety-orange' for industrial
        // e.g., 'forest', 'earth', 'sky' for environmental
      }
    }
  }
}
```

---

## Phase 5: Anti-Patterns - Bad vs Good Code

### 5.1 Hero Sections

**BAD - Generic template hero:**
```tsx
<div className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
  <div className="text-center text-white">
    <span className="text-sm uppercase tracking-[0.3em] mb-4 block">Welcome to</span>
    <h1 className="text-6xl font-bold mb-4">Company Name</h1>
    <p className="text-xl mb-8">Your trusted partner in delivering excellence</p>
    <button className="bg-white text-blue-600 px-8 py-3 rounded-full">
      Get Started
    </button>
    <div className="mt-12 animate-bounce">
      <ChevronDown className="w-8 h-8" />
    </div>
  </div>
</div>
```

**GOOD - Content-driven, brand-specific:**
```tsx
<div className="relative min-h-[70vh]">
  <img
    src="https://originalsite.com/hero.jpg"
    alt="Descriptive alt from original"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/40" />
  <div className="relative z-10 container mx-auto px-6 py-24">
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Exact Heading From Original Site
      </h1>
      <p className="text-xl text-white/90 mb-8">
        Exact subheading copied verbatim from the original site,
        preserving their voice and messaging.
      </p>
      <Link to="/contact" className="inline-flex items-center bg-primary text-white px-6 py-3">
        Original CTA Text
        <ArrowRight className="ml-2 w-5 h-5" />
      </Link>
    </div>
  </div>
</div>
```

### 5.2 Statistics Sections

**BAD - Random impressive numbers:**
```tsx
<div className="grid grid-cols-4 gap-8 py-16 bg-gray-100">
  <div className="text-center">
    <AnimatedCounter end={500} />
    <span className="text-4xl font-bold text-primary">+</span>
    <p>Projects Completed</p>
  </div>
  <div className="text-center">
    <AnimatedCounter end={50} />
    <p>Team Members</p>
  </div>
  <div className="text-center">
    <AnimatedCounter end={30} />
    <p>Years Experience</p>
  </div>
  <div className="text-center">
    <AnimatedCounter end={100} />
    <span>%</span>
    <p>Client Satisfaction</p>
  </div>
</div>
```

**GOOD - Only if on original site, presented simply:**
```tsx
// Only include if these stats are prominently featured on the original site
// Present them as static text, not animated counters
<div className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    <p className="text-lg text-gray-700">
      With over 30 years of experience and more than 500 completed projects,
      we bring proven expertise to every engagement.
    </p>
  </div>
</div>
```

### 5.3 Service/Feature Cards

**BAD - Generic card grid:**
```tsx
<div className="grid grid-cols-3 gap-6">
  {services.map((service, index) => (
    <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl
                                 hover:-translate-y-2 transition-all duration-300">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500
                      rounded-full flex items-center justify-center mb-4">
        <service.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <a href="#" className="text-blue-600 font-semibold hover:underline">
        Learn more →
      </a>
    </div>
  ))}
</div>
```

**GOOD - Content-appropriate layout:**
```tsx
<div className="space-y-12">
  {services.map((service) => (
    <Link
      key={service.id}
      to={`/services/${service.slug}`}
      className="group block"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-64 object-cover transition-transform duration-500
                       group-hover:scale-105"
          />
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {service.description}
          </p>
          <span className="text-primary font-medium inline-flex items-center">
            {service.ctaText || 'Explore'} {/* Use original CTA if available */}
            <ArrowRight className="ml-2 w-4 h-4 transition-transform
                                   group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>
```

### 5.4 Contact Sections

**BAD - Generic contact block:**
```tsx
<section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
  <div className="container mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
    <p className="text-xl mb-8">Let's discuss how we can help transform your business</p>
    <button className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold
                       hover:bg-gray-100 transition-colors">
      Contact Us Today
    </button>
  </div>
</section>
```

**GOOD - Matches original site's approach:**
```tsx
<section className="py-16 bg-gray-900">
  <div className="container mx-auto px-6">
    <div className="max-w-xl">
      <h2 className="text-3xl font-semibold text-white mb-4">
        {/* Exact heading from original site */}
        Get in touch
      </h2>
      <p className="text-gray-300 mb-6">
        {/* Exact copy from original site */}
        Have a project in mind? We'd love to hear from you.
      </p>
      <div className="space-y-3 text-gray-300">
        <p>contact@example.com</p>
        <p>+64 9 123 4567</p>
        <p>123 Street Name, Auckland</p>
      </div>
      <Link
        to="/contact"
        className="inline-block mt-6 bg-primary text-white px-6 py-3"
      >
        Contact Us
      </Link>
    </div>
  </div>
</section>
```

### 5.5 Page Transitions

**BAD - Over-animated:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 100, rotate: -5 }}
  animate={{ opacity: 1, y: 0, rotate: 0 }}
  exit={{ opacity: 0, y: -100, rotate: 5 }}
  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
>
  <PageContent />
</motion.div>
```

**GOOD - Subtle and purposeful:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  <PageContent />
</motion.div>
```

---

## Phase 6: Animation Philosophy

### 6.1 When to Animate

**DO animate:**
- Page transitions (subtle fade/slide)
- Elements entering viewport for the first time (once only)
- Hover states on interactive elements
- Loading states and skeleton screens
- Navigation state changes (menu open/close)

**DON'T animate:**
- Text content (no typewriter effects)
- Every scroll event (parallax overload)
- Numbers counting up
- Elements that have already been seen
- Anything that delays content consumption

### 6.2 Animation Values

Use consistent, subtle timing:

```typescript
// Good animation defaults
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4 }
}

// Stagger children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1  // Keep it tight, 0.05-0.15
    }
  }
}
```

### 6.3 Scroll Animations

Use `react-intersection-observer` for viewport-triggered animations:

```typescript
function AnimatedSection({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,  // IMPORTANT: Only animate once
    threshold: 0.1,
    rootMargin: '-50px'
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

### 6.4 Hover States

Keep hover effects functional, not decorative:

```typescript
// Good - subtle indication of interactivity
<Link className="group">
  <span className="group-hover:text-primary transition-colors">Link text</span>
  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
</Link>

// Good - image zoom on cards
<div className="overflow-hidden">
  <img className="transition-transform duration-500 group-hover:scale-105" />
</div>

// Bad - gratuitous effects
<div className="hover:rotate-3 hover:shadow-2xl hover:-translate-y-4
                hover:bg-gradient-to-r transition-all duration-500" />
```

---

## Phase 7: Accessibility Requirements

### 7.1 Semantic HTML

```typescript
// Use proper landmark elements
<header>   // Site header with nav
<nav>      // Navigation menus
<main>     // Primary page content (one per page)
<article>  // Self-contained content (blog posts, cards)
<section>  // Thematic groupings with headings
<aside>    // Tangentially related content
<footer>   // Site footer

// Proper heading hierarchy
<h1>       // One per page, page title
<h2>       // Section headings
<h3>       // Subsection headings
// Never skip levels (h1 -> h3)
```

### 7.2 Images

```typescript
// Always provide meaningful alt text
<img
  src={image}
  alt="Worker operating CNC machine in factory"  // Descriptive
/>

// Decorative images
<img src={pattern} alt="" role="presentation" />

// Complex images
<figure>
  <img src={chart} alt="Sales growth chart" />
  <figcaption>
    Quarterly sales increased 25% year over year,
    reaching $2.4M in Q4 2024.
  </figcaption>
</figure>
```

### 7.3 Interactive Elements

```typescript
// Buttons for actions, links for navigation
<button onClick={handleSubmit}>Submit Form</button>
<Link to="/about">About Us</Link>

// Never use div/span for clickable elements
// BAD:
<div onClick={doThing}>Click me</div>

// GOOD:
<button onClick={doThing}>Click me</button>

// Keyboard accessible
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Action
</button>
```

### 7.4 Focus States

```css
/* Ensure visible focus indicators */
/* In your global CSS or Tailwind config */

*:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Or with Tailwind */
.focus-visible:ring-2 .focus-visible:ring-primary .focus-visible:ring-offset-2
```

### 7.5 Screen Reader Support

```typescript
// Skip link for keyboard users
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Aria labels for icon-only buttons
<button aria-label="Open menu">
  <MenuIcon />
</button>

// Announce dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>

// Hide decorative elements
<div aria-hidden="true">
  <DecorativePattern />
</div>
```

---

## Phase 8: Mobile-First Strategy

### 8.1 Responsive Approach

Always design mobile-first, then enhance for larger screens:

```typescript
// Mobile-first Tailwind classes
<div className="
  px-4              // Mobile: small padding
  md:px-8           // Tablet: more padding
  lg:px-16          // Desktop: generous padding
">
  <h1 className="
    text-2xl          // Mobile: readable size
    md:text-4xl       // Tablet: larger
    lg:text-5xl       // Desktop: hero size
  ">
    Heading
  </h1>
</div>
```

### 8.2 Navigation Pattern

```typescript
// Mobile: hamburger menu
// Desktop: horizontal nav

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />

        {/* Desktop nav - hidden on mobile */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path}>{link.label}</Link>
          ))}
        </nav>

        {/* Mobile menu button - hidden on desktop */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  )
}
```

### 8.3 Touch Targets

```typescript
// Minimum 44x44px touch targets
<button className="min-h-[44px] min-w-[44px] p-3">
  <Icon />
</button>

// Adequate spacing between touch targets
<nav className="flex flex-col gap-4">  {/* Not gap-1 or gap-2 on mobile */}
  {links.map(link => (
    <Link key={link.path} className="py-3 px-4">{link.label}</Link>
  ))}
</nav>
```

### 8.4 Images

```typescript
// Responsive images
<img
  src={image}
  alt={alt}
  className="w-full h-48 md:h-64 lg:h-80 object-cover"
/>

// Different aspect ratios per breakpoint if needed
<div className="aspect-square md:aspect-video lg:aspect-[21/9]">
  <img src={image} className="w-full h-full object-cover" />
</div>
```

---

## Phase 9: Edge Cases & Special Content

### 9.1 Contact Forms

```typescript
// Forms should match original site's fields exactly
// Don't add fields they don't have, don't remove fields they do have

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',      // Only if original has phone field
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For demo: just log or show success message
    // Real implementation would need backend
    console.log('Form submitted:', formData)
    alert('Thank you for your message. We will be in touch soon.')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Match original form exactly */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name {/* Use their label text */}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-gray-300 focus:border-primary
                     focus:ring-1 focus:ring-primary outline-none transition-colors"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      {/* ... other fields */}
      <button type="submit" className="bg-primary text-white px-8 py-3">
        {/* Use their submit button text */}
        Send Message
      </button>
    </form>
  )
}
```

### 9.2 External Links

```typescript
// External links should open in new tab with security attributes
<a
  href="https://external-site.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-primary hover:underline"
>
  External Resource
  <ExternalLink className="inline w-4 h-4 ml-1" />
</a>
```

### 9.3 PDF Downloads

```typescript
// Link to original PDFs on original site
<a
  href="https://originalsite.com/documents/brochure.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 text-primary"
>
  <FileText className="w-5 h-5" />
  Download Brochure (PDF)
</a>
```

### 9.4 Maps

```typescript
// For demo purposes, embed Google Maps iframe if original site has a map
// Copy the exact location from original

function ContactMap() {
  return (
    <div className="aspect-video w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=COPIED_FROM_ORIGINAL"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Office Location"
      />
    </div>
  )
}
```

### 9.5 Social Links

```typescript
// Match original site's social links exactly
const socialLinks = [
  { icon: Linkedin, href: 'https://linkedin.com/company/original-company', label: 'LinkedIn' },
  { icon: Facebook, href: 'https://facebook.com/originalcompany', label: 'Facebook' },
  // Only include what they have
]

<div className="flex gap-4">
  {socialLinks.map(({ icon: Icon, href, label }) => (
    <a
      key={label}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-gray-400 hover:text-white transition-colors"
    >
      <Icon className="w-5 h-5" />
    </a>
  ))}
</div>
```

### 9.6 Video Content

```typescript
// If original site has videos, embed them
// YouTube/Vimeo embeds
<div className="aspect-video">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title from original"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full"
  />
</div>

// Self-hosted video from original site
<video
  src="https://originalsite.com/videos/intro.mp4"
  poster="https://originalsite.com/videos/intro-poster.jpg"
  controls
  className="w-full"
>
  Your browser does not support the video tag.
</video>
```

---

## Phase 10: Code Style Conventions

### 10.1 File Naming

```
components/
├── layout/
│   ├── Header.tsx      # PascalCase for components
│   ├── Footer.tsx
│   └── Layout.tsx
├── ui/
│   ├── Button.tsx
│   └── Card.tsx
data/
├── services.ts         # camelCase for data files
├── projects.ts
└── team.ts
pages/
├── Home.tsx            # PascalCase for page components
├── WhoWeAre.tsx        # Match route naming
└── services/
    └── ContractManufacturing.tsx
types/
└── index.ts            # Centralized types
```

### 10.2 Component Structure

```typescript
// Standard component structure
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

// Types at top (or imported from types/index.ts)
interface ServiceCardProps {
  service: Service
}

// Component
export default function ServiceCard({ service }: ServiceCardProps) {
  // Hooks first
  const [isHovered, setIsHovered] = useState(false)

  // Event handlers
  const handleClick = () => {
    // ...
  }

  // Render
  return (
    <Link to={`/services/${service.slug}`}>
      {/* JSX */}
    </Link>
  )
}
```

### 10.3 Tailwind Class Organization

```typescript
// Order: layout → sizing → spacing → typography → colors → effects → states
<div className="
  flex flex-col              // Layout
  w-full max-w-2xl           // Sizing
  p-6 mb-8                   // Spacing
  text-lg font-medium        // Typography
  bg-white text-gray-900     // Colors
  rounded-lg shadow-md       // Effects
  hover:shadow-lg            // States
  transition-shadow          // Transitions
">
```

### 10.4 Data File Structure

```typescript
// types/index.ts
export interface Project {
  id: string
  slug: string
  title: string
  category: string
  description: string
  fullDescription: string[]
  images: string[]
  details?: {
    client?: string
    location?: string
    year?: string
    scope?: string[]
  }
}

// data/projects.ts
import { Project } from '../types'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'project-name',
    title: 'Exact Project Title',
    // ... all fields populated from original site
  }
]

// Helper functions in same file
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(p => p.category === category)
}
```

---

## Phase 11: When to Ask for Clarification

### 11.1 Always Ask When:

**Content is ambiguous:**
- Text is cut off or unclear in the original
- Multiple versions of content exist (A/B testing visible)
- Content appears to be placeholder/lorem ipsum
- Dates or specific numbers that might be outdated

**Structure is unclear:**
- Can't determine the hierarchy between pages
- Navigation has inconsistencies
- Some pages seem orphaned or redundant
- Multiple paths lead to same content

**Technical decisions needed:**
- Original site has functionality that's complex to replicate (calculators, configurators)
- Third-party integrations (booking systems, chat widgets)
- User authentication areas
- E-commerce functionality

**Design interpretation:**
- Original site has multiple visual styles/inconsistencies
- Mobile version differs significantly from desktop
- Brand colors vary across pages
- Can't find certain assets in high quality

### 11.2 How to Ask:

```markdown
I found [specific issue] while researching the site:

**What I see:** [describe the situation]
**Options:**
1. [Option A and what it means]
2. [Option B and what it means]
3. [Skip this element/page]

Which approach would you prefer?
```

### 11.3 Don't Assume:

- Don't invent content that doesn't exist
- Don't "improve" their copy
- Don't add pages they don't have
- Don't skip pages because they seem less important
- Don't modernize their terminology
- Don't fix their typos without asking

---

## Phase 12: Content Verification Process

### 12.1 Page-by-Page Checklist

For each page, verify:

```markdown
## Page: [Name]

### Content Check
- [ ] H1 matches original exactly
- [ ] All body text matches original exactly
- [ ] All list items match original exactly
- [ ] CTAs use original button text
- [ ] Links point to correct destinations

### Image Check
- [ ] All images load successfully
- [ ] Images are from original site URLs
- [ ] Alt text matches original (or is descriptive if none existed)

### Structure Check
- [ ] Sections appear in same order as original
- [ ] Content hierarchy matches original
- [ ] Related content/sidebar matches if applicable

### Functionality Check
- [ ] Internal links work
- [ ] External links open in new tab
- [ ] Forms submit (to console for demo)
- [ ] Navigation from this page works
```

### 12.2 Side-by-Side Comparison

Open original site and rebuilt site side by side:

1. Compare each page visually
2. Read through all text on both
3. Click all links on both
4. Check mobile view on both
5. Verify images match

### 12.3 Content Diff Approach

For critical pages, create a text-only version:

```markdown
# Original Site Text (copied)
[Paste all visible text from original page]

# Rebuilt Site Text
[Paste all text from your rebuilt page]

# Diff
[Compare and note any differences - there should be NONE]
```

---

## Phase 13: Quality Checklist

Before considering the rebuild complete:

### Content
- [ ] All pages from original site have been recreated
- [ ] Every piece of text matches the original exactly
- [ ] All images load from original site URLs
- [ ] Contact information is accurate
- [ ] Social links are correct

### Navigation
- [ ] All nav links work
- [ ] Mobile menu works
- [ ] Footer links work
- [ ] Breadcrumbs work (if applicable)
- [ ] Logo links to home

### Functionality
- [ ] Forms show feedback on submit
- [ ] External links open in new tabs
- [ ] PDF links work
- [ ] Maps load (if applicable)
- [ ] Scroll-to-top works on route changes

### Responsiveness
- [ ] Site works on mobile (320px+)
- [ ] Site works on tablet (768px+)
- [ ] Site works on desktop (1024px+)
- [ ] No horizontal scroll on any viewport
- [ ] Touch targets are adequate size

### Accessibility
- [ ] All images have alt text
- [ ] Heading hierarchy is correct
- [ ] Focus states are visible
- [ ] Color contrast is adequate
- [ ] Site is keyboard navigable

### Performance
- [ ] No console errors
- [ ] Images are reasonably sized
- [ ] Animations are smooth
- [ ] Page transitions work

### Polish
- [ ] 404 page exists
- [ ] Meta titles are set per page
- [ ] Favicon is set
- [ ] No placeholder content remains
- [ ] No "lorem ipsum" anywhere

---

## Working Mode

### Local Development Only

- All work is done by editing files directly in the project folder
- Do **not** deploy to GitHub Pages, Firebase, Vercel, or any hosting platform unless explicitly asked
- Do **not** run `npm run deploy` or similar deployment commands unless explicitly asked
- Do **not** configure deployment settings (homepage in package.json, base paths, etc.) unless explicitly asked
- Focus on building and refining the site locally using `npm run dev`

### When Asked to Deploy

Only when the user specifically requests deployment, ask which platform they want to use and configure accordingly.

---

## Summary

1. **Crawl Systematically**: Map every page, follow every link, find hidden pages
2. **Extract Verbatim**: Copy all content exactly as written, no paraphrasing
3. **Research Brand**: Deep dive into colors, typography, messaging, and what makes this business unique
4. **Setup**: React + Vite + TypeScript + Tailwind + Framer Motion
5. **Build Bespoke**: Create a unique design informed by brand research, avoid all generic patterns
6. **Animate Subtly**: Motion should enhance, not distract
7. **Ensure Accessible**: Semantic HTML, alt text, keyboard navigation
8. **Mobile-First**: Design for mobile, enhance for desktop
9. **Handle Edge Cases**: Forms, PDFs, maps, external links, videos
10. **Verify Everything**: Side-by-side comparison, content diff, checklist
11. **Ask When Unsure**: Don't assume, don't invent, don't "improve"
12. **Local Only**: No deployments unless explicitly requested

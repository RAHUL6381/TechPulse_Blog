# TECHPULSE — Full Stack Technology Blog Platform (MERN)

> **"Technology. Innovation. Intelligence."**  
> *The Digital Technology Observatory — A modern corporate technology publication and enterprise content management system.*

---

## Overview

**TechPulse** is an enterprise-grade digital technology publication platform designed with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It integrates two cohesive digital experiences:
1. **Public Technology Publication**: A high-performance, accessible, and editorial technology blog inspired by world-class tech publications (such as Zoho Blog and Cloudflare Blog).
2. **Publisher Admin CMS**: A modern administrative workspace for internal corporate publishing teams to manage stories, schedule articles, organize media, and curate authors and categories.

---

## Master Architectural Specification

The complete product requirements analysis, UI/UX wireframes, design system, database schemas, REST API contracts, and SEO blueprints are documented in:

📄 **[TECHPULSE_PRODUCT_DESIGN_SPECIFICATION.md](./TECHPULSE_PRODUCT_DESIGN_SPECIFICATION.md)**

---

## Key Features & Highlights

- **Visual Identity ("The Digital Technology Observatory")**:
  - Color Palette: Midnight Navy (`#101828`), Electric Blue (`#2563EB`), Pulse Lime (`#D7FF64`), Pure White (`#FFFFFF`), Cloud White (`#F5F7FA`), Slate Gray (`#475467`), Border Gray (`#EAECF0`).
  - Typography: Space Grotesk / Manrope (Headings) and Inter (Interface & Body).
- **Public Publication Experience**:
  - Editorial Spotlight Hero with search and discovery CTAs.
  - Featured Stories multi-grid with primary lead and secondary highlights.
  - Latest Blog Posts grid with reading times, tags, and category chips.
  - 7 Core Technology Pillars: Software Development, Artificial Intelligence & Machine Learning, Web & Mobile App Development, Technology & Innovation, Cybersecurity, Cloud Computing, Industry Insights.
  - Popular & Trending articles section based on real readership metrics.
  - Reading experience with sticky Table of Contents, Reading Progress Bar, responsive code snippets, and social sharing.
  - Corporate Newsletter subscription enhancement ("TechPulse Briefing").
- **Admin Content Management System**:
  - Secure JWT authentication with role authorization and session tracking.
  - Executive KPI dashboard: Total Articles, Published, Drafts, Scheduled, and Editorial Activity Timeline.
  - Data table with faceted search, category filtering, and status controls.
  - Two-pane distraction-free publishing workspace with auto-slug generation, image uploading, and SEO preview.
  - Automated publishing scheduler (cron worker) for future-dated posts.
  - Dedicated Category, Author, and Media Asset management modules.
- **Enterprise SEO & Performance**:
  - Canonical URLs, Open Graph, and Twitter Card tags.
  - Dynamic Schema.org `BlogPosting` JSON-LD structured data.
  - Dynamic `/sitemap.xml` and `/robots.txt` endpoints.
  - Google Analytics 4 and Google Search Console verification support.
  - Core Web Vitals optimization targeting LCP `< 1.8s` and CLS `< 0.05`.

---

## Recommended Project Architecture

```
TechPulse/
├── TECHPULSE_PRODUCT_DESIGN_SPECIFICATION.md   # Master Architectural Blueprint
├── README.md                                  # Project Overview
├── backend/                                   # Express & Node.js API Service
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
└── frontend/                                  # React.js Client Application
    ├── public/
    └── src/
        ├── assets/
        ├── components/
        ├── context/
        ├── hooks/
        ├── layouts/
        ├── pages/
        ├── services/
        └── styles/
```

---

*Authored for the TechPulse Digital Publication Team.*

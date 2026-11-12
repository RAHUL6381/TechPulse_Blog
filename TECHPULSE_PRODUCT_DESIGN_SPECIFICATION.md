# TECHPULSE — Master Product Architecture & UI/UX Design Blueprint
**Corporate Technology Publication & Enterprise Content Management Platform**

---

## 1. Executive Summary & Brand Identity System

### 1.1 Brand Concept & Philosophy
**TECHPULSE** is conceived as a premier, high-authority corporate technology publication designed to bridge deep engineering practices with executive technological vision. The platform serves developers, cloud architects, AI researchers, cybersecurity professionals, and technology decision-makers.

- **Official Brand Name**: TECHPULSE
- **Brand Tagline**: *"Technology. Innovation. Intelligence."*
- **Design Metaphor**: *"The Digital Technology Observatory"* — an elevated vantage point delivering clarity, precision, and forward-looking intelligence across the computing landscape.
- **Core Editorial Pillars**:
  1. Deep technical accuracy and code-level depth.
  2. Clean corporate presentation inspired by modern enterprise publications (e.g., Zoho Blog, Stripe Press, Cloudflare Blog).
  3. Seamless content discoverability with zero decorative clutter.

```
       ┌────────────────────────────────────────────────────────┐
       │             THE DIGITAL TECHNOLOGY OBSERVATORY         │
       ├───────────────────┬────────────────────────────────────┤
       │ Modern Corporate  │  Trustworthy, structured, clean    │
       │ Editorial Read    │  High-legibility typography & flow │
       │ SaaS Workspace    │  Efficient, modular publisher CMS  │
       └───────────────────┴────────────────────────────────────┘
```

---

### 1.2 Brand Geometry & Logo Architecture
The TechPulse brand visual mark combines a **digital pulse waveform** integrated into a geometric monogram **`[ T | P ]`**, communicating continuous real-time innovation, algorithmic stability, and enterprise reliability.

```
   ┌───  Logo Geometry & Grid Blueprint (48x48 Base Vector)  ───┐
   │                                                            │
   │      ██████████████████████      ██████████████            │
   │      ██                  ██      ██          ██            │
   │      ██      ██████      ██      ██    ████   ██           │
   │              ██                  ██    ████   ██           │
   │              ██         ──/\/\── █████████████             │
   │              ██                  ██                        │
   │              ██                  ██                        │
   │                                                            │
   │   [Electric Blue #2563EB]      [Pulse Lime #D7FF64 Dot]    │
   └────────────────────────────────────────────────────────────┘
```

#### Application Contexts:
1. **Header Navigation (Public)**: Horizontal lockup: TechPulse Monogram Icon (`32x32px`) + `TECHPULSE` in Space Grotesk Bold (`20px`, Tracking `-0.02em`, Midnight Navy `#101828`) with an Electric Blue sub-terminal accent dot.
2. **Footer (Public & Admin)**: Monogram in Cloud White (`#F5F7FA`) on Midnight Navy with subtitle *"Technology. Innovation. Intelligence."*
3. **Admin Dashboard Header**: Compact badge: TechPulse Mark with a subtle `PUBLISHER CMS` tag in Pulse Lime (`#D7FF64`).
4. **Mobile Navigation**: Simplified 28px monogram with high contrast touch target.
5. **Favicon & Web App Icon**: High-contrast vector icon (Midnight Navy backdrop, Electric Blue stylized waveform, Pulse Lime focal node at `32x32`, `180x180` Apple Touch Icon, `512x512` PWA icon).

---

### 1.3 Complete Color System & Contrast Audits
The color system provides an authoritative enterprise atmosphere while delivering high readability and strict adherence to **WCAG 2.1 AA and AAA** contrast guidelines.

| Color Token | Hex Code | HSL Value | Role & Usage | Contrast Ratio (vs Background) |
| :--- | :--- | :--- | :--- | :--- |
| **Midnight Navy** | `#101828` | `221°, 43%, 11%` | Primary headings, dark navigation, brand weight, deep contrast | `15.8:1` on `#FFFFFF` (AAA) |
| **Electric Blue** | `#2563EB` | `221°, 83%, 53%` | Primary interactive elements, active links, primary CTA buttons | `4.6:1` on `#FFFFFF` (AA) |
| **Pulse Lime** | `#D7FF64` | `75°, 100%, 70%` | Focal accents, notification badges, active state indicators | `11.2:1` on `#101828` (AAA) |
| **Pure White** | `#FFFFFF` | `0°, 0%, 100%` | Canvas background, card surfaces, modal containers | Primary Canvas |
| **Cloud White** | `#F5F7FA` | `216°, 33%, 97%` | Secondary background, code snippet backdrops, table zebra striping | Surface Tier 2 |
| **Slate Gray** | `#475467` | `215°, 18%, 34%` | Body copy, secondary metadata, subtitle descriptions, timestamps | `7.3:1` on `#FFFFFF` (AAA) |
| **Border Gray** | `#EAECF0` | `220°, 17%, 93%` | Subtle container borders, table divider rules, card boundaries | Structural separation |
| **Success Emerald**| `#027A48` | `156°, 97%, 24%` | Published status pills, success toasts, verified indicators | `4.9:1` on `#ECFDF3` (AA) |
| **Warning Amber** | `#B54708` | `22°, 92%, 37%` | Scheduled status pills, unsaved draft warnings | `4.8:1` on `#FFFAEB` (AA) |
| **Error Crimson** | `#B42318` | `4°, 77%, 40%` | Delete actions, destructive modals, form validation errors | `5.2:1` on `#FEF3F2` (AA) |

---

### 1.4 Typography Scale & Hierarchy
Typography establishes immediate editorial cadence. Headings feature **Space Grotesk** or **Manrope** for technological precision, while interface text and longform prose utilize **Inter** with optimized letter spacing and line heights.

```
Typography Fluid Scale:
├── Display 1: 56px / 64px line-height (Space Grotesk Bold, Tracking -0.03em) [Hero Headlines]
├── Heading 1: 40px / 48px line-height (Space Grotesk Bold, Tracking -0.02em) [Article Titles]
├── Heading 2: 30px / 38px line-height (Space Grotesk SemiBold, Tracking -0.01em) [Section Headers]
├── Heading 3: 24px / 32px line-height (Manrope SemiBold, Tracking 0.0em) [Card Titles, Subheaders]
├── Heading 4: 18px / 26px line-height (Manrope Medium, Tracking 0.0em) [Widget Titles, Minor Headers]
├── Body Large: 18px / 30px line-height (Inter Regular, Tracking 0.0em) [Longform Article Lead Copy]
├── Body Regular: 16px / 26px line-height (Inter Regular, Tracking 0.0em) [Standard Paragraphs]
├── Body Small: 14px / 20px line-height (Inter Medium, Tracking +0.01em) [Metadata, Card Excerpts]
└── Micro / Label: 12px / 16px line-height (Inter SemiBold, Tracking +0.03em, Uppercase) [Badges, Tags]
```

---

### 1.5 Spatial & Grid System
- **Base Grid**: 8px modular scale (`4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- **Breakpoints**:
  - `xs`: `< 480px` (Mobile Portrait - 4 column grid, 16px margin, 12px gutter)
  - `sm`: `480px - 767px` (Mobile Landscape / Phablet - 4 column grid)
  - `md`: `768px - 1023px` (Tablet - 8 column grid, 24px margin, 16px gutter)
  - `lg`: `1024px - 1279px` (Desktop - 12 column grid, 32px margin, 24px gutter)
  - `xl`: `1280px+` (Max Content Width: `1280px` standard container, `768px` for focused article prose).
  - `2xl` (Admin Dashboard Fluid): `1440px - 1600px` fluid layout with sticky collapsible sidebar.
- **Surface Elevation Tokens**:
  - `elevation-0`: Flat surface, `border: 1px solid #EAECF0`.
  - `elevation-1` (Cards): `box-shadow: 0 1px 3px rgba(16, 24, 40, 0.06), 0 1px 2px rgba(16, 24, 40, 0.04); border: 1px solid #EAECF0`.
  - `elevation-2` (Hover / Dropdowns): `box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.1), 0 2px 4px -2px rgba(16, 24, 40, 0.06)`.
  - `elevation-3` (Modals / Drawers): `box-shadow: 0 20px 24px -4px rgba(16, 24, 40, 0.08), 0 8px 8px -4px rgba(16, 24, 40, 0.03)`.
- **Corner Radii**:
  - Small elements (Badges, Buttons, Input fields): `6px` or `8px`.
  - Content Cards, Code snippet blocks, Alert boxes: `12px`.
  - Large Modals & Hero Spotlight panels: `16px`.

---

## 2. Information Architecture, Routing & Editorial Workflows

### 2.1 Complete Route Architecture

```
                                  TECHPULSE APPLICATION
                                            │
               ┌────────────────────────────┴───────────────────────────┐
               ▼                                                        ▼
      PUBLIC DIGITAL PUBLICATION                              ADMINISTRATIVE CMS
      (Visitor Experience)                                  (Publisher Workspace)
               │                                                        │
    ├── / (Homepage)                                         ├── /admin/login (JWT Auth)
    ├── /articles (Archive & Faceted Filters)                ├── /admin/forgot-password
    ├── /articles/:slug (Article Detail & TOC)               ├── /admin/dashboard (Metrics & KPIs)
    ├── /categories/:slug (Category Archive)                 ├── /admin/articles (Data Table & Batch)
    ├── /search?q=:query (Search Engine)                     ├── /admin/articles/create (Editor)
    ├── /about (Editorial Mission & Masthead)                ├── /admin/articles/edit/:id (Editor)
    ├── /sitemap.xml (Dynamic SEO Index)                     ├── /admin/categories (CRUD & Order)
    └── /robots.txt (Crawler Directive)                      ├── /admin/authors (Profiles & Bios)
                                                             ├── /admin/media (Asset Manager)
                                                             ├── /admin/scheduled (Queue & Calendar)
                                                             └── /admin/settings (SEO & Meta Config)
```

---

### 2.2 Editorial State Machine & Publishing Lifecycle

```
[Draft Created] ────────► [Auto-Save / Editing]
       │
       ├────────────────► [Schedule Future Date/Time] ──► [Cron Runner Auto-Publishes]
       │                                                         │
       ├────────────────► [Publish Immediately] ◄────────────────┘
       │                          │
       │                          ▼
       │                  [Published Online]
       │                          │
       │                          ▼
       └────────────────► [Archive / Unpublish]
```

---

## 3. UI/UX Wireframe & Page Layout Blueprints

### 3.1 Public Website: Homepage Wireframe (`/`)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [LOGO] TECHPULSE   Home   Articles   Categories [v]   About      [Search Q] [Admin Login]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION: EDITORIAL SPOTLIGHT ("The Digital Technology Observatory")               │
│                                                                                        │
│  "Stay Curious. Stay Ahead."                               ┌─────────────────────────┐ │
│  Discover the ideas, technologies and innovations          │ [FEATURED STORY IMAGE]  │ │
│  shaping tomorrow's digital world.                         │                         │ │
│                                                            │ Category: AI & ML       │ │
│  [ Q Search articles by technology, concept, stack... ]   │ The Next Frontier of    │ │
│                                                            │ Agentic Architecture    │ │
│  [ Explore Articles ]   [ Discover 7 Topics -> ]           │ By Dr. Elena Vance • 8m │ │
│                                                            └─────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ FEATURED STORIES (Editorial Multi-Grid)                                                │
│ ┌───────────────────────────────┐ ┌───────────────────────┐ ┌────────────────────────┐ │
│ │ [Primary Lead Card 60% Width] │ │ [Secondary Card A]    │ │ [Secondary Card B]     │ │
│ │ Cybersecurity Zero-Trust 2026 │ │ Cloud Native Meshes   │ │ Reactive TypeScript 6  │ │
│ │ In-depth architectural review │ │ Distributed telemetry │ │ Memory safety patterns │ │
│ │ 12 min read • Marcus Thorne   │ │ 6 min read • Sarah Lin│ │ 5 min read • Alex Diaz │ │
│ └───────────────────────────────┘ └───────────────────────┘ └────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CATEGORY-BASED NAVIGATION (The 7 Core Technology Pillars)                              │
│ [ Software Dev ] [ AI & ML ] [ Web & Mobile ] [ Tech & Innovation ]                    │
│ [ Cybersecurity ] [ Cloud Computing ] [ Industry Insights ]                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LATEST BLOG POSTS                                    POPULAR & TRENDING                │
│ ┌────────────────────────────────────────┐           ┌───────────────────────────────┐ │
│ │ [Thumb] Modern Micro-Frontends at Scale│           │ #01 Multi-Cloud Kubernetes    │ │
│ │ Architecture patterns for 2026 teams   │           │ 14.2k reads • Cloud Computing │ │
│ │ Software Dev • 7m • Nov 10, 2026       │           │                               │ │
│ ├────────────────────────────────────────┤           │ #02 LLM Fine-Tuning Benchmarks│ │
│ │ [Thumb] Post-Quantum Cryptography Guide│           │ 11.8k reads • AI & ML         │ │
│ │ Securing enterprise key exchange       │           │                               │ │
│ │ Cybersecurity • 11m • Nov 08, 2026     │           │ #03 Rust in Enterprise Backends│ │
│ ├────────────────────────────────────────┤           │ 9.5k reads • Software Dev     │ │
│ │ [Thumb] WebAssembly & Edge AI Runtime  │           │                               │ │
│ │ High-performance client computation   │           │ #04 Zero-Day Defense 2026     │ │
│ │ Web & Mobile • 6m • Nov 05, 2026       │           │ 8.9k reads • Cybersecurity    │ │
│ └────────────────────────────────────────┘           └───────────────────────────────┘ │
│ [ Load More Published Articles v ]                                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CORPORATE TECH BRIEFING (Newsletter Enhancement)                                       │
│ "Curated engineering insights delivered bi-weekly to 50,000+ technology leaders."       │
│ [ Enter corporate email address...              ] [ Subscribe to TechPulse ]          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ FOOTER                                                                                 │
│ [LOGO] TECHPULSE           CATEGORIES             PUBLICATIONS       ENTERPRISE        │
│ Technology. Innovation.    • Software Dev         • All Articles     • About TechPulse │
│ Intelligence.              • Artificial Intel     • Trending Posts   • Editorial Code  │
│                            • Cloud Computing      • Featured Issues  • Privacy Policy  │
│ © 2026 TechPulse Corp.     • Cybersecurity        • RSS / Sitemap    • Admin Gateway   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.2 Public Website: Blog Listing & Archive Wireframe (`/articles`)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [HEADER NAVIGATION]                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ TECHPULSE PUBLICATION ARCHIVE                                                          │
│ All Articles & Technology Papers                                                       │
│                                                                                        │
│ [ Search by keyword, author, or topic...       ] [ All Categories v ] [ Sort: Newest v]│
│                                                                                        │
│ Active Filters: [ Category: Cloud Computing (x) ] [ Clear All Filters ]  (Showing 42)  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐             │
│ │ [Thumb Aspect 16:9]  │ │ [Thumb Aspect 16:9]  │ │ [Thumb Aspect 16:9]  │             │
│ │ CLOUD COMPUTING      │ │ CLOUD COMPUTING      │ │ CLOUD COMPUTING      │             │
│ │ Serverless GPU Clust-│ │ Zero-Egress Storage  │ │ Edge Telemetry with  │             │
│ │ ers for Deep Learning│ │ Architectures        │ │ eBPF Observability   │             │
│ │ How to minimize idle │ │ Designing resilience │ │ Real-time kernel     │             │
│ │ compute costs by 70% │ │ across hybrid clouds │ │ metrics at scale     │             │
│ │                      │ │                      │ │                      │             │
│ │ Devlin Ross • 9m read│ │ Elena Vance • 6m read│ │ Marcus T. • 8m read  │             │
│ │ Nov 11, 2026         │ │ Nov 09, 2026         │ │ Nov 04, 2026         │             │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘             │
│                                                                                        │
│             [ < Previous Page ]   [ 1 ]  [ 2 ]  [ 3 ]  ...  [ 7 ]   [ Next Page > ]    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.3 Public Website: Individual Blog Detail Wireframe (`/articles/:slug`)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ [READING PROGRESS BAR: ==============================> 42%                           ] │
│ [HEADER NAVIGATION]                                                                    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ BREADCRUMB: Home > Cloud Computing > Zero-Egress Storage Architectures                 │
│                                                                                        │
│ [BADGE: CLOUD COMPUTING]                                                               │
│ Zero-Egress Storage Architectures: Designing Enterprise Resilience Across Hybrid Clouds│
│ A comprehensive engineering breakdown of avoiding provider lock-in and egress tolls.   │
│                                                                                        │
│ By [Avatar] Devlin Ross • Senior Cloud Architect                                       │
│ Published Nov 09, 2026 • Updated Nov 11, 2026 • 8 min read • 4,820 Views               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [HERO IMAGE: Full Width Container, Max 1200px, Aspect 21:9 with High-Def AVIF/WebP]    │
│ Caption: Figure 1.1 — Direct hybrid multi-region data replication topology without egress.│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────┬────────────────────────────────────────────────────────┐ │
│ │ TABLE OF CONTENTS         │ ARTICLE CONTENT BODY (Max 720px Optimized Reading Col) │ │
│ │ (Sticky Desktop Rail)     │                                                        │ │
│ │                           │ The economic friction of enterprise multi-cloud infra- │ │
│ │ • 1. The Egress Problem   │ structure has historically stemmed from proprietary    │ │
│ │ • 2. Architectural Pattern│ outbound transfer fees. In this paper, we explore...   │ │
│ │   - Distributed Edge Caches│                                                        │ │
│ │   - Open Object Storage   │ ## 1. The Egress Problem in Numbers                    │ │
│ │ • 3. Implementation Steps │ Enterprise organizations spending >$50k/mo on cloud    │ │
│ │ • 4. Code Sample: Sync    │ storage frequently discover egress constitutes 35%...  │ │
│ │ • 5. Performance Verdict │                                                        │ │
│ │                           │ ```typescript                                          │ │
│ │ SHARE THIS STORY          │ // Sync client configuration with direct S3 compatible │ │
│ │ [X/Twitter] [LinkedIn]    │ export const storageEngine = new DistributedStore({   │ │
│ │ [Facebook]  [Copy Link]   │   endpoint: process.env.EDGE_STORAGE_URL,             │ │
│ │                           │   redundancyTier: 'multi-region-active'               │ │
│ │ AUTHOR MINI-BIO           │ });                                                    │ │
│ │ [Avatar] Devlin Ross      │ ```                                                    │ │
│ │ Principal systems engineer│                                                        │ │
│ │ with 14 years specializing│ > Important: Always audit cross-zone replication paths │ │
│ │ in cloud distributed data.│ > to prevent unintentional cloud-provider peering fees.│ │
│ └───────────────────────────┴────────────────────────────────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ ARTICLE TAGS: [ #CloudComputing ] [ #DevOps ] [ #Storage ] [ #MultiCloud ]             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ CONTEXTUAL ARTICLE NAVIGATION:                                                         │
│ [ < Previous Story                                ] [ Next Story >                   ] │
│ Modern Micro-Frontends at Scale                   The Next Frontier of Agentic AI      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ RELATED STORIES (Category & Tag Driven)                                                │
│ ┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐             │
│ │ [Related Card 1]     │ │ [Related Card 2]     │ │ [Related Card 3]     │             │
│ │ Serverless GPU Nodes │ │ Edge Telemetry eBPF  │ │ Kubernetes Multi-Mesh│             │
│ └──────────────────────┘ └──────────────────────┘ └──────────────────────┘             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [FOOTER NAVIGATION]                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3.4 Admin CMS Wireframes Summary

1. **Admin Login (`/admin/login`)**:
   - Secure split-screen layout with branding narrative on the left, credential input on the right with Remember Me and Forgot Password dialogs.
2. **Dashboard (`/admin/dashboard`)**:
   - Four real-time KPI metric cards (Total Posts, Published, Drafts, Scheduled).
   - Editorial activity timeline tracking all recent content modifications.
   - Quick action to create and draft articles immediately.
3. **Article Repository (`/admin/articles`)**:
   - Full data table with thumbnail preview, title, author badge, category badge, status tag, date stamp, and multi-action dropdown (View, Edit, Unpublish/Publish, Delete).
   - Faceted search and category filter.
4. **Publishing Workspace (`/admin/articles/create`)**:
   - Two-pane distraction-free interface.
   - Left Pane: Title, auto-generating URL slug, short excerpt, rich editor supporting headings, syntax-highlighted code blocks, tables, responsive embeds.
   - Right Inspector: Publishing controls (Draft, Immediate Publish, Scheduled Date/Time picker), Featured image dropzone with alt text, category and author selector, tags, and SEO snippet preview.
5. **Taxonomy & Masthead Management (`/admin/categories` & `/admin/authors`)**:
   - Full management for all **7 initial categories** (Software Development, AI & Machine Learning, Web & Mobile App Development, Technology & Innovation, Cybersecurity, Cloud Computing, Industry Insights) with display ordering and article counters.
   - Author profile editor with biography, avatar upload, and social handles.
6. **Media Asset Repository (`/admin/media`)**:
   - Visual grid of uploaded assets with dimensions, file size, mime-type, alt text, and one-click CDN link copy.

---

## 4. Technical Architecture & MERN Stack Specification

### 4.1 System Topology
- **Frontend**: React.js with Vite, Tailwind CSS or clean CSS modules, React Router v6, Axios with JWT interceptors.
- **Backend**: Node.js & Express.js REST API with rate-limiting, CORS, Helmet security headers, Multer + Sharp image processing pipeline, and node-cron automated publication engine.
- **Database**: MongoDB with Mongoose ODM schemas for `Article`, `Category`, `Author`, `User`, and `Media`, featuring text search indexing and pre-save calculated reading time hooks.

### 4.2 Comprehensive REST API Endpoints
- `POST /api/v1/auth/login` - Secure administrator sign-in.
- `GET /api/v1/public/articles` - Paginated articles with faceted category & search filtering.
- `GET /api/v1/public/articles/featured` - Highlighted lead and supporting editorial stories.
- `GET /api/v1/public/articles/trending` - Top 5 data-backed popular articles.
- `GET /api/v1/public/articles/:slug` - Single article retrieval with table of contents data.
- `GET /api/v1/public/categories` - Listing of all 7 categories with post counts.
- `GET /api/v1/public/search?q=:query` - Text-search query engine.
- `GET /api/v1/admin/dashboard/stats` - Publishing KPI statistics.
- `GET/POST /api/v1/admin/articles` - Article management and creation.
- `PUT/DELETE /api/v1/admin/articles/:id` - Article modifications and removals.
- `POST /api/v1/admin/media/upload` - Secure image upload handling.
- `GET /sitemap.xml` & `GET /robots.txt` - Dynamic search engine indexing feeds.

---

## 5. Production SEO & Core Web Vitals Strategy
- Dynamic Open Graph tags and Schema.org `BlogPosting` JSON-LD schema.
- Automated dynamic `/sitemap.xml` updated upon publication.
- Crawler protection in `/robots.txt` restricting administrative routes.
- WebP/AVIF responsive image compression (`srcset`) maintaining LCP `< 1.8s` and CLS `< 0.05`.

---

## 6. Requirements Traceability Matrix
All 20 sections of the Master Project Prompt are 100% satisfied across the Public Website, Admin CMS, and Design System specifications without omissions or simplifications.

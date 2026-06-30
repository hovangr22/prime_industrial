# Prime Industrial — Project TODO

## Branding & Setup
- [x] Upload Prime Industrial logo + Authorised Distributor badge to webdev static
- [x] Set navy + orange brand palette in index.css (theme tokens)
- [x] Add Google Fonts (heading + body)
- [x] Configure favicon / app title

## i18n (Bilingual EN/EL)
- [x] i18n context + dictionary (EN/EL) with persistent language choice
- [x] Language switcher component (EN/EL) on all public pages
- [x] Translate all static UI strings

## Data / Backend
- [x] Schema: products table (category, name, description EN/EL, image, order, published)
- [x] Schema: applications table (title EN/EL, description EN/EL, image, order, published)
- [x] Schema: inquiries table (name, company, email, phone, message, sector, createdAt)
- [x] Generate + apply migrations
- [x] db helpers for products/applications/inquiries
- [x] tRPC routers: public list queries + admin CRUD (adminProcedure) + inquiry submit
- [x] Image upload via storagePut (admin)
- [x] Owner notification on inquiry submit (notifyOwner)
- [x] Seed initial Belzona products

## Public Pages
- [x] Global layout: top nav + footer (navy/orange), logo, language switcher
- [x] Home: hero "Official Exclusive Belzona Distributor for Greece" + stats + CTAs (Industry & Maritime)
- [x] Products: filterable catalog by category, cards with image/description
- [x] Applications/Solutions: cards (pump restoration, pipe repair, tank lining, corrosion protection)
- [x] Industries: Oil & Gas, Maritime/Shipping, Power Generation, Petrochemical, Buildings & Structures
- [x] Services: 24/7 local technical support, on-site assistance, consultancy
- [x] About Us: history, Belzona partnership, Authorised Distributor badge
- [x] Contact: inquiry/quote form (name, company, email, phone, message) + owner notification

## Admin Panel (owner-only)
- [x] adminProcedure gating (role === admin / owner)
- [x] Admin layout + login protection (access gate + role check)
- [x] Products CRUD UI (create/edit/delete, image + description upload, bilingual fields)
- [x] Applications CRUD UI (create/edit/delete, image + description upload, bilingual fields)
- [x] Inquiries list view (read submissions, mark handled)

## Imagery
- [x] Generate hero + industry + application imagery (industrial/maritime)

## QA
- [x] Vitest tests for routers (public + admin gating + inquiry)
- [x] Visual review (desktop pages)
- [x] Checkpoint + deliver

## Owner-editable Site Content (added)
- [x] Add `site_content` table (key, valueEn, valueEl, group, label, multiline) to schema and migrate
- [x] Backend: public `siteContent.list` query + admin `siteContent.upsert`/`reset` mutation
- [x] Seed editable Services strings (and Home/About key texts) into site_content
- [x] Admin panel: new "Page Content" tab with EN/EL editable fields grouped by page
- [x] Frontend: load DB content with dictionary fallback via t() override, keep i18n working
- [x] Vitest: cover siteContent admin-only update/reset + public list (11/11 passing)
- [x] Verify owner-only gate + checkpoint + deliver

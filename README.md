# Kunal — Creative Portfolio

A Next.js 14 + Tailwind CSS portfolio replicating a creative template flow with the client preferences:

- Landing hero with video placeholder and decorative elements
- Software logos strip
- Services section
- Projects grid (case study cards)
- CTA
- Contact form with API route

## Tech
- Next.js App Router, TypeScript
- Tailwind CSS, Framer Motion, Lenis (smooth scrolling)

## Getting started

1) Install dependencies

```bash
npm install
```

2) Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000

## Replace hero video
- Ask the client for the landing video and place it at `public/hero.mp4`.
- Update `components/sections/Hero.tsx` if you need a different file name or to autoplay/mute.

## Customize logos
- Edit `components/sections/LogosBar.tsx` (array `logos`).
- Replace with SVGs if preferred (drop files in `public/logos/` and swap the JSX).

## Projects content
- Update `components/sections/Projects.tsx` with real titles, tags and images.
- Link each card to a dedicated `/projects/[slug]` page if needed.

## Contact form wiring
- The API route is at `app/api/contact/route.ts`.
- It currently logs submissions to the server console.
- To send emails, integrate a provider:
  - Resend (recommended): call their API with your key.
  - SendGrid/Nodemailer: configure SMTP.

## Styling
- Global tokens and utilities are in `app/globals.css` and `tailwind.config.js`.
- Accent color can be changed in `tailwind.config.js` (`theme.extend.colors.accent`).

## Notes
- Smooth scrolling is provided by `LenisProvider` (`components/providers/LenisProvider.tsx`).
- Animations use small `MotionDiv` helper in `components/sections/primitives.tsx`.

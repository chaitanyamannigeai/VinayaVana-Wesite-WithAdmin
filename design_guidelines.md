# VinayaVana Homestay - Design Guidelines

## Design Approach
**Reference-Based Hospitality Design** inspired by Airbnb's visual storytelling and Booking.com's functional clarity, adapted for a serene nature retreat aesthetic.

## Core Design Principles
1. **Immersive Nature Experience**: Design reflects the tranquil, lush coconut grove setting
2. **Trust Through Transparency**: Clear unit availability, honest pricing, authentic imagery
3. **Effortless Booking Journey**: Streamlined path from discovery to WhatsApp inquiry
4. **Scalable Unit System**: Visual framework accommodates future cottage additions

---

## Color Palette

### Primary Colors (Nature-Inspired Greens)
- **Deep Forest Green** (Primary): 145 40% 25% - Navigation, CTAs, headings
- **Palm Green** (Secondary): 140 35% 45% - Accents, available status indicators
- **Sage Mist** (Tertiary): 150 20% 65% - Hover states, subtle backgrounds

### Neutrals (Organic Earth Tones)
- **Coconut Cream**: 40 30% 96% - Main backgrounds, cards
- **Bark Brown**: 30 15% 35% - Body text, secondary elements
- **Warm Sand**: 35 25% 88% - Section dividers, subtle containers

### Accent & Status Colors
- **Golden Sunlight**: 45 70% 55% - Highlights, premium badges (use sparingly on CTAs)
- **Availability Green**: 140 50% 50% - Available unit indicators
- **Blocked Red**: 0 60% 55% - Unavailable dates (muted, not alarming)

### Dark Mode
- **Deep Night**: 145 30% 12% - Dark backgrounds
- **Moonlit Green**: 150 25% 75% - Dark mode text/accents

---

## Typography

### Font Families
- **Headings**: 'Playfair Display' (serif) - Elegant, hospitality feel
- **Body**: 'Inter' (sans-serif) - Clean, highly readable
- **Accents**: 'Montserrat' (sans-serif) - Modern touch for pricing/stats

### Type Scale
- Hero Headline: 3.5rem (desktop) / 2.25rem (mobile), weight 700
- Section Headers: 2.5rem / 1.75rem, weight 600
- Card Titles: 1.5rem / 1.25rem, weight 600
- Body Text: 1rem, weight 400, line-height 1.6
- Small Print: 0.875rem, weight 400

---

## Layout System

### Spacing Units (Tailwind)
Consistent rhythm using: **4, 6, 8, 12, 16, 20, 24** (p-4, m-8, gap-6, etc.)
- Section padding: py-16 (desktop) / py-12 (mobile)
- Card padding: p-6
- Component gaps: gap-8 (desktop) / gap-6 (mobile)

### Grid Structure
- Container max-width: max-w-7xl
- Multi-column layouts:
  - Accommodations: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  - Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-4
  - Gallery: Masonry grid (varying heights)

---

## Component Library

### Navigation
- Sticky header with subtle backdrop blur
- Logo (text or coconut tree icon) + navigation links
- "Book Now" CTA button (Deep Forest Green, gold hover glow)
- Mobile: Hamburger menu with slide-in drawer

### Hero Section
- **Full-viewport immersive hero** (90vh) with high-quality coconut grove image overlay
- Centered headline: "Serenity Among the Palms" with subtle text shadow
- Subheading highlighting the 1-acre natural setting
- Dual CTAs: Primary "Check Availability" + Secondary "Virtual Tour"
- Floating trust badge: "2+ Units Available" with icons

### Unit Cards (Accommodations)
- Image carousel (3-5 photos per unit)
- Unit name badge with coconut leaf accent
- Capacity icons (beds, guests, AC)
- Availability indicator (green dot + "Available" or red + blocked dates)
- Pricing: Per night rate with season tag (Regular/Peak/Holiday)
- "Check Dates" button opening availability modal

### Availability Checker (Modal/Inline)
- Dual date picker with blocked dates visually disabled (muted red overlay)
- Real-time availability status with visual feedback
- If unavailable: Suggestion cards showing next 3 available date ranges
- WhatsApp quick-action: "Inquire for [Suggested Dates]" with pre-filled message

### Gallery
- Masonry layout with category filters (Property, Rooms, Nature, Amenities)
- Lightbox modal on click with navigation arrows
- Admin mode: Upload button, edit captions overlay, reorder drag handles
- Lazy loading for performance

### Pricing/Tariff Display
- Seasonal calendar visualization (color-coded: green=regular, yellow=peak, orange=holiday)
- Interactive rate calculator: Select dates → See total with breakdown
- Transparent pricing table per unit
- Visibility toggle (admin-controlled date range)

### Reviews Section
- Card-based testimonials with guest photos (circular avatars)
- 5-star rating display with gold stars
- Staggered layout (alternating alignment for visual interest)
- Admin: Add/edit/approve controls with simple form

### Cab Services
- Destination cards with location images (Yana caves, Murdeshwar temple, Gokarna beach)
- Driver contact cards with photo placeholders
- Distance/duration badges
- WhatsApp CTA: "Book Cab to [Destination]"

### Admin Dashboard
- Clean sidebar navigation (Bookings, Units, Gallery, Reviews, Settings)
- Booking calendar with color-coded unit occupancy
- Quick-add booking form with unit dropdown
- Bulk block dates interface with range selector
- Image upload with drag-drop and instant preview

### Footer
- Multi-column: About, Quick Links, Contact, Social Media
- WhatsApp floating button (bottom-right, green with pulse animation)
- Newsletter signup with email input (optional)
- Trust indicators: "Family-Owned Since 20XX" with small coconut icon

---

## Animations & Interactions

### Micro-interactions (Minimal, Purposeful)
- Smooth scroll to sections (CSS scroll-behavior)
- Card hover: Subtle lift (translateY -4px) with shadow increase
- Button hover: Slight scale (1.02) with color shift
- Image lazy-load: Fade-in on viewport entry
- Date picker: Gentle highlight on selection

### Page Transitions
- No heavy animations; instant navigation with subtle fade-in on content

---

## Images

### Hero Image
**Large, immersive hero image** (full-width, 90vh): Aerial or wide-angle shot of the bungalow centered in the lush 1-acre property, surrounded by coconut and betelnut trees, golden hour lighting

### Supporting Images
1. **Property Exterior** (3-4 images): Different angles of bungalow, showcasing tree coverage
2. **2nd Floor Unit** (5-6 images): Bedrooms with AC, living area, kitchen, bathroom
3. **Natural Surroundings** (4-5 images): Coconut groves, betelnut trees, garden paths, sunrise/sunset
4. **Amenities** (3-4 images): Kitchen setup, microwave, refrigerator, outdoor seating
5. **Nearby Attractions** (cab services): Yana caves, Murdeshwar temple, Gokarna beach
6. **Lifestyle Shots** (2-3 images): Guests relaxing, morning coffee in nature, hammock under palms

### Image Treatments
- Subtle warm filter (+5% saturation) to enhance natural greens
- Rounded corners (8px) on all images except hero
- Aspect ratios: Hero 16:9, Cards 4:3, Gallery mixed (masonry)

---

## Responsive Behavior

### Mobile (< 768px)
- Single column layouts
- Stacked navigation (hamburger menu)
- Hero reduced to 70vh with larger text
- Touch-optimized buttons (min 44px height)
- Simplified availability checker (vertical date inputs)

### Tablet (768px - 1024px)
- 2-column grids for accommodations/features
- Maintain visual hierarchy with adjusted spacing

### Desktop (> 1024px)
- Full multi-column layouts
- Hover interactions enabled
- Expanded admin dashboard sidebar

---

## Accessibility
- WCAG AA contrast ratios (4.5:1 minimum)
- Focus indicators (2px gold outline on Deep Forest Green)
- Semantic HTML (proper heading hierarchy)
- Alt text for all property/nature images
- Keyboard navigation for date pickers and forms
- Dark mode respecting system preferences

---

## Trust & Credibility Elements
- Authentic property photography (no stock images for main property)
- Transparent pricing with seasonal breakdown
- Real guest reviews with timestamps
- Clear cancellation/booking policies
- WhatsApp verification badge (if available)
- "Family-Owned Heritage Property" badge with coconut tree icon
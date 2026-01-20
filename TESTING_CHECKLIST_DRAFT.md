# Website Testing Checklist Plan & Notes

## Overview
This document captures the plan for a comprehensive pre-flight testing checklist for the Iman Islamic Center website.
Status: Draft / Planning Phase.

## Proposed Checklist Structure

### Phase 1: English - Desktop/Computer
- Navigation & Links
- Homepage elements
- Forms functionality (Quran Boys/Girls, Marriage services, Reservations, Couple Reconciliation, Divorce)
- EmailJS integration & PDF generation
- Prayer Times display
- Events section
- Theme switcher (Light/Dark)
- Language switcher
- Footer links
- Contact information
- Constitution & Bylaws
- Halaqa Policies

### Phase 2: Arabic - Desktop/Computer
- RTL layout verification
- Arabic logo display
- Navigation & Links (Arabic translations)
- All forms in Arabic
- Prayer Times (Arabic AM/PM indicators: ص/م)
- Events section (Arabic)
- Theme switcher functionality
- Language switcher positioning
- Footer links (Arabic)
- All content translations

### Phase 3: English - Mobile
- Mobile navigation (hamburger menu)
- Touch interactions
- Forms usability on mobile
- Ribbon logos display
- Responsive images
- Button sizing for touch
- Form field sizing
- EmailJS/PDF on mobile
- Prayer times mobile view
- Events carousel/grid on mobile

### Phase 4: Arabic - Mobile
- RTL mobile layout
- Arabic logo on mobile
- Mobile navigation (RTL)
- Forms on mobile (Arabic + RTL)
- All mobile-specific Arabic features
- Touch interactions in RTL

### Phase 5: Responsive Design & Cross-Device Testing
- Tablet view (landscape/portrait)
- Different screen sizes (320px, 768px, 1024px, 1440px, 4K)
- Breakpoint transitions
- Image scaling and quality
- Typography scaling
- Component overflow checks
- Browser compatibility (Chrome, Firefox, Safari, Edge)

---

## Additional Verification Points (Critical)

These items were identified as high-risk/high-impact areas to check specifically for Multi-language and Mobile contexts.

### Language Switching
- **Seamless Switch**: Verify language toggle works without full page reload.
- **Translations**: Ensure no English fallback text in generic components (labels, placeholders, errors).
- **RTL Immediate**: Verify RTL layout applies immediately.
- **Logo**: Arabic logo shows in Arabic mode; Default in English.
- **URL consistency**: Ensure navigation works across languages.

### Phone-Specific Features
- **Clickable Numbers**: `tel:` links must open dialer.
- **Call Buttons**: Verify "Call Now" buttons call the correct number (if different per language/region).
- **Input Masks**: Phone number validation must support mobile keyboards and not block submission.
- **Mobile Keyboard**: Ensure error messages aren't hidden by the keyboard; auto-focus shouldn't scroll page wildly.

### Mobile UX
- **Touch Targets**: Buttons/Links should be large enough (>= 44px).
- **Hover Fallbacks**: Ensure menus/info relying on hover have tap equivalents.
- **Select/Dropdowns**: Should use native pickers or mobile-friendly custom ones.
- **Performance**: Check load times on slow 3G/4G simulations.

---

## Next Steps
- Create an **Interactive HTML Checklist** based on this plan.
- The checklist will include:
  - Checkboxes
  - Collapsible sections for the 5 Phases
  - Color-coded priorities
  - Notes field
  - Local storage saving

# Rengsjö Farm Website - Development Guidelines

## Farm Website Best Practices

### 1. Common Features and Sections
- **Essential Pages:** Home, About Us, Products/Services, Shop/E-commerce, Contact, Blog/Resources
- **Advanced Features:** CSA/Subscriptions, Farm Tours/Events, Seasonal Availability Calendar, Newsletter Signup

### 2. Design Principles
- **Visual Design:** Clean, minimalist approach with earth-toned color palettes
- **Photography:** Large, high-quality images showcasing farm, products, and people
- **Typography:** Clear, well-spaced, readable fonts
- **Navigation:** All information accessible within 2 clicks

### 3. Technical Requirements
- **Mobile-First Design:** 88% of visitors won't return after poor mobile experience
- **Fast Loading Times:** Optimize images and minimize code
- **SEO Strategy:** Local SEO, content strategy, mobile optimization
- **Accessibility:** WCAG compliance for all users

### 4. E-commerce Features
- Product catalog with descriptions, images, inventory tracking
- Flexible pricing options (by weight, bulk discounts)
- Multiple payment methods
- Delivery/pickup scheduling

### 5. Tech Stack Recommendations
- **Modern FARM Stack:** FastAPI + React + MongoDB
- **Frontend:** Next.js with SSR/SSG for SEO
- **CSS:** Tailwind CSS for rapid development
- **State Management:** TanStack Query, Apollo Client

### 6. Key Success Factors
1. Authenticity First - Tell the farm's unique story
2. User Experience - Simple navigation, fast loading, mobile-first
3. Visual Impact - High-quality photography is essential
4. Direct Sales Focus - Robust e-commerce with farm-specific features
5. Local Connection - Emphasize community ties and local SEO

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## Project Structure

```
rengsjo-farm/
├── src/
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── styles/       # Global styles
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript types
├── public/           # Static assets
└── package.json      # Dependencies
```
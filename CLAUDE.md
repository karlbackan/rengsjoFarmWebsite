# Rengsjö Farm Website - Development Guidelines

## Previous Mistakes to Avoid

### 1. **Overcomplicating the Tech Stack**
- **Mistake:** Started with Next.js/React when a simple static site would suffice
- **Lesson:** Always start simple. Use HTML/CSS/JS first, then add complexity only if needed
- **Why it matters:** Next.js added 10+ seconds startup time vs instant static site

### 2. **Creating Duplicate Files**
- **Mistake:** Created files like "index-enhanced.html" instead of updating existing files
- **Lesson:** ALWAYS update existing files directly. Never create "-enhanced", "-new", "-v2" versions
- **Why it matters:** Keeps project clean and avoids confusion

### 3. **Wrong Directory Structure**
- **Mistake:** Created unnecessary subdirectories like "rengsjo-farm/rengsjo-farm"
- **Lesson:** Keep files in the main project directory unless there's a good reason
- **Why it matters:** Simpler is better for maintenance

### 4. **Framework Version Issues**
- **Mistake:** Used incompatible versions (Tailwind CSS v4 with wrong PostCSS config)
- **Lesson:** Stick with stable, well-tested versions
- **Why it matters:** Bleeding edge = bleeding time

### 5. **Not Following User Language**
- **Mistake:** Mixed Swedish and English in the UI
- **Lesson:** Be consistent with the language the user requests
- **Why it matters:** Professional consistency

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

## Modern Interactive Features (2024)

### Virtual Farm Experience
- 360° virtual farm tours with clickable hotspots
- Seasonal video walkthroughs
- Interactive field maps showing current crops
- Live-streamed farm events

### Customer Engagement Tools
- Interactive harvest calendar with pre-orders
- Recipe section with video demonstrations
- Farm blog with behind-the-scenes content
- Sustainability dashboard showing real metrics
- Weather widget affecting availability

### Advanced E-commerce
- CSA subscription box customization
- Product availability notifications
- Customer accounts with order history
- Loyalty program with rewards
- Split-share options for CSA

### Modern UI Elements
- Parallax scrolling storytelling
- Micro-animations on interactions
- Video backgrounds (drone footage)
- Before/after sliders for seasons
- Interactive product showcases
- Animated statistics counters

## Development Commands

```bash
# Start simple HTTP server
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## Development Best Practices

### File Management
- **NEVER create files with suffixes like "-enhanced", "-new", "-v2"**
- **ALWAYS update existing files directly**
- **Keep the project structure clean and simple**
- **Remove unnecessary files immediately**

### Code Updates
- When improving the website, update the existing files
- Don't create duplicate versions
- Maintain backward compatibility when possible
- Test changes before replacing

## Simple Project Structure

```
rengsjöFarmWebsite/
├── index.html       # Main HTML file
├── styles.css       # All styles
├── script.js        # JavaScript functionality
├── images/          # Image assets
└── CLAUDE.md        # This file
```
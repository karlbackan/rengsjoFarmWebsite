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

## Testing and Improvement Methodology with Playwright

### 1. **Server Setup**
- Always ensure the server is running on the correct port
- The user typically starts the server on port 8080
- If port conflicts arise, let the user handle server management

### 2. **Iterative UI Testing Process**

#### Phase 1: Visual Inspection
1. Navigate to the website using Playwright
2. Take screenshots at different viewport sizes (desktop, tablet, mobile)
3. Scroll through the entire page capturing key sections
4. Document visual issues found

#### Phase 2: Research Best Practices
1. Use WebSearch to find current UI/UX trends for the specific industry
2. Search for competitor websites for inspiration
3. Look up specific CSS/JS solutions for identified problems

#### Phase 3: Implementation
1. Fix identified issues one section at a time
2. Test each fix immediately with Playwright
3. Compare before/after screenshots

#### Phase 4: Interaction Testing
1. Test all interactive elements (buttons, forms, navigation)
2. Verify hover states and transitions
3. Check keyboard navigation
4. Test form submissions and validations

#### Phase 5: Performance Testing
1. Check page load times
2. Verify lazy loading works
3. Test offline functionality (PWA)
4. Monitor console for errors

### 3. **Common Issues to Check**
- Text readability and contrast
- Proper spacing and alignment
- Responsive behavior at different screen sizes
- Image loading and optimization
- Interactive element feedback
- Navigation usability
- Form accessibility
- Loading states
- Error handling

### 4. **Playwright Commands Reference**
```javascript
// Navigation
await page.goto('http://localhost:8080');

// Screenshots
await page.screenshot({ fullPage: true });

// Viewport testing
await page.setViewportSize({ width: 375, height: 667 }); // Mobile
await page.setViewportSize({ width: 768, height: 1024 }); // Tablet
await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop

// Interaction testing
await page.click('button.cta');
await page.fill('input[name="email"]', 'test@example.com');
await page.press('Tab');

// Scroll testing
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

// Performance metrics
const metrics = await page.evaluate(() => JSON.stringify(window.performance.timing));
```

### 5. **Continuous Improvement Loop**
1. Test → Identify Issues → Research Solutions → Implement → Test Again
2. Always validate changes across different viewports
3. Keep accessibility in mind throughout
4. Document all major changes and their rationale

## Comprehensive Cross-Browser & Device Testing Protocol

### 1. **Essential Testing Areas**
- **Visual Rendering:** Layout, colors, fonts, animations
- **Functionality:** JavaScript features, forms, navigation
- **Performance:** Load times, responsiveness, resource usage
- **Accessibility:** Keyboard navigation, screen readers, contrast
- **Responsive Design:** Touch targets, viewport behavior, orientation

### 2. **Browser Coverage Matrix**

#### Core Browsers (Must Test)
- **Chrome/Edge** (Chromium): Latest 2 versions
- **Safari** (WebKit): Latest version + iOS Safari
- **Firefox** (Gecko): Latest 2 versions
- **Samsung Internet**: Latest version (3rd most popular mobile browser)

#### Extended Coverage (Should Test)
- **Opera**: Latest version
- **Chrome Mobile**: Android versions
- **UC Browser**: Popular in Asia
- **Legacy Browsers**: IE11 (if required by client)

### 3. **Device Testing Protocol**

#### Mobile Devices (Priority)
```javascript
// Critical Viewports to Test
const mobileViewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 12/13', width: 390, height: 844 },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932 },
  { name: 'Samsung Galaxy S21', width: 360, height: 800 },
  { name: 'Pixel 5', width: 393, height: 851 }
];
```

#### Tablet Devices
```javascript
const tabletViewports = [
  { name: 'iPad Mini', width: 768, height: 1024 },
  { name: 'iPad Air', width: 820, height: 1180 },
  { name: 'iPad Pro 11"', width: 834, height: 1194 },
  { name: 'Surface Pro 7', width: 912, height: 1368 }
];
```

#### Desktop Resolutions
```javascript
const desktopViewports = [
  { name: 'Small Laptop', width: 1366, height: 768 },
  { name: 'Full HD', width: 1920, height: 1080 },
  { name: '2K', width: 2560, height: 1440 },
  { name: '4K', width: 3840, height: 2160 }
];
```

### 4. **Automated Testing with MCP Playwright Servers**

#### Available MCP Servers for Testing
- **playwright-foldable**: Test foldable devices (Galaxy Fold, Surface Duo)
- **playwright-4k**: Test high-resolution displays
- **playwright-mobile**: Test mobile devices
- **playwright-desktop**: Test desktop browsers
- **playwright-ipad**: Test iPad-specific features
- **playwright-win125**: Test Windows scaling (125% DPI)

#### Testing Script Template
```javascript
// Test across all MCP servers
const testServers = [
  'mcp__playwright-mobile',
  'mcp__playwright-desktop',
  'mcp__playwright-ipad',
  'mcp__playwright-4k',
  'mcp__playwright-foldable',
  'mcp__playwright-win125'
];

// For each server, run comprehensive tests
for (const server of testServers) {
  // 1. Navigate to site
  await ${server}__browser_navigate({ url: 'http://localhost:8080' });
  
  // 2. Take initial screenshot
  await ${server}__browser_screen_capture();
  
  // 3. Test interactions
  await ${server}__browser_screen_click({ 
    element: 'navigation menu',
    x: 100, 
    y: 50 
  });
  
  // 4. Test scrolling
  await ${server}__browser_screen_drag({
    element: 'page content',
    startX: 200,
    startY: 400,
    endX: 200,
    endY: 100
  });
  
  // 5. Check console for errors
  await ${server}__browser_console_messages();
}
```

### 5. **Visual Regression Testing**

#### Key Areas to Monitor
1. **Layout Shifts:** Elements jumping during load
2. **Font Rendering:** Consistent across browsers
3. **Color Accuracy:** Especially gradients and transparencies
4. **Animation Smoothness:** 60fps on capable devices
5. **Image Quality:** Proper scaling and aspect ratios

#### Testing Checklist
- [ ] All text is readable (WCAG AA contrast)
- [ ] Touch targets are minimum 48x48px
- [ ] No horizontal scroll on mobile
- [ ] Forms are keyboard accessible
- [ ] Animations respect prefers-reduced-motion
- [ ] Images have proper alt text
- [ ] Page works without JavaScript
- [ ] Critical content loads within 3 seconds

### 6. **Performance Testing Protocol**

#### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

#### Testing Tools Integration
```bash
# Run Lighthouse CI
npm install -g @lhci/cli
lhci autorun

# WebPageTest API
curl "https://www.webpagetest.org/runtest.php?url=http://localhost:8080&k=API_KEY"

# Performance budget monitoring
bundlesize -f dist/*.js -s 150kB
```

### 7. **Accessibility Testing**

#### Automated Checks
```javascript
// Use axe-core for accessibility testing
const results = await page.evaluate(() => {
  return axe.run();
});
```

#### Manual Checks
1. **Keyboard Navigation:** Tab through all interactive elements
2. **Screen Reader:** Test with NVDA/JAWS (Windows), VoiceOver (Mac/iOS)
3. **Color Contrast:** Verify with browser DevTools
4. **Focus Indicators:** Visible for all interactive elements
5. **ARIA Labels:** Properly implemented for complex widgets

### 8. **Progressive Enhancement Testing**

#### Test Scenarios
1. **JavaScript Disabled:** Core functionality still works
2. **Slow Network (3G):** Critical content loads first
3. **Offline Mode:** Service worker provides basic functionality
4. **Old Browser:** Graceful degradation for missing features
5. **Print Stylesheet:** Content prints properly

### 9. **Continuous Testing Integration**

#### Git Hooks
```bash
# Pre-commit hook
npm run test:visual
npm run test:accessibility
npm run test:performance
```

#### CI/CD Pipeline
```yaml
# GitHub Actions example
test:
  runs-on: ubuntu-latest
  strategy:
    matrix:
      browser: [chrome, firefox, safari]
      viewport: [mobile, tablet, desktop]
  steps:
    - uses: actions/checkout@v2
    - run: npm test -- --browser=${{ matrix.browser }} --viewport=${{ matrix.viewport }}
```

### 10. **Issue Documentation Template**

When issues are found:
```markdown
## Issue: [Brief Description]
**Browser/Device:** Chrome 119 / iPhone 13
**Viewport:** 390x844
**Steps to Reproduce:**
1. Navigate to homepage
2. Scroll to products section
3. Click on product card

**Expected:** Card expands smoothly
**Actual:** Card jumps and layout shifts

**Screenshot:** [Attach screenshot]
**Priority:** High/Medium/Low
**Fix Applied:** [Description of fix]
```

### 11. **Testing Frequency**

- **Daily:** Automated visual regression tests
- **Weekly:** Full cross-browser testing
- **Before Deploy:** Complete testing protocol
- **After Major Changes:** Immediate spot checks
- **Monthly:** Performance budget review

### 12. **Best Practices for 2024**

1. **Container Queries Over Media Queries:** Test component-level responsiveness
2. **Variable Fonts:** Verify proper rendering across browsers
3. **CSS Grid Subgrid:** Check browser support and fallbacks
4. **View Transitions API:** Test smooth page transitions
5. **Color Spaces:** Verify P3 and LAB color rendering
6. **Interaction to Next Paint (INP):** New Core Web Vital to monitor
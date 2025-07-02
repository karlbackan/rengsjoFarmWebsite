# Våra djur Gallery Implementation Guide

## Overview
This guide shows how to integrate the enhanced gallery into the existing Rengsjö Farm website while maintaining the minimalist aesthetic.

## Design Concepts

### 1. **Mixed Media Grid (Recommended)**
- **Best for:** Showcasing variety with featured content
- **Supports:** Photos, videos, seasonal badges
- **Mobile-friendly:** Responsive grid collapses gracefully
- **Interaction:** Hover effects, lightbox on click

### 2. **Masonry Layout**
- **Best for:** Natural, organic feel with varied content sizes
- **Supports:** Different aspect ratios
- **Mobile-friendly:** Columns reduce on smaller screens
- **Interaction:** Subtle scale on hover

### 3. **Tabbed Categories**
- **Best for:** Large content libraries
- **Supports:** Filtering by animal type, season, media type
- **Mobile-friendly:** Tabs stack vertically
- **Interaction:** Smooth transitions between categories

### 4. **Horizontal Scroll**
- **Best for:** Secondary galleries or featured content
- **Supports:** Touch gestures on mobile
- **Mobile-friendly:** Native scrolling behavior
- **Interaction:** Smooth scroll with visual indicators

### 5. **Story Cards**
- **Best for:** Behind-the-scenes content with context
- **Supports:** Mixed media with descriptions
- **Mobile-friendly:** Cards stack vertically
- **Interaction:** Expandable content

## Implementation Steps

### Step 1: Update HTML Structure

Replace the current gallery section with:

```html
<!-- Enhanced Animal Welfare Gallery -->
<section class="gallery" id="gallery">
    <div class="container">
        <h2 class="section-title scroll-reveal">Så lever våra djur</h2>
        <p class="section-subtitle">Följ våra djur genom årstiderna på gården</p>
        
        <!-- Filter Bar -->
        <div class="filter-bar">
            <div class="filter-chips">
                <button class="filter-chip active" data-filter="all">Alla</button>
                <button class="filter-chip" data-filter="photos">Foton</button>
                <button class="filter-chip" data-filter="videos">Videos</button>
                <button class="filter-chip" data-filter="spring">Vår</button>
                <button class="filter-chip" data-filter="summer">Sommar</button>
                <button class="filter-chip" data-filter="autumn">Höst</button>
                <button class="filter-chip" data-filter="winter">Vinter</button>
            </div>
            <div class="view-toggle">
                <button class="view-btn active" data-view="grid" title="Rutnät">⊞</button>
                <button class="view-btn" data-view="masonry" title="Masonry">⊡</button>
                <button class="view-btn" data-view="list" title="Lista">☰</button>
            </div>
        </div>
        
        <!-- Gallery Container -->
        <div class="gallery-container" id="galleryContainer">
            <!-- Content will be dynamically loaded here -->
        </div>
    </div>
</section>
```

### Step 2: Add CSS to main.css

Add to your imports in main.css:
```css
@import 'gallery-styles.css';
```

Or add the styles directly to your components.css file.

### Step 3: JavaScript Integration

Add to your existing script or create a new file:

```javascript
// Initialize the enhanced gallery
document.addEventListener('DOMContentLoaded', () => {
    // Gallery data
    const galleryItems = [
        {
            id: 1,
            type: 'image',
            src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
            title: 'Våra lamm på sommarbete',
            description: 'Naturlig uppfödning sedan 1985',
            category: ['lamm'],
            season: 'summer',
            featured: true
        },
        {
            id: 2,
            type: 'video',
            src: 'path/to/summer-grazing.mp4',
            poster: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80',
            title: 'Fåren betar fritt',
            description: 'Se hur våra djur lever',
            category: ['får'],
            season: 'summer'
        },
        // Add more items...
    ];
    
    // Simple implementation
    const container = document.getElementById('galleryContainer');
    
    function renderGallery(items) {
        const html = `
            <div class="gallery-grid">
                ${items.map(item => `
                    <div class="media-item ${item.featured ? 'featured' : ''}" data-id="${item.id}">
                        ${item.type === 'video' 
                            ? `<video poster="${item.poster}" muted>
                                   <source src="${item.src}" type="video/mp4">
                               </video>
                               <div class="play-icon"></div>`
                            : `<img src="${item.src}" alt="${item.title}" loading="lazy">`
                        }
                        ${item.season ? `<span class="season-badge">${getSeasonName(item.season)}</span>` : ''}
                        <div class="media-overlay">
                            <div class="media-info">
                                <h3 class="media-title">${item.title}</h3>
                                <p class="media-description">${item.description}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.innerHTML = html;
        initializeInteractions();
    }
    
    function getSeasonName(season) {
        const seasons = {
            spring: 'Vår',
            summer: 'Sommar',
            autumn: 'Höst',
            winter: 'Vinter'
        };
        return seasons[season] || season;
    }
    
    function initializeInteractions() {
        // Video hover play
        document.querySelectorAll('.media-item video').forEach(video => {
            const item = video.closest('.media-item');
            item.addEventListener('mouseenter', () => video.play());
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        });
        
        // Lightbox on click
        document.querySelectorAll('.media-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = item.dataset.id;
                const galleryItem = galleryItems.find(i => i.id == id);
                openLightbox(galleryItem);
            });
        });
    }
    
    // Initial render
    renderGallery(galleryItems);
    
    // Filter functionality
    document.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const filter = chip.dataset.filter;
            // Implement filtering logic here
        });
    });
    
    // View switching
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const view = btn.dataset.view;
            // Implement view switching logic here
        });
    });
});
```

### Step 4: Progressive Enhancement

For the full featured gallery, include the complete gallery-functionality.js:

```html
<!-- Before closing body tag -->
<script src="gallery-functionality.js"></script>
<script>
    // Initialize with full features
    const gallery = new FarmGallery({
        container: '#galleryContainer',
        lazyLoad: true,
        lightbox: true,
        filters: true,
        autoplayVideosOnHover: true,
        itemsPerPage: 12
    });
</script>
```

## Content Guidelines

### Photo Requirements
- **Resolution:** Minimum 1200px wide for featured items
- **Aspect Ratio:** 4:3 for standard items, 16:9 for featured
- **File Size:** Optimize to under 200KB for thumbnails
- **Format:** WebP with JPEG fallback

### Video Requirements
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1080p maximum, 720p recommended
- **Duration:** 15-60 seconds for gallery items
- **File Size:** Under 10MB per video
- **Poster Frame:** High-quality still image

### Content Mix Recommendations
- **70% Photos, 30% Videos** for optimal loading
- **Seasonal rotation** - update quarterly
- **Featured items** - highlight best content
- **Behind-the-scenes** - show daily farm life

## Performance Optimization

### 1. Lazy Loading
```javascript
// Native lazy loading for images
<img src="..." loading="lazy">

// Intersection Observer for videos
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.load();
        }
    });
});
```

### 2. Image Optimization
```html
<!-- Use srcset for responsive images -->
<img 
    srcset="lamb-400w.jpg 400w,
            lamb-800w.jpg 800w,
            lamb-1200w.jpg 1200w"
    sizes="(max-width: 600px) 100vw,
           (max-width: 1200px) 50vw,
           33vw"
    src="lamb-800w.jpg"
    alt="Lamm på bete"
>
```

### 3. Video Optimization
- Use video thumbnails/posters
- Preload metadata only
- Lazy load video sources
- Consider using video CDN

## Accessibility

### Requirements
- All images need descriptive alt text
- Videos need captions or descriptions
- Keyboard navigation support
- ARIA labels for interactive elements
- Focus indicators
- Reduced motion support

### Implementation
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    .media-item,
    .media-overlay {
        transition: none;
    }
}
```

## Mobile Considerations

### Touch Interactions
- Replace hover effects with tap interactions
- Ensure touch targets are minimum 44x44px
- Add swipe gestures for carousels
- Use native scrolling where possible

### Performance
- Serve smaller images on mobile
- Limit initial load to 6-8 items
- Consider "Load More" button instead of infinite scroll
- Reduce video quality on cellular connections

## SEO Optimization

### Structured Data
```html
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Rengsjö Farm - Våra djur",
    "description": "Se hur våra lamm och får lever på naturliga betesmarker",
    "url": "https://rengsjöfarm.se/#gallery",
    "image": [
        {
            "@type": "ImageObject",
            "contentUrl": "https://rengsjöfarm.se/images/summer-lambs.jpg",
            "description": "Lamm på sommarbete",
            "name": "Sommarlamm 2024"
        }
    ]
}
</script>
```

### Meta Tags
```html
<meta property="og:image" content="https://rengsjöfarm.se/images/farm-hero.jpg">
<meta property="og:video" content="https://rengsjöfarm.se/videos/farm-life.mp4">
```

## Testing Checklist

- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test with slow network connections
- [ ] Verify keyboard navigation works
- [ ] Check screen reader compatibility
- [ ] Validate HTML and CSS
- [ ] Test with JavaScript disabled
- [ ] Verify print styles work correctly

## Future Enhancements

1. **API Integration** - Load content from CMS
2. **User Uploads** - Allow customers to share photos
3. **Social Sharing** - Add share buttons for individual items
4. **Analytics** - Track most viewed content
5. **AI Tagging** - Auto-categorize content
6. **360° Photos** - Virtual farm tours
7. **Live Streams** - Real-time farm cameras
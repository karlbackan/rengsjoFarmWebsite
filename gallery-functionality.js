// Advanced Gallery Functionality for Våra djur Section
// Rengsjö Farm - 2024

class FarmGallery {
    constructor(options = {}) {
        this.options = {
            container: '.gallery-container',
            lazyLoad: true,
            lightbox: true,
            filters: true,
            autoplayVideosOnHover: true,
            infiniteScroll: false,
            itemsPerPage: 12,
            ...options
        };
        
        this.currentFilter = 'all';
        this.currentView = 'grid';
        this.items = [];
        this.filteredItems = [];
        this.currentPage = 1;
        this.isLoading = false;
        
        this.init();
    }
    
    init() {
        this.loadGalleryData();
        this.setupEventListeners();
        this.initLazyLoading();
        this.initLightbox();
        this.initFilters();
        this.initInfiniteScroll();
    }
    
    // Load gallery data (could be from API or static data)
    loadGalleryData() {
        // Example data structure
        this.items = [
            {
                id: 1,
                type: 'image',
                src: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&q=80',
                title: 'Våra lamm på sommarbete',
                description: 'Naturlig uppfödning sedan 1985',
                category: ['lamm', 'sommar'],
                season: 'summer',
                date: '2024-06-15',
                featured: true
            },
            {
                id: 2,
                type: 'video',
                src: 'path/to/video.mp4',
                poster: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80',
                thumbnail: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&q=80',
                title: 'Fåren betar fritt',
                description: 'Se hur våra djur lever',
                category: ['får', 'bete'],
                season: 'summer',
                date: '2024-07-20'
            },
            // Add more items...
        ];
        
        this.filteredItems = [...this.items];
        this.renderGallery();
    }
    
    // Render gallery based on current view
    renderGallery() {
        const container = document.querySelector(this.options.container);
        if (!container) return;
        
        const itemsToShow = this.options.infiniteScroll 
            ? this.filteredItems.slice(0, this.currentPage * this.options.itemsPerPage)
            : this.filteredItems;
        
        let html = '';
        
        switch(this.currentView) {
            case 'grid':
                html = this.renderGridView(itemsToShow);
                break;
            case 'masonry':
                html = this.renderMasonryView(itemsToShow);
                break;
            case 'list':
                html = this.renderListView(itemsToShow);
                break;
            case 'carousel':
                html = this.renderCarouselView(itemsToShow);
                break;
        }
        
        container.innerHTML = html;
        this.afterRender();
    }
    
    renderGridView(items) {
        return `
            <div class="gallery-grid">
                ${items.map(item => this.renderGridItem(item)).join('')}
            </div>
        `;
    }
    
    renderGridItem(item) {
        const featured = item.featured ? 'featured' : '';
        const seasonBadge = item.season ? `<span class="season-badge">${this.getSeasonName(item.season)}</span>` : '';
        
        if (item.type === 'video') {
            return `
                <div class="media-item ${featured}" data-id="${item.id}">
                    <video poster="${item.poster}" ${this.options.autoplayVideosOnHover ? 'muted' : ''}>
                        <source src="${item.src}" type="video/mp4">
                    </video>
                    <div class="play-icon"></div>
                    ${seasonBadge}
                    <div class="media-overlay">
                        <div class="media-info">
                            <h3 class="media-title">${item.title}</h3>
                            <p class="media-description">${item.description}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="media-item ${featured}" data-id="${item.id}">
                <img src="${item.thumbnail}" 
                     data-src="${item.src}" 
                     alt="${item.title}"
                     ${this.options.lazyLoad ? 'loading="lazy"' : ''}>
                ${seasonBadge}
                <div class="media-overlay">
                    <div class="media-info">
                        <h3 class="media-title">${item.title}</h3>
                        <p class="media-description">${item.description}</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    renderMasonryView(items) {
        return `
            <div class="masonry-gallery" data-masonry='{"itemSelector": ".masonry-item", "columnWidth": ".grid-sizer", "percentPosition": true}'>
                <div class="grid-sizer"></div>
                ${items.map(item => this.renderMasonryItem(item)).join('')}
            </div>
        `;
    }
    
    renderMasonryItem(item) {
        const randomHeight = Math.floor(Math.random() * 3) + 1; // 1-3 for varied heights
        
        if (item.type === 'video') {
            return `
                <div class="masonry-item masonry-item--height${randomHeight}" data-id="${item.id}">
                    <video poster="${item.poster}" controls>
                        <source src="${item.src}" type="video/mp4">
                    </video>
                    <div class="item-overlay">
                        <h4>${item.title}</h4>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="masonry-item masonry-item--height${randomHeight}" data-id="${item.id}">
                <img src="${item.src}" alt="${item.title}">
                <div class="item-overlay">
                    <h4>${item.title}</h4>
                </div>
            </div>
        `;
    }
    
    renderListView(items) {
        return `
            <div class="story-list">
                ${items.map(item => this.renderStoryCard(item)).join('')}
            </div>
        `;
    }
    
    renderStoryCard(item) {
        const formattedDate = new Date(item.date).toLocaleDateString('sv-SE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        return `
            <div class="story-card" data-id="${item.id}">
                <div class="story-media">
                    ${item.type === 'video' 
                        ? `<video poster="${item.poster}"><source src="${item.src}" type="video/mp4"></video>
                           <div class="play-icon"></div>`
                        : `<img src="${item.thumbnail}" alt="${item.title}">`
                    }
                </div>
                <div class="story-content">
                    <p class="story-date">${formattedDate}</p>
                    <h3 class="story-title">${item.title}</h3>
                    <p class="story-excerpt">${item.description}</p>
                    <a href="#" class="story-link">Läs mer →</a>
                </div>
            </div>
        `;
    }
    
    renderCarouselView(items) {
        return `
            <div class="carousel-container">
                <div class="carousel-track">
                    ${items.map((item, index) => this.renderCarouselItem(item, index)).join('')}
                </div>
                <button class="carousel-prev" aria-label="Previous">‹</button>
                <button class="carousel-next" aria-label="Next">›</button>
                <div class="carousel-indicators">
                    ${items.map((_, index) => 
                        `<button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    renderCarouselItem(item, index) {
        const active = index === 0 ? 'active' : '';
        
        return `
            <div class="carousel-item ${active}" data-id="${item.id}">
                ${item.type === 'video' 
                    ? `<video poster="${item.poster}" ${active ? 'autoplay muted loop' : ''}>
                           <source src="${item.src}" type="video/mp4">
                       </video>`
                    : `<img src="${item.src}" alt="${item.title}">`
                }
                <div class="carousel-caption">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
    }
    
    // Event listeners
    setupEventListeners() {
        // Filter clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-chip')) {
                this.handleFilterClick(e.target);
            }
            
            if (e.target.classList.contains('view-btn')) {
                this.handleViewChange(e.target);
            }
            
            if (e.target.closest('.media-item')) {
                this.handleItemClick(e.target.closest('.media-item'));
            }
            
            if (e.target.classList.contains('carousel-prev')) {
                this.carouselPrev();
            }
            
            if (e.target.classList.contains('carousel-next')) {
                this.carouselNext();
            }
        });
        
        // Video hover play
        if (this.options.autoplayVideosOnHover) {
            document.addEventListener('mouseenter', (e) => {
                if (e.target.closest('.media-item')) {
                    const video = e.target.closest('.media-item').querySelector('video');
                    if (video && !video.controls) {
                        video.play();
                    }
                }
            }, true);
            
            document.addEventListener('mouseleave', (e) => {
                if (e.target.closest('.media-item')) {
                    const video = e.target.closest('.media-item').querySelector('video');
                    if (video && !video.controls) {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            }, true);
        }
    }
    
    // Filter functionality
    initFilters() {
        if (!this.options.filters) return;
        
        const filterContainer = document.querySelector('.filter-chips');
        if (!filterContainer) return;
        
        // Get unique categories
        const categories = new Set(['all']);
        this.items.forEach(item => {
            item.category.forEach(cat => categories.add(cat));
        });
        
        // Add season filters
        const seasons = new Set(['all']);
        this.items.forEach(item => {
            if (item.season) seasons.add(item.season);
        });
        
        // You can render dynamic filters here based on available categories
    }
    
    handleFilterClick(filterEl) {
        const filter = filterEl.dataset.filter || filterEl.textContent.toLowerCase();
        
        // Update active state
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.remove('active');
        });
        filterEl.classList.add('active');
        
        // Filter items
        this.currentFilter = filter;
        this.filterItems();
        this.currentPage = 1;
        this.renderGallery();
    }
    
    filterItems() {
        if (this.currentFilter === 'all' || this.currentFilter === 'alla') {
            this.filteredItems = [...this.items];
            return;
        }
        
        this.filteredItems = this.items.filter(item => {
            // Filter by type
            if (this.currentFilter === 'foton' && item.type !== 'image') return false;
            if (this.currentFilter === 'videos' && item.type !== 'video') return false;
            
            // Filter by season
            if (['vår', 'sommar', 'höst', 'vinter'].includes(this.currentFilter)) {
                const seasonMap = {
                    'vår': 'spring',
                    'sommar': 'summer',
                    'höst': 'autumn',
                    'vinter': 'winter'
                };
                return item.season === seasonMap[this.currentFilter];
            }
            
            // Filter by category
            return item.category.includes(this.currentFilter);
        });
    }
    
    // View switching
    handleViewChange(viewBtn) {
        const viewMap = {
            '⊞': 'grid',
            '☰': 'list',
            '⊡': 'masonry'
        };
        
        const newView = viewMap[viewBtn.textContent] || 'grid';
        
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        viewBtn.classList.add('active');
        
        this.currentView = newView;
        this.renderGallery();
    }
    
    // Lightbox functionality
    initLightbox() {
        if (!this.options.lightbox) return;
        
        // Create lightbox if it doesn't exist
        if (!document.querySelector('.lightbox')) {
            const lightboxHtml = `
                <div class="lightbox" id="gallery-lightbox">
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <button class="lightbox-prev">‹</button>
                        <button class="lightbox-next">›</button>
                        <div class="lightbox-media-container">
                            <img id="lightbox-img" src="" alt="">
                            <video id="lightbox-video" controls style="display: none;">
                                <source src="" type="video/mp4">
                            </video>
                        </div>
                        <div class="lightbox-info">
                            <h3 class="lightbox-title"></h3>
                            <p class="lightbox-description"></p>
                            <p class="lightbox-meta"></p>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', lightboxHtml);
        }
        
        // Lightbox event listeners
        const lightbox = document.getElementById('gallery-lightbox');
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const prevBtn = lightbox.querySelector('.lightbox-prev');
        const nextBtn = lightbox.querySelector('.lightbox-next');
        
        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.lightboxPrev());
        nextBtn.addEventListener('click', () => this.lightboxNext());
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                this.closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') this.closeLightbox();
            if (e.key === 'ArrowLeft') this.lightboxPrev();
            if (e.key === 'ArrowRight') this.lightboxNext();
        });
    }
    
    handleItemClick(item) {
        const itemId = parseInt(item.dataset.id);
        const galleryItem = this.filteredItems.find(i => i.id === itemId);
        
        if (galleryItem && this.options.lightbox) {
            this.openLightbox(galleryItem);
        }
    }
    
    openLightbox(item) {
        const lightbox = document.getElementById('gallery-lightbox');
        const img = document.getElementById('lightbox-img');
        const video = document.getElementById('lightbox-video');
        const title = lightbox.querySelector('.lightbox-title');
        const description = lightbox.querySelector('.lightbox-description');
        const meta = lightbox.querySelector('.lightbox-meta');
        
        this.currentLightboxItem = item;
        this.currentLightboxIndex = this.filteredItems.indexOf(item);
        
        // Show appropriate media
        if (item.type === 'video') {
            img.style.display = 'none';
            video.style.display = 'block';
            video.querySelector('source').src = item.src;
            video.load();
        } else {
            video.style.display = 'none';
            img.style.display = 'block';
            img.src = item.src;
            img.alt = item.title;
        }
        
        // Update info
        title.textContent = item.title;
        description.textContent = item.description;
        
        const date = new Date(item.date).toLocaleDateString('sv-SE', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        meta.textContent = `${date} • ${this.getSeasonName(item.season)}`;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeLightbox() {
        const lightbox = document.getElementById('gallery-lightbox');
        const video = document.getElementById('lightbox-video');
        
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        video.pause();
    }
    
    lightboxPrev() {
        let newIndex = this.currentLightboxIndex - 1;
        if (newIndex < 0) newIndex = this.filteredItems.length - 1;
        this.openLightbox(this.filteredItems[newIndex]);
    }
    
    lightboxNext() {
        let newIndex = this.currentLightboxIndex + 1;
        if (newIndex >= this.filteredItems.length) newIndex = 0;
        this.openLightbox(this.filteredItems[newIndex]);
    }
    
    // Carousel functionality
    carouselPrev() {
        const track = document.querySelector('.carousel-track');
        const items = track.querySelectorAll('.carousel-item');
        const activeItem = track.querySelector('.carousel-item.active');
        const activeIndex = Array.from(items).indexOf(activeItem);
        
        let newIndex = activeIndex - 1;
        if (newIndex < 0) newIndex = items.length - 1;
        
        this.showCarouselSlide(newIndex);
    }
    
    carouselNext() {
        const track = document.querySelector('.carousel-track');
        const items = track.querySelectorAll('.carousel-item');
        const activeItem = track.querySelector('.carousel-item.active');
        const activeIndex = Array.from(items).indexOf(activeItem);
        
        let newIndex = activeIndex + 1;
        if (newIndex >= items.length) newIndex = 0;
        
        this.showCarouselSlide(newIndex);
    }
    
    showCarouselSlide(index) {
        const items = document.querySelectorAll('.carousel-item');
        const indicators = document.querySelectorAll('.indicator');
        
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
            if (i === index && item.querySelector('video')) {
                item.querySelector('video').play();
            } else if (item.querySelector('video')) {
                item.querySelector('video').pause();
            }
        });
        
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    // Lazy loading
    initLazyLoading() {
        if (!this.options.lazyLoad) return;
        
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            return;
        }
        
        // Fallback to Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Infinite scroll
    initInfiniteScroll() {
        if (!this.options.infiniteScroll) return;
        
        const scrollObserver = new IntersectionObserver((entries) => {
            const lastEntry = entries[0];
            if (lastEntry.isIntersecting && !this.isLoading) {
                this.loadMore();
            }
        }, {
            rootMargin: '100px'
        });
        
        // Create sentinel element
        const sentinel = document.createElement('div');
        sentinel.className = 'infinite-scroll-sentinel';
        document.querySelector(this.options.container).appendChild(sentinel);
        scrollObserver.observe(sentinel);
    }
    
    loadMore() {
        if (this.currentPage * this.options.itemsPerPage >= this.filteredItems.length) {
            return; // All items loaded
        }
        
        this.isLoading = true;
        this.currentPage++;
        
        // Simulate loading delay
        setTimeout(() => {
            this.renderGallery();
            this.isLoading = false;
        }, 500);
    }
    
    // Helper methods
    getSeasonName(season) {
        const seasonNames = {
            spring: 'Vår',
            summer: 'Sommar',
            autumn: 'Höst',
            winter: 'Vinter'
        };
        return seasonNames[season] || season;
    }
    
    afterRender() {
        // Re-initialize features after render
        this.initLazyLoading();
        
        // Initialize masonry if needed
        if (this.currentView === 'masonry' && typeof Masonry !== 'undefined') {
            const grid = document.querySelector('.masonry-gallery');
            new Masonry(grid, {
                itemSelector: '.masonry-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        }
        
        // Animate items on render
        const items = document.querySelectorAll('.media-item, .story-card, .masonry-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 50);
        });
    }
    
    // Public API
    destroy() {
        // Clean up event listeners and DOM elements
        document.removeEventListener('click', this.handleClick);
        const lightbox = document.getElementById('gallery-lightbox');
        if (lightbox) lightbox.remove();
    }
    
    refresh() {
        this.loadGalleryData();
    }
    
    addItem(item) {
        this.items.push(item);
        this.filterItems();
        this.renderGallery();
    }
    
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.filterItems();
        this.renderGallery();
    }
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Example initialization
    const gallery = new FarmGallery({
        container: '.gallery-container',
        lazyLoad: true,
        lightbox: true,
        filters: true,
        autoplayVideosOnHover: true,
        infiniteScroll: false,
        itemsPerPage: 12
    });
    
    // Make gallery instance available globally for debugging
    window.farmGallery = gallery;
});

// Export for ES6 modules
export default FarmGallery;
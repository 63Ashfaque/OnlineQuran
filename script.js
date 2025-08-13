class QuranSlider {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 604; // Will be updated dynamically based on image array size
        this.zoomLevel = 1;
        this.minZoom = 0.5;
        this.maxZoom = 3;
        this.zoomStep = 0.2;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.lastTranslateX = 0;
        this.lastTranslateY = 0;
        
        // Touch handling
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.isSwipe = false;
        this.lastTap = 0;
        
        // Image loading
        this.imageCache = new Map();
        this.preloadQueue = [];
        
        this.initializeElements();
        this.initializeImages();
        this.bindEvents();
        this.showTouchInstructions();
        
        // Log image array info for debugging
        this.logImageArrayInfo();
    }
    
    // Debug method to show image array information
    logImageArrayInfo() {
        console.log(`Quran Image Array initialized with ${this.imageUrls.length} pages`);
        console.log('First few pages:', this.imageUrls.slice(0, 3));
        console.log('Last few pages:', this.imageUrls.slice(-3));
        
        // Check if using placeholders
        if (this.imageUrls[0].includes('placeholder')) {
            console.warn('⚠️ Currently using placeholder images. Please update image URLs in script.js');
        } else {
            console.log('✅ Using custom image URLs');
        }
    }
    
    initializeElements() {
        this.imageContainer = document.getElementById('imageContainer');
        this.currentImage = document.getElementById('currentImage');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.resetZoomBtn = document.getElementById('resetZoom');
        this.zoomLevelDisplay = document.getElementById('zoomLevel');
        this.pageInput = document.getElementById('pageInput');
        this.goToPageBtn = document.getElementById('goToPage');
        this.touchInstructions = document.getElementById('touchInstructions');
        
        // New enhanced control elements
        this.currentPageDisplay = document.getElementById('currentPageDisplay');
        this.totalPagesDisplay = document.getElementById('totalPagesDisplay');
        this.firstPageBtn = document.getElementById('firstPage');
        this.lastPageBtn = document.getElementById('lastPage');
        this.fullscreenBtn = document.getElementById('fullscreen');
        
        // Debug: Check if all elements exist
        const requiredElements = {
            imageContainer: this.imageContainer,
            currentImage: this.currentImage,
            loadingSpinner: this.loadingSpinner,
            prevBtn: this.prevBtn,
            nextBtn: this.nextBtn,
            zoomInBtn: this.zoomInBtn,
            zoomOutBtn: this.zoomOutBtn,
            resetZoomBtn: this.resetZoomBtn,
            zoomLevelDisplay: this.zoomLevelDisplay,
            pageInput: this.pageInput,
            goToPageBtn: this.goToPageBtn,
            touchInstructions: this.touchInstructions,
            currentPageDisplay: this.currentPageDisplay,
            totalPagesDisplay: this.totalPagesDisplay,
            firstPageBtn: this.firstPageBtn,
            lastPageBtn: this.lastPageBtn,
            fullscreenBtn: this.fullscreenBtn
        };
        
        const missingElements = [];
        for (const [name, element] of Object.entries(requiredElements)) {
            if (!element) {
                missingElements.push(name);
            }
        }
        
        if (missingElements.length > 0) {
            console.error('Missing elements:', missingElements);
        } else {
            console.log('All elements initialized successfully');
        }
    }
    
    initializeImages() {
        // Quran Pages Image Array - 604 pages total
        // You can replace these with your actual Quran page image URLs
        this.imageUrls = this.createQuranImageArray();
        
        // Update total pages based on actual image array size
        this.totalPages = this.imageUrls.length;
        this.updateTotalPagesUI();
        
        this.loadCurrentImage();
        this.preloadAdjacentImages();
    }
    
    // Update total pages in UI elements
    updateTotalPagesUI() {
        // Set total pages in the display
        if (this.totalPagesDisplay) {
            this.totalPagesDisplay.textContent = this.totalPages;
        }
        
        // Update page input max attribute
        if (this.pageInput) {
            this.pageInput.setAttribute('max', this.totalPages);
        }
        
        console.log(`Total pages updated to: ${this.totalPages} (based on image array size)`);
    }

    

    createQuranImageArray() {
        // Method 1: Using actual Quran images from a reliable source
        const imageArray = [];
        
        // Option A: Use actual Quran pages from an online source (recommended)
        // for (let i = 1; i <= this.totalPages; i++) {
        //     const pageNumber = i.toString().padStart(3, '0');
        //     // Using a reliable Quran image source
        //     imageArray.push(`https://www.mp3quran.net/api/quran_pages_svg/${pageNumber}.svg`);
        // }
        
        // Option B: Local images (uncomment if you have local images)
        
        // const baseUrl = 'images/'; // Your local image directory
        // for (let i = 1; i <= this.totalPages; i++) {
        //     const pageNumber = i.toString().padStart(3, '0');
        //     imageArray.push(`${baseUrl}page_${pageNumber}.jpg`);
        // }

        // Fixed page array - each index represents the number of sides for that part
        const pageArray = [
            0,  // index 0 (not used)
            28, // Part 1: 28 sides
            28, // Part 2: 28 sides
            28, // Part 3: 28 sides
            28, // Part 4: 28 sides
            28, // Part 5: 28 sides
            28, // Part 6: 28 sides
            28, // Part 7: 28 sides
            28, // Part 8: 28 sides
            28, // Part 9: 28 sides
            28, // Part 10: 28 sides
            28, // Part 11: 28 sides
            28, // Part 12: 28 sides
            28, // Part 13: 28 sides
            28, // Part 14: 28 sides
            28, // Part 15: 28 sides
            28, // Part 16: 28 sides
            28, // Part 17: 28 sides
            28, // Part 18: 28 sides
            28, // Part 19: 28 sides
            26, // Part 20: 26 sides
            28, // Part 21: 28 sides
            26, // Part 22: 26 sides
            28, // Part 23: 28 sides
            26, // Part 24: 26 sides
            30, // Part 25: 30 sides
            30, // Part 26: 30 sides
            30, // Part 27: 30 sides
            30, // Part 28: 30 sides
            32, // Part 29: 32 sides
            30  // Part 30: 30 sides
        ];
     
        // Generate image paths for all parts
        for (let p = 1; p <= 30; p++) {
            const sidesCount = pageArray[p];
            
            for (let i = 1; i <= sidesCount; i++) {
                // Fixed path format
                imageArray.push(`images/p${p}_side${i}.png`);
            }
        }

        console.log('Generated image array:', imageArray.length, 'images');
        console.log('First 5 images:', imageArray.slice(0, 5));
        console.log('Last 5 images:', imageArray.slice(-5));

        // Fallback to placeholder images if needed
        if (imageArray.length === 0) {
            console.warn('Using placeholder images. Please update the image URLs in createQuranImageArray()');
            for (let i = 1; i <= this.totalPages; i++) {
                imageArray.push(`https://via.placeholder.com/600x800/f8f9fa/343a40?text=صفحة+${i}`);
            }
        }
        
        console.log('Created image array with', imageArray.length, 'images');
        console.log('Sample URLs:', imageArray.slice(0, 3));
        
        return imageArray;
    }
    
    // Helper method to check if image exists (optional)
    checkImageExists(imageUrl) {
        try {
            const img = new Image();
            img.src = imageUrl;
            return img.complete && img.naturalHeight !== 0;
        } catch (e) {
            return false;
        }
    }
    
    // Method to update image array with new URLs
    updateImageArray(newImageUrls) {
        if (Array.isArray(newImageUrls) && newImageUrls.length === this.totalPages) {
            this.imageUrls = newImageUrls;
            this.imageCache.clear(); // Clear cache to force reload
            this.loadCurrentImage();
            this.preloadAdjacentImages();
            console.log('Image array updated successfully');
            this.logImageArrayInfo();
        } else {
            console.error(`Image array must contain exactly ${this.totalPages} URLs`);
        }
    }
    
    // Method to get image URL for a specific page
    getImageUrl(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
            return this.imageUrls[pageNumber - 1];
        }
        return null;
    }
    
    // Method to validate all image URLs (useful for debugging)
    async validateImageArray() {
        console.log('Validating image array...');
        const results = {
            valid: [],
            invalid: [],
            total: this.imageUrls.length
        };
        
        for (let i = 0; i < this.imageUrls.length; i++) {
            try {
                const response = await fetch(this.imageUrls[i], { method: 'HEAD' });
                if (response.ok) {
                    results.valid.push(i + 1);
                } else {
                    results.invalid.push(i + 1);
                }
            } catch (error) {
                results.invalid.push(i + 1);
            }
        }
        
        console.log(`Validation complete: ${results.valid.length} valid, ${results.invalid.length} invalid`);
        if (results.invalid.length > 0) {
            console.warn('Invalid pages:', results.invalid.slice(0, 10)); // Show first 10 invalid
        }
        
        return results;
    }
    
    bindEvents() {
        // Navigation buttons
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        
        // Zoom controls
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.resetZoomBtn.addEventListener('click', () => this.resetZoom());
        
        // Page navigation
        this.goToPageBtn.addEventListener('click', () => this.goToPage());
        this.pageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.goToPage();
        });
        
        // Add change event listener for pageInput
        this.pageInput.addEventListener('change', () => this.goToPage());
        
        // New enhanced controls
        if (this.firstPageBtn) {
            this.firstPageBtn.addEventListener('click', () => this.goToFirstPage());
        }
        
        if (this.lastPageBtn) {
            this.lastPageBtn.addEventListener('click', () => this.goToLastPage());
        }
        
        if (this.fullscreenBtn) {
            this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }
        
        // Mouse events for dragging
        this.imageContainer.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        document.addEventListener('mouseup', () => this.handleMouseUp());
        
        // Touch events
        this.imageContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        this.imageContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.imageContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        
        // Double click/tap to zoom
        this.imageContainer.addEventListener('dblclick', (e) => this.handleDoubleClick(e));
        
        // Wheel zoom
        this.imageContainer.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent context menu
        this.imageContainer.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    showTouchInstructions() {
        if ('ontouchstart' in window) {
            this.touchInstructions.classList.add('show');
            setTimeout(() => {
                this.touchInstructions.classList.remove('show');
            }, 4000);
        }
    }
    
    loadCurrentImage() {
        this.showLoading(true);
        console.log(`Loading page ${this.currentPage}...`);
        
        const imageUrl = this.imageUrls[this.currentPage - 1];
        console.log('Image URL:', imageUrl);
        
        if (this.imageCache.has(imageUrl)) {
            console.log('Loading from cache');
            this.displayImage(this.imageCache.get(imageUrl));
            this.showLoading(false);
        } else {
            console.log('Loading new image');
            const img = new Image();
            
            img.onload = () => {
                console.log('Image loaded successfully');
                this.imageCache.set(imageUrl, img.src);
                this.displayImage(img.src);
                this.showLoading(false);
            };
            
            img.onerror = (error) => {
                console.error(`Failed to load image: ${imageUrl}`, error);
                this.showLoading(false);
                
                // Try alternative fallback sources
                this.tryAlternativeImage();
            };
            
            // Add timeout for slow loading images
            setTimeout(() => {
                if (!img.complete) {
                    console.warn('Image loading timeout, trying alternative...');
                    this.tryAlternativeImage();
                }
            }, 10000); // 10 second timeout
            
            img.src = imageUrl;
        }
    }
    
    // Method to try alternative image sources if primary fails
    tryAlternativeImage() {
        const pageNumber = this.currentPage.toString().padStart(3, '0');
        const alternativeSources = [
            `https://via.placeholder.com/600x800/ffffff/000000?text=صفحة+${this.currentPage}`,
            `https://dummyimage.com/600x800/ffffff/000000&text=Page+${this.currentPage}`,
            `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='800' viewBox='0 0 600 800'%3E%3Crect fill='%23ffffff' width='600' height='800'/%3E%3Ctext x='300' y='400' text-anchor='middle' font-family='Arial' font-size='32' fill='%23000000'%3E صفحة ${this.currentPage}%3C/text%3E%3C/svg%3E`
        ];
        
        let attemptIndex = 0;
        
        const tryNext = () => {
            if (attemptIndex >= alternativeSources.length) {
                console.error('All alternative sources failed');
                this.showLoading(false);
                return;
            }
            
            const altImg = new Image();
            const altUrl = alternativeSources[attemptIndex];
            
            altImg.onload = () => {
                console.log(`Alternative image ${attemptIndex} loaded successfully`);
                this.displayImage(altUrl);
                this.showLoading(false);
            };
            
            altImg.onerror = () => {
                console.warn(`Alternative source ${attemptIndex} failed`);
                attemptIndex++;
                tryNext();
            };
            
            altImg.src = altUrl;
        };
        
        tryNext();
    }
    
    displayImage(src) {
        console.log('Displaying image:', src);
        
        if (!this.currentImage) {
            console.error('Current image element not found!');
            return;
        }
        
        this.currentImage.src = src;
        this.currentImage.style.display = 'block';
        
        // Update page display
        this.updatePageDisplay();
        
        // Add load event listener to ensure image is displayed
        this.currentImage.onload = () => {
            console.log('Image displayed successfully');
            this.resetZoom();
        };
        
        this.currentImage.onerror = () => {
            console.error('Error displaying image');
        };
        
        this.preloadAdjacentImages();
    }
    
    // Update page display in controls
    updatePageDisplay() {
        if (this.currentPageDisplay) {
            this.currentPageDisplay.textContent = this.currentPage;
        }
        console.log(`Page display updated to: ${this.currentPage}`);
    }
    
    preloadAdjacentImages() {
        // Preload previous and next images
        const toPreload = [];
        
        if (this.currentPage > 1) {
            toPreload.push(this.currentPage - 1);
        }
        if (this.currentPage < this.totalPages) {
            toPreload.push(this.currentPage + 1);
        }
        
        toPreload.forEach(pageNum => {
            const imageUrl = this.imageUrls[pageNum - 1];
            if (!this.imageCache.has(imageUrl)) {
                const img = new Image();
                img.onload = () => {
                    this.imageCache.set(imageUrl, img.src);
                };
                img.src = imageUrl;
            }
        });
    }
    
    showLoading(show) {
        if (show) {
            this.loadingSpinner.classList.add('show');
        } else {
            this.loadingSpinner.classList.remove('show');
        }
    }
    
    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.loadCurrentImage();
        }
    }
    
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.loadCurrentImage();
        }
    }
    
    goToPage() {
        const pageNum = parseInt(this.pageInput.value);
        if (pageNum >= 1 && pageNum <= this.totalPages) {
            this.currentPage = pageNum;
            this.loadCurrentImage();
            this.pageInput.value = '';
        }
    }
    
    // Go to first page
    goToFirstPage() {
        this.currentPage = 1;
        this.loadCurrentImage();
        console.log('Navigated to first page');
    }
    
    // Go to last page
    goToLastPage() {
        this.currentPage = this.totalPages;
        this.loadCurrentImage();
        console.log('Navigated to last page');
    }
    
    // Toggle fullscreen mode
    toggleFullscreen() {
        try {
            if (!document.fullscreenElement) {
                // Enter fullscreen
                document.documentElement.requestFullscreen().then(() => {
                    console.log('Entered fullscreen mode');
                }).catch(err => {
                    console.log(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                // Exit fullscreen
                document.exitFullscreen().then(() => {
                    console.log('Exited fullscreen mode');
                }).catch(err => {
                    console.log(`Error attempting to exit fullscreen: ${err.message}`);
                });
            }
        } catch (error) {
            console.error('Fullscreen not supported or error occurred:', error);
        }
    }
    
    zoomIn() {
        if (this.zoomLevel < this.maxZoom) {
            this.zoomLevel = Math.min(this.zoomLevel + this.zoomStep, this.maxZoom);
            this.applyZoom();
        }
    }
    
    zoomOut() {
        if (this.zoomLevel > this.minZoom) {
            this.zoomLevel = Math.max(this.zoomLevel - this.zoomStep, this.minZoom);
            this.applyZoom();
        }
    }
    
    resetZoom() {
        this.zoomLevel = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.lastTranslateX = 0;
        this.lastTranslateY = 0;
        this.applyZoom();
    }
    
    applyZoom() {
        const transform = `scale(${this.zoomLevel}) translate(${this.translateX}px, ${this.translateY}px)`;
        this.currentImage.style.transform = transform;
        this.zoomLevelDisplay.textContent = `${Math.round(this.zoomLevel * 100)}%`;
        
        if (this.zoomLevel > 1) {
            this.currentImage.classList.add('zoomed');
        } else {
            this.currentImage.classList.remove('zoomed');
        }
    }
    
    handleMouseDown(e) {
        if (this.zoomLevel > 1) {
            this.isDragging = true;
            this.startX = e.clientX - this.translateX;
            this.startY = e.clientY - this.translateY;
            e.preventDefault();
        }
    }
    
    handleMouseMove(e) {
        if (this.isDragging && this.zoomLevel > 1) {
            this.translateX = e.clientX - this.startX;
            this.translateY = e.clientY - this.startY;
            this.applyZoom();
        }
    }
    
    handleMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            this.lastTranslateX = this.translateX;
            this.lastTranslateY = this.translateY;
        }
    }
    
    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.isSwipe = false;
        
        // Handle double tap
        const currentTime = new Date().getTime();
        const tapLength = currentTime - this.lastTap;
        if (tapLength < 500 && tapLength > 0) {
            this.handleDoubleClick(e);
            this.lastTap = 0;
        } else {
            this.lastTap = currentTime;
        }
        
        if (this.zoomLevel > 1) {
            this.isDragging = true;
            this.startX = touch.clientX - this.translateX;
            this.startY = touch.clientY - this.translateY;
        }
        
        e.preventDefault();
    }
    
    handleTouchMove(e) {
        const touch = e.touches[0];
        
        if (this.isDragging && this.zoomLevel > 1) {
            this.translateX = touch.clientX - this.startX;
            this.translateY = touch.clientY - this.startY;
            this.applyZoom();
        } else {
            // Check for swipe
            const deltaX = touch.clientX - this.touchStartX;
            const deltaY = touch.clientY - this.touchStartY;
            
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
                this.isSwipe = true;
            }
        }
        
        e.preventDefault();
    }
    
    handleTouchEnd(e) {
        if (this.isDragging) {
            this.isDragging = false;
            this.lastTranslateX = this.translateX;
            this.lastTranslateY = this.translateY;
        } else if (this.isSwipe && this.zoomLevel === 1) {
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - this.touchStartX;
            
            if (deltaX > 50) {
                
                     this.nextPage();
            } else if (deltaX < -50) {
              
                 this.previousPage();
          
            }
        }
        
        this.isSwipe = false;
        e.preventDefault();
    }
    
    handleDoubleClick(e) {
        if (this.zoomLevel === 1) {
            this.zoomLevel = 2;
            
            // Zoom to clicked/tapped point
            const rect = this.imageContainer.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left - rect.width / 2;
            const y = (e.clientY || e.touches[0].clientY) - rect.top - rect.height / 2;
            
            this.translateX = -x / 2;
            this.translateY = -y / 2;
            this.lastTranslateX = this.translateX;
            this.lastTranslateY = this.translateY;
        } else {
            this.resetZoom();
        }
        
        this.applyZoom();
        e.preventDefault();
    }
    
    handleWheel(e) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        }
    }
    
    handleKeyboard(e) {
        switch (e.key) {
            case 'ArrowLeft':
                // In RTL, left arrow goes to next page
                this.nextPage();
                e.preventDefault();
                break;
            case 'ArrowRight':
                // In RTL, right arrow goes to previous page
                this.previousPage();
                e.preventDefault();
                break;
            case 'Home':
                this.currentPage = 1;
                this.loadCurrentImage();
                e.preventDefault();
                break;
            case 'End':
                this.currentPage = this.totalPages;
                this.loadCurrentImage();
                e.preventDefault();
                break;
            case '+':
            case '=':
                this.zoomIn();
                e.preventDefault();
                break;
            case '-':
                this.zoomOut();
                e.preventDefault();
                break;
            case '0':
                this.resetZoom();
                e.preventDefault();
                break;
            case 'Escape':
                if (this.zoomLevel > 1) {
                    this.resetZoom();
                }
                e.preventDefault();
                break;
        }
    }
}

// Handle pinch-to-zoom for touch devices
class PinchZoom {
    constructor(slider) {
        this.slider = slider;
        this.initialDistance = 0;
        this.initialZoom = 1;
        this.bindEvents();
    }
    
    bindEvents() {
        this.slider.imageContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                this.initialDistance = this.getDistance(e.touches[0], e.touches[1]);
                this.initialZoom = this.slider.zoomLevel;
            }
        }, { passive: false });
        
        this.slider.imageContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                
                const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                const scale = currentDistance / this.initialDistance;
                
                this.slider.zoomLevel = Math.max(
                    this.slider.minZoom,
                    Math.min(this.slider.maxZoom, this.initialZoom * scale)
                );
                
                this.slider.applyZoom();
            }
        }, { passive: false });
    }
    
    getDistance(touch1, touch2) {
        const dx = touch2.clientX - touch1.clientX;
        const dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Quran Slider...');
    
    const slider = new QuranSlider();
    const pinchZoom = new PinchZoom(slider);
    
    // Make slider globally accessible for debugging
    window.quranSlider = slider;
    
    // Add debug functions to window for testing
    window.testImage = () => {
        console.log('Testing image load...');
        const testUrl = 'https://via.placeholder.com/600x800/ffffff/000000?text=Test+Image';
        slider.currentImage.src = testUrl;
        console.log('Test image URL set:', testUrl);
    };
    
    window.checkElements = () => {
        console.log('Image Container:', slider.imageContainer);
        console.log('Current Image:', slider.currentImage);
        console.log('Current Image Source:', slider.currentImage?.src);
        console.log('Image Array Length:', slider.imageUrls?.length);
        console.log('Current Page:', slider.currentPage);
    };
    
    console.log('Quran Slider initialized successfully');
    console.log('Debug: Use window.testImage() to test image loading');
    console.log('Debug: Use window.checkElements() to check element status');
});

// Utility functions for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

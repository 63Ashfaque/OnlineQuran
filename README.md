# Online Quran Slider - القرآن الكريم

https://63ashfaque.github.io/OnlineQuran/


A modern, responsive web application for viewing Quran pages with advanced features including zoom, touch navigation, and lazy loading.

## Features

- 📱 **Responsive Design**: Works perfectly on mobile, tablet, and desktop devices
- 🖼️ **Full-Page Image Slider**: Beautiful full-screen Quran page viewing
- 🔍 **Zoom Functionality**: Zoom in/out with mouse wheel, touch pinch, or control buttons
- ➡️ **RTL Navigation**: Right-to-left slider navigation (swipe right for previous, left for next)
- ⚡ **Lazy Loading**: Only loads current and adjacent images for optimal performance
- 🎯 **Touch Gestures**: Swipe navigation, pinch-to-zoom, double-tap zoom
- ⌨️ **Keyboard Navigation**: Arrow keys, +/- zoom, Home/End shortcuts
- 🌐 **Offline Support**: Service worker for offline functionality
- 🎨 **Modern UI**: Beautiful gradient background with glass-morphism effects

## Navigation Controls

### Desktop
- **Arrow Keys**: Left/Right for page navigation
- **Mouse Wheel + Ctrl**: Zoom in/out
- **Double Click**: Toggle zoom
- **Click & Drag**: Pan when zoomed in
- **+/-/0 Keys**: Zoom controls and reset

### Mobile/Tablet
- **Swipe Right**: Previous page (RTL)
- **Swipe Left**: Next page (RTL)
- **Pinch**: Zoom in/out
- **Double Tap**: Toggle zoom
- **Touch & Drag**: Pan when zoomed in

### Touch Instructions
- الصفحة السابقة ← اسحب لليمين
- الصفحة التالية ← اسحب لليسار
- التكبير ← انقر مرتين أو اقرص
- التحريك ← اسحب عند التكبير

## File Structure

```
OnlineQuran/
├── index.html          # Main HTML file
├── styles.css          # Responsive CSS styles
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker for offline support
└── README.md          # This file
```

## Setup Instructions

### For Development

1. **Clone or download** the project files
2. **Open** `index.html` in a web browser
3. **For local development**, serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

4. **Open** `http://localhost:8000` in your browser

### For Production

1. **Upload** all files to your web server
2. **Update** the image URLs in `script.js`:

```javascript
// In the initializeImages() method, replace placeholder URLs
for (let i = 1; i <= this.totalPages; i++) {
    // Replace with your actual Quran page URLs
    this.imageUrls.push(`path/to/your/quran/pages/page_${i}.jpg`);
}
```

3. **Configure** your web server to serve the files
4. **Test** on different devices and browsers

## Customization

### Adding Your Quran Images

1. **Prepare** your Quran page images (recommended: 600x800px or higher)
2. **Upload** images to your server
3. **Update** the `imageUrls` array in `script.js`:

```javascript
initializeImages() {
    this.imageUrls = [
        'images/page_001.jpg',
        'images/page_002.jpg',
        'images/page_003.jpg',
        // ... add all 604 pages
    ];
    
    this.loadCurrentImage();
    this.preloadAdjacentImages();
}
```

### Customizing Styles

- **Colors**: Edit the CSS custom properties in `styles.css`
- **Fonts**: Change the Google Fonts import in `index.html`
- **Layout**: Modify the responsive breakpoints in `styles.css`
- **Language**: Update Arabic text in `index.html`

### Performance Optimization

- **Image Optimization**: Use WebP format for better compression
- **CDN**: Serve images from a Content Delivery Network
- **Caching**: Configure proper HTTP caching headers
- **Compression**: Enable gzip/brotli compression on your server

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Technical Features

### Image Loading Strategy
- **Current + Adjacent**: Only loads current page and next/previous
- **Memory Management**: Caches loaded images in memory
- **Error Handling**: Graceful fallback for failed image loads

### Touch & Gesture Support
- **Multi-touch**: Pinch-to-zoom with two fingers
- **Swipe Detection**: Horizontal swipe navigation
- **Double Tap**: Quick zoom toggle
- **Drag**: Pan around zoomed images

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Flexible Layout**: Adapts to any screen size
- **Touch Targets**: Appropriate button sizes for touch
- **Landscape Support**: Special handling for landscape orientation

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all files are properly uploaded
3. Verify image URLs are correct and accessible
4. Test with different browsers and devices

---

**بارك الله فيكم** - May Allah bless you

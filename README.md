# GAInTheHouse Portfolio Website

A personal portfolio website showcasing research projects, software projects, work experience, organizations, hobbies, and skills.

## 🎯 Recent Refactoring (2025)

This codebase has been significantly refactored to improve maintainability, readability, and ease of updates. Key improvements include:

### Major Changes

1. **Modularized JavaScript**
   - Extracted 500+ lines of inline JavaScript into separate modules
   - Created unified `LightboxManager` class to eliminate code duplication
   - Separated Firebase configuration into its own module
   - Improved code organization with clear separation of concerns

2. **Organized CSS Files**
   - Maintained separate CSS files for better organization
   - Each file handles a specific component (header, navigation, footer, etc.)
   - Easy to locate and modify specific styles
   - Clear separation of concerns

3. **Fully Dynamic Content System**
   - All content extracted into JSON files in the `data/` directory
   - Everything rendered dynamically on page load
   - Single source of truth for all content
   - Update content by editing JSON files only
   - No HTML changes needed for content updates

4. **Cleaner HTML**
   - Removed all inline JavaScript (previously 200+ lines scattered throughout)
   - Updated to use new modular structure
   - Better semantic HTML with improved readability

## 📁 Project Structure

```
gainthehouse.com/
├── public/
│   ├── index.html              # Main HTML file (clean, no inline scripts)
│   ├── css/
│   │   ├── bootstrap.min.css        # Bootstrap framework
│   │   ├── custom.css               # Base styles and utilities
│   │   ├── custom_header.css        # Header section styles
│   │   ├── custom_navigation.css    # Navigation bar styles
│   │   ├── custom_footer.css        # Footer section styles
│   │   ├── custom_gallery.css       # Gallery and responsive images
│   │   ├── custom_articles.css      # Articles section styles
│   │   └── custom_lightbox.css      # Modal/lightbox styles
│   ├── js/
│   │   ├── jquery-1.11.3.min.js
│   │   ├── bootstrap.min.js
│   │   ├── jquery.easing.min.js
│   │   ├── custom.js           # Navigation and smooth scrolling
│   │   ├── lightbox.js         # Unified modal/lightbox system
│   │   └── firebase-config.js  # Firebase initialization
│   ├── data/                   # Content data (NEW)
│   │   ├── research.json       # Research projects
│   │   ├── projects.json       # Software projects
│   │   ├── work-experience.json# Work history
│   │   ├── organizations.json  # Organizations & clubs
│   │   └── articles.json       # Press & articles
│   ├── images/                 # All image assets
│   ├── videos/                 # Video assets
│   ├── fonts/                  # Custom fonts
│   ├── fav/                    # Favicon files
│   └── *.pdf                   # Resume and presentations
├── firebase.json               # Firebase hosting config
├── README.md                   # This file
├── JSON_USAGE.md               # Guide to using JSON data
└── DATA_SCHEMA.md              # JSON schema reference
```

## 🚀 Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/GAInTheHouse/gainthehouse.com.git
   cd gainthehouse.com
   ```

2. Serve locally (choose one method):
   
   **Option A: Python HTTP Server**
   ```bash
   cd public
   python -m http.server 8000
   ```
   
   **Option B: Node.js http-server**
   ```bash
   npm install -g http-server
   cd public
   http-server -p 8000
   ```
   
   **Option C: PHP Built-in Server**
   ```bash
   cd public
   php -S localhost:8000
   ```

3. Open browser to `http://localhost:8000`

### Firebase Deployment

```bash
firebase deploy
```

## ✏️ Making Updates

### Updating Content

**Current State: Fully Dynamic** ✅

The website now renders ALL content dynamically from JSON files:
- 📊 **JSON**: Source of truth for all content
- 🔄 **Data Loader**: Renders content on page load from JSON files
- 📄 **HTML**: Contains only the structure (modals, containers)

**To update content:**

Simply edit the appropriate JSON file:
- **Research Projects**: `data/research.json`
- **Software Projects**: `data/projects.json`
- **Work Experience**: `data/work-experience.json`
- **Organizations**: `data/organizations.json`
- **Articles**: `data/articles.json`

Changes appear immediately when you reload the page!

### Adding New Projects

**All Sections (Fully Dynamic):**
1. Edit the appropriate JSON file (e.g., `data/projects.json`)
2. Add your new entry following the existing structure
3. Add any images to the `images/` directory
4. Reload the page - your content appears automatically!

No need to touch HTML anymore! 🎉

### Modifying Styles

Styles are organized into separate files by component:
- **Base styles**: `css/custom.css` - Colors, typography, content sections
- **Header**: `css/custom_header.css` - Header background and profile image
- **Navigation**: `css/custom_navigation.css` - Navbar and menu styles
- **Footer**: `css/custom_footer.css` - Footer and contact section
- **Gallery**: `css/custom_gallery.css` - Image galleries and responsive behavior
- **Articles**: `css/custom_articles.css` - Articles section layout
- **Lightbox**: `css/custom_lightbox.css` - Modal windows and slideshows

### Customizing JavaScript

- **Navigation behavior**: Edit `js/custom.js`
- **Data loading**: Edit `js/data-loader.js` (see [JSON_USAGE.md](JSON_USAGE.md))
- **Modal/Lightbox system**: Edit `js/lightbox.js`
- **Firebase settings**: Edit `js/firebase-config.js`

### Debugging

Open browser console to see:
- ✓ Data loading status for each section
- ⚠️ Validation warnings if JSON/HTML mismatch
- 💡 Tips and available debug commands

```javascript
// In browser console:
console.log(window.researchData);     // View loaded research data
console.log(window.projectsData);     // View loaded projects data
dataLoader.enableDynamicMode();       // Switch to full dynamic rendering
```

## 🔧 Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Responsive design with flexbox and media queries
- **JavaScript (ES6+)** - Modern JS with classes
- **jQuery** - DOM manipulation and effects
- **Bootstrap 3** - Grid system and components
- **Firebase** - Hosting and analytics

### Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Considerations

- Consolidated CSS reduces HTTP requests
- Modular JavaScript enables better caching
- Images are optimized for web
- Lazy loading can be added in future updates

## 📝 Code Quality

### Before Refactoring

- ❌ 1,373-line HTML file with inline JavaScript
- ❌ 5 copies of identical modal code (~500 lines)
- ❌ Hard-coded content throughout HTML
- ❌ Difficult to maintain and update

### After Refactoring

- ✅ Clean HTML with no inline scripts
- ✅ Single, reusable `LightboxManager` class
- ✅ Well-organized CSS files by component
- ✅ Structured JSON data files
- ✅ Easy to maintain and update
- ✅ Better organization and modularity

## 📖 Documentation

- **[README.md](README.md)** (this file) - Getting started and overview
- **[JSON_USAGE.md](JSON_USAGE.md)** - How JSON data is used and how to enable full dynamic mode
- **[DATA_SCHEMA.md](DATA_SCHEMA.md)** - Complete JSON schema reference

## 🛠️ Future Improvements

Potential enhancements for future iterations:

1. **Content Management**
   - Migrate to full dynamic rendering (see [JSON_USAGE.md](JSON_USAGE.md))
   - Implement loading states for dynamic content
   - Add content management interface

2. **Build System**
   - Add webpack or Vite for bundling
   - Minify CSS and JavaScript
   - Optimize images automatically

3. **Modern Framework**
   - Consider migrating to React, Vue, or Svelte
   - Use component-based architecture
   - Server-side rendering for better SEO

4. **Enhanced Features**
   - Add search functionality
   - Implement filtering for projects
   - Add dark mode toggle
   - Include animation library (e.g., AOS)

5. **Performance**
   - Consider CSS bundling/minification for production
   - Lazy load images
   - Add service worker for offline support
   - Implement CDN for assets

6. **Accessibility**
   - Add ARIA labels
   - Improve keyboard navigation
   - Test with screen readers

## 📄 License

Personal portfolio website. All rights reserved.

## 👤 Author

**Gautam Agarwal**
- Website: [gainthehouse.com](https://gainthehouse.com)
- GitHub: [@GAInTheHouse](https://github.com/GAInTheHouse)
- LinkedIn: [gainthehouse](https://www.linkedin.com/in/gainthehouse/)

---

**Note**: This refactoring was completed in October 2025 to modernize the codebase and make it significantly easier to work with and maintain.


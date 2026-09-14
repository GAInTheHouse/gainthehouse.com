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
│   │   ├── theme.css                # Design tokens, typography, and page layout
│   │   ├── components.css           # Navigation, cards, sections, and responsive UI
│   │   └── lightbox.css             # Modal/lightbox styles
│   ├── js/
│   │   ├── jquery-1.11.3.min.js
│   │   ├── bootstrap.min.js
│   │   ├── jquery.easing.min.js
│   │   ├── custom.js           # Navigation, data loading, and rendering
│   │   ├── lightbox.js         # Unified modal/lightbox system
│   │   └── firebase-config.js  # Firebase initialization
│   ├── data/                   # Content data (NEW)
│   │   ├── research.json       # Research projects
│   │   ├── projects.json       # Software projects
│   │   ├── work-experience.json# Work history
│   │   ├── organizations.json  # Organizations & clubs
│   │   ├── education.json      # Education history
│   │   ├── articles.json       # Press & articles
│   │   └── skills.json         # Skills grouped by category
│   ├── images/                 # All image assets
│   ├── videos/                 # Video assets
│   ├── fonts/                  # Custom fonts
│   ├── fav/                    # Favicon files
│   └── *.pdf                   # Resume and presentations
├── firebase.json               # Firebase hosting config
├── README.md                   # This file
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
- **Research Projects**: `public/data/research.json`
- **Software Projects**: `public/data/projects.json`
- **Work Experience**: `public/data/work-experience.json`
- **Organizations**: `public/data/organizations.json`
- **Education**: `public/data/education.json`
- **Articles**: `public/data/articles.json`
- **Skills**: `public/data/skills.json`

Changes appear immediately when you reload the page!

### Adding New Projects

**All Sections (Fully Dynamic):**
1. Edit the appropriate JSON file (e.g., `public/data/projects.json`)
2. Add your new entry following the existing structure
3. Add any images to the `public/images/` directory
4. Reload the page - your content appears automatically!

No need to touch HTML anymore! 🎉

### Modifying Styles

The active stylesheets are loaded from `public/index.html` in this order:
- **Theme and layout**: `public/css/theme.css` - Design tokens, typography, resets, and shared page layout
- **Site components**: `public/css/components.css` - Navigation, header, cards, content sections, footer, and responsive behavior
- **Lightbox**: `public/css/lightbox.css` - Modal, gallery, and slideshow styles

### Customizing JavaScript

- **Navigation, data loading, and section rendering**: Edit `public/js/custom.js`
- **Modal/Lightbox system**: Edit `public/js/lightbox.js`
- **Firebase settings**: Edit `public/js/firebase-config.js`

### Debugging

Open the browser console to see individual dataset-loading failures and other
runtime errors. Each dataset is loaded independently, so one failed request does
not prevent the remaining sections from rendering.

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
- **[DATA_SCHEMA.md](DATA_SCHEMA.md)** - Complete JSON schema reference

## 🛠️ Future Improvements

Potential enhancements for future iterations:

1. **Content Management**
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


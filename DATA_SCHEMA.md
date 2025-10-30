# Data Schema Documentation

This document describes the JSON data structure used for content management in the portfolio website.

## 📋 Overview

All content is stored in JSON files within the `public/data/` directory. This allows easy updates without modifying HTML or JavaScript code.

## 📁 File Descriptions

### research.json
Contains information about research projects and academic work.

**Location:** `public/data/research.json`

**Schema:**
```json
{
  "projects": [
    {
      "id": number,              // Unique identifier
      "title": string,           // Project title
      "period": string,          // Time period (e.g., "May 2021 - Dec 2022")
      "image": string,           // Path to main image
      "thumbnail": string,       // Path to thumbnail image
      "logo": string,           // Optional: Path to project logo
      "description": [string],  // Array of bullet points/paragraphs
      "links": [
        {
          "type": string,       // Link type: "paper", "document", "image", "external", "video"
          "url": string | null, // URL or file path (null for display-only images)
          "image": string,      // Optional: Icon/preview image
          "text": string        // Display text
        }
      ]
    }
  ]
}
```

**Example:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "Machine Learning To Identify Diabetic Pathways",
      "period": "May 2021 - Dec 2022",
      "image": "images/projectx_2022.jpg",
      "thumbnail": "images/projectx_2022.jpg",
      "description": [
        "Led team representing university in international ML research competition",
        "Applied 16 ML and Data Science Methods to correlate insulin & glucose levels"
      ],
      "links": [
        {
          "type": "paper",
          "url": "https://github.com/example/paper.pdf",
          "image": "images/paper_icon.png",
          "text": "Research Paper"
        }
      ]
    }
  ]
}
```

### projects.json
Contains software development projects and hackathon work.

**Location:** `public/data/projects.json`

**Schema:** Same as `research.json` with additional link types:
- `"github"` - GitHub repository link
- `"devpost"` - Devpost project link

**Example:**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "MeetFree",
      "period": "May 2024 - June 2024",
      "image": "images/meetFree.jpeg",
      "thumbnail": "images/meetFree.jpeg",
      "description": [
        "Built web application to record and auto-summarize meetings"
      ],
      "links": [
        {
          "type": "github",
          "url": "https://github.com/username/meetfree",
          "text": "Project Repository"
        }
      ]
    }
  ]
}
```

### work-experience.json
Contains professional work history and internships.

**Location:** `public/data/work-experience.json`

**Schema:**
```json
{
  "experiences": [
    {
      "id": number,
      "title": string,           // Position and company (e.g., "Software Engineer - Epic Systems")
      "subtitle": string,        // Additional info (team, dates)
      "image": string,           // Company logo
      "thumbnail": string,       // Thumbnail version
      "description": [string]    // Array of accomplishments/responsibilities
    }
  ]
}
```

**Example:**
```json
{
  "experiences": [
    {
      "id": 1,
      "title": "Software Engineer - Epic Systems",
      "subtitle": "Epic Assistant - Natural Language Platform | Mar 2023 - Present",
      "image": "images/epic.svg",
      "thumbnail": "images/epic.svg",
      "description": [
        "Created general-purpose NLP library to support user interactions",
        "Set up LLM integration for conversational AI chatbot platform"
      ]
    }
  ]
}
```

### organizations.json
Contains student organizations, clubs, and leadership roles.

**Location:** `public/data/organizations.json`

**Schema:**
```json
{
  "organizations": [
    {
      "id": number,
      "name": string,            // Organization name
      "position": string,        // Your role (e.g., "President", "Co-founder")
      "image": string,           // Organization image/logo
      "thumbnail": string,       // Thumbnail version
      "logo": string,           // Optional: Separate logo
      "description": string,     // About the organization
      "role": string,           // Your specific contributions
      "links": [
        {
          "type": string,       // Types: "document", "image", "video", "external", "linkedin"
          "url": string | null,
          "image": string,      // Optional
          "text": string
        }
      ]
    }
  ]
}
```

**Example:**
```json
{
  "organizations": [
    {
      "id": 1,
      "name": "dotData Science",
      "position": "President",
      "image": "images/dotData.png",
      "thumbnail": "images/dotData.png",
      "description": "Data Science Club connecting students across campus...",
      "role": "Organize workshops and networking events for 525 members",
      "links": [
        {
          "type": "external",
          "url": "http://dotdatascience.org/",
          "text": "Website"
        }
      ]
    }
  ]
}
```

### articles.json
Contains press coverage, articles, podcasts, and media appearances.

**Location:** `public/data/articles.json`

**Schema:**
```json
{
  "articles": [
    {
      "id": number,
      "title": string,           // Article title or description
      "image": string,           // Preview image
      "url": string              // Link to article/media
    }
  ]
}
```

**Example:**
```json
{
  "articles": [
    {
      "id": 1,
      "title": "Data Science In Wisconsin",
      "image": "images/638.png",
      "url": "https://madison.com/article-link"
    }
  ]
}
```

## 🔧 Link Types Reference

### Common Link Types

| Type | Usage | Example URL |
|------|-------|-------------|
| `paper` | Research papers | `"https://arxiv.org/paper.pdf"` |
| `document` | PDFs, presentations | `"presentation.pdf"` |
| `image` | Display-only images | `null` (url can be null) |
| `external` | External websites | `"https://example.com"` |
| `video` | Video files | `"videos/demo.mp4"` |
| `github` | GitHub repositories | `"https://github.com/user/repo"` |
| `devpost` | Devpost projects | `"https://devpost.com/software/project"` |
| `linkedin` | LinkedIn profiles/pages | `"https://linkedin.com/in/profile"` |

## ✏️ Adding New Content

### Step-by-Step Guide

1. **Choose the appropriate JSON file** based on content type
2. **Copy an existing entry** as a template
3. **Update the `id`** to be unique (increment from the last entry)
4. **Fill in your content**
5. **Add any images** to `public/images/`
6. **Validate JSON** using [JSONLint](https://jsonlint.com/)
7. **Test locally** before deploying

### Example: Adding a New Project

```json
{
  "projects": [
    // ... existing projects ...
    {
      "id": 5,  // New unique ID
      "title": "Your New Project",
      "period": "Jan 2025 - Present",
      "image": "images/new-project.jpg",
      "thumbnail": "images/new-project.jpg",
      "description": [
        "First key accomplishment or feature",
        "Second key accomplishment or feature",
        "Third key accomplishment or feature"
      ],
      "links": [
        {
          "type": "github",
          "url": "https://github.com/yourusername/project",
          "text": "View on GitHub"
        },
        {
          "type": "external",
          "url": "https://project-demo.com",
          "text": "Live Demo"
        }
      ]
    }
  ]
}
```

## ⚠️ Common Mistakes

### 1. Invalid JSON Syntax
```json
// ❌ WRONG - Trailing comma
{
  "projects": [
    { "id": 1, "title": "Project" },  // <- No comma after last item
  ]
}

// ✅ CORRECT
{
  "projects": [
    { "id": 1, "title": "Project" }
  ]
}
```

### 2. Missing Required Fields
```json
// ❌ WRONG - Missing required fields
{
  "id": 1,
  "title": "Project"
  // Missing: image, thumbnail, description
}

// ✅ CORRECT
{
  "id": 1,
  "title": "Project",
  "image": "images/project.jpg",
  "thumbnail": "images/project.jpg",
  "description": ["Description here"]
}
```

### 3. Incorrect File Paths
```json
// ❌ WRONG - Incorrect path
"image": "/images/project.jpg"  // Don't use leading slash

// ✅ CORRECT
"image": "images/project.jpg"   // Relative to public/
```

## 🧪 Testing Your Changes

### Local Testing Checklist

- [ ] JSON validates with no errors
- [ ] All image paths are correct
- [ ] External links work
- [ ] Content displays correctly in all modals
- [ ] Mobile view looks good
- [ ] No console errors in browser

### Validation Tools

1. **JSON Validator**: [JSONLint](https://jsonlint.com/)
2. **Browser DevTools**: Check Console for errors
3. **Network Tab**: Verify files are loading

## 🎨 Styling Considerations

### Images

- **Recommended size**: 800x600px for project images
- **Format**: JPG for photos, PNG for logos, SVG for icons
- **Optimization**: Compress images before uploading

### Text

- **Bullet points**: Keep each point concise (1-2 lines)
- **Periods**: Don't include periods at the end of bullet points
- **Dates**: Use format "Mon YYYY - Mon YYYY" or "Mon YYYY - Present"

## 🔄 Migration Notes

If you're migrating content from the old HTML format:

1. Find the HTML section (e.g., research projects)
2. Extract the content from `<li>` tags or paragraphs
3. Convert to JSON array format
4. Add metadata (id, images, dates)
5. Validate and test

## 📚 Further Reading

- [JSON Specification](https://www.json.org/)
- [MDN JSON Guide](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)
- Main project [README.md](README.md)

---

Last updated: October 30, 2025


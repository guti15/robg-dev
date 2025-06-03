# Robert Gutierrez Personal Website

A personal website for Robert Gutierrez built with 11ty (Eleventy), hosted at [robg.dev](https://robg.dev), and featuring light/dark mode, cryptocurrency wallet integration, and more.

## Features

- Responsive design with light and dark mode
- SEO optimized with metadata, sitemap, and robots.txt
- Cryptocurrency wallet page with QR codes and copy functionality
- Blog section (placeholder for future content)
- GitHub Pages deployment workflow

## Technologies Used

- [11ty (Eleventy)](https://www.11ty.dev/) - Static site generator
- HTML, CSS, JavaScript - Frontend
- Python - QR code generation
- GitHub Actions - Automated deployment
- GitHub Pages - Hosting

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [Python](https://www.python.org/) (v3.6 or newer)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/robg-dev.git
   cd robg-dev
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Install Python dependencies:
   ```bash
   pip install qrcode pillow
   ```

4. Generate QR codes:
   ```bash
   python scripts/generate_qr.py
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:8080`

## Building for Production

To build the site for production:

```bash
npm run build
```

The built site will be in the `public` directory.

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch. The deployment is handled by the GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

## Project Structure

```
personal_website/
├── .eleventy.js                # 11ty configuration
├── .github/                    # GitHub Actions workflows
├── src/                        # Source files
│   ├── _data/                  # Data files for 11ty
│   ├── _includes/              # Templates and partials
│   ├── assets/                 # Static assets
│   ├── blog/                   # Blog posts
│   ├── pages/                  # Main pages
│   └── index.njk               # Homepage
├── scripts/                    # Python scripts
├── doc/                        # Documents (resume, etc.)
├── img/                        # Original images
└── public/                     # Generated site (not in repo)
```

## License

MIT

## Author

Robert Gutierrez

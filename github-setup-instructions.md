# GitHub Repository Setup Instructions

Follow these steps to create a GitHub repository and push your local repository to it:

## 1. Create a new repository on GitHub

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Enter "robg-dev" as the repository name
4. Add a description (optional): "Personal website hosted at robg.dev"
5. Keep the repository public
6. Do NOT initialize with a README, .gitignore, or license (since we already have these files locally)
7. Click "Create repository"

## 2. Push your local repository to GitHub

After creating the repository, GitHub will show you commands to push an existing repository. Run the following commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/robg-dev.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the "gh-pages" branch
5. The site will be automatically built and deployed by the GitHub Actions workflow

## 4. Configure Custom Domain

1. In the GitHub Pages section of your repository settings
2. Enter "robg.dev" in the "Custom domain" field
3. Click "Save"
4. Check "Enforce HTTPS" once the DNS is properly configured

## 5. Configure DNS for Your Domain

Log in to your domain registrar (where you purchased robg.dev) and add the following DNS records:

| Type  | Name | Value               |
|-------|------|---------------------|
| A     | @    | 185.199.108.153     |
| A     | @    | 185.199.109.153     |
| A     | @    | 185.199.110.153     |
| A     | @    | 185.199.111.153     |
| CNAME | www  | YOUR_USERNAME.github.io |

Replace `YOUR_USERNAME` with your actual GitHub username.

DNS changes can take up to 48 hours to propagate, but often happen much faster.

## 6. Verify Setup

Once the DNS changes have propagated, your website should be accessible at:
- https://robg.dev
- https://www.robg.dev

The GitHub Actions workflow will automatically build and deploy your site whenever you push changes to the main branch.

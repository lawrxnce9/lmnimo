# LM Auto Deals 🇺🇸🇬🇭 — Personal Car Shopper Website

This is a small static website scaffold for a personal car shopper who purchases cars from U.S. dealerships and ships to clients worldwide. It includes categories for Luxury, Sports, Hybrid, and Affordable cars, sample images, and a contact form that collects visitor contact information.

How to view locally

```bash
open ~/Desktop/practice/car-site/index.html
```

Notes and next steps
- Replace Unsplash placeholder images with your own photos in `car-site/images/` for consistent branding.
- Hook the contact form to a real backend (email service, Formspree, or your server) to receive leads.
- I can add listing detail pages, admin editing, or deployment instructions for Netlify/Vercel/GitHub Pages.

Contact info shown on the site:
- Phone: +1 734 877 0577
- Email: olawrence959@gmail.com

## Deployment (GitHub Pages)

To publish this site on GitHub Pages (simple and free):

1. Initialize git, commit, and push to GitHub (replace <your-username> and <repo-name>):

```bash
cd /Users/lawrenceowusu/Desktop/practice/car-site
git init
git add .
git commit -m "Initial commit — car site"
git branch -M main
# create repo on GitHub web UI or use the GitHub CLI (gh)
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

2. In GitHub, open the repository → Settings → Pages → Source: select "main" branch and folder `/ (root)` → Save. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

3. Verify the site and test the contact form (Formspree) and image loading.

If you'd like, I can prepare the repo, help you create it via the `gh` CLI, or push the code for you — tell me the repository name and whether you want me to proceed.

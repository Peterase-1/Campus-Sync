# 🚀 Netlify Deployment Guide

## Quick Deploy to Netlify

### Method 1: Connect GitHub Repository (Recommended)

1. **Go to [Netlify](https://netlify.com)**
2. **Sign in** with your GitHub account
3. **Click "New site from Git"**
4. **Choose GitHub** and select your repository: `Peterase-1/Campus-Sync`
5. **Configure build settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18`
6. **Click "Deploy site"**

### Method 2: Drag & Drop Deployment

1. **Build the project locally:**
   ```bash
   npm run build
   ```
2. **Go to [Netlify](https://netlify.com)**
3. **Drag the `dist` folder** to the deploy area
4. **Your site is live!**

## 🔧 Build Configuration

The project is already configured for Netlify with:

- **`netlify.toml`**: Netlify configuration file
- **`public/_redirects`**: SPA routing support
- **Optimized build**: Vite production build
- **SPA routing**: React Router support

## 📁 Build Output

After running `npm run build`, you'll get:

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-*.css     # Compiled CSS
│   └── index-*.js      # Compiled JavaScript
└── _redirects          # SPA routing support
```

## 🌐 Environment Variables

No environment variables needed for basic deployment.

## 🔄 Automatic Deployments

Once connected to GitHub:
- **Automatic builds** on every push to main branch
- **Preview deployments** for pull requests
- **Instant rollbacks** if needed

## 📊 Performance

- **Build size**: ~365KB JavaScript (104KB gzipped)
- **CSS size**: ~51KB (7.6KB gzipped)
- **Load time**: Fast with Vite optimization
- **SEO ready**: Proper meta tags and structure

## 🎯 Custom Domain

After deployment:
1. Go to **Site settings** → **Domain management**
2. **Add custom domain** (e.g., `campus-sync.com`)
3. **Configure DNS** as instructed
4. **Enable HTTPS** (automatic with Netlify)

## 🚀 Deployment Checklist

- [x] Build command: `npm run build`
- [x] Publish directory: `dist`
- [x] Node version: `18`
- [x] SPA routing: Configured
- [x] Redirects: Set up
- [x] Build optimization: Enabled

## 🎉 Your Site is Ready!

Once deployed, your Campus Sync app will be available at:
`https://your-site-name.netlify.app`

---

**Need help?** Check the [Netlify documentation](https://docs.netlify.com/) or create an issue in the repository.

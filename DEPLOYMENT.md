# GitHub & Render Deployment Guide

## Step 1: Initialize Local Git Repository

```bash
cd c:\Users\djsce.student\a034
git init
git add .
git commit -m "Initial commit: Flask password strength checker"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click "New" to create a new repository
3. Name it: `password-strength-checker`
4. Add description: "A modern web app to check password strength with real-time feedback"
5. Choose Public (for Render free tier)
6. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/password-strength-checker.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 4: Deploy on Render

### Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Authorize Render to access your GitHub account

### Deploy the App
1. Dashboard → Click "New +" 
2. Select "Web Service"
3. Connect your GitHub account
4. Select `password-strength-checker` repository
5. Configure settings:
   - **Name**: password-strength-checker
   - **Environment**: Python 3
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free or Starter

6. Click "Create Web Service"
7. Wait for deployment (2-3 minutes)

### Your App Will Be Live At:
`https://password-strength-checker.onrender.com`

## Environment Variables (Optional)

In Render Dashboard → Environment:
```
SECRET_KEY=your-super-secret-key-here
```

## Testing the Deployment

1. Visit: `https://password-strength-checker.onrender.com`
2. Test password strength checker
3. Generate random passwords
4. Copy passwords to clipboard

## Auto-Deployment

After this setup, any time you:
```bash
git push origin main
```

Render will automatically rebuild and redeploy your app!

## Troubleshooting

**App not loading?**
- Check Render Logs: Dashboard → Select App → Logs
- Verify `Procfile` is in root directory
- Ensure `requirements.txt` has all dependencies

**Port issues?**
- Render sets PORT environment variable automatically
- App.py already handles this: `port = int(os.environ.get('PORT', 5000))`

**Dependencies missing?**
- Add to `requirements.txt`
- Push to GitHub
- Render will auto-rebuild

## Quick Start Commands

```bash
# Local testing
python app.py

# Push to GitHub
git add .
git commit -m "Your message"
git push origin main

# Monitor Render logs
# Visit Render Dashboard → Logs
```

## Security Tips for Production

1. Set strong `SECRET_KEY` in environment variables
2. Set `debug=False` in production (already done in app.py)
3. Use HTTPS (Render provides this automatically)
4. Keep dependencies updated
5. Monitor error logs regularly

---

Your password strength checker is now ready for the world! 🚀

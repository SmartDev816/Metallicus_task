# Run These Commands in Git Bash

## Solution: Reinitialize Git (Fresh Start)

**Copy and paste these commands one by one in your Git Bash terminal:**

```bash
# Step 1: Remove old .git folder
rm -rf .git

# Step 2: Initialize fresh git repository
git init

# Step 3: Add all files
git add .

# Step 4: Check status (should show files staged)
git status

# Step 5: Commit
git commit -m "Initial commit - Loan Stats Dashboard with period selector"

# Step 6: Rename branch to main
git branch -M main

# Step 7: Add your GitHub repository (REPLACE YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/loan-stats.git

# Step 8: Verify remote
git remote -v

# Step 9: Push to GitHub
git push -u origin main
```

---

## Before Running: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `loan-stats`
3. **DO NOT** check "Initialize with README"
4. Click "Create repository"
5. Copy the repository URL

---

## If Step 7 Fails (Remote Already Exists)

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/YOUR_USERNAME/loan-stats.git
```

---

## If You Get Authentication Error

When you run `git push`, you may be asked for credentials:
- Username: Your GitHub username
- Password: Use a **Personal Access Token** (not your GitHub password)
  - Create token: https://github.com/settings/tokens
  - Click "Generate new token (classic)"
  - Select scope: `repo`
  - Copy token and use as password

---

## Alternative: Use GitHub Desktop (Easier)

If git commands still don't work:

1. Download: https://desktop.github.com/
2. Install and login
3. File → Add Local Repository
4. Select: `D:\Hometask\React`
5. Click "Publish repository"


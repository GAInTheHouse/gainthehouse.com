# GitHub Actions Deployment Setup

This repository is configured to automatically deploy to Firebase Hosting whenever changes are pushed to the `master` branch.

## Setup Instructions

To enable automatic deployment, you need to add your Firebase service account credentials to GitHub Secrets:

### Step 1: Generate Firebase Service Account Key

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **website-gainthehouse**
3. Click on the gear icon (⚙️) and go to **Project Settings**
4. Navigate to the **Service Accounts** tab
5. Click **Generate New Private Key**
6. Save the downloaded JSON file securely

### Step 2: Add Secret to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_SERVICE_ACCOUNT_WEBSITE_GAINTHEHOUSE`
5. Value: Paste the entire contents of the JSON file you downloaded
6. Click **Add secret**

### Step 3: Commit and Push

Once the secret is added, commit and push the workflow files:

```bash
git add .github/
git commit -m "Add GitHub Actions workflow for Firebase deployment"
git push origin master
```

## How It Works

### Automatic Deployment (firebase-hosting-merge.yml)
- **Trigger**: Pushes to the `master` branch
- **Action**: Automatically deploys to Firebase Hosting production
- **Channel**: Live (production)

### Pull Request Previews (firebase-hosting-pull-request.yml)
- **Trigger**: Pull requests
- **Action**: Creates a preview deployment with a unique URL
- **Channel**: Temporary preview channel (automatically cleaned up)

## Workflow Files

- `.github/workflows/firebase-hosting-merge.yml` - Production deployment
- `.github/workflows/firebase-hosting-pull-request.yml` - PR preview deployment

## Verification

After pushing your changes:
1. Go to the **Actions** tab in your GitHub repository
2. You should see the workflow running
3. Click on the workflow run to see detailed logs
4. Once complete, your site will be live at your Firebase Hosting URL

## Troubleshooting

If the deployment fails:
- Verify the secret name matches exactly: `FIREBASE_SERVICE_ACCOUNT_WEBSITE_GAINTHEHOUSE`
- Ensure the JSON file contains valid service account credentials
- Check the Actions tab for detailed error messages
- Verify your Firebase project ID is correct: `website-gainthehouse`


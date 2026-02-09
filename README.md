# Aiwithaman - Cloud & DevOps Engineer Portfolio

A professional portfolio website showcasing cloud and DevOps engineering skills.

## Features

- Responsive design
- Modern dark theme
- Smooth animations
- Contact form
- Skills and projects showcase

## Deployment

This website is automatically deployed to AWS S3 using GitHub Actions.

### Setup Instructions

1. **Create an S3 bucket:**
   ```bash
   aws s3 mb s3://your-bucket-name
   aws s3 website s3://your-bucket-name --index-document index.html --error-document index.html
   ```

2. **Configure S3 bucket for static website hosting:**
   - Enable static website hosting in S3 bucket settings
   - Set index document to `index.html`
   - Make bucket public (or use CloudFront for better security)

3. **Set bucket policy (for public access):**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

4. **Create IAM user with S3 access:**
   - Create an IAM user with programmatic access
   - Attach policy: `AmazonS3FullAccess` (or create a custom policy with minimal permissions)
   - Save the Access Key ID and Secret Access Key

5. **Add GitHub Secrets:**
   Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

   Add the following secrets:
   - `AWS_ACCESS_KEY_ID` - Your AWS access key
   - `AWS_SECRET_ACCESS_KEY` - Your AWS secret key
   - `AWS_REGION` - Your AWS region (e.g., us-east-1)
   - `S3_BUCKET_NAME` - Your S3 bucket name
   - `CLOUDFRONT_DISTRIBUTION_ID` - (Optional) Your CloudFront distribution ID

6. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The workflow will automatically deploy your website on every push to the main branch.

## Optional: CloudFront Setup

For better performance and HTTPS support:

1. Create a CloudFront distribution pointing to your S3 bucket
2. Add the distribution ID to GitHub secrets as `CLOUDFRONT_DISTRIBUTION_ID`
3. The workflow will automatically invalidate the cache after deployment

## Local Development

Simply open `index.html` in your browser to view the website locally.

## Customization

- Update personal information in `index.html`
- Modify colors and styles in `styles.css`
- Add your projects and skills
- Update contact information

## License

© 2026 Aiwithaman. All rights reserved.

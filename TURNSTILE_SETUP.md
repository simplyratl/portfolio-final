# Cloudflare Turnstile Setup Guide

This guide will help you set up Cloudflare Turnstile for bot protection on your AI chat feature.

## What is Cloudflare Turnstile?

Cloudflare Turnstile is a privacy-preserving alternative to reCAPTCHA that helps protect your website from bots and automated attacks. It's invisible to most users and provides better privacy protection.

## Setup Steps

### 1. Create a Cloudflare Account

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign up for a free account if you don't have one
3. Verify your email address

### 2. Access Turnstile

1. In your Cloudflare dashboard, navigate to "Turnstile" in the left sidebar
2. If you don't see it, make sure you're using the new dashboard interface

### 3. Create a Site

1. Click "Add site"
2. Enter your domain name (e.g., `example.com` or `localhost` for development)
3. Choose "Managed (Recommended)" for the widget mode
4. Click "Create"

### 4. Get Your Keys

After creating the site, you'll see:

- **Site Key** - This is public and goes in your frontend
- **Secret Key** - This is private and goes in your backend

### 5. Add Environment Variables

Add these to your `.env.local` file:

```bash
# Cloudflare Turnstile Configuration
NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY=your_site_key_here
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_secret_key_here
```

### 6. Development vs Production

- For **development**: You can use `localhost` as your domain
- For **production**: Use your actual domain name

## Testing

1. Start your development server: `pnpm dev`
2. Navigate to `/ai`
3. Try sending a message - you should see the Turnstile widget working invisibly
4. Check the browser console for any errors

## Rate Limiting

The implementation includes built-in rate limiting:

- **10 requests per 5 minutes** per IP address
- Rate limit info is shown when you have 3 or fewer requests remaining
- Blocked users see a clear error message

## Security Features

✅ **Invisible Captcha**: Users don't see any challenges in most cases  
✅ **Rate Limiting**: Prevents spam and abuse  
✅ **IP-based Tracking**: Tracks requests per IP address  
✅ **Development Mode**: Works without configuration in development  
✅ **Error Handling**: Graceful fallbacks for all error scenarios

## Troubleshooting

### Error 110200

This means your site key is invalid or not configured properly. Check:

- Site key is correct
- Domain matches what you configured in Cloudflare
- Site key is public (starts with `0x4`)

### Development Mode

If you don't configure Turnstile keys, the app will:

- Show a blue info banner
- Work normally but without bot protection
- Log warnings to the console

### Rate Limiting

If users hit rate limits:

- They'll see a clear error message
- They can try again after 5 minutes
- Headers show remaining requests

## Production Deployment

When deploying to production:

1. Make sure your domain is added to Cloudflare Turnstile
2. Update your environment variables on your hosting platform
3. Test the functionality after deployment

## Support

- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [Turnstile Error Codes](https://developers.cloudflare.com/turnstile/reference/error-codes/)

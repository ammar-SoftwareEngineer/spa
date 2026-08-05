# S&PA Website (spa)

موقع شركة S&PA مبني بـ Next.js + next-intl.

## التشغيل

```bash
npm install
npm run dev
```

## ربط الباكند لاحقاً

أضف في `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_IMAGE_HOST=cdn.your-domain.com
```

SEO جاهز على `/sitemap.xml` و `/robots.txt`.

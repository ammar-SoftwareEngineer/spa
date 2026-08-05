# دليل دراسة كود موقع S&PA (spa)

دليل بسيط بالعربي عشان تفهم المشروع وتقدر تعدّل عليه بنفسك.
المستوى المستهدف: مبتدئ → mid في Next.js.

---

## 1) إيه هو المشروع؟

موقع شركة **S&PA** (مقاولات MEP) مبني بـ:

| التقنية | ليه مستخدمة؟ |
|---------|---------------|
| **Next.js 16** (App Router) | صفحات + SEO + أداء |
| **React 19** | واجهة المستخدم |
| **Tailwind CSS 4** | ستايل سريع بدون ملفات CSS كتير |
| **next-intl** | عربي / إنجليزي + RTL |
| **Framer Motion** | أنيميشن ظهور بسيط (`Reveal`) |
| **Swiper** | سلايدر الشركاء والجاليري |

المجلد الرئيسي للكود: `spa/src/`

---

## 2) هيكل المجلدات (احفظ الشكل ده في دماغك)

```
spa/
├── messages/          ← نصوص الترجمة (ar / en)
├── public/            ← صور وملفات ثابتة
├── docs/              ← الدليل ده + PDF
└── src/
    ├── app/           ← الصفحات (الـ routes)
    │   ├── sitemap.ts ← /sitemap.xml
    │   ├── robots.ts  ← /robots.txt
    │   └── [locale]/ ← كل صفحة تحت /ar أو /en
    ├── components/    ← قطع الواجهة
    ├── i18n/          ← إعداد اللغات
    ├── lib/
    │   ├── api/       ← جلب البيانات (JSON دلوقتي / باكند لاحقاً)
    │   └── data/      ← ملفات JSON المحلية
    ├── styles/        ← globals.css
    └── types/         ← أنواع TypeScript
```

### قاعدة ذهبية

- **صفحة** في `app/` = تجمع بيانات وتعرض كومبوننتات
- **كومبوننت** في `components/` = شكل الواجهة
- **API** في `lib/api/` = منين بتيجي البيانات
- **ترجمة** في `messages/` = النصوص المعروضة

---

## 3) إزاي الصفحة بتشتغل؟ (مسار الطلب)

```
المستخدم يفتح /ar/products
        ↓
proxy.ts (next-intl middleware) يحدد اللغة
        ↓
app/[locale]/layout.tsx يلف الصفحة بهيدر وفوتر
        ↓
app/[locale]/products/page.tsx
        ↓
يستدعي getProducts() من lib/api
        ↓
يعرض كومبوننت Products
```

### مثال صفحة بسيطة

كل صفحة تقريباً بنفس الشكل:

1. `generateMetadata` → عنوان ووصف للـ SEO
2. `setRequestLocale(locale)` → تثبيت اللغة
3. رجّع JSX من كومبوننتات

---

## 4) اللغات (i18n) باختصار

- اللغات: `ar` (افتراضي) و `en`
- الإعداد: `src/i18n/routing.ts`
- الروابط المترجمة: استخدم `Link` من `@/i18n/navigation` مش من `next/link`
- النصوص: `useTranslations` (client) أو `getTranslations` (server)
- الاتجاه: `dir="rtl"` للعربي في الـ layout

### ليه في `titleKey` مش عنوان جاهز؟

البيانات في JSON فيها مفاتيح زي `"titleKey": "something"`.
النص الفعلي موجود في `messages/ar` و `messages/en`.

يعني:

```ts
const title = t(product.titleKey); // يجيب النص حسب اللغة الحالية
```

لما الباكند يجهز ويبعّت نص مترجم جاهز، تقدر تعدّل الـ types وتستخدم `product.title` مباشرة.

---

## 5) طبقة البيانات (الأهم للباكند)

### الملفات

- `lib/api/client.ts` → `apiGet` / `apiPost` / `hasRemoteApi`
- `lib/api/products.ts` وباقى الملفات → دوال `getX()`
- `lib/api/forms.ts` → إرسال الفورمز

### الوضع الحالي

مفيش `NEXT_PUBLIC_API_URL` → البيانات من JSON المحلي.

### لما الباكند يخلص

1. حط في `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NEXT_PUBLIC_IMAGE_HOST=cdn.your-domain.com
```

2. الدوال زي `getProducts()` هتتحول تلقائياً لـ `fetch` من الـ API
3. الفورمز (`submitContact` / `submitProductInquiry` / `submitNewsletter`) هتبعت POST للباكند

**مفيش حاجة تتغيّر في أغلب الكومبوننتات** — ده هدف التقسيمة.

---

## 6) Container و Section

- `Container` = عرض الصفحة الموحّد (`container` + padding)
- `Section` = سكشن + Container جواه

استخدمهم بدل ما تكتب `max-w-[1200px]` في كل مكان.
`max-w-*` تفضل فقط لتضييق **عرض النص** للقراءة (مش عرض الصفحة).

---

## 7) SEO

| الملف | النتيجة |
|-------|---------|
| `app/sitemap.ts` | `/sitemap.xml` |
| `app/robots.ts` | `/robots.txt` |
| `layout.tsx` → `generateMetadata` | عنوان، وصف، Open Graph، hreflang |
| كل صفحة | `generateMetadata` خاص بيها |

مهم قبل النشر:

```env
NEXT_PUBLIC_SITE_URL=https://your-real-domain.com
```

بدون الرابط الصح، الـ sitemap هيستخدم localhost.

---

## 8) Server vs Client Components

### Server (الافتراضي)

- بتجيب بيانات
- أحسن للـ SEO والأداء
- مثال: أغلب صفحات التفاصيل، الفوتر، الـ overview

### Client (`"use client"`)

بس لما تحتاج:

- state / events (كليك، فورم)
- hooks زي `usePathname`
- مكتبات زي Swiper / react-hook-form

أمثلة: `Header`, `ProductInquiryForm`, `ProjectFilters`, `PartnersSwiper`

**نصيحة أداء:** خلي الجزء التفاعلي صغير، والباقي Server.

---

## 9) أهم الكومبوننتات

| الملف | دوره |
|-------|------|
| `layout/header/Header.tsx` | شريط علوي (مجمّع من Desktop/Mobile/Actions) |
| `layout/footer/Footer.tsx` | فوتر |
| `ui/Section.tsx` | سكشن صفحة |
| `ui/Container.tsx` | عرض موحّد |
| `ui/PageHero.tsx` | هيرو الصفحات الداخلية |
| `ui/Reveal.tsx` | أنيميشن ظهور |
| `Products/*` | منتجات |
| `Projects/*` | مشاريع + فلتر |
| `Services/*` | خدمات |
| `ContactUs/*` | تواصل |

قاعدة: **لو الملف زاد عن ~150 سطر → قسّمه**.

---

## 10) إزاي تضيف صفحة جديدة؟ (خطوات)

1. أنشئ `src/app/[locale]/my-page/page.tsx`
2. اكتب `generateMetadata` + الكومبوننت
3. زوّد رابط في `lib/data/navbar.json`
4. زوّد نصوص في `messages/ar` و `messages/en`
5. ضيف المسار في `app/sitemap.ts` لو عايز يتفهرس

---

## 11) إزاي تعدّل منتج / مشروع؟

- البيانات الهيكلية: `src/lib/data/*.json`
- النصوص: `messages/*/products.json` أو `projects.json` أو `services.json`
- الصور: حطها في `public/` وحدّث المسار في JSON

---

## 12) أوامر مفيدة

```bash
cd spa
npm install
npm run dev      # تشغيل محلي
npm run build    # بناء للإنتاج (مهم قبل النشر)
npm run start    # تشغيل البناء
npm run lint     # فحص أخطاء
```

---

## 13) الأداء — ليه الموقع سريع؟

1. صفحات تقدر تتعمل Static (شلنا `force-dynamic` الزايد)
2. `next/image` للصور
3. Server Components أغلب الوقت
4. `Reveal` على أقسام مش على كل كارت لما العدد كبير
5. طبقة API جاهزة للـ caching (`revalidate`)

### نصائح لما تكبر

- استخدم CDN للصور
- فلترة المشاريع الكبيرة على السيرفر (مش كلها في المتصفح)
- قسّم رسائل الترجمة لو بقت ضخمة
- راقب حجم الـ Client Bundle

---

## 14) مشاكل متوقعة لو المشروع كبر والدنيا مش مضبوطة

1. **JSON محلي ضخم** → بطء build وصعوبة إدارة محتوى → حل: CMS أو باكند
2. **فلترة Client لكل المشاريع** → بطء على الموبايل → حل: query params + فلترة سيرفر
3. **`"use client"` زيادة** → JS كتير يتحمّل → حل: قسّم التفاعل
4. **صور بدون أحجام/CDN** → LCP وحش → حل: `next/image` + CDN + `sizes` صح
5. **تكرار JSX** → صعب التعديل → حل: primitives زي `Section` / `Container` / `MediaContentBlock`
6. **مفيش `metadataBase` / sitemap** → SEO ضعيف → موجودين دلوقتي، حافظ عليهم
7. **نسيان env في الإنتاج** → روابط sitemap غلط → راجع `NEXT_PUBLIC_SITE_URL`
8. **خلط `titleKey` مع نص جاهز من API** → بلبلة → قرّر موديل واحد قبل الربط النهائي

---

## 15) خريطة سريعة للتعديل اليومي

| عايز تعمل إيه؟ | روح فين؟ |
|----------------|----------|
| تغيّر لون البراند | `styles/globals.css` (CSS variables) |
| تغيّر نصوص الهوم | `messages/*/home.json` |
| تضيف منتج | `lib/data/products.json` + messages |
| تربط باكند | `.env` + `lib/api/client.ts` |
| تعدّل الهيدر | `components/layout/header/` |
| تعدّل SEO عام | `app/[locale]/layout.tsx` |
| تعدّل sitemap | `app/sitemap.ts` |

---

## 16) ملخص فلسفة الكود في المشروع

- بسيط أوضح من ذكي
- ملفات قصيرة
- تعليقات عربية على **السبب** مش على كل سطر
- UI مفصول عن مصدر البيانات
- جاهز للباكند من غير إعادة كتابة الواجهة

لو فهمت الملف ده، تقدر تتحرك جوه المشروع بثقة وتعدّل بأمان.

بالتوفيق في التعلم

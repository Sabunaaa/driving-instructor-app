# ESLint Report - 225 Problems (154 Errors, 71 Warnings)

## Error Categories Summary

| Category | Count | Type |
|----------|-------|------|
| `@typescript-eslint/no-explicit-any` | ~80 | Error |
| `react/no-unescaped-entities` | ~20 | Error |
| `@typescript-eslint/ban-ts-comment` | ~15 | Error |
| `@next/next/no-html-link-for-pages` | ~5 | Error |
| `@typescript-eslint/no-unused-vars` | ~40 | Warning |
| `@next/next/no-img-element` | ~10 | Warning |
| `prefer-const` | 2 | Error |
| `react-hooks/rules-of-hooks` | 1 | Error |
| `react-hooks/exhaustive-deps` | 3 | Warning |

---

## 1. `@typescript-eslint/no-explicit-any` (~80 errors)

**Issue:** Using `any` type instead of proper TypeScript types.

**Fix:** Replace `any` with specific types like `unknown`, generics, or proper interfaces.

### Files Affected:
- `jest.setup.ts` (lines 55, 63)
- `src/app/account-settings/page.tsx` (line 62)
- `src/app/api/vehicle/verification/route.ts` (line 67)
- `src/app/bookings/page.tsx` (lines 16, 35, 106)
- `src/app/business-settings/page.tsx` (line 19)
- `src/app/business-settings/vehicle/page.tsx` (line 55)
- `src/app/for-instructors/signup/page.tsx` (line 57)
- `src/app/payment/page.tsx` (line 340)
- `src/components/account/PasswordForm.tsx` (line 22)
- `src/components/account/PersonalInfoForm.tsx` (line 9)
- `src/components/account/SettingsTabs.tsx` (line 10)
- `src/components/find-instructors/FilterSidebar.tsx` (line 8)
- `src/components/find-instructors/HorizontalFilterBar.tsx` (line 9)
- `src/components/for-instructors/signup/ModernStep1.tsx` (lines 6, 7)
- `src/components/for-instructors/signup/ModernStep2.tsx` (lines 8, 9)
- `src/components/for-instructors/signup/ModernStep3.tsx` (lines 7, 8, 22)
- `src/components/for-instructors/signup/ModernStep4.tsx` (lines 6, 7)
- `src/components/navbar-components/MobileMenu.tsx` (line 11)
- `src/components/navbar-components/UserMenu.tsx` (line 8)
- `src/components/ui/Button.tsx` (line 64)
- `src/components/ui/Card.tsx` (lines 64, 78, 90)
- `src/components/ui/SettingsField.tsx` (lines 146, 154, 158)
- `src/hooks/__tests__/useForm.test.ts` (lines 34, 46, 50, 62, 82)
- `src/hooks/useCache.ts` (line 34)
- `src/hooks/useForm.ts` (lines 17, 18, 25, 40, 97, 118, 135, 180, 183)
- `src/hooks/useInstructorFilters.ts` (line 26)
- `src/hooks/useMemoUtils.ts` (lines 10, 18, 38, 62, 84)
- `src/hooks/useMultiStepForm.ts` (line 3)
- `src/lib/cache.ts` (lines 21, 39, 47, 72)
- `src/services/api.ts` (lines 15, 36, 37, 192, 220, 308, 338, 365, 367, 380, 382, 395, 397, 410, 420, 424)
- `src/services/index.ts` (lines 10, 13)
- `src/test-utils.tsx` (line 84)
- `src/utils/__tests__/security.test.ts` (lines 206, 219)
- `src/utils/sanitize.ts` (lines 167, 174, 200)
- `src/utils/secureLogger.ts` (lines 72, 88, 121, 133, 144, 161, 170, 189, 216, 223, 230, 237)

---

## 2. `react/no-unescaped-entities` (~20 errors)

**Issue:** Unescaped quotes (`'` or `"`) in JSX text content.

**Fix:** Use `&apos;` for `'` and `&quot;` for `"`, or wrap text in curly braces.

### Files Affected:
- `src/app/blog/[slug]/page.tsx` (line 210)
- `src/app/blog/page.tsx` (line 413)
- `src/app/bookings/page.tsx` (line 137)
- `src/app/business-settings/page.tsx` (line 195)
- `src/app/dashboard1/page.tsx` (line 22)
- `src/app/find-instructors/page.tsx` (line 337)
- `src/app/help/articles/[slug]/page.tsx` (line 53)
- `src/app/help/chat/page.tsx` (line 139)
- `src/components/account/DeleteAccountSection.tsx` (line 29)
- `src/components/admin/BlogTable.tsx` (line 203)
- `src/components/admin/RequestsTable.tsx` (line 257)
- `src/components/blog-test/BlogHero.tsx` (line 61)
- `src/components/blog-test/FeaturedPost.tsx` (line 32)
- `src/components/blog-test/NewsletterCTA.tsx` (line 21)
- `src/components/blog1/FeaturedPost.tsx` (line 32)
- `src/components/blog1/NewsletterCTA.tsx` (line 19)
- `src/components/dashboard1/ScheduleTimeline.tsx` (line 40)
- `src/components/for-instructors/Testimonials.tsx` (line 52)
- `src/components/home/LearningRoadmap.tsx` (lines 34, 36)
- `src/components/layout/Footer.tsx` (line 26)

---

## 3. `@typescript-eslint/ban-ts-comment` (~15 errors)

**Issue:** Using `@ts-ignore` instead of `@ts-expect-error`.

**Fix:** Replace `// @ts-ignore` with `// @ts-expect-error`.

### Files Affected:
- `src/app/account-settings/page.tsx` (line 5)
- `src/app/bookings/page.tsx` (line 5)
- `src/app/forum/page.tsx` (line 46)
- `src/app/help/articles/[slug]/page.tsx` (line 5)
- `src/app/help/category/[category]/page.tsx` (line 5)
- `src/app/help/chat/page.tsx` (line 5)
- `src/app/help/email/page.tsx` (line 5)
- `src/app/help/page.tsx` (line 5)
- `src/app/lessons/[id]/page.tsx` (lines 44, 48, 93, 103)
- `src/app/lessons/page.tsx` (line 67)
- `src/app/login/page.tsx` (line 5)
- `src/app/signup/page.tsx` (line 5)
- `src/components/account/AvatarUpload.tsx` (line 4)
- `src/components/account/PasswordForm.tsx` (line 4)
- `src/components/account/PersonalInfoForm.tsx` (line 4)
- `src/components/account/ProfileCompletion.tsx` (line 4)
- `src/components/account/SettingsTabs.tsx` (line 4)
- `src/components/ui/SettingsField.tsx` (lines 109, 111)

---

## 4. `@next/next/no-html-link-for-pages` (~5 errors)

**Issue:** Using `<a>` element instead of `<Link>` for internal navigation.

**Fix:** Import and use `Link` from `next/link`.

### Files Affected:
- `src/app/blog/[slug]/page.tsx` (line 114)
- `src/app/lessons/[id]/page.tsx` (line 72)
- `src/components/ui/BlogSidebar.tsx` (lines 122, 130, 138)

---

## 5. `@typescript-eslint/no-unused-vars` (~40 warnings)

**Issue:** Unused imports, variables, or destructured values.

**Fix:** Remove unused imports or prefix with `_` if intentionally unused.

### Files Affected:
- `middleware.ts` (line 85: `ip`)
- `src/app/account-settings/page.tsx` (line 66: `e`)
- `src/app/api/csrf-token/route.ts` (line 22: `error`)
- `src/app/blog/[slug]/page.tsx` (lines 4: `Share2`, 74: `params`, 77: `setCountry`)
- `src/app/blog/page.tsx` (lines 16: `categories`, 161: `selectedCategory`, `setSelectedCategory`)
- `src/app/bookings/page.tsx` (lines 16: `setCalendarEvents`, 54: `formatStudentName`)
- `src/app/dashboard/page.tsx` (lines 28: `upcoming`, 29: `recent`, 71: `cancelLesson`)
- `src/app/instructors/[id]/page.tsx` (line 24: `params`)
- `src/app/payment/page.tsx` (lines 5: `CreditCard`, `Plus`, `Trash2`, `CheckCircle2`, 8: `Button`, 80: `setDefault`)
- `src/components/blog-test/BlogGrid.tsx` (line 72: `index`)
- `src/components/blog-test/FeaturedPost.tsx` (line 1: `Image`)
- `src/components/blog1/FeaturedPost.tsx` (line 1: `Image`)
- `src/components/calendar-components/EventCard.tsx` (line 19: `id`)
- `src/components/calendar-components/TimeSlot.tsx` (lines 28: `hour`, 29: `date`)
- `src/components/calendar-components/WeekView.tsx` (line 44: `index`)
- `src/components/calendar-components/timeSlotUtils.ts` (line 3: `React`)
- `src/components/dashboard-components/StatCard.tsx` (line 32: `subtitle`)
- `src/components/dashboard1/ScheduleTimeline.tsx` (line 45: `index`)
- `src/components/find-instructors/SearchHeader.tsx` (line 3: `MapPin`)
- `src/components/for-instructors/EarningsCalculator.tsx` (line 4: `Clock`)
- `src/components/for-instructors/signup/ModernStep3.tsx` (lines 3: `UploadCloud`, `Car`)
- `src/components/home/BentoFeatures.tsx` (lines 1: `Calendar`, `Smartphone`)
- `src/components/home/HeroModern.tsx` (line 3: `Search`)
- `src/components/home/LearningRoadmap.tsx` (line 1: `Check`)
- `src/components/instructor/StepIndicator.tsx` (line 4: `Circle`)
- `src/components/layout/Navbar.tsx` (line 6: `LogIn`)
- `src/components/navbar-components/NavLinks.tsx` (line 12: `userType`)
- `src/components/ui/Button.tsx` (line 68: `restProps`)
- `src/components/ui/Calendar.tsx` (lines 38: `editable`, 147: `dayIndex`)
- `src/components/ui/SettingsField.tsx` (line 6: `BadgeColor`)
- `src/components/ui/__tests__/ErrorBoundary.test.tsx` (line 106: `rerender`)
- `src/services/api.ts` (lines 8: `sanitizeObject`, 178: `err`)
- `src/utils/__tests__/security.test.ts` (line 226: `str`)
- `src/utils/csrf.ts` (line 79: `error`)
- `src/utils/validation/schemas.ts` (lines 5: `validatePasswordMatch`, 7: `validateDate`)

---

## 6. `@next/next/no-img-element` (~10 warnings)

**Issue:** Using `<img>` instead of Next.js optimized `<Image>` component.

**Fix:** Use `<Image />` from `next/image` with proper width/height or fill props.

### Files Affected:
- `src/components/account/AvatarUpload.tsx` (line 19)
- `src/components/admin/AdminSidebar.tsx` (line 83)
- `src/components/dashboard1/ScheduleTimeline.tsx` (line 52)
- `src/components/find-instructors/InstructorCard.tsx` (line 24)
- `src/components/for-instructors/signup/ModernStep2.tsx` (line 219)
- `src/components/instructor-profile/InstructorProfileHeader.tsx` (line 44)
- `src/components/instructor/Step2VehicleInfo.tsx` (line 186)
- `src/components/ui/HeroSplit.tsx` (line 112)

---

## 7. `prefer-const` (2 errors)

**Issue:** Using `let` for variables that are never reassigned.

**Fix:** Change `let` to `const`.

### Files Affected:
- `src/app/find-instructors/page.tsx` (line 221: `result`)
- `src/components/for-instructors/signup/ModernStep2.tsx` (lines 17: `val`, 18: `raw`)

---

## 8. `react-hooks/rules-of-hooks` (1 error)

**Issue:** React Hook called conditionally.

**Fix:** Move hook calls outside of any conditionals.

### Files Affected:
- `src/components/ui/SettingsField.tsx` (line 51: `React.useId` called conditionally)

---

## 9. `react-hooks/exhaustive-deps` (3 warnings)

**Issue:** Missing dependencies in `useEffect` or `useMemo` dependency arrays.

**Fix:** Add missing dependencies or restructure the code.

### Files Affected:
- `src/hooks/useCache.ts` (line 74: missing `fetchData`)
- `src/hooks/useMemoUtils.ts` (line 12: missing `items` and `predicate`, dependency list not array literal)

---

## Quick Fix Commands

Some issues can be auto-fixed:
```bash
npm run lint -- --fix
```

This will fix 3 errors and 2 warnings automatically.

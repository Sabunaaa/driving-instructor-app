export type HelpArticle = {
  slug: string;
  title: string;
  category: string; // Display name
  description?: string;
  bullets?: string[];
  steps?: string[];
  content?: string[]; // Extra paragraphs
  note?: string;
  cta?: { label: string; href: string; external?: boolean };
};

export const toSlug = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const toCategorySlug = (name: string) => toSlug(name);

const make = (
  category: string,
  title: string,
  init?: Partial<HelpArticle>
): HelpArticle => ({
  slug: `${toCategorySlug(category)}-${toSlug(title)}`,
  title,
  category,
  ...init,
});

// Categories
const C = {
  gettingStarted: "Getting Started",
  instructors: "For Instructors",
  booking: "Booking & Scheduling",
  payments: "Payments & Billing",
  safety: "Safety & Security",
  technical: "Technical Support",
} as const;

// Category articles as shown on the Help page
const categoryArticles: HelpArticle[] = [
  // Getting Started
  make(C.gettingStarted, "Learn the basics of using our platform", {
    title: "Welcome to DriveConnect",
    description:
      "An overview of how to navigate DriveConnect as a student or instructor.",
    bullets: [
      "Sign up or log in to access your dashboard.",
      "Browse instructors by location, rating, or availability.",
      "Book lessons directly or message instructors for custom schedules.",
      "Start by exploring the ‘Find Instructors’ page or check your profile settings.",
    ],
    cta: { label: "Go to Find Instructors", href: "/find-instructors" },
  }),
  make(C.gettingStarted, "Setting up your profile", {
    description:
      "Guide to creating and optimizing your student or instructor profile.",
    steps: [
      "Log in and click ‘Account settings’ from the sidebar.",
      "Upload a profile photo and add your name, location, and learning goals (for students) or certifications (for instructors).",
      "Save changes to activate your profile.",
    ],
    content: ["Tip: A complete profile (80%+) increases booking chances."],
    cta: { label: "Edit Profile", href: "/account-settings" },
  }),
  make(C.gettingStarted, "How to book lessons", {
    title: "Booking Your First Lesson",
    description: "Step-by-step process to schedule a driving lesson.",
    steps: [
      "Search for an instructor under ‘Find Instructors.’",
      "Click an instructor’s profile and check their availability calendar.",
      "Select a time slot and confirm with payment or a message.",
    ],
    content: ["Note: Payments are processed securely via our platform."],
    cta: { label: "Find Instructors Now", href: "/find-instructors" },
  }),
  make(C.gettingStarted, "Payment methods", {
    title: "Managing Payment Methods",
    description: "How to add and use payment options on DriveConnect.",
    bullets: [
      "Add a credit/debit card or PayPal under ‘Payment details’ in the sidebar.",
      "Ensure your method is verified for instant bookings.",
      "View transaction history in your account settings.",
      "Contact support if you encounter issues.",
    ],
    cta: { label: "Add Payment Method", href: "/payment" },
  }),

  // For Instructors
  make(C.instructors, "Resources for driving instructors", {
    title: "Instructor Resources",
    description: "Tools and tips for driving instructors on DriveConnect.",
    bullets: [
      "Access training materials and certification guides.",
      "Join our community forum for tips.",
      "Earn badges for high ratings or lesson completions.",
    ],
    cta: { label: "Visit Forum", href: "/forum" },
  }),
  make(C.instructors, "Managing students", {
    title: "Managing Your Students",
    description: "How instructors handle student interactions and progress.",
    steps: [
      "View student list in your dashboard under ‘Students.’",
      "Message students or update lesson notes.",
      "Provide feedback via reviews after sessions.",
    ],
    content: ["Tip: Respond within 24 hours to maintain high ratings."],
    cta: { label: "Go to Dashboard", href: "/dashboard" },
  }),
  make(C.instructors, "Setting availability", {
    title: "Setting Your Availability",
    description: "How instructors update their teaching schedule.",
    steps: [
      "Log in and go to your dashboard.",
      "Click ‘Availability’ and select dates/times.",
      "Save to notify students of open slots.",
    ],
    content: ["Note: Updates take effect within 1 hour."],
    cta: { label: "Update Availability", href: "/dashboard" },
  }),
  make(C.instructors, "Vehicle requirements", {
    title: "Vehicle Requirements",
    description: "Guidelines for vehicles used in lessons.",
    bullets: [
      "Vehicle must be insured and registered.",
      "Dual controls recommended for safety.",
      "Clean and roadworthy condition required.",
      "Submit vehicle details for approval in your profile.",
    ],
    cta: { label: "Submit Vehicle Details", href: "/account-settings" },
  }),

  // Booking & Scheduling
  make(C.booking, "Help with lessons and appointments", {
    title: "Booking & Scheduling Help",
    description: "Assistance with managing lessons.",
    bullets: [
      "Check instructor availability before booking.",
      "Confirm details via chat or email.",
      "Contact support for conflicts.",
    ],
    cta: { label: "Contact Support", href: "mailto:support@instru.app" },
  }),
  make(C.booking, "Canceling lessons", {
    title: "Canceling Lessons",
    description: "Process for canceling a booked lesson.",
    steps: [
      "Go to your dashboard and find the lesson.",
      "Click ‘Cancel’ and select a reason.",
      "Review refund status per policy.",
    ],
    cta: { label: "Cancel Lesson", href: "/dashboard" },
  }),
  make(C.booking, "Rescheduling", {
    title: "Rescheduling Lessons",
    description: "How to change lesson times.",
    steps: [
      "Open the lesson in your dashboard.",
      "Select a new time from available slots.",
      "Confirm with the instructor via chat.",
    ],
    cta: { label: "Reschedule Now", href: "/dashboard" },
  }),
  make(C.booking, "No-show policy", {
    title: "No-Show Policy",
    description: "Rules for missed lessons.",
    bullets: [
      "No refunds for no-shows without prior notice.",
      "Notify at least 2 hours in advance to avoid penalties.",
      "Instructors may report repeated no-shows.",
    ],
    cta: {
      label: "View Policy",
      href: "/help/articles/booking-scheduling-no-show-policy",
    },
  }),

  // Payments & Billing
  make(C.payments, "Payment issues and billing questions", {
    title: "Payment & Billing Support",
    description: "Troubleshooting payment problems.",
    bullets: [
      "Check your payment method status in ‘Payment details.’",
      "Contact support if a transaction fails.",
      "Review billing history for discrepancies.",
    ],
    cta: { label: "Contact Support", href: "mailto:support@instru.app" },
  }),
  make(C.payments, "Refund policy", {
    title: "Refund Policy",
    description: "Details on cancellations and refunds.",
    bullets: [
      "Full refund if canceled 24 hours before the lesson.",
      "50% refund within 24 hours; no refund for no-shows.",
      "Process takes 3-5 business days.",
    ],
    cta: { label: "Request Refund", href: "mailto:support@instru.app" },
  }),
  make(C.payments, "Invoice questions", {
    title: "Invoice Inquiries",
    description: "How to access and understand invoices.",
    steps: [
      "Go to ‘Payment details’ in the sidebar.",
      "Download your invoice PDF under ‘Transaction History.’",
      "Contact support for missing invoices.",
    ],
    cta: { label: "View Invoices", href: "/payment" },
  }),

  // Safety & Security
  make(C.safety, "Safety guidelines and security features", {
    title: "Safety & Security Overview",
    description: "Ensuring a safe learning environment.",
    bullets: [
      "All instructors are background-checked.",
      "Emergency contact available during lessons.",
      "Secure payment processing with encryption.",
    ],
    cta: { label: "Learn More", href: "/help/category/safety-security" },
  }),
  make(C.safety, "Safety protocols", {
    title: "Safety Protocols",
    description: "Rules for safe driving lessons.",
    bullets: [
      "Wear seatbelts at all times.",
      "Follow instructor directions during practice.",
      "Report unsafe conditions immediately.",
    ],
    cta: { label: "Report Issue", href: "mailto:support@instru.app" },
  }),
  make(C.safety, "Account security", {
    title: "Securing Your Account",
    description: "Tips to protect your DriveConnect account.",
    steps: [
      "Enable two-factor authentication (2FA) in ‘Account settings.’",
      "Use a strong, unique password.",
      "Log out on shared devices.",
    ],
    cta: { label: "Enable 2FA", href: "/account-settings" },
  }),
  make(C.safety, "Reporting issues", {
    title: "Reporting Problems",
    description: "How to report safety or behavioral concerns.",
    steps: [
      "Click ‘Report Issue’ in the sidebar or lesson page.",
      "Describe the issue and submit evidence (e.g., photos).",
      "Expect a response within 48 hours.",
    ],
    cta: { label: "Report Now", href: "mailto:support@instru.app" },
  }),

  // Technical Support
  make(C.technical, "App issues and technical problems", {
    title: "Technical Support",
    description: "Help with app or website issues.",
    bullets: [
      "Clear cache if the app lags.",
      "Update to the latest version.",
      "Contact support for persistent issues.",
    ],
    cta: { label: "Contact Support", href: "mailto:support@instru.app" },
  }),
  make(C.technical, "App not working", {
    title: "App Troubleshooting",
    description: "Steps to fix app failures.",
    steps: [
      "Restart the app or device.",
      "Reinstall from the app store.",
      "Check system requirements.",
    ],
    cta: {
      label: "Reinstall App",
      href: "https://support.google.com/googleplay/answer/113410",
      external: true,
    },
  }),
  make(C.technical, "Login problems", {
    title: "Login Assistance",
    description: "Resolving login issues.",
    steps: [
      "Click ‘Forgot Password’ on the login page.",
      "Check your email for a reset link.",
      "Contact support if no email arrives.",
    ],
    cta: { label: "Reset Password", href: "/login" },
  }),
  make(C.technical, "Browser compatibility", {
    title: "Browser Compatibility",
    description: "Supported browsers for DriveConnect.",
    bullets: [
      "Use Chrome, Firefox, or Safari (latest versions).",
      "Enable JavaScript and cookies.",
      "Avoid Internet Explorer for best experience.",
    ],
    cta: {
      label: "Update Browser",
      href: "https://browsehappy.com/",
      external: true,
    },
  }),
];

// Additional popular articles (standalone slugs)
const popularExtras: HelpArticle[] = [
  {
    slug: toSlug("How to book your first driving lesson"),
    title: "Booking Your First Lesson",
    category: C.gettingStarted,
    description: "A beginner’s guide to booking.",
    steps: [
      "Search for an instructor under ‘Find Instructors.’",
      "Click an instructor’s profile and check their availability calendar.",
      "Select a time slot and confirm with payment or a message.",
    ],
    cta: { label: "Find Instructors Now", href: "/find-instructors" },
  },
  {
    slug: toSlug("What to expect during lessons"),
    title: "What to Expect",
    category: C.gettingStarted,
    description: "Overview of a typical lesson.",
    bullets: [
      "Meet your instructor at the scheduled location.",
      "Practice basic maneuvers and road rules.",
      "Receive feedback at the end.",
    ],
    cta: { label: "Book Now", href: "/find-instructors" },
  },
  {
    slug: toSlug("Cancellation and refund policy"),
    title: "Cancellation & Refund Policy",
    category: C.booking,
    description: "Rules for canceling lessons.",
    bullets: [
      "Full refund if canceled 24 hours before the lesson.",
      "50% refund within 24 hours; no refund for no-shows.",
      "Process takes 3-5 business days.",
    ],
    cta: { label: "Request Refund", href: "mailto:support@instru.app" },
  },
  {
    slug: toSlug("How to become an instructor"),
    title: "Become an Instructor",
    category: C.instructors,
    description: "Steps to join DriveConnect as an instructor.",
    steps: [
      "Apply via the ‘Become an Instructor’ page.",
      "Submit certification and vehicle details.",
      "Complete background check (takes 5-7 days).",
    ],
    cta: { label: "Apply Now", href: "mailto:support@instru.app" },
  },
  {
    slug: toSlug("Payment and billing FAQ"),
    title: "Payment & Billing FAQ",
    category: C.payments,
    description: "Common payment questions answered.",
    bullets: [
      "Q: How are payments processed? A: Via secure gateway.",
      "Q: When do I get paid? A: Weekly for instructors.",
      "Q: What if a payment fails? A: Contact support.",
    ],
    cta: { label: "View All FAQs", href: "/help" },
  },
  {
    slug: toSlug("Safety guidelines for students"),
    title: "Student Safety Guidelines",
    category: C.safety,
    description: "Safety tips for learners.",
    bullets: [
      "Wear seatbelts at all times.",
      "Follow instructor directions during practice.",
      "Report unsafe conditions immediately.",
    ],
    cta: { label: "Report Issue", href: "mailto:support@instru.app" },
  },
];

export const helpArticles: HelpArticle[] = [
  ...categoryArticles,
  ...popularExtras,
];

export const getArticleBySlug = (slug: string) =>
  helpArticles.find((a) => a.slug === slug);

export const getArticlesByCategory = (categorySlug: string) => {
  const display = Object.values(C).find(
    (name) => toCategorySlug(name) === categorySlug
  );
  if (!display) return [] as HelpArticle[];
  return helpArticles.filter((a) => a.category === display);
};

export const getCategoryDisplay = (categorySlug: string) =>
  Object.values(C).find((name) => toCategorySlug(name) === categorySlug) ||
  null;

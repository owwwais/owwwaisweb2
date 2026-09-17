/** All copy from owwwais.com; images mirrored into /public/img. */

export const profile = {
  name: "أويس بن أحمد",
  handle: "owwwais",
  role: "مختص علوم بيانات ومستشار إداري",
  photo: "/img/profile.webp",
  /** Line-art portrait. Falls back to `photo` until the file is added. */
  portrait: "/img/portrait.webp",
  email: "info@owwwais.com",
  location: "الرياض، المملكة العربية السعودية",
};

/**
 * Outbound links. The social URLs are built from the `owwwais` handle —
 * confirm each one points where you expect before launch.
 */
export const links = {
  cv: "/owwwais-cv.pdf",
  socials: [
    { name: "واتساب", key: "whatsapp", href: "https://wa.me/966500000000" },
    { name: "لينكدإن", key: "linkedin", href: "https://www.linkedin.com/in/owwwais" },
    { name: "إكس", key: "x", href: "https://x.com/owwwais" },
    { name: "بيهانس", key: "behance", href: "https://www.behance.net/owwwais" },
    { name: "يوتيوب", key: "youtube", href: "https://www.youtube.com/@owwwais" },
    { name: "جيت هب", key: "github", href: "https://github.com/owwwais" },
  ],
} as const;

export const hero = {
  title: "أويس",
  lede: "مختص علوم بيانات ومستشار إداري، أعدّ العروض الفنية والملفات التعريفية، وأبني لوحات المعلومات والأنظمة التي تُتخذ بها القرارات.",
  primary: { label: "ابدأ مشروعك", href: "#contact" },
  secondary: { label: "شاهد أعمالي", href: "#work" },
};

export const stack = [
  "Python", "NumPy", "Jupyter", "SQL", "Git", "GitHub", "React",
  "TypeScript", "Supabase", "Firebase", "Flutter", "Word",
  "PowerPoint", "Excel", "AI", "Open Source",
];

export const stats = [
  { value: 15, suffix: "+", label: "عميل" },
  { value: 20, suffix: "+", label: "منتج برمجي" },
  { value: 200, suffix: "+", label: "تقرير وعرض" },
  { value: 5, suffix: "+", label: "سنوات خبرة" },
];

export type Project = {
  title: string;
  category: string;
  blurb: string;
  tags: string[];
  img: string;
  /** Shown before the grid is expanded. */
  featured?: boolean;
};

export const projects: Project[] = [
  { featured: true, title: "تطبيق سمو", category: "جوال", img: "/img/p01.webp",
    blurb: "رفيقك اليومي للانتظام بالطاعات والأذكار، بطريقة سهلة وممتعة.",
    tags: ["Flutter", "Dart", "AI"] },
  { title: "منصة تلقينة", category: "ويب", img: "/img/p02.webp",
    blurb: "أداة ذكية تحوّل النصوص العربية البسيطة إلى تلقينات مفصلة وفعالة.",
    tags: ["Python", "Flask", "LLM"] },
  { featured: true, title: "منصة تنصيص", category: "ويب", img: "/img/p03.webp",
    blurb: "حوّل صورك ومستنداتك إلى نصوص قابلة للتعديل في ثوانٍ، بدعم كامل للعربية.",
    tags: ["Python", "Flask", "OCR"] },
  { title: "تطبيق بصيرة", category: "جوال", img: "/img/p04.webp",
    blurb: "مساحتك الشخصية لتتبع عاداتك وتدوين أفكارك بكل خصوصية وأمان.",
    tags: ["Flutter", "AI", "LLM"] },
  { title: "حيكم", category: "جوال", img: "/img/p05.webp",
    blurb: "ترتيب خطتك الدراسية وإدارة مهامك وتتبع معدلك التراكمي في واجهة سلسة.",
    tags: ["AI", "Flutter", "Python"] },
  { title: "تطبيق فلس", category: "جوال", img: "/img/p06.webp",
    blurb: "إدارة مالية على منهجية ميزانية الصِفر، تقرأ رسائلك البنكية وتصنّف مصاريفك.",
    tags: ["Flutter", "AI"] },
  { title: "رمز", category: "ويب", img: "/img/p07.webp",
    blurb: "روابط قصيرة باسم علامتك، ورموز QR ديناميكية، وتحليلات متقدمة للنقرات.",
    tags: ["Next.js"] },
  { featured: true, title: "منصة فهيم", category: "ويب", img: "/img/p08.webp",
    blurb: "إدارة المشاريع التنموية: المراحل والمهام والميزانيات والتقارير الميدانية.",
    tags: ["AI", "Next.js"] },
  { featured: true, title: "منصة PrismIQ", category: "ذكاء اصطناعي", img: "/img/p09.webp",
    blurb: "غرفة عمليات استراتيجية يختبر فيها نخبة من مستشاري الذكاء الاصطناعي فكرتك.",
    tags: ["Python", "Next.js", "CrewAI"] },
  { title: "الشمولية الرقمية", category: "ويب", img: "/img/p10.webp",
    blurb: "موقع شركة تقنية: من نشر البرمجيات إلى تطبيقات الذكاء الاصطناعي.",
    tags: ["Vite", "React", "TypeScript"] },
];

export const about = {
  heading: "أبني أنظمة تحل مشكلات حقيقية.",
  paragraphs: [
    "السلام عليكم ورحمة الله وبركاته. أنا أويس بن أحمد. أعمل في الاستشارات الإدارية، وأبني تطبيقات ونماذج ذكاء اصطناعي، وأنهي هذه السنة بكالوريوس علوم البيانات.",
    "بدأت في الثانوية بتطوير الألعاب. لم أصنع لعبة تستحق الذكر، لكني خرجت منها بشيء بقي معي: كيف أفكك مشكلة كبيرة إلى خطوات صغيرة يمكن حلها واحدة واحدة.",
    "اليوم أعمل باحثاً ومعدّ عروض مع مجموعة الرواد العالمية، ومستشاراً مساعداً في كايزن للاستشارات. أعددت مع الفريق أكثر من 200 عرض تنافسي.",
  ],
};

export const timeline = {
  heading: "المسار الذي سلكته",
  items: [
    { period: "٣ سنوات", org: "كايزن · مجموعة الرواد", title: "مستشار مساعد وباحث" },
    { period: "+٥ سنوات", org: "مشاريع مستقلة", title: "مطوّر تطبيقات ونماذج ذكاء اصطناعي" },
    { period: "قيد الدراسة", org: "الجامعة السعودية الإلكترونية", title: "بكالوريوس علم البيانات" },
    { period: "شهادة", org: "جامعة فيرجينيا و BCG", title: "قيادة الأعمال في العصر الحديث" },
    { period: "شهادة", org: "DeepLearning.AI", title: "الذكاء الاصطناعي للجميع" },
  ],
};

/** Three colour-headed columns, exactly like the reference's skills block. */
export const skillColumns = [
  { title: "خبرات التحليل", color: "var(--color-orange)",
    items: ["تحليل البيانات", "النماذج التنبؤية", "تصوّر البيانات", "لوحات المعلومات", "تقارير القرار"] },
  { title: "مهارات البناء", color: "var(--color-blue)",
    items: ["تطبيقات الجوال", "أنظمة الويب", "لوحات التحكم", "أتمتة العمليات", "تكامل الذكاء الاصطناعي"] },
  { title: "الأدوات والمنصات", color: "var(--color-green)",
    items: ["Python", "React · TypeScript", "Flask · SQL", "Flutter", "PowerPoint · Excel"] },
];

export const services = {
  heading: "كــذا أقــدر أساعدك",
  groups: [
    { title: "العروض والملفات التعريفية",
      items: ["السردية أولاً", "المحتوى الفني", "التصميم والإخراج", "الملفات التعريفية", "عروض المنافسات"] },
    { title: "البيانات ولوحات المعلومات",
      items: ["تنظيف البيانات", "لوحات المؤشرات", "الإنفوجرافيك", "التقارير الدورية", "تصوّر القرار"] },
    { title: "الأنظمة والأتمتة",
      items: ["تطبيقات الجوال", "أنظمة الويب", "لوحات التحكم", "أتمتة المهام", "تشغيل النماذج محلياً"] },
  ],
};

export const method = [
  { n: "٠١", title: "أبدأ بالسؤال لا بالأداة",
    body: "قبل أن أفتح Python أو PowerPoint أسأل: ما القرار الذي يعتمد على هذا المخرج، ومن سيقرؤه؟" },
  { n: "٠٢", title: "مسودة مبكرة، حتى لو ناقصة",
    body: "أرسل نسخة أولى قابلة للنقد بدل أن أختفي ثلاثة أسابيع ثم أعود بمخرج لا يشبه ما في ذهنك." },
  { n: "٠٣", title: "أسلّم ما يستطيع غيري صيانته",
    body: "لا أترك خلفي نظاماً أفهمه أنا وحدي. التوثيق جزء من التسليم لا خدمة إضافية." },
];

export const products = [
  { title: "بناء تطبيقات هاتف احترافية", body: "تطبيق سريع وخفيف لـ iOS وأندرويد مع لوحة تحكم لإدارة المحتوى والطلبات." },
  { title: "ربط الذكاء الاصطناعي بأنظمتك", body: "ربط قدرات الذكاء الاصطناعي بأدواتك الحالية لأتمتة المهام وتحليل البيانات." },
  { title: "تطوير أنظمة برمجية مخصصة", body: "نظام مصمم بدقة ليتماشى مع عملياتك اليومية وأتمتة مهامك المتكررة." },
  { title: "منصة ميعاد لحجز المواعيد", body: "صفحة حجز خاصة بك مع مزامنة لتقويمك وإشعارات تلقائية." },
  { title: "نظام الولاء والمكافآت", body: "برامج نقاط مخصصة وكوبونات خصم تربط عملاءك بمتجرك." },
  { title: "بوابة التوظيف الذكية", body: "فحص وتصنيف السير الذاتية آلياً بالذكاء الاصطناعي مع سرية تامة." },
  { title: "منصة الدورات التدريبية", body: "نشر دوراتك وتنظيم التسجيل والاختبارات وإصدار الشهادات تلقائياً." },
  { title: "تشغيل النماذج على خوادمك", body: "استضافة النماذج اللغوية محلياً لحماية بياناتك وخفض تكاليف الـ APIs." },
  { title: "نظام إدارة العقارات (PRMS)", body: "تنظيم العقارات وعقود المستأجرين والتحصيل وجدولة الصيانة." },
];

export const faqs = [
  { q: "هل تعمل مع الأفراد أم الشركات؟",
    a: "الاثنان. عملت مع شركات استشارية كبرى، ومع أفراد لديهم فكرة على ورقة يريدون معرفة إن كانت تستحق." },
  { q: "كم يستغرق المشروع؟",
    a: "عرض تنافسي أو ملف تعريفي: أسبوع إلى ثلاثة. لوحة معلومات: أسبوعان تقريباً. تطبيق متكامل: يعتمد على النطاق." },
  { q: "كيف تحدد التكلفة؟",
    a: "بالنطاق لا بالساعة. بعد أن أفهم المطلوب أرسل عرضاً بسعر ثابت ومدة محددة." },
  { q: "هل تعمل عن بُعد؟",
    a: "نعم. ومقيم في الرياض إذا احتاج المشروع اجتماعات حضورية." },
  { q: "ما الذي تحتاجه مني للبدء؟",
    a: "وصف المشكلة، وأي بيانات أو مواد جاهزة عندك، ومن سيستخدم المخرج. البقية عليّ." },
];

export const cta = {
  banner: "عندك فكـرة؟ خلينــا نحولهــا لواقــع",
  finalHeading: "خلينــا نخلــي مشروعــك يلمــع",
  body: "اكتب لي وصفاً في ثلاثة أسطر. سأرد خلال 24 ساعة برأي صريح: هل أستطيع مساعدتك، أم أن الأفضل لك اتجاه آخر.",
  label: "راسلني",
  note: "الرد خلال 24 ساعة",
};

export const nav = [
  { label: "عني", href: "#about" },
  { label: "المشاريع", href: "#work" },
  { label: "الخدمات", href: "#services" },
  { label: "المنتجات", href: "#products" },
  { label: "المدونة", href: "#blog" },
  { label: "الأسئلة الشائعة", href: "#faq" },
];

export const posts = [
  {
    title: "لا تدير وقتك، أدِر طاقتك.",
    excerpt:
      "الوقت متاح للجميع بالتساوي، أما التركيز العميق فمورد شحيح يتقلب خلال اليوم. كيف تقسّم يومك إلى ست فترات بدل مربعات التقويم.",
    date: "٢ سبتمبر ٢٠٢٦",
    tags: ["إدارة الطاقة", "الإنتاجية"],
    img: "/img/b01.webp",
    href: "https://owwwais.com/blog/manage-energy-not-time",
  },
  {
    title: "الكمالية والتسويف: كيف كدتُ أقضي على مشاريعي بيدي؟",
    excerpt:
      "كيف يتحول السعي المهووس وراء الكمال إلى فخ للتسويف يقتل مشاريعك قبل أن تبدأ؟ تجربة شخصية واقعية.",
    date: "١٤ يونيو ٢٠٢٦",
    tags: ["الكمالية", "التسويف"],
    img: "/img/b02.webp",
    href: "https://owwwais.com/blog/perfectionism-and-procrastination",
  },
  {
    title: "بين المهندس والمبرمج: كيف تكشف لمسة الذكاء الاصطناعي؟",
    excerpt:
      "هناك فرق شاسع بين من يستخدم الذكاء الاصطناعي كمسرّع ومن يتخذه عكازاً. إليك العلامات البصرية والمنطقية الفاضحة.",
    date: "١٤ يونيو ٢٠٢٦",
    tags: ["الذكاء الاصطناعي"],
    img: "/img/b04.webp",
    href: "https://owwwais.com/blog/engineer-vs-programmer-detecting-ai-apps",
  },
];

/** Real affiliations — employers, university, certifying bodies. */
export const affiliations = [
  { name: "كايزن للاستشارات", note: "مستشار مساعد" },
  { name: "مجموعة الرواد العالمية", note: "باحث ومعدّ عروض" },
  { name: "الجامعة السعودية الإلكترونية", note: "علم البيانات" },
  { name: "جامعة فيرجينيا · BCG", note: "قيادة الأعمال" },
  { name: "DeepLearning.AI", note: "الذكاء الاصطناعي" },
];

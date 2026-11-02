import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Share2,
  X,
  Sparkles,
  ShoppingBag,
  Check,
  Send,
  Eye,
  Tag
} from "lucide-react";

const articlesData = [
  {
    id: "tropical-suiting",
    category: "Style & Fit",
    categoryKm: "ស្ទីល & ការស្លៀកពាក់",
    title: "Mastering Tropical Suiting: How to Wear Tailored Wool in Phnom Penh's Heat",
    titleKm: "សិល្បៈនៃការស្លៀកឈុតអាវធំក្នុងអាកាសធាតុក្តៅនៅភ្នំពេញ",
    excerpt: "Why unlined Italian high-twist wool keeps you cooler than synthetic blends, and how to stay impeccably sharp through tropical afternoons.",
    excerptKm: "ស្វែងយល់ពីមូលហេតុដែលរោមចៀមអ៊ីតាលីគ្មានទ្រនាប់ជួយឱ្យត្រជាក់ជាងសាច់ក្រណាត់ជ័រ និងវិធីរក្សាភាពថ្លៃថ្នូរពេញមួយថ្ងៃ។",
    date: "October 2026",
    readTime: "5 min read",
    readTimeKm: "៥ នាទីអាន",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&auto=format&fit=crop&q=80",
    featured: true,
    author: "Sophea Kem, Head of Tailoring",
    authorKm: "សុភា កែម • ប្រធានផ្នែកកាត់ដេរ",
    content: [
      "In tropical climates like Cambodia's, the conventional wisdom that suits are sweltering is a relic of poorly chosen polyester linings. The secret to effortless, breathable suiting lies in two factors: high-twist open-weave wool and unconstructed architecture.",
      "By eliminating heavy canvassing and utilizing Super 120s Italian wool, air flows naturally through the weave. The garment moves with your body, naturally wickering humidity away while preserving the razor-sharp drape of a bespoke suit.",
      "For daytime meetings in Tuol Kork or evening galas near Riverside, pair an unstructured navy blazer with lightweight French linen trousers. The result is understated authority without overheating."
    ],
    contentKm: [
      "ក្នុងអាកាសធាតុក្តៅដូចជានៅកម្ពុជា មនុស្សភាគច្រើនយល់ច្រឡំថាការស្លៀកឈុតអាវធំនឹងធ្វើឱ្យស្អុះស្អាប់ខ្លាំង ប៉ុន្តែមូលហេតុពិតប្រាកដគឺបណ្តាលមកពីការជ្រើសរើសក្រណាត់ជ័រ polyester ខុសបច្ចេកទេស។ អាថ៌កំបាំងនៃភាពត្រជាក់ស្រួល គឺស្ថិតនៅលើការប្រើប្រាស់ក្រណាត់រោមចៀមអ៊ីតាលីរៀបត្បាញបែបមានខ្យល់ចេញចូល និងការកាត់ដេរដោយមិនប្រើទ្រនាប់ជ័រក្រាស់។",
      "ដោយកាត់បន្ថយស្រទាប់ជ័រខាងក្នុង និងប្រើប្រាស់រោមចៀម Super 120s ខ្យល់អាកាសអាចឆ្លងកាត់បានដោយសេរី ជួយបន្សាបជាតិញើស និងរក្សាភាពស្រស់ស្អាតនៃរាងកាយបានយ៉ាងល្អឥតខ្ចោះ។",
      "សម្រាប់ការប្រជុំពេលថ្ងៃ ឬកម្មវិធីជប់លៀងពេលល្ងាចនៅភ្នំពេញ ការផ្គូផ្គងអាវធំពណ៌ខៀវចាស់ជាមួយខោក្រណាត់កប្បាសស្រាល គឺជាជម្រើសដ៏ស័ក្តិសម និងមានអំណាចបំផុត។"
    ],
    relatedProduct: {
      name: "Italian Wool Tailored Blazer",
      nameKm: "អាវធំរោមចៀមអ៊ីតាលីប្រណិត",
      price: "$149.00",
      priceKm: "៛603,000",
      link: "/shop"
    }
  },
  {
    id: "cambodian-mulberry-silk",
    category: "Fabric Stories",
    categoryKm: "រឿងរ៉ាវក្រណាត់",
    title: "The Golden Thread: Inside Cambodia's Mulberry Silk Revival",
    titleKm: "ខ្សែសូត្រមាស៖ ការរស់ឡើងវិញនៃសូត្រមនប្រណិតនៅកម្ពុជា",
    excerpt: "Exploring the tactile magic of local silk cooperatives, combining age-old weaving with modern minimalist silhouettes.",
    excerptKm: "ស្វែងយល់ពីភាពអស្ចារ្យនៃសហគមន៍តម្បាញសូត្រខ្មែរ ដែលរួមបញ្ចូលបច្ចេកទេសបុរាណជាមួយម៉ូដទាន់សម័យ។",
    date: "October 2026",
    readTime: "4 min read",
    readTimeKm: "៤ នាទីអាន",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1000&auto=format&fit=crop&q=80",
    featured: false,
    author: "Rithy Store Curators",
    authorKm: "ក្រុមការងារ RITHY STORE",
    content: [
      "Cambodian raw silk has fascinated textile collectors for centuries with its golden sheen and organic texture. At RITHY STORE, we work with village weavers in Siem Reap and Takeo to source silk cultivated without harsh chemical bleaches.",
      "When tailored into flowing evening dresses or versatile silk pocket squares, this heirloom fabric glides smoothly across the skin while retaining unmatched durability.",
      "Investing in genuine silk means supporting generational artisan families across the kingdom."
    ],
    contentKm: [
      "សូត្រមាសកម្ពុជាបានទាក់ទាញអ្នកស្រឡាញ់សិល្បៈក្រណាត់រាប់សតវត្សមកហើយ តាមរយៈពន្លឺភ្លឺរលោង និងសាច់ក្រណាត់សរីរាង្គ។ នៅ RITHY STORE យើងសហការដោយផ្ទាល់ជាមួយសហគមន៍តម្បាញនៅខេត្តសៀមរាប និងតាកែវ ដើម្បីនាំយកសូត្រធម្មជាតិសុទ្ធសាធ។",
      "នៅពេលកាត់ដេរជារ៉ូបល្ងាច ឬកន្សែងហោប៉ៅអាវធំ សូត្រនេះផ្តល់នូវភាពស្រទន់ ផាសុកភាពខ្ពស់ និងរឹងមាំយូរអង្វែង។",
      "ការគាំទ្រសម្លៀកបំពាក់សូត្រធម្មជាតិ គឺជាការរួមចំណែកលើកស្ទួយជីវភាព និងថែរក្សាកេរដំណែលសិប្បករខ្មែរ។"
    ],
    relatedProduct: {
      name: "Organic Mulberry Silk Dress",
      nameKm: "រ៉ូបសូត្រមនសរីរាង្គប្រណិត",
      price: "$119.00",
      priceKm: "៛482,000",
      link: "/shop"
    }
  },
  {
    id: "phnom-penh-streetwear",
    category: "Cambodia Living",
    categoryKm: "ម៉ូដនៅភ្នំពេញ",
    title: "The New Phnom Penh Uniform: Selvedge Denim & Heavyweight Tees",
    titleKm: "ស្ទីលយុវវ័យថ្មីនៅភ្នំពេញ៖ ខូវប៊យ Denim & អាវយឺតសាច់ក្រាស់",
    excerpt: "How the city's creative scene is blending vintage workwear durability with elevated cafe culture styling.",
    excerptKm: "របៀបដែលយុវវ័យសម័យថ្មីនៅភ្នំពេញរួមបញ្ចូលគ្នានូវភាពរឹងមាំនៃខូវប៊យ ជាមួយនឹងស្ទីលដើរលេងហាងកាហ្វេយ៉ាងស្រស់ស្អាត។",
    date: "September 2026",
    readTime: "6 min read",
    readTimeKm: "៦ នាទីអាន",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1000&auto=format&fit=crop&q=80",
    featured: false,
    author: "Dara Vong, Street Style Editor",
    authorKm: "ដារ៉ា វង្ស • និពន្ធនាយកម៉ូដ Streetwear",
    content: [
      "Walk down Bassac Lane or Street 240 on any weekend, and you will notice a distinct stylistic shift. The young tastemakers of Phnom Penh are moving away from disposable fast fashion in favor of substantial, well-crafted pieces.",
      "Rigid Japanese selvedge denim, 260GSM heavyweight combed cotton t-shirts, and Goodyear-welted leather boots form the backbone of this aesthetic. These garments do not just survive the monsoon season; they gain character through everyday wear.",
      "The key is proportion: balanced relaxed fits that breathe without appearing sloppy."
    ],
    contentKm: [
      "ដើរកាត់តាមផ្លូវបាសាក់ ឬផ្លូវ ២៤០ នៅចុងសប្តាហ៍ អ្នកនឹងឃើញការផ្លាស់ប្តូរស្ទីលយ៉ាងច្បាស់។ យុវវ័យសម័យថ្មីនៅភ្នំពេញលែងពេញចិត្តសម្លៀកបំពាក់ស្តើងៗប្រើបានតែមួយដងទៀតហើយ ពួកគេងាកមកជ្រើសរើសរបស់ដែលមានគុណភាព និងប្រើប្រាស់បានយូរ។",
      "ខោខូវប៊យជប៉ុនសាច់ក្រាស់ អាវយឺតកប្បាសទម្ងន់ 260GSM និងស្បែកជើងស្បែកសុទ្ធ គឺជាគ្រឹះនៃស្ទីលនេះ។ សម្លៀកបំពាក់ទាំងនេះមិនត្រឹមតែធន់នឹងរដូវវស្សានោះទេ ប៉ុន្តែកាន់តែពាក់យូរកាន់តែស្អាត។",
      "គន្លឹះសំខាន់គឺទម្រង់រាងសមល្មម ដែលផ្តល់នូវភាពងាយស្រួលធ្វើចលនា និងមើលទៅថ្លៃថ្នូរ។"
    ],
    relatedProduct: {
      name: "Vintage Tokyo Streetwear Tee",
      nameKm: "អាវយឺត Streetwear សាច់ក្រាស់",
      price: "$28.00",
      priceKm: "៛113,000",
      link: "/shop"
    }
  },
  {
    id: "french-linen-guide",
    category: "Style & Fit",
    categoryKm: "ស្ទីល & ការស្លៀកពាក់",
    title: "Linen Without the Creases: Embracing Relaxed Elegance",
    titleKm: "ការស្លៀកពាក់ក្រណាត់កប្បាស Linen ដោយមិនបារម្ភរឿងជ្រីវជ្រួញ",
    excerpt: "Why linen wrinkles are a badge of authentic luxury, and how to style French flax shirts from beach trips to boardrooms.",
    excerptKm: "ស្វែងយល់ពីភាពទាក់ទាញនៃក្រណាត់កប្បាស និងវិធីតុបតែងអាវ Linen សម្រាប់ដំណើរកម្សាន្តមាត់សមុទ្ររហូតដល់ការប្រជុំ។",
    date: "September 2026",
    readTime: "3 min read",
    readTimeKm: "៣ នាទីអាន",
    image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1000&auto=format&fit=crop&q=80",
    featured: false,
    author: "Rithy Store Atelier",
    authorKm: "បន្ទប់កាត់ដេរ RITHY STORE",
    content: [
      "Linen is often feared for its propensity to wrinkle. Yet in Italian and French sartorial circles, those soft undulations are recognized as 'sprezzatura'—an effortless, unstudied elegance.",
      "French flax fibers are naturally antimicrobial and dissipate heat rapidly. Pair an unbuttoned camp-collar linen shirt with tailored chinos for a weekend in Kep or Siem Reap.",
      "Tip: Steam lightly rather than pressing flat; allowing the natural slub texture to show is what gives linen its organic charisma."
    ],
    contentKm: [
      "មនុស្សមួយចំនួនខ្លាចការស្លៀកក្រណាត់ linen ដោយសារតែខ្លាចជ្រីវជ្រួញ។ ប៉ុន្តែនៅក្នុងពិភពម៉ូដអឺរ៉ុប ផ្នត់ជ្រីវស្រាលៗទាំងនោះត្រូវបានចាត់ទុកជាសញ្ញានៃភាពប្រណិតបែបធម្មជាតិ និងថ្លៃថ្នូរ។",
      "សរសៃក្រណាត់ linen ជួយការពារបាក់តេរី និងបញ្ចេញកម្តៅបានលឿន។ ការស្លៀកអាវកបើក linen ជាមួយខោ chino គឺស័ក្តិសមឥតខ្ចោះសម្រាប់ចុងសប្តាហ៍នៅខេត្តកែប ឬសៀមរាប។",
      "គន្លឹះ៖ ប្រើចំហាយទឹកអ៊ុតស្រាលៗ ដើម្បីរក្សាសាច់ក្រណាត់ធម្មជាតិឱ្យនៅដដែល នោះទើបជាភាពស្រស់ស្អាតពិតប្រាកដ។"
    ],
    relatedProduct: {
      name: "French Flax Camp Shirt",
      nameKm: "អាវកប្បាសបារាំង Linen ត្រជាក់ស្រួល",
      price: "$45.00",
      priceKm: "៛182,000",
      link: "/shop"
    }
  },
  {
    id: "garment-care-guide",
    category: "Care & Craft",
    categoryKm: "ការថែទាំ & បច្ចេកទេស",
    title: "5 Garment Care Rituals to Make Your Wardrobe Last a Decade",
    titleKm: "វិធីសាស្ត្រថែទាំ ៥ យ៉ាងដើម្បីឱ្យសម្លៀកបំពាក់របស់អ្នកប្រើប្រាស់បាន ១០ ឆ្នាំ",
    excerpt: "Stop washing wool after every wear. Discover the tailor's insider secrets for brushing, airing, and storing fine textiles.",
    excerptKm: "កុំបោកគក់ក្រណាត់រោមចៀមញឹកញាប់ពេក! ស្វែងយល់ពីគន្លឹះសំខាន់ៗរបស់ជាងកាត់ដេរក្នុងការដុសសម្អាត ហាលខ្យល់ និងការរក្សាទុក។",
    date: "August 2026",
    readTime: "5 min read",
    readTimeKm: "៥ នាទីអាន",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1000&auto=format&fit=crop&q=80",
    featured: false,
    author: "Chhay Lim, Master Conservator",
    authorKm: "ឆាយ លីម • អ្នកជំនាញថែទាំសម្លៀកបំពាក់",
    content: [
      "Fast fashion has conditioned people to wash garments aggressively in hot water. Fine garments, however, thrive on minimal washing and gentle preservation.",
      "1. Brush, Don't Wash: A boar-bristle brush removes dust and resets wool fibers after every wear.",
      "2. Rest 24 Hours: Never wear the same wool trousers or leather shoes two days in a row; fibers need time to naturally bounce back.",
      "3. Cedar Hangers: Thick contoured wooden hangers preserve shoulder structure far better than thin wire.",
      "4. Steam over Iron: Direct dry iron heat can singe delicate silk and linen fibers. Use gentle vertical steaming instead."
    ],
    contentKm: [
      "សម្លៀកបំពាក់គុណភាពខ្ពស់ មិនត្រូវការការបោកគក់ដោយម៉ាស៊ីនញឹកញាប់ពេកនោះទេ។ ការថែទាំត្រឹមត្រូវជួយឱ្យអ្នកសន្សំលុយ និងរក្សាគុណភាពបានរាប់ឆ្នាំ។",
      "១. ប្រើច្រាសដុសធូលី៖ ដុសសម្អាតធូលីចេញក្រោយពាក់រួច ដោយមិនចាំបាច់បោកទឹកញឹកញាប់។",
      "២. ទុកឱ្យក្រណាត់សម្រាក ២៤ ម៉ោង៖ កុំពាក់ខោ ឬស្បែកជើងដដែលៗពីរថ្ងៃជាប់គ្នា ទុកឱ្យសរសៃក្រណាត់រលាឡើងវិញ។",
      "៣. ប្រើប្រដាប់ព្យួរឈើក្រាស់៖ ជួយរក្សាទម្រង់ស្មាអាវធំឱ្យនៅស្អាត មិនបាក់រាង។",
      "៤. ប្រើចំហាយទឹកជំនួសការអ៊ុតស្ងួត៖ ជៀសវាងការប្រើកម្តៅផ្ទាល់លើក្រណាត់សូត្រ និង linen។"
    ],
    relatedProduct: {
      name: "Contoured Cedar Suit Hanger",
      nameKm: "ប្រដាប់ព្យួរអាវធំធ្វើពីឈើក្រអូប",
      price: "$18.00",
      priceKm: "៛73,000",
      link: "/shop"
    }
  },
  {
    id: "bespoke-vs-ready-to-wear",
    category: "Style & Fit",
    categoryKm: "ស្ទីល & ការស្លៀកពាក់",
    title: "Bespoke vs. Ready-to-Wear: Finding Your Perfect Balance",
    titleKm: "ការកាត់ដេរវាស់ទំហំ & សម្លៀកបំពាក់ស្រាប់៖ ជ្រើសរើសមួយណាឱ្យសមស្រប?",
    excerpt: "When should you invest in a fully custom cut, and when does our precision ready-to-wear deliver the exact right silhouette?",
    excerptKm: "តើពេលណាដែលអ្នកគួរបញ្ជាកាត់ដេរផ្ទាល់ខ្លួន ហើយពេលណាដែលសម្លៀកបំពាក់ស្រាប់របស់យើងឆ្លើយតបបានយ៉ាងល្អឥតខ្ចោះ?",
    date: "August 2026",
    readTime: "4 min read",
    readTimeKm: "៤ នាទីអាន",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=1000&auto=format&fit=crop&q=80",
    featured: false,
    author: "Chanrithy Sar, Creative Director",
    authorKm: "ចាន់រិទ្ធី សារ • ស្ថាបនិក",
    content: [
      "At RITHY STORE, our ready-to-wear tailoring incorporates 80% of bespoke features: hand-set collars, contoured waist suppression, and generous seam allowances for alterations.",
      "If you fall within standard sizing proportions, our off-the-rack suits tailored with our in-house adjustments deliver 95% of a bespoke look at a fraction of the wait time.",
      "For milestone weddings, diplomatic state events, or unique body profiles, booking a private atelier session remains the ultimate personal luxury."
    ],
    contentKm: [
      "នៅ RITHY STORE ឈុតអាវធំស្រាប់របស់យើងត្រូវបានរៀបចំឡើងដោយបច្ចេកទេសកាត់ដេរកម្រិតខ្ពស់ ដូចជា ការដេរកអាវដោយដៃ ការកិបចង្កេះ និងការទុកសាច់ក្រណាត់សម្រាប់កែទំហំ។",
      "ប្រសិនបើរូបរាងរបស់អ្នកស្របតាមទំហំស្តង់ដារ ឈុតអាវធំស្រាប់របស់យើងរួមផ្សំនឹងការកាត់តម្រូវបន្តិចបន្តួចនៅហាង នឹងផ្តល់នូវភាពស្រស់ស្អាតស្ទើរតែ ១០០% នៃឈុតកាត់វាស់ផ្ទាល់ខ្លួន។",
      "ប៉ុន្តែសម្រាប់ពិធីមង្គលការ កម្មវិធីកិត្តិយសធំៗ ឬអ្នកដែលចង់បានភាពឥតខ្ចោះ ការកក់ណាត់ជួបកាត់ដេរផ្ទាល់នៅហាង គឺជាជម្រើសដ៏វិសេសវិសាល។"
    ],
    relatedProduct: {
      name: "Signature Charcoal Two-Piece Suit",
      nameKm: "ឈុតអាវធំពណ៌ប្រផេះ Charcoal ២ បំណែក",
      price: "$189.00",
      priceKm: "៛765,000",
      link: "/shop"
    }
  }
];

const Journal = () => {
  const { t, isKhmer } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeArticle, setActiveArticle] = useState(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: "all", label: t("journal_all", "All Stories") },
    { id: "Style & Fit", label: isKhmer ? "ស្ទីល & ការស្លៀកពាក់" : "Style & Fit" },
    { id: "Fabric Stories", label: isKhmer ? "រឿងរ៉ាវក្រណាត់" : "Fabric Stories" },
    { id: "Cambodia Living", label: isKhmer ? "ម៉ូដនៅភ្នំពេញ" : "Cambodia Living" },
    { id: "Care & Craft", label: isKhmer ? "ការថែទាំសម្លៀកបំពាក់" : "Care & Craft" }
  ];

  const filteredArticles = selectedCategory === "all"
    ? articlesData
    : articlesData.filter(a => a.category === selectedCategory);

  const featuredArticle = articlesData.find(a => a.featured) || articlesData[0];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail("");
    }
  };

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors duration-300 min-h-screen">
      {/* Top Banner / Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-neutral-200 dark:border-white/10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-b from-[#c2a677]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
            <Link to="/" className="hover:text-[#c2a677] transition-colors">
              {t("nav_home", "HOME")}
            </Link>
            <span>/</span>
            <span className="text-[#9a783e] dark:text-[#c2a677] font-semibold">
              {t("nav_journal", "JOURNAL")}
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c2a677]/10 border border-[#c2a677]/30 text-[#9a783e] dark:text-[#c2a677] text-xs font-semibold tracking-wider uppercase mb-5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isKhmer ? "ទស្សនាវដ្តី & គន្លឹះតុបតែងខ្លួន" : "THE RITHY EDITORIAL"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 dark:text-white leading-[1.15] tracking-tight mb-5">
              {t("journal_title", "Journal & Style Philosophy")}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              {t("journal_subtitle", "Explore sartorial essays, fabric archives, garment care masterclasses, and modern styling notes from our Phnom Penh atelier.")}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cover Story */}
      <section className="py-12 md:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 group">
          <div className="lg:col-span-7 relative h-80 sm:h-96 lg:h-[480px] overflow-hidden">
            <img
              src={featuredArticle.image}
              alt={isKhmer ? featuredArticle.titleKm : featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#9a783e] dark:bg-[#c2a677] text-white dark:text-neutral-900 shadow-md">
                ★ {t("journal_featured", "Featured Story")}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono mb-3">
                <span className="text-[#9a783e] dark:text-[#c2a677] font-semibold">
                  {isKhmer ? featuredArticle.categoryKm : featuredArticle.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {isKhmer ? featuredArticle.readTimeKm : featuredArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white leading-snug mb-4 group-hover:text-[#9a783e] dark:group-hover:text-[#c2a677] transition-colors">
                {isKhmer ? featuredArticle.titleKm : featuredArticle.title}
              </h2>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-6">
                {isKhmer ? featuredArticle.excerptKm : featuredArticle.excerpt}
              </p>

              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {isKhmer ? featuredArticle.authorKm : featuredArticle.author} — {featuredArticle.date}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveArticle(featuredArticle)}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9a783e] dark:text-[#c2a677] hover:underline cursor-pointer"
              >
                <span>{t("journal_read_article", "Read Story")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs text-neutral-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>3.4k {isKhmer ? "អ្នកអាន" : "reads"}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 dark:border-white/10 pb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md"
                  : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:border-[#c2a677]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Article Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.image}
                    alt={isKhmer ? article.titleKm : article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider bg-black/60 text-white backdrop-blur-md">
                      {isKhmer ? article.categoryKm : article.category}
                    </span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isKhmer ? article.readTimeKm : article.readTime}</span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white leading-snug mb-3 group-hover:text-[#9a783e] dark:group-hover:text-[#c2a677] transition-colors">
                    {isKhmer ? article.titleKm : article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed line-clamp-3">
                    {isKhmer ? article.excerptKm : article.excerpt}
                  </p>
                </div>
              </div>

              {/* Bottom Read Action */}
              <div className="p-6 pt-0 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between mt-4">
                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9a783e] dark:text-[#c2a677] hover:underline cursor-pointer"
                >
                  <span>{t("journal_read_article", "Read Story")}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-[11px] text-neutral-400">
                  {isKhmer ? article.authorKm : article.author}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Curated Style Newsletter Box */}
      <section className="py-16 md:py-20 bg-stone-100 dark:bg-neutral-900/60 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c2a677]/10 text-[#9a783e] dark:text-[#c2a677] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isKhmer ? "សារលិខិតសម្លៀកបំពាក់ឯកជន" : "THE ATELIER DISPATCH"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-3">
            {isKhmer ? "ជាវព័ត៌មានម៉ូដ និងប្រូម៉ូសិនពិសេសប្រចាំសប្តាហ៍" : "Receive Our Weekly Sartorial Edition"}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-8 font-light">
            {isKhmer
              ? "ទទួលបានការណែនាំពីរបៀបស្លៀកពាក់ ការប្រកាសម៉ូដថ្មីៗ និងការបញ្ចុះតម្លៃផ្តាច់មុខសម្រាប់សមាជិក RITHY STORE នៅកម្ពុជា។"
              : "Invitations to private preview drops, bespoke trunk shows in Boeung Keng Kang, and curated essays delivered to your inbox."}
          </p>

          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isKhmer ? "បញ្ចូលអាសយដ្ឋានអ៊ីមែលរបស់អ្នក..." : "Enter your email address..."}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-white/15 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#c2a677]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs uppercase tracking-wider hover:bg-[#9a783e] dark:hover:bg-[#c2a677] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>{isKhmer ? "ជាវឥឡូវនេះ" : "SUBSCRIBE"}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {subscribed && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-lg border border-emerald-500/30">
              <Check className="w-4 h-4" />
              <span>
                {isKhmer
                  ? "សូមអរគុណ! អ្នកបានចុះឈ្មោះទទួលសារលិខិតជោគជ័យ។"
                  : "Thank you! You are now subscribed to RITHY STORE Private Edit."}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-2xl p-6 sm:p-10">
            {/* Close Button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Article Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#9a783e] dark:text-[#c2a677] font-mono mb-2">
                <span>{isKhmer ? activeArticle.categoryKm : activeArticle.category}</span>
                <span>•</span>
                <span>{isKhmer ? activeArticle.readTimeKm : activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-900 dark:text-white leading-tight mb-4">
                {isKhmer ? activeArticle.titleKm : activeArticle.title}
              </h2>

              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 border-b border-neutral-200 dark:border-white/10 pb-4">
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {isKhmer ? activeArticle.authorKm : activeArticle.author}
                  </span>
                  <span> • {activeArticle.date}</span>
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold hover:text-[#c2a677] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? (isKhmer ? "បានចម្លង!" : "Copied!") : t("journal_share", "Share")}</span>
                </button>
              </div>
            </div>

            {/* Article Hero Media */}
            <div className="rounded-2xl overflow-hidden mb-8 h-64 sm:h-80">
              <img
                src={activeArticle.image}
                alt={isKhmer ? activeArticle.titleKm : activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Body */}
            <div className="prose prose-neutral dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4 font-light">
              {(isKhmer ? activeArticle.contentKm : activeArticle.content).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Featured Product Mention */}
            {activeArticle.relatedProduct && (
              <div className="mt-8 p-5 rounded-2xl bg-stone-50 dark:bg-neutral-950 border border-[#c2a677]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#c2a677]/20 flex items-center justify-center text-[#9a783e] dark:text-[#c2a677]">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9a783e] dark:text-[#c2a677] font-semibold">
                      {isKhmer ? "ម៉ូដដែលបានលើកឡើងក្នុងអត្ថបទ" : "Featured In This Story"}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {isKhmer ? activeArticle.relatedProduct.nameKm : activeArticle.relatedProduct.name}
                    </h4>
                    <span className="text-xs font-semibold text-[#9a783e] dark:text-[#c2a677]">
                      {isKhmer ? activeArticle.relatedProduct.priceKm : activeArticle.relatedProduct.price}
                    </span>
                  </div>
                </div>

                <Link
                  to={activeArticle.relatedProduct.link}
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider hover:bg-[#9a783e] dark:hover:bg-[#c2a677] transition-colors text-center"
                >
                  {isKhmer ? "មើលទំនិញនេះ" : "View Piece"}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;

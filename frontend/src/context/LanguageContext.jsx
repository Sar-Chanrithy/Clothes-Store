import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const translations = {
  en: {
    // Navigation
    nav_home: "HOME",
    nav_shop: "SHOP",
    nav_collections: "COLLECTIONS",
    nav_about: "ABOUT",
    nav_journal: "JOURNAL",
    nav_contact: "CONTACT",
    nav_search_placeholder: "Search timeless suits, jackets, linen shirts, leather shoes...",
    nav_appearance: "APPEARANCE",
    nav_language: "LANGUAGE",
    nav_sign_in: "Sign In",
    nav_sign_out: "Sign Out",
    nav_my_profile: "My Profile",
    nav_my_orders: "My Orders",
    nav_wishlist: "Wishlist",
    nav_privilege_club: "Privilege Club",
    nav_payment_methods: "Payment Methods",
    nav_preferences: "Preferences",
    nav_admin_dashboard: "Admin Dashboard",
    nav_member_badge: "RITHY STORE MEMBER",

    // Common
    quick_access: "Quick 1-Click Access",
    customer: "Customer",
    store_admin: "Store Admin",
    starting_from: "Starting from:",
    free_delivery_cambodia: "Free delivery over $30 in Cambodia",
    explore_catalogue: "EXPLORE CATALOGUE",
    view_details: "View Details",
    view_product_details: "View Product Details",
    add_to_cart: "Add to Cart",
    added: "Added!",
    all_collections: "All Collections",
    products_available: "products available",
    clear_filters: "Clear all filters",
    no_matching_products: "No matching products found",
    reset_search: "Reset Search & View All",
    matching: "Matching",
    featured_piece: "FEATURED PIECE",
    in_stock_pp: "In Stock (Phnom Penh)",

    // Hero Features
    f1_title: "PREMIUM FABRICS",
    f1_desc: "Carefully selected materials",
    f2_title: "TIMELESS DESIGN",
    f2_desc: "Built to last beyond trends",
    f3_title: "WORLDWIDE SHIPPING",
    f3_desc: "Delivering luxury anywhere",

    // Hero Tabs
    tab_mens: "Men's Collection",
    tab_womens: "Women's Collection",

    // Hero Slides
    s1_category: "MEN'S BESPOKE TAILORING",
    s1_title: "REFINED",
    s1_title_accent: "SILHOUETTES",
    s1_tagline: "Italian Virgin Wool Suits & Tailored Blazers",
    s1_desc: "Handcrafted fine stitching, structured modern cut, and breathable luxury fabrics tailored for business and formal occasions in Cambodia.",
    s1_cta: "SHOP MEN'S SUITS",
    s1_b1: "100% Imported Italian Virgin Wool",
    s1_b2: "Free Phnom Penh Same-Day Delivery",
    s1_b3: "7-Day Perfect Fit Exchange Guarantee",

    s2_category: "WOMEN'S DESIGNER ATELIER",
    s2_title: "MODERN",
    s2_title_accent: "ELEGANCE",
    s2_tagline: "Mulberry Silk Blends & Wool Overcoats",
    s2_desc: "Soft organic mulberry silks, sculptural flowing cuts, and artisan leather bags engineered for effortless modern grace and everyday comfort.",
    s2_cta: "EXPLORE WOMEN'S ATELIER",
    s2_b1: "Organic Mulberry Silk & Fine Cashmere",
    s2_b2: "Express Delivery Across 25 Provinces",
    s2_b3: "Complimentary Luxury Gift Packaging",

    s3_category: "ONLINE SUMMER CAMPAIGN",
    s3_title: "JUST FOR",
    s3_title_accent: "YOU",
    s3_tagline: "30% OFF Summer Linens & Online Orders",
    s3_desc: "Lightweight French flax linens, breezy resort shirts, and summer dresses tailored for Cambodia's climate. Code: RITHY30",
    s3_cta: "CLAIM 30% OFF",
    s3_b1: "Instant 30% Discount (Code: RITHY30)",
    s3_b2: "Pre-Washed Ultra Soft Linen",
    s3_b3: "ABA Pay, Wing & Cash on Delivery",

    s4_category: "URBAN STREETWEAR ATELIER",
    s4_title: "UNLOCK",
    s4_title_accent: "YOUR STYLE",
    s4_tagline: "50% OFF Japanese Selvedge Denim Jackets",
    s4_desc: "Heavyweight denim, raw twill statement pieces, and contemporary streetwear cuts built to last. Code: RITHY50",
    s4_cta: "PRE-ORDER 50% OFF",
    s4_b1: "50% Discount on Pre-Orders",
    s4_b2: "Reinforced Rivets & Double Stitching",
    s4_b3: "Exclusive Phnom Penh Urban Cut",

    // Categories
    cat_all: "All",
    cat_new: "✨ New Arrivals",
    cat_sale: "🔥 On Sale",
    cat_men: "Men's Fashion",
    cat_women: "Women's Fashion",
    cat_footwear: "Footwear",
    cat_accessories: "Accessories",
    cat_sportswear: "Sportswear",
    cat_kids: "Kids Fashion",

    // Footer
    footer_tagline: "Quality apparel and modern essentials tailored for Cambodia, combining contemporary fashion with everyday comfort and affordable prices.",
    footer_trusted: "Trusted by 50,000+ customers in Cambodia",
    footer_rights: "All rights reserved.",
    footer_made_by: "Made with pride in Cambodia",

    // About Page
    about_title: "CRAFTING CONTEMPORARY ELEGANCE IN CAMBODIA",
    about_subtitle: "Bridging European bespoke tailoring with Cambodian everyday grace, breathability, and quiet luxury.",
    about_story_badge: "OUR HERITAGE & ATELIER",
    about_story_title: "Born in Phnom Penh. Built to Last.",
    about_story_p1: "Founded in 2020 in the vibrant heart of Phnom Penh, RITHY STORE began with a singular conviction: luxury should not be an inaccessible compromise. We set out to redefine Cambodian fashion by marrying world-class fabrics—Italian virgin wool, French flax linen, and organic Mulberry silk—with structured, breathable cuts tailored specifically for Southeast Asia's climate.",
    about_story_p2: "Every piece in our collection is precision-engineered in small batches. We obsess over the tactile feeling of every fiber, reinforced double stitching, and proportion that empowers the modern professional.",
    about_pillars_title: "OUR FOUR ATELIER PILLARS",
    about_p1_title: "100% SOURCED FIBERS",
    about_p1_desc: "Direct relationships with mills in Biella, Italy and Normandy, France.",
    about_p2_title: "CAMBODIA TAILORING",
    about_p2_desc: "Handcrafted finishings by master tailors with decades of experience.",
    about_p3_title: "TRANSPARENT PRICING",
    about_p3_desc: "Dual USD and KHR pricing with zero luxury retailer markups.",
    about_p4_title: "SUSTAINABILITY & CARE",
    about_p4_desc: "Organic packaging and hassle-free 7-day fit guarantees.",

    // Journal Page
    journal_title: "RITHY EDITORIAL & JOURNAL",
    journal_subtitle: "Insights on tailoring, fabric heritage, style guides, and contemporary culture in Cambodia.",
    journal_read_time: "min read",
    journal_read_article: "Read Article",
    journal_featured: "FEATURED STORY",
    journal_share: "Share",
    journal_all: "All Stories",

    // Contact Page
    contact_title: "CONNECT WITH OUR CONCIERGE",
    contact_subtitle: "Visit our boutique in Phnom Penh or reach our tailoring team online. We respond within 2 hours.",
    contact_boutique_title: "Flagship Boutique & Atelier",
    contact_address: "#88 Street 214 (Samdach Pan Ave), Boeung Keng Kang, Phnom Penh, Cambodia",
    contact_hours: "Monday – Sunday: 9:00 AM – 9:00 PM (ICT)",
    contact_phone: "+855 12 888 999",
    contact_telegram: "t.me/rithystore",
    contact_form_title: "Send Us a Message",
    contact_name: "Full Name",
    contact_email: "Email Address",
    contact_phone_label: "Phone / Telegram",
    contact_subject: "Subject",
    contact_message: "Your Message",
    contact_send: "Send Message",
    contact_sent_success: "Thank you! Your message has been sent successfully. Our Phnom Penh concierge team will reach out within 2 hours.",
    contact_chat_telegram: "Chat on Telegram",
    contact_chat_whatsapp: "Chat on WhatsApp"
  },

  km: {
    // Navigation
    nav_home: "ទំព័រដើម",
    nav_shop: "ហាងទំនិញ",
    nav_collections: "ការប្រមូលផ្ដុំ",
    nav_about: "អំពីយើង",
    nav_journal: "ទិនានុប្បវត្តិ",
    nav_contact: "ទំនាក់ទំនង",
    nav_search_placeholder: "ស្វែងរកឈុតអាវធំ, អាវក្រៅ, អាវសាច់ក្រណាត់, ស្បែកជើង...",
    nav_appearance: "រចនាប័ទ្មពន្លឺ",
    nav_language: "ភាសា",
    nav_sign_in: "ចូលគណនី",
    nav_sign_out: "ចាកចេញ",
    nav_my_profile: "គណនីរបស់ខ្ញុំ",
    nav_my_orders: "ការកុម្ម៉ង់របស់ខ្ញុំ",
    nav_wishlist: "បញ្ជីពេញចិត្ត",
    nav_privilege_club: "ក្លឹបសមាជិក VIP",
    nav_payment_methods: "វិធីសាស្ត្រទូទាត់",
    nav_preferences: "ការកំណត់",
    nav_admin_dashboard: "ផ្ទាំងគ្រប់គ្រង Admin",
    nav_member_badge: "សមាជិក RITHY STORE",

    // Common
    quick_access: "ចូលគណនីរហ័ស ១ ឃ្លីក",
    customer: "អតិថិជន",
    store_admin: "អ្នកគ្រប់គ្រងហាង",
    starting_from: "តម្លៃចាប់ពី៖",
    free_delivery_cambodia: "ដឹកជញ្ជូនឥតគិតថ្លៃចាប់ពី $30 ទូទាំងកម្ពុជា",
    explore_catalogue: "កាតាឡុកទំនិញ",
    view_details: "មើលលម្អិត",
    view_product_details: "មើលព័ត៌មានលម្អិត",
    add_to_cart: "ដាក់ក្នុងកន្ត្រក",
    added: "បានដាក់ចូល!",
    all_collections: "ការប្រមូលផ្ដុំទាំងអស់",
    products_available: "មុខទំនិញមានក្នុងស្តុក",
    clear_filters: "សម្អាតការស្វែងរក",
    no_matching_products: "រកមិនឃើញទំនិញដែលត្រូវនឹងការស្វែងរកទេ",
    reset_search: "កំណត់ឡើងវិញ & មើលទាំងអស់",
    matching: "ផ្គូផ្គង",
    featured_piece: "ម៉ូដលេចធ្លោប្រចាំរដូវ",
    in_stock_pp: "មានក្នុងស្តុក (ភ្នំពេញ)",

    // Hero Features
    f1_title: "PREMIUM FABRICS",
    f1_desc: "សរសៃក្រណាត់ធម្មជាតិជ្រើសរើសយ៉ាងផ្ចិតផ្ចង់",
    f2_title: "TIMELESS DESIGN",
    f2_desc: "រចនាបថប្រណិតលើសពីភាពទាន់សម័យបណ្តោះអាសន្ន",
    f3_title: "WORLDWIDE SHIPPING",
    f3_desc: "ដឹកជញ្ជូនរហ័សដល់គ្រប់ខេត្តក្រុង និងទូទាំងសកលលោក",

    // Hero Tabs
    tab_mens: "ម៉ូដបុរស (Men's)",
    tab_womens: "ម៉ូដនារី (Women's)",

    // Hero Slides
    s1_category: "ម៉ូដអាវធំបុរសប្រណិត",
    s1_title: "រចនាបថ",
    s1_title_accent: "ទាន់សម័យ",
    s1_tagline: "ឈុតអាវធំរោមចៀមអ៊ីតាលី 100% សម្រាប់បុរស",
    s1_desc: "ថ្នេរដេរយ៉ាងផ្ចិតផ្ចង់ កាត់តម្រូវតាមទម្រង់រូបរាងទំនើប និងសាច់ក្រណាត់ប្រណិតមានផាសុកភាពខ្ពស់ ស័ក្តិសមសម្រាប់កម្មវិធីធំៗនៅកម្ពុជា។",
    s1_cta: "ទិញឈុតអាវធំបុរស",
    s1_b1: "ក្រណាត់រោមចៀមអ៊ីតាលី 100%",
    s1_b2: "ដឹកជញ្ជូនរហ័សដល់កន្លែងនៅភ្នំពេញ",
    s1_b3: "ធានាប្តូរទំហំក្នុងរយៈពេល ៧ ថ្ងៃ",

    s2_category: "ម៉ូដអាវនារីទាន់សម័យ",
    s2_title: "ភាពស្រស់",
    s2_title_accent: "ឆើតឆាយ",
    s2_tagline: "អាវរងាសូត្រ និងកាបូបស្បែកប្រណិត",
    s2_desc: "សូត្រមនសរីរាង្គទន់រលោង ការកាត់ដេរបែបសិល្បៈ និងកាបូបស្បែកធ្វើដោយដៃ រចនាឡើងសម្រាប់ភាពថ្លៃថ្នូរ និងផាសុកភាពរាល់ថ្ងៃ។",
    s2_cta: "ស្វែងរកម៉ូដនារី",
    s2_b1: "សូត្រមនសរីរាង្គ និងសាច់ Cashmere ម៉ដ្ឋ",
    s2_b2: "ដឹកជញ្ជូនរហ័ស ២៥ ខេត្តក្រុង",
    s2_b3: "វេចខ្ចប់ជាកាដូយ៉ាងប្រណិតឥតគិតថ្លៃ",

    s3_category: "ប្រូម៉ូសិនកុម្ម៉ង់តាម ONLINE",
    s3_title: "សម្រាប់តែ",
    s3_title_accent: "អ្នក",
    s3_tagline: "បញ្ចុះតម្លៃ 30% សម្លៀកបំពាក់រដូវក្តៅ & ការកុម្ម៉ង់ Online",
    s3_desc: "ក្រណាត់កប្បាសបារាំងស្រាលត្រជាក់ អាវសាច់ក្រណាត់ដើរកម្សាន្ត និងរ៉ូបរដូវក្តៅ ស័ក្តិសមបំផុតសម្រាប់អាកាសធាតុកម្ពុជា។ កូដ: RITHY30",
    s3_cta: "ទទួលបានការបញ្ចុះតម្លៃ 30%",
    s3_b1: "បញ្ចុះតម្លៃ 30% ភ្លាមៗ (កូដ: RITHY30)",
    s3_b2: "សាច់ក្រណាត់ទន់ត្រជាក់ពិសេស",
    s3_b3: "ទទួលទូទាត់តាម ABA, Wing និងលុយសុទ្ធ",

    s4_category: "ម៉ូដ STREETWEAR & ខូវប៊យ",
    s4_title: "ដោះសោ",
    s4_title_accent: "ស្ទីលអ្នក",
    s4_tagline: "បញ្ចុះតម្លៃ 50% អាវក្រៅខូវប៊យ Denim ជប៉ុន",
    s4_desc: "អាវក្រៅខូវប៊យសាច់ក្រាស់គុណភាពខ្ពស់ ស្ទីល Streetwear ទាន់សម័យ រឹងមាំ និងប្រើប្រាស់បានយូរអង្វែង។ កូដ: RITHY50",
    s4_cta: "កុម្ម៉ង់ទុកមុន 50% OFF",
    s4_b1: "បញ្ចុះតម្លៃ 50% សម្រាប់ការកុម្ម៉ង់ទុកមុន",
    s4_b2: "ថ្នេរដេររឹងមាំពីរជាន់ និងគ្រាប់ឡេវលង្ហិន",
    s4_b3: "ស្ទីលយុវវ័យទាន់សម័យនៅភ្នំពេញ",

    // Categories
    cat_all: "ទាំងអស់",
    cat_new: "✨ មកដល់ថ្មី",
    cat_sale: "🔥 បញ្ចុះតម្លៃពិសេស",
    cat_men: "ម៉ូដបុរស",
    cat_women: "ម៉ូដនារី",
    cat_footwear: "ស្បែកជើង",
    cat_accessories: "គ្រឿងតុបតែង",
    cat_sportswear: "សម្លៀកបំពាក់កីឡា",
    cat_kids: "ម៉ូដកុមារ",

    // Footer
    footer_tagline: "សម្លៀកបំពាក់គុណភាពខ្ពស់ និងម៉ូដទាន់សម័យសម្រិតសម្រាំងសម្រាប់ប្រទេសកម្ពុជា រួមបញ្ចូលគ្នានូវភាពស្រស់ស្អាត ផាសុកភាព និងតម្លៃសមរម្យ។",
    footer_trusted: "ទទួលបានការជឿទុកចិត្តពីអតិថិជនជាង 50,000+ នាក់នៅកម្ពុជា",
    footer_rights: "រក្សាសិទ្ធិគ្រប់យ៉ាង។",
    footer_made_by: "បង្កើតឡើងដោយមោទនភាពនៅកម្ពុជា",

    // About Page
    about_title: "ការកាត់ដេរម៉ូដទាន់សម័យប្រកបដោយមោទនភាពនៅកម្ពុជា",
    about_subtitle: "ការរួមបញ្ចូលគ្នានូវក្បួនដេរសម្លៀកបំពាក់អឺរ៉ុប ជាមួយនឹងភាពថ្លៃថ្នូរ ផាសុកភាព និងភាពប្រណិតសម្រាប់ប្រជាជនកម្ពុជា។",
    about_story_badge: "ប្រវត្តិ & សិល្បៈនៃការកាត់ដេរ",
    about_story_title: "បង្កើតឡើងនៅភ្នំពេញ គុណភាពគង់វង្សយូរអង្វែង",
    about_story_p1: "បង្កើតឡើងក្នុងឆ្នាំ ២០២០ នៅចំកណ្តាលរាជធានីភ្នំពេញ ហាង RITHY STORE បានចាប់ផ្តើមឡើងជាមួយទស្សនវិស័យច្បាស់លាស់៖ ភាពប្រណិតមិនមែនជាការចំណាយហួសហេតុនោះឡើយ។ យើងប្តេជ្ញាលើកកម្ពស់វិស័យម៉ូដនៅកម្ពុជា តាមរយៈការជ្រើសរើសក្រណាត់គុណភាពខ្ពស់លំដាប់ពិភពលោក ដូចជា រោមចៀមអ៊ីតាលី ក្រណាត់កប្បាសបារាំង និងសូត្រមនធម្មជាតិ មកកាត់តម្រូវយ៉ាងសមសួនសម្រាប់អាកាសធាតុកម្ពុជា។",
    about_story_p2: "រាល់ម៉ូដសម្លៀកបំពាក់របស់យើង សុទ្ធតែត្រូវបានដេរយ៉ាងផ្ចិតផ្ចង់ជាក្រុមតូចៗ ដោយផ្តោតលើភាពទន់ល្មើយនៃសាច់ក្រណាត់ ថ្នេរដេររឹងមាំពីរជាន់ និងទម្រង់រូបរាងដែលបង្កើនភាពជឿជាក់សម្រាប់អ្នកពាក់។",
    about_pillars_title: "សសរស្តម្ភទាំង ៤ នៃ RITHY STORE",
    about_p1_title: "ក្រណាត់គុណភាពពិត 100%",
    about_p1_desc: "នាំចូលផ្ទាល់ពីរោងចក្រក្រណាត់ល្បីៗនៅប្រទេសអ៊ីតាលី និងបារាំង។",
    about_p2_title: "ស្នាដៃកាត់ដេរនៅកម្ពុជា",
    about_p2_desc: "ដេរដោយជាងជំនាញជនជាតិខ្មែរដែលមានបទពិសោធន៍រាប់សិបឆ្នាំ។",
    about_p3_title: "តម្លៃសមរម្យ និងតម្លាភាព",
    about_p3_desc: "បង្ហាញតម្លៃជាដុល្លារ ($ USD) និងប្រាក់រៀល (៛ KHR) ដោយគ្មានការបំប៉ោងតម្លៃ។",
    about_p4_title: "ការធានា និងបរិស្ថាន",
    about_p4_desc: "វេចខ្ចប់ដោយសម្ភារៈដែលមិនប៉ះពាល់បរិស្ថាន និងធានាប្តូរទំហំក្នុង ៧ ថ្ងៃ។",

    // Journal Page
    journal_title: "ទិនានុប្បវត្តិ & គន្លឹះតុបតែងខ្លួន",
    journal_subtitle: "ស្វែងយល់ពីរបៀបជ្រើសរើសសម្លៀកបំពាក់ វិធីថែទាំក្រណាត់ប្រណិត និងនិន្នាការម៉ូដទាន់សម័យនៅកម្ពុជា។",
    journal_read_time: "នាទីអាន",
    journal_read_article: "អានអត្ថបទ",
    journal_featured: "អត្ថបទពិសេសប្រចាំសប្តាហ៍",
    journal_share: "ចែករំលែក",
    journal_all: "អត្ថបទទាំងអស់",

    // Contact Page
    contact_title: "ទំនាក់ទំនងមកកាន់ក្រុមការងារយើងខ្ញុំ",
    contact_subtitle: "អញ្ជើញមកកាន់ហាងផ្ទាល់នៅភ្នំពេញ ឬផ្ញើសារមកកាន់យើងខ្ញុំ។ យើងនឹងឆ្លើយតបក្នុងរយៈពេលមិនលើសពី ២ ម៉ោង។",
    contact_boutique_title: "ហាងចម្បង & Atelier ភ្នំពេញ",
    contact_address: "ផ្ទះលេខ ៨៨ ផ្លូវ ២១៤ (វិថីសម្ដេចប៉ាន) សង្កាត់បឹងកេងកង រាជធានីភ្នំពេញ កម្ពុជា",
    contact_hours: "ចន្ទ – អាទិត្យ៖ ម៉ោង ៩:០០ ព្រឹក – ៩:០០ យប់",
    contact_phone: "+855 12 888 999",
    contact_telegram: "t.me/rithystore",
    contact_form_title: "ផ្ញើសារមកកាន់យើងខ្ញុំ",
    contact_name: "ឈ្មោះពេញ",
    contact_email: "អាសយដ្ឋានអ៊ីមែល",
    contact_phone_label: "លេខទូរស័ព្ទ / Telegram",
    contact_subject: "ប្រធានបទ",
    contact_message: "ខ្លឹមសារសាររបស់អ្នក",
    contact_send: "ផ្ញើសារឥឡូវនេះ",
    contact_sent_success: "សូមអរគុណ! សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ។ ក្រុមការងារយើងខ្ញុំនៅភ្នំពេញនឹងទាក់ទងមកអ្នកវិញក្នុងរយៈពេល ២ ម៉ោង។",
    contact_chat_telegram: "ឆាតតាម Telegram",
    contact_chat_whatsapp: "ឆាតតាម WhatsApp"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("app_lang");
      if (saved === "en" || saved === "km") return saved;
      return "km"; // Default to Khmer as requested!
    }
    return "km";
  });

  useEffect(() => {
    localStorage.setItem("app_lang", language);
    document.documentElement.lang = language === "km" ? "km" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "km" ? "en" : "km"));
  };

  const t = (key, fallback = "") => {
    const currentDict = translations[language] || translations.km;
    return currentDict[key] || translations.en[key] || fallback || key;
  };

  const isKhmer = language === "km";

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isKhmer,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default LanguageContext;

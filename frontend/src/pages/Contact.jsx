import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Navigation,
  ShieldCheck,
  Truck,
  CreditCard,
  RefreshCw,
  ExternalLink
} from "lucide-react";

// Lucide doesn't have brand icons for Telegram / WhatsApp
const TelegramIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
  </svg>
);

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.201.3-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.3-.019-.462.132-.612.136-.135.301-.351.452-.527.15-.176.201-.3.301-.502.101-.201.05-.377-.025-.527-.075-.15-.678-1.632-.929-2.234-.244-.587-.492-.507-.678-.517-.176-.01-.377-.01-.578-.01-.201 0-.527.075-.803.377-.276.301-1.054 1.03-1.054 2.511 0 1.481 1.079 2.912 1.229 3.113.15.201 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.229 1.378.197 1.898.119.579-.088 1.78-.728 2.03-1.431.251-.703.251-1.305.176-1.431-.075-.126-.276-.201-.577-.351zM12.04 2C6.52 2 2.03 6.49 2.03 12.01c0 1.76.46 3.48 1.34 5L2 22l5.13-1.35a9.98 9.98 0 004.91 1.28h.01c5.52 0 10.01-4.49 10.01-10.01C22.06 6.49 17.56 2 12.04 2z" />
  </svg>
);

const Contact = () => {
  const { t, isKhmer } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "tailoring",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "tailoring",
        message: ""
      });
      setTimeout(() => setSubmitted(false), 7000);
    }, 1200);
  };

  const faqItems = [
    {
      q: isKhmer ? "តើការដឹកជញ្ជូនរហ័សកម្រិតណាទូទាំងប្រទេសកម្ពុជា?" : "How fast is express delivery across Cambodia?",
      a: isKhmer 
        ? "នៅរាជធានីភ្នំពេញ យើងដឹកជញ្ជូនក្នុងថ្ងៃតែមួយ (២ - ៤ ម៉ោង)។ សម្រាប់បណ្តាខេត្តទាំង ២៤ យើងប្រើប្រាស់សេវា J&T Express និង វីរៈប៊ុនថាំ ដោយប្រើពេលត្រឹមតែ ២៤ ទៅ ៤៨ ម៉ោងប៉ុណ្ណោះ។ ឥតគិតថ្លៃសម្រាប់ការកុម្ម៉ង់ចាប់ពី $30 ឡើងទៅ។" 
        : "In Phnom Penh, we offer same-day express delivery within 2–4 hours. For all 24 provinces, we partner with J&T Express and Virak Buntham, arriving within 24–48 hours. Orders above $30 ship completely free."
    },
    {
      q: isKhmer ? "តើហាងទទួលវិធីសាស្ត្រទូទាត់អ្វីខ្លះ?" : "What payment methods are supported?",
      a: isKhmer 
        ? "យើងទទួលការទូទាត់តាម ABA KHQR, Wing Bank, ACLEDA, Bakong, សាច់ប្រាក់ផ្ទាល់ពេលទទួលទំនិញ (COD) នៅភ្នំពេញ និងកាតធនាគារអន្តរជាតិ Visa / Mastercard។ តម្លៃទំនិញត្រូវបានបង្ហាញជាដុល្លារ ($ USD) និងប្រាក់រៀល (៛ KHR) យ៉ាងច្បាស់លាស់។" 
        : "We accept ABA KHQR, Wing Bank, ACLEDA, Bakong, Cash on Delivery (COD) within Phnom Penh, and major credit cards (Visa / Mastercard). All prices are transparently displayed in both $ USD and ៛ KHR."
    },
    {
      q: isKhmer ? "ប្រសិនបើទំហំសម្លៀកបំពាក់មិនសម តើខ្ញុំអាចប្តូរបានទេ?" : "Can I exchange items if the size does not fit?",
      a: isKhmer 
        ? "បាទ/ចាស! យើងមានគោលការណ៍ធានាប្តូរទំហំដោយមិនគិតថ្លៃក្នុងរយៈពេល ៧ ថ្ងៃ។ អ្នកអាចអញ្ជើញមកកាន់ហាងរបស់យើងនៅបឹងកេងកងផ្ទាល់ ឬទាក់ទងមកក្រុមការងារដើម្បីផ្ញើដូរតាមអ្នកដឹកជញ្ជូន។" 
        : "Absolutely. We offer a 7-day hassle-free size exchange guarantee. You can exchange directly at our Boeung Keng Kang flagship lounge or coordinate a quick courier exchange with our concierge."
    },
    {
      q: isKhmer ? "តើខ្ញុំអាចកក់ណាត់ជួបកាត់ដេរវាស់ទំហំផ្ទាល់ខ្លួនដោយរបៀបណា?" : "How do I book a private bespoke fitting appointment?",
      a: isKhmer 
        ? "អ្នកអាចផ្ញើសារមកកាន់ Telegram របស់យើង (@rithystore) ឬបំពេញទម្រង់បែបបទខាងលើ ដោយជ្រើសរើសប្រធានបទ 'កក់ណាត់ជួបកាត់ដេរ'។ ក្រុមការងារនឹងរៀបចំពេលវេលា និងភេសជ្ជៈពិសេសជូនអ្នក។" 
        : "You can reach out directly via Telegram (@rithystore) or submit the contact form above with 'Bespoke Fitting Appointment'. Our master tailor will reserve a private 45-minute consultation with artisanal refreshments."
    },
    {
      q: isKhmer ? "តើហាងមានទទួលដេរឯកសណ្ឋានក្រុមហ៊ុន ឬកុម្ម៉ង់ជាក្រុមធំទេ?" : "Do you offer corporate suiting and bulk orders?",
      a: isKhmer 
        ? "បាទ/ចាស! យើងមានផ្តល់សេវាកាត់ដេរឈុតអាវធំ អាវយឺត និងឯកសណ្ឋានស្ថាប័នប្រណិត ជាមួយនឹងការប៉ាក់ឡូហ្គោ និងការវាស់ទំហំបុគ្គលិកផ្ទាល់ដល់ទីកន្លែង។" 
        : "Yes. Our corporate atelier crafts executive blazers, linen uniforms, and custom embroidered pieces for leading institutions across Phnom Penh and Siem Reap."
    }
  ];

  return (
    <div className="bg-stone-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 transition-colors duration-300 min-h-screen">
      {/* Top Banner / Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 border-b border-neutral-200 dark:border-white/10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-b from-[#c2a677]/15 to-transparent blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-6 font-mono">
            <Link to="/" className="hover:text-[#c2a677] transition-colors">
              {t("nav_home", "HOME")}
            </Link>
            <span>/</span>
            <span className="text-[#9a783e] dark:text-[#c2a677] font-semibold">
              {t("nav_contact", "CONTACT")}
            </span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#c2a677]/10 border border-[#c2a677]/30 text-[#9a783e] dark:text-[#c2a677] text-xs font-semibold tracking-wider uppercase mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isKhmer ? "សេវាបម្រើអតិថិជន & ATELIER" : "CONCIERGE & PRIVATE ATELIER"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-neutral-900 dark:text-white leading-[1.15] tracking-tight mb-5">
              {t("contact_title", "Get in Touch with Our Concierge")}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed">
              {t(
                "contact_subtitle",
                "Visit our flagship atelier in Phnom Penh or message us anytime. Our concierge team responds within 2 hours."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Form + Boutique Info */}
      <section className="py-12 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick Connect Floating Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {/* Telegram Card */}
          <a
            href="https://t.me/rithystore"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-[#0088cc]/50 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0088cc]/10 text-[#0088cc] flex items-center justify-center group-hover:scale-110 transition-transform">
              <TelegramIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Telegram</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#0088cc] transition-colors">
                @rithystore
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                {isKhmer ? "ឆ្លើយតបរហ័ស (< ១៥ នាទី)" : "Fast reply (< 15 mins)"}
              </div>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/85512888999"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-[#25D366]/50 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono">WhatsApp</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#25D366] transition-colors">
                +855 12 888 999
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">
                {isKhmer ? "ប្រឹក្សាទំហំ & ម៉ូដផ្ទាល់ខ្លួន" : "Sizing & VIP Styling"}
              </div>
            </div>
          </a>

          {/* Phone Hotline */}
          <a
            href="tel:+85512888999"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-[#c2a677]/50 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-[#c2a677]/15 text-[#9a783e] dark:text-[#c2a677] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Hotline</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#9a783e] dark:group-hover:text-[#c2a677] transition-colors">
                {t("contact_phone", "+855 12 888 999")}
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">
                9:00 AM – 9:00 PM (Everyday)
              </div>
            </div>
          </a>

          {/* Email Support */}
          <a
            href="mailto:support@rithystore.com"
            className="group p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Email</div>
              <div className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-purple-500 transition-colors">
                support@rithystore.com
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">
                Official Inquiries
              </div>
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-white/10 p-7 sm:p-10 shadow-xl">
              <div className="mb-8">
                <span className="text-xs uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] font-semibold font-mono">
                  {isKhmer ? "ផ្ញើសារមកកាន់យើងខ្ញុំ" : "DIRECT DISPATCH"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
                  {t("contact_form_title", "Send Us a Message")}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-light">
                  {isKhmer
                    ? "សូមបំពេញព័ត៌មានខាងក្រោម យើងខ្ញុំនឹងឆ្លើយតបមកអ្នកវិញតាមរយៈអ៊ីមែល ឬ Telegram ក្នុងពេលឆាប់ៗ។"
                    : "Whether you seek bespoke advice, order assistance, or styling recommendations, we are at your service."}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-emerald-900 dark:text-emerald-200 mb-2">
                    {isKhmer ? "សាររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!" : "Message Received with Distinction"}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 font-light max-w-md mx-auto">
                    {t(
                      "contact_sent_success",
                      "Thank you! Your message has been sent successfully. Our Phnom Penh concierge team will reach out within 2 hours."
                    )}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                  >
                    {isKhmer ? "ផ្ញើសារថ្មីមួយទៀត" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        {t("contact_name", "Full Name")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isKhmer ? "ឈ្មោះរបស់អ្នក..." : "e.g. Sopheak Chan"}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#c2a677] transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        {t("contact_email", "Email Address")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={isKhmer ? "អ៊ីមែលរបស់អ្នក..." : "e.g. chan@example.com"}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#c2a677] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone / Telegram */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        {t("contact_phone_label", "Phone / Telegram")}
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={isKhmer ? "+855 ... ឬ @username" : "+855 12 ... or @telegram"}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#c2a677] transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                        {t("contact_subject", "Subject / Department")}
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#c2a677] transition-colors cursor-pointer"
                      >
                        <option value="tailoring">
                          {isKhmer ? "កក់ណាត់ជួបកាត់ដេរ (Bespoke Fitting)" : "Bespoke Tailoring Fitting"}
                        </option>
                        <option value="order">
                          {isKhmer ? "សាកសួរពីការកុម្ម៉ង់ & ការដឹកជញ្ជូន" : "Order Tracking & Delivery"}
                        </option>
                        <option value="styling">
                          {isKhmer ? "ប្រឹក្សាទំហំ & ស្ទីលផ្ទាល់ខ្លួន" : "Sizing & Style Advice"}
                        </option>
                        <option value="vip">
                          {isKhmer ? "ក្លឹបសមាជិក VIP & Privilege" : "Privilege Club & VIP"}
                        </option>
                        <option value="press">
                          {isKhmer ? "កិច្ចសហការ & ទំនាក់ទំនងទូទៅ" : "Press & Partnerships"}
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                        {t("contact_message", "Your Message")} *
                      </label>
                      <span className="text-[11px] text-neutral-400">
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      required
                      rows={5}
                      maxLength={500}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isKhmer
                          ? "សូមរៀបរាប់ពីអ្វីដែលអ្នកចង់ឱ្យយើងជួយ..."
                          : "Describe your inquiry, sizing questions, or preferred fitting date..."
                      }
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-neutral-950 border border-neutral-300 dark:border-white/10 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-[#c2a677] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-xs uppercase tracking-wider hover:bg-[#9a783e] dark:hover:bg-[#c2a677] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>{isKhmer ? "កំពុងផ្ញើសារ..." : "DISPATCHING MESSAGE..."}</span>
                    ) : (
                      <>
                        <span>{t("contact_send", "Send Message")}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Flagship Atelier & Location Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Atelier Card */}
            <div className="rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 p-7 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] font-semibold font-mono mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{isKhmer ? "ហាងចម្បង & ATELIER" : "FLAGSHIP ATELIER"}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-serif font-bold text-neutral-900 dark:text-white mb-4">
                {t("contact_boutique_title", "Phnom Penh Flagship & Atelier")}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9a783e] dark:text-[#c2a677] mt-0.5 flex-shrink-0" />
                  <span>
                    {t(
                      "contact_address",
                      "House 88, Street 214 (Samdach Pan Ave), Boeung Keng Kang, Phnom Penh, Cambodia"
                    )}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#9a783e] dark:text-[#c2a677] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-white">
                      {t("contact_hours", "Monday – Sunday: 9:00 AM – 9:00 PM")}
                    </div>
                    <div className="text-[11px] text-neutral-500">
                      {isKhmer ? "បើកបម្រើសេវាកម្មរាល់ថ្ងៃ ទាំងថ្ងៃបុណ្យទាន" : "Open 7 days a week, including public holidays"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#9a783e] dark:text-[#c2a677] mt-0.5 flex-shrink-0" />
                  <span>{t("contact_phone", "+855 12 888 999")}</span>
                </div>
              </div>

              {/* Styled Map Preview */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 relative h-48 group">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80"
                  alt="Phnom Penh Atelier Map Location"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-4">
                  <div className="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg mb-2">
                    <MapPin className="w-5 h-5 text-[#9a783e]" />
                  </div>
                  <span className="text-white text-xs font-bold uppercase tracking-wider">
                    Boeung Keng Kang • Phnom Penh
                  </span>
                  <a
                    href="https://maps.google.com/?q=Boeung+Keng+Kang+Phnom+Penh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 text-neutral-900 text-[11px] font-semibold hover:bg-white transition-colors"
                  >
                    <span>{isKhmer ? "បើកផែនទី Google Maps" : "Open in Google Maps"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* VIP Salon Amenities */}
              <div className="mt-6 pt-5 border-t border-neutral-200 dark:border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-white mb-2">
                  {isKhmer ? "សេវាកម្មពិសេសនៅហាង" : "Atelier Amenities"}
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
                    <span>{isKhmer ? "កាហ្វេ Espresso & តែផ្កាម្លិះ" : "Complimentary Espresso"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
                    <span>{isKhmer ? "បន្ទប់សាកអាវធំ VIP" : "Private Fitting Suites"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
                    <span>{isKhmer ? "ជាងកែទំហំផ្ទាល់ភ្លាមៗ" : "On-site Master Tailor"}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9a783e] dark:text-[#c2a677]" />
                    <span>{isKhmer ? "ចំណតរថយន្តធំទូលាយ" : "Valet Parking"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Instant Chat Callouts */}
            <div className="rounded-2xl p-6 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white border border-[#c2a677]/30 shadow-lg">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#c2a677] mb-2">
                {isKhmer ? "ត្រូវការការឆ្លើយតបបន្ទាន់?" : "Need An Immediate Stylist?"}
              </h4>
              <p className="text-xs text-neutral-300 font-light mb-4">
                {isKhmer
                  ? "ជជែកផ្ទាល់ជាមួយក្រុមការងារយើងខ្ញុំតាម Telegram ដើម្បីពិនិត្យស្តុក ឬកក់ទំហំទុកជាមុន។"
                  : "Connect directly with our senior styling team on Telegram for real-time stock checks and order holding."}
              </p>
              <a
                href="https://t.me/rithystore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0088cc] hover:bg-[#0077b5] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-md"
              >
                <TelegramIcon className="w-4 h-4" />
                <span>{t("contact_chat_telegram", "Chat on Telegram")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-16 md:py-20 bg-stone-100/70 dark:bg-neutral-900/40 border-t border-neutral-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#9a783e] dark:text-[#c2a677] font-semibold font-mono">
              {isKhmer ? "សំណួរដែលសួរញឹកញាប់" : "FREQUENTLY ASKED QUESTIONS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mt-1">
              {isKhmer ? "អ្វីដែលអតិថិជនតែងតែសួរយើង" : "Everything You Need to Know"}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:text-[#9a783e] dark:hover:text-[#c2a677] transition-colors"
                  >
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#9a783e] dark:text-[#c2a677] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed border-t border-neutral-100 dark:border-white/5 pt-3 animate-fadeIn">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

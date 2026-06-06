"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  Coffee, 
  Sparkles, 
  Heart, 
  Award, 
  MapPin, 
  Clock, 
  Phone, 
  ArrowDown, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import HeritageSection from "@/components/HeritageSection";
import FiligreeDivider from "@/components/FiligreeDivider";

// Symmetrical Ornate Corner SVG Component
const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const rotationClass = {
    "top-left": "",
    "top-right": "rotate-90",
    "bottom-left": "-rotate-90",
    "bottom-right": "rotate-180",
  }[position];
  
  return (
    <svg 
      className={`absolute w-8 h-8 text-[#d4af37]/65 pointer-events-none ${rotationClass} z-20`} 
      style={{
        top: position.startsWith("top") ? 0 : "auto",
        bottom: position.startsWith("bottom") ? 0 : "auto",
        left: position.endsWith("left") ? 0 : "auto",
        right: position.endsWith("right") ? 0 : "auto",
        margin: "-1px"
      }}
      viewBox="0 0 40 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 0 0 L 40 0 C 30 0, 25 5, 25 15 C 25 25, 15 25, 0 25 L 0 0 Z" fill="currentColor" opacity="0.08" />
      <path d="M 2 2 L 35 2 C 25 2, 20 7, 20 17 C 20 27, 12 27, 2 27" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M 6 6 L 25 6 C 18 6, 15 9, 15 16 C 15 23, 10 23, 6 23" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
};

// Ornate Architectural Pediment SVG
const OrnatePediment = () => {
  return (
    <svg 
      className="w-72 md:w-96 h-10 text-[#d4af37]/80 mx-auto mb-3" 
      viewBox="0 0 200 40" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="10" y1="32" x2="190" y2="32" stroke="currentColor" strokeWidth="1.25" />
      <path d="M 15 32 C 45 12, 80 8, 100 8 C 120 8, 155 12, 185 32" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 35 32 C 60 20, 80 16, 100 16 C 120 16, 140 20, 165 32" stroke="currentColor" strokeWidth="0.75" fill="none" />
      <path d="M 100 4 Q 95 14 100 24 Q 105 14 100 4 Z" fill="currentColor" />
      <circle cx="100" cy="1" r="1.5" fill="currentColor" />
      <circle cx="65" cy="24" r="1.2" fill="currentColor" />
      <circle cx="135" cy="24" r="1.2" fill="currentColor" />
      <circle cx="100" cy="28" r="1.8" fill="currentColor" />
    </svg>
  );
};

// Rotating Heritage Seal Badge Component
const HeritageSeal = () => {
  return (
    <div className="absolute right-8 top-24 z-30 hidden lg:block select-none pointer-events-none">
      <div className="relative w-36 h-36 flex items-center justify-center">
        {/* Rotating Circular Text SVG */}
        <motion.svg 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full text-[#d4af37]/60"
          viewBox="0 0 100 100"
        >
          <path id="sealCirclePath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
          <text className="font-sans text-[6px] uppercase tracking-[0.24em] font-bold fill-current">
            <textPath href="#sealCirclePath">
              Rim Cafe Philadelphia • Est. 1982 • Chocolate Hearth •
            </textPath>
          </text>
        </motion.svg>
        {/* Central pulsing gold logo circle */}
        <div className="absolute w-16 h-16 rounded-full border-2 border-[#d4af37]/35 flex items-center justify-center bg-[#120a06]/90 backdrop-blur-md shadow-2xl">
          <Coffee className="text-[#d4af37] w-6 h-6 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

interface MenuItem {
  name: string;
  price: string;
  description?: string;
  highlighted?: boolean;
}

const MENU_DATA: Record<string, MenuItem[]> = {
  espresso: [
    { name: "Espresso", price: "$3.50", description: "Pure classic old-world extraction, thick golden crema." },
    { name: "Blonde Cubano", price: "$5.00", description: "Espresso pulled directly over raw sugar for a sweet, caramelized snap." },
    { name: "Tony Luke «Espresso»", price: "$6.00", description: "Bold, intense, and full-bodied ristretto pull." },
    { name: "Cappuccino or Latte", price: "$6.50", description: "Silky steamed milk combined with our classic espresso roast." },
    { name: "Geno's Caramel Latté", price: "$12.00", description: "Artisanal latte drizzled with house-melted burnt sugar caramel.", highlighted: true },
    { name: "ButterCCino", price: "$10.00", description: "Our rich signature butter-infused double espresso latte." },
    { name: "Salty Caramel Latte", price: "$8.00", description: "Perfect balance of sweet caramel and gray sea salt." },
    { name: "Chocolate Latté", price: "$8.00", description: "Espresso combined with dark gourmet chocolate shavings." },
    { name: "Nutty Latté", price: "$9.00", description: "Roasted hazelnut and almond syrup with double shot espresso." },
    { name: "Mocha or Macchiato", price: "$9.00", description: "Indulgent milk foam and premium dark espresso." },
    { name: "Cold Brew", price: "$5.00", description: "Slow-steeped dark roast, served over ice." },
    { name: "Chai Latte", price: "$7.50", description: "Spiced black tea blend with microfoamed milk." }
  ],
  volcano: [
    { name: "The ORIGINAL Volcano", price: "$8.00", description: "Rim Cafe's crown jewel. Famous hot chocolate overflowing with melted gourmet chocolate rims.", highlighted: true },
    { name: "Salty Caramel or Ganache", price: "$9.00", description: "Original hot chocolate layered with salty caramel or thick chocolate ganache." },
    { name: "Dirty Espresso Volcano", price: "$9.00", description: "Our legendary hot chocolate spiked with a fresh shot of dark espresso." },
    { name: "Geno's WIZZ", price: "$12.00", description: "A local legend. Hot chocolate whisked with fresh mascarpone and ricotta cheese.", highlighted: true },
    { name: "Spicy Volcano", price: "$9.00", description: "Infused with chili powder, cinnamon, and cayenne for a warm hearth kick." },
    { name: "Nutty Peanut Butter", price: "$10.00", description: "Volcano hot chocolate swirled with creamy organic peanut butter." },
    { name: "Hot Chocolate with Gelato", price: "$12.00", description: "Warm chocolate poured directly over a scoop of homemade vanilla bean gelato." },
    { name: "Marshmallow Brulée", price: "$13.00", description: "Topped with fresh house marshmallows, torched to a golden caramel crust." },
    { name: "White Chocolate Volcano", price: "$10.00", description: "Creamy, rich white chocolate blend with shaved cocoa butter." },
    { name: "White Raspberry Volcano", price: "$11.00", description: "White chocolate base infused with fresh raspberry coulis." },
    { name: "Surprise Me", price: "$15.00", description: "Let Geno build a custom chocolate volcano creation just for you." }
  ],
  cannoli: [
    { name: "The Holy Cannoli", price: "$6.50", description: "Freshly filled homemade cannoli shell. Cream made with sweet mascarpone & ricotta cheese.", highlighted: true },
    { name: "Chocolate-Dipped Cannoli", price: "$7.50", description: "Our holy cannoli shell dipped in dark Belgian chocolate, then filled." },
    { name: "Homemade Fresh Gelato (1 Scoop)", price: "$6.00", description: "Freshly churned in-house. Ask for today's seasonal Italian flavors." },
    { name: "Extra Scoop", price: "$4.00", description: "Add another flavor of our fresh artisan gelato." },
    { name: "Hot Chocolate Gelato", price: "$12.00", description: "Specialty gelato churned with our secret hot chocolate recipe." },
    { name: "Gelato Milkshake", price: "$12.00", description: "Two scoops of fresh gelato blended with premium milk and chocolate sauce." }
  ],
  affogato: [
    { name: "Affogato Classic", price: "$7.00", description: "Double shot of hot espresso poured over a scoop of vanilla bean gelato." },
    { name: "Iced Affogato", price: "$7.00", description: "Chilled espresso over sweet cream gelato, served with a chocolate wafer." },
    { name: "Affogato Dark Chocolate", price: "$8.00", description: "Classic affogato drizzled with thick warm dark chocolate ganache.", highlighted: true },
    { name: "Affogato Peanut Butter", price: "$8.00", description: "Affogato with vanilla gelato, espresso, and warm peanut butter sauce." },
    { name: "Affogato Cannoli", price: "$10.00", description: "Espresso, gelato, crushed cannoli shells, and sweet mascarpone cream.", highlighted: true }
  ]
};

const CATEGORIES = [
  { id: "espresso", name: "Espresso", icon: Coffee },
  { id: "volcano", name: "Volcano Chocolate", icon: Sparkles },
  { id: "cannoli", name: "Cannoli & Gelato", icon: Heart },
  { id: "affogato", name: "Affogato", icon: Award }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("espresso");

  // Parallax Scroll Targets
  const craftSectionRef = useRef<HTMLDivElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: craftScrollProgress } = useScroll({
    target: craftSectionRef,
    offset: ["start end", "end start"]
  });
  const yCraftImage = useTransform(craftScrollProgress, [0, 1], [-45, 45]);

  const { scrollYProgress: menuScrollProgress } = useScroll({
    target: menuSectionRef,
    offset: ["start end", "end start"]
  });
  const yMenuShowcaseCard = useTransform(menuScrollProgress, [0, 1], [-25, 25]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-noise bg-drafting-grid text-[#f5ebe0] overflow-x-hidden bg-transparent">
      {/* Heritage rotating seal badge */}
      <HeritageSeal />

      {/* Floating Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#120a06]/90 backdrop-blur-md border-b border-[#c59b27]/25 px-6 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => handleScroll("hero")} 
            className="font-serif text-2xl font-bold tracking-[0.25em] text-[#faf6f0] hover:text-[#d4af37] transition duration-300 flex items-center gap-2"
          >
            <Coffee className="text-[#d4af37] w-5 h-5" />
            RIM CAFE
          </button>
          
          <nav className="hidden md:flex space-x-8 text-sm font-sans tracking-widest text-stone-200 uppercase font-semibold">
            <button onClick={() => handleScroll("craft")} className="hover:text-[#d4af37] transition duration-300">The Craft</button>
            <button onClick={() => handleScroll("legacy")} className="hover:text-[#d4af37] transition duration-300">The Legacy</button>
            <button onClick={() => handleScroll("menu-explorer")} className="hover:text-[#d4af37] transition duration-300">The Menu</button>
            <button onClick={() => handleScroll("atelier")} className="hover:text-[#d4af37] transition duration-300">The Atelier</button>
          </nav>

          <div>
            <button 
              onClick={() => handleScroll("atelier")}
              className="px-5 py-2.5 text-xs font-sans tracking-widest uppercase border-2 border-[#7a0f12] bg-[#7a0f12]/20 hover:bg-[#7a0f12] hover:text-[#faf6f0] text-[#f5ebe0] transition duration-500 rounded-sm font-bold shadow-lg"
            >
              Visit Atelier
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col justify-center items-center px-4 overflow-hidden bg-transparent">
        {/* Background Storefront Image with Premium Mesh */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/storefront_dusk.png"
            alt="Rim Cafe Storefront at Dusk"
            fill
            className="object-cover opacity-40 mix-blend-luminosity brightness-[0.6] contrast-125"
            priority
          />
          {/* Subtle gradient transition that lets body multi-color glows show through */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#120a06]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#120a06]/45 via-transparent to-transparent" />
        </div>

        {/* Hero Content framed with a detailed Readability Plate */}
        <div className="relative z-10 max-w-4xl text-center flex flex-col items-center">
          <HeritageSection delay={0.1}>
            <div className="readability-plate px-8 py-10 md:px-14 md:py-12 rounded-sm shadow-2xl relative border-2 border-[#c59b27]/30 max-w-2xl mx-auto box-glow-amber">
              {/* Ornate corner details */}
              <CornerOrnament position="top-left" />
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-left" />
              <CornerOrnament position="bottom-right" />
              
              <p className="font-serif italic text-lg sm:text-2xl text-[#d4af37] tracking-wide mb-4 text-glow-gold">
                {"\"From French Riviera to South Philly\""}
              </p>
              
              {/* Intricate Architectural Pediment */}
              <OrnatePediment />

              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.25em] text-[#faf6f0] mb-6 leading-tight">
                RIM CAFE
              </h1>

              <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto mb-6" />

              <p className="text-[#f5ebe0] font-sans text-sm sm:text-base md:text-lg tracking-wider leading-relaxed mb-8 font-medium">
                {"Est. 1982. Legendary Espresso, Cannoli, and Hot Chocolate in the heart of Philadelphia's historic Italian Market."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleScroll("craft")}
                  className="group px-7 py-3.5 bg-[#7a0f12] hover:bg-[#8b1418] text-[#faf6f0] border border-[#7a0f12] text-xs font-sans tracking-[0.2em] uppercase transition duration-500 rounded-sm box-glow-crimson flex items-center justify-center gap-2 font-bold"
                >
                  Explore the Craft
                  <ChevronRight size={14} className="transform group-hover:translate-x-1 transition duration-300" />
                </button>
                <button 
                  onClick={() => handleScroll("menu-explorer")}
                  className="px-7 py-3.5 bg-transparent hover:bg-[#faf6f0]/5 text-[#faf6f0] border-2 border-[#c59b27]/50 hover:border-[#d4af37]/80 text-xs font-sans tracking-[0.2em] uppercase transition duration-500 rounded-sm font-bold"
                >
                  View Menu
                </button>
              </div>
            </div>
          </HeritageSection>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-8 z-10 flex flex-col items-center">
          <button 
            onClick={() => handleScroll("craft")}
            className="flex flex-col items-center gap-2 text-stone-300 hover:text-[#d4af37] transition duration-300 group"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Scroll Down</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown size={16} className="text-[#d4af37]" />
            </motion.div>
          </button>
        </div>
      </section>

      {/* Decorative filigree divider line */}
      <FiligreeDivider />

      {/* Section B: The Craft (Signature Feature) */}
      <section id="craft" ref={craftSectionRef} className="py-24 px-6 md:px-12 bg-brick-overlay relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Crema Espresso Image inside Roman Cathedral Arch with Scroll Parallax */}
          <div className="lg:col-span-5 relative">
            <HeritageSection>
              <motion.div style={{ y: yCraftImage }} className="relative h-[390px] sm:h-[490px] w-full max-w-md mx-auto group">
                {/* Glowing gold arch backdrop */}
                <div className="absolute -inset-2 rounded-t-full bg-gradient-to-b from-[#d4af37] to-[#7a0f12] opacity-25 blur-md group-hover:opacity-40 transition duration-700" />
                {/* Roman Arch Gold Frame */}
                <div className="relative h-full w-full roman-arch-frame border-[3px] border-[#c59b27] bg-[#120a06] p-1.5 shadow-2xl">
                  <div className="relative h-full w-full roman-arch-frame overflow-hidden">
                    <Image
                      src="/images/espresso_crema.png"
                      alt="Steaming Espresso Crema"
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
              </motion.div>
            </HeritageSection>
          </div>

          {/* Right Column: Menu Highlight Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <HeritageSection delay={0.2}>
              <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37] mb-2 block font-bold">
                The Masterful Extraction
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-[#faf6f0] mb-6 leading-tight">
                ROASTED, PULLED, & POURED
              </h2>
              <p className="text-[#f5ebe0] font-sans text-sm sm:text-base tracking-wide leading-relaxed mb-8 font-medium">
                Every cup is a masterpiece of precision and passion. We fuse classic Italian roasting traditions with artisan chocolate tempering, creating an experience where velvety milk foam, deep espresso, and premium melted chocolate come together in a warm, comforting harmony.
              </p>
            </HeritageSection>

            {/* Highlights Grid with Readability backing plates */}
            <HeritageSection delay={0.4}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-5 border-l-2 border-[#7a0f12] bg-[#120a06]/85 border border-stone-800/40 rounded-r-md relative shadow-md cursor-pointer transition duration-300"
                >
                  <CornerOrnament position="top-right" />
                  <h3 className="font-serif italic text-lg text-[#d4af37] font-semibold">Volcano Chocolate</h3>
                  <p className="text-xs text-stone-200 mt-2 font-medium">Our trademark molten chocolate poured down the glass rim.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-5 border-l-2 border-[#c59b27] bg-[#120a06]/85 border border-stone-800/40 rounded-r-md relative shadow-md cursor-pointer transition duration-300"
                >
                  <CornerOrnament position="top-right" />
                  <h3 className="font-serif italic text-lg text-[#d4af37] font-semibold">Holy Cannoli</h3>
                  <p className="text-xs text-stone-200 mt-2 font-medium">Homemade cream whisked with mascarpone and ricotta cheese.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="p-5 border-l-2 border-[#7a0f12] bg-[#120a06]/85 border border-stone-800/40 rounded-r-md relative shadow-md cursor-pointer transition duration-300"
                >
                  <CornerOrnament position="top-right" />
                  <h3 className="font-serif italic text-lg text-[#d4af37] font-semibold">Espresso Cubano</h3>
                  <p className="text-xs text-stone-200 mt-2 font-medium">Robust extraction pulled directly over raw caramelized sugar.</p>
                </motion.div>
              </div>
            </HeritageSection>

            <HeritageSection delay={0.5}>
              <button 
                onClick={() => handleScroll("menu-explorer")}
                className="px-6 py-3 border-2 border-[#c59b27]/60 hover:border-[#d4af37] text-xs font-sans tracking-widest text-[#d4af37] hover:text-[#faf6f0] uppercase bg-transparent hover:bg-[#c59b27]/10 transition duration-300 rounded-sm inline-flex items-center gap-2 self-start font-bold shadow-md"
              >
                Explore Full Menu Explorer
                <ChevronRight size={14} />
              </button>
            </HeritageSection>
          </div>
        </div>
      </section>

      {/* Symmetrical filigree divider line */}
      <FiligreeDivider />

      {/* Section C: The Legacy Story */}
      <section id="legacy" className="py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-5 z-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <HeritageSection className="text-center mb-16">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37] mb-2 block font-bold">
              Italian Market Heritage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-[#faf6f0]">
              THE HEARTH & LEGACY
            </h2>
            <div className="h-[1px] w-32 bg-[#c59b27]/40 mx-auto mt-4" />
          </HeritageSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <HeritageSection delay={0.2} className="space-y-6">
              <p className="font-sans text-[#f5ebe0] text-sm sm:text-base leading-relaxed tracking-wide font-medium">
                <span className="font-serif text-4xl sm:text-5xl float-left mr-3 mt-1 text-[#7a0f12] font-bold">F</span>
                {"ounded in 1982, Rim Cafe represents the raw grit, heart, and pride of Philadelphia's historic Italian Market. Under the vision of master chocolatier Geno Geary, the cafe has grown from a local coffee counter into a legendary chocolate hearth celebrated by culinary enthusiasts across the country."}
              </p>
              <p className="font-sans text-[#f5ebe0] text-sm sm:text-base leading-relaxed tracking-wide font-medium">
                {"Every visit is not just a cup of espresso; it's a sensory performance. Geno is famous for crafting each \"Volcano\" hot chocolate with hands-on artistry—shaving premium dark chocolate blocks right before your eyes and caramelizing sugar with fire, setting a warm dusk glow over the cozy storefront."}
              </p>
            </HeritageSection>

            {/* Pull Quote Framed with corner accents and high contrast text */}
            <HeritageSection delay={0.4}>
              <div className="border border-[#c59b27]/30 p-8 md:p-10 bg-[#1a0f0a]/90 rounded-sm relative box-glow-amber">
                {/* Vintage Corner Ornaments */}
                <CornerOrnament position="top-left" />
                <CornerOrnament position="top-right" />
                <CornerOrnament position="bottom-left" />
                <CornerOrnament position="bottom-right" />
                
                <div className="absolute top-4 left-4 text-7xl font-serif text-[#7a0f12]/15 select-none font-bold">{"“"}</div>
                <blockquote className="relative z-10 font-serif italic text-lg sm:text-2xl text-[#faf6f0] leading-relaxed mb-6 font-semibold text-glow-gold">
                  {"\"I don't just pull espresso. I build a volcano of chocolate for you. Coffee is a sacred ceremony, a historic ritual of warmth and connection. That's what we keep alive here on 9th Street.\""}
                </blockquote>
                <cite className="block text-xs font-sans tracking-[0.2em] text-[#d4af37] uppercase not-italic font-bold">
                  — GENO GEARY, Master Chocolatier & Founder
                </cite>
              </div>
            </HeritageSection>
          </div>
        </div>
      </section>

      {/* Symmetrical filigree divider line */}
      <FiligreeDivider />

      {/* Section D: The Full Interactive Menu Explorer */}
      <section id="menu-explorer" ref={menuSectionRef} className="py-24 px-6 md:px-12 bg-brick-overlay relative">
        <div className="max-w-6xl mx-auto">
          
          <HeritageSection className="text-center mb-12">
            <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37] mb-2 block font-bold">
              Curated Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-[#faf6f0] mb-4">
              THE TALE OF THE MENU
            </h2>
            <p className="max-w-lg mx-auto font-sans text-xs sm:text-sm text-stone-200 tracking-wider font-semibold">
              Browse through our legendary specialties. Select a category below to explore.
            </p>
          </HeritageSection>

          {/* Interactive Categories Tabs */}
          <HeritageSection delay={0.2} className="flex justify-center flex-wrap gap-3 mb-16">
            {CATEGORIES.map((cat) => {
              const IconComponent = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3.5 border-2 text-xs font-sans tracking-widest uppercase transition-all duration-300 rounded-sm font-bold ${
                    isActive 
                      ? "bg-[#7a0f12] border-[#7a0f12] text-[#faf6f0] box-glow-crimson" 
                      : "bg-[#120a06]/90 border-[#c59b27]/30 text-stone-200 hover:border-[#d4af37] hover:text-[#d4af37]"
                  }`}
                >
                  <IconComponent size={14} className="text-[#d4af37]" />
                  {cat.name}
                </button>
              );
            })}
          </HeritageSection>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left/Main list of items */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="space-y-6"
                >
                  {MENU_DATA[activeCategory].map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-5 border border-stone-800/40 rounded-sm bg-[#120a06]/80 hover:bg-[#1a0f0a]/90 hover:border-[#c59b27]/40 transition duration-300 shadow-md ${
                        item.highlighted ? "border-l-4 border-l-[#7a0f12] bg-[#1a0f0a]/80" : ""
                      }`}
                    >
                      <div className="flex justify-between items-baseline gap-4 mb-2">
                        <h4 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-[#faf6f0] flex items-center gap-2">
                          {item.name}
                          {item.highlighted && (
                            <span className="text-[10px] font-sans font-bold bg-[#7a0f12] text-[#faf6f0] px-2.5 py-1 rounded-sm uppercase tracking-widest">
                              Signature
                            </span>
                          )}
                        </h4>
                        <span className="font-serif text-base sm:text-lg font-bold text-[#d4af37]">
                          {item.price}
                        </span>
                      </div>
                      {item.description && (
                        <p className="font-sans text-xs sm:text-sm text-stone-200 leading-relaxed tracking-wider font-semibold">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right details frame styled inside a Roman Arch frame with scroll parallax */}
            <HeritageSection delay={0.3} className="sticky top-28">
              <motion.div 
                style={{ y: yMenuShowcaseCard }}
                className="border border-[#c59b27]/30 bg-[#120a06]/95 p-8 rounded-sm text-center shadow-xl box-glow-amber relative"
              >
                {/* Architectural Corner Ornaments */}
                <CornerOrnament position="top-left" />
                <CornerOrnament position="top-right" />
                <CornerOrnament position="bottom-left" />
                <CornerOrnament position="bottom-right" />

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#faf6f0] mb-2 tracking-wider">
                  {activeCategory === "espresso" && "ROASTED ESPRESSO"}
                  {activeCategory === "volcano" && "VOLCANO CHOCOLATE"}
                  {activeCategory === "cannoli" && "ARTISAN CANNOLI & GELATO"}
                  {activeCategory === "affogato" && "AFFOGATO CLASSICS"}
                </h3>
                <p className="font-sans text-xs text-[#d4af37] tracking-widest uppercase mb-6 font-bold">
                  Handcrafted on order in South Philly
                </p>

                {/* Roman Arch Frame for Menu Showcase */}
                <div className="relative h-[250px] w-full rounded-t-full overflow-hidden mb-6 border-2 border-[#c59b27] bg-[#1a0f0a] shadow-inner">
                  <Image
                    src={activeCategory === "cannoli" ? "/images/cannoli_hearth.png" : "/images/espresso_crema.png"}
                    alt="Menu detail showcase"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                  />
                </div>

                <p className="font-serif italic text-[#f5ebe0] text-sm sm:text-base leading-relaxed mb-6 font-medium">
                  {activeCategory === "espresso" && "Our premium espresso beans are carefully selected, custom roasted, and ground per pull to extract maximum flavor and dense caramel crema."}
                  {activeCategory === "volcano" && "Made by layering thick molten Belgian chocolate ganache on the cup margins before blending in steaming microfoamed chocolate cocoa. A true volcano."}
                  {activeCategory === "cannoli" && "Filled on demand with sweet mascarpone and cream cheese filling to ensure the homemade pastry shell stays perfectly crisp and delicious."}
                  {activeCategory === "affogato" && "A cold, velvety scoop of fresh homemade gelato drowned in a hot shot of double espresso. The perfect marriage of temperature and texture."}
                </p>

                <div className="h-[1px] bg-gradient-to-r from-transparent via-[#c59b27]/30 to-transparent my-6" />
                <span className="font-sans text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-bold">
                  Est. 1982 • Rim Cafe Philadelphia
                </span>
              </motion.div>
            </HeritageSection>

          </div>

        </div>
      </section>

      {/* Symmetrical filigree divider line */}
      <FiligreeDivider />

      {/* Section E: The Atelier (Location & Legacy) */}
      <section id="atelier" className="py-24 px-6 md:px-12 bg-transparent relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Address, Hours & Contact Details */}
            <div className="lg:col-span-6 space-y-8">
              <HeritageSection>
                <span className="text-xs font-sans tracking-[0.3em] uppercase text-[#d4af37] mb-2 block font-bold">
                  Find the Hearth
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wider text-[#faf6f0]">
                  VISIT THE ATELIER
                </h2>
                <div className="h-[1px] w-24 bg-[#7a0f12] mt-4" />
              </HeritageSection>

              <HeritageSection delay={0.2} className="space-y-6">
                
                {/* Location item */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#7a0f12]/15 border border-[#7a0f12]/30 rounded-sm text-[#d4af37] shadow-sm">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#faf6f0] mb-1">Our Location</h4>
                    <p className="font-sans text-stone-200 text-sm sm:text-base tracking-wide leading-relaxed font-semibold">
                      1172 S 9th St, Philadelphia, PA 19147<br />
                      <span className="text-[#d4af37]">{"In the heart of South Philly's Historic Italian Market"}</span>
                    </p>
                  </div>
                </div>

                {/* Hours item */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#7a0f12]/15 border border-[#7a0f12]/30 rounded-sm text-[#d4af37] shadow-sm">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#faf6f0] mb-1">Hearth Hours</h4>
                    <p className="font-sans text-stone-200 text-sm sm:text-base tracking-wide leading-relaxed font-semibold">
                      Mon – Thu: 12:00 PM – 10:00 PM<br />
                      Fri – Sat: 12:00 PM – 11:00 PM<br />
                      Sunday: 12:00 PM – 10:00 PM
                    </p>
                  </div>
                </div>

                {/* Contact item */}
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-[#7a0f12]/15 border border-[#7a0f12]/30 rounded-sm text-[#d4af37] shadow-sm">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#faf6f0] mb-1">Get in Touch</h4>
                    <p className="font-sans text-stone-200 text-sm sm:text-base tracking-wide leading-relaxed font-semibold">
                      Call Geno: <span className="text-[#d4af37]">(215) 627-2432</span><br />
                      Email: ciao@rimcafe.com
                    </p>
                  </div>
                </div>

              </HeritageSection>

              <HeritageSection delay={0.4}>
                <a 
                  href="https://maps.google.com/?q=Rim+Cafe+Philadelphia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-4 bg-[#7a0f12] hover:bg-[#8b1418] border border-[#7a0f12] text-[#faf6f0] text-xs font-sans tracking-[0.2em] uppercase transition duration-500 rounded-sm inline-flex items-center gap-2 box-glow-crimson font-bold shadow-md"
                >
                  Get Directions
                  <ExternalLink size={14} />
                </a>
              </HeritageSection>
            </div>

            {/* Stylized Premium Map Block with Corner ornaments and high-contrast labels */}
            <div className="lg:col-span-6">
              <HeritageSection delay={0.3}>
                <div className="relative border border-[#c59b27]/30 p-8 bg-[#1a0f0a]/80 rounded-sm box-glow-amber shadow-2xl">
                  {/* Architectural corner elements */}
                  <CornerOrnament position="top-left" />
                  <CornerOrnament position="top-right" />
                  <CornerOrnament position="bottom-left" />
                  <CornerOrnament position="bottom-right" />

                  {/* Stylized Map Canvas */}
                  <div className="relative h-[300px] w-full bg-[#120a06] rounded-sm overflow-hidden border border-stone-800/80 flex flex-col justify-center items-center text-center p-6">
                    {/* Grid line effect */}
                    <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
                    
                    {/* Stylized Tricolor details */}
                    <div className="absolute top-4 right-4 flex gap-1">
                      <div className="w-2.5 h-7 bg-[#1d4b27]" />
                      <div className="w-2.5 h-7 bg-[#f5ebe0]" />
                      <div className="w-2.5 h-7 bg-[#8b1418]" />
                    </div>

                    {/* Vintage map elements */}
                    <span className="font-serif italic text-xs text-[#d4af37] mb-2 tracking-widest font-semibold">Historic Italian Market</span>
                    <h3 className="font-serif text-2xl font-bold tracking-widest text-[#faf6f0] mb-4">9th & FEDERAL</h3>
                    
                    <div className="w-16 h-[1px] bg-[#c59b27]/30 mb-4" />
                    
                    <p className="font-sans text-xs text-stone-200 max-w-xs leading-relaxed tracking-wider mb-6 font-semibold">
                      {"Surrounded by Philly heritage, just blocks from the legendary Geno's and Pat's Cheesesteaks, serving Italian Market coffee rituals daily."}
                    </p>
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-8 h-8 rounded-full bg-[#7a0f12]/30 animate-ping" />
                      <div className="relative p-3.5 bg-[#7a0f12] border border-[#d4af37]/45 rounded-full text-[#faf6f0] shadow-lg">
                        <Coffee size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Map footer details */}
                  <div className="flex justify-between items-center mt-4 text-[10px] font-sans text-stone-300 tracking-wider font-semibold">
                    <span>LAT: 39.9362° N</span>
                    <span>LONG: 75.1583° W</span>
                  </div>

                </div>
              </HeritageSection>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-transparent border-t border-[#c59b27]/15 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl font-bold tracking-widest text-[#faf6f0] mb-1">RIM CAFE</h3>
            <p className="font-sans text-[11px] text-stone-400 tracking-widest uppercase font-bold">From French Riviera to South Philly • Est. 1982</p>
          </div>

          <div className="flex gap-6 text-stone-300 text-xs font-sans tracking-widest uppercase font-bold">
            <button onClick={() => handleScroll("craft")} className="hover:text-[#d4af37] transition duration-300">Craft</button>
            <button onClick={() => handleScroll("legacy")} className="hover:text-[#d4af37] transition duration-300">Legacy</button>
            <button onClick={() => handleScroll("menu-explorer")} className="hover:text-[#d4af37] transition duration-300">Menu</button>
            <button onClick={() => handleScroll("atelier")} className="hover:text-[#d4af37] transition duration-300">Atelier</button>
          </div>

          <div className="text-center md:text-right text-stone-400 text-[10px] tracking-wider leading-relaxed font-semibold">
            <p>© {new Date().getFullYear()} Rim Cafe Philadelphia. All Rights Reserved.</p>
            <p className="mt-1">Crafted for coffee & chocolate ceremonies.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

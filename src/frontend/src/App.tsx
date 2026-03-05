import {
  Camera,
  ChevronDown,
  Clock,
  Laptop,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Printer,
  Settings,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

/* ── Typing animation hook ── */
function useTypingEffect(text: string, speed = 60, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed("");
    setDone(false);
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

/* ── Smooth-scroll helper ── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ── Nav links definition ── */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
  { label: "Contact", id: "contact" },
];

/* ── Services data ── */
const SERVICES = [
  {
    icon: Laptop,
    title: "Laptop Repair",
    desc: "Screen replacements, keyboard fixes, motherboard repairs, battery replacements, and complete laptop servicing for all brands.",
    color: "from-blue-500/20 to-cyan-500/10",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.72_0.18_220/0.3)]",
    iconColor: "text-cyan-400",
  },
  {
    icon: Monitor,
    title: "Desktop Repair",
    desc: "Hardware upgrades, PSU replacements, RAM and GPU servicing, custom PC builds, and complete desktop system diagnostics.",
    color: "from-purple-500/20 to-blue-500/10",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.55_0.24_290/0.3)]",
    iconColor: "text-purple-400",
  },
  {
    icon: Settings,
    title: "OS Installation",
    desc: "Windows 10/11, Linux, macOS setup, driver installation, software configuration, data migration and system optimization.",
    color: "from-indigo-500/20 to-purple-500/10",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.58_0.22_260/0.3)]",
    iconColor: "text-indigo-400",
  },
  {
    icon: Camera,
    title: "CCTV Installation",
    desc: "IP camera setup, DVR/NVR configuration, remote access monitoring, 24/7 surveillance systems for homes and businesses.",
    color: "from-violet-500/20 to-indigo-500/10",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.60_0.25_300/0.3)]",
    iconColor: "text-violet-400",
  },
  {
    icon: Printer,
    title: "Printer Service",
    desc: "Inkjet & laser printer repair, cartridge replacement, print head cleaning, driver installation and all brand printer maintenance.",
    color: "from-teal-500/20 to-cyan-500/10",
    glow: "group-hover:shadow-[0_0_30px_oklch(0.75_0.15_185/0.3)]",
    iconColor: "text-teal-400",
  },
];

/* ── Stats ── */
const STATS = [
  { value: "5000+", label: "Devices Repaired", icon: Zap },
  { value: "8+", label: "Years Experience", icon: Shield },
  { value: "24hr", label: "Quick Turnaround", icon: Clock },
];

/* ═══════════════════════════════════════════════
   Header
════════════════════════════════════════════════ */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback((id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.10_0.025_265/0.95)] backdrop-blur-xl border-b border-[oklch(0.25_0.05_265/0.6)] shadow-[0_4px_30px_oklch(0.10_0.025_265/0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => handleNav("home")}
            className="flex flex-row items-center gap-3 group focus:outline-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            data-ocid="header.link"
            aria-label="Pranitha Computers — Go to home"
          >
            <img
              src="/assets/uploads/Logo-Pranitha-1-1.png"
              alt="Pranitha Computers"
              className="h-10 md:h-12 w-10 md:w-12 object-cover rounded-full"
              style={{
                filter: "drop-shadow(0 2px 8px oklch(0.55 0.24 290 / 0.35))",
              }}
            />
            <span
              className="font-display font-bold text-base md:text-lg leading-tight tracking-tight"
              style={{
                background:
                  "linear-gradient(90deg, oklch(0.72 0.18 220), oklch(0.75 0.20 290))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
              }}
            >
              Pranitha Computers
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                data-ocid="header.link"
                onClick={() => handleNav(link.id)}
                className="relative px-4 py-2 text-sm font-medium text-[oklch(0.80_0.04_250)] hover:text-white transition-colors duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.18_220)] rounded-md"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-[oklch(0.72_0.18_220)] to-[oklch(0.55_0.24_290)] rounded-full transition-all duration-300 group-hover:w-4/5" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNav("contact")}
              className="ml-4 px-5 py-2 rounded-lg bg-btn-primary text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.18_220)]"
            >
              Get Help
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            data-ocid="header.button"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-[oklch(0.80_0.04_250)] hover:text-white hover:bg-[oklch(0.18_0.04_265)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.18_220)]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[oklch(0.10_0.025_265/0.97)] backdrop-blur-xl border-b border-[oklch(0.25_0.05_265/0.5)]"
          >
            <nav className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  data-ocid="header.link"
                  onClick={() => handleNav(link.id)}
                  className="w-full text-left px-4 py-3 rounded-lg text-[oklch(0.80_0.04_250)] hover:text-white hover:bg-[oklch(0.18_0.04_265)] transition-colors font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.18_220)]"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handleNav("contact")}
                className="mt-2 w-full py-3 rounded-lg bg-btn-primary text-white font-semibold shadow-glow-sm transition-all duration-300 focus:outline-none"
              >
                Get Help Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════════════════════════════
   Hero Section
════════════════════════════════════════════════ */
function HeroSection() {
  const line1 = useTypingEffect("Welcome to", 70, 300);
  const [startLine2, setStartLine2] = useState(false);
  useEffect(() => {
    if (line1.done) setStartLine2(true);
  }, [line1.done]);
  const line2 = useTypingEffect(
    "Pranitha Computers",
    70,
    startLine2 ? 80 : 999999,
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/hero-bg.dim_1600x800.jpg')",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.03_265/0.85)] via-[oklch(0.10_0.04_275/0.75)] to-[oklch(0.08_0.03_265/0.95)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.04_255/0.6)] via-transparent to-[oklch(0.10_0.05_285/0.4)]" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[oklch(0.55_0.24_290/0.12)] blur-[80px] animate-pulse-glow pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[oklch(0.68_0.20_225/0.1)] blur-[100px] animate-pulse-glow pointer-events-none"
        style={{ animationDelay: "1.2s" }}
      />

      {/* Grid overlay pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.18 220 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.18 220 / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title with typing effect */}
        <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6 min-h-[1.9em]">
          <span className="block text-white">
            {line1.displayed}
            {!line1.done && (
              <span className="inline-block w-[3px] h-[0.85em] bg-white align-middle ml-1 animate-[blink_0.8s_step-end_infinite]" />
            )}
          </span>
          <span className="block text-gradient">
            {line2.displayed}
            {line1.done && !line2.done && (
              <span className="inline-block w-[3px] h-[0.85em] bg-[oklch(0.72_0.18_220)] align-middle ml-1 animate-[blink_0.8s_step-end_infinite]" />
            )}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: line2.done ? 1 : 0, y: line2.done ? 0 : 20 }}
          transition={{ duration: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-[oklch(0.75_0.04_255)] max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          Expert computer repair and laptop service solutions.
          <span className="block text-[oklch(0.65_0.04_255)] text-base sm:text-lg mt-1">
            Fast · Reliable · Affordable
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: line2.done ? 1 : 0, y: line2.done ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            type="button"
            data-ocid="hero.primary_button"
            onClick={() => scrollTo("about")}
            className="group px-8 py-4 rounded-xl bg-btn-primary text-white font-bold text-lg shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 min-w-[180px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.18_220)]"
          >
            About Us
          </button>
          <button
            type="button"
            data-ocid="hero.secondary_button"
            onClick={() => scrollTo("contact")}
            className="group px-8 py-4 rounded-xl border-2 border-[oklch(0.55_0.24_290/0.7)] bg-[oklch(0.55_0.24_290/0.1)] text-white font-bold text-lg hover:bg-[oklch(0.55_0.24_290/0.2)] hover:border-[oklch(0.55_0.24_290)] hover:shadow-[0_0_30px_oklch(0.55_0.24_290/0.3)] transition-all duration-300 hover:scale-105 active:scale-95 min-w-[180px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.24_290)]"
          >
            Contact Us
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={() => scrollTo("services")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[oklch(0.55_0.04_255)] hover:text-[oklch(0.72_0.18_220)] transition-colors cursor-pointer focus:outline-none"
          aria-label="Scroll to services"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Services Section
════════════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-section-alt overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.24_290/0.5)] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[oklch(0.55_0.24_290/0.04)] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[oklch(0.72_0.18_220)] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            What We Do
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-[oklch(0.65_0.04_255)] text-lg max-w-xl mx-auto">
            Comprehensive technology solutions for every device and every need.
          </p>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            const ocidIndex = (i + 1) as 1 | 2 | 3 | 4 | 5;
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                data-ocid={`services.card.${ocidIndex}`}
                className="group relative rounded-2xl border border-[oklch(0.25_0.05_265)] bg-card-gradient p-6 card-hover cursor-default overflow-hidden"
              >
                {/* Inner glow gradient */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${svc.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon circle */}
                  <div className="mb-5 w-14 h-14 rounded-xl bg-[oklch(0.18_0.04_265)] border border-[oklch(0.28_0.06_265)] flex items-center justify-center group-hover:border-[oklch(0.40_0.10_265/0.6)] transition-colors duration-300">
                    <Icon className={`w-7 h-7 ${svc.iconColor}`} />
                  </div>

                  <h3 className="font-display font-bold text-xl text-white mb-3">
                    {svc.title}
                  </h3>
                  <p className="text-[oklch(0.62_0.04_255)] text-sm leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[oklch(0.55_0.24_290/0.08)] to-transparent rounded-2xl pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-4 px-6 py-5 rounded-2xl border border-[oklch(0.25_0.05_265)] bg-[oklch(0.14_0.03_260/0.5)] backdrop-blur-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-btn-primary/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-[oklch(0.82_0.14_220)]" />
                </div>
                <div>
                  <div className="font-display font-black text-2xl text-white leading-none mb-0.5">
                    {stat.value}
                  </div>
                  <div className="text-[oklch(0.62_0.04_255)] text-sm">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.40_0.10_260/0.3)] to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   About Section
════════════════════════════════════════════════ */
function AboutSection() {
  const highlights = [
    { icon: Laptop, label: "Laptop Repair", desc: "All brands, all models" },
    { icon: Settings, label: "Software Support", desc: "Drivers, OS, updates" },
    { icon: Camera, label: "CCTV Security", desc: "Installation & setup" },
    { icon: Shield, label: "Data Recovery", desc: "Safe & confidential" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[oklch(0.68_0.20_225/0.05)] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[oklch(0.55_0.24_290/0.05)] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[oklch(0.72_0.18_220)] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Who We Are
            </span>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
              About <span className="text-gradient">Us</span>
            </h2>
            <p className="text-[oklch(0.75_0.04_255)] text-lg leading-relaxed mb-6">
              <strong className="text-white font-semibold">
                Pranitha Computers
              </strong>{" "}
              is a trusted IT service provider in Trichy, delivering
              professional laptop repair, software support, OS installation, and
              CCTV security setup.
            </p>
            <p className="text-[oklch(0.65_0.04_255)] leading-relaxed mb-8">
              With over 8 years of hands-on experience, our team of certified
              technicians is committed to fast, reliable, and affordable
              technology solutions for both homes and businesses. We diagnose
              correctly the first time — saving you time and money.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {[
                "Certified Technicians",
                "Same-Day Service",
                "Warranty on Repairs",
                "Free Diagnosis",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium border border-[oklch(0.72_0.18_220/0.35)] bg-[oklch(0.72_0.18_220/0.08)] text-[oklch(0.82_0.12_220)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — highlights grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-5"
          >
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group p-5 rounded-2xl border border-[oklch(0.25_0.05_265)] bg-card-gradient hover:border-[oklch(0.55_0.24_290/0.5)] transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-11 h-11 rounded-lg bg-btn-secondary/20 flex items-center justify-center mb-4 group-hover:bg-btn-secondary/30 transition-colors">
                    <Icon className="w-6 h-6 text-[oklch(0.72_0.20_295)]" />
                  </div>
                  <div className="font-display font-bold text-white text-sm mb-1">
                    {item.label}
                  </div>
                  <div className="text-[oklch(0.60_0.04_255)] text-xs">
                    {item.desc}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Contact Section
════════════════════════════════════════════════ */
function ContactSection() {
  const contactItems = [
    {
      icon: Phone,
      label: "Phone",
      value: "+91 90806 74848",
      sub: "Mon–Sun, 9AM–10PM (All Days Open)",
      href: "tel:+919080674848",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30 hover:border-cyan-400/60",
    },
    {
      icon: Mail,
      label: "Email",
      value: "pranithacomputer@gmail.com",
      sub: "We reply within 24 hours",
      href: "mailto:pranithacomputer@gmail.com",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30 hover:border-purple-400/60",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "1/286/H, Vayalur Road, Near UCO Bank",
      sub: "Somarasampettai, Trichy – 620 102",
      href: "https://maps.google.com/?q=Somarasampettai,Trichy,TamilNadu",
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/30 hover:border-violet-400/60",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-section-alt overflow-hidden"
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.24_290/0.5)] to-transparent" />

      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[oklch(0.55_0.24_290/0.03)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-[oklch(0.72_0.18_220)] text-sm font-semibold tracking-[0.2em] uppercase mb-3">
            Get In Touch
          </span>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-[oklch(0.65_0.04_255)] text-lg max-w-md mx-auto">
            Reach out for a quick diagnosis, repair quote, or any IT query.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div
          data-ocid="contact.card"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`group flex flex-col items-center text-center p-8 rounded-2xl border ${item.border} bg-card-gradient transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.72_0.18_220)]`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl ${item.bg} border border-current ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 opacity-80 group-hover:opacity-100`}
                >
                  <Icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <div className="text-[oklch(0.60_0.04_255)] text-xs font-semibold tracking-widest uppercase mb-2">
                  {item.label}
                </div>
                <div className="font-display font-bold text-white text-base leading-snug mb-1 break-all">
                  {item.value}
                </div>
                <div className="text-[oklch(0.55_0.04_255)] text-sm">
                  {item.sub}
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 text-center p-8 rounded-2xl border border-[oklch(0.40_0.12_265/0.4)] bg-gradient-to-r from-[oklch(0.55_0.24_290/0.08)] via-[oklch(0.12_0.03_265/0.5)] to-[oklch(0.68_0.20_225/0.08)]"
        >
          <p className="text-[oklch(0.78_0.06_255)] text-lg font-medium mb-4">
            Walk in or call us — we're happy to help!
          </p>
          <button
            type="button"
            onClick={() => {
              window.location.href = "tel:+919080674848";
            }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-btn-primary text-white font-bold shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
          >
            <Phone className="w-5 h-5" />
            Call Now
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.40_0.10_260/0.3)] to-transparent" />
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Footer
════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-10 bg-[oklch(0.08_0.025_262)] border-t border-[oklch(0.20_0.04_265)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-1 text-center">
          {/* Copyright */}
          <p className="text-[oklch(0.50_0.04_255)] text-sm">
            © 2026 . NextYU Solution All Rights Reserved.
          </p>
          <p className="text-[oklch(0.45_0.06_265)] text-xs">
            Powered by{" "}
            <span className="text-[oklch(0.72_0.18_220)] font-semibold">
              NextYU Solution
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   App Root
════════════════════════════════════════════════ */
export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.10 0.025 265)" }}
    >
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowRight, Check, ChevronDown, Minus, Plus, ShieldCheck, Sparkles, Star, Sun, WandSparkles } from "lucide-react";
import bottleImage from "@/assets/lumelle-bottle.png";
import { product } from "@/data/product";
import { Button } from "@/components/ui/button";

const MotionButton = motion.create(Button);

function scrollToPurchase() {
  document.querySelector("#purchase")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Cloud({ className }: { className: string }) {
  return <span aria-hidden="true" className={`cloud ${className}`} />;
}

function Stars({ count = 14 }: { count?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="star-particle absolute"
          style={{ left: `${7 + ((index * 37) % 88)}%`, top: `${6 + ((index * 53) % 84)}%`, animationDelay: `${index * 0.28}s` }}
        />
      ))}
    </div>
  );
}

function ProductBottle({ eager = false, className = "", interactive = false }: { eager?: boolean; className?: string; interactive?: boolean }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });

  return (
    <motion.div
      className={`product-stage ${className}`}
      onPointerMove={interactive && !reduced ? (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - bounds.left) / bounds.width - 0.5);
        y.set((event.clientY - bounds.top) / bounds.height - 0.5);
      } : undefined}
      onPointerLeave={interactive ? () => { x.set(0); y.set(0); } : undefined}
      style={interactive && !reduced ? { perspective: 900 } : undefined}
    >
      <div aria-hidden="true" className="product-aura" />
      <motion.img
        src={bottleImage}
        alt={`${product.name} alcohol-free fragrance bottle for kids`}
        width={1024}
        height={1280}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="relative z-10 h-full w-full object-contain drop-shadow-product"
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: reduced ? 0 : [0, -12, 0] }}
        transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
        style={interactive && !reduced ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      />
      <span aria-hidden="true" className="product-shadow" />
    </motion.div>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Navbar() {
  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <a href="#top" aria-label={`${product.brand} home`} className="font-display text-2xl font-extrabold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{product.brand}<span className="text-gold">✦</span></a>
        <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
          <a className="nav-link" href="#story">Our Story</a><a className="nav-link" href="#ingredients">Ingredients</a><a className="nav-link" href="#faq">FAQ</a>
        </div>
        <Button size="sm" onClick={scrollToPurchase}>{product.cta}<ArrowRight className="size-4" /></Button>
      </nav>
    </header>
  );
}

function HeroSection() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bottleY = useTransform(scrollYProgress, [0, 0.18], [0, reduced ? 0 : 100]);
  return (
    <section id="top" className="hero-sky relative flex min-h-[96svh] overflow-hidden pt-24">
      <Stars count={18} />
      <Cloud className="left-[-7rem] top-[20%] h-36 w-80 animate-cloud-slow" /><Cloud className="right-[-5rem] top-[14%] h-28 w-64 animate-cloud-reverse" /><Cloud className="bottom-[3%] left-[14%] h-24 w-52 opacity-60 animate-cloud-slow" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-20 pt-10 lg:grid-cols-[1.05fr_.95fr] lg:px-10">
        <div className="max-w-2xl text-center lg:text-left">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="eyebrow"><Sparkles className="size-4" /> A signature scent for little dreamers</motion.p>
          <motion.h1 initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} className="mt-5 font-display text-5xl font-extrabold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
            {"A Little Magic, Made Just for Them.".split(" ").map((word) => <motion.span key={word} className="mr-[.22em] inline-block" variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>{word}</motion.span>)}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }} className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg lg:mx-0">A gentle, alcohol-free fragrance made for little moments, big smiles and everyday adventures.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <MotionButton size="lg" onClick={scrollToPurchase} whileTap={{ scale: 0.97 }}>{product.cta}<ArrowRight className="size-4" /></MotionButton>
            <Button asChild variant="secondary" size="lg"><a href="#story">DISCOVER THE STORY</a></Button>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95 }} className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-bold text-foreground/80 lg:justify-start">
            {["Alcohol-Free", "Naturally Inspired", "Made for Kids"].map((item) => <li key={item} className="flex items-center gap-1.5"><Check className="size-4 text-primary" />{item}</li>)}
          </motion.ul>
        </div>
        <motion.div style={{ y: bottleY }} className="relative mx-auto h-[48vh] min-h-[370px] w-full max-w-xl lg:h-[70vh]">
          <span className="orbit-ring" aria-hidden="true" /><ProductBottle eager className="h-full" /><motion.span aria-hidden="true" className="absolute right-[9%] top-[16%] text-gold" animate={reduced ? {} : { rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }}><Sun className="size-8" /></motion.span>
        </motion.div>
      </div>
      <div className="cloud-divider" aria-hidden="true" />
    </section>
  );
}

function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.75);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <motion.aside aria-label="Quick purchase" initial={false} animate={{ y: visible ? 0 : 100, opacity: visible ? 1 : 0 }} className="fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-xl items-center justify-between rounded-full border border-border/70 bg-background/90 p-2 pl-5 shadow-float backdrop-blur-xl md:bottom-5"><div><p className="font-display text-sm font-bold">{product.name}</p><p className="text-xs text-muted-foreground">{product.price} · {product.size}</p></div><Button size="sm" onClick={scrollToPurchase}>SHOP NOW <ArrowRight className="size-4" /></Button></motion.aside>;
}

function ProductIntro() {
  return <section id="story" className="section-space overflow-hidden bg-background"><div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-10"><Reveal className="order-2 lg:order-1"><ProductBottle className="mx-auto h-[520px] max-w-md" /><div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">{["Alcohol-Free", "Kid-Friendly Fragrance", "Naturally Inspired", "One Beautiful Scent"].map((label) => <span className="floating-label" key={label}>{label}</span>)}</div></Reveal><Reveal className="order-1 lg:order-2"><p className="eyebrow">Everyday wonder</p><h2 className="section-title">Made for Little Adventures.</h2><p className="section-copy">One gentle fragrance designed to add a little magic to everyday moments — from getting ready for school to birthday parties, playdates and special family days.</p><Button className="mt-8" onClick={scrollToPurchase}>SHOP THE MAGIC <ArrowRight className="size-4" /></Button></Reveal></div></section>;
}

function BenefitsSection() {
  return <section className="section-space benefit-sky"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal className="mx-auto max-w-2xl text-center"><p className="eyebrow justify-center">For their world. And yours.</p><h2 className="section-title">Made for Kids. Chosen by Parents.</h2></Reveal><div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{product.benefits.map((benefit, index) => <Reveal key={benefit.title}><article className="benefit-card group"><span className="mb-8 flex size-11 items-center justify-center rounded-full bg-secondary text-primary"><Star className="size-5 transition-transform group-hover:rotate-12" /></span><p className="text-xs font-bold text-primary">0{index + 1}</p><h3 className="mt-2 font-display text-xl font-bold">{benefit.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{benefit.text}</p></article></Reveal>)}</div></div></section>;
}

function IngredientsSection() {
  return <section id="ingredients" className="section-space relative overflow-hidden bg-cream"><Stars count={8} /><div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-10"><Reveal className="text-center"><p className="eyebrow justify-center">Transparent by design</p><h2 className="section-title">What’s Inside the Magic?</h2></Reveal><div className="mt-8 grid items-center gap-4 lg:grid-cols-[1fr_380px_1fr]">{product.ingredients.slice(0,1).map((item) => <IngredientCard key={item.name} item={item} />)}<ProductBottle className="mx-auto h-[430px] w-full max-w-sm" /> <div className="space-y-4">{product.ingredients.slice(1).map((item) => <IngredientCard key={item.name} item={item} />)}</div></div><p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-5 text-muted-foreground">Ingredients and formulation claims should be updated according to the final product label and applicable regulations.</p></div></section>;
}

function IngredientCard({ item }: { item: (typeof product.ingredients)[number] }) { return <Reveal><article className="ingredient-card"><WandSparkles className="size-5 text-primary" /><h3 className="mt-4 font-display text-lg font-bold">{item.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p></article></Reveal>; }

function FragranceExperience() {
  const notes = [{ icon: "✿", title: "Soft", text: "A delicate, gentle-feeling scent story." }, { icon: "☁", title: "Fresh", text: "Like a bright sky after a morning breeze." }, { icon: "✦", title: "Playful", text: "A sparkling finish made for imagination." }];
  return <section className="section-space night-soft relative overflow-hidden"><Stars count={18} /><div className="relative z-10 mx-auto max-w-6xl px-5 lg:px-10"><Reveal className="mx-auto max-w-2xl text-center"><p className="eyebrow justify-center">The fragrance experience</p><h2 className="section-title">A Scent That Feels Like a Happy Day.</h2></Reveal><div className="mt-14 grid gap-5 md:grid-cols-3">{notes.map((note, index) => <Reveal key={note.title}><article className="note-card"><span className="text-4xl" aria-hidden="true">{note.icon}</span><p className="mt-8 text-xs font-bold text-gold">0{index + 1}</p><h3 className="mt-2 font-display text-3xl font-bold">{note.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{note.text}</p></article></Reveal>)}</div></div></section>;
}

function EmotionalStory() {
  const moments = [{ icon: Sun, label: "Morning" }, { icon: Sparkles, label: "Getting Ready" }, { icon: WandSparkles, label: "Fragrance Moment" }, { icon: Star, label: "Adventure" }];
  return <section className="section-space bg-background"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal className="mx-auto max-w-3xl text-center"><p className="eyebrow justify-center">A tiny daily ritual</p><h2 className="section-title">From Getting Ready… to Ready for Adventure.</h2></Reveal><div className="story-line mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">{moments.map(({ icon: Icon, label }, index) => <Reveal key={label}><div className="relative text-center"><div className="mx-auto flex size-20 items-center justify-center rounded-full border border-primary/20 bg-background shadow-soft"><Icon className="size-7 text-primary" /></div><p className="mt-5 text-xs font-bold text-primary">0{index + 1}</p><h3 className="mt-1 font-display text-lg font-bold">{label}</h3></div></Reveal>)}</div><p className="mx-auto mt-12 max-w-2xl text-center text-muted-foreground">A simple moment of self-expression before the day’s imagination takes over.</p></div></section>;
}

function InteractiveProduct() {
  return <section className="section-space dream-gradient overflow-hidden"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-10"><Reveal><p className="eyebrow">Focused by choice</p><h2 className="section-title">Only One Product. Made With Purpose.</h2><p className="section-copy">No endless shelves. No overwhelming choices. Just one signature fragrance imagined especially for kids and made easy for parents to understand.</p><p className="mt-5 hidden text-xs font-semibold text-muted-foreground lg:block">Move your cursor around the bottle to explore.</p></Reveal><Reveal><ProductBottle interactive className="mx-auto h-[560px] max-w-lg cursor-grab" /></Reveal></div></section>;
}

function ProductPurchase() {
  const [quantity, setQuantity] = useState(1);
  const [notice, setNotice] = useState(false);
  const act = () => { setNotice(true); window.setTimeout(() => setNotice(false), 3500); };
  return <section id="purchase" className="section-space scroll-mt-6 bg-cream"><div className="mx-auto max-w-6xl px-5 lg:px-10"><Reveal><div className="purchase-panel grid overflow-hidden lg:grid-cols-2"><div className="product-well"><Stars count={6} /><ProductBottle className="relative z-10 mx-auto h-[440px] max-w-sm lg:h-[560px]" /></div><div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14"><p className="eyebrow">The signature fragrance</p><h2 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">{product.name}</h2><p className="mt-3 text-muted-foreground">{product.description}</p><div className="mt-7 flex items-end justify-between border-y border-border py-5"><p className="font-display text-3xl font-bold">{product.price}</p><p className="text-sm font-bold text-muted-foreground">{product.size}</p></div><div className="mt-7 flex items-center justify-between"><span className="text-sm font-bold">Quantity</span><div className="flex items-center gap-3 rounded-full border border-border bg-background p-1"><Button aria-label="Decrease quantity" variant="ghost" size="icon" disabled={quantity === 1} onClick={() => setQuantity((q) => Math.max(1, q - 1))}><Minus className="size-4" /></Button><span aria-live="polite" className="w-5 text-center text-sm font-bold">{quantity}</span><Button aria-label="Increase quantity" variant="ghost" size="icon" onClick={() => setQuantity((q) => q + 1)}><Plus className="size-4" /></Button></div></div><Button className="mt-7 w-full" size="lg" onClick={act}>ADD TO CART <ArrowRight className="size-4" /></Button><Button className="mt-3 w-full" variant="secondary" size="lg" onClick={act}>BUY NOW</Button>{notice && <p role="status" className="mt-3 rounded-lg bg-secondary p-3 text-center text-xs text-secondary-foreground">Demo only — connect product, cart, checkout, payment, inventory and shipping services before launch.</p>}<div className="mt-6 grid grid-cols-2 gap-3 text-xs font-semibold">{["Alcohol-Free", "Secure Checkout*", "Fast Delivery*", "Easy Support*"].map((badge) => <span key={badge} className="flex items-center gap-1.5"><Check className="size-4 text-primary" />{badge}</span>)}</div><p className="mt-5 text-[11px] leading-5 text-muted-foreground">*Placeholder promises. Replace with actual checkout, delivery and support policies.</p></div></div></Reveal></div></section>;
}

function Testimonials() {
  return <section className="section-space bg-background"><div className="mx-auto max-w-7xl px-5 lg:px-10"><Reveal className="text-center"><p className="eyebrow justify-center">Editable parent stories</p><h2 className="section-title">Little Sprays. Big Smiles.</h2></Reveal><div className="mt-12 grid gap-5 md:grid-cols-3">{product.testimonials.map((review) => <Reveal key={review.quote}><figure className="testimonial-card"><div aria-label="Editable five star rating" className="flex gap-1 text-gold">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" />)}</div><blockquote className="mt-7 font-display text-xl font-semibold leading-8">“{review.quote}”</blockquote><figcaption className="mt-7 text-xs font-bold text-muted-foreground">{review.name}</figcaption></figure></Reveal>)}</div><p className="mt-6 text-center text-xs text-muted-foreground">Sample layout only. Replace with verified customer reviews before publishing.</p></div></section>;
}

function ParentTrust() {
  return <section className="section-space trust-sky"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]"><Reveal><span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><ShieldCheck className="size-7" /></span><h2 className="section-title mt-6">Because Parents Want to Know What’s Going on Their Kids’ Skin.</h2><p className="section-copy">Clear information builds confidence. Every detail here is designed to be replaced with final, label-verified guidance.</p></Reveal><div className="grid gap-3 sm:grid-cols-2">{product.guidance.map((item) => <Reveal key={item.title}><article className="trust-item"><h3 className="font-display text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p></article></Reveal>)}</div></div><p className="mx-auto mt-10 max-w-3xl rounded-lg border border-primary/15 bg-background/60 p-4 text-center text-xs leading-5 text-muted-foreground">Always follow the product label and perform a patch test when recommended. Avoid contact with eyes and discontinue use if irritation occurs.</p></div></section>;
}

function HowToUse() {
  const steps = [{ n: "01", title: "Spray", text: "Apply according to the product directions." }, { n: "02", title: "Smile", text: "Enjoy the fragrance." }, { n: "03", title: "Adventure", text: "Go make some memories." }];
  return <section className="section-space bg-background"><div className="mx-auto max-w-6xl px-5 lg:px-10"><Reveal className="text-center"><p className="eyebrow justify-center">A little ritual</p><h2 className="section-title">Magic in Three Tiny Steps.</h2></Reveal><div className="mt-14 grid gap-10 md:grid-cols-3">{steps.map((step) => <Reveal key={step.n}><div className="text-center"><span className="mx-auto flex size-24 items-center justify-center rounded-full bg-secondary font-display text-2xl font-bold text-primary shadow-soft">{step.n}</span><h3 className="mt-6 font-display text-2xl font-bold">{step.title}</h3><p className="mt-2 text-sm text-muted-foreground">{step.text}</p></div></Reveal>)}</div></div></section>;
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return <section id="faq" className="section-space bg-cream"><div className="mx-auto max-w-3xl px-5"><Reveal className="text-center"><p className="eyebrow justify-center">Parent questions, clearly answered</p><h2 className="section-title">Before the First Spritz.</h2></Reveal><div className="mt-10 divide-y divide-border border-y border-border">{product.faqs.map((item, index) => { const isOpen = open === index; return <div key={item.q}><Button variant="ghost" className="h-auto w-full justify-between rounded-none px-0 py-5 text-left text-base" aria-expanded={isOpen} aria-controls={`faq-${index}`} onClick={() => setOpen(isOpen ? -1 : index)}>{item.q}<ChevronDown className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} /></Button><motion.div id={`faq-${index}`} role="region" initial={false} animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }} className="overflow-hidden"><p className="pb-6 pr-8 text-sm leading-6 text-muted-foreground">{item.a}</p></motion.div></div>; })}</div></div></section>;
}

function FinalCTA() {
  return <section className="final-sky relative overflow-hidden py-24 text-center sm:py-32"><Stars count={22} /><Cloud className="bottom-[-2rem] left-[-5rem] h-28 w-64 opacity-40" /><Cloud className="right-[-4rem] top-[10%] h-24 w-56 opacity-30" /><div className="relative z-10 mx-auto max-w-3xl px-5"><Reveal><ProductBottle className="mx-auto h-64 max-w-[220px]" /><p className="eyebrow mt-8 justify-center">The adventure starts here</p><h2 className="section-title">Ready to Add a Little Magic?</h2><p className="mt-4 text-muted-foreground">One little fragrance. A thousand little adventures.</p><Button className="mt-8" size="lg" onClick={scrollToPurchase}>SHOP THE MAGIC <ArrowRight className="size-4" /></Button></Reveal></div></section>;
}

function Footer() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  return <footer className="bg-footer py-14 text-footer-foreground"><div className="mx-auto max-w-7xl px-5 lg:px-10"><div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr_1fr]"><div><p className="font-display text-3xl font-extrabold">{product.brand}<span className="text-gold">✦</span></p><p className="mt-4 max-w-xs text-sm leading-6 text-footer-muted">A magical little world built around one beautiful fragrance.</p></div><div className="grid grid-cols-2 gap-6 text-sm"><div className="space-y-3"><a href="#top">Home</a><a href="#story">Our Story</a><a href="#purchase">The Product</a><a href="#ingredients">Ingredients</a><a href="#faq">FAQ</a><a href="mailto:hello@example.com">Contact</a></div><div className="space-y-3 text-footer-muted"><a href="#policy-placeholder">Privacy Policy</a><a href="#policy-placeholder">Terms & Conditions</a><a href="#policy-placeholder">Shipping Policy</a><a href="#policy-placeholder">Refund Policy</a></div></div><div><h2 className="font-display text-xl font-bold">Join the Magic</h2><p className="mt-2 text-sm text-footer-muted">Occasional notes from our little world.</p><form className="mt-5 flex gap-2" onSubmit={(event) => { event.preventDefault(); if (email) setJoined(true); }}><label className="sr-only" htmlFor="newsletter">Email address</label><input id="newsletter" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="min-w-0 flex-1 rounded-full border border-footer-border bg-footer-input px-4 text-sm text-footer-foreground placeholder:text-footer-muted focus:outline-none focus:ring-2 focus:ring-gold" /><Button type="submit" size="sm">Subscribe</Button></form>{joined && <p role="status" className="mt-3 text-xs text-footer-muted">Thanks! Connect an email service before launch to save signups.</p>}</div></div><div className="mt-12 flex flex-col justify-between gap-4 border-t border-footer-border pt-6 text-xs text-footer-muted sm:flex-row"><p>© 2026 {product.brand}. Placeholder brand details.</p><p id="policy-placeholder">Policies, business address and social links must be added before launch.</p></div></div></footer>;
}

export function LandingPage() {
  return <main><Navbar /><HeroSection /><FloatingCTA /><ProductIntro /><BenefitsSection /><IngredientsSection /><FragranceExperience /><EmotionalStory /><InteractiveProduct /><ProductPurchase /><Testimonials /><ParentTrust /><HowToUse /><FAQ /><FinalCTA /><Footer /></main>;
}
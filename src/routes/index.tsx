import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Shield,
  CalendarCheck,
  Headphones,
  Waves,
  Dumbbell,
  Tv,
  Lock,
  Sparkles,
  Zap,
  Wifi,
  Plane,
  Star,
  Instagram,
  MessageCircle,
  Mail,
  X,
  Menu,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: VelaSite,
});

const VIDEOS = {
  hero: "https://videos.pexels.com/video-files/28559381/12420650_3840_2160_30fps.mp4",
  lekki: "https://videos.pexels.com/video-files/27975843/12279054_3840_2160_25fps.mp4",
  executive: "https://videos.pexels.com/video-files/19403229/19403229-hd_1920_1080_25fps.mp4",
  minimalist: "https://videos.pexels.com/video-files/36030664/15279499_1080_1920_30fps.mp4",
  support: "https://videos.pexels.com/video-files/7597567/7597567-uhd_2160_4096_25fps.mp4",
};

const IMG = (id: number, w = 1600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

// ---------- Small primitives ----------

function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "text-[#1A1A1A]" : "text-[#F5F2EC]";
  const rule = tone === "dark" ? "bg-[#1A1A1A]" : "bg-[#F5F2EC]";
  return (
    <div className={`inline-flex flex-col items-center leading-none ${color}`}>
      <span className="font-serif text-2xl font-medium tracking-[0.35em]">VELA</span>
      <span className={`my-1 h-px w-full ${rule}`} />
      <span className="text-[0.55rem] font-medium tracking-[0.45em]">RESIDENCES</span>
    </div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationDelay = `${delay}ms`;
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// ---------- Nav ----------

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Apartments", "#apartments"],
    ["Amenities", "#amenities"],
    ["Gallery", "#gallery"],
    ["Reviews", "#reviews"],
    ["Contact", "#booking"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#F5F2EC]/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-vela flex items-center justify-between py-4">
        <a href="#top" className="shrink-0">
          <Wordmark tone={scrolled ? "dark" : "light"} />
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={`text-xs font-medium uppercase tracking-[0.2em] transition-colors ${
                scrolled ? "text-[#1A1A1A] hover:text-[#B08D57]" : "text-[#F5F2EC] hover:text-[#B08D57]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#booking"
            className="hidden rounded-full bg-[#B08D57] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5F2EC] transition-transform hover:-translate-y-0.5 hover:shadow-lg md:inline-block"
          >
            Book now
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden ${scrolled ? "text-[#1A1A1A]" : "text-[#F5F2EC]"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-black/5 bg-[#F5F2EC] md:hidden">
          <div className="container-vela flex flex-col gap-4 py-6">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium uppercase tracking-[0.22em] text-[#1A1A1A]"
              >
                {label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-[#B08D57] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#F5F2EC]"
            >
              Book now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ---------- Hero ----------

function Hero() {
  return (
    <section id="top" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={IMG(35464692, 1600)}
      >
        <source src={VIDEOS.hero} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
      <div className="container-vela relative flex h-full flex-col justify-end pb-24 pt-32 text-[#F5F2EC]">
        <Reveal>
          <span className="mb-6 inline-flex items-center gap-3 text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
            <span className="h-px w-10 bg-[#B08D57]" />
            Lekki · Victoria Island
          </span>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="max-w-4xl font-serif text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Luxury short stays in the heart of Lagos.
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-6 max-w-xl text-base text-[#F5F2EC]/85 md:text-lg">
            Fully furnished apartments with hotel-grade comfort — book direct, arrive to more.
          </p>
        </Reveal>
        <Reveal delay={380}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#booking"
              className="rounded-full bg-[#B08D57] px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#F5F2EC] transition-transform hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Check availability
            </a>
            <a
              href="#apartments"
              className="rounded-full border border-[#F5F2EC]/70 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#F5F2EC] backdrop-blur transition-colors hover:border-[#B08D57] hover:text-[#B08D57]"
            >
              View apartments
            </a>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#F5F2EC]/70">
        <ChevronDown className="animate-bounce" size={22} />
      </div>
    </section>
  );
}

// ---------- Intro ----------

function Intro() {
  const features = [
    { icon: Shield, label: "Verified & secure", desc: "Screened guests, encrypted payments, on-site security at every residence." },
    { icon: CalendarCheck, label: "Instant availability", desc: "Live calendars — no chasing, no double bookings, no surprises." },
    { icon: Headphones, label: "24/7 support", desc: "A concierge on WhatsApp or a call away, whenever you need us." },
  ];
  return (
    <section className="bg-[#F5F2EC] py-24 md:py-32">
      <div className="container-vela">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
              The Vela standard
            </span>
            <p className="mt-8 font-serif text-3xl font-light leading-[1.25] text-[#1A1A1A] md:text-[2.5rem]">
              Vela Residences is a collection of thoughtfully appointed short-let apartments for
              professionals, families, and diaspora guests who want hotel comfort with the space
              of a home — set in Lekki and Victoria Island's most sought-after addresses.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-[#1A1A1A]/10 pt-16 md:grid-cols-3 md:gap-16">
          {features.map(({ icon: Icon, label, desc }, i) => (
            <Reveal key={label} delay={i * 120}>
              <div>
                <Icon size={26} className="text-[#B08D57]" strokeWidth={1.5} />
                <h3 className="mt-6 font-serif text-xl font-medium text-[#1A1A1A]">{label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#1A1A1A]/70">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Apartments ----------

type Apt = {
  name: string;
  badge: string;
  price: string;
  desc: string;
  video?: string;
  image?: string;
};

const APARTMENTS: Apt[] = [
  {
    name: "The Lekki Loft",
    badge: "2 bedrooms",
    price: "From ₦180,000/night",
    desc: "An airy two-bedroom with a warm kitchen, generous dining, and skyline light all day.",
    video: VIDEOS.lekki,
    image: IMG(6920439, 1200),
  },
  {
    name: "The Executive Suite",
    badge: "1 bedroom",
    price: "From ₦140,000/night",
    desc: "A composed one-bedroom retreat for business travellers who work late and sleep well.",
    video: VIDEOS.executive,
    image: IMG(6920445, 1200),
  },
  {
    name: "The Minimalist Residence",
    badge: "3 bedrooms",
    price: "From ₦240,000/night",
    desc: "Three bedrooms, quiet materials, and long lines — built for families and extended stays.",
    video: VIDEOS.minimalist,
    image: IMG(6920435, 1200),
  },
  {
    name: "The Skyline Studio",
    badge: "Studio",
    price: "From ₦110,000/night",
    desc: "A refined studio above the city — pool, gym, and the lagoon at your doorstep.",
    image: IMG(35464692, 1400),
  },
];

function ApartmentCard({ apt, i }: { apt: Apt; i: number }) {
  return (
    <Reveal delay={i * 100}>
      <article className="group relative overflow-hidden rounded-lg bg-[#1A1A1A] shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden">
          {apt.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster={apt.image}
            >
              <source src={apt.video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={apt.image}
              alt={apt.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-[#F5F2EC]/95 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A]">
            {apt.badge}
          </span>
          <div className="absolute inset-x-0 bottom-0 p-6 text-[#F5F2EC]">
            <h3 className="font-serif text-2xl font-medium">{apt.name}</h3>
            <p className="mt-2 text-sm text-[#F5F2EC]/80">{apt.desc}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-medium text-[#B08D57]">{apt.price}</span>
              <a
                href="#booking"
                className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#F5F2EC] underline-offset-4 hover:text-[#B08D57] hover:underline"
              >
                View details →
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Apartments() {
  return (
    <section id="apartments" className="bg-[#F5F2EC] py-24 md:py-32">
      <div className="container-vela">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
                The collection
              </span>
              <h2 className="mt-5 font-serif text-4xl font-light text-[#1A1A1A] md:text-5xl">
                Our residences
              </h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="max-w-md text-sm leading-relaxed text-[#1A1A1A]/70">
              Four distinct apartments, each with its own character — chosen for guests who
              notice the details.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {APARTMENTS.map((a, i) => (
            <ApartmentCard key={a.name} apt={a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Interior gallery ----------

const GALLERY_BLOCKS = [
  {
    image: IMG(6920439, 1600),
    title: "Fully equipped kitchens",
    body: "Filtered water, Nespresso, gas hobs, and every utensil you'd reach for at home — thoughtfully stocked before you arrive.",
  },
  {
    image: IMG(37254628, 1600),
    title: "Fast wifi and streaming",
    body: "Fibre internet on every floor, Netflix and Showmax pre-loaded, and a workspace that behaves like an office.",
  },
  {
    image: IMG(26859049, 1600),
    title: "Premium bedding and interiors",
    body: "Percale linens, blackout curtains, and interior work by Lagos-based designers — restful, warm, and quiet.",
  },
  {
    image: IMG(6920446, 1600),
    title: "24-hour power backup",
    body: "Inverter and standby generator on every property — the lights simply stay on, no interruptions to notice.",
  },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-[#F5F2EC] pb-24 md:pb-32">
      <div className="container-vela">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
              Interiors
            </span>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#1A1A1A] md:text-5xl">
              Designed for comfort
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 space-y-24">
          {GALLERY_BLOCKS.map((b, i) => (
            <Reveal key={b.title}>
              <div className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={b.image}
                    alt={b.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1400ms] hover:scale-105"
                  />
                </div>
                <div>
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.32em] text-[#B08D57]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-serif text-3xl font-light text-[#1A1A1A] md:text-4xl">
                    {b.title}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#1A1A1A]/70 md:text-base">
                    {b.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 grid gap-3 sm:grid-cols-3">
          {[6920445, 6920435, 26859049].map((id, i) => (
            <Reveal key={id} delay={i * 120}>
              <img
                src={IMG(id, 900)}
                alt=""
                loading="lazy"
                className="aspect-[3/4] w-full rounded-lg object-cover"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Amenities ----------

const AMENITIES = [
  { icon: Waves, label: "Pool access" },
  { icon: Dumbbell, label: "Gym access" },
  { icon: Tv, label: "Netflix & streaming" },
  { icon: Lock, label: "24/7 security" },
  { icon: Sparkles, label: "Housekeeping" },
  { icon: Zap, label: "Power backup" },
  { icon: Wifi, label: "Fast wifi" },
  { icon: Plane, label: "Airport pickup" },
];

function Amenities() {
  return (
    <section id="amenities" className="bg-[#1A1A1A] py-24 text-[#F5F2EC] md:py-32">
      <div className="container-vela">
        <div className="grid gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
          <Reveal>
            <div>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
                Every stay
              </span>
              <h2 className="mt-5 font-serif text-4xl font-light md:text-5xl">
                Every stay includes
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-[#F5F2EC]/70">
                No hidden add-ons. No unfurnished corners. Everything you'd expect from a boutique
                hotel, ready in your apartment from the moment you check in.
              </p>
              <div className="mt-10 grid grid-cols-2 gap-3">
                <img src={IMG(4716814, 700)} alt="Gym" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
                <img src={IMG(1990764, 700)} alt="Security" loading="lazy" className="aspect-square w-full rounded-lg object-cover" />
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-[#F5F2EC]/10 md:grid-cols-4">
            {AMENITIES.map(({ icon: Icon, label }, i) => (
              <Reveal key={label} delay={i * 60}>
                <div className="flex h-full flex-col items-start gap-4 bg-[#1A1A1A] p-6 transition-colors hover:bg-[#242424]">
                  <Icon size={22} className="text-[#B08D57]" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-[#F5F2EC]">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Team ----------

const TEAM = [
  { id: 37079375, name: "Amara O.", role: "Guest Relations Lead" },
  { id: 37118089, name: "Chioma A.", role: "Operations Manager" },
  { id: 6300613, name: "Blessing E.", role: "Housekeeping Lead" },
];

function Team() {
  return (
    <section className="bg-[#F5F2EC] py-24 md:py-32">
      <div className="container-vela">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
              The people
            </span>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#1A1A1A] md:text-5xl">
              Meet the team behind Vela
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <div className="group">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={IMG(p.id, 900)}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-light text-[#1A1A1A]">{p.name}</h3>
                <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
                  {p.role}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 grid items-center gap-10 rounded-lg bg-[#1A1A1A] p-8 text-[#F5F2EC] md:grid-cols-[1fr_1.3fr] md:p-14">
            <div className="overflow-hidden rounded-lg">
              <video
                className="aspect-square w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
              >
                <source src={VIDEOS.support} type="video/mp4" />
              </video>
            </div>
            <div>
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
                Always reachable
              </span>
              <h3 className="mt-5 font-serif text-3xl font-light md:text-4xl">
                Support that actually answers.
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#F5F2EC]/75">
                WhatsApp or call, anytime. A real person on the other end — not a bot, not a
                queue, not tomorrow morning.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Reviews ----------

const REVIEWS = [
  {
    quote: "Landed at 2am and everything was ready — keys, lights, the fridge stocked. Felt more like a private residence than a rental.",
    name: "Tunde",
    city: "London",
  },
  {
    quote: "We stayed two weeks with the kids. The space, the wifi, the housekeeping — Vela quietly handled all of it.",
    name: "Ifeoma",
    city: "Atlanta",
  },
  {
    quote: "Best short-let I've booked in Lagos, full stop. The finish is on par with a five-star suite and the team is faster than any concierge I've used.",
    name: "David",
    city: "Dubai",
  },
];

function Reviews() {
  return (
    <section id="reviews" className="bg-[#F5F2EC] py-24 md:py-32">
      <div className="container-vela">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
              Guest notes
            </span>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#1A1A1A] md:text-5xl">
              Loved by guests, at home and abroad.
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <figure className="flex h-full flex-col justify-between rounded-lg border border-[#1A1A1A]/10 bg-white p-8">
                <div>
                  <div className="flex gap-1 text-[#B08D57]">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-serif text-lg font-light leading-relaxed text-[#1A1A1A]">
                    "{r.quote}"
                  </blockquote>
                </div>
                <figcaption className="mt-8 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#1A1A1A]/60">
                  {r.name} · {r.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Booking form ----------

function Booking() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks — we'll respond within a few hours.");
    }, 700);
  };

  const field =
    "w-full rounded-md border border-[#1A1A1A]/15 bg-white px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 outline-none transition-colors focus:border-[#B08D57] focus:ring-1 focus:ring-[#B08D57]";
  const label = "text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#1A1A1A]/70";

  return (
    <section id="booking" className="bg-[#F5F2EC] py-24 md:py-32">
      <div className="container-vela grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
        <Reveal>
          <div>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
              Enquire
            </span>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#1A1A1A] md:text-5xl">
              Check availability
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#1A1A1A]/70">
              Tell us the dates, the residence, and how to reach you. A member of our team will
              come back to you within a few hours — usually much sooner.
            </p>
            <div className="mt-10 space-y-4 text-sm text-[#1A1A1A]/80">
              <p className="flex items-center gap-3">
                <MessageCircle size={16} className="text-[#B08D57]" /> WhatsApp: +234 000 000 0000
              </p>
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-[#B08D57]" /> stay@velaresidences.com
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={onSubmit} className="rounded-lg border border-[#1A1A1A]/10 bg-white p-6 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label}>Full name</label>
                <input required name="name" placeholder="Your name" className={`${field} mt-2`} />
              </div>
              <div>
                <label className={label}>Phone</label>
                <input required name="phone" placeholder="+234 ..." className={`${field} mt-2`} />
              </div>
              <div>
                <label className={label}>Check-in</label>
                <input required type="date" name="checkin" className={`${field} mt-2`} />
              </div>
              <div>
                <label className={label}>Check-out</label>
                <input required type="date" name="checkout" className={`${field} mt-2`} />
              </div>
              <div>
                <label className={label}>Guests</label>
                <input required type="number" min={1} defaultValue={2} name="guests" className={`${field} mt-2`} />
              </div>
              <div>
                <label className={label}>Preferred apartment</label>
                <select name="apartment" className={`${field} mt-2`}>
                  <option>Lekki Loft</option>
                  <option>Executive Suite</option>
                  <option>Minimalist Residence</option>
                  <option>Skyline Studio</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Message (optional)</label>
                <textarea rows={4} name="message" placeholder="Anything we should prepare for your stay?" className={`${field} mt-2 resize-none`} />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-full bg-[#B08D57] py-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#F5F2EC] transition-transform hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70"
            >
              {submitting ? "Sending…" : "Request booking"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- FAQ ----------

const FAQS = [
  {
    q: "What is your cancellation policy?",
    a: "Full refund up to 7 days before check-in. Within 7 days, 50% refund. Within 48 hours, non-refundable — we'll always try to move your dates instead where we can.",
  },
  {
    q: "How does check-in work?",
    a: "Our team meets you at the door for a walk-through, keys, and wifi. We coordinate the timing by WhatsApp the day before, and late arrivals are standard — never a problem.",
  },
  {
    q: "Is there a minimum stay?",
    a: "Two nights across the collection. For weekly and monthly stays we offer a preferred rate — mention your dates in the enquiry form and we'll share it directly.",
  },
  {
    q: "Do you require a caution deposit?",
    a: "Yes — a refundable ₦100,000 hold on card or transfer, released within 48 hours of check-out once the residence has been inspected.",
  },
  {
    q: "Are pets allowed?",
    a: "Small, well-behaved pets are welcome in selected residences on request. Let us know in your enquiry and we'll match you to the right apartment.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-[#F5F2EC] pb-24 md:pb-32">
      <div className="container-vela grid gap-16 md:grid-cols-[1fr_1.3fr] md:gap-24">
        <Reveal>
          <div>
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-[#B08D57]">
              Answers
            </span>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#1A1A1A] md:text-5xl">
              Frequently asked
            </h2>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="divide-y divide-[#1A1A1A]/10 border-y border-[#1A1A1A]/10">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-serif text-lg font-medium text-[#1A1A1A] md:text-xl">
                      {f.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-[#B08D57] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}
                  >
                    <p className="min-h-0 max-w-2xl text-sm leading-relaxed text-[#1A1A1A]/70">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer ----------

function Footer() {
  const [badgeOpen, setBadgeOpen] = useState(true);
  return (
    <footer className="bg-[#1A1A1A] text-[#F5F2EC]">
      <div className="container-vela grid gap-12 py-20 md:grid-cols-3">
        <div>
          <Wordmark tone="light" />
          <p className="mt-6 max-w-xs text-sm text-[#F5F2EC]/60">Stay well. Stay Vela.</p>
        </div>
        <div className="flex flex-col gap-3 md:items-center">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
            Quick links
          </span>
          <a href="#apartments" className="text-sm text-[#F5F2EC]/80 hover:text-[#B08D57]">Apartments</a>
          <a href="#amenities" className="text-sm text-[#F5F2EC]/80 hover:text-[#B08D57]">Amenities</a>
          <a href="#booking" className="text-sm text-[#F5F2EC]/80 hover:text-[#B08D57]">Contact</a>
        </div>
        <div className="md:text-right">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#B08D57]">
            Elsewhere
          </span>
          <div className="mt-4 flex gap-4 md:justify-end">
            <a href="#" aria-label="Instagram" className="rounded-full border border-[#F5F2EC]/20 p-2.5 transition-colors hover:border-[#B08D57] hover:text-[#B08D57]">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="WhatsApp" className="rounded-full border border-[#F5F2EC]/20 p-2.5 transition-colors hover:border-[#B08D57] hover:text-[#B08D57]">
              <MessageCircle size={16} />
            </a>
            <a href="#" aria-label="Email" className="rounded-full border border-[#F5F2EC]/20 p-2.5 transition-colors hover:border-[#B08D57] hover:text-[#B08D57]">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#F5F2EC]/10 py-8">
        <div className="container-vela flex flex-col items-center gap-4">
          <p className="text-[0.65rem] uppercase tracking-[0.24em] text-[#F5F2EC]/50">
            © {new Date().getFullYear()} Vela Residences. All rights reserved.
          </p>
          {badgeOpen && (
            <a
              href="https://rovoche.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#F5F2EC] px-3 py-1.5 text-[0.65rem] font-medium tracking-[0.14em] text-[#1A1A1A] shadow-sm transition-all hover:shadow-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />
              Concept by ROVOCHÉ
              <span
                role="button"
                aria-label="Dismiss"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setBadgeOpen(false);
                }}
                className="ml-1 rounded-full p-0.5 text-[#1A1A1A]/50 hover:bg-[#1A1A1A]/10 hover:text-[#1A1A1A]"
              >
                <X size={11} />
              </span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}

// ---------- Page ----------

function VelaSite() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] text-[#1A1A1A]">
      <Nav />
      <Hero />
      <Intro />
      <Apartments />
      <Gallery />
      <Amenities />
      <Team />
      <Reviews />
      <Booking />
      <Faq />
      <Footer />
    </main>
  );
}

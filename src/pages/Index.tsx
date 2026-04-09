import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE =
  "https://cdn.poehali.dev/projects/7d2c111f-b9ac-4dd7-8b78-b9873fca0844/files/85facba2-161d-4791-9331-692c89649e1d.jpg";

// ─── Scroll reveal hook ────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Theme toggle ──────────────────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(false);
  const toggle = () => {
    setDark(d => {
      const next = !d;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

// ─── DATA ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { wide: true,  icon: "Sailboat",  title: "Активности на воде",     desc: "SUP-бординг, каяки, рыбалка с пирса и с лодки, катамараны. Всё снаряжение включено.", tags: ["🏄 SUP-борды","🛶 Каяки","🎣 Рыбалка","⛵ Катамараны"] },
  { wide: false, icon: "Flame",     title: "Баня и релакс",           desc: "Русская баня у воды, фурако-купели, массаж. Бронируйте заранее — места заканчиваются к пятнице.", tags: ["🔥 Баня","🛁 Фурако","💆 Массаж"] },
  { wide: false, icon: "Bike",      title: "Прогулки и маршруты",     desc: "Велосипеды в прокат, пешие маршруты по лесу, скандинавская ходьба. Инструктор — по запросу.", tags: ["🚴 Велосипеды","🥾 Треккинг"] },
  { wide: false, icon: "Users",     title: "Семейный отдых",          desc: "Детская площадка, анимация для детей, контактный мини-зоопарк. Pet-friendly — питомцы приветствуются.", tags: ["🎠 Анимация","🐾 Pet-friendly","🦔 Мини-зоопарк"] },
  { wide: false, icon: "Briefcase", title: "Корпоративный отдых",     desc: "Конференц-зал на 30 человек, тимбилдинги, банкетное пространство. Отдельные условия для групп от 10 чел.", tags: ["🏆 Тимбилдинг","📊 Конференции"] },
];

const REVIEWS = [
  { name: "Марина К.", city: "Москва",           text: "«Мы уже третий год подряд. Дети не хотят уезжать, муж тоже. Баня у воды — отдельная любовь. Каждый раз что-то новое, интересное.»" },
  { name: "Александр и Ирина", city: "Санкт-Петербург", text: "«Взяли домик для двоих на годовщину. Встретили закат с вином на пирсе — это было магически. Уже едем в сентябре.»" },
  { name: "Алексей Р.", city: "HR-директор, Тверь", text: "«Брали корпус для корпоратива на 18 человек. Команда до сих пор вспоминает. Уже думаем над следующим летом.»" },
];

const TARIFFS = [
  {
    emoji: "🌿", name: "Тихий", desc: "Для двоих. Домик у леса, покой и природа.", price: "от 4 500 ₽", unit: "/ ночь",
    features: ["Уютный домик у леса","Завтрак включён","Баня по записи","Рыбалка, лодки","Бесплатная парковка"],
    featured: false,
  },
  {
    emoji: "👨‍👩‍👧", name: "Семейный", desc: "Для 2–4 человек. Коттедж с верандой, всё для детей.", price: "от 7 200 ₽", unit: "/ ночь",
    features: ["Коттедж с верандой у воды","Завтрак + ужин включены","Детская площадка, аниматор","Баня 2 часа в день","Pet-friendly","SUP + каяк включены"],
    featured: true,
  },
  {
    emoji: "💑", name: "Романтика", desc: "Для двоих. Домик у воды, приватность и атмосфера.", price: "от 6 500 ₽", unit: "/ ночь",
    features: ["Домик у воды — приватный","Завтрак + корзина с вином","Приватный пирс","Фурако-купель","Велосипеды в подарок"],
    featured: false,
  },
];

const LOYALTY_STEPS = [
  { n: "1", title: "Копите баллы", text: "1 ночь = 50 баллов. Баллы за отзыв (+10), за баню (+20), за приведённого друга (+15). Тратьте на скидку при следующем визите." },
  { n: "2", title: "Приведи друга — получи 10%", text: "Друг бронирует по вашей рекомендации — вы оба получаете 10% скидку на следующий визит." },
  { n: "3", title: "С 3-го визита — статус «Свой гость»", text: "Приоритетное бронирование горячих дат, персональное меню, сюрприз при заезде и персональный менеджер." },
];

const LOYALTY_BADGES = [
  { icon: "🏅", title: "Приоритет бронирования",  text: "первыми видите свободные даты" },
  { icon: "🎁", title: "Сюрприз при заезде",       text: "каждый раз новый" },
  { icon: "🍽️", title: "Персональное меню",         text: "мы помним ваши предпочтения" },
  { icon: "📞", title: "Персональный менеджер",     text: "один звонок, всё готово" },
  { icon: "🎪", title: "Закрытые события",           text: "дегустации, ретриты, воркшопы" },
];

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => setShowCta(!e.isIntersecting),
      { threshold: 0.5 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300"
      style={{
        background: scrolled
          ? "color-mix(in srgb, var(--color-bg) 90%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-divider)" : "1px solid transparent",
      }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 600, color: scrolled ? "var(--color-text)" : "#fff" }}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" style={{ color: scrolled ? "var(--color-primary)" : "#7ddc6b" }}>
            <path d="M16 4 L26 24 L6 24 Z" fill="currentColor" opacity="0.9"/>
            <path d="M16 10 L22 22 L10 22 Z" fill={scrolled ? "var(--color-bg)" : "#131510"} opacity="0.6"/>
            <rect x="14" y="24" width="4" height="5" fill="currentColor" opacity="0.6"/>
            <path d="M3 27 Q8 22 16 24 Q24 22 29 27" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
          </svg>
          Лесной берег
        </a>

        {/* Links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {[["Услуги","#services"],["Отзывы","#reviews"],["Пакеты","#pricing"],["Контакты","#contacts"]].map(([l,h]) => (
            <li key={l}>
              <a href={h} className="nav-link" style={{ color: scrolled ? "var(--color-text-muted)" : "rgba(255,255,255,0.8)" }}>{l}</a>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-3">
          {showCta && (
            <a
              href="#book"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}
            >
              Забронировать
            </a>
          )}
          <button
            onClick={toggle}
            aria-label="Переключить тему"
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{ color: scrolled ? "var(--color-text-muted)" : "rgba(255,255,255,0.7)" }}
          >
            {dark ? <Icon name="Sun" size={18} /> : <Icon name="Moon" size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden" style={{ paddingTop: "calc(72px + clamp(4rem,12vw,6rem))", paddingBottom: "clamp(3rem,8vw,6rem)" }}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="Лес у озера на рассвете" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(18,21,16,0.68) 0%, rgba(18,21,16,0.38) 60%, rgba(18,21,16,0.52) 100%)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[820px] mx-auto px-4">
        {/* Badge */}
        <div className="animate-fade-up anim-d1 inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs uppercase tracking-wider" style={{ background: "rgba(255,255,255,0.14)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.88)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#7ddc6b] animate-pulse-dot" />
          Открыто с июня по октябрь 2026
        </div>

        {/* Title */}
        <h1 className="animate-fade-up anim-d2 font-display text-white mb-6" style={{ fontSize: "clamp(3rem,0.5rem+7vw,7.5rem)", lineHeight: 1.05, textShadow: "0 2px 24px rgba(0,0,0,0.3)", fontWeight: 600 }}>
          Настоящий отдых<br />начинается <em style={{ fontStyle: "italic", color: "#a8e094" }}>здесь</em>
        </h1>

        <p className="animate-fade-up anim-d3 mb-3 font-body" style={{ fontSize: "clamp(1.125rem,1rem+0.75vw,1.5rem)", color: "rgba(255,255,255,0.82)", fontWeight: 300, maxWidth: "58ch", marginInline: "auto" }}>
          Вода, лес и тишина — всего в 120 км от города. База отдыха у озера для тех, кто хочет выдохнуть по-настоящему.
        </p>

        <p className="animate-fade-up anim-d3 mb-8 text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          🏡 Домики у воды &nbsp;·&nbsp; 🎣 Рыбалка &nbsp;·&nbsp; 🛶 Лодки &nbsp;·&nbsp; 🔥 Баня &nbsp;·&nbsp; <strong style={{ color: "rgba(255,255,255,0.9)" }}>от 4 500 ₽/сутки</strong>
        </p>

        {/* CTA */}
        <div id="hero-cta" className="animate-fade-up anim-d4 flex flex-wrap gap-3 justify-center mb-14">
          <a href="#book" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5" style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
            <Icon name="Calendar" size={18} />
            Проверить свободные даты
          </a>
          <a href="#services" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-200 hover:bg-white/25" style={{ background: "rgba(255,255,255,0.14)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)" }}>
            Смотреть, что есть
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up anim-d5 flex flex-wrap gap-8 justify-center">
          {[["1 200+","гостей за сезон"],["38%","возвращаются снова"],["4.9 ⭐","средний рейтинг"],["7 лет","на рынке"]].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-white font-bold" style={{ fontSize: "clamp(1.5rem,1.2rem+1.25vw,2.25rem)", lineHeight: 1 }}>{n}</div>
              <div className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 animate-bounce-gentle flex flex-col items-center gap-2" style={{ color: "rgba(255,255,255,0.45)" }}>
        <Icon name="ArrowDown" size={20} />
        <span className="text-xs">листать</span>
      </div>
    </section>
  );
}

// ─── Pain ──────────────────────────────────────────────────────────────────
function PainSection() {
  const imgRef = useReveal();
  const textRef = useReveal();
  return (
    <section className="py-[clamp(3rem,8vw,6rem)]" style={{ background: "var(--color-surface-offset)" }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div ref={textRef} className="reveal">
            <span className="section-label">Почему мы</span>
            <h2 className="font-display mb-6" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-text)" }}>
              Когда вы в последний раз просыпались без будильника?
            </h2>
            <p className="mb-6 leading-[1.75]" style={{ color: "var(--color-text-muted)", fontSize: "clamp(1rem,0.95rem+0.25vw,1.125rem)", maxWidth: "50ch" }}>
              Город забирает энергию незаметно. Пробки, дедлайны, телефон, который не замолкает. Мы создали место, где всё это остаётся за воротами.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                ["Wind",    "Воздух, который не пахнет выхлопами"],
                ["Waves",   "Вода в двух шагах от вашего домика"],
                ["BellOff", "Зона без уведомлений — по вашему желанию"],
                ["Sun",     "Закаты на пирсе с кружкой чая в руке"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-3" style={{ color: "var(--color-text)" }}>
                  <div className="icon-wrap">
                    <Icon name={icon} fallback="Star" size={18} />
                  </div>
                  <span style={{ fontSize: "clamp(1rem,0.95rem+0.25vw,1.125rem)" }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={imgRef} className="reveal" style={{ borderRadius: "1.5rem", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/5" }}>
            <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=750&fit=crop" alt="Уютный домик у озера вечером" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────
function ServicesSection() {
  const headRef = useReveal();
  return (
    <section id="services" className="py-[clamp(3rem,8vw,6rem)]" style={{ background: "var(--color-bg)" }}>
      <div className="container max-w-[1200px] mx-auto px-6">
        <div ref={headRef} className="reveal text-center mb-12">
          <span className="section-label" style={{ marginInline: "auto" }}>На территории базы</span>
          <h2 className="font-display mb-4" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-text)" }}>Чем заняться на базе</h2>
          <p style={{ fontSize: "clamp(1rem,0.95rem+0.25vw,1.125rem)", color: "var(--color-text-muted)", maxWidth: "52ch", marginInline: "auto" }}>
            Всё необходимое — на одной территории. Для тех, кто приехал отдохнуть, а не организовывать логистику.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} delay={i === 0 ? 0 : i <= 2 ? 0.1 : 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, delay }: { s: typeof SERVICES[0]; delay: number }) {
  const ref = useReveal();
  const IMGS = [
    "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=900&h=380&fit=crop",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=337&fit=crop",
    "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=337&fit=crop",
  ];
  const imgIdx = s.title.includes("воде") ? 0 : s.title.includes("Баня") ? 1 : 2;
  return (
    <div
      ref={ref}
      className={`reveal card-lift ${s.wide ? "md:col-span-2" : ""}`}
      style={{ transitionDelay: `${delay}s`, background: "var(--color-surface)", border: "1px solid var(--color-border-custom)", borderRadius: "1rem", padding: "1.5rem", overflow: "hidden" }}
    >
      {(s.wide || imgIdx <= 2) && (
        <img
          src={IMGS[imgIdx] ?? IMGS[0]}
          alt={s.title}
          className="w-full object-cover rounded-lg mb-4"
          style={{ aspectRatio: s.wide ? "21/9" : "16/9" }}
        />
      )}
      <div className="icon-wrap mb-4">
        <Icon name={s.icon} fallback="Star" size={20} />
      </div>
      <h3 className="font-display mb-2" style={{ fontSize: "clamp(1.5rem,1.2rem+1.25vw,2.25rem)", color: "var(--color-text)" }}>{s.title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--color-text-muted)" }}>{s.desc}</p>
      <div className="flex flex-wrap gap-2">
        {s.tags.map(t => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Food ──────────────────────────────────────────────────────────────────
function FoodSection() {
  const imgRef = useReveal();
  const textRef = useReveal();
  return (
    <section className="py-[clamp(3rem,8vw,6rem)]" style={{ background: "var(--color-surface-offset)" }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div ref={imgRef} className="reveal order-last md:order-first" style={{ borderRadius: "1.5rem", overflow: "hidden", boxShadow: "var(--shadow-lg)", aspectRatio: "4/5" }}>
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=750&fit=crop" alt="Ужин на свежем воздухе" className="w-full h-full object-cover" />
          </div>
          <div ref={textRef} className="reveal flex flex-col gap-6">
            <div>
              <span className="section-label">Гастрономия</span>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-text)" }}>
                Кормим как дома.<br />Только вкуснее.
              </h2>
            </div>
            <p className="leading-[1.75]" style={{ color: "var(--color-text-muted)", maxWidth: "50ch" }}>
              Наша кухня работает на местных продуктах — рыба из озера, зелень с грядки, молочное от соседних фермеров. Завтраки включены в стоимость размещения.
            </p>
            <div style={{ background: "var(--color-accent-light)", borderLeft: "3px solid var(--color-accent)", borderRadius: "0 0.75rem 0.75rem 0", padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "clamp(1rem,0.95rem+0.25vw,1.125rem)", color: "var(--color-text)" }}>
                По <strong style={{ color: "var(--color-accent)" }}>субботам — открытый мангал</strong> и мастер-класс от шеф-повара. Готовим вместе, едим вместе.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {[
                ["ChefHat", "Авторское меню с сезонными продуктами"],
                ["Fish",    "Своя рыба из озера — готовим по вашему заказу"],
                ["Coffee",  "Завтраки включены во все тарифы"],
              ].map(([icon, text]) => (
                <li key={text} className="flex items-center gap-3" style={{ color: "var(--color-text)" }}>
                  <div className="icon-wrap">
                    <Icon name={icon} fallback="Star" size={18} />
                  </div>
                  <span style={{ fontSize: "clamp(1rem,0.95rem+0.25vw,1.125rem)" }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ───────────────────────────────────────────────────────────────
function ReviewsSection() {
  const headRef = useReveal();
  return (
    <section id="reviews" className="py-[clamp(3rem,8vw,6rem)]" style={{ background: "var(--color-bg)" }}>
      <div className="container max-w-[1200px] mx-auto px-6">
        <div ref={headRef} className="reveal text-center mb-10">
          <span className="section-label" style={{ marginInline: "auto" }}>Отзывы гостей</span>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-text)" }}>
            Те, кто приехал один раз —<br />приезжают каждый сезон
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} r={r} delay={i * 0.12} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[["1 200+","гостей за сезон 2025"],["38%","возвращаются снова"],["4.9 / 5","рейтинг на 101Hotels"]].map(([n,l]) => (
            <StatCard key={l} num={n} label={l} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r, delay }: { r: typeof REVIEWS[0]; delay: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal card-lift" style={{ transitionDelay: `${delay}s`, background: "var(--color-surface)", border: "1px solid var(--color-border-custom)", borderRadius: "1rem", padding: "1.5rem" }}>
      <div className="flex gap-1 mb-3" style={{ color: "var(--color-accent)" }}>
        {[...Array(5)].map((_, i) => <Icon key={i} name="Star" size={14} />)}
      </div>
      <p className="text-sm leading-[1.7] mb-4 italic" style={{ color: "var(--color-text-muted)" }}>{r.text}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-xl flex-shrink-0" style={{ background: "var(--color-primary-highlight)", color: "var(--color-primary)" }}>
          {r.name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>{r.name}</div>
          <div className="text-xs" style={{ color: "var(--color-text-faint)" }}>{r.city}</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ num, label }: { num: string; label: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center py-6 px-4 rounded-xl" style={{ background: "var(--color-surface-offset)" }}>
      <div className="font-display font-bold mb-2" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-primary)", lineHeight: 1 }}>{num}</div>
      <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>{label}</div>
    </div>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────
function PricingSection() {
  const headRef = useReveal();
  return (
    <section id="pricing" className="py-[clamp(3rem,8vw,6rem)]" style={{ background: "var(--color-surface-offset)" }}>
      <div className="container max-w-[1200px] mx-auto px-6">
        <div ref={headRef} className="reveal text-center mb-10">
          <span className="section-label" style={{ marginInline: "auto" }}>Пакеты и цены</span>
          <h2 className="font-display mb-3" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-text)" }}>Выберите свой формат отдыха</h2>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>Минимальный срок — 2 ночи. Стоимость указана за сутки для 2 взрослых.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {TARIFFS.map((t, i) => (
            <TariffCard key={i} t={t} delay={i * 0.12} />
          ))}
        </div>

        <p className="text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
          Отмена бронирования за 72 часа — бесплатно. Без скрытых платежей.
        </p>
      </div>
    </section>
  );
}

function TariffCard({ t, delay }: { t: typeof TARIFFS[0]; delay: number }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal card-lift flex flex-col relative"
      style={{
        transitionDelay: `${delay}s`,
        background: t.featured ? `color-mix(in srgb, var(--color-primary) 5%, var(--color-surface))` : "var(--color-surface)",
        border: `1.5px solid ${t.featured ? "var(--color-primary)" : "var(--color-border-custom)"}`,
        borderRadius: "1.5rem",
        padding: "2rem",
      }}
    >
      {t.featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
          Популярный
        </div>
      )}
      <div className="text-4xl mb-4">{t.emoji}</div>
      <div className="font-display text-2xl mb-2" style={{ color: "var(--color-text)" }}>{t.name}</div>
      <div className="text-sm mb-6" style={{ color: "var(--color-text-muted)" }}>{t.desc}</div>
      <ul className="flex flex-col gap-3 mb-6 flex-1">
        {t.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-text)" }}>
            <Icon name="Check" size={15} style={{ color: "var(--color-primary)", flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>
      <div className="font-display text-2xl mb-4" style={{ color: "var(--color-text)" }}>
        {t.price} <span className="text-sm font-body font-normal" style={{ color: "var(--color-text-muted)" }}>{t.unit}</span>
      </div>
      <a
        href="#book"
        className="block text-center py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
        style={t.featured
          ? { background: "var(--color-primary)", color: "var(--color-text-inverse)" }
          : { background: "transparent", color: "var(--color-text)", border: "1.5px solid color-mix(in srgb, var(--color-text) 20%, transparent)" }
        }
      >
        Выбрать
      </a>
    </div>
  );
}

// ─── Loyalty ───────────────────────────────────────────────────────────────
function LoyaltySection() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  return (
    <section className="py-[clamp(3rem,8vw,6rem)]" style={{ background: "var(--color-bg)" }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          <div ref={leftRef} className="reveal">
            <span className="section-label">Программа лояльности</span>
            <h2 className="font-display mb-4" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "var(--color-text)" }}>
              Наши гости копят баллы и приезжают снова
            </h2>
            <p className="mb-8 leading-[1.75]" style={{ color: "var(--color-text-muted)", maxWidth: "50ch" }}>
              Каждый визит делает следующий выгоднее. Мы помним своих гостей и ценим их выбор.
            </p>
            <div className="flex flex-col">
              {LOYALTY_STEPS.map((s, i) => (
                <div key={i} className="flex gap-4 py-5" style={{ borderBottom: i < LOYALTY_STEPS.length - 1 ? "1px solid var(--color-divider)" : "none" }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-xl font-bold flex-shrink-0" style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
                    {s.n}
                  </div>
                  <div>
                    <div className="font-semibold mb-1" style={{ color: "var(--color-text)" }}>{s.title}</div>
                    <div className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={rightRef} className="reveal rounded-2xl p-8" style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
            <div className="text-xs uppercase tracking-wider mb-6 opacity-70">Привилегии постоянного гостя</div>
            <div className="font-display text-2xl mb-6">«Свой гость» — что это даёт</div>
            <div className="flex flex-col gap-3">
              {LOYALTY_BADGES.map((b, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <span className="text-xl">{b.icon}</span>
                  <div className="text-sm opacity-90">
                    <strong style={{ opacity: 1 }}>{b.title}</strong> — {b.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA / Booking ─────────────────────────────────────────────────────────
function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="book" className="relative py-[clamp(4rem,10vw,8rem)] overflow-hidden" style={{ background: "var(--color-primary)", color: "var(--color-text-inverse)" }}>
      {/* Decorative circles */}
      <div className="absolute rounded-full pointer-events-none" style={{ top: "-25%", right: "-5%", width: 500, height: 500, background: "rgba(255,255,255,0.04)" }} />
      <div className="absolute rounded-full pointer-events-none" style={{ bottom: "-30%", left: "-3%", width: 350, height: 350, background: "rgba(255,255,255,0.03)" }} />

      <div className="container relative z-10">
        {/* Urgency */}
        <div className="flex items-center gap-3 rounded-lg px-6 py-4 mb-8 text-sm" style={{ background: "rgba(255,255,255,0.1)" }}>
          <Icon name="Clock" size={18} style={{ opacity: 0.8 }} />
          <span style={{ opacity: 0.9 }}>⚡ <strong>Июль и август заполняются к маю.</strong> Не выбирайте из остатков — забронируйте сейчас.</span>
        </div>

        <span className="text-xs uppercase tracking-wider mb-4 block opacity-70">Бронирование</span>
        <h2 className="font-display mb-4" style={{ fontSize: "clamp(2rem,1.2rem+2.5vw,3.5rem)", color: "#fff" }}>
          Лето 2026 бронируют уже сейчас
        </h2>
        <p className="mb-10 opacity-80" style={{ maxWidth: "52ch", fontSize: "clamp(1rem,0.95rem+0.25vw,1.125rem)" }}>
          Оставьте заявку — мы свяжемся в течение 30 минут и подберём лучший вариант под ваши даты.
        </p>

        {!submitted ? (
          <>
            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4"
            >
              {[
                { label: "Ваше имя", id: "name", type: "text", placeholder: "Иван Иванов", autocomplete: "name" },
                { label: "Телефон / WhatsApp", id: "phone", type: "tel", placeholder: "+7 (___) ___-__-__", autocomplete: "tel" },
                { label: "Даты заезда", id: "dates", type: "text", placeholder: "Июль, 2 ночи, 2 чел.", autocomplete: "off" },
              ].map(f => (
                <div key={f.id} className="flex flex-col gap-2">
                  <label htmlFor={f.id} className="text-xs uppercase tracking-wider opacity-80">{f.label}</label>
                  <input
                    id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} autoComplete={f.autocomplete}
                    className="rounded-lg px-4 py-3 text-sm font-body outline-none transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)", color: "#fff" }}
                    onFocus={e => { e.target.style.borderColor = "rgba(255,255,255,0.6)"; e.target.style.background = "rgba(255,255,255,0.18)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.background = "rgba(255,255,255,0.12)"; }}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider opacity-0 select-none">–</span>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={{ background: "var(--color-accent)", color: "#fff", height: "46px" }}
                >
                  <Icon name="CalendarCheck" size={18} />
                  Проверить даты
                </button>
              </div>
            </form>
            <p className="text-xs opacity-60">🔒 Без предоплаты. Отмена за 72 часа — бесплатно. Ваши данные защищены.</p>
          </>
        ) : (
          <div className="flex items-center gap-4 rounded-xl px-6 py-5" style={{ background: "rgba(255,255,255,0.15)", maxWidth: "480px" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.2)" }}>
              <Icon name="Check" size={20} />
            </div>
            <div>
              <div className="font-semibold mb-1">Заявка отправлена!</div>
              <div className="text-sm opacity-80">Свяжемся с вами в течение 30 минут.</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contacts" className="py-12" style={{ background: "var(--color-surface-offset-2)", borderTop: "1px solid var(--color-divider)" }}>
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 600, color: "var(--color-text)" }}>
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" style={{ color: "var(--color-primary)" }}>
                <path d="M16 4 L26 24 L6 24 Z" fill="currentColor" opacity="0.9"/>
                <path d="M16 10 L22 22 L10 22 Z" fill="var(--color-bg)" opacity="0.6"/>
                <rect x="14" y="24" width="4" height="5" fill="currentColor" opacity="0.6"/>
                <path d="M3 27 Q8 22 16 24 Q24 22 29 27" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
              </svg>
              Лесной берег
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)", maxWidth: "26ch" }}>
              База отдыха у озера. Работаем с июня по октябрь.
            </p>
            <div className="flex gap-3">
              {[
                { label: "Instagram", icon: "Instagram" },
                { label: "Telegram",  icon: "Send"      },
                { label: "VK",        icon: "Users"     },
              ].map(s => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: "var(--color-surface)", color: "var(--color-text-muted)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-primary-highlight)"; (e.currentTarget as HTMLElement).style.color = "var(--color-primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--color-surface)"; (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
                >
                  <Icon name={s.icon} fallback="Link" size={15} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Навигация", links: [["Услуги и активности","#services"],["Отзывы гостей","#reviews"],["Пакеты и цены","#pricing"],["Забронировать","#book"]] },
            { title: "Информация", links: [["Правила проживания","#"],["Программа лояльности","#"],["Корпоративным клиентам","#"],["Как добраться","#"]] },
            { title: "Контакты", links: [["8 800 123-45-67","tel:+78001234567"],["WhatsApp","https://wa.me/78001234567"],["info@lesnoybereg.ru","mailto:info@lesnoybereg.ru"],["📍 120 км от Москвы","#"]] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold mb-4" style={{ color: "var(--color-text)" }}>{col.title}</h4>
              <ul className="flex flex-col gap-2">
                {col.links.map(([text, href]) => (
                  <li key={text}>
                    <a href={href} className="text-sm transition-colors duration-150" style={{ color: "var(--color-text-muted)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"; }}
                    >{text}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderTop: "1px solid var(--color-divider)" }}>
          <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>© 2026 База отдыха «Лесной берег». Все права защищены.</p>
          <p className="text-xs" style={{ color: "var(--color-text-faint)" }}>Открыто: июнь — октябрь</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function Index() {
  // Global reveal init (for any .reveal elements not covered by hooks)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-body" style={{ background: "var(--color-bg)", color: "var(--color-text)" }}>
      <Navbar />
      <HeroSection />
      <PainSection />
      <ServicesSection />
      <FoodSection />
      <ReviewsSection />
      <PricingSection />
      <LoyaltySection />
      <BookingSection />
      <Footer />
    </div>
  );
}

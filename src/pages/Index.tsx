import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_BG =
  "https://cdn.poehali.dev/projects/7d2c111f-b9ac-4dd7-8b78-b9873fca0844/files/85facba2-161d-4791-9331-692c89649e1d.jpg";

// ─── Theme ─────────────────────────────────────────────────────────────────
function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.getAttribute("data-theme") === "dark"
  );
  const toggle = () =>
    setDark((d) => {
      const next = !d;
      document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
      return next;
    });
  return { dark, toggle };
}

// ─── Reveal hook ────────────────────────────────────────────────────────────
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

// ─── NAV ────────────────────────────────────────────────────────────────────
function Nav() {
  const { dark, toggle } = useTheme();
  const [showCta, setShowCta] = useState(false);

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

  const SunIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
  const MoonIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );

  return (
    <nav className="nav" role="navigation" aria-label="Главное меню">
      <div className="nav__inner">
        <a href="#" className="nav__logo" aria-label="База отдыха Лесной берег — на главную">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M16 4 L26 24 L6 24 Z" fill="currentColor" opacity="0.9"/>
            <path d="M16 10 L22 22 L10 22 Z" fill="var(--color-bg)" opacity="0.6"/>
            <rect x="14" y="24" width="4" height="5" fill="currentColor" opacity="0.6"/>
            <path d="M3 27 Q8 22 16 24 Q24 22 29 27" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
          </svg>
          Лесной берег
        </a>
        <ul className="nav__links" role="list">
          <li><a href="#services">Услуги</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#pricing">Пакеты</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>
        <div className="nav__right">
          {showCta && (
            <a href="#book" className="btn btn--primary" style={{ display: "inline-flex" }}>
              Забронировать
            </a>
          )}
          <button
            className="nav__toggle"
            onClick={toggle}
            aria-label={`Переключить на ${dark ? "светлую" : "тёмную"} тему`}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero" aria-label="Главный экран">
      <div
        className="hero__bg"
        role="img"
        aria-label="Лес у озера на рассвете"
        style={{ backgroundImage: `url('${HERO_BG}')` }}
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__badge">
          <span aria-hidden="true" />
          Открыто с июня по октябрь 2026
        </div>
        <h1 className="hero__title">
          Настоящий отдых<br />начинается <em>здесь</em>
        </h1>
        <p className="hero__sub">
          Вода, лес и тишина — всего в 120 км от города. База отдыха у озера для тех, кто хочет выдохнуть по-настоящему.
        </p>
        <p className="hero__meta">
          🏡 Домики у воды &nbsp;·&nbsp; 🎣 Рыбалка &nbsp;·&nbsp; 🛶 Лодки &nbsp;·&nbsp; 🔥 Баня &nbsp;·&nbsp;{" "}
          <strong>от 4 500 ₽/сутки</strong>
        </p>
        <div id="hero-cta" className="hero__cta">
          <a href="#book" className="btn btn--primary btn--lg">Проверить свободные даты</a>
          <a href="#services" className="btn btn--ghost btn--lg">Смотреть, что есть</a>
        </div>
        <div className="hero__stats" role="list">
          {[
            ["1 200+", "гостей за сезон"],
            ["38%",    "возвращаются снова"],
            ["4.9 ⭐", "средний рейтинг"],
            ["7 лет",  "на рынке"],
          ].map(([num, label]) => (
            <div key={label} className="hero__stat" role="listitem">
              <div className="hero__stat-num">{num}</div>
              <div className="hero__stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
        <span>листать</span>
      </div>
    </section>
  );
}

// ─── PAIN ────────────────────────────────────────────────────────────────────
function Pain() {
  const imgRef = useReveal();
  return (
    <section className="pain" aria-labelledby="pain-title">
      <div className="container">
        <div className="pain__inner">
          <div>
            <p className="pain__label" aria-hidden="true">Почему мы</p>
            <h2 className="pain__title" id="pain-title">
              Когда вы в последний раз просыпались без будильника?
            </h2>
            <p className="pain__text">
              Город забирает энергию незаметно. Пробки, дедлайны, телефон, который не замолкает.
              Мы создали место, где всё это остаётся за воротами.
            </p>
            <ul className="pain__list" role="list">
              {[
                ["Wind",    "Воздух, который не пахнет выхлопами"],
                ["Waves",   "Вода в двух шагах от вашего домика"],
                ["BellOff", "Зона без уведомлений — по вашему желанию"],
                ["Sun",     "Закаты на пирсе с кружкой чая в руке"],
              ].map(([icon, text]) => (
                <li key={text}>
                  <div className="icon-wrap" aria-hidden="true">
                    <Icon name={icon} fallback="Leaf" size={18} />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div ref={imgRef} className="pain__image reveal">
            <img
              src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&h=750&fit=crop&q=80"
              alt="Уютный домик у озера вечером"
              width="600" height="750" loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ───────────────────────────────────────────────────────────────
function Services() {
  const headRef = useReveal();
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <div className="container--wide">
        <div ref={headRef} className="services__head reveal">
          <span className="section-label" aria-hidden="true">На территории базы</span>
          <h2 className="section-title" id="services-title">Чем заняться на базе</h2>
          <p className="section-sub">
            Всё необходимое — на одной территории. Для тех, кто приехал отдохнуть, а не организовывать логистику.
          </p>
        </div>
        <div className="services__grid">
          <ServiceCard wide imgSeed="lake-kayak-summer" imgW={900} imgH={380} icon="Sailboat" title="Активности на воде"
            text="SUP-бординг, каяки, рыбалка с пирса и с лодки, катамараны. Всё снаряжение включено в стоимость."
            tags={["🏄 SUP-борды","🛶 Каяки","🎣 Рыбалка","⛵ Катамараны"]}
            delay={0}
          />
          <ServiceCard imgSeed="sauna-wood-candles" imgW={600} imgH={337} icon="Flame" title="Баня и релакс"
            text="Русская баня у воды, фурако-купели, массаж. Бронируйте заранее — места заканчиваются к пятнице."
            tags={["🔥 Баня","🛁 Фурако","💆 Массаж"]}
            delay={0.1}
          />
          <ServiceCard imgSeed="forest-bike-trail" imgW={600} imgH={337} icon="Bike" title="Прогулки и маршруты"
            text="Велосипеды в прокат, пешие маршруты по лесу, скандинавская ходьба. Инструктор — по запросу."
            tags={["🚴 Велосипеды","🥾 Треккинг"]}
            delay={0.1}
          />
          <ServiceCard icon="Users" title="Семейный отдых"
            text="Детская площадка, анимация для детей, контактный мини-зоопарк. Pet-friendly — питомцы приветствуются."
            tags={["🎠 Анимация","🐾 Pet-friendly","🦔 Мини-зоопарк"]}
            delay={0.2}
          />
          <ServiceCard icon="Briefcase" title="Корпоративный отдых"
            text="Конференц-зал на 30 человек, тимбилдинги, банкетное пространство. Отдельные условия для групп от 10 чел."
            tags={["🏆 Тимбилдинг","📊 Конференции"]}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  wide?: boolean;
  imgSeed?: string;
  imgW?: number;
  imgH?: number;
  icon: string;
  title: string;
  text: string;
  tags: string[];
  delay: number;
}

function ServiceCard({ wide, imgSeed, imgW, imgH, icon, title, text, tags, delay }: ServiceCardProps) {
  const ref = useReveal();
  const IMG_MAP: Record<string, string> = {
    "lake-kayak-summer": "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=900&h=380&fit=crop&q=80",
    "sauna-wood-candles": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=337&fit=crop&q=80",
    "forest-bike-trail": "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&h=337&fit=crop&q=80",
  };
  return (
    <div
      ref={ref}
      className={`service-card reveal ${wide ? "service-card--wide" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {imgSeed && (
        <img
          className="service-card__img"
          src={IMG_MAP[imgSeed] ?? `https://picsum.photos/seed/${imgSeed}/${imgW}/${imgH}`}
          alt={title}
          width={imgW} height={imgH} loading="lazy"
        />
      )}
      <div className="service-card__icon" aria-hidden="true">
        <Icon name={icon} fallback="Star" size={22} />
      </div>
      <h3 className="service-card__title">{title}</h3>
      <p className="service-card__text">{text}</p>
      <div className="service-card__tags" role="list">
        {tags.map(t => <span key={t} className="tag" role="listitem">{t}</span>)}
      </div>
    </div>
  );
}

// ─── FOOD ────────────────────────────────────────────────────────────────────
function Food() {
  const imgRef = useReveal();
  const contentRef = useReveal();
  return (
    <section className="food" aria-labelledby="food-title">
      <div className="container">
        <div className="food__inner">
          <div ref={imgRef} className="food__image reveal">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=750&fit=crop&q=80"
              alt="Ужин на свежем воздухе с местными блюдами"
              width="600" height="750" loading="lazy"
            />
          </div>
          <div ref={contentRef} className="food__content reveal">
            <span className="section-label" aria-hidden="true">Гастрономия</span>
            <h2 className="food__title" id="food-title">Кормим как дома. Только вкуснее.</h2>
            <p className="food__text">
              Наша кухня работает на местных продуктах — рыба из озера, зелень с грядки, молочное от соседних фермеров.
              Завтраки включены в стоимость размещения. Ужины — по авторскому меню с живой рыбой.
            </p>
            <div className="food__highlight">
              <p>По <strong>субботам — открытый мангал</strong> и мастер-класс от шеф-повара. Готовим вместе, едим вместе. Приходите с аппетитом.</p>
            </div>
            <ul className="pain__list" role="list">
              {[
                ["ChefHat", "Авторское меню с сезонными продуктами"],
                ["Fish",    "Своя рыба из озера — готовим по вашему заказу"],
                ["Coffee",  "Завтраки включены во все тарифы"],
              ].map(([icon, text]) => (
                <li key={text}>
                  <div className="icon-wrap" aria-hidden="true">
                    <Icon name={icon} fallback="Leaf" size={18} />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ────────────────────────────────────────────────────────────────
const REVIEWS = [
  { init: "М", name: "Марина К.",         city: "Москва",              text: "«Мы уже третий год подряд. Дети не хотят уезжать, муж тоже. Баня у воды — отдельная любовь. Каждый раз что-то новое, интересное.»", delay: 0 },
  { init: "А", name: "Александр и Ирина", city: "Санкт-Петербург",     text: "«Взяли домик для двоих на годовщину. Встретили закат с вином на пирсе — это было магически. Уже едем в сентябре.»",            delay: 0.1 },
  { init: "А", name: "Алексей Р.",        city: "HR-директор, Тверь",  text: "«Брали корпус для корпоратива на 18 человек. Команда до сих пор вспоминает. Уже думаем над следующим летом.»",                   delay: 0.2 },
];

function Reviews() {
  const headRef = useReveal();
  const statsRef = useReveal();
  return (
    <section className="testimonials" id="reviews" aria-labelledby="reviews-title">
      <div className="container--wide">
        <div ref={headRef} className="testimonials__head reveal">
          <span className="section-label" aria-hidden="true">Отзывы гостей</span>
          <h2 className="section-title" id="reviews-title">
            Те, кто приехал один раз — приезжают каждый сезон
          </h2>
        </div>
        <div className="reviews__grid">
          {REVIEWS.map((r) => <ReviewCard key={r.name} r={r} />)}
        </div>
        <div ref={statsRef} className="stats-row reveal">
          {[
            ["1 200+", "гостей за сезон 2025"],
            ["38%",    "возвращаются снова"],
            ["4.9 / 5","рейтинг на 101Hotels"],
          ].map(([num, label]) => (
            <div key={label} className="stat-card">
              <div className="stat-card__num">{num}</div>
              <div className="stat-card__label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r }: { r: typeof REVIEWS[0] }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="review-card reveal" style={{ transitionDelay: `${r.delay}s` }}>
      <div className="review-stars" aria-label="5 из 5 звёзд">
        {[...Array(5)].map((_, i) => (
          <Icon key={i} name="Star" size={16} style={{ fill: "currentColor" }} />
        ))}
      </div>
      <p className="review-text">{r.text}</p>
      <div className="review-author">
        <div className="review-avatar">{r.init}</div>
        <div>
          <div className="review-name">{r.name}</div>
          <div className="review-city">{r.city}</div>
        </div>
      </div>
    </article>
  );
}

// ─── PRICING ────────────────────────────────────────────────────────────────
const TARIFFS = [
  {
    emoji: "🌿", name: "Тихий", desc: "Для двоих. Домик у леса, покой и природа.", price: "от 4 500 ₽", unit: "/ ночь",
    features: ["Уютный домик у леса","Завтрак включён","Баня по записи","Рыбалка, лодки","Бесплатная парковка"],
    featured: false, delay: 0,
  },
  {
    emoji: "👨‍👩‍👧", name: "Семейный", desc: "Для 2–4 человек. Коттедж с верандой, всё для детей.", price: "от 7 200 ₽", unit: "/ ночь",
    features: ["Коттедж с верандой у воды","Завтрак + ужин включены","Детская площадка, аниматор","Баня 2 часа в день","Pet-friendly","SUP + каяк включены"],
    featured: true, delay: 0.1,
  },
  {
    emoji: "💑", name: "Романтика", desc: "Для двоих. Домик у воды, приватность и атмосфера.", price: "от 6 500 ₽", unit: "/ ночь",
    features: ["Домик у воды — приватный","Завтрак + корзина с вином","Приватный пирс","Фурако-купель","Велосипеды в подарок"],
    featured: false, delay: 0.2,
  },
];

function Pricing() {
  const headRef = useReveal();
  return (
    <section className="pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="container--wide">
        <div ref={headRef} className="pricing__head reveal">
          <span className="section-label" aria-hidden="true">Пакеты и цены</span>
          <h2 className="section-title" id="pricing-title">Выберите свой формат отдыха</h2>
          <p className="section-sub">Минимальный срок — 2 ночи. Стоимость указана за сутки для 2 взрослых.</p>
        </div>
        <div className="pricing__grid">
          {TARIFFS.map((t) => <TariffCard key={t.name} t={t} />)}
        </div>
        <p style={{ textAlign: "center", fontSize: "var(--text-sm)", color: "var(--color-text-muted)" }}>
          Отмена бронирования за 72 часа — бесплатно. Без скрытых платежей.
        </p>
      </div>
    </section>
  );
}

function TariffCard({ t }: { t: typeof TARIFFS[0] }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`price-card reveal ${t.featured ? "price-card--featured" : ""}`}
      style={{ transitionDelay: `${t.delay}s` }}
    >
      {t.featured && <div className="price-card__badge">Популярный</div>}
      <div className="price-card__emoji" aria-hidden="true">{t.emoji}</div>
      <div className="price-card__name">{t.name}</div>
      <div className="price-card__desc">{t.desc}</div>
      <ul className="price-card__features" role="list">
        {t.features.map((f) => (
          <li key={f}>
            <Icon name="Check" size={16} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <div className="price-card__price">
        {t.price} <span>{t.unit}</span>
      </div>
      <a href="#book" className={`btn ${t.featured ? "btn--primary" : "btn--outline"}`}>
        Выбрать
      </a>
    </div>
  );
}

// ─── LOYALTY ────────────────────────────────────────────────────────────────
const LOYALTY_STEPS = [
  { n: "1", title: "Копите баллы",                      text: "1 ночь = 50 баллов. Баллы за отзыв (+10), за баню (+20), за приведённого друга (+15). Тратьте на скидку при следующем визите.", delay: 0 },
  { n: "2", title: "Приведи друга — получи 10%",        text: "Друг бронирует по вашей рекомендации — вы оба получаете 10% скидку на следующий визит.",                                         delay: 0.1 },
  { n: "3", title: "С 3-го визита — статус «Свой гость»",text: "Приоритетное бронирование горячих дат, персональное меню, сюрприз при заезде и персональный менеджер.",                       delay: 0.2 },
];
const LOYALTY_BADGES = [
  { icon: "🏅", hl: "Приоритет бронирования",  text: " — первыми видите свободные даты" },
  { icon: "🎁", hl: "Сюрприз при заезде",       text: " — каждый раз новый" },
  { icon: "🍽️", hl: "Персональное меню",         text: " — мы помним ваши предпочтения" },
  { icon: "📞", hl: "Персональный менеджер",     text: " — один звонок, всё готово" },
  { icon: "🎪", hl: "Закрытые события",           text: " — дегустации, ретриты, воркшопы" },
];

function Loyalty() {
  const cardRef = useReveal();
  return (
    <section className="loyalty" aria-labelledby="loyalty-title">
      <div className="container">
        <div className="loyalty__inner">
          <div>
            <span className="section-label" aria-hidden="true">Программа лояльности</span>
            <h2 className="loyalty__title" id="loyalty-title">
              Наши гости копят баллы и приезжают снова
            </h2>
            <p className="loyalty__text">
              Каждый визит делает следующий выгоднее. Мы помним своих гостей и ценим их выбор.
            </p>
            <div className="loyalty-steps" role="list">
              {LOYALTY_STEPS.map((s) => (
                <LoyaltyStep key={s.n} s={s} />
              ))}
            </div>
          </div>
          <div ref={cardRef} className="loyalty-card reveal">
            <div className="loyalty-card__label">Привилегии постоянного гостя</div>
            <div className="loyalty-card__title">«Свой гость» — что это даёт</div>
            <div className="loyalty-badges" role="list">
              {LOYALTY_BADGES.map((b) => (
                <div key={b.hl} className="loyalty-badge" role="listitem">
                  <span className="loyalty-badge__icon" aria-hidden="true">{b.icon}</span>
                  <div className="loyalty-badge__text">
                    <span className="loyalty-badge__highlight">{b.hl}</span>
                    {b.text}
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

function LoyaltyStep({ s }: { s: typeof LOYALTY_STEPS[0] }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="loyalty-step reveal" role="listitem" style={{ transitionDelay: `${s.delay}s` }}>
      <div className="loyalty-step__num" aria-hidden="true">{s.n}</div>
      <div className="loyalty-step__body">
        <div className="loyalty-step__title">{s.title}</div>
        <div className="loyalty-step__text">{s.text}</div>
      </div>
    </div>
  );
}

// ─── CTA / BOOKING ──────────────────────────────────────────────────────────
function CtaForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="btn btn--primary btn--lg" style={{ gap: "0.5rem", opacity: 1, cursor: "default", maxWidth: 360 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        Заявка отправлена!
      </div>
    );
  }

  return (
    <form
      className="cta-form"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      aria-label="Форма бронирования"
    >
      <div className="cta-form__field">
        <label className="cta-form__label" htmlFor="f-name">Ваше имя</label>
        <input className="cta-form__input" type="text" id="f-name" name="name" placeholder="Иван Иванов" autoComplete="name" required />
      </div>
      <div className="cta-form__field">
        <label className="cta-form__label" htmlFor="f-phone">Телефон / WhatsApp</label>
        <input className="cta-form__input" type="tel" id="f-phone" name="phone" placeholder="+7 (___) ___-__-__" autoComplete="tel" required />
      </div>
      <div className="cta-form__field">
        <label className="cta-form__label" htmlFor="f-dates">Даты заезда</label>
        <input className="cta-form__input" type="text" id="f-dates" name="dates" placeholder="Июль, 2 ночи, 2 чел." />
      </div>
      <div className="cta-form__submit">
        <button type="submit" className="btn btn--accent btn--lg" style={{ width: "100%", height: "52px" }}>
          <Icon name="CalendarCheck" size={18} aria-hidden="true" />
          Проверить даты
        </button>
      </div>
    </form>
  );
}

function Cta() {
  return (
    <section className="cta-section" id="book" aria-labelledby="cta-title">
      <div className="container cta-section__inner">
        <div className="urgency-bar" role="alert">
          <Icon name="Clock" size={18} aria-hidden="true" />
          <span>⚡ <strong>Июль и август заполняются к маю.</strong> Не выбирайте из остатков — забронируйте сейчас.</span>
        </div>
        <span className="cta-section__label" aria-hidden="true">Бронирование</span>
        <h2 className="cta-section__title" id="cta-title">Лето 2026 бронируют уже сейчас</h2>
        <p className="cta-section__sub">
          Оставьте заявку — мы свяжемся в течение 30 минут и подберём лучший вариант под ваши даты.
        </p>
        <CtaForm />
        <p className="cta-form__note">🔒 Без предоплаты. Отмена за 72 часа — бесплатно. Ваши данные защищены.</p>
      </div>
    </section>
  );
}

// ─── FOOTER ─────────────────────────────────────────────────────────────────
function Footer() {
  const SOCIAL = [
    {
      label: "Instagram",
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/></svg>,
    },
    {
      label: "ВКонтакте",
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 12.5h-1.5c-.6 0-.8-.3-1.4-1-.4-.5-.8-1-1.1-1v2H11V9.5h1.5v2c.3 0 .8-.5 1.2-1 .5-.6.7-1 1.3-1h1.5c-.6.8-1.3 1.5-1.9 2.1.7.8 1.7 1.9 1.9 2.4z"/></svg>,
    },
    {
      label: "Telegram",
      svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.7 8c-.1.5-.5.6-.9.4l-2.5-1.8-1.2 1.1c-.1.1-.3.2-.6.2l.2-2.6 4.8-4.3c.2-.2 0-.3-.3-.1L7.5 14.3 5 13.5c-.5-.2-.5-.5.1-.7l9-3.5c.5-.2.9.1.8.5z"/></svg>,
    },
  ];

  return (
    <footer id="contacts" aria-label="Контакты и навигация">
      <div className="container--wide">
        <div className="footer__inner">
          <div className="footer__brand">
            <a href="#" className="nav__logo" style={{ fontSize: "var(--text-lg)" }} aria-label="База отдыха Лесной берег">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ color: "var(--color-primary)" }}>
                <path d="M16 4 L26 24 L6 24 Z" fill="currentColor" opacity="0.9"/>
                <path d="M16 10 L22 22 L10 22 Z" fill="var(--color-bg)" opacity="0.6"/>
                <rect x="14" y="24" width="4" height="5" fill="currentColor" opacity="0.6"/>
                <path d="M3 27 Q8 22 16 24 Q24 22 29 27" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
              </svg>
              Лесной берег
            </a>
            <p>База отдыха у озера. Работаем с июня по октябрь. Вода, лес и тишина в 120 км от города.</p>
            <div className="social-links" aria-label="Социальные сети">
              {SOCIAL.map(s => (
                <a key={s.label} href="#" className="social-link" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h4>Навигация</h4>
            <ul role="list">
              <li><a href="#services">Услуги и активности</a></li>
              <li><a href="#reviews">Отзывы гостей</a></li>
              <li><a href="#pricing">Пакеты и цены</a></li>
              <li><a href="#book">Забронировать</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Информация</h4>
            <ul role="list">
              <li><a href="#">Правила проживания</a></li>
              <li><a href="#">Программа лояльности</a></li>
              <li><a href="#">Корпоративным клиентам</a></li>
              <li><a href="#">Как добраться</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Контакты</h4>
            <ul role="list">
              <li><a href="tel:+78001234567">8 800 123-45-67</a></li>
              <li><a href="https://wa.me/78001234567" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href="mailto:info@lesnoybereg.ru">info@lesnoybereg.ru</a></li>
              <li><a href="#">📍 120 км от Москвы</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 База отдыха «Лесной берег». Все права защищены.</p>
          <p>Открыто: июнь — октябрь</p>
        </div>
      </div>
    </footer>
  );
}

// ─── CSS (injected once) ────────────────────────────────────────────────────
const CSS = `
.nav{position:fixed;top:0;left:0;right:0;z-index:100;height:72px;display:flex;align-items:center;background:color-mix(in srgb,var(--color-bg) 88%,transparent);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border-bottom:1px solid color-mix(in srgb,var(--color-text) 7%,transparent);transition:background 180ms cubic-bezier(0.16,1,0.3,1)}
.nav__inner{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1200px;margin-inline:auto;padding-inline:1.5rem}
.nav__logo{display:flex;align-items:center;gap:.75rem;font-family:var(--font-display);font-size:clamp(1.125rem,1rem + .75vw,1.5rem);font-weight:600;color:var(--color-text);text-decoration:none}
.nav__logo svg{color:var(--color-primary)}
.nav__links{display:flex;align-items:center;gap:2rem;list-style:none}
.nav__links a{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);text-decoration:none;transition:color 180ms}
.nav__links a:hover{color:var(--color-text)}
.nav__right{display:flex;align-items:center;gap:1rem}
.nav__toggle{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:.5rem;color:var(--color-text-muted);background:none;border:none;cursor:pointer;transition:background 180ms,color 180ms}
.nav__toggle:hover{background:var(--color-surface-offset);color:var(--color-text)}

.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border-radius:9999px;font-size:clamp(.875rem,.8rem + .35vw,1rem);font-weight:600;font-family:var(--font-body);transition:background 180ms,color 180ms,transform 180ms,box-shadow 180ms;white-space:nowrap;cursor:pointer;border:none;text-decoration:none}
.btn--primary{background:var(--color-primary);color:var(--color-text-inverse)}
.btn--primary:hover{background:var(--color-primary-hover);transform:translateY(-1px);box-shadow:0 4px 16px rgba(30,34,24,.1)}
.btn--outline{background:transparent;color:var(--color-text);border:1.5px solid color-mix(in srgb,var(--color-text) 20%,transparent)}
.btn--outline:hover{background:var(--color-surface-offset);border-color:color-mix(in srgb,var(--color-text) 35%,transparent)}
.btn--ghost{background:rgba(255,255,255,.15);color:#fff;border:1.5px solid rgba(255,255,255,.3);backdrop-filter:blur(8px)}
.btn--ghost:hover{background:rgba(255,255,255,.25)}
.btn--accent{background:var(--color-accent);color:#fff}
.btn--accent:hover{background:var(--color-accent-hover);transform:translateY(-1px);box-shadow:0 4px 16px rgba(30,34,24,.1)}
.btn--lg{padding:1rem 2rem;font-size:clamp(1rem,.95rem + .25vw,1.125rem)}

.hero{position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;padding-block:clamp(5rem,15vw,8rem);padding-top:calc(72px + clamp(4rem,12vw,6rem))}
.hero__bg{position:absolute;inset:0;z-index:0;background-size:cover;background-position:center}
.hero__overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(18,21,16,.65) 0%,rgba(18,21,16,.35) 60%,rgba(18,21,16,.5) 100%)}
.hero__content{position:relative;z-index:2;max-width:820px;padding-inline:1rem}
.hero__badge{display:inline-flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.15);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.25);border-radius:9999px;padding:.5rem 1rem;font-size:clamp(.75rem,.7rem + .25vw,.875rem);color:rgba(255,255,255,.9);margin-bottom:1.5rem;letter-spacing:.05em;text-transform:uppercase}
.hero__badge span{width:6px;height:6px;border-radius:50%;background:#7ddc6b;display:inline-block;animation:pulse-dot 2s ease-in-out infinite}
@keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.6;transform:scale(1.3)}}
.hero__title{font-family:var(--font-display);font-size:clamp(3rem,.5rem + 7vw,7.5rem);font-weight:600;color:#fff;line-height:1.05;margin-bottom:1.5rem;text-shadow:0 2px 24px rgba(0,0,0,.3)}
.hero__title em{font-style:italic;color:#a8e094}
.hero__sub{font-size:clamp(1.125rem,1rem + .75vw,1.5rem);color:rgba(255,255,255,.82);max-width:58ch;margin-inline:auto;margin-bottom:1rem;font-weight:300}
.hero__meta{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:rgba(255,255,255,.6);margin-bottom:2rem}
.hero__meta strong{color:rgba(255,255,255,.9)}
.hero__cta{display:flex;flex-wrap:wrap;gap:.75rem;justify-content:center;margin-bottom:3rem}
.hero__stats{display:flex;flex-wrap:wrap;gap:1.5rem;justify-content:center}
.hero__stat{text-align:center}
.hero__stat-num{font-family:var(--font-display);font-size:clamp(1.5rem,1.2rem + 1.25vw,2.25rem);font-weight:700;color:#fff;line-height:1}
.hero__stat-label{font-size:clamp(.75rem,.7rem + .25vw,.875rem);color:rgba(255,255,255,.6);margin-top:.25rem}
.hero__scroll{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);z-index:2;display:flex;flex-direction:column;align-items:center;gap:.5rem;color:rgba(255,255,255,.5);font-size:clamp(.75rem,.7rem + .25vw,.875rem);animation:bounce-scroll 2.5s ease-in-out infinite}
@keyframes bounce-scroll{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(6px)}}

.container{max-width:960px;margin-inline:auto;padding-inline:1.5rem}
.container--wide{max-width:1200px;margin-inline:auto;padding-inline:1.5rem}
section{padding-block:clamp(3rem,8vw,6rem)}

.pain{background:var(--color-surface-offset)}
.pain__inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.pain__label{font-size:clamp(.75rem,.7rem + .25vw,.875rem);text-transform:uppercase;letter-spacing:.1em;color:var(--color-primary);font-weight:600;margin-bottom:1rem}
.pain__title{font-family:var(--font-display);font-size:clamp(2rem,1.2rem + 2.5vw,3.5rem);color:var(--color-text);margin-bottom:1.5rem}
.pain__text{font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text-muted);line-height:1.75;margin-bottom:1.5rem;max-width:50ch}
.pain__list{list-style:none;display:flex;flex-direction:column;gap:.75rem}
.pain__list li{display:flex;align-items:center;gap:.75rem;font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text)}
.icon-wrap{width:36px;height:36px;border-radius:.5rem;background:var(--color-primary-highlight);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:var(--color-primary)}
.pain__image{border-radius:1.5rem;overflow:hidden;box-shadow:0 12px 40px rgba(30,34,24,.14);aspect-ratio:4/5}
.pain__image img{width:100%;height:100%;object-fit:cover}

.services__head{text-align:center;margin-bottom:3rem}
.section-label{font-size:clamp(.75rem,.7rem + .25vw,.875rem);text-transform:uppercase;letter-spacing:.1em;color:var(--color-primary);font-weight:600;margin-bottom:.75rem;display:block}
.section-title{font-family:var(--font-display);font-size:clamp(2rem,1.2rem + 2.5vw,3.5rem);color:var(--color-text);margin-bottom:1rem}
.section-sub{font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text-muted);max-width:52ch;margin-inline:auto}
.services__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.service-card{background:var(--color-surface);border:1px solid color-mix(in srgb,var(--color-text) 7%,transparent);border-radius:1rem;padding:1.5rem;overflow:hidden;transition:transform 180ms cubic-bezier(0.16,1,0.3,1),box-shadow 180ms}
.service-card:hover{transform:translateY(-3px);box-shadow:0 4px 16px rgba(30,34,24,.1)}
.service-card--wide{grid-column:span 2}
.service-card__img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:.75rem;margin-bottom:1rem;display:block}
.service-card--wide .service-card__img{aspect-ratio:21/9}
.service-card__icon{width:44px;height:44px;border-radius:.75rem;background:var(--color-primary-highlight);display:flex;align-items:center;justify-content:center;color:var(--color-primary);margin-bottom:1rem}
.service-card__title{font-family:var(--font-display);font-size:clamp(1.5rem,1.2rem + 1.25vw,2.25rem);color:var(--color-text);margin-bottom:.5rem}
.service-card__text{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);line-height:1.65}
.service-card__tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem}
.tag{display:inline-flex;align-items:center;gap:.25rem;background:var(--color-surface-offset);border-radius:9999px;padding:.25rem .75rem;font-size:clamp(.75rem,.7rem + .25vw,.875rem);color:var(--color-text-muted)}

.food{background:var(--color-surface-offset)}
.food__inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
.food__image{border-radius:1.5rem;overflow:hidden;box-shadow:0 12px 40px rgba(30,34,24,.14);aspect-ratio:4/5}
.food__image img{width:100%;height:100%;object-fit:cover}
.food__content{display:flex;flex-direction:column;gap:1.5rem}
.food__title{font-family:var(--font-display);font-size:clamp(2rem,1.2rem + 2.5vw,3.5rem);color:var(--color-text)}
.food__text{font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text-muted);line-height:1.75;max-width:50ch}
.food__highlight{background:var(--color-accent-light);border-left:3px solid var(--color-accent);border-radius:0 .75rem .75rem 0;padding:1rem 1.25rem}
.food__highlight p{font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text)}
.food__highlight strong{color:var(--color-accent)}

.testimonials__head{text-align:center;margin-bottom:2.5rem}
.reviews__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2.5rem}
.review-card{background:var(--color-surface);border:1px solid color-mix(in srgb,var(--color-text) 7%,transparent);border-radius:1rem;padding:1.5rem;transition:box-shadow 180ms}
.review-card:hover{box-shadow:0 4px 16px rgba(30,34,24,.1)}
.review-stars{display:flex;gap:.25rem;margin-bottom:.75rem;color:var(--color-accent)}
.review-text{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);line-height:1.7;margin-bottom:1rem;font-style:italic}
.review-author{display:flex;align-items:center;gap:.75rem}
.review-avatar{width:40px;height:40px;border-radius:9999px;background:var(--color-primary-highlight);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:clamp(1.125rem,1rem + .75vw,1.5rem);color:var(--color-primary);font-weight:600;flex-shrink:0}
.review-name{font-size:clamp(.875rem,.8rem + .35vw,1rem);font-weight:600;color:var(--color-text)}
.review-city{font-size:clamp(.75rem,.7rem + .25vw,.875rem);color:var(--color-text-faint)}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.stat-card{background:var(--color-surface-offset);border-radius:1rem;padding:1.5rem;text-align:center}
.stat-card__num{font-family:var(--font-display);font-size:clamp(2rem,1.2rem + 2.5vw,3.5rem);color:var(--color-primary);font-weight:700;line-height:1;margin-bottom:.5rem}
.stat-card__label{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted)}

.pricing{background:var(--color-surface-offset)}
.pricing__head{text-align:center;margin-bottom:2.5rem}
.pricing__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:2rem}
.price-card{background:var(--color-surface);border:1.5px solid color-mix(in srgb,var(--color-text) 8%,transparent);border-radius:1.5rem;padding:2rem;position:relative;transition:transform 180ms cubic-bezier(0.16,1,0.3,1),box-shadow 180ms;display:flex;flex-direction:column}
.price-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(30,34,24,.14)}
.price-card--featured{border-color:var(--color-primary);background:color-mix(in srgb,var(--color-primary) 5%,var(--color-surface))}
.price-card__badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:var(--color-primary);color:var(--color-text-inverse);font-size:clamp(.75rem,.7rem + .25vw,.875rem);font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:.25rem 1rem;border-radius:9999px;white-space:nowrap}
.price-card__emoji{font-size:2rem;margin-bottom:1rem}
.price-card__name{font-family:var(--font-display);font-size:clamp(1.5rem,1.2rem + 1.25vw,2.25rem);color:var(--color-text);margin-bottom:.5rem}
.price-card__desc{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);margin-bottom:1.5rem}
.price-card__features{list-style:none;display:flex;flex-direction:column;gap:.75rem;margin-bottom:1.5rem;flex:1}
.price-card__features li{display:flex;align-items:center;gap:.5rem;font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text)}
.price-card__features li svg{color:var(--color-primary);flex-shrink:0}
.price-card__price{font-family:var(--font-display);font-size:clamp(1.5rem,1.2rem + 1.25vw,2.25rem);color:var(--color-text);margin-bottom:1rem}
.price-card__price span{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);font-family:var(--font-body);font-weight:400}

.loyalty__inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start}
.loyalty__title{font-family:var(--font-display);font-size:clamp(2rem,1.2rem + 2.5vw,3.5rem);margin-bottom:1rem;color:var(--color-text)}
.loyalty__text{font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text-muted);line-height:1.75;margin-bottom:2rem;max-width:50ch}
.loyalty-steps{display:flex;flex-direction:column}
.loyalty-step{display:flex;gap:1rem;padding:1.25rem 0;border-bottom:1px solid var(--color-divider)}
.loyalty-step:last-child{border-bottom:none}
.loyalty-step__num{width:40px;height:40px;border-radius:9999px;background:var(--color-primary);color:var(--color-text-inverse);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:clamp(1.125rem,1rem + .75vw,1.5rem);font-weight:700;flex-shrink:0}
.loyalty-step__title{font-weight:600;font-size:clamp(1rem,.95rem + .25vw,1.125rem);color:var(--color-text);margin-bottom:.25rem}
.loyalty-step__text{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted)}
.loyalty-card{background:var(--color-primary);border-radius:1.5rem;padding:2rem;color:var(--color-text-inverse)}
.loyalty-card__label{font-size:clamp(.75rem,.7rem + .25vw,.875rem);text-transform:uppercase;letter-spacing:.1em;opacity:.7;margin-bottom:1.5rem}
.loyalty-card__title{font-family:var(--font-display);font-size:clamp(1.5rem,1.2rem + 1.25vw,2.25rem);margin-bottom:1.5rem}
.loyalty-badges{display:flex;flex-direction:column;gap:.75rem}
.loyalty-badge{display:flex;align-items:center;gap:.75rem;background:rgba(255,255,255,.12);border-radius:.75rem;padding:.75rem 1rem}
.loyalty-badge__icon{font-size:1.25rem}
.loyalty-badge__text{font-size:clamp(.875rem,.8rem + .35vw,1rem);opacity:.9}
.loyalty-badge__highlight{font-weight:700;opacity:1}

.cta-section{background:var(--color-primary);color:var(--color-text-inverse);padding-block:clamp(4rem,10vw,8rem);position:relative;overflow:hidden}
.cta-section::before{content:'';position:absolute;top:-50%;right:-10%;width:600px;height:600px;border-radius:50%;background:rgba(255,255,255,.04);pointer-events:none}
.cta-section::after{content:'';position:absolute;bottom:-40%;left:-5%;width:400px;height:400px;border-radius:50%;background:rgba(255,255,255,.03);pointer-events:none}
.cta-section__inner{position:relative;z-index:1}
.cta-section__label{font-size:clamp(.75rem,.7rem + .25vw,.875rem);text-transform:uppercase;letter-spacing:.1em;opacity:.7;margin-bottom:1rem;display:block}
.cta-section__title{font-family:var(--font-display);font-size:clamp(2rem,1.2rem + 2.5vw,3.5rem);margin-bottom:1rem;color:#fff}
.cta-section__sub{font-size:clamp(1rem,.95rem + .25vw,1.125rem);opacity:.8;max-width:52ch;margin-bottom:2.5rem}
.cta-form{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:.75rem}
.cta-form__field{display:flex;flex-direction:column;gap:.5rem}
.cta-form__label{font-size:clamp(.75rem,.7rem + .25vw,.875rem);opacity:.8;text-transform:uppercase;letter-spacing:.05em}
.cta-form__input{background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.2);border-radius:.75rem;padding:.75rem 1rem;font-size:clamp(.875rem,.8rem + .35vw,1rem);color:#fff;font-family:var(--font-body);transition:border-color 180ms,background 180ms;outline:none}
.cta-form__input::placeholder{color:rgba(255,255,255,.45)}
.cta-form__input:focus{border-color:rgba(255,255,255,.6);background:rgba(255,255,255,.18)}
.cta-form__submit{align-self:flex-end}
.cta-form__note{font-size:clamp(.75rem,.7rem + .25vw,.875rem);opacity:.6;margin-top:1rem}
.urgency-bar{background:rgba(255,255,255,.1);border-radius:.75rem;padding:1rem 1.5rem;display:flex;align-items:center;gap:.75rem;margin-bottom:2rem}
.urgency-bar span{font-size:clamp(.875rem,.8rem + .35vw,1rem);opacity:.9}
.urgency-bar strong{opacity:1}

footer{background:var(--color-surface-offset-2);border-top:1px solid var(--color-divider);padding-block:3rem}
.footer__inner{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem}
.footer__brand{display:flex;flex-direction:column;gap:1rem}
.footer__brand p{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);max-width:30ch;line-height:1.65}
.footer__col h4{font-size:clamp(.875rem,.8rem + .35vw,1rem);font-weight:600;color:var(--color-text);margin-bottom:1rem}
.footer__col ul{list-style:none;display:flex;flex-direction:column;gap:.5rem}
.footer__col ul li a{font-size:clamp(.875rem,.8rem + .35vw,1rem);color:var(--color-text-muted);text-decoration:none;transition:color 180ms}
.footer__col ul li a:hover{color:var(--color-text)}
.footer__bottom{margin-top:2.5rem;padding-top:1.5rem;border-top:1px solid var(--color-divider);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}
.footer__bottom p{font-size:clamp(.75rem,.7rem + .25vw,.875rem);color:var(--color-text-faint)}
.social-links{display:flex;gap:.75rem}
.social-link{width:36px;height:36px;border-radius:9999px;background:var(--color-surface);display:flex;align-items:center;justify-content:center;color:var(--color-text-muted);transition:background 180ms,color 180ms;text-decoration:none}
.social-link:hover{background:var(--color-primary-highlight);color:var(--color-primary)}

.reveal{opacity:0;transform:translateY(24px);transition:opacity .6s ease,transform .6s ease}
.reveal.visible{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:.1s}
.reveal-delay-2{transition-delay:.2s}
.reveal-delay-3{transition-delay:.3s}

@media(max-width:768px){
  .nav__links{display:none}
  .pain__inner,.food__inner,.loyalty__inner{grid-template-columns:1fr}
  .pain__image,.food__image{order:-1;aspect-ratio:16/10}
  .services__grid{grid-template-columns:1fr}
  .service-card--wide{grid-column:span 1}
  .reviews__grid,.stats-row,.pricing__grid{grid-template-columns:1fr}
  .cta-form{grid-template-columns:1fr}
  .footer__inner{grid-template-columns:1fr 1fr}
  .hero__stats{gap:1rem}
}
@media(max-width:480px){
  .footer__inner{grid-template-columns:1fr}
  .footer__bottom{flex-direction:column;align-items:flex-start}
}
`;

// ─── ROOT ────────────────────────────────────────────────────────────────────
export default function Index() {
  useEffect(() => {
    // Inject CSS
    if (!document.getElementById("lb-styles")) {
      const style = document.createElement("style");
      style.id = "lb-styles";
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    // Global reveal
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Pain />
        <Services />
        <Food />
        <Reviews />
        <Pricing />
        <Loyalty />
        <Cta />
      </main>
      <Footer />
    </>
  );
}

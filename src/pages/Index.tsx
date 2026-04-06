import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7d2c111f-b9ac-4dd7-8b78-b9873fca0844/files/85facba2-161d-4791-9331-692c89649e1d.jpg";

// ─── Данные ────────────────────────────────────────────────────────────────

const STATS = [
  { value: "120 км", label: "от Москвы" },
  { value: "15 га", label: "лесного парка" },
  { value: "9 лет", label: "принимаем гостей" },
  { value: "4.9 ★", label: "средний рейтинг" },
];

const PAIN_ITEMS = [
  { icon: "Wifi", title: "Без звонков и уведомлений", desc: "Связь слабая — и это прекрасно. Настоящий цифровой детокс среди леса." },
  { icon: "Wind", title: "Чистый воздух и тишина", desc: "Никаких машин, выхлопов и городского шума. Только сосны и вода." },
  { icon: "Users", title: "Для семьи и компании", desc: "Домики для двоих и большие дома до 12 человек. Барбекю и баня включены." },
  { icon: "Zap", title: "Заезжайте в любой день", desc: "Мы открыты с июня по октябрь, 7 дней в неделю. Минимальный заезд — 2 ночи." },
];

const SERVICES = [
  { icon: "Sailboat", title: "Рыбалка и лодки", desc: "Прокат лодок и удочек, карпы и щука — удача обеспечена", price: "от 500 ₽/ч" },
  { icon: "Flame", title: "Баня на дровах", desc: "Настоящая русская баня прямо у воды, веники, купель", price: "от 2 000 ₽/3 ч" },
  { icon: "Waves", title: "Пляж и пирс", desc: "Оборудованный пляж, сетка для волейбола, шезлонги", price: "включено" },
  { icon: "TreePine", title: "Велопрогулки", desc: "Маршруты по лесу, прокат велосипедов для взрослых и детей", price: "от 300 ₽/ч" },
  { icon: "ChefHat", title: "Барбекю и костёр", desc: "Мангальные зоны, дрова, мангал и всё необходимое", price: "включено" },
  { icon: "Baby", title: "Детская площадка", desc: "Безопасная зона с горками, качелями и песочницей", price: "включено" },
];

const FOOD_ITEMS = [
  { emoji: "🍳", title: "Завтрак", time: "08:00 – 10:00", desc: "Каши, яичница, свежая выпечка и домашнее варенье" },
  { emoji: "🥗", title: "Обед", time: "13:00 – 15:00", desc: "Борщ, второе блюдо, салат и компот из лесных ягод" },
  { emoji: "🍖", title: "Ужин", time: "18:00 – 20:00", desc: "Горячее, гриль, свежие овощи с грядки" },
  { emoji: "☕", title: "Кафе весь день", time: "09:00 – 22:00", desc: "Чай, кофе, пироги и снеки в любое время" },
];

const REVIEWS = [
  { name: "Анна К.", stars: 5, date: "Август 2024", text: "Лучший отдых за последние 5 лет! Воздух невероятный, персонал внимательный. Приедем снова уже на следующее лето." },
  { name: "Дмитрий С.", stars: 5, date: "Июль 2024", text: "Отличное место для большой компании. Арендовали большой домик, баня была обалденной. Дети в восторге от пляжа." },
  { name: "Елена М.", stars: 5, date: "Сентябрь 2024", text: "Ехали на 3 дня, остались на неделю. Тишина, чистота, вкусная еда. Муж поймал щуку! Спасибо огромное." },
  { name: "Игорь Р.", stars: 4, date: "Июнь 2024", text: "Замечательное место. Только добавили бы WiFi в домиках. Зато от городской суеты оторвались на 100%." },
];

const TARIFFS = [
  {
    name: "Уютный",
    desc: "Домик для двоих",
    price: "4 500",
    color: "from-forest to-forest-light",
    textColor: "text-white",
    features: ["1 спальня", "Терраса с видом", "Барбекю", "Пляж и лодка"],
    popular: false,
  },
  {
    name: "Семейный",
    desc: "До 6 человек",
    price: "8 900",
    color: "from-gold-dark to-gold",
    textColor: "text-dark",
    features: ["2 спальни + гостиная", "Баня включена", "Детская кроватка", "Питание 3 раза", "Мангальная зона"],
    popular: true,
  },
  {
    name: "Компания",
    desc: "До 12 человек",
    price: "16 500",
    color: "from-dark to-gray-700",
    textColor: "text-white",
    features: ["4 спальни", "Баня + купель", "Шеф-повар", "Прокат лодок", "Выделенный пирс"],
    popular: false,
  },
];

// ─── Утилита reveal ────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Navbar ────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌲</span>
          <span className={`font-display text-xl font-semibold tracking-wide ${scrolled ? "text-forest" : "text-white"}`}>
            ЛЕСНОЙ БЕРЕГ
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {[["Услуги", "#services"], ["Питание", "#food"], ["Цены", "#pricing"], ["Отзывы", "#reviews"]].map(([label, href]) => (
            <a key={label} href={href} className={`font-body text-sm font-medium link-underline transition-colors ${scrolled ? "text-dark hover:text-forest" : "text-white/90 hover:text-white"}`}>
              {label}
            </a>
          ))}
        </div>
        <a href="#booking" className={`font-body text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 ${scrolled ? "bg-forest text-white hover:bg-forest-light" : "bg-gold text-dark hover:bg-gold-dark"}`}>
          Забронировать
        </a>
      </div>
    </nav>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Лесной берег" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/40 text-gold px-4 py-2 rounded-full text-sm font-body font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
            Сезон открыт · Июнь — Октябрь
          </div>

          <h1 className="font-display text-6xl md:text-8xl font-bold text-white leading-none mb-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            НАСТОЯЩИЙ<br />
            <span className="text-gold">ОТДЫХ</span><br />
            НАЧИНАЕТСЯ<br />ЗДЕСЬ
          </h1>

          <p className="font-body text-xl text-white/80 mb-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Вода, лес и тишина — всего 120 км от Москвы
          </p>
          <p className="font-display text-3xl text-gold font-semibold mb-8 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            от 4 500 ₽ / сутки
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <a href="#booking" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-dark font-body font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:shadow-xl hover:scale-105">
              <Icon name="Calendar" size={20} />
              Проверить свободные даты
            </a>
            <a href="tel:+78001234567" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-body font-medium px-8 py-4 rounded-full text-lg transition-all duration-200">
              <Icon name="Phone" size={20} />
              +7 800 123-45-67
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center animate-fade-in" style={{ animationDelay: `${0.5 + i * 0.1}s` }}>
                <div className="font-display text-3xl font-bold text-gold">{s.value}</div>
                <div className="font-body text-sm text-white/60 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-8 md:right-12 animate-float hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}

// ─── Pain ──────────────────────────────────────────────────────────────────

function PainSection() {
  const titleRef = useReveal();
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-forest/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="reveal" ref={titleRef}>
          <p className="font-body text-gold text-sm font-medium tracking-widest uppercase mb-3">Почему Лесной берег</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4 leading-tight">
            УСТАЛИ ОТ<br />ГОРОДА?
          </h2>
          <p className="font-body text-white/60 text-xl max-w-xl mb-16">
            Мы знаем, как это — когда нужно просто выдохнуть. У нас это легко.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PAIN_ITEMS.map((item, i) => (
            <PainCard key={i} item={item} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PainCard({ item, delay }: { item: typeof PAIN_ITEMS[0]; delay: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="group flex gap-5 p-7 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30 transition-all duration-300 reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="flex-shrink-0 w-12 h-12 bg-forest/30 group-hover:bg-gold/20 rounded-xl flex items-center justify-center transition-colors duration-300">
        <Icon name={item.icon} fallback="Star" size={22} className="text-gold" />
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold mb-2 text-white group-hover:text-gold transition-colors">{item.title}</h3>
        <p className="font-body text-white/60 leading-relaxed">{item.desc}</p>
      </div>
    </div>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────

function ServicesSection() {
  const titleRef = useReveal();
  return (
    <section id="services" className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal" ref={titleRef}>
          <p className="font-body text-forest text-sm font-medium tracking-widest uppercase mb-3">Что вас ждёт</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mb-4">АКТИВНЫЙ<br />ОТДЫХ</h2>
          <p className="font-body text-muted-foreground text-xl max-w-xl mx-auto">Занятия для всех — от рыбалки до велопрогулок по лесным тропам</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, delay }: { s: typeof SERVICES[0]; delay: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="group bg-white rounded-2xl p-7 card-hover border border-border reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="w-14 h-14 bg-forest-pale group-hover:bg-forest rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300">
        <Icon name={s.icon} fallback="Star" size={26} className="text-forest group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="font-display text-xl font-semibold text-dark mb-2">{s.title}</h3>
      <p className="font-body text-muted-foreground mb-4 leading-relaxed">{s.desc}</p>
      <div className="inline-block bg-gold/15 text-gold-dark font-body font-semibold text-sm px-3 py-1.5 rounded-full">
        {s.price}
      </div>
    </div>
  );
}

// ─── Food ──────────────────────────────────────────────────────────────────

function FoodSection() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  return (
    <section id="food" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal" ref={leftRef}>
            <p className="font-body text-forest text-sm font-medium tracking-widest uppercase mb-3">Домашняя кухня</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
              КОРМИМ<br />КАК ДОМА
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
              Наш шеф-повар готовит из местных продуктов — овощи с собственного огорода, рыба из озера, домашние заготовки. Никаких полуфабрикатов.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {["Без полуфабрикатов", "Своё хозяйство", "Детское меню", "Диетическое меню"].map((tag) => (
                <span key={tag} className="font-body text-sm bg-forest-pale text-forest px-4 py-2 rounded-full font-medium">{tag}</span>
              ))}
            </div>
            <a href="#booking" className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg">
              <Icon name="Utensils" size={18} />
              Посмотреть меню
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 reveal" ref={rightRef}>
            {FOOD_ITEMS.map((f, i) => (
              <div key={i} className="group bg-light hover:bg-forest-pale rounded-2xl p-6 transition-colors duration-300 border border-border hover:border-forest/20">
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-display text-lg font-semibold text-dark mb-1">{f.title}</h3>
                <p className="font-body text-xs text-gold-dark font-semibold mb-2">{f.time}</p>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ───────────────────────────────────────────────────────────────

function ReviewsSection() {
  const titleRef = useReveal();
  return (
    <section id="reviews" className="py-24 bg-forest text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute top-10 left-10 font-display text-[20rem] font-bold leading-none text-white/5">★</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 reveal" ref={titleRef}>
          <p className="font-body text-gold text-sm font-medium tracking-widest uppercase mb-3">Отзывы гостей</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">ЧТО<br />ГОВОРЯТ</h2>
          <div className="inline-flex items-center gap-2 bg-white/10 px-5 py-2 rounded-full">
            <span className="text-gold text-xl">★★★★★</span>
            <span className="font-body text-white/80">4.9 из 5 на основе 280+ отзывов</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} r={r} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ r, delay }: { r: typeof REVIEWS[0]; delay: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-colors duration-300 reveal" style={{ transitionDelay: `${delay}s` }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-11 h-11 bg-gold rounded-full flex items-center justify-center font-display font-bold text-dark text-lg">
          {r.name[0]}
        </div>
        <div>
          <div className="font-body font-semibold text-white">{r.name}</div>
          <div className="font-body text-xs text-white/50">{r.date}</div>
        </div>
        <div className="ml-auto text-gold text-sm">{"★".repeat(r.stars)}</div>
      </div>
      <p className="font-body text-white/80 leading-relaxed italic">"{r.text}"</p>
    </div>
  );
}

// ─── Pricing ───────────────────────────────────────────────────────────────

function PricingSection() {
  const titleRef = useReveal();
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal" ref={titleRef}>
          <p className="font-body text-forest text-sm font-medium tracking-widest uppercase mb-3">Тарифы</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mb-4">ВЫБЕРИТЕ<br />СВОЙ ФОРМАТ</h2>
          <p className="font-body text-muted-foreground text-xl">Все тарифы включают пляж, парковку и мангальную зону</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {TARIFFS.map((t, i) => (
            <TariffCard key={i} t={t} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TariffCard({ t, delay }: { t: typeof TARIFFS[0]; delay: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`relative rounded-3xl overflow-hidden reveal ${t.popular ? "ring-4 ring-gold shadow-2xl scale-105" : "border border-border"}`} style={{ transitionDelay: `${delay}s` }}>
      {t.popular && (
        <div className="absolute top-0 left-0 right-0 bg-gold text-dark font-body font-semibold text-center py-2 text-sm z-10">
          ⭐ Самый популярный
        </div>
      )}
      <div className={`bg-gradient-to-br ${t.color} p-8 ${t.popular ? "pt-14" : ""}`}>
        <h3 className={`font-display text-3xl font-bold mb-1 ${t.textColor}`}>{t.name}</h3>
        <p className={`font-body mb-6 ${t.textColor === "text-white" ? "text-white/70" : "text-dark/70"}`}>{t.desc}</p>
        <div className="flex items-baseline gap-2">
          <span className={`font-display text-5xl font-bold ${t.textColor}`}>{t.price}</span>
          <span className={`font-body ${t.textColor === "text-white" ? "text-white/60" : "text-dark/60"}`}>₽/сутки</span>
        </div>
      </div>
      <div className="bg-white p-8">
        <ul className="space-y-3 mb-8">
          {t.features.map((f, j) => (
            <li key={j} className="flex items-center gap-3 font-body text-dark">
              <div className="w-5 h-5 bg-forest-pale rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Check" size={12} className="text-forest" />
              </div>
              {f}
            </li>
          ))}
        </ul>
        <a href="#booking" className={`block text-center font-body font-semibold py-3.5 rounded-2xl transition-all duration-200 hover:opacity-90 ${t.popular ? "bg-gold text-dark hover:shadow-lg" : "bg-forest-pale text-forest hover:bg-forest hover:text-white"}`}>
          Забронировать
        </a>
      </div>
    </div>
  );
}

// ─── Loyalty ───────────────────────────────────────────────────────────────

function LoyaltySection() {
  const leftRef = useReveal();
  const rightRef = useReveal();
  const items = [
    { num: "01", title: "Скидка 10% с 2-го заезда", desc: "Постоянные гости получают скидку автоматически" },
    { num: "02", title: "Бесплатная баня", desc: "При бронировании от 5 ночей — 1 посещение бани в подарок" },
    { num: "03", title: "Ранний заезд", desc: "Для постоянных гостей — заезд с 11:00 вместо 14:00" },
    { num: "04", title: "Приводи друга", desc: "+5% скидки за каждого приведённого друга" },
  ];
  return (
    <section className="py-24 bg-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal" ref={leftRef}>
            <p className="font-body text-forest text-sm font-medium tracking-widest uppercase mb-3">Программа лояльности</p>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
              ВОЗВРАЩАЙТЕСЬ<br />
              <span className="text-gradient-forest">С ВЫГОДОЙ</span>
            </h2>
            <p className="font-body text-muted-foreground text-lg mb-8 leading-relaxed">
              Каждый повторный визит приносит бонусы. Чем чаще вы отдыхаете у нас — тем больше преимуществ получаете.
            </p>
            <a href="#booking" className="inline-flex items-center gap-2 bg-forest hover:bg-forest-light text-white font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg">
              Стать постоянным гостем
              <Icon name="ArrowRight" size={18} />
            </a>
          </div>
          <div className="space-y-4 reveal" ref={rightRef}>
            {items.map((item, i) => (
              <div key={i} className="flex gap-5 p-6 bg-white rounded-2xl border border-border hover:border-forest/20 hover:shadow-md transition-all duration-300">
                <span className="font-display text-4xl font-bold text-forest/20 leading-none">{item.num}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-dark mb-1">{item.title}</h3>
                  <p className="font-body text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking (Интерактивный календарь) ────────────────────────────────────

const BOOKED_DATES: Record<string, number[]> = {
  "2026-6": [5, 6, 7, 12, 13, 14, 19, 20, 21],
  "2026-7": [3, 4, 5, 10, 11, 17, 18, 19, 24, 25, 26],
  "2026-8": [1, 2, 7, 8, 9, 14, 15, 16, 21, 22, 28, 29],
  "2026-9": [4, 5, 6, 11, 12, 18, 19, 25, 26],
  "2026-10": [2, 3, 9, 10, 16, 17],
};

const MONTH_NAMES = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function BookingSection() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [checkIn, setCheckIn] = useState<number | null>(null);
  const [checkOut, setCheckOut] = useState<number | null>(null);
  const [guests, setGuests] = useState(2);
  const [hovering, setHovering] = useState<number | null>(null);
  const titleRef = useReveal();

  const key = `${year}-${month + 1}`;
  const booked = BOOKED_DATES[key] || [];
  const firstDay = new Date(year, month, 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
    setCheckIn(null); setCheckOut(null);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
    setCheckIn(null); setCheckOut(null);
  };

  const handleDay = (day: number) => {
    if (booked.includes(day)) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(day); setCheckOut(null);
    } else {
      if (day < checkIn) { setCheckIn(day); setCheckOut(null); }
      else setCheckOut(day);
    }
  };

  const inRange = (day: number) => {
    const end = checkOut ?? hovering;
    if (!checkIn || !end) return false;
    return day > Math.min(checkIn, end) && day < Math.max(checkIn, end);
  };

  const nights = checkIn && checkOut ? Math.abs(checkOut - checkIn) : 0;
  const nightlyRate = guests <= 2 ? 4500 : guests <= 6 ? 8900 : 16500;
  const price = nights * nightlyRate;

  return (
    <section id="booking" className="py-24 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal" ref={titleRef}>
          <p className="font-body text-gold text-sm font-medium tracking-widest uppercase mb-3">Бронирование</p>
          <h2 className="font-display text-5xl md:text-6xl font-bold mb-4">ВЫБЕРИТЕ<br />ДАТЫ</h2>
          <p className="font-body text-white/60 text-xl">Зелёные даты — свободны, серые — заняты</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Календарь */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Icon name="ChevronLeft" size={18} className="text-white" />
              </button>
              <h3 className="font-display text-xl font-semibold text-white">
                {MONTH_NAMES[month]} {year}
              </h3>
              <button onClick={nextMonth} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                <Icon name="ChevronRight" size={18} className="text-white" />
              </button>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className={`text-center font-body text-xs font-semibold py-2 ${d === "Сб" || d === "Вс" ? "text-gold" : "text-white/40"}`}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isBooked = booked.includes(day);
                const isCheckIn = checkIn === day;
                const isCheckOut = checkOut === day;
                const isSelected = isCheckIn || isCheckOut;
                const isRange = inRange(day);
                const isWeekend = [6, 0].includes(new Date(year, month, day).getDay());

                return (
                  <button
                    key={day}
                    disabled={isBooked}
                    onClick={() => handleDay(day)}
                    onMouseEnter={() => setHovering(day)}
                    onMouseLeave={() => setHovering(null)}
                    className={[
                      "relative aspect-square rounded-xl text-sm font-body font-medium transition-all duration-150",
                      isBooked ? "text-white/20 cursor-not-allowed" : "cursor-pointer",
                      isSelected ? "bg-gold text-dark font-bold scale-110 shadow-lg" : "",
                      isRange && !isSelected ? "bg-gold/20 text-gold rounded-none" : "",
                      !isBooked && !isSelected && !isRange
                        ? `hover:bg-white/20 ${isWeekend ? "text-gold/80" : "text-white"}`
                        : "",
                    ].join(" ")}
                  >
                    {isBooked ? <span className="opacity-30 line-through">{day}</span> : day}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-6 mt-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gold" />
                <span className="font-body text-xs text-white/60">Выбрано</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-white/20" />
                <span className="font-body text-xs text-white/60">Свободно</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-md bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-white/30 text-[8px]">✕</span>
                </div>
                <span className="font-body text-xs text-white/60">Занято</span>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="font-body text-xs text-white/40 uppercase tracking-wider mb-2">Заезд</p>
                <p className="font-display text-2xl font-bold text-gold">
                  {checkIn ? `${checkIn} ${MONTH_NAMES[month].slice(0, 3)}` : "—"}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="font-body text-xs text-white/40 uppercase tracking-wider mb-2">Выезд</p>
                <p className="font-display text-2xl font-bold text-gold">
                  {checkOut ? `${checkOut} ${MONTH_NAMES[month].slice(0, 3)}` : "—"}
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="font-body text-xs text-white/40 uppercase tracking-wider mb-4">Количество гостей</p>
              <div className="flex items-center gap-4">
                <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-10 h-10 bg-white/10 hover:bg-gold hover:text-dark rounded-full flex items-center justify-center transition-colors font-bold text-white text-xl">
                  −
                </button>
                <span className="font-display text-4xl font-bold text-white w-16 text-center">{guests}</span>
                <button onClick={() => setGuests(g => Math.min(12, g + 1))} className="w-10 h-10 bg-white/10 hover:bg-gold hover:text-dark rounded-full flex items-center justify-center transition-colors font-bold text-white text-xl">
                  +
                </button>
                <span className="font-body text-white/50 text-sm">
                  {guests === 1 ? "гость" : guests < 5 ? "гостя" : "гостей"}
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-forest to-forest-light rounded-2xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="font-body text-white/70 text-sm mb-1">Итого</p>
                  <p className="font-display text-4xl font-bold text-white">
                    {nights > 0 ? `${price.toLocaleString()} ₽` : "—"}
                  </p>
                </div>
                {nights > 0 && (
                  <div className="bg-white/20 rounded-xl px-4 py-2 text-center">
                    <p className="font-display text-2xl font-bold text-white">{nights}</p>
                    <p className="font-body text-xs text-white/70">{nights === 1 ? "ночь" : nights < 5 ? "ночи" : "ночей"}</p>
                  </div>
                )}
              </div>
              {nights > 0 && (
                <p className="font-body text-white/60 text-sm">
                  {nightlyRate.toLocaleString()} ₽ × {nights} {nights === 1 ? "ночь" : nights < 5 ? "ночи" : "ночей"}
                </p>
              )}
            </div>

            <input
              type="text"
              placeholder="Ваше имя"
              className="bg-white/5 border border-white/20 text-white placeholder-white/30 font-body rounded-2xl px-5 py-4 outline-none focus:border-gold focus:bg-white/10 transition-colors"
            />
            <input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              className="bg-white/5 border border-white/20 text-white placeholder-white/30 font-body rounded-2xl px-5 py-4 outline-none focus:border-gold focus:bg-white/10 transition-colors"
            />

            <button className="w-full bg-gold hover:bg-gold-dark text-dark font-display text-xl font-semibold py-5 rounded-2xl transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              {checkIn && checkOut ? "Отправить заявку" : "Выберите даты"}
            </button>

            <p className="font-body text-center text-white/30 text-xs">
              Или позвоните: <a href="tel:+78001234567" className="text-gold hover:underline">+7 800 123-45-67</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA ───────────────────────────────────────────────────────────────────

function CtaSection() {
  const ref = useReveal();
  return (
    <section className="py-32 bg-dark text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/70" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center reveal" ref={ref}>
        <p className="font-body text-gold text-sm font-medium tracking-widest uppercase mb-4">Сезон открыт</p>
        <h2 className="font-display text-6xl md:text-8xl font-bold mb-6 leading-none">
          ПРИЕДЬТЕ<br />
          <span className="text-gold">ОТДОХНУТЬ</span>
        </h2>
        <p className="font-body text-white/70 text-xl mb-10 max-w-2xl mx-auto">
          120 км от шума. Лес, вода и настоящая тишина. Заезд с любого дня недели.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#booking" className="inline-flex items-center gap-2 bg-gold hover:bg-gold-dark text-dark font-display text-xl font-semibold px-10 py-5 rounded-full transition-all duration-200 hover:shadow-2xl hover:scale-105">
            <Icon name="Calendar" size={22} />
            Забронировать сейчас
          </a>
          <a href="https://wa.me/78001234567" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 font-body font-semibold px-10 py-5 rounded-full transition-all duration-200 text-lg">
            <Icon name="MessageCircle" size={22} />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🌲</span>
              <span className="font-display text-2xl font-bold tracking-wide text-white">ЛЕСНОЙ БЕРЕГ</span>
            </div>
            <p className="font-body text-white/50 leading-relaxed mb-6">
              База отдыха на берегу лесного озера. Вода, лес и тишина — всего 120 км от Москвы.
            </p>
            <a href="tel:+78001234567" className="flex items-center gap-2 font-body text-white/70 hover:text-gold transition-colors w-fit">
              <Icon name="Phone" size={16} />
              +7 800 123-45-67
            </a>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-widest uppercase text-gold mb-5">Навигация</h4>
            <ul className="space-y-3">
              {[["Услуги", "#services"], ["Питание", "#food"], ["Цены", "#pricing"], ["Отзывы", "#reviews"], ["Бронирование", "#booking"]].map(([l, h]) => (
                <li key={l}><a href={h} className="font-body text-white/50 hover:text-white transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold tracking-widest uppercase text-gold mb-5">Контакты</h4>
            <ul className="space-y-3 font-body text-white/50">
              <li className="flex items-start gap-2">
                <Icon name="MapPin" size={16} className="mt-0.5 text-gold flex-shrink-0" />
                120 км от Москвы, Тверская обл.
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Mail" size={16} className="text-gold flex-shrink-0" />
                info@lesnoybereg.ru
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Instagram" size={16} className="text-gold flex-shrink-0" />
                @lesnoybereg
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/30 text-sm">© 2026 Лесной берег. Все права защищены.</p>
          <p className="font-body text-white/20 text-xs">Сезон: Июнь — Октябрь</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Главная ───────────────────────────────────────────────────────────────

export default function Index() {
  return (
    <div className="min-h-screen font-body">
      <Navbar />
      <HeroSection />
      <PainSection />
      <ServicesSection />
      <FoodSection />
      <ReviewsSection />
      <PricingSection />
      <LoyaltySection />
      <BookingSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
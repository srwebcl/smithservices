'use client';

import Image from 'next/image';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  Accessibility,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Crown,
  Droplets,
  HardHat,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Siren,
  Toilet,
  Waves,
  X,
} from 'lucide-react';

const PHONE = '+56 9 6902 1180';
const PHONE_HREF = 'tel:+56969021180';
const EMERGENCY_PHONE = '+56 9 6178 2304';
const EMERGENCY_HREF = 'tel:+56961782304';
const EMAIL = 'contacto@smithservices.cl';
const SLIDE_INTERVAL = 8000;

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#banos-quimicos', label: 'Baños Químicos' },
  { href: '#contacto', label: 'Contacto' },
];

const heroSlides = [
  {
    tab: 'Soluciones sanitarias',
    eyebrow: 'Chillán y sus alrededores',
    title: 'Limpieza de Fosas Sépticas, Destape de Alcantarillado y Baños Químicos',
    text: 'En Smith Services ofrecemos soluciones sanitarias para Chillán y sus alrededores. Realizamos limpieza de fosas sépticas, destape de alcantarillado y desagües, limpieza de tuberías, además del arriendo y venta de baños químicos.',
    cta: 'Llámanos ahora',
    ctaHref: PHONE_HREF,
    showPhone: true,
    image: '/images/limpieza-fosas-septicas-hero.jpg',
    imageAlt: 'Camión limpiafosas de Smith Services en ruta',
  },
  {
    tab: 'Obras civiles',
    eyebrow: 'Construcción, excavaciones y urbanización',
    title: 'Proyectos y Obras Civiles',
    text: 'Desarrollamos proyectos de obras civiles con un enfoque en la calidad, la seguridad y el compromiso. Nuestro equipo técnico trabaja para entregar soluciones eficientes y duraderas en construcción, excavaciones y urbanización.',
    cta: 'Cotiza tu proyecto',
    ctaHref: '#contacto',
    showPhone: false,
    image: '/images/tratamiento-aguas-industrial.jpg',
    imageAlt: 'Equipo técnico trabajando en una obra civil',
  },
];

const services = [
  {
    icon: Droplets,
    title: 'Limpieza de Fosas Sépticas',
    text: 'Realizamos limpieza, mantención, instalación y reparación de fosas sépticas en Chillán. Ofrecemos soluciones adaptadas a las necesidades de cada cliente.',
    image: '/images/limpieza-fosas-septicas.jpg',
  },
  {
    icon: Waves,
    title: 'Destape de Alcantarillado',
    text: 'Realizamos destape de desagües, limpieza de tuberías con hidrojets y mantención preventiva para hogares y empresas de Chillán y sus alrededores.',
    image: '/images/destape-desagues.jpg',
  },
  {
    icon: Toilet,
    title: 'Arriendo y Venta de Baños Químicos',
    text: 'Ofrecemos baños químicos para arriendo y venta, con alternativas para eventos, el sector agrícola y otras necesidades. También realizamos transporte y disposición de residuos líquidos, de acuerdo con la información proporcionada sobre nuestros servicios.',
    image: '/images/arriendo-banos-quimicos.jpg',
  },
  {
    icon: HardHat,
    title: 'Obras Civiles',
    text: 'Desarrollamos proyectos de obras civiles en construcción, excavaciones y urbanización, con atención a la calidad, la seguridad y el compromiso en cada trabajo.',
    image: '/images/tratamiento-aguas-industrial.jpg',
  },
];

const toiletModels = [
  {
    icon: Toilet,
    label: 'Estándar',
    name: 'Sanitario Portátil Modelo Estándar',
    text: 'Una alternativa funcional y resistente para obras de construcción, eventos masivos y otras situaciones que requieren una solución sanitaria práctica. Su diseño está pensado para facilitar el mantenimiento y favorecer la durabilidad.',
  },
  {
    icon: Briefcase,
    label: 'Ejecutivo',
    name: 'Sanitario Portátil Modelo Ejecutivo',
    text: 'Una alternativa que ofrece mayor comodidad, con un diseño más espacioso y acabados de mayor calidad. Adecuado para eventos de mayor duración y ocasiones en las que se busca una experiencia más confortable.',
  },
  {
    icon: Crown,
    label: 'VIP',
    name: 'Sanitario Portátil Modelo VIP',
    text: 'Una alternativa de mayor confort y equipamiento, que incluye lavamanos integrado, espejo y otros detalles. Pensado para eventos exclusivos y situaciones en las que se busca una experiencia superior para los usuarios.',
  },
  {
    icon: Accessibility,
    label: 'Movilidad reducida',
    name: 'Sanitario Portátil para Personas con Movilidad Reducida',
    text: 'Un modelo diseñado para personas con movilidad reducida, con espacio interior amplio, barras de apoyo y acceso adaptado para favorecer la comodidad y seguridad de los usuarios.',
  },
];

const serviceOptions = [
  'Limpieza de Fosas Sépticas',
  'Destape de Alcantarillado',
  'Arriendo y Venta de Baños Químicos',
  'Obras Civiles',
  'Otro servicio',
];

const faqs = [
  {
    q: '¿Dónde realizan los servicios?',
    a: 'Trabajamos en Chillán y sus alrededores. También contamos con disponibilidad en otras regiones de Chile.',
  },
  {
    q: '¿Qué servicios prestan?',
    a: 'Realizamos limpieza de fosas sépticas, destape de alcantarillado, WC, lavamanos y lavaplatos, además de limpieza de decantadores de grasa. También ofrecemos arriendo y venta de baños químicos para eventos, el sector agrícola y otras necesidades.',
  },
  {
    q: '¿Atienden emergencias?',
    a: 'Sí, atendemos emergencias las 24 horas del día, los 7 días de la semana.',
  },
];

const footerServices = [
  'Limpieza de fosas sépticas.',
  'Destape de desagües.',
  'Tratamiento de aguas servidas.',
  'Arriendo de baños químicos.',
];

function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="section-label">{children}</span>;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState('');

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => setActiveSlide((s) => (s + 1) % heroSlides.length), SLIDE_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [activeSlide, paused]);

  // Menú móvil a pantalla completa: bloquea el scroll de la página y se cierra con Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  const closeMenu = () => setMenuOpen(false);
  const goToSlide = (i: number) => setActiveSlide((i + heroSlides.length) % heroSlides.length);

  return (
    <>
      {/* 1. Encabezado y navegación */}
      <header className={menuOpen ? 'site-header menu-open' : 'site-header'}>
        <div className="container nav-wrap">
          <a className="brand" href="#inicio" aria-label="Smith Services, inicio" onClick={closeMenu}>
            <Image src="/images/smithservices-logo.png" alt="Smith Services" width={220} height={110} priority />
          </a>

          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Menú principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <div className="mobile-nav-extra">
              <a className="button button-primary button-lg" href={PHONE_HREF}>
                <Phone size={18} /> Llámanos ahora
              </a>
              <a className="mobile-nav-emergency" href={EMERGENCY_HREF}>
                <Siren size={16} /> Emergencias 24/7: <strong>{EMERGENCY_PHONE}</strong>
              </a>
            </div>
          </nav>

          <div className="nav-actions">
            <a className="nav-phone" href={PHONE_HREF}>
              <span className="nav-phone-icon">
                <Phone size={17} />
              </span>
              <span className="nav-phone-text">
                <small>Teléfono de contacto</small>
                <strong>{PHONE}</strong>
              </span>
            </a>
            <button
              className="menu-toggle"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* 2 y 3. Hero principal — Slides 1 y 2 */}
        <section
          className={paused ? 'hero is-paused' : 'hero'}
          id="inicio"
          aria-roledescription="carrusel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {heroSlides.map((slide, i) => (
            <div
              key={slide.title}
              className={i === activeSlide ? 'hero-slide is-active' : 'hero-slide'}
              aria-hidden={i !== activeSlide}
              aria-roledescription="diapositiva"
            >
              <Image
                src={slide.image}
                alt={slide.imageAlt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="hero-bg"
              />
              <div className="hero-overlay" />
              <div className="container hero-inner">
                <div className="hero-copy">
                  <span className="hero-eyebrow">
                    <MapPin size={14} /> {slide.eyebrow}
                  </span>
                  <h1>{slide.title}</h1>
                  <p className="hero-lead">{slide.text}</p>
                  <div className="hero-actions">
                    <a className="button button-primary button-lg" href={slide.ctaHref}>
                      {slide.ctaHref.startsWith('tel') ? <Phone size={18} /> : null}
                      {slide.cta}
                      {slide.ctaHref.startsWith('tel') ? null : <ArrowRight size={18} />}
                    </a>
                    {slide.showPhone && (
                      <a className="hero-phone" href={PHONE_HREF}>
                        <small>Teléfono</small>
                        <strong>{PHONE}</strong>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="hero-controls">
            <div className="container hero-controls-inner">
              <div className="hero-tabs" role="tablist" aria-label="Áreas de servicio">
                {heroSlides.map((slide, i) => (
                  <button
                    key={slide.tab}
                    role="tab"
                    aria-selected={i === activeSlide}
                    className={i === activeSlide ? 'hero-tab is-active' : 'hero-tab'}
                    onClick={() => goToSlide(i)}
                  >
                    <span className="hero-tab-label">{slide.tab}</span>
                    <span className="hero-tab-bar">
                      <span key={`${activeSlide}-${paused}`} style={{ animationDuration: `${SLIDE_INTERVAL}ms` }} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="hero-arrows">
                <button aria-label="Diapositiva anterior" onClick={() => goToSlide(activeSlide - 1)}>
                  <ChevronLeft size={20} />
                </button>
                <button aria-label="Diapositiva siguiente" onClick={() => goToSlide(activeSlide + 1)}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Franja de contacto rápido */}
        <div className="quick-strip">
          <div className="container quick-strip-grid">
            <div className="quick-item">
              <span className="quick-icon">
                <MapPin size={20} />
              </span>
              <div>
                <strong>Chillán y sus alrededores</strong>
                <span>También en otras regiones de Chile</span>
              </div>
            </div>
            <a className="quick-item quick-item-emergency" href={EMERGENCY_HREF}>
              <span className="quick-icon">
                <Siren size={20} />
              </span>
              <div>
                <strong>Emergencias 24/7</strong>
                <span>{EMERGENCY_PHONE}</span>
              </div>
            </a>
            <a className="quick-item" href={`mailto:${EMAIL}`}>
              <span className="quick-icon">
                <Mail size={20} />
              </span>
              <div>
                <strong>Correo electrónico</strong>
                <span>{EMAIL}</span>
              </div>
            </a>
          </div>
        </div>

        {/* 4. Sección de servicios */}
        <section className="services section-pad" id="servicios">
          <div className="container">
            <div className="section-heading">
              <div>
                <SectionLabel>Servicios</SectionLabel>
                <h2>Soluciones para tus necesidades sanitarias y de construcción</h2>
              </div>
              <p>
                Conoce nuestros servicios de limpieza, mantención y destape, además de nuestras soluciones en baños
                químicos y obras civiles.
              </p>
            </div>

            <div className="service-grid">
              {services.map(({ icon: Icon, title, text, image }) => (
                <article className="service-card" key={title}>
                  <div className="service-media">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 290px"
                      className="service-img"
                    />
                  </div>
                  <div className="service-body">
                    <span className="service-icon">
                      <Icon size={22} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a
                      href="#contacto"
                      className="card-link"
                      onClick={() => setService(serviceOptions.includes(title) ? title : 'Otro servicio')}
                    >
                      Consultar <ArrowRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="section-cta">
              <a className="button button-primary button-lg" href="#contacto">
                Solicita un presupuesto <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* 5. Sección de baños químicos */}
        <section className="toilets section-pad" id="banos-quimicos">
          <div className="container toilets-grid">
            <div className="toilets-intro">
              <SectionLabel>Arriendo y venta</SectionLabel>
              <h2>Baños Químicos para Arriendo y Venta</h2>
              <p>
                En Smith Services contamos con distintas alternativas de baños químicos para responder a las
                necesidades de clientes en Chillán y sus alrededores. Disponemos de modelos estándar, ejecutivo, VIP
                y una alternativa diseñada para personas con movilidad reducida.
              </p>
              <div className="toilets-photo">
                <Image
                  src="/images/arriendo-banos-quimicos.jpg"
                  alt="Baños químicos de Smith Services"
                  fill
                  sizes="(max-width: 1000px) 100vw, 480px"
                  className="toilets-img"
                />
              </div>
              <a
                className="button button-primary button-lg"
                href="#contacto"
                onClick={() => setService('Arriendo y Venta de Baños Químicos')}
              >
                Solicita un presupuesto <ArrowRight size={18} />
              </a>
            </div>

            <div className="model-grid">
              {toiletModels.map(({ icon: Icon, label, name, text }) => (
                <article className="model-card" key={name}>
                  <div className="model-top">
                    <span className="model-icon">
                      <Icon size={26} strokeWidth={1.8} />
                    </span>
                    <span className="model-tag">{label}</span>
                  </div>
                  <h3>{name}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Formulario de contacto */}
        <section className="contact section-pad" id="contacto">
          <div className="container contact-grid">
            <div className="contact-copy">
              <SectionLabel>Contacto</SectionLabel>
              <h2>Cuéntanos qué servicio necesitas</h2>
              <p>
                Completa el formulario con tus datos y los detalles de tu solicitud para consultar por nuestros
                servicios.
              </p>

              <div className="contact-boxes">
                <a href={PHONE_HREF} className="contact-box">
                  <span className="contact-box-icon">
                    <Phone size={20} />
                  </span>
                  <span>
                    <small>Teléfono</small>
                    <strong>{PHONE}</strong>
                  </span>
                </a>
                <a href={EMERGENCY_HREF} className="contact-box is-emergency">
                  <span className="contact-box-icon">
                    <Siren size={20} />
                  </span>
                  <span>
                    <small>Emergencias 24/7</small>
                    <strong>{EMERGENCY_PHONE}</strong>
                  </span>
                </a>
                <a href={`mailto:${EMAIL}`} className="contact-box">
                  <span className="contact-box-icon">
                    <Mail size={20} />
                  </span>
                  <span>
                    <small>Correo electrónico</small>
                    <strong>{EMAIL}</strong>
                  </span>
                </a>
              </div>
            </div>

            <div className="form-card">
              {submitted ? (
                <div className="form-success" role="status">
                  <span>
                    <CheckCircle2 size={34} />
                  </span>
                  <h3>¡Gracias por escribirnos!</h3>
                  <p>Recibimos los detalles de tu solicitud. Nos comunicaremos contigo a la brevedad.</p>
                  <button className="button button-primary" onClick={() => setSubmitted(false)}>
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label>
                    Nombre
                    <input name="name" required maxLength={80} autoComplete="name" placeholder="Tu nombre" />
                  </label>

                  <div className="field-row">
                    <label>
                      Teléfono
                      <input
                        name="phone"
                        required
                        type="tel"
                        maxLength={20}
                        pattern="[+0-9 ()-]{8,20}"
                        title="Ingresa un teléfono válido, por ejemplo +56 9 1234 5678"
                        autoComplete="tel"
                        placeholder="+56 9 ..."
                      />
                    </label>
                    <label>
                      Correo electrónico
                      <input
                        name="email"
                        required
                        type="email"
                        maxLength={120}
                        autoComplete="email"
                        placeholder="nombre@correo.cl"
                      />
                    </label>
                  </div>

                  <label>
                    ¿Qué servicio necesita?
                    <select name="service" required value={service} onChange={(e) => setService(e.target.value)}>
                      <option value="" disabled>
                        Selecciona un servicio
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>

                  <label>
                    Indique más detalles
                    <textarea
                      name="details"
                      rows={5}
                      required
                      maxLength={2000}
                      placeholder="Comuna, tipo de instalación, fecha estimada u otros detalles"
                    />
                  </label>

                  <button type="submit" className="button button-primary button-lg form-submit">
                    Enviar solicitud <Send size={17} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* 7. Preguntas frecuentes */}
        <section className="faq section-pad" id="preguntas">
          <div className="container faq-grid">
            <div className="faq-intro">
              <SectionLabel>Resolvemos tus dudas</SectionLabel>
              <h2>Preguntas Frecuentes</h2>

              <div className="emergency-card">
                <span className="emergency-card-icon">
                  <Siren size={24} />
                </span>
                <small>Teléfono de emergencias</small>
                <a href={EMERGENCY_HREF} className="emergency-card-phone">
                  {EMERGENCY_PHONE}
                </a>
                <a className="button button-emergency button-lg" href={EMERGENCY_HREF}>
                  <Phone size={17} /> Llámanos ahora
                </a>
              </div>
            </div>

            <div className="faq-list">
              {faqs.map((item, i) => {
                const open = faqOpen === i;
                return (
                  <div className={open ? 'faq-item is-open' : 'faq-item'} key={item.q}>
                    <button
                      className="faq-question"
                      id={`faq-q-${i}`}
                      aria-expanded={open}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setFaqOpen(open ? null : i)}
                    >
                      <span>{item.q}</span>
                      <span className="faq-chevron">
                        <ChevronDown size={18} />
                      </span>
                    </button>
                    <div className="faq-answer" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                      <div>
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8. Llamado a la acción */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-card">
              <Image src="/images/limpieza-fosas-septicas.jpg" alt="" fill sizes="1160px" className="cta-bg" />
              <div className="cta-content">
                <h2>¿Necesitas un servicio sanitario?</h2>
                <p>
                  Solicita un presupuesto para limpieza de fosas sépticas, destape de alcantarillado y desagües, baños
                  químicos u otros de nuestros servicios.
                </p>
              </div>
              <div className="cta-actions">
                <a className="button button-light button-lg" href="#contacto">
                  Solicita tu presupuesto <ArrowRight size={18} />
                </a>
                <a className="cta-phone" href={PHONE_HREF}>
                  <Phone size={18} /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Pie de página */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <a className="footer-brand" href="#inicio" aria-label="Smith Services, inicio">
              <Image src="/images/smithservices-logo.png" alt="Smith Services" width={200} height={100} />
            </a>
            <p>
              Servicios de limpieza de fosas sépticas, destape de desagües y tratamiento de aguas servidas en Chillán
              y el sur de Chile.
            </p>
          </div>

          <div className="footer-col">
            <h4>Servicios</h4>
            <ul className="footer-list">
              {footerServices.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={14} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Zonas de atención</h4>
            <p className="footer-zones">
              Chillán, Chillán Viejo, San Carlos, San Nicolás, Cobquecura, Longaví, San Gregorio, Pinto, Quillón,
              Bulnes, Florida, Santa Clara, Cabrero, Yungay, El Carmen, San Ignacio y Termas de Chillán.
            </p>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul className="footer-contact">
              <li>
                <small>Teléfono</small>
                <a href={PHONE_HREF}>{PHONE}</a>
              </li>
              <li>
                <small>Emergencias 24/7</small>
                <a href={EMERGENCY_HREF}>{EMERGENCY_PHONE}</a>
              </li>
              <li>
                <small>Correo electrónico</small>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Smith Services.</span>
          <span>Sitio web desarrollado por SRweb.</span>
        </div>
      </footer>

      <a
        href="https://wa.me/56969021180?text=Hola%20Smith%20Services,%20necesito%20cotizar%20un%20servicio."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </>
  );
}

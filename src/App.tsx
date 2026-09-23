import { type FormEvent, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: '01',
    name: 'The Aurelius',
    detail: 'A total reset for the vehicle you never stop looking back at.',
    includes: 'Hand wash · paint decontamination · correction · ceramic veil',
    price: 'from $1,850',
    image:
      'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    number: '02',
    name: 'Paint Ceremony',
    detail: 'A considered correction for color, clarity, and a deeper kind of gloss.',
    includes: 'Two-stage correction · panel refinement · 9H ceramic coating',
    price: 'from $1,200',
    image:
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
  {
    number: '03',
    name: 'Quiet Maintenance',
    detail: 'The weekly ritual that keeps a finished car feeling freshly finished.',
    includes: 'Contactless pre-wash · interior refresh · hand-finished exterior',
    price: 'from $320',
    image:
      'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1000',
  },
];

const process = [
  ['01', 'The interview', 'We begin with the story of the car: how it is driven, kept, and what you want to feel when you see it.'],
  ['02', 'The inspection', 'Under controlled light, our technicians map every surface. Nothing is rushed past; nothing is left to assumption.'],
  ['03', 'The treatment', 'Slow hands, measured pressure, and materials selected for this finish alone. The work happens behind closed doors.'],
  ['04', 'The reveal', 'A final light inspection, a private handover, and a finish that stays with you long after you leave the studio.'],
];

const testimonials = [
  {
    quote: 'I had forgotten the car could look like this. The Aurelius team gave it back to me with an entirely new sense of occasion.',
    name: 'M. Laurent',
    title: '1967 Porsche 911 owner',
  },
  {
    quote: 'There is no theatre here, just incredible discipline. Every edge, every reflection, every detail is accounted for.',
    name: 'E. Shah',
    title: 'Ferrari 812 Superfast owner',
  },
  {
    quote: 'Aurelius understands that a special car is part of your life, not an object to be processed. That distinction is everything.',
    name: 'J. Whitmore',
    title: 'Aston Martin DBX707 owner',
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [comparison, setComparison] = useState(53);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ autoRaf: false });
    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        const delay = Number.parseInt(element.style.getPropertyValue('--delay') || '0', 10) / 1000;
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            delay,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          },
        );
      });

      gsap.to('.hero-image', {
        yPercent: 9,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      cancelAnimationFrame(frameId);
      context.revert();
      lenis.destroy();
    };
  }, []);

  const jumpTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setFormError('Please complete each field so we can prepare your private appointment.');
      form.reportValidity();
      return;
    }
    setFormError('');
    setSubmitted(true);
  };

  const previousTestimonial = () =>
    setActiveTestimonial((current) => (current - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () =>
    setActiveTestimonial((current) => (current + 1) % testimonials.length);

  return (
    <main className="site-shell">
      <header className="site-header">
        <button className="wordmark" onClick={() => jumpTo('top')} data-testid="button-home">
          <span className="wordmark-mark">A</span>
          <span>
            <strong>Aurelius</strong>
            <small>Private automotive atelier</small>
          </span>
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <button onClick={() => jumpTo('services')} data-testid="link-services">Services</button>
          <button onClick={() => jumpTo('gallery')} data-testid="link-gallery">Gallery</button>
          <button onClick={() => jumpTo('testimonials')} data-testid="link-testimonials">Testimonials</button>
          <button className="nav-appointment" onClick={() => jumpTo('appointment')} data-testid="link-appointment">
            Book now <ArrowUpRight size={15} />
          </button>
        </nav>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" data-testid="button-menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow hero-eyebrow"><span /> Los Angeles · By appointment only</div>
          <h1>The art<br /><em>of the finish.</em></h1>
          <p className="hero-copy">Aurelius is a private detailing atelier for remarkable cars and the people who keep them.</p>
          <div className="hero-actions">
            <button className="button button-gold" onClick={() => jumpTo('appointment')} data-testid="button-hero-appointment">
              Begin a conversation <ArrowUpRight size={17} />
            </button>
            <button className="play-button" onClick={() => jumpTo('method')} data-testid="button-watch-method">
              <span><Play size={13} fill="currentColor" /></span> Discover our method
            </button>
          </div>
        </div>
        <div className="hero-foot">
          <span>Studio 04 / Los Angeles</span>
          <span className="scroll-cue"><span /> Scroll to explore</span>
          <span>Est. MMXIV</span>
        </div>
      </section>

      <section className="manifesto section-pad">
        <div className="section-kicker" data-reveal><span>01</span><span className="rule" /><span>The Aurelius standard</span></div>
        <div className="manifesto-grid">
          <h2 data-reveal>Not a wash.<br /><em>A way of seeing.</em></h2>
          <div className="manifesto-copy" data-reveal>
            <p>There are cars that take you somewhere, and cars that make the journey the point. We work with the latter.</p>
            <p>Every Aurelius treatment is a quiet, exacting study of surface, light, and proportion. We do less, better — giving each vehicle the unhurried attention it deserves.</p>
            <button className="text-link" onClick={() => jumpTo('method')} data-testid="link-standard">The standard, in four parts <ArrowDownRight size={16} /></button>
          </div>
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading" data-reveal>
          <div>
            <div className="section-kicker"><span>02</span><span className="rule" /><span>Selected treatments</span></div>
            <h2>For cars with<br /><em>something to say.</em></h2>
          </div>
          <p>From a weekly ritual to a once-in-a-lifetime correction, every service is tailored to the car in front of us.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article className="service-row" key={service.number} data-reveal style={{ '--delay': `${index * 80}ms` } as React.CSSProperties}>
              <span className="service-number">{service.number}</span>
              <div className="service-photo"><img src={service.image} alt={`${service.name} treatment`} /></div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.detail}</p>
                <span className="service-includes">{service.includes}</span>
              </div>
              <div className="service-price"><span>{service.price}</span><ArrowUpRight size={18} /></div>
            </article>
          ))}
        </div>
        <div className="service-note"><Sparkles size={15} /> Every treatment includes a complimentary 20-point condition report.</div>
      </section>

      <section className="method" id="method">
        <div className="method-image" />
        <div className="method-panel section-pad">
          <div className="section-kicker" data-reveal><span>03</span><span className="rule" /><span>Inside the studio</span></div>
          <h2 data-reveal>Precision is<br /><em>a practice.</em></h2>
          <p className="method-intro" data-reveal>Our process is deliberately unhurried. Four stages, one promise: to leave no surface misunderstood.</p>
          <div className="process-list">
            {process.map(([number, title, text], index) => (
              <div className="process-item" data-reveal key={number} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </div>
            ))}
          </div>
          <button className="text-link light-link" onClick={() => jumpTo('appointment')} data-testid="link-method-appointment">See what we can do for your car <ArrowUpRight size={16} /></button>
        </div>
      </section>

      <section className="comparison section-pad" id="gallery">
        <div className="section-heading comparison-heading" data-reveal>
          <div>
            <div className="section-kicker"><span>04</span><span className="rule" /><span>Proof in the surface</span></div>
            <h2>Before is a condition.<br /><em>After is a feeling.</em></h2>
          </div>
          <p>Drag the line to see the difference two days of considered correction can make.</p>
        </div>
        <div className="comparison-frame" data-reveal>
          <img src="https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Paint correction after treatment" className="comparison-after" />
          <div className="comparison-before" style={{ width: `${comparison}%` }}>
            <img src="https://images.pexels.com/photos/193999/pexels-photo-193999.jpeg?auto=compress&cs=tinysrgb&w=1800" alt="Paint before correction" />
          </div>
          <div className="comparison-label before-label">Before cleaning</div>
          <div className="comparison-label after-label">After detailing</div>
          <label className="comparison-slider" style={{ left: `${comparison}%` }}>
            <span className="slider-knob"><ChevronLeft size={14} /><ChevronRight size={14} /></span>
            <input type="range" min="8" max="92" value={comparison} onChange={(event) => setComparison(Number(event.target.value))} aria-label="Compare before and after" data-testid="input-comparison" />
          </label>
        </div>
        <div className="comparison-legend" data-reveal>
          <div>
            <span>01 / Before cleaning</span>
            <p>Road film, dull paint, and surface contamination before the treatment begins.</p>
          </div>
          <div>
            <span>02 / After detailing</span>
            <p>Clearer reflections, deeper gloss, and a finish that feels completely renewed.</p>
          </div>
        </div>
      </section>

      <section className="appointment section-pad" id="appointment">
        <div className="appointment-copy" data-reveal>
          <div className="section-kicker"><span>05</span><span className="rule" /><span>Make an enquiry</span></div>
          <h2>Give your car<br /><em>the room it needs.</em></h2>
          <p>Tell us a little about what you drive and what you have in mind. We will be in touch within one working day to find the right time.</p>
          <div className="contact-details">
            <span><Clock3 size={16} /> Tue – Sat · 8:00 — 18:00</span>
            <span><MapPin size={16} /> 2140 E. 15th Street, Los Angeles</span>
            <span><Phone size={16} /> +1 323 555 0148</span>
          </div>
        </div>
        <div className="booking-card" data-reveal>
          {submitted ? (
            <div className="success-state" data-testid="status-booking-success">
              <span className="success-icon"><Check size={26} /></span>
              <div className="section-kicker"><span>Enquiry received</span></div>
              <h3>We will be in touch<br /><em>shortly.</em></h3>
              <p>Thank you for trusting us with the first detail. A member of our studio will contact you within one working day.</p>
              <button className="text-link" onClick={() => setSubmitted(false)} data-testid="button-new-enquiry">Make another enquiry <ArrowUpRight size={16} /></button>
            </div>
          ) : (
            <form onSubmit={handleBooking} noValidate>
              <div className="form-top"><span>Your private appointment</span><span>01 / 03</span></div>
              <div className="form-grid">
                <label><span>Your name</span><input name="name" type="text" placeholder="First and last" required data-testid="input-name" /></label>
                <label><span>Email address</span><input name="email" type="email" placeholder="you@example.com" required data-testid="input-email" /></label>
                <label><span>Vehicle</span><input name="vehicle" type="text" placeholder="Year, make, model" required data-testid="input-vehicle" /></label>
                <label><span>Service of interest</span><select name="service" required defaultValue="" data-testid="select-service"><option value="" disabled>Select a treatment</option><option>The Aurelius</option><option>Paint Ceremony</option><option>Quiet Maintenance</option><option>Not sure yet</option></select></label>
                <label className="full-field"><span>Anything we should know?</span><textarea name="message" rows={3} placeholder="Tell us about the car, its current condition, or your hopes for the finish." data-testid="input-message" /></label>
              </div>
              {formError && <p className="form-error" data-testid="text-form-error">{formError}</p>}
              <button type="submit" className="button button-gold form-submit" data-testid="button-submit-booking">Request my appointment <ArrowUpRight size={17} /></button>
              <p className="form-privacy">Your details are kept private and used only to arrange your appointment.</p>
            </form>
          )}
        </div>
      </section>

      <section className="journal section-pad" id="journal">
        <div className="section-kicker" data-reveal><span>06</span><span className="rule" /><span>From the Aurelius journal</span></div>
        <div className="journal-grid">
          <article className="journal-feature" data-reveal>
            <div className="journal-image image-one" />
            <span className="journal-category">Materials / 04.18.24</span>
            <h3>Why light is the final material.</h3>
            <button className="text-link" onClick={() => window.alert('The Aurelius Journal is coming soon.')} data-testid="button-read-journal">Read the story <ArrowUpRight size={16} /></button>
          </article>
          <article className="journal-small" data-reveal>
            <div className="journal-image image-two" />
            <span className="journal-category">The studio / 03.02.24</span>
            <h3>A quiet room for loud machines.</h3>
            <button className="arrow-circle" onClick={() => window.alert('The Aurelius Journal is coming soon.')} aria-label="Read studio story" data-testid="button-read-studio-story"><ArrowUpRight size={17} /></button>
          </article>
          <div className="journal-note" data-reveal>
            <Sparkles size={20} />
            <p>“The last 5% is where the character lives.”</p>
            <span>— Atelier note no. 14</span>
          </div>
        </div>
      </section>

      <section className="testimonials section-pad" id="testimonials">
        <div className="testimonial-mark">“</div>
        <div className="testimonial-inner" data-reveal>
          <div className="section-kicker"><span>07</span><span className="rule" /><span>Client notes</span></div>
          <blockquote>{testimonials[activeTestimonial].quote}</blockquote>
          <div className="testimonial-meta"><strong>{testimonials[activeTestimonial].name}</strong><span>{testimonials[activeTestimonial].title}</span></div>
          <div className="testimonial-controls">
            <button onClick={previousTestimonial} aria-label="Previous testimonial" data-testid="button-previous-testimonial"><ChevronLeft size={18} /></button>
            <span>0{activeTestimonial + 1} <i /> 0{testimonials.length}</span>
            <button onClick={nextTestimonial} aria-label="Next testimonial" data-testid="button-next-testimonial"><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-brand"><span className="wordmark-mark">A</span><div><strong>Aurelius</strong><span>Private automotive atelier</span></div></div>
          <div className="footer-callout">A better relationship<br /><em>with your car.</em></div>
          <button className="button button-gold" onClick={() => jumpTo('appointment')} data-testid="button-footer-appointment">Start a conversation <ArrowUpRight size={17} /></button>
        </div>
        <div className="footer-bottom">
          <div><span>© 2024 Aurelius Studio</span><span>Los Angeles, California</span></div>
          <div className="footer-links"><button onClick={() => window.alert('Privacy policy coming soon.')} data-testid="button-privacy">Privacy</button><button onClick={() => window.alert('Instagram opens soon.')} data-testid="button-instagram"><Instagram size={15} /> Instagram</button><button onClick={() => window.alert('Contact: studio@aurelius.la')} data-testid="button-contact"><Mail size={15} /> Contact</button></div>
        </div>
      </footer>
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
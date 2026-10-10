import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {
  FiFeather, FiTruck, FiShoppingBag, FiUsers, FiLifeBuoy, FiShield, FiArrowRight,
} from "react-icons/fi";
import Reveal from "../../components/common/Reveal";
import "./Landing.css";

const roleCards = [
  {
    role: "farmer",
    icon: FiFeather,
    color: "var(--role-farmer)",
    title: "Farmers",
    desc: "List fresh produce, manage stock and track orders from dealers and customers.",
    image: "https://images.unsplash.com/photo-1515276427842-f85802d514a2?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    role: "dealer",
    icon: FiShoppingBag,
    color: "var(--role-dealer)",
    title: "Dealers",
    desc: "Browse produce in bulk, place orders and manage procurement inventory.",
    image: "https://images.unsplash.com/photo-1689693138530-cbcb0582a2ea?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    role: "customer",
    icon: FiUsers,
    color: "var(--role-customer)",
    title: "Customers",
    desc: "Shop fresh agricultural products, pay online and track your delivery.",
    image: "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    role: "delivery",
    icon: FiTruck,
    color: "var(--role-delivery)",
    title: "Delivery Personnel",
    desc: "View assigned drops and update delivery status in real time.",
    image: "https://images.unsplash.com/photo-1587476351660-e9fa4bb8b26c?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    role: "support",
    icon: FiLifeBuoy,
    color: "var(--role-support)",
    title: "Support Staff",
    desc: "Resolve customer queries and keep ticket records up to date.",
    image: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=700&h=520&fit=crop&auto=format&q=80",
  },
  {
    role: "admin",
    icon: FiShield,
    color: "var(--role-admin)",
    title: "Administrators",
    desc: "Oversee users, products and platform-wide activity from one dashboard.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=520&fit=crop&auto=format&q=80",
  },
];

const gallery = [
  { name: "Tomatoes", src: "https://images.unsplash.com/photo-1629398781739-9caec1eb9409?w=600&h=600&fit=crop&auto=format&q=80" },
  { name: "Mangoes", src: "https://images.unsplash.com/photo-1550825570-659f94cc3a9c?w=600&h=600&fit=crop&auto=format&q=80" },
  { name: "Rice", src: "https://images.unsplash.com/photo-1723475158232-819e29803f4d?w=600&h=600&fit=crop&auto=format&q=80" },
  { name: "Spices", src: "https://images.unsplash.com/photo-1504387828636-abeb50778c0c?w=600&h=600&fit=crop&auto=format&q=80" },
];

export default function Landing() {
  return (
    <div>
      <div className="landing-hero">
        <Container>
          <div className="landing-nav">
            <div className="landing-logo">
              <FiFeather /> GreenCart
            </div>
            <div className="d-flex gap-2">
              <Link to="/login" className="btn-gc-outline">Log in</Link>
              <Link to="/register" className="btn-gc-primary">Get started</Link>
            </div>
          </div>
          <Row className="align-items-center py-5">
            <Col lg={7}>
              <Reveal>
                <h1 className="landing-headline">
                  One marketplace for the whole harvest, farm to doorstep.
                </h1>
                <p className="landing-sub">
                  GreenCart connects farmers, dealers and customers directly — with delivery
                  and support teams keeping every order on track, and administrators keeping
                  the whole platform running smoothly.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <Link to="/register" className="btn-gc-accent d-inline-flex align-items-center gap-2">
                    Create an account <FiArrowRight />
                  </Link>
                  <Link to="/login" className="btn-gc-outline">I already have an account</Link>
                </div>
              </Reveal>
            </Col>
            <Col lg={5} className="mt-5 mt-lg-0">
              <Reveal delay={150}>
                <div className="hero-image-wrap">
                  <img src="https://images.unsplash.com/photo-1627989147125-a004d05946d3?w=900&h=700&fit=crop&auto=format&q=80" alt="Fresh harvest crates" />
                  <div className="hero-floating-card">
                    <div className="gc-stat-label">Today on GreenCart</div>
                    <div className="gc-stat-value" style={{ fontSize: "1.4rem" }}>6 roles, 1 platform</div>
                    <hr style={{ borderColor: "var(--color-line)" }} />
                    <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem" }}>
                      <span>Fresh listings</span><strong>240+ qtl</strong>
                    </div>
                    <div className="d-flex justify-content-between mt-2" style={{ fontSize: "0.82rem" }}>
                      <span>Active regions</span><strong>Gujarat &amp; Maharashtra</strong>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="py-5">
        <Reveal>
          <h2 className="mb-1" style={{ fontSize: "1.6rem" }}>Built for every stakeholder</h2>
          <p style={{ color: "var(--color-muted)", maxWidth: "60ch" }}>
            Every role gets a dashboard shaped around what they actually do — no digging
            through menus meant for someone else's job.
          </p>
        </Reveal>
        <Row className="g-3 mt-2">
          {roleCards.map(({ role, icon: Icon, color, title, desc, image }, i) => (
            <Col md={6} lg={4} key={role}>
              <Reveal delay={i * 80}>
                <div className="role-card">
                  <div className="role-card-image">
                    <img src={image} alt={title} loading="lazy" />
                    <span className="role-card-icon" style={{ background: color }}>
                      <Icon size={16} />
                    </span>
                  </div>
                  <div className="role-card-body">
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <Link to="/register" state={{ role }} className="btn-gc-outline text-center">
                      Join as {title.replace(/s$/, "")}
                    </Link>
                  </div>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="gallery-strip">
        <Container className="py-5">
          <Reveal>
            <h2 className="mb-1" style={{ fontSize: "1.6rem" }}>Fresh off the farm</h2>
            <p style={{ color: "var(--color-muted)", maxWidth: "60ch" }}>
              A small taste of what's moving through GreenCart right now.
            </p>
          </Reveal>
          <Row className="g-3 mt-2">
            {gallery.map((item, i) => (
              <Col xs={6} md={3} key={item.name}>
                <Reveal delay={i * 90}>
                  <div className="gallery-tile">
                    <img src={item.src} alt={item.name} loading="lazy" />
                    <span className="gallery-caption">{item.name}</span>
                  </div>
                </Reveal>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div className="stat-strip">
        <Container>
          <Reveal>
            <Row className="text-center g-4">
              <Col md={4}>
                <div className="gc-stat-value">6</div>
                <div className="gc-stat-label">Connected roles</div>
              </Col>
              <Col md={4}>
                <div className="gc-stat-value">React + Node.js</div>
                <div className="gc-stat-label">Built on the MERN-style stack</div>
              </Col>
              <Col md={4}>
                <div className="gc-stat-value">MySQL</div>
                <div className="gc-stat-label">Relational data behind every order</div>
              </Col>
            </Row>
          </Reveal>
        </Container>
      </div>

      <footer className="py-4">
        <Container className="text-center" style={{ color: "var(--color-muted)", fontSize: "0.85rem" }}>
          GreenCart — a unified agricultural marketplace for farmers, dealers and customers.
        </Container>
      </footer>
    </div>
  );
}

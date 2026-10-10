import Reveal from "../common/Reveal";

const BANNER_IMAGES = {
  farmer: "https://images.unsplash.com/photo-1515276427842-f85802d514a2?w=1400&h=440&fit=crop&auto=format&q=80",
  dealer: "https://images.unsplash.com/photo-1689693138530-cbcb0582a2ea?w=1400&h=440&fit=crop&auto=format&q=80",
  customer: "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=1400&h=440&fit=crop&auto=format&q=80",
  delivery: "https://images.unsplash.com/photo-1587476351660-e9fa4bb8b26c?w=1400&h=440&fit=crop&auto=format&q=80",
  support: "https://images.unsplash.com/photo-1553775282-20af80779df7?w=1400&h=440&fit=crop&auto=format&q=80",
  admin: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=440&fit=crop&auto=format&q=80",
};

export default function DashboardBanner({ role, title, subtitle }) {
  return (
    <Reveal>
      <div className={`dash-banner dash-banner-${role}`}>
        <img src={BANNER_IMAGES[role]} alt="" />
        <div className="dash-banner-text">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </Reveal>
  );
}

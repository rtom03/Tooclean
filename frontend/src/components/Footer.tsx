import { ArrowRight } from "lucide-react";
import { useState } from "react";

const navLinks = [
  "Home",
  "Blog",
  "Press",
  "Affiliate Program",
  "FAQ",
  "Customer Service",
  "Privacy Policy",
];
const subLinks = [
  "Terms of Use",
  "International Shopping",
  "Do Not Sell My Personal Information",
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#453224] px-7 pt-16 pb-8 flex flex-col items-center">
      {/* Newsletter */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white mb-3">
          Stay Connected!
        </h2>
        <p className="text-[14px] text-white/60 max-w-md leading-relaxed mb-7">
          Sign up for our emails to receive special offers, expert hair styling
          advice, and the latest updates.
        </p>
        <div className="flex items-center border border-white/30 rounded-full px-5 py-1.5 max-w-sm w-full mx-auto gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-white/40"
          />
          <button className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0 hover:bg-white/90 transition-colors">
            <ArrowRight size={15} className="text-[#453224]" />
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-2xl h-px bg-white/10 mb-9" />

      {/* Primary nav */}
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 mb-3">
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[11px] font-bold tracking-[0.07em] uppercase text-white/70 hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Secondary nav */}
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
        {subLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[11px] font-medium tracking-[0.05em] uppercase text-white/40 hover:text-white/70 transition-colors"
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Socials */}
      {/* <div className="flex items-center gap-5 mb-10">
        {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="text-white/50 hover:text-white transition-colors"
          >
            <Icon size={20} />
          </a>
        ))}
      </div> */}

      {/* Copyright */}
      <p className="text-[11px] tracking-widest uppercase text-white/30">
        © 2026 Too Clean Inc
      </p>
    </footer>
  );
};

export default Footer;

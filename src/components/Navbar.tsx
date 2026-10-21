import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SupportTab } from './SupportModal';
import { useMealProgram } from '../context/MealProgramContext';

interface NavbarProps {
  onOpenSupport: (tab?: SupportTab) => void;
}

interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Meal Box', path: '/meal-box' },
  { label: 'Celebrate & Give', path: '/celebrate-and-give' },
  { label: 'Track Meal', path: '/track-meal' },
  { label: 'Projects & Impact', path: '/projects' },
  { label: 'CSR & Tax', path: '/csr-tax-benefits' },
  { label: 'About & Contact', path: '/about' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenSupport }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { cartCount } = useMealProgram();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-brand-black/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg'
          : 'bg-brand-black/85 backdrop-blur-xs border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          className="font-display-sans uppercase text-xl sm:text-2xl font-black tracking-[-0.04em] whitespace-nowrap text-white hover:text-brand-green transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          ZERO <span className="text-brand-green">HUNGER</span>
        </Link>

        {/* Zone 2: Primary Navigation Links - All 8 pages visible */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `relative py-1 text-[15px] xl:text-base font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 group ${
                  isActive
                    ? 'text-brand-green'
                    : 'text-white/85 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                  </span>
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-0.5 transition-transform duration-200 origin-left ${
                      isActive
                        ? 'scale-x-100 bg-brand-green'
                        : 'scale-x-0 group-hover:scale-x-100 bg-brand-lime'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary Actions + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          {cartCount > 0 && (
            <Link
              to="/meal-box"
              aria-label={`View Meal Box Cart with ${cartCount} items`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-mono-tabular font-bold border border-brand-green/40 bg-brand-slate text-white hover:border-brand-green hover:bg-brand-green hover:text-brand-black transition-colors whitespace-nowrap group"
            >
              <ShoppingBag className="w-4 h-4 text-brand-green group-hover:text-brand-black" />
              <span>{cartCount}</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => onOpenSupport('donate')}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-[10px] text-base font-black tracking-tight whitespace-nowrap bg-brand-green text-brand-black hover:bg-brand-lime transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
          >
            Support the Mission
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={
              mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="lg:hidden w-11 h-11 flex items-center justify-center text-white hover:text-brand-green transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-brand-slate border-b border-white/10 px-5 pt-4 pb-8 shadow-2xl"
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col divide-y divide-white/10"
            >
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `py-3.5 text-lg font-display-sans uppercase font-black tracking-tight flex items-center justify-between ${
                      isActive ? 'text-brand-green' : 'text-white'
                    }`
                  }
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono-tabular text-brand-green">
                    →
                  </span>
                </NavLink>
              ))}
            </nav>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSupport('donate');
                }}
                className="w-full py-3.5 rounded-[10px] bg-brand-green text-brand-black text-base font-black tracking-tight hover:bg-brand-lime transition-colors cursor-pointer"
              >
                Support the Mission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

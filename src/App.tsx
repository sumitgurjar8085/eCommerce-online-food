/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  Star,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Check,
  Truck,
  ShieldCheck,
  Clock,
  Phone,
  Plus,
  Minus,
  Trash2,
  Eye,
  Leaf,
  Filter,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Gift
} from 'lucide-react';

import heroCrateImg from './assets/images/hero_vegetable_crate_1791710724972.jpg';
import promoLeavesImg from './assets/images/promo_nature_leaves_1791710738640.jpg';
import dealCitrusImg from './assets/images/deal_citrus_berries_1791710751656.jpg';
import dealProduceImg from './assets/images/deal_farm_produce_1791710761151.jpg';

// Types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  discountPercent?: number;
  badge?: string;
  imageUrl: string;
  description: string;
  soldCount?: number;
  totalStock?: number;
  isDailyBest?: boolean;
}

interface Category {
  id: string;
  name: string;
  itemCount: number;
  bgColor: string;
  iconBg: string;
  iconEmoji: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Category Data
const CATEGORIES: Category[] = [
  { id: 'drinks', name: 'Drinks & Milk', itemCount: 28, bgColor: '#E8F6EF', iconBg: '#D2EBE1', iconEmoji: '🥛' },
  { id: 'kiwi', name: 'Fresh Kiwi', itemCount: 14, bgColor: '#F4F9DE', iconBg: '#E7F2BF', iconEmoji: '🥝' },
  { id: 'vegetables', name: 'Vegetables', itemCount: 46, bgColor: '#EAF8EE', iconBg: '#CDEED8', iconEmoji: '🥦' },
  { id: 'fruits', name: 'Fresh Fruits', itemCount: 39, bgColor: '#FEF3E6', iconBg: '#FDE1C3', iconEmoji: '🍎' },
  { id: 'cookies', name: 'Cookies & Snacks', itemCount: 22, bgColor: '#FDF6E2', iconBg: '#FCE7B8', iconEmoji: '🍪' },
  { id: 'pastries', name: 'Pastries & Breads', itemCount: 19, bgColor: '#FCEFE9', iconBg: '#FADCD0', iconEmoji: '🥐' },
  { id: 'herbs', name: 'Fresh Herbs', itemCount: 16, bgColor: '#E7F7ED', iconBg: '#D1EFE0', iconEmoji: '🌿' },
  { id: 'cereals', name: 'Organic Cereals', itemCount: 25, bgColor: '#F6F1EA', iconBg: '#E9DECf', iconEmoji: '🌾' },
];

// Product Data
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Seeds of Change Organic Quinoa & Veggies',
    category: 'Vegetables',
    price: 3.50,
    originalPrice: 4.80,
    unit: '500g',
    rating: 4.8,
    reviewsCount: 84,
    discountPercent: 27,
    badge: 'Popular',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Fresh certified organic quinoa mix infused with bell peppers, sweet peas, and sea salt.',
  },
  {
    id: 'p2',
    name: 'Organic Vine-Ripened Heirloom Tomatoes',
    category: 'Vegetables',
    price: 2.80,
    originalPrice: 3.90,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 112,
    discountPercent: 28,
    badge: 'Save $1.10',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    description: 'Juicy, farm-harvested heirloom tomatoes picked at peak ripeness for full garden flavor.',
  },
  {
    id: 'p3',
    name: 'Crunchy Garden Harvest Green Salad Bowl',
    category: 'Vegetables',
    price: 4.20,
    originalPrice: 5.50,
    unit: '1 bowl',
    rating: 4.7,
    reviewsCount: 65,
    discountPercent: 23,
    badge: 'Fresh Daily',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    description: 'Pre-washed tender baby romaine, arugula, cherry tomatoes, and cucumber with herb vinaigrette.',
  },
  {
    id: 'p4',
    name: 'Crisp Organic Baby Carrots with Feathery Tops',
    category: 'Vegetables',
    price: 2.40,
    originalPrice: 3.20,
    unit: '800g',
    rating: 4.9,
    reviewsCount: 92,
    discountPercent: 25,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5c317?auto=format&fit=crop&w=600&q=80',
    description: 'Sweet, tender baby carrots harvested with their nutritious greens intact.',
  },
  {
    id: 'p5',
    name: 'Golden Sweet Organic Kiwi Pack',
    category: 'Fresh Fruits',
    price: 3.90,
    originalPrice: 4.90,
    unit: '6 pcs',
    rating: 4.9,
    reviewsCount: 78,
    discountPercent: 20,
    badge: 'Super Sweet',
    imageUrl: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=600&q=80',
    description: 'Sun-kissed golden kiwis with tropical sweet flavor and ultra-rich vitamin C content.',
  },
  {
    id: 'p6',
    name: 'Farm Fresh Organic Whole Milk Glass Bottle',
    category: 'Drinks & Milk',
    price: 4.10,
    originalPrice: 5.00,
    unit: '1 Liter',
    rating: 4.8,
    reviewsCount: 140,
    discountPercent: 18,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
    description: 'Pasture-raised, low-temperature pasteurized creamy whole milk in an eco glass bottle.',
  },
  {
    id: 'p7',
    name: 'Artisanal Sourdough Country Loaf',
    category: 'Pastries & Breads',
    price: 3.80,
    originalPrice: 4.50,
    unit: '1 loaf',
    rating: 4.9,
    reviewsCount: 88,
    discountPercent: 15,
    badge: 'Bakery',
    imageUrl: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
    description: 'Slow naturally fermented sourdough with a blistered caramel crust and pillowy crumb.',
  },
  {
    id: 'p8',
    name: 'Organic Mixed Wild Blueberries & Raspberries',
    category: 'Fresh Fruits',
    price: 5.40,
    originalPrice: 6.80,
    unit: '350g',
    rating: 4.9,
    reviewsCount: 104,
    discountPercent: 21,
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=600&q=80',
    description: 'Hand-picked organic wild berries packed with antioxidants and natural freshness.',
  },
];

// Daily Best Sells
const DAILY_BEST_SELLS: Product[] = [
  {
    id: 'd1',
    name: 'Cold-Pressed Green Detox Cleanser Juice',
    category: 'Drinks & Milk',
    price: 4.80,
    originalPrice: 6.50,
    unit: '500ml',
    rating: 4.9,
    reviewsCount: 132,
    discountPercent: 26,
    badge: 'Best Seller',
    soldCount: 42,
    totalStock: 50,
    isDailyBest: true,
    imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    description: 'Pure cold-pressed cucumber, green apple, kale, ginger, and lemon with zero added sugars.',
  },
  {
    id: 'd2',
    name: 'Organic Golden Kiwi Eco Wooden Box',
    category: 'Fresh Fruits',
    price: 7.90,
    originalPrice: 9.80,
    unit: '1.2 kg',
    rating: 4.8,
    reviewsCount: 89,
    discountPercent: 19,
    badge: 'Limited',
    soldCount: 38,
    totalStock: 45,
    isDailyBest: true,
    imageUrl: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?auto=format&fit=crop&w=600&q=80',
    description: 'Export grade golden kiwifruit packed in a sustainable wooden keepsake crate.',
  },
  {
    id: 'd3',
    name: 'Mediterranean Rainbow Salad Bowl with Feta',
    category: 'Vegetables',
    price: 5.60,
    originalPrice: 7.20,
    unit: '450g',
    rating: 4.9,
    reviewsCount: 94,
    discountPercent: 22,
    badge: 'Chef Choice',
    soldCount: 29,
    totalStock: 35,
    isDailyBest: true,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp organic romaine, kalamata olives, organic cucumbers, and authentic Greek feta.',
  },
  {
    id: 'd4',
    name: 'Farm Fresh Organic Vegetable Medley Mix',
    category: 'Vegetables',
    price: 6.20,
    originalPrice: 8.00,
    unit: '1.5 kg',
    rating: 4.9,
    reviewsCount: 110,
    discountPercent: 22,
    badge: 'Special Harvest',
    soldCount: 51,
    totalStock: 60,
    isDailyBest: true,
    imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80',
    description: 'Pre-portioned seasonal medley with zucchini, bell peppers, asparagus, and red onions.',
  },
];

export default function App() {
  // Navigation & filtering state
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<string>('All Categories');

  // Interactive shopping state
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 2 },
    { product: PRODUCTS[1], quantity: 1 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['p1', 'p3', 'd2']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [heroEmail, setHeroEmail] = useState('');
  const [footerEmail, setFooterEmail] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Countdown timer simulation for Deals of the day
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 48,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toast feedback trigger
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    triggerNotification(`Added "${product.name.slice(0, 24)}..." to your cart!`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    triggerNotification('Item removed from cart');
  };

  // Wishlist toggle
  const toggleWishlist = (productId: string, productName: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerNotification(`Removed from your wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        triggerNotification(`Saved to wishlist: ${productName.slice(0, 22)}...`);
        return [...prev, productId];
      }
    });
  };

  // Cart computations
  const totalCartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cart]
  );

  const freeDeliveryThreshold = 35.0;
  const progressToFreeDelivery = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  // Filtered popular products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        activeCategoryFilter === 'All' ||
        item.category.toLowerCase().includes(activeCategoryFilter.toLowerCase());
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  const handleHeroSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroEmail) {
      setIsSubscribed(true);
      triggerNotification(`Subscribed! 20% discount code sent to ${heroEmail}`);
      setHeroEmail('');
    }
  };

  const handleFooterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (footerEmail) {
      triggerNotification(`Thank you! You are subscribed with ${footerEmail}`);
      setFooterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#222222] font-['Poppins',sans-serif] selection:bg-[#C3E8D8] selection:text-[#222222]">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 bg-[#222222] text-white text-sm font-medium rounded-xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 border border-white/10">
          <CheckCircle2 className="w-5 h-5 text-[#C3E8D8] shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#FAF8F3] border-b border-[#E8E4DA] text-xs text-[#666666] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <span className="hover:text-[#222222] transition-colors cursor-pointer font-medium">Fresh Vegetables</span>
            <span className="hidden sm:inline text-[#D0CCC2]">•</span>
            <span className="hover:text-[#222222] transition-colors cursor-pointer font-medium">Organic Food</span>
            <span className="hidden md:inline text-[#D0CCC2]">•</span>
            <span className="hidden md:inline text-[#777777]">100% Secure delivery without contacting the courier</span>
          </div>
          <div className="flex items-center gap-5 ml-auto text-xs">
            <div className="hidden lg:flex items-center gap-1.5 text-[#555555]">
              <Phone className="w-3.5 h-3.5 text-[#3A9467]" />
              <span>Need help? Call Us: </span>
              <strong className="text-[#222222] font-semibold">+1800 900 122</strong>
            </div>
            <div className="h-3 w-px bg-[#E2DED4] hidden lg:block" />
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#222222]">
              <span>USD $</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#222222]">
              <span>English</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER BAR */}
      <header className="bg-white border-b border-[#EAE6DD] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo Zone */}
          <div className="flex items-center gap-8">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-[#D2EBE1] flex items-center justify-center text-[#222222] group-hover:bg-[#C3E8D8] transition-colors">
                <ShoppingBag className="w-5 h-5 text-[#215E40]" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tight text-[#222222] leading-none">
                  Grocery
                </span>
                <span className="text-[10px] tracking-widest text-[#3A9467] font-semibold uppercase mt-0.5">
                  Organic Market
                </span>
              </div>
            </a>
          </div>

          {/* Search Bar with Category Dropdown */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
            <div className="w-full flex items-center bg-[#F8F6F0] border border-[#DDD8CB] rounded-full px-3.5 py-1.5 focus-within:border-[#222222] focus-within:ring-2 focus-within:ring-[#C3E8D8]/50 transition-all">
              <div className="relative border-r border-[#D9D4C7] pr-2.5 mr-2.5 hidden lg:block">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#444444] focus:outline-hidden cursor-pointer pr-4 appearance-none"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fresh Fruits">Fresh Fruits</option>
                  <option value="Drinks & Milk">Drinks & Milk</option>
                  <option value="Pastries & Breads">Pastries & Breads</option>
                </select>
                <ChevronDown className="w-3 h-3 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-[#777777]" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for vegetables, fruits, dairy, groceries..."
                className="w-full bg-transparent text-sm text-[#222222] placeholder-[#888888] focus:outline-hidden"
              />
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-[#222222] text-white flex items-center justify-center hover:bg-[#333333] transition-colors shrink-0 cursor-pointer ml-1"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#444444] hover:text-[#222222] hover:bg-[#F3EFE6] rounded-full transition-colors cursor-pointer"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-6 h-6" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 min-w-[18px] h-[18px] bg-[#222222] text-[#C3E8D8] text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Red Counter Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 p-2 sm:px-3 text-[#222222] bg-[#F8F6F0] hover:bg-[#EDE8DC] rounded-full transition-colors border border-[#E2DED4] cursor-pointer"
              title="View Cart"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-[#222222]" />
                <span className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] bg-[#EF4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs">
                  {totalCartCount}
                </span>
              </div>
              <span className="hidden sm:inline text-xs font-semibold text-[#222222] ml-1">
                ${cartSubtotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#222222] hover:bg-[#F3EFE6] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* NAVIGATION BAR WITH MENU LINKS */}
        <div className="border-t border-[#EDE9DF] hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-7">
              {/* Category Dropdown Pill */}
              <button
                onClick={() => setActiveCategoryFilter('All')}
                className="flex items-center gap-2 px-4 py-2 bg-[#D2EBE1] hover:bg-[#C3E8D8] text-[#1E5638] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>Browse All Categories</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {/* Nav links */}
              <nav className="flex items-center gap-6 text-sm font-medium text-[#444444]">
                <button
                  onClick={() => setActiveCategoryFilter('All')}
                  className={`hover:text-[#222222] transition-colors cursor-pointer ${
                    activeCategoryFilter === 'All' ? 'text-[#222222] font-semibold underline underline-offset-4 decoration-[#3A9467] decoration-2' : ''
                  }`}
                >
                  Home
                </button>
                <a href="#featured-categories" className="hover:text-[#222222] transition-colors">Categories</a>
                <a href="#popular-products" className="hover:text-[#222222] transition-colors">Grocery</a>
                <a href="#daily-best-sells" className="hover:text-[#222222] transition-colors">Daily Best</a>
                <a href="#deals-of-the-day" className="hover:text-[#222222] transition-colors">Deals</a>
                <a href="#footer-section" className="hover:text-[#222222] transition-colors">Store Info</a>
              </nav>
            </div>

            {/* Right Hotline Callout */}
            <div className="flex items-center gap-2 text-xs text-[#555555]">
              <div className="w-7 h-7 rounded-full bg-[#EBF7F1] flex items-center justify-center text-[#215E40]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-sm font-bold text-[#222222] tracking-tight leading-none">1900 - 888</div>
                <div className="text-[10px] text-[#777777] font-medium leading-tight">24/7 Support Center</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EDE9DF] bg-white px-4 py-4 space-y-3">
            <div className="flex items-center bg-[#F8F6F0] border border-[#DDD8CB] rounded-full px-3 py-1.5 mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groceries..."
                className="w-full bg-transparent text-sm focus:outline-hidden"
              />
              <Search className="w-4 h-4 text-[#666666]" />
            </div>
            <div className="flex flex-col gap-2 text-sm font-medium">
              <button
                onClick={() => { setActiveCategoryFilter('All'); setMobileMenuOpen(false); }}
                className="text-left py-1.5 font-semibold text-[#222222]"
              >
                Home
              </button>
              <a
                href="#featured-categories"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-[#555555] hover:text-[#222222]"
              >
                Categories
              </a>
              <a
                href="#popular-products"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-[#555555] hover:text-[#222222]"
              >
                Popular Products
              </a>
              <a
                href="#daily-best-sells"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-[#555555] hover:text-[#222222]"
              >
                Daily Best Sells
              </a>
              <a
                href="#deals-of-the-day"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 text-[#555555] hover:text-[#222222]"
              >
                Deals Of The Day
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO BANNER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-10">
        <div className="relative rounded-3xl overflow-hidden bg-[#D2EBE1] border border-[#BFDFD2] min-h-[460px] flex items-center shadow-xs">
          {/* Subtle rounded beige organic shape on the right */}
          <div
            className="absolute top-0 right-0 w-[58%] h-full bg-[#FAF5EC]/70 rounded-l-[160px] pointer-events-none hidden md:block"
            aria-hidden="true"
          />

          <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center p-6 sm:p-12 lg:p-16">
            {/* Left Hero Content */}
            <div className="md:col-span-7 lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#BDE0D2] text-xs font-semibold text-[#1F5F3E]">
                <Sparkles className="w-3.5 h-3.5 text-[#2E8558]" />
                <span>100% Certified Organic & Farm Harvest</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#222222] leading-[1.12]">
                Fresh Vegetables <br />
                <span className="text-[#1E603E]">Big discount</span>
              </h1>

              <p className="text-sm sm:text-base text-[#4A5D53] max-w-lg leading-relaxed">
                Save up to 50% off on your first order with free delivery. Enjoy certified organic and fresh groceries directly from local farms.
              </p>

              {/* Newsletter / Subscribe CTA */}
              <form onSubmit={handleHeroSubscribe} className="pt-2 max-w-md">
                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-0 bg-white sm:rounded-full p-1.5 border border-[#BFDFD2] rounded-2xl shadow-xs">
                  <div className="flex items-center gap-2 w-full px-3 py-1">
                    <Leaf className="w-4 h-4 text-[#3A9467] shrink-0" />
                    <input
                      type="email"
                      required
                      value={heroEmail}
                      onChange={(e) => setHeroEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full text-xs sm:text-sm bg-transparent text-[#222222] placeholder-[#888888] focus:outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#222222] hover:bg-[#333333] text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 shrink-0 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <span>Subscribe now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
                {isSubscribed && (
                  <p className="text-xs text-[#1F5F3E] font-medium mt-2 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Welcome! Check your inbox for your 20% discount coupon code.</span>
                  </p>
                )}
              </form>

              {/* Trust markers */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-[#446252] font-medium">
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2E8558]" />
                  <span>Free next-day delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-[#2E8558]" />
                  <span>Farm fresh certified</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image & Floating Card */}
            <div className="md:col-span-5 lg:col-span-6 flex justify-center items-center relative">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-white">
                <img
                  src={heroCrateImg}
                  alt="Wooden crate filled with fresh vegetables"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />

                {/* Floating overlay card: 'Fresh Vegetables' */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-3.5 shadow-lg border border-[#E8E4DA] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                  <div className="w-10 h-10 rounded-lg bg-[#D2EBE1] flex items-center justify-center text-[#1E5F3F] shrink-0">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#222222] block leading-tight">Fresh Vegetables</span>
                    <div className="flex items-center gap-1 text-[11px] text-[#2E8558] font-semibold mt-0.5">
                      <Star className="w-3 h-3 fill-[#2E8558]" />
                      <span>100% Organic Fresh</span>
                    </div>
                  </div>
                </div>

                {/* Floating Discount Tag */}
                <div className="absolute top-4 right-4 bg-[#222222] text-[#C3E8D8] text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  Up to 50% Off
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES SECTION */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#222222]">
              Featured Categories
            </h2>
            <span className="hidden sm:inline-block text-xs bg-[#E8F6EF] text-[#236643] font-semibold px-2.5 py-1 rounded-full">
              Seasonal Picks
            </span>
          </div>
          <button
            onClick={() => setActiveCategoryFilter('All')}
            className="text-xs sm:text-sm font-semibold text-[#222222] hover:text-[#215E40] flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Horizontal Category Circular Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategoryFilter.toLowerCase() === cat.name.toLowerCase() ||
              (activeCategoryFilter === 'Vegetables' && cat.id === 'vegetables') ||
              (activeCategoryFilter === 'Fresh Fruits' && cat.id === 'fruits');

            return (
              <div
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'vegetables') setActiveCategoryFilter('Vegetables');
                  else if (cat.id === 'fruits' || cat.id === 'kiwi') setActiveCategoryFilter('Fresh Fruits');
                  else if (cat.id === 'drinks') setActiveCategoryFilter('Drinks & Milk');
                  else setActiveCategoryFilter(cat.name);
                }}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl text-center cursor-pointer transition-all duration-200 border ${
                  isSelected
                    ? 'border-[#222222] shadow-md -translate-y-1 bg-white'
                    : 'border-black/5 hover:-translate-y-1 hover:shadow-md bg-white'
                }`}
              >
                {/* Soft pastel background circle */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 hover:scale-110 shadow-xs"
                  style={{ backgroundColor: cat.bgColor }}
                >
                  <span className="text-2xl select-none" role="img" aria-label={cat.name}>
                    {cat.iconEmoji}
                  </span>
                </div>
                <h3 className="text-xs font-semibold text-[#222222] line-clamp-1 mb-1">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#777777]">
                  {cat.itemCount} items
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* POPULAR PRODUCTS SECTION */}
      <section id="popular-products" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#222222]">
              Popular Products
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Top farm-fresh favorites hand-selected daily for you
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Vegetables', 'Fresh Fruits', 'Drinks & Milk', 'Pastries & Breads'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategoryFilter(tab)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all shrink-0 cursor-pointer ${
                  activeCategoryFilter === tab
                    ? 'bg-[#222222] text-white shadow-xs'
                    : 'bg-white text-[#555555] hover:text-[#222222] border border-[#E2DDD3]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-[#E8E4DA] p-4 flex flex-col justify-between hover:shadow-xl hover:border-[#D0C9BA] transition-all duration-300 relative"
              >
                {/* Badges & Wishlist Action Bar */}
                <div className="flex items-center justify-between mb-2">
                  {product.discountPercent ? (
                    <span className="text-[11px] font-bold bg-[#EF4444] text-white px-2.5 py-0.5 rounded-full">
                      -{product.discountPercent}%
                    </span>
                  ) : product.badge ? (
                    <span className="text-[11px] font-semibold bg-[#D2EBE1] text-[#1E5F3F] px-2.5 py-0.5 rounded-full">
                      {product.badge}
                    </span>
                  ) : (
                    <span />
                  )}

                  <div className="flex items-center gap-1">
                    {/* Quick View Button */}
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-8 h-8 rounded-full bg-[#F8F6F0] text-[#666666] hover:text-[#222222] hover:bg-[#EAE5D9] flex items-center justify-center transition-colors cursor-pointer"
                      title="Quick View"
                      aria-label="Quick View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {/* Wishlist Heart Icon */}
                    <button
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-[#F8F6F0] text-[#666666] hover:text-[#222222] hover:bg-[#EAE5D9]'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Product Image */}
                <div
                  onClick={() => setSelectedProduct(product)}
                  className="w-full aspect-4/3 rounded-xl overflow-hidden bg-[#FAF8F5] mb-4 cursor-pointer relative group-hover:opacity-95"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="text-sm font-bold text-[#222222] hover:text-[#215E40] transition-colors line-clamp-2 cursor-pointer mt-0.5 leading-snug"
                    >
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#777777] font-medium">
                      ({product.reviewsCount})
                    </span>
                  </div>

                  {/* Pricing & Add to Cart button */}
                  <div className="pt-3 border-t border-[#F2EFE8] flex items-center justify-between gap-2 mt-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-[#222222]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#999999] line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#888888]">
                        Per {product.unit}
                      </span>
                    </div>

                    {/* Dark Rectangular / Pill Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3.5 py-2 bg-[#222222] hover:bg-[#383838] active:scale-95 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#C3E8D8]" />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DAILY BEST SELLS SECTION */}
      <section id="daily-best-sells" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#222222]">
              Daily Best Sells
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Top selling organic staples with limited quantity farm availability
            </p>
          </div>
          <button
            onClick={() => setActiveCategoryFilter('All')}
            className="text-xs sm:text-sm font-semibold text-[#222222] hover:text-[#215E40] flex items-center gap-1 transition-colors cursor-pointer group"
          >
            <span>View all</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 2-Column Split: Left Promo Card + Right 2x2 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Promo Card: Large pastel green card with leaf graphics */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden relative bg-[#D2EBE1] border border-[#BFDFD2] p-8 flex flex-col justify-between shadow-xs min-h-[420px]">
            {/* Background Botanical Image / Scrim */}
            <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
              <img
                src={promoLeavesImg}
                alt="Botanical lush leaves"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1F5F3E] bg-white/70 px-2.5 py-1 rounded-md">
                100% Organic & Fresh
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight leading-tight">
                Bring nature <br />
                into your home
              </h3>
              <p className="text-xs sm:text-sm text-[#3E5C4B] leading-relaxed">
                Start your day healthy with hand-harvested organic microgreens, cold-pressed elixirs, and crisp farm vegetables.
              </p>
            </div>

            <div className="relative z-10 pt-6">
              <a
                href="#popular-products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#222222] text-xs font-bold shadow-md hover:bg-[#FAF8F5] transition-all cursor-pointer group"
              >
                <span>Shop now</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#222222] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Grid: 2x2 product card layout */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {DAILY_BEST_SELLS.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const sold = product.soldCount || 30;
              const total = product.totalStock || 50;
              const percentSold = Math.round((sold / total) * 100);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E8E4DA] p-5 flex flex-col justify-between hover:shadow-xl hover:border-[#D0C9BA] transition-all duration-300 relative group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold bg-[#EF4444] text-white px-2.5 py-0.5 rounded-full">
                      -{product.discountPercent}%
                    </span>

                    <button
                      onClick={() => toggleWishlist(product.id, product.name)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isWishlisted
                          ? 'bg-rose-50 text-rose-500'
                          : 'bg-[#F8F6F0] text-[#666666] hover:text-[#222222] hover:bg-[#EAE5D9]'
                      }`}
                      title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                      aria-label="Wishlist toggle"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Image */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="w-full aspect-16/10 rounded-xl overflow-hidden bg-[#FAF8F5] mb-3 cursor-pointer"
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <div>
                      <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => setSelectedProduct(product)}
                        className="text-sm font-bold text-[#222222] hover:text-[#215E40] transition-colors cursor-pointer line-clamp-1"
                      >
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#777777] font-medium">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-[#222222]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-[#999999] line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Stock Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="w-full bg-[#EFECE4] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-[#215E40] h-full rounded-full transition-all duration-500"
                          style={{ width: `${percentSold}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-[#777777] font-medium">
                        <span>Sold: {sold}/{total}</span>
                        <span>{percentSold}%</span>
                      </div>
                    </div>

                    {/* Add to cart button */}
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2.5 mt-2 bg-[#222222] hover:bg-[#383838] active:scale-98 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      <ShoppingCart className="w-3.5 h-3.5 text-[#C3E8D8]" />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DEALS OF THE DAY SECTION */}
      <section id="deals-of-the-day" className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#222222]">
              Deals Of The Day
            </h2>
            <p className="text-xs text-[#777777] mt-1">
              Fresh fruit & vegetable harvest bundles ending soon
            </p>
          </div>

          {/* Real-time countdown boxes */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#555555] mr-1 hidden sm:inline">Expires in:</span>
            <div className="flex items-center gap-1.5 text-center">
              <div className="bg-white border border-[#E0DBCF] rounded-lg px-2.5 py-1 shadow-2xs">
                <span className="block text-xs font-bold text-[#222222] tabular-nums">{timeLeft.days}</span>
                <span className="text-[9px] text-[#888888] uppercase">Days</span>
              </div>
              <span className="text-[#888888] font-bold">:</span>
              <div className="bg-white border border-[#E0DBCF] rounded-lg px-2.5 py-1 shadow-2xs">
                <span className="block text-xs font-bold text-[#222222] tabular-nums">{timeLeft.hours}</span>
                <span className="text-[9px] text-[#888888] uppercase">Hours</span>
              </div>
              <span className="text-[#888888] font-bold">:</span>
              <div className="bg-white border border-[#E0DBCF] rounded-lg px-2.5 py-1 shadow-2xs">
                <span className="block text-xs font-bold text-[#222222] tabular-nums">{timeLeft.minutes}</span>
                <span className="text-[9px] text-[#888888] uppercase">Mins</span>
              </div>
              <span className="text-[#888888] font-bold">:</span>
              <div className="bg-white border border-[#E0DBCF] rounded-lg px-2.5 py-1 shadow-2xs">
                <span className="block text-xs font-bold text-[#222222] tabular-nums">{timeLeft.seconds}</span>
                <span className="text-[9px] text-[#888888] uppercase">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Large Banner Cards Showcasing Bundles at Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Deal 1: Citrus & Berry Bundle */}
          <div className="rounded-3xl overflow-hidden bg-white border border-[#E2DDD3] shadow-md flex flex-col group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-16/9 w-full overflow-hidden bg-[#FBF9F5]">
              <img
                src={dealCitrusImg}
                alt="Fresh Citrus and Berries Bundle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#222222] text-[#C3E8D8] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                35% OFF
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-[#222222] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border border-[#E8E4DA]">
                Only $14.50 <span className="text-[10px] text-[#888888] line-through ml-1">$22.00</span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#215E40] uppercase tracking-wider">
                  Organic Fruits & Orchard
                </span>
                <h3 className="text-xl font-bold text-[#222222] mt-1 group-hover:text-[#215E40] transition-colors">
                  Fresh Organic Citrus & Berry Selection
                </h3>
                <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                  Handpicked Spanish lemons, fresh Persian limes, ripe strawberries, and blackberries. Packed fresh in artisanal packaging.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-[#555555]">
                  <span className="font-semibold text-[#222222]">Weight:</span> 2.5 kg family pack
                </div>
                <button
                  onClick={() => {
                    addToCart({
                      id: 'deal-citrus-bundle',
                      name: 'Fresh Organic Citrus & Berry Selection',
                      category: 'Fresh Fruits',
                      price: 14.50,
                      originalPrice: 22.00,
                      unit: '2.5 kg pack',
                      rating: 4.9,
                      reviewsCount: 160,
                      discountPercent: 35,
                      imageUrl: dealCitrusImg,
                      description: 'Handpicked Spanish lemons, Persian limes, strawberries, and berries.',
                    });
                  }}
                  className="px-5 py-2.5 bg-[#222222] hover:bg-[#383838] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#C3E8D8]" />
                  <span>Add bundle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Deal 2: Curated Farm Produce Bundle */}
          <div className="rounded-3xl overflow-hidden bg-white border border-[#E2DDD3] shadow-md flex flex-col group hover:shadow-xl transition-all duration-300">
            <div className="relative aspect-16/9 w-full overflow-hidden bg-[#FBF9F5]">
              <img
                src={dealProduceImg}
                alt="Curated Farm Fresh Vegetable Harvest Box"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#222222] text-[#C3E8D8] text-xs font-bold px-3 py-1 rounded-full shadow-md">
                40% OFF
              </div>
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs text-[#222222] text-xs font-bold px-3 py-1.5 rounded-xl shadow-md border border-[#E8E4DA]">
                Only $18.90 <span className="text-[10px] text-[#888888] line-through ml-1">$31.50</span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-[#215E40] uppercase tracking-wider">
                  Farm Harvest Box
                </span>
                <h3 className="text-xl font-bold text-[#222222] mt-1 group-hover:text-[#215E40] transition-colors">
                  Curated Farm Fresh Vegetable Harvest Box
                </h3>
                <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                  Organic purple cabbage, farm radishes, crisp snap peas, and golden squash harvested directly from certified sustainable family growers.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-xs text-[#555555]">
                  <span className="font-semibold text-[#222222]">Weight:</span> 4.0 kg crate
                </div>
                <button
                  onClick={() => {
                    addToCart({
                      id: 'deal-veggie-harvest',
                      name: 'Curated Farm Fresh Vegetable Harvest Box',
                      category: 'Vegetables',
                      price: 18.90,
                      originalPrice: 31.50,
                      unit: '4.0 kg crate',
                      rating: 5.0,
                      reviewsCount: 215,
                      discountPercent: 40,
                      imageUrl: dealProduceImg,
                      description: 'Purple cabbage, radishes, snap peas, and golden squash from certified sustainable farms.',
                    });
                  }}
                  className="px-5 py-2.5 bg-[#222222] hover:bg-[#383838] text-white text-xs font-semibold rounded-lg flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5 text-[#C3E8D8]" />
                  <span>Add bundle</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PERKS / TRUST STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D2EBE1] flex items-center justify-center text-[#1E5F3F] shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#222222]">Free Delivery</h4>
              <p className="text-xs text-[#777777] mt-0.5">On all orders over $35</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4F9DE] flex items-center justify-center text-[#4B681C] shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#222222]">100% Organic</h4>
              <p className="text-xs text-[#777777] mt-0.5">Direct from certified farms</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FEF3E6] flex items-center justify-center text-[#B45309] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#222222]">Safe & Contactless</h4>
              <p className="text-xs text-[#777777] mt-0.5">Sanitized insulated packaging</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#E8E4DA] flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FCEFE9] flex items-center justify-center text-[#BE3B28] shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#222222]">Easy Returns</h4>
              <p className="text-xs text-[#777777] mt-0.5">100% money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & NEWSLETTER SECTION */}
      <footer id="footer-section" className="bg-white border-t border-[#EAE6DD] mt-12 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Newsletter Box */}
          <div className="bg-[#D2EBE1] rounded-3xl p-8 sm:p-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#BDE0D2]">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
                Stay home & get your daily needs from our shop
              </h3>
              <p className="text-xs sm:text-sm text-[#3E5C4B]">
                Start your daily shopping with <strong className="text-[#1E5F3F]">Grocery Organic Store</strong> and get special weekly coupons.
              </p>
            </div>

            <form onSubmit={handleFooterSubscribe} className="w-full md:w-auto max-w-md">
              <div className="flex flex-col sm:flex-row items-center gap-2 bg-white rounded-2xl sm:rounded-full p-1.5 border border-[#BFDFD2] shadow-xs">
                <input
                  type="email"
                  required
                  value={footerEmail}
                  onChange={(e) => setFooterEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-transparent text-[#222222] placeholder-[#888888] focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#222222] hover:bg-[#383838] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-[#EAE6DD] text-xs">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#D2EBE1] flex items-center justify-center text-[#1E5F3F]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold tracking-tight text-[#222222]">Grocery</span>
              </div>
              <p className="text-[#666666] leading-relaxed max-w-sm">
                Authentic organic food and farm-fresh vegetables directly sourced from local certified sustainable growers.
              </p>
              <div className="text-[#666666] space-y-1">
                <div><strong className="text-[#222222]">Address:</strong> 5171 W Campbell Ave, California, USA</div>
                <div><strong className="text-[#222222]">Call Us:</strong> (+91) - 540-025-124533</div>
                <div><strong className="text-[#222222]">Hours:</strong> 10:00 - 18:00, Mon - Sat</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[#222222] text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-[#666666]">
                <li><a href="#" className="hover:text-[#222222]">About Us</a></li>
                <li><a href="#" className="hover:text-[#222222]">Delivery Information</a></li>
                <li><a href="#" className="hover:text-[#222222]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#222222]">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-[#222222]">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#222222] text-sm mb-3">Categories</h4>
              <ul className="space-y-2 text-[#666666]">
                <li><a href="#featured-categories" className="hover:text-[#222222]">Fresh Vegetables</a></li>
                <li><a href="#featured-categories" className="hover:text-[#222222]">Organic Fruits</a></li>
                <li><a href="#featured-categories" className="hover:text-[#222222]">Drinks & Milk</a></li>
                <li><a href="#featured-categories" className="hover:text-[#222222]">Bakery & Cookies</a></li>
                <li><a href="#featured-categories" className="hover:text-[#222222]">Fresh Herbs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#222222] text-sm mb-3">Popular</h4>
              <ul className="space-y-2 text-[#666666]">
                <li><a href="#popular-products" className="hover:text-[#222222]">Heirloom Tomatoes</a></li>
                <li><a href="#popular-products" className="hover:text-[#222222]">Green Detox Juice</a></li>
                <li><a href="#popular-products" className="hover:text-[#222222]">Golden Sweet Kiwi</a></li>
                <li><a href="#daily-best-sells" className="hover:text-[#222222]">Daily Best Sells</a></li>
                <li><a href="#deals-of-the-day" className="hover:text-[#222222]">Harvest Bundles</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#888888] gap-4">
            <p>© 2026 Grocery Market Inc. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span>Secure Payment Options</span>
              <span className="text-[#CCCCCC]">•</span>
              <span>Visa / Mastercard / COD</span>
            </div>
          </div>
        </div>
      </footer>

      {/* CART SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E2DDD3]">
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#EAE6DD] flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#215E40]" />
                  <h3 className="text-base font-bold text-[#222222]">
                    Your Cart ({totalCartCount} items)
                  </h3>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-[#666666] hover:text-[#222222] rounded-full hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="px-5 py-3 bg-[#E8F6EF] border-b border-[#D2EBE1] text-xs">
                <div className="flex justify-between font-semibold text-[#1F5F3E] mb-1.5">
                  <span>
                    {cartSubtotal >= freeDeliveryThreshold
                      ? '🎉 You unlocked Free Delivery!'
                      : `Add $${(freeDeliveryThreshold - cartSubtotal).toFixed(2)} more for Free Delivery`}
                  </span>
                  <span>{Math.round(progressToFreeDelivery)}%</span>
                </div>
                <div className="w-full bg-[#C2E3D4] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#215E40] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressToFreeDelivery}%` }}
                  />
                </div>
              </div>

              {/* Drawer Items */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#F3EFE6] flex items-center justify-center mx-auto text-[#777777]">
                      <ShoppingCart className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-semibold text-[#222222]">Your cart is currently empty</p>
                    <p className="text-xs text-[#777777] max-w-xs mx-auto">
                      Explore fresh organic produce, veggies, and fruits to get started!
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="mt-3 px-5 py-2 bg-[#222222] text-white text-xs font-semibold rounded-full hover:bg-[#383838] transition-colors cursor-pointer"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DD]"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover bg-white shrink-0 border border-[#E2DDD3]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#222222] truncate">
                          {product.name}
                        </h4>
                        <span className="text-[11px] text-[#777777]">
                          ${product.price.toFixed(2)} / {product.unit}
                        </span>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-[#D5D0C3] rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => updateCartQuantity(product.id, -1)}
                              className="p-1 hover:bg-[#F2EFE8] text-[#444444] cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#222222] tabular-nums">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(product.id, 1)}
                              className="p-1 hover:bg-[#F2EFE8] text-[#444444] cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#222222] ml-auto">
                            ${(product.price * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="text-[#999999] hover:text-[#EF4444] p-1.5 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-[#EAE6DD] bg-[#FAF8F5] space-y-3">
                  <div className="flex justify-between text-xs text-[#666666]">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#222222]">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#666666]">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-[#222222]">
                      {cartSubtotal >= freeDeliveryThreshold ? (
                        <span className="text-[#1E5F3F] font-bold">FREE</span>
                      ) : (
                        '$4.99'
                      )}
                    </span>
                  </div>
                  <div className="border-t border-[#E5E0D5] pt-2 flex justify-between text-sm font-bold text-[#222222]">
                    <span>Total</span>
                    <span>
                      $
                      {(
                        cartSubtotal +
                        (cartSubtotal >= freeDeliveryThreshold ? 0 : 4.99)
                      ).toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="w-full py-3 bg-[#222222] hover:bg-[#383838] text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* WISHLIST MODAL / DRAWER */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#E2DDD3]">
              <div className="p-5 border-b border-[#EAE6DD] flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                  <h3 className="text-base font-bold text-[#222222]">
                    Your Saved Wishlist ({wishlist.length})
                  </h3>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="p-1.5 text-[#666666] hover:text-[#222222] rounded-full hover:bg-[#EAE5D9] transition-colors cursor-pointer"
                  aria-label="Close wishlist"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <Heart className="w-12 h-12 text-[#CCCCCC] mx-auto" />
                    <p className="text-sm font-semibold text-[#222222]">Your wishlist is empty</p>
                    <p className="text-xs text-[#777777]">
                      Click the heart icon on any product to save your favorites for later!
                    </p>
                  </div>
                ) : (
                  [...PRODUCTS, ...DAILY_BEST_SELLS]
                    .filter((item, index, self) =>
                      wishlist.includes(item.id) &&
                      self.findIndex((t) => t.id === item.id) === index
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-[#EAE6DD]"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-[#E2DDD3]"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-[#222222] truncate">{item.name}</h4>
                          <span className="text-xs font-extrabold text-[#222222]">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            addToCart(item);
                            toggleWishlist(item.id, item.name);
                          }}
                          className="px-3 py-1.5 bg-[#222222] hover:bg-[#383838] text-white text-xs font-semibold rounded-lg shrink-0 cursor-pointer"
                        >
                          Move to Cart
                        </button>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QUICK VIEW PRODUCT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedProduct(null)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E2DDD3] z-10 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 text-[#222222] flex items-center justify-center hover:bg-white shadow-xs cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square md:aspect-auto bg-[#FAF8F5] relative">
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#215E40] uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#222222] leading-snug">
                    {selectedProduct.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-[#777777] font-medium">
                      ({selectedProduct.reviewsCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-[#222222]">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-[#999999] line-through">
                        ${selectedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-xs text-[#666666]">
                      / {selectedProduct.unit}
                    </span>
                  </div>

                  <p className="text-xs text-[#555555] leading-relaxed pt-2">
                    {selectedProduct.description}
                  </p>

                  <div className="pt-2 text-xs text-[#1F5F3E] flex items-center gap-2">
                    <Leaf className="w-4 h-4" />
                    <span>Certified Organic · Harvested in last 24h</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EAE6DD] flex items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 bg-[#222222] hover:bg-[#383838] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#C3E8D8]" />
                    <span>Add to cart</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(selectedProduct.id, selectedProduct.name)}
                    className="p-3 border border-[#D5D0C3] rounded-xl hover:bg-[#FAF8F5] text-[#222222] transition-colors cursor-pointer"
                    title="Wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlist.includes(selectedProduct.id)
                          ? 'fill-rose-500 text-rose-500'
                          : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT MODAL */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 overflow-hidden shadow-2xl border border-[#E2DDD3] z-10 animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 text-[#888888] hover:text-[#222222] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#D2EBE1] flex items-center justify-center text-[#1E5F3F]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#222222]">Complete Your Order</h3>
                  <p className="text-xs text-[#777777]">Free contactless home delivery</p>
                </div>
              </div>

              <div className="bg-[#FAF8F5] rounded-xl p-3 border border-[#EAE6DD] text-xs space-y-1">
                <div className="flex justify-between text-[#666666]">
                  <span>Order Items:</span>
                  <span className="font-semibold text-[#222222]">{totalCartCount} items</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#222222] pt-1 border-t border-[#EAE6DD]">
                  <span>Total Amount:</span>
                  <span>${(cartSubtotal + (cartSubtotal >= freeDeliveryThreshold ? 0 : 4.99)).toFixed(2)}</span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCart([]);
                  setIsCheckoutOpen(false);
                  triggerNotification('🎉 Order placed successfully! Tracking link sent to your phone.');
                }}
                className="space-y-3 pt-1 text-xs"
              >
                <div>
                  <label className="block font-semibold text-[#444444] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    defaultValue="Alex Morgan"
                    className="w-full px-3 py-2 border border-[#D5D0C3] rounded-lg bg-white focus:outline-hidden focus:border-[#222222]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-[#444444] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      defaultValue="+1 (555) 349-2190"
                      className="w-full px-3 py-2 border border-[#D5D0C3] rounded-lg bg-white focus:outline-hidden focus:border-[#222222]"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#444444] mb-1">Delivery Time</label>
                    <select className="w-full px-3 py-2 border border-[#D5D0C3] rounded-lg bg-white focus:outline-hidden focus:border-[#222222]">
                      <option>Today: 4:00 PM - 6:00 PM</option>
                      <option>Tomorrow: 9:00 AM - 11:00 AM</option>
                      <option>Tomorrow: 2:00 PM - 4:00 PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-semibold text-[#444444] mb-1">Delivery Address</label>
                  <input
                    type="text"
                    required
                    defaultValue="742 Evergreen Terrace, Apt 4B"
                    className="w-full px-3 py-2 border border-[#D5D0C3] rounded-lg bg-white focus:outline-hidden focus:border-[#222222]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#444444] mb-1">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center gap-2 p-2.5 border border-[#222222] bg-[#FAF8F5] rounded-lg cursor-pointer">
                      <input type="radio" name="pay" defaultChecked className="accent-[#222222]" />
                      <span className="font-semibold text-[#222222]">Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 p-2.5 border border-[#D5D0C3] rounded-lg cursor-pointer">
                      <input type="radio" name="pay" className="accent-[#222222]" />
                      <span className="font-semibold text-[#444444]">Credit / Debit Card</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#222222] hover:bg-[#383838] text-white font-bold rounded-xl text-xs sm:text-sm mt-3 transition-colors cursor-pointer shadow-md"
                >
                  Place Order Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

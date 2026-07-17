import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Moon, Sun, Globe, ShoppingCart, User, Home, Menu, 
  X, CheckCircle, Lock, Mail, LogOut, Star, Flame,
  Search, Filter, Heart, MapPin, Phone, Clock, Truck,
  Gift, Award, MessageCircle, Send, Trash2,
  Plus, Minus, ChevronDown, ArrowUp, ArrowRight,
  Coffee, Pizza, Beef, Salad, IceCream, Utensils,
  Info, Tag, Percent, ChevronLeft, ChevronRight, Users,
  ShoppingBag, Receipt, Headphones,  Sparkles, Eye, EyeOff,
   AlertCircle,  ExternalLink, Code2
} from 'lucide-react';

import { FaLinkedin , FaGithub } from 'react-icons/fa';

// ============================================
// TRANSLATION DICTIONARY
// ============================================
const TRANSLATIONS = {
  fa: {
    dir: 'rtl',
    brand: { name: 'برگر کینگ', tagline: 'طعم واقعی سرعت و کیفیت' },
    nav: {
      home: 'خانه',
      menu: 'منو',
      menuSub: { all: 'همه غذاها', burgers: 'برگرها', pizza: 'پیتزاها', sides: 'پیش غذا', drinks: 'نوشیدنی', desserts: 'دسرها', combo: 'پکیج خانواده' },
      offers: 'تخفیف‌ها',
      about: 'درباره ما',
      contact: 'تماس',
      track: 'پیگیری',
      cart: 'سبد',
      profile: 'پروفایل'
    },
    hero: { title1: 'طعم واقعی', title2: 'سرعت و کیفیت', subtitle: 'سفارش آنلاین با تحویل فوری در کمتر از 30 دقیقه', cta: 'سفارش آنلاین', cta2: 'مشاهده منو' },
    auth: { 
      login: 'ورود', register: 'ثبت نام', email: 'ایمیل یا موبایل', pass: 'رمز عبور', confirmPass: 'تایید رمز', name: 'نام کامل', 
      btn: 'ورود', registerBtn: 'ثبت نام', error: 'فیلدها را پر کنید', 
      passError: 'حداقل 8 کاراکتر', 
      emailError: 'ایمیل نامعتبر', 
      passMatchError: 'رمزها مطابقت ندارند', 
      noAccount: 'حساب ندارید؟', hasAccount: 'حساب دارید؟', success: 'ثبت نام موفق',
      passStrength: 'قدرت رمز عبور',
      passWeak: 'ضعیف',
      passMedium: 'متوسط',
      passStrong: 'قوی',
      passVeryStrong: 'بسیار قوی',
      passRequirements: 'الزامات رمز عبور:',
      passReqLength: 'حداقل 8 کاراکتر',
      passReqUpper: 'حداقل یک حرف بزرگ',
      passReqLower: 'حداقل یک حرف کوچک',
      passReqNumber: 'حداقل یک عدد',
      passReqSpecial: 'حداقل یک کاراکتر خاص (!@#$%)',
      showPass: 'نمایش رمز',
      hidePass: 'مخفی کردن رمز'
    },
    product: { add: 'افزودن', price: 'تومان', off: 'تخفیف', reviews: 'نظرات', writeReview: 'نوشتن نظر', size: 'سایز', small: 'کوچک', medium: 'متوسط', large: 'بزرگ', quantity: 'تعداد', calories: 'کالری', prepTime: 'زمان آماده سازی', minutes: 'دقیقه' },
    cart: { empty: 'سبد خالی است', emptyDesc: 'محصولات را اضافه کنید', total: 'مجموع', subtotal: 'جمع کل', discount: 'تخفیف', delivery: 'ارسال', free: 'رایگان', checkout: 'تکمیل خرید', continue: 'ادامه خرید', coupon: 'کد تخفیف', apply: 'اعمال' },
    checkout: { success: 'سفارش ثبت شد!' },
    profile: { welcome: 'خوش آمدید', orders: 'سفارشات من', logout: 'خروج', totalOrders: 'سفارشات', loyaltyPoints: 'امتیاز', level: 'سطح', bronze: 'برنزی', myAccount: 'حساب کاربری', editProfile: 'ویرایش پروفایل', settings: 'تنظیمات' },
    order: { pending: 'در انتظار', items: 'اقلام' },
    menu: { title: 'منوی غذا', all: 'همه', burgers: 'برگر', pizza: 'پیتزا', sides: 'پیش غذا', drinks: 'نوشیدنی', desserts: 'دسر', combo: 'کمبو', search: 'جستجو...', filter: 'فیلتر', sort: 'مرتب سازی', priceLowHigh: 'قیمت: کم به زیاد', priceHighLow: 'قیمت: زیاد به کم', rating: 'بیشترین امتیاز', popular: 'محبوب', new: 'جدیدترین', noResults: 'نتیجه‌ای یافت نشد' },
    support: { title: 'پشتیبانی', typeMessage: 'پیام خود را بنویسید...', welcome: 'سلام! چطور کمکتان کنم؟' },
    common: { loading: 'در حال بارگذاری...' },
    footer: { 
      about: 'درباره ما', 
      support: 'پشتیبانی', 
      newsletter: 'خبرنامه', 
      emailPlaceholder: 'ایمیل خود را وارد کنید', 
      rights: 'تمامی حقوق محفوظ است', 
      terms: 'قوانین', 
      privacy: 'حریم خصوصی',
      developer: 'توسعه‌دهنده',
      developerDesc: 'طراحی و توسعه توسط',
      viewPortfolio: 'مشاهده نمونه کارها',
      followMe: 'من را دنبال کنید',
      madeWith: 'ساخته شده با ❤️ در ایران'
    },
    offers: { title: 'تخفیف‌های ویژه', subtitle: 'بهترین پیشنهادات', code: 'کد تخفیف', copy: 'کپی', copied: 'کپی شد!', validUntil: 'اعتبار تا', minOrder: 'حداقل سفارش' },
    about: { title: 'درباره ما', subtitle: 'داستان ما از سال 1390', p1: 'ما با هدف ارائه بهترین فست فود با کیفیت‌ترین مواد اولیه فعالیت می‌کنیم.', p2: 'تیم ما متشکل از سرآشپزهای حرفه‌ای است.', stats: { years: 'سال تجربه', customers: 'مشتری راضی', cities: 'شهر', dishes: 'غذای متنوع' } },
    contact: { title: 'تماس با ما', subtitle: 'همیشه در دسترس', address: 'آدرس', addressValue: 'تهران، ولیعصر، پلاک 123', phone: 'تلفن', email: 'ایمیل', hours: 'ساعات کاری', hoursValue: '10 صبح تا 12 شب', sendMsg: 'ارسال پیام', name: 'نام شما', message: 'پیام شما' },
    track: { title: 'پیگیری سفارش', subtitle: 'شماره سفارش را وارد کنید', placeholder: 'مثلا: ORD1234567890', btn: 'پیگیری', notFound: 'سفارشی یافت نشد' },
    mobileMenu: { welcome: 'خوش آمدید', loginBtn: 'ورود / ثبت نام', guest: 'مهمان', menuTitle: 'منوی اصلی', quickAccess: 'دسترسی سریع', settings: 'تنظیمات' },
    megaMenu: { viewAll: 'مشاهده همه', popular: 'محبوب‌ترین', new: 'جدیدترین', special: 'ویژه', description: 'بهترین غذاها با کیفیت عالی' }
  },
  en: {
    dir: 'ltr',
    brand: { name: 'Burger King', tagline: 'Real Taste of Speed and Quality' },
    nav: {
      home: 'Home',
      menu: 'Menu',
      menuSub: { all: 'All Foods', burgers: 'Burgers', pizza: 'Pizza', sides: 'Sides', drinks: 'Drinks', desserts: 'Desserts', combo: 'Family Combo' },
      offers: 'Offers',
      about: 'About',
      contact: 'Contact',
      track: 'Track',
      cart: 'Cart',
      profile: 'Profile'
    },
    hero: { title1: 'Real Taste', title2: 'Speed & Quality', subtitle: 'Online ordering with instant delivery', cta: 'Order Online', cta2: 'View Menu' },
    auth: { 
      login: 'Login', register: 'Sign Up', email: 'Email or Phone', pass: 'Password', confirmPass: 'Confirm', name: 'Full Name', 
      btn: 'Login', registerBtn: 'Register', error: 'Fill all fields', 
      passError: 'Min 8 chars', 
      emailError: 'Invalid email', 
      passMatchError: 'Passwords mismatch', 
      noAccount: "No account?", hasAccount: 'Have account?', success: 'Success',
      passStrength: 'Password Strength',
      passWeak: 'Weak',
      passMedium: 'Medium',
      passStrong: 'Strong',
      passVeryStrong: 'Very Strong',
      passRequirements: 'Password Requirements:',
      passReqLength: 'At least 8 characters',
      passReqUpper: 'At least one uppercase letter',
      passReqLower: 'At least one lowercase letter',
      passReqNumber: 'At least one number',
      passReqSpecial: 'At least one special character (!@#$%)',
      showPass: 'Show password',
      hidePass: 'Hide password'
    },
    product: { add: 'Add', price: '$', off: 'OFF', reviews: 'Reviews', writeReview: 'Write Review', size: 'Size', small: 'Small', medium: 'Medium', large: 'Large', quantity: 'Qty', calories: 'Calories', prepTime: 'Prep Time', minutes: 'min' },
    cart: { empty: 'Cart is empty', emptyDesc: 'Add products', total: 'Total', subtotal: 'Subtotal', discount: 'Discount', delivery: 'Delivery', free: 'Free', checkout: 'Checkout', continue: 'Continue', coupon: 'Coupon', apply: 'Apply' },
    checkout: { success: 'Order placed!' },
    profile: { welcome: 'Welcome', orders: 'My Orders', logout: 'Logout', totalOrders: 'Orders', loyaltyPoints: 'Points', level: 'Level', bronze: 'Bronze', myAccount: 'My Account', editProfile: 'Edit Profile', settings: 'Settings' },
    order: { pending: 'Pending', items: 'Items' },
    menu: { title: 'Food Menu', all: 'All', burgers: 'Burgers', pizza: 'Pizza', sides: 'Sides', drinks: 'Drinks', desserts: 'Desserts', combo: 'Combo', search: 'Search...', filter: 'Filter', sort: 'Sort', priceLowHigh: 'Price: Low to High', priceHighLow: 'Price: High to Low', rating: 'Rating', popular: 'Popular', new: 'New', noResults: 'No results' },
    support: { title: 'Support', typeMessage: 'Type message...', welcome: 'Hello! How can I help?' },
    common: { loading: 'Loading...' },
    footer: { 
      about: 'About', 
      support: 'Support', 
      newsletter: 'Newsletter', 
      emailPlaceholder: 'Enter email', 
      rights: 'All rights reserved', 
      terms: 'Terms', 
      privacy: 'Privacy',
      developer: 'Developer',
      developerDesc: 'Designed & Developed by',
      viewPortfolio: 'View Portfolio',
      followMe: 'Follow Me',
      madeWith: 'Made with ❤️ in Iran'
    },
    offers: { title: 'Special Offers', subtitle: 'Best deals', code: 'Code', copy: 'Copy', copied: 'Copied!', validUntil: 'Valid until', minOrder: 'Min order' },
    about: { title: 'About Us', subtitle: 'Since 2011', p1: 'We provide the best fast food.', p2: 'Professional chefs team.', stats: { years: 'Years', customers: 'Customers', cities: 'Cities', dishes: 'Dishes' } },
    contact: { title: 'Contact', subtitle: 'Always available', address: 'Address', addressValue: 'Tehran, Valiasr, 123', phone: 'Phone', email: 'Email', hours: 'Hours', hoursValue: '10 AM - 12 AM', sendMsg: 'Send', name: 'Name', message: 'Message' },
    track: { title: 'Track Order', subtitle: 'Enter order number', placeholder: 'e.g., ORD1234567890', btn: 'Track', notFound: 'Not found' },
    mobileMenu: { welcome: 'Welcome', loginBtn: 'Login / Register', guest: 'Guest', menuTitle: 'Main Menu', quickAccess: 'Quick Access', settings: 'Settings' },
    megaMenu: { viewAll: 'View All', popular: 'Most Popular', new: 'Newest', special: 'Special', description: 'Best food with great quality' }
  }
};

// ============================================
// DATA
// ============================================
const PRODUCTS = [
  { id: 1, nameFa: 'برگر ذغالی ویژه', nameEn: 'Special Charcoal Burger', descFa: 'برگر گوشت تازه با پنیر چدار', descEn: 'Fresh beef with cheddar', price: 280000, originalPrice: 320000, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop', category: 'burger', rating: 4.8, reviews: 234, calories: 650, prepTime: 15, sizes: { small: 280000, medium: 350000, large: 420000 }, stock: true, featured: true },
  { id: 2, nameFa: 'پیتزا پپرونی تند', nameEn: 'Spicy Pepperoni Pizza', descFa: 'پیتزا با پپرونی تند', descEn: 'Spicy pepperoni pizza', price: 350000, originalPrice: 400000, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop', category: 'pizza', rating: 4.9, reviews: 456, calories: 850, prepTime: 20, sizes: { small: 350000, medium: 450000, large: 550000 }, stock: true, featured: true },
  { id: 3, nameFa: 'سیب زمینی پنیری', nameEn: 'Cheesy Fries', descFa: 'سیب زمینی با پنیر چدار', descEn: 'Fries with cheddar', price: 140000, originalPrice: 160000, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop', category: 'sides', rating: 4.5, reviews: 189, calories: 450, prepTime: 10, sizes: { small: 140000, medium: 180000, large: 220000 }, stock: true, featured: false },
  { id: 4, nameFa: 'استیک ریب آی', nameEn: 'Ribeye Steak', descFa: 'استیک با سس قارچ', descEn: 'Steak with mushroom', price: 850000, originalPrice: 950000, image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop', category: 'burger', rating: 5.0, reviews: 78, calories: 1200, prepTime: 25, sizes: { small: 850000, medium: 1050000, large: 1250000 }, stock: true, featured: true },
  { id: 5, nameFa: 'نوشابه انرژی زا', nameEn: 'Energy Drink', descFa: 'نوشابه انرژی زا', descEn: 'Energy drink', price: 50000, originalPrice: 60000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=800&h=600&fit=crop', category: 'drinks', rating: 4.2, reviews: 312, calories: 150, prepTime: 2, sizes: { small: 50000, medium: 70000, large: 90000 }, stock: true, featured: false },
  { id: 6, nameFa: 'دسر شکلاتی', nameEn: 'Choco Lava', descFa: 'دسر شکلاتی داغ', descEn: 'Hot chocolate dessert', price: 95000, originalPrice: 110000, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=600&fit=crop', category: 'desserts', rating: 4.7, reviews: 267, calories: 550, prepTime: 8, sizes: { small: 95000, medium: 120000, large: 150000 }, stock: true, featured: true },
  { id: 7, nameFa: 'ساندویچ مرغ', nameEn: 'Chicken Sandwich', descFa: 'ساندویچ مرغ سوخاری', descEn: 'Crispy chicken', price: 220000, originalPrice: 260000, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop', category: 'burger', rating: 4.6, reviews: 198, calories: 580, prepTime: 12, sizes: { small: 220000, medium: 280000, large: 340000 }, stock: true, featured: false },
  { id: 8, nameFa: 'سالاد سزار', nameEn: 'Caesar Salad', descFa: 'سالاد با مرغ گریل', descEn: 'Salad with chicken', price: 180000, originalPrice: 210000, image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop', category: 'sides', rating: 4.4, reviews: 145, calories: 320, prepTime: 8, sizes: { small: 180000, medium: 230000, large: 280000 }, stock: true, featured: false },
  { id: 9, nameFa: 'کمبو خانواده', nameEn: 'Family Combo', descFa: '4 برگر، 2 سیب زمینی', descEn: '4 burgers, 2 fries', price: 1200000, originalPrice: 1500000, image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=600&fit=crop', category: 'combo', rating: 4.9, reviews: 89, calories: 2400, prepTime: 20, sizes: { small: 1200000, medium: 1500000, large: 1800000 }, stock: true, featured: true },
  { id: 10, nameFa: 'بستنی قیفی', nameEn: 'Ice Cream', descFa: 'بستنی وانیلی', descEn: 'Vanilla ice cream', price: 75000, originalPrice: 90000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvlVaA7pOmN4DrIx9MVJK6b7FEnWybtowNVWudJXbvhQ&s=10', category: 'desserts', rating: 4.6, reviews: 234, calories: 280, prepTime: 5, sizes: { small: 75000, medium: 95000, large: 115000 }, stock: true, featured: false },
  { id: 11, nameFa: 'پیتزا مارگاریتا', nameEn: 'Margherita Pizza', descFa: 'پیتزا کلاسیک', descEn: 'Classic pizza', price: 280000, originalPrice: 320000, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop', category: 'pizza', rating: 4.7, reviews: 345, calories: 720, prepTime: 18, sizes: { small: 280000, medium: 360000, large: 440000 }, stock: true, featured: false },
  { id: 12, nameFa: 'قهوه اسپرسو', nameEn: 'Espresso', descFa: 'قهوه عربیکا', descEn: 'Arabica coffee', price: 65000, originalPrice: 75000, image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=800&h=600&fit=crop', category: 'drinks', rating: 4.8, reviews: 178, calories: 5, prepTime: 3, sizes: { small: 65000, medium: 85000, large: 105000 }, stock: true, featured: false }
];

const HERO_SLIDES = [
  { id: 1, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1920&h=1080&fit=crop', titleFa: 'طعم واقعی سرعت', titleEn: 'Real Taste of Speed', subtitleFa: 'تحویل فوری در 30 دقیقه', subtitleEn: 'Instant delivery in 30 min', cta: 'cta' },
  { id: 2, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&h=1080&fit=crop', titleFa: 'کیفیت بی نظیر', titleEn: 'Unmatched Quality', subtitleFa: 'بهترین مواد اولیه', subtitleEn: 'Best ingredients', cta: 'cta2' },
  { id: 3, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1920&h=1080&fit=crop', titleFa: 'تخفیف ویژه', titleEn: 'Special Discount', subtitleFa: '30% تخفیف سفارش اول', subtitleEn: '30% off first order', cta: 'cta' }
];

const OFFERS = [
  { code: 'WELCOME10', discount: 10, type: 'percent', minOrder: 200000, descFa: '10% تخفیف اولین سفارش', descEn: '10% off first order', validUntil: '2026-12-31', color: 'from-orange-500 to-red-500', icon: Gift },
  { code: 'SAVE50', discount: 50000, type: 'fixed', minOrder: 300000, descFa: '50 هزار تومان تخفیف', descEn: '$50 off', validUntil: '2026-10-31', color: 'from-purple-500 to-pink-500', icon: Tag },
  { code: 'VIP20', discount: 20, type: 'percent', minOrder: 500000, descFa: '20% تخفیف VIP', descEn: '20% VIP', validUntil: '2026-11-30', color: 'from-blue-500 to-cyan-500', icon: Award },
  { code: 'FREE', discount: 0, type: 'delivery', minOrder: 400000, descFa: 'ارسال رایگان', descEn: 'Free delivery', validUntil: '2026-12-15', color: 'from-green-500 to-emerald-500', icon: Truck }
];

const COUPONS = {
  'WELCOME10': { discount: 10, type: 'percent', minOrder: 200000 },
  'SAVE50': { discount: 50000, type: 'fixed', minOrder: 300000 },
  'VIP20': { discount: 20, type: 'percent', minOrder: 500000 },
  'FREE': { discount: 0, type: 'delivery', minOrder: 400000 }
};

// ============================================
// DEVELOPER INFO
// ============================================
const DEVELOPER = {
  name: 'امیرعلی محمدی',
  nameEn: 'Amirali Mohammadi',
  role: 'Full Stack Developer',
  roleFa: 'توسعه‌دهنده فول استک',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  github: 'https://github.com/amirali-mohammadi',
  linkedin: 'https://linkedin.com/in/amirali-mohammadi',
  portfolio: 'https://amirali-mohammadi.dev'
};

// ============================================
// PASSWORD VALIDATION HELPER
// ============================================
const validatePassword = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  
  let strength = 'weak';
  if (score >= 5) strength = 'veryStrong';
  else if (score >= 4) strength = 'strong';
  else if (score >= 3) strength = 'medium';
  
  return { checks, score, strength, isValid: score >= 4 };
};

// ============================================
// MAIN APP
// ============================================
export default function GlobalFastFoodApp() {
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('fa');
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loginData, setLoginData] = useState({ email: '', password: '', name: '', confirmPassword: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [visitors, setVisitors] = useState(1240);
  const [orders, setOrders] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productSize, setProductSize] = useState('medium');
  const [productQuantity, setProductQuantity] = useState(1);
  const [heroSlide, setHeroSlide] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [newsletter, setNewsletter] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [productReviews, setProductReviews] = useState({});
  const [userProfile, setUserProfile] = useState({ name: '', email: '', points: 0, level: 'bronze' });
  const [imageLoaded, setImageLoaded] = useState({});
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [expandedSubMenu, setExpandedSubMenu] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState(null);

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'fa';
  const megaMenuRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500);
    const storedVisits = localStorage.getItem('site_visits') || 1240;
    const newCount = parseInt(storedVisits) + 1;
    localStorage.setItem('site_visits', newCount);
    setVisitors(newCount);

    const storedUser = localStorage.getItem('ff_user');
    if (storedUser) { const userData = JSON.parse(storedUser); setUser(userData); setUserProfile(userData.profile || userProfile); }
    const storedCart = localStorage.getItem('ff_cart');
    if (storedCart) setCart(JSON.parse(storedCart));
    const storedFavs = localStorage.getItem('ff_favorites');
    if (storedFavs) setFavorites(JSON.parse(storedFavs));
    const storedOrders = localStorage.getItem('ff_orders');
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    const storedReviews = localStorage.getItem('ff_reviews');
    if (storedReviews) setProductReviews(JSON.parse(storedReviews));

    const sliderInterval = setInterval(() => setHeroSlide(prev => (prev + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(sliderInterval);
  }, []);

  useEffect(() => { if (theme === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }, [theme]);
  useEffect(() => { localStorage.setItem('ff_cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('ff_favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem('ff_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('ff_reviews', JSON.stringify(productReviews)); }, [productReviews]);

  useEffect(() => {
    const handleScroll = () => { setShowScrollTop(window.scrollY > 300); setScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) setMegaMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => { 
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (loginData.password) {
      setPasswordValidation(validatePassword(loginData.password));
    } else {
      setPasswordValidation(null);
    }
  }, [loginData.password]);

  const showNotification = (message, type = 'success') => { setNotification({ message, type }); setTimeout(() => setNotification(null), 3000); };
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const navigateTo = (tab, category = null) => {
    setActiveTab(tab);
    if (category) setSelectedCategory(category);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setExpandedSubMenu(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg(''); setSuccessMsg('');
    
    if (!loginData.email || !loginData.password) { setErrorMsg(t.auth.error); return; }
    if (!validateEmail(loginData.email) && loginData.email.length < 10) { setErrorMsg(t.auth.emailError); return; }
    
    if (isRegistering) {
      const validation = validatePassword(loginData.password);
      if (!validation.isValid) {
        setErrorMsg(t.auth.passError);
        return;
      }
      if (!loginData.name) { setErrorMsg(t.auth.error); return; }
      if (loginData.password !== loginData.confirmPassword) { setErrorMsg(t.auth.passMatchError); return; }
    } else {
      if (loginData.password.length < 8) {
        setErrorMsg(t.auth.passError);
        return;
      }
    }

    const newUser = { email: loginData.email, name: loginData.name || loginData.email.split('@')[0], joined: new Date().toISOString(), profile: { ...userProfile, name: loginData.name || loginData.email.split('@')[0], email: loginData.email } };
    setUser(newUser); setUserProfile(newUser.profile);
    localStorage.setItem('ff_user', JSON.stringify(newUser));
    const logs = JSON.parse(localStorage.getItem('user_logs') || '[]');
    logs.push({ ...newUser, timestamp: new Date().toISOString() });
    localStorage.setItem('user_logs', JSON.stringify(logs));
    if (isRegistering) { setSuccessMsg(t.auth.success); setTimeout(() => { setIsRegistering(false); navigateTo('profile'); }, 1500); } else { navigateTo('profile'); }
    setLoginData({ email: '', password: '', name: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setUser(null); setCart([]); setFavorites([]);
    localStorage.removeItem('ff_user'); localStorage.removeItem('ff_cart'); localStorage.removeItem('ff_favorites');
    navigateTo('home');
    showNotification(lang === 'fa' ? 'خروج موفق' : 'Logged out');
  };

  const addToCart = (product, size = 'medium', quantity = 1) => {
    const price = product.sizes[size];
    const cartItem = { ...product, cartId: Date.now() + Math.random(), size, quantity, totalPrice: price * quantity };
    setCart([...cart, cartItem]);
    showNotification(lang === 'fa' ? 'اضافه شد' : 'Added');
  };

  const removeFromCart = (cartId) => setCart(cart.filter(item => item.cartId !== cartId));
  const updateCartQuantity = (cartId, quantity) => setCart(cart.map(item => item.cartId === cartId ? { ...item, quantity, totalPrice: item.sizes[item.size] * quantity } : item));

  const toggleFavorite = (productId) => {
    if (favorites.includes(productId)) { setFavorites(favorites.filter(id => id !== productId)); showNotification(lang === 'fa' ? 'حذف شد' : 'Removed'); }
    else { setFavorites([...favorites, productId]); showNotification(lang === 'fa' ? 'اضافه شد' : 'Added'); }
  };

  const calculateSubtotal = () => cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = calculateSubtotal();
    if (subtotal < appliedCoupon.minOrder) return 0;
    if (appliedCoupon.type === 'percent') return (subtotal * appliedCoupon.discount) / 100;
    if (appliedCoupon.type === 'fixed') return appliedCoupon.discount;
    return 0;
  };
  const calculateDelivery = () => { if (appliedCoupon && appliedCoupon.type === 'delivery') return 0; return calculateSubtotal() > 500000 ? 0 : 30000; };
  const calculateTotal = () => calculateSubtotal() - calculateDiscount() + calculateDelivery();

  const applyCoupon = () => {
    const coupon = COUPONS[couponCode.toUpperCase()];
    if (!coupon) { showNotification(lang === 'fa' ? 'کد نامعتبر' : 'Invalid', 'error'); return; }
    if (calculateSubtotal() < coupon.minOrder) { showNotification(lang === 'fa' ? `حداقل ${coupon.minOrder.toLocaleString()}` : `Min ${coupon.minOrder}`, 'error'); return; }
    setAppliedCoupon(coupon); showNotification(lang === 'fa' ? 'اعمال شد' : 'Applied'); setCouponCode('');
  };

  const handleCheckout = () => {
    if (!user) { showNotification(lang === 'fa' ? 'وارد شوید' : 'Login first', 'error'); navigateTo('profile'); return; }
    if (cart.length === 0) { showNotification(lang === 'fa' ? 'سبد خالی' : 'Empty', 'error'); return; }
    const order = { id: 'ORD' + Date.now(), userId: user.email, items: cart, subtotal: calculateSubtotal(), discount: calculateDiscount(), delivery: calculateDelivery(), total: calculateTotal(), status: 'pending', date: new Date().toISOString(), estimatedTime: 30 };
    setOrders([...orders, order]); setCart([]); setAppliedCoupon(null);
    const orderLogs = JSON.parse(localStorage.getItem('order_logs') || '[]');
    orderLogs.push(order); localStorage.setItem('order_logs', JSON.stringify(orderLogs));
    const newPoints = (userProfile.points || 0) + Math.floor(calculateTotal() / 10000);
    setUserProfile({ ...userProfile, points: newPoints });
    const updatedUser = { ...user, profile: { ...userProfile, points: newPoints } };
    setUser(updatedUser); localStorage.setItem('ff_user', JSON.stringify(updatedUser));
    navigateTo('profile'); showNotification(t.checkout.success);
  };

  const addReview = (productId) => {
    if (!reviewText.trim()) return;
    const review = { userId: user?.email || 'guest', userName: user?.name || 'Guest', rating: reviewRating, text: reviewText, date: new Date().toISOString() };
    const productReviewsList = productReviews[productId] || [];
    setProductReviews({ ...productReviews, [productId]: [...productReviewsList, review] });
    setReviewText(''); setReviewRating(5); showNotification(lang === 'fa' ? 'ثبت شد' : 'Submitted');
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    const message = { id: Date.now(), text: chatInput, sender: 'user', time: new Date().toLocaleTimeString() };
    setChatMessages([...chatMessages, message]); setChatInput('');
    setTimeout(() => {
      const responses = lang === 'fa' ? ['سلام!', 'در حال پردازش', 'صبر کنید'] : ['Hello!', 'Processing', 'Wait'];
      const botMessage = { id: Date.now() + 1, text: responses[Math.floor(Math.random() * responses.length)], sender: 'bot', time: new Date().toLocaleTimeString() };
      setChatMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const subscribeNewsletter = () => {
    if (!validateEmail(newsletter)) { showNotification(lang === 'fa' ? 'ایمیل نامعتبر' : 'Invalid', 'error'); return; }
    const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    subscribers.push({ email: newsletter, date: new Date().toISOString() });
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
    setNewsletter(''); showNotification(lang === 'fa' ? 'عضو شدید' : 'Subscribed');
  };

  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code); setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
    showNotification(lang === 'fa' ? 'کپی شد!' : 'Copied!');
  };

  const handleTrackOrder = () => { const found = orders.find(o => o.id === trackOrderId); setTrackedOrder(found || 'not_found'); };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({ ...contactForm, date: new Date().toISOString() });
    localStorage.setItem('contact_messages', JSON.stringify(messages));
    setContactForm({ name: '', email: '', message: '' });
    showNotification(lang === 'fa' ? 'ارسال شد' : 'Sent');
  };

  const handleImageLoad = (productId) => setImageLoaded(prev => ({ ...prev, [productId]: true }));

  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS;
    if (searchQuery) { const query = searchQuery.toLowerCase(); filtered = filtered.filter(p => p.nameFa.toLowerCase().includes(query) || p.nameEn.toLowerCase().includes(query)); }
    if (selectedCategory !== 'all') filtered = filtered.filter(p => p.category === selectedCategory);
    switch (sortBy) {
      case 'priceLowHigh': filtered = [...filtered].sort((a, b) => a.price - b.price); break;
      case 'priceHighLow': filtered = [...filtered].sort((a, b) => b.price - a.price); break;
      case 'rating': filtered = [...filtered].sort((a, b) => b.rating - a.rating); break;
      case 'popular': filtered = [...filtered].sort((a, b) => b.reviews - a.reviews); break;
      case 'new': filtered = [...filtered].sort((a, b) => b.id - a.id); break;
      default: break;
    }
    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 flex flex-col items-center justify-center z-50 text-white">
        <div className="relative w-32 h-32 mb-6">
          <div className="absolute inset-0 border-4 border-white/30 rounded-full animate-ping"></div>
          <div className="absolute inset-0 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <Flame className="absolute inset-0 m-auto text-yellow-300 w-16 h-16 animate-bounce" />
        </div>
        <h1 className="text-4xl font-black tracking-wider animate-pulse">FAST FOOD</h1>
        <p className="text-lg text-white/80 mt-3">{t.common.loading}</p>
      </div>
    );
  }

  const mainNavItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'menu', label: t.nav.menu, icon: Utensils, hasMegaMenu: true },
    { id: 'offers', label: t.nav.offers, icon: Percent },
    { id: 'about', label: t.nav.about, icon: Info },
    { id: 'contact', label: t.nav.contact, icon: Headphones },
    { id: 'track', label: t.nav.track, icon: Receipt }
  ];

  const menuSubItems = [
    { id: 'all', label: t.nav.menuSub.all, icon: Utensils },
    { id: 'burger', label: t.nav.menuSub.burgers, icon: Beef },
    { id: 'pizza', label: t.nav.menuSub.pizza, icon: Pizza },
    { id: 'sides', label: t.nav.menuSub.sides, icon: Salad },
    { id: 'drinks', label: t.nav.menuSub.drinks, icon: Coffee },
    { id: 'desserts', label: t.nav.menuSub.desserts, icon: IceCream },
    { id: 'combo', label: t.nav.menuSub.combo, icon: ShoppingBag }
  ];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'} font-sans pb-24 md:pb-0`}>
      
      {/* NOTIFICATION */}
      {notification && (
        <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-[100] px-6 py-3 rounded-xl shadow-2xl animate-slideDown ${notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white font-bold`}>
          <div className="flex items-center gap-2">
            {notification.type === 'error' ? <X size={20} /> : <CheckCircle size={20} />}
            {notification.message}
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? (theme === 'dark' ? 'bg-slate-900/95 shadow-2xl' : 'bg-white/95 shadow-xl') : (theme === 'dark' ? 'bg-slate-900/80' : 'bg-white/80')} backdrop-blur-md border-b ${theme === 'dark' ? 'border-slate-700/50' : 'border-gray-200/50'}`}>
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white text-xs py-1.5 hidden md:block">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Phone size={12} /> 021-12345678</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {lang === 'fa' ? '10 صبح تا 12 شب' : '10 AM - 12 AM'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame size={14} className="animate-pulse" />
              <span className="font-bold">{lang === 'fa' ? 'ارسال رایگان بالای 500 هزار' : 'Free delivery over $500'}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home')}>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl shadow-lg shadow-orange-500/30">
                <Flame className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black tracking-tight">{t.brand.name}</h1>
                <p className="text-[10px] md:text-xs opacity-60 hidden lg:block">{t.brand.tagline}</p>
              </div>
            </div>

            {/* DESKTOP NAVIGATION WITH MEGA MENU */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainNavItems.map(item => (
                <div key={item.id} className="relative" ref={item.hasMegaMenu ? megaMenuRef : null}>
                  <button
                    onClick={() => {
                      if (item.hasMegaMenu) {
                        setMegaMenuOpen(!megaMenuOpen);
                      } else {
                        navigateTo(item.id);
                      }
                    }}
                    onMouseEnter={() => item.hasMegaMenu && setMegaMenuOpen(true)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-sm transition-all relative ${
                      activeTab === item.id || (item.hasMegaMenu && activeTab === 'menu')
                        ? 'text-orange-500'
                        : theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-slate-800' : 'text-gray-700 hover:text-black hover:bg-gray-100'
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                    {item.hasMegaMenu && <ChevronDown size={14} className={`transition-transform ${megaMenuOpen ? 'rotate-180' : ''}`} />}
                    {(activeTab === item.id || (item.hasMegaMenu && activeTab === 'menu')) && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-orange-500 rounded-full"></span>
                    )}
                  </button>

                  {/* MEGA MENU - DESKTOP */}
                  {item.hasMegaMenu && megaMenuOpen && (
                    <div 
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-[800px] rounded-2xl shadow-2xl overflow-hidden animate-fadeIn ${theme === 'dark' ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'}`}
                      onMouseLeave={() => setMegaMenuOpen(false)}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-4 gap-6">
                          <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-60">{t.menu.title}</h3>
                            <div className="space-y-1">
                              {menuSubItems.map(sub => (
                                <button
                                  key={sub.id}
                                  onClick={() => navigateTo('menu', sub.id)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                                    selectedCategory === sub.id && activeTab === 'menu'
                                      ? 'bg-orange-500 text-white'
                                      : theme === 'dark' ? 'hover:bg-slate-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  <sub.icon size={18} />
                                  <span className="font-semibold text-sm">{sub.label}</span>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="col-span-2">
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-60">{t.megaMenu.popular}</h3>
                            <div className="grid grid-cols-2 gap-3">
                              {PRODUCTS.filter(p => p.featured).slice(0, 4).map(product => (
                                <button
                                  key={product.id}
                                  onClick={() => { setSelectedProduct(product); setShowModal(true); setMegaMenuOpen(false); }}
                                  className={`flex gap-3 p-3 rounded-xl transition-all ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
                                >
                                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                    <img src={product.image} alt={lang === 'fa' ? product.nameFa : product.nameEn} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 text-left">
                                    <h4 className="font-bold text-sm mb-1 line-clamp-1">{lang === 'fa' ? product.nameFa : product.nameEn}</h4>
                                    <div className="flex items-center gap-1 mb-1">
                                      <Star size={10} className="text-yellow-500 fill-yellow-500" />
                                      <span className="text-xs">{product.rating}</span>
                                    </div>
                                    <div className="text-orange-500 font-bold text-sm">{product.price.toLocaleString()}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h3 className="font-bold text-sm uppercase tracking-wider mb-3 opacity-60">{t.megaMenu.special}</h3>
                            <div className="space-y-3">
                              {OFFERS.slice(0, 2).map((offer, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => navigateTo('offers')}
                                  className={`w-full p-3 rounded-xl bg-gradient-to-br ${offer.color} text-white text-left transition-transform hover:scale-105`}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <offer.icon size={16} />
                                    <span className="font-bold text-sm">{offer.type === 'percent' ? `${offer.discount}%` : 'FREE'}</span>
                                  </div>
                                  <p className="text-xs opacity-90 line-clamp-2">{lang === 'fa' ? offer.descFa : offer.descEn}</p>
                                </button>
                              ))}
                            </div>
                            <button
                              onClick={() => navigateTo('menu', 'all')}
                              className="w-full mt-3 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition flex items-center justify-center gap-2"
                            >
                              <Utensils size={14} />
                              {t.megaMenu.viewAll}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`p-2 rounded-full transition ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} className={`hidden sm:flex items-center gap-1 px-3 py-2 rounded-full text-xs font-bold transition ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}>
                <Globe size={14} />
                {lang.toUpperCase()}
              </button>
              <button onClick={() => setShowChat(!showChat)} className={`hidden md:block p-2 rounded-full transition ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-200'}`}>
                <MessageCircle size={20} />
              </button>
              <div className="relative cursor-pointer" onClick={() => navigateTo('cart')}>
                <ShoppingCart size={24} className="text-orange-500" />
                {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">{cart.length}</span>}
              </div>
              
              {/* PROFILE BUTTON - DESKTOP */}
              <button 
                onClick={() => navigateTo('profile')} 
                className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeTab === 'profile'
                    ? 'bg-orange-500 text-white'
                    : theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                <User size={16} />
                {user ? user.name.split(' ')[0] : t.nav.profile}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CHAT */}
      {showChat && (
        <div className={`fixed bottom-28 ${isRTL ? 'left-4' : 'right-4'} w-80 h-96 rounded-2xl shadow-2xl z-50 flex flex-col ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-bold">{t.support.title}</span>
            </div>
            <button onClick={() => setShowChat(false)} className="text-white hover:bg-white/20 p-1 rounded"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.length === 0 && <div className="text-center text-sm opacity-60 mt-8">{t.support.welcome}</div>}
            {chatMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-3 py-2 rounded-xl text-sm ${msg.sender === 'user' ? 'bg-orange-500 text-white' : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  {msg.text}
                  <div className="text-xs opacity-60 mt-1">{msg.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-slate-700">
            <div className="flex gap-2">
              <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()} placeholder={t.support.typeMessage} className={`flex-1 px-3 py-2 rounded-xl text-sm outline-none ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`} />
              <button onClick={sendChatMessage} className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="container mx-auto px-4 py-6 min-h-[80vh]">
        
        {/* HOME */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative rounded-3xl overflow-hidden h-96 md:h-[600px] shadow-2xl">
              {HERO_SLIDES.map((slide, index) => (
                <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === heroSlide ? 'opacity-100' : 'opacity-0'}`}>
                  <img src={slide.image} alt={slide.titleFa} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-2 mb-4">
                        <Flame className="text-orange-500 w-8 h-8 animate-pulse" />
                        <span className="text-orange-400 font-bold uppercase tracking-wider text-sm md:text-base">{lang === 'fa' ? slide.subtitleFa : slide.subtitleEn}</span>
                      </div>
                      <h1 className="text-4xl md:text-7xl font-black text-white mb-6 leading-tight">{lang === 'fa' ? slide.titleFa : slide.titleEn}</h1>
                      <div className="flex gap-4">
                        <button onClick={() => navigateTo('menu')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-500/30 flex items-center gap-2">
                          <ShoppingCart size={20} />
                          {t.hero.cta}
                        </button>
                        <button onClick={() => navigateTo('menu')} className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg transition-all border border-white/20 flex items-center gap-2">
                          <Menu size={20} />
                          {t.hero.cta2}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => setHeroSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-all"><ChevronLeft size={24} /></button>
              <button onClick={() => setHeroSlide(prev => (prev + 1) % HERO_SLIDES.length)} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md p-3 rounded-full text-white transition-all"><ChevronRight size={24} /></button>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                {HERO_SLIDES.map((_, index) => (
                  <button key={index} onClick={() => setHeroSlide(index)} className={`h-2 rounded-full transition-all ${index === heroSlide ? 'bg-orange-500 w-12' : 'bg-white/50 w-2'}`} />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Truck, label: lang === 'fa' ? 'ارسال سریع' : 'Fast', value: '30 min', color: 'text-blue-500' },
                { icon: Star, label: lang === 'fa' ? 'امتیاز' : 'Rating', value: '4.9/5', color: 'text-yellow-500' },
                { icon: Award, label: lang === 'fa' ? 'کیفیت' : 'Quality', value: '100%', color: 'text-green-500' },
                { icon: Users, label: lang === 'fa' ? 'مشتریان' : 'Customers', value: '10K+', color: 'text-purple-500' }
              ].map((stat, idx) => (
                <div key={idx} className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:scale-105 transition-transform`}>
                  <stat.icon className={`w-10 h-10 mb-3 ${stat.color}`} />
                  <div className="text-3xl font-black mb-1">{stat.value}</div>
                  <div className="text-sm opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-black flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={28} />
                  {lang === 'fa' ? 'محصولات ویژه' : 'Featured'}
                </h2>
                <button onClick={() => navigateTo('menu')} className="text-orange-500 hover:text-orange-600 font-bold flex items-center gap-1">
                  {lang === 'fa' ? 'همه' : 'All'}
                  <ArrowRight className={isRTL ? 'rotate-180' : ''} size={18} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.filter(p => p.featured).slice(0, 3).map(p => (
                  <div key={p.id} onClick={() => { setSelectedProduct(p); setShowModal(true); }} className={`cursor-pointer rounded-2xl overflow-hidden border transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800 border-slate-700 hover:border-orange-500' : 'bg-white border-gray-100 hover:border-orange-500'} shadow-lg group`}>
                    <div className="relative h-64 overflow-hidden">
                      {!imageLoaded[p.id] && <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>}
                      <img src={p.image} alt={lang === 'fa' ? p.nameFa : p.nameEn} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onLoad={() => handleImageLoad(p.id)} style={{ opacity: imageLoaded[p.id] ? 1 : 0 }} />
                      {p.originalPrice > p.price && <div className="absolute top-4 right-4 bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">{Math.round((1 - p.price / p.originalPrice) * 100)}% {t.product.off}</div>}
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(p.id); }} className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-2 rounded-full transition ${favorites.includes(p.id) ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'}`}>
                        <Heart size={18} className={favorites.includes(p.id) ? 'fill-current' : ''} />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-xl mb-2">{lang === 'fa' ? p.nameFa : p.nameEn}</h3>
                      <p className="text-sm opacity-60 mb-3 line-clamp-2">{lang === 'fa' ? p.descFa : p.descEn}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className="text-sm font-bold">{p.rating}</span></div>
                        <span className="text-xs opacity-50">({p.reviews})</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-orange-500 font-mono font-bold text-xl">{p.price.toLocaleString()}</div>
                          {p.originalPrice > p.price && <div className="text-xs opacity-50 line-through">{p.originalPrice.toLocaleString()}</div>}
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-xl transition"><Plus size={20} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-black mb-6">{lang === 'fa' ? 'دسته بندی' : 'Categories'}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {menuSubItems.slice(1).map(cat => (
                  <button key={cat.id} onClick={() => navigateTo('menu', cat.id)} className={`p-6 rounded-2xl transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}>
                    <cat.icon className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                    <div className="text-sm font-bold">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MENU */}
        {activeTab === 'menu' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-black mb-6">{t.menu.title}</h2>
            <div className="mb-6 space-y-4">
              <div className="flex gap-2">
                <div className={`flex-1 relative ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} rounded-xl shadow-lg`}>
                  <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-gray-400`} size={20} />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.menu.search} className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 rounded-xl outline-none ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`} />
                </div>
                <button onClick={() => setShowFilters(!showFilters)} className={`px-4 rounded-xl shadow-lg transition ${showFilters ? 'bg-orange-500 text-white' : theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}><Filter size={20} /></button>
              </div>
              {showFilters && (
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                  <label className="block text-sm font-bold mb-2">{t.menu.sort}</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`w-full p-2 rounded-lg outline-none ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`}>
                    <option value="popular">{t.menu.popular}</option>
                    <option value="rating">{t.menu.rating}</option>
                    <option value="priceLowHigh">{t.menu.priceLowHigh}</option>
                    <option value="priceHighLow">{t.menu.priceHighLow}</option>
                    <option value="new">{t.menu.new}</option>
                  </select>
                </div>
              )}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {menuSubItems.map(cat => (
                  <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-4 py-2 rounded-full whitespace-nowrap font-bold transition flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-orange-500 text-white' : theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-100'}`}>
                    <cat.icon size={16} />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Search size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-xl opacity-60">{t.menu.noResults}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className={`relative rounded-2xl overflow-hidden shadow-lg transition-all hover:scale-105 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                    <div className="h-64 bg-gray-200 relative overflow-hidden cursor-pointer" onClick={() => { setSelectedProduct(product); setShowModal(true); }}>
                      {!imageLoaded[product.id] && <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>}
                      <img src={product.image} alt={lang === 'fa' ? product.nameFa : product.nameEn} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" onLoad={() => handleImageLoad(product.id)} style={{ opacity: imageLoaded[product.id] ? 1 : 0 }} />
                      {product.originalPrice > product.price && <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">{Math.round((1 - product.price / product.originalPrice) * 100)}% {t.product.off}</div>}
                      <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} p-2 rounded-full transition ${favorites.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/80 hover:bg-white'}`}>
                        <Heart size={18} className={favorites.includes(product.id) ? 'fill-current' : ''} />
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg">{lang === 'fa' ? product.nameFa : product.nameEn}</h3>
                        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold"><Star size={12} className="fill-current" />{product.rating}</div>
                      </div>
                      <p className="text-sm opacity-60 mb-3 line-clamp-2">{lang === 'fa' ? product.descFa : product.descEn}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-orange-500 font-mono font-bold text-xl">{product.price.toLocaleString()}</div>
                          {product.originalPrice > product.price && <div className="text-xs opacity-50 line-through">{product.originalPrice.toLocaleString()}</div>}
                        </div>
                        <button onClick={() => addToCart(product)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-bold transition flex items-center gap-1"><Plus size={16} />{t.product.add}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* OFFERS */}
        {activeTab === 'offers' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-orange-500/10 rounded-full mb-4"><Percent className="w-12 h-12 text-orange-500" /></div>
              <h2 className="text-4xl font-black mb-2">{t.offers.title}</h2>
              <p className="text-lg opacity-60">{t.offers.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OFFERS.map((offer, idx) => (
                <div key={idx} className={`relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br ${offer.color} text-white p-8 hover:scale-105 transition-transform`}>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl"><offer.icon size={32} /></div>
                      <div className="text-right">
                        <div className="text-5xl font-black">{offer.type === 'percent' ? `${offer.discount}%` : offer.type === 'delivery' ? (lang === 'fa' ? 'رایگان' : 'FREE') : `${(offer.discount / 1000).toFixed(0)}K`}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{lang === 'fa' ? offer.descFa : offer.descEn}</h3>
                    <div className="space-y-2 mb-6 text-sm opacity-90">
                      <div className="flex items-center gap-2"><Clock size={14} /><span>{t.offers.validUntil}: {offer.validUntil}</span></div>
                      <div className="flex items-center gap-2"><ShoppingBag size={14} /><span>{t.offers.minOrder}: {offer.minOrder.toLocaleString()}</span></div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-3 rounded-xl">
                      <div className="flex-1">
                        <div className="text-xs opacity-80">{t.offers.code}</div>
                        <div className="font-mono font-bold text-lg tracking-wider">{offer.code}</div>
                      </div>
                      <button onClick={() => copyCouponCode(offer.code)} className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition flex items-center gap-1">
                        {copiedCode === offer.code ? <CheckCircle size={14} /> : <Plus size={14} />}
                        {copiedCode === offer.code ? t.offers.copied : t.offers.copy}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && (
          <div className="animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black mb-3">{t.about.title}</h2>
              <p className="text-lg opacity-60">{t.about.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className={`rounded-3xl overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" alt="About" className="w-full h-80 object-cover" />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <p className="text-lg opacity-80 leading-relaxed">{t.about.p1}</p>
                <p className="text-lg opacity-80 leading-relaxed">{t.about.p2}</p>
                <div className="flex gap-3 pt-4">
                  <button onClick={() => navigateTo('menu')} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition flex items-center gap-2"><Utensils size={18} />{t.hero.cta2}</button>
                  <button onClick={() => navigateTo('contact')} className={`px-6 py-3 rounded-xl font-bold transition flex items-center gap-2 ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}><Headphones size={18} />{t.nav.contact}</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: '15+', label: t.about.stats.years, icon: Award },
                { value: '50K+', label: t.about.stats.customers, icon: Users },
                { value: '25', label: t.about.stats.cities, icon: MapPin },
                { value: '120+', label: t.about.stats.dishes, icon: Utensils }
              ].map((stat, idx) => (
                <div key={idx} className={`p-6 rounded-2xl text-center ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:scale-105 transition-transform`}>
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-orange-500" />
                  <div className="text-4xl font-black text-orange-500 mb-1">{stat.value}</div>
                  <div className="text-sm opacity-60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'contact' && (
          <div className="animate-fadeIn max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black mb-3">{t.contact.title}</h2>
              <p className="text-lg opacity-60">{t.contact.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {[
                  { icon: MapPin, label: t.contact.address, value: t.contact.addressValue, color: 'bg-red-500' },
                  { icon: Phone, label: t.contact.phone, value: '021-12345678', color: 'bg-blue-500' },
                  { icon: Mail, label: t.contact.email, value: 'info@burgerking.com', color: 'bg-green-500' },
                  { icon: Clock, label: t.contact.hours, value: t.contact.hoursValue, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-4 p-5 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:scale-105 transition-transform`}>
                    <div className={`${item.color} p-3 rounded-xl text-white`}><item.icon size={24} /></div>
                    <div>
                      <div className="font-bold mb-1">{item.label}</div>
                      <div className="opacity-70">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleContactSubmit} className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg space-y-4`}>
                <h3 className="text-xl font-bold mb-4">{t.contact.sendMsg}</h3>
                <input type="text" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} placeholder={t.contact.name} required className={`w-full p-3 rounded-xl outline-none border focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                <input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} placeholder={t.auth.email} required className={`w-full p-3 rounded-xl outline-none border focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                <textarea value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} placeholder={t.contact.message} required rows={5} className={`w-full p-3 rounded-xl outline-none border focus:border-orange-500 resize-none ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}></textarea>
                <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition flex items-center justify-center gap-2"><Send size={18} />{t.contact.sendMsg}</button>
              </form>
            </div>
          </div>
        )}

        {/* TRACK */}
        {activeTab === 'track' && (
          <div className="animate-fadeIn max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-block p-4 bg-orange-500/10 rounded-full mb-4"><Receipt className="w-12 h-12 text-orange-500" /></div>
              <h2 className="text-4xl font-black mb-3">{t.track.title}</h2>
              <p className="text-lg opacity-60">{t.track.subtitle}</p>
            </div>
            <div className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-2xl`}>
              <div className="flex gap-2">
                <input type="text" value={trackOrderId} onChange={(e) => setTrackOrderId(e.target.value)} placeholder={t.track.placeholder} className={`flex-1 p-4 rounded-xl outline-none border-2 focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                <button onClick={handleTrackOrder} className="bg-orange-500 hover:bg-orange-600 text-white px-6 rounded-xl font-bold transition flex items-center gap-2"><Search size={18} />{t.track.btn}</button>
              </div>
              {trackedOrder && trackedOrder !== 'not_found' && (
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                    <div>
                      <div className="font-bold text-lg">{trackedOrder.id}</div>
                      <div className="text-sm opacity-60">{new Date(trackedOrder.date).toLocaleString(lang === 'fa' ? 'fa-IR' : 'en-US')}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span>{t.cart.total}</span><span className="font-bold text-orange-500">{trackedOrder.total.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span>{lang === 'fa' ? 'وضعیت' : 'Status'}</span><span className="px-3 py-1 bg-yellow-500/20 text-yellow-600 rounded-full text-sm font-bold">{t.order.pending}</span></div>
                    <div className="flex justify-between"><span>{lang === 'fa' ? 'زمان' : 'Time'}</span><span className="font-bold">{trackedOrder.estimatedTime} {lang === 'fa' ? 'دقیقه' : 'min'}</span></div>
                  </div>
                </div>
              )}
              {trackedOrder === 'not_found' && (
                <div className="mt-6 p-6 rounded-2xl bg-red-500/10 border-2 border-red-500/30 text-center">
                  <X className="text-red-500 mx-auto mb-2" size={32} />
                  <p className="font-bold text-red-500">{t.track.notFound}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CART */}
        {activeTab === 'cart' && (
          <div className="max-w-3xl mx-auto animate-fadeIn">
            <h2 className="text-3xl font-black mb-6">{t.nav.cart}</h2>
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart size={80} className="mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-bold mb-2">{t.cart.empty}</p>
                <p className="opacity-60 mb-6">{t.cart.emptyDesc}</p>
                <button onClick={() => navigateTo('menu')} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-bold transition">{t.cart.continue}</button>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200"><img src={item.image} alt={lang === 'fa' ? item.nameFa : item.nameEn} className="w-full h-full object-cover" /></div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{lang === 'fa' ? item.nameFa : item.nameEn}</h4>
                          <p className="text-sm opacity-60 mb-2">{lang === 'fa' ? 'سایز' : 'Size'}: {t.product[item.size]}</p>
                          <div className="flex items-center gap-3">
                            <button onClick={() => updateCartQuantity(item.cartId, Math.max(1, item.quantity - 1))} className="p-1 rounded-lg bg-gray-200 dark:bg-slate-700"><Minus size={16} /></button>
                            <span className="font-bold">{item.quantity}</span>
                            <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)} className="p-1 rounded-lg bg-gray-200 dark:bg-slate-700"><Plus size={16} /></button>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-orange-500 font-mono font-bold text-lg">{item.totalPrice.toLocaleString()}</div>
                          <button onClick={() => removeFromCart(item.cartId)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg mt-2"><Trash2 size={18} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg h-fit`}>
                  <h3 className="font-bold text-lg mb-4">{lang === 'fa' ? 'خلاصه' : 'Summary'}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between"><span>{t.cart.subtotal}</span><span className="font-bold">{calculateSubtotal().toLocaleString()}</span></div>
                    {appliedCoupon && <div className="flex justify-between text-green-500"><span>{t.cart.discount}</span><span>-{calculateDiscount().toLocaleString()}</span></div>}
                    <div className="flex justify-between"><span>{t.cart.delivery}</span><span className={calculateDelivery() === 0 ? 'text-green-500 font-bold' : ''}>{calculateDelivery() === 0 ? t.cart.free : calculateDelivery().toLocaleString()}</span></div>
                    <div className="border-t pt-3 flex justify-between text-xl font-black"><span>{t.cart.total}</span><span className="text-orange-500">{calculateTotal().toLocaleString()}</span></div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">{t.cart.coupon}</label>
                    <div className="flex gap-2">
                      <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="WELCOME10" className={`flex-1 p-2 rounded-lg outline-none ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`} />
                      <button onClick={applyCoupon} className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg font-bold transition">{t.cart.apply}</button>
                    </div>
                  </div>
                  <button onClick={handleCheckout} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition">{t.cart.checkout}</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-4xl mx-auto animate-fadeIn">
            {!user ? (
              <div className={`max-w-md mx-auto p-8 rounded-3xl shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white"><User size={40} /></div>
                  <h2 className="text-2xl font-bold">{isRegistering ? t.auth.register : t.auth.login}</h2>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  {isRegistering && (
                    <input type="text" value={loginData.name} onChange={(e) => setLoginData({...loginData, name: e.target.value})} placeholder={t.auth.name} className={`w-full p-3 rounded-xl outline-none border focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                  )}
                  <div className="relative">
                    <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-gray-400`} size={18} />
                    <input type="text" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} placeholder={t.auth.email} className={`w-full ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} p-3 rounded-xl outline-none border focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} />
                  </div>
                  
                  {/* PASSWORD FIELD WITH VALIDATION */}
                  <div className="relative">
                    <Lock className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-gray-400`} size={18} />
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={loginData.password} 
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                      placeholder={t.auth.pass} 
                      className={`w-full ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} p-3 rounded-xl outline-none border focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* PASSWORD STRENGTH INDICATOR */}
                  {isRegistering && loginData.password && passwordValidation && (
                    <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} space-y-3`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">{t.auth.passStrength}</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          passwordValidation.strength === 'veryStrong' ? 'bg-green-500/20 text-green-500' :
                          passwordValidation.strength === 'strong' ? 'bg-blue-500/20 text-blue-500' :
                          passwordValidation.strength === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
                          'bg-red-500/20 text-red-500'
                        }`}>
                          {t.auth[`pass${passwordValidation.strength.charAt(0).toUpperCase() + passwordValidation.strength.slice(1)}`]}
                        </span>
                      </div>
                      
                      {/* Strength Bar */}
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(level => (
                          <div 
                            key={level} 
                            className={`h-1.5 flex-1 rounded-full transition-all ${
                              level <= passwordValidation.score 
                                ? passwordValidation.strength === 'veryStrong' ? 'bg-green-500' :
                                  passwordValidation.strength === 'strong' ? 'bg-blue-500' :
                                  passwordValidation.strength === 'medium' ? 'bg-yellow-500' :
                                  'bg-red-500'
                                : theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Requirements */}
                      <div className="space-y-2 pt-2">
                        <div className="text-xs font-bold opacity-70">{t.auth.passRequirements}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { key: 'length', text: t.auth.passReqLength },
                            { key: 'uppercase', text: t.auth.passReqUpper },
                            { key: 'lowercase', text: t.auth.passReqLower },
                            { key: 'number', text: t.auth.passReqNumber },
                            { key: 'special', text: t.auth.passReqSpecial }
                          ].map(req => (
                            <div key={req.key} className="flex items-center gap-2 text-xs">
                              {passwordValidation.checks[req.key] ? (
                                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                              ) : (
                                <AlertCircle size={14} className="text-red-500 flex-shrink-0" />
                              )}
                              <span className={passwordValidation.checks[req.key] ? 'text-green-500' : 'opacity-60'}>{req.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {isRegistering && (
                    <div className="relative">
                      <Lock className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} text-gray-400`} size={18} />
                      <input 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        value={loginData.confirmPassword} 
                        onChange={(e) => setLoginData({...loginData, confirmPassword: e.target.value})} 
                        placeholder={t.auth.confirmPass} 
                        className={`w-full ${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} p-3 rounded-xl outline-none border focus:border-orange-500 ${theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`} 
                      />
                      <button 
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'} text-gray-400 hover:text-gray-600`}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      {loginData.confirmPassword && (
                        <div className={`absolute bottom-3 ${isRTL ? 'left-10' : 'right-10'}`}>
                          {loginData.password === loginData.confirmPassword ? (
                            <CheckCircle size={18} className="text-green-500" />
                          ) : (
                            <X size={18} className="text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {errorMsg && <p className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded flex items-center justify-center gap-2"><AlertCircle size={16} />{errorMsg}</p>}
                  {successMsg && <p className="text-green-500 text-sm text-center bg-green-500/10 py-2 rounded flex items-center justify-center gap-2"><CheckCircle size={16} />{successMsg}</p>}
                  <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition">{isRegistering ? t.auth.registerBtn : t.auth.btn}</button>
                  <div className="text-center text-sm">
                    <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="text-orange-500 hover:text-orange-600 font-bold">{isRegistering ? t.auth.hasAccount : t.auth.noAccount}</button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-3xl text-white font-bold">{user.name.charAt(0).toUpperCase()}</div>
                    <div>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="opacity-60">{user.email}</p>
                      <p className="text-sm text-orange-500 font-bold">{t.profile.level}: {t.profile[userProfile.level]}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 rounded-xl bg-orange-500/10"><div className="text-2xl font-black text-orange-500">{orders.length}</div><div className="text-xs opacity-60">{t.profile.totalOrders}</div></div>
                    <div className="text-center p-3 rounded-xl bg-green-500/10"><div className="text-2xl font-black text-green-500">{userProfile.points}</div><div className="text-xs opacity-60">{t.profile.loyaltyPoints}</div></div>
                    <div className="text-center p-3 rounded-xl bg-blue-500/10"><div className="text-2xl font-black text-blue-500">{visitors.toLocaleString()}</div><div className="text-xs opacity-60">{lang === 'fa' ? 'بازدید' : 'Visits'}</div></div>
                  </div>
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10 py-3 rounded-xl transition"><LogOut size={18} />{t.profile.logout}</button>
                </div>
                {orders.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">{t.profile.orders}</h3>
                    <div className="space-y-3">
                      {orders.slice().reverse().map(order => (
                        <div key={order.id} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg`}>
                          <div className="flex justify-between items-start mb-2">
                            <div><div className="font-bold">{order.id}</div><div className="text-sm opacity-60">{new Date(order.date).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}</div></div>
                            <div className="text-right"><div className="text-orange-500 font-bold">{order.total.toLocaleString()}</div><div className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-600 inline-block">{t.order[order.status]}</div></div>
                          </div>
                          <div className="text-sm opacity-60">{order.items.length} {t.order.items}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* MODAL */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60] flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-2xl`} onClick={(e) => e.stopPropagation()}>
            <div className="relative h-80 bg-gray-200">
              <img src={selectedProduct.image} alt={lang === 'fa' ? selectedProduct.nameFa : selectedProduct.nameEn} className="w-full h-full object-cover" />
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full"><X size={20} /></button>
            </div>
            <div className="p-6">
              <h2 className="text-3xl font-black mb-2">{lang === 'fa' ? selectedProduct.nameFa : selectedProduct.nameEn}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"><Star size={14} className="fill-current" /><span className="font-bold">{selectedProduct.rating}</span></div>
                <span className="text-sm opacity-60">({selectedProduct.reviews})</span>
              </div>
              <p className="opacity-70 mb-6">{lang === 'fa' ? selectedProduct.descFa : selectedProduct.descEn}</p>
              <div className="mb-6">
                <label className="block font-bold mb-2">{t.product.size}</label>
                <div className="grid grid-cols-3 gap-2">
                  {['small', 'medium', 'large'].map(size => (
                    <button key={size} onClick={() => setProductSize(size)} className={`p-3 rounded-xl font-bold transition ${productSize === size ? 'bg-orange-500 text-white' : theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                      {t.product[size]}
                      <div className="text-xs mt-1">{selectedProduct.sizes[size].toLocaleString()}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block font-bold mb-2">{t.product.quantity}</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setProductQuantity(Math.max(1, productQuantity - 1))} className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700"><Minus size={20} /></button>
                  <span className="text-2xl font-bold w-12 text-center">{productQuantity}</span>
                  <button onClick={() => setProductQuantity(productQuantity + 1)} className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700"><Plus size={20} /></button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="text-sm opacity-60">{t.product.calories}: {selectedProduct.calories}</div>
                  <div className="text-sm opacity-60">{t.product.prepTime}: {selectedProduct.prepTime} {t.product.minutes}</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-orange-500">{(selectedProduct.sizes[productSize] * productQuantity).toLocaleString()}</div>
                  <div className="text-xs opacity-50">{t.product.price}</div>
                </div>
              </div>
              <button onClick={() => { addToCart(selectedProduct, productSize, productQuantity); setShowModal(false); setProductSize('medium'); setProductQuantity(1); }} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition">{t.product.add}</button>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">{t.product.reviews}</h3>
                <div className="space-y-3 mb-4">
                  {(productReviews[selectedProduct.id] || []).slice(-3).map((review, idx) => (
                    <div key={idx} className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-bold">{review.userName}</div>
                        <div className="flex items-center gap-1">{[...Array(5)].map((_, i) => <Star key={i} size={12} className={i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} />)}</div>
                      </div>
                      <p className="text-sm opacity-70">{review.text}</p>
                    </div>
                  ))}
                </div>
                {user && (
                  <div>
                    <label className="block font-bold mb-2">{t.product.writeReview}</label>
                    <div className="flex items-center gap-2 mb-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setReviewRating(star)}><Star size={24} className={star <= reviewRating ? 'text-yellow-500 fill-current' : 'text-gray-300'} /></button>
                      ))}
                    </div>
                    <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className={`w-full p-3 rounded-xl outline-none resize-none ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-100'}`} rows={3} placeholder={lang === 'fa' ? 'نظر شما...' : 'Your review...'} />
                    <button onClick={() => addReview(selectedProduct.id)} className="mt-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-bold transition">{lang === 'fa' ? 'ارسال' : 'Submit'}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAV */}
      <nav className={`fixed bottom-0 left-0 right-0 z-40 md:hidden backdrop-blur-xl border-t ${theme === 'dark' ? 'bg-slate-900/98 border-slate-800' : 'bg-white/98 border-gray-200'} shadow-2xl`}>
        <div className="flex justify-around items-center h-16 px-1 safe-area-bottom">
          {[
            { id: 'home', icon: Home, label: t.nav.home },
            { id: 'menu', icon: Utensils, label: t.nav.menu },
            { id: 'offers', icon: Percent, label: t.nav.offers },
            { id: 'cart', icon: ShoppingCart, label: t.nav.cart, badge: cart.length },
            { id: 'profile', icon: User, label: t.nav.profile },
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id} 
                onClick={() => navigateTo(tab.id)} 
                className={`relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 ${isActive ? 'text-orange-500' : 'text-gray-400'}`}
              >
                {isActive && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-orange-500 rounded-b-full shadow-lg shadow-orange-500/50"></div>
                )}
                
                <div className={`relative transition-all duration-300 ${isActive ? 'scale-110 -translate-y-1' : 'scale-100'}`}>
                  <tab.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  
                  {tab.badge > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] min-w-[16px] h-4 flex items-center justify-center rounded-full font-bold px-1 shadow-lg">
                      {tab.badge}
                    </span>
                  )}
                </div>
                
                <span className={`text-[10px] font-bold mt-1 transition-all ${isActive ? 'opacity-100' : 'opacity-60'}`}>
                  {tab.label}
                </span>
                
                {isActive && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50"></div>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* SCROLL TOP */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 right-4 md:bottom-10 md:right-10 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-2xl transition-transform hover:scale-110 z-30">
          <ArrowUp size={24} />
        </button>
      )}

      {/* ============================================ */}
      {/* FOOTER WITH DEVELOPER SECTION */}
      {/* ============================================ */}
      <footer className={`mt-12 border-t ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        
        {/* Developer Section */}
        <div className={`border-b ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Developer Info */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <img 
                    src='../public/Gemini_Generated_Image_qcbkmuqcbkmuqcbk.png'
                    alt={lang === 'fa' ? DEVELOPER.name : DEVELOPER.nameEn}
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-orange-500 shadow-xl"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900"></div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Code2 size={16} className="text-orange-500" />
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">{t.footer.developer}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-1">
                    {lang === 'fa' ? DEVELOPER.name : DEVELOPER.nameEn}
                  </h3>
                  <p className="text-sm opacity-60 flex items-center gap-1">
                    <Sparkles size={14} className="text-orange-500" />
                    {lang === 'fa' ? DEVELOPER.roleFa : DEVELOPER.role}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-col items-center md:items-end gap-3">
                <p className="text-sm opacity-60">{t.footer.followMe}</p>
                <div className="flex items-center gap-3">
                  <a 
                    href='https://github.com/amiraliSite'
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${
                      theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <FaGithub size={20} className="group-hover:text-orange-500 transition-colors" />
                    <span className="text-sm font-bold hidden sm:inline">GitHub</span>
                  </a>
                  <a 
                    href='https://linkedin.com/in/amirali-react87'
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-105 ${
                      theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <FaLinkedin size={20} className="group-hover:text-blue-500 transition-colors" />
                    <span className="text-sm font-bold hidden sm:inline">LinkedIn</span>
                  </a>
                  <a 
                    href='https://amirresume.netlify.app'
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white transition-all hover:scale-105 shadow-lg shadow-orange-500/30"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm font-bold">{t.footer.viewPortfolio}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-xl"><Flame className="w-6 h-6 text-white" /></div>
                <span className="text-xl font-black">{t.brand.name}</span>
              </div>
              <p className="text-sm opacity-60">{t.brand.tagline}</p>
            </div>
            <div>
              <h4 className="font-bold mb-3">{t.footer.about}</h4>
              <ul className="space-y-2 text-sm opacity-60">
                <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigateTo('home')}>{t.nav.home}</li>
                <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigateTo('about')}>{t.nav.about}</li>
                <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigateTo('contact')}>{t.nav.contact}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">{t.nav.menu}</h4>
              <ul className="space-y-2 text-sm opacity-60">
                <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigateTo('menu', 'burger')}>{t.nav.menuSub.burgers}</li>
                <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigateTo('menu', 'pizza')}>{t.nav.menuSub.pizza}</li>
                <li className="hover:text-orange-500 cursor-pointer" onClick={() => navigateTo('menu', 'drinks')}>{t.nav.menuSub.drinks}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">{t.footer.newsletter}</h4>
              <div className="flex gap-2">
                <input type="email" value={newsletter} onChange={(e) => setNewsletter(e.target.value)} placeholder={t.footer.emailPlaceholder} className={`flex-1 p-2 rounded-lg text-sm outline-none ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-100'}`} />
                <button onClick={subscribeNewsletter} className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-lg font-bold transition"><Send size={16} /></button>
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className={`border-t pt-6 ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left text-sm opacity-60">
                <p>© 2026 {t.brand.name}. {t.footer.rights}.</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="opacity-60">{t.footer.madeWith}</span>
                <Flame size={16} className="text-orange-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
        @keyframes slideIn { from { transform: translateX(${isRTL ? '100%' : '-100%'}); } to { transform: translateX(0); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 5px rgba(249, 115, 22, 0.5), 0 0 10px rgba(249, 115, 22, 0.3); } 50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.8), 0 0 30px rgba(249, 115, 22, 0.5); } }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-slideIn { animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom); }
      `}</style>
    </div>
  );
}
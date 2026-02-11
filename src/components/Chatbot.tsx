import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Brain,
  Sparkles,
  Car,
  Clock,
  Shield,
  Wrench,
  CreditCard,
  Calendar,
  TrendingUp,
  Gauge,
  Star,
  ChevronRight,
  Zap,
  Battery,
  MapPin,
  Phone,
  Mail
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

// ============= Types & Interfaces =============
interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: Attachment[];
  quickReplies?: QuickReply[];
}

interface Attachment {
  type: "image" | "spec" | "price";
  content: any;
}

interface QuickReply {
  text: string;
  action: string;
  icon?: React.ReactNode;
}

interface CarInfo {
  id: string;
  name: string;
  type: "performance" | "luxury" | "suv" | "electric" | "hybrid";
  price: number;
  monthlyPayment: number;
  features: string[];
  description: string;
  image?: string;
  rating: number;
  inStock: boolean;
  color: string;
  engine: string;
  range?: string;
  acceleration: string;
}

interface ServicePackage {
  id: string;
  name: string;
  price: number | string;
  duration: string;
  includes: string[];
  popular?: boolean;
}

interface Appointment {
  date: string;
  time: string;
  type: string;
  status: "pending" | "confirmed" | "completed";
}

interface UserPreference {
  budget?: number;
  vehicleType?: string;
  features?: string[];
}

// ============= Data Layer =============
const CAR_DATABASE: CarInfo[] = [
  {
    id: "vxr8",
    name: "VXR-8",
    type: "performance",
    price: 85000,
    monthlyPayment: 1250,
    features: ["0-60 in 3.1s", "650 HP", "Track Mode", "Carbon Fiber Package", "Launch Control"],
    description: "Ultimate performance sports car with track capabilities and aggressive styling",
    rating: 4.8,
    inStock: true,
    color: "Racing Red",
    engine: "4.0L V8 Twin-Turbo",
    acceleration: "3.1s 0-60 mph"
  },
  {
    id: "phantom-gt",
    name: "Phantom GT",
    type: "performance",
    price: 95000,
    monthlyPayment: 1399,
    features: ["0-60 in 3.4s", "720 HP", "Adaptive Suspension", "Premium Sound", "Carbon Ceramic Brakes"],
    description: "Balanced luxury and performance grand tourer with daily usability",
    rating: 4.9,
    inStock: true,
    color: "Midnight Blue",
    engine: "5.2L V10",
    acceleration: "3.4s 0-60 mph"
  },
  {
    id: "aurox-lx",
    name: "Aurox LX",
    type: "luxury",
    price: 75000,
    monthlyPayment: 1099,
    features: ["Executive Seats", "Massage Function", "4-Zone Climate", "Night Vision", "Air Suspension"],
    description: "Executive luxury sedan with premium comfort and advanced safety features",
    rating: 4.7,
    inStock: true,
    color: "Obsidian Black",
    engine: "3.5L V6 Hybrid",
    acceleration: "5.2s 0-60 mph"
  },
  {
    id: "velar-prestige",
    name: "Velar Prestige",
    type: "luxury",
    price: 82000,
    monthlyPayment: 1199,
    features: ["OLED Dashboard", "AI Assistant", "Gesture Control", "Autonomous Driving", "Massage Seats"],
    description: "Tech-focused luxury vehicle with cutting-edge features and elegant design",
    rating: 4.8,
    inStock: true,
    color: "Silver Frost",
    engine: "3.0L I6 Mild Hybrid",
    acceleration: "5.6s 0-60 mph"
  },
  {
    id: "titan-x",
    name: "Titan X",
    type: "suv",
    price: 68000,
    monthlyPayment: 999,
    features: ["7-Seater", "Off-Road Mode", "Towing Package", "Panoramic Roof", "Terrain Response"],
    description: "Performance SUV with family-friendly features and off-road capability",
    rating: 4.6,
    inStock: true,
    color: "Forest Green",
    engine: "3.0L V6 Turbo",
    acceleration: "6.1s 0-60 mph"
  },
  {
    id: "urban-elite",
    name: "Urban Elite",
    type: "suv",
    price: 55000,
    monthlyPayment: 799,
    features: ["Hybrid Engine", "Smart Storage", "Safety Suite", "Wireless Charging", "360° Camera"],
    description: "Practical and stylish urban SUV with excellent fuel efficiency",
    rating: 4.5,
    inStock: true,
    color: "Urban Gray",
    engine: "2.5L Hybrid",
    acceleration: "7.2s 0-60 mph"
  },
  {
    id: "volt-prime",
    name: "Volt Prime",
    type: "electric",
    price: 72000,
    monthlyPayment: 1050,
    features: ["350-mile range", "15-min fast charge", "Autopilot", "Glass roof", "Haptic controls"],
    description: "All-electric luxury sedan with zero emissions and instant torque",
    rating: 4.9,
    inStock: true,
    color: "Arctic White",
    engine: "Dual Motor AWD",
    range: "350 miles",
    acceleration: "3.8s 0-60 mph"
  },
  {
    id: "nexus-hybrid",
    name: "Nexus Hybrid",
    type: "hybrid",
    price: 48000,
    monthlyPayment: 699,
    features: ["50 MPG combined", "Solar roof", "Regenerative braking", "Eco mode", "Smart cruise"],
    description: "Efficient hybrid with innovative solar technology and modern design",
    rating: 4.7,
    inStock: true,
    color: "Eco Blue",
    engine: "1.8L Hybrid",
    range: "600+ miles total",
    acceleration: "8.1s 0-60 mph"
  }
];

const SERVICES: ServicePackage[] = [
  {
    id: "tuning",
    name: "Performance Tuning",
    price: 5000,
    duration: "2 days",
    includes: ["ECU remap", "Dyno testing", "Custom mapping", "Before/after comparison"],
    popular: true
  },
  {
    id: "coating",
    name: "Ceramic Pro Coating",
    price: 3000,
    duration: "1 day",
    includes: ["5-year warranty", "UV protection", "Hydrophobic finish", "Gloss enhancement"]
  },
  {
    id: "fleet",
    name: "Fleet Management",
    price: "Custom",
    duration: "Ongoing",
    includes: ["GPS tracking", "Maintenance scheduling", "Driver reports", "Cost optimization"]
  },
  {
    id: "maintenance",
    name: "Premium Maintenance",
    price: 2000,
    duration: "Annual",
    includes: ["Oil changes", "Tire rotation", "Multi-point inspection", "Fluid checks"],
    popular: true
  },
  {
    id: "detailing",
    name: "Executive Detailing",
    price: 800,
    duration: "6 hours",
    includes: ["Full interior/exterior", "Paint correction", "Leather treatment", "Engine bay cleaning"]
  },
  {
    id: "wrap",
    name: "Vinyl Wrap",
    price: 3500,
    duration: "3 days",
    includes: ["Premium 3M vinyl", "Custom colors", "Paint protection", "Removable"]
  }
];

const FINANCING_OPTIONS = {
  apr: { good: 2.9, average: 4.9, fair: 6.9 },
  terms: [36, 48, 60, 72],
  downPayment: { min: 0, recommended: 10 },
  lease: { starting: 399, term: 36, miles: 12000 }
};

const DEALERSHIP_INFO = {
  address: "123 Velocity Drive, Automotive City, CA 90210",
  phone: "+1 (555) 123-4567",
  email: "concierge@velocityai.com",
  hours: {
    monday: "9:00 AM - 8:00 PM",
    tuesday: "9:00 AM - 8:00 PM",
    wednesday: "9:00 AM - 8:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "11:00 AM - 5:00 PM"
  }
};

// ============= NLP & Response Engine =============
class ResponseEngine {
  private context: {
    lastQuery?: string;
    userPreferences: UserPreference;
    conversationHistory: string[];
  };

  constructor() {
    this.context = {
      userPreferences: {},
      conversationHistory: []
    };
  }

  async generateResponse(message: string): Promise<{
    text: string;
    attachments?: Attachment[];
    quickReplies?: QuickReply[];
  }> {
    const lower = message.toLowerCase();
    this.context.lastQuery = lower;
    this.context.conversationHistory.push(lower);

    // Intent detection with multiple keywords
    if (this.matchesIntent(lower, ["electric", "ev", "tesla", "volt", "battery"])) {
      return this.handleElectricQuery(lower);
    }
    if (this.matchesIntent(lower, ["hybrid", "eco", "fuel", "efficient", "mpg"])) {
      return this.handleHybridQuery(lower);
    }
    if (this.matchesIntent(lower, ["performance", "fast", "speed", "sport", "accelerat"])) {
      return this.handlePerformanceQuery(lower);
    }
    if (this.matchesIntent(lower, ["luxury", "premium", "comfort", "executive"])) {
      return this.handleLuxuryQuery(lower);
    }
    if (this.matchesIntent(lower, ["suv", "family", "space", "kid", "cargo"])) {
      return this.handleSuvQuery(lower);
    }
    if (this.matchesIntent(lower, ["price", "cost", "budget", "afford", "cheap", "expensive"])) {
      return this.handlePriceQuery(lower);
    }
    if (this.matchesIntent(lower, ["finance", "loan", "lease", "payment", "apr", "credit"])) {
      return this.handleFinanceQuery(lower);
    }
    if (this.matchesIntent(lower, ["service", "maintain", "repair", "tune", "coating", "detailing"])) {
      return this.handleServiceQuery(lower);
    }
    if (this.matchesIntent(lower, ["test drive", "testdrive", "try", "drive"])) {
      return this.handleTestDriveQuery(lower);
    }
    if (this.matchesIntent(lower, ["trade", "sell", "old car"])) {
      return this.handleTradeInQuery(lower);
    }
    if (this.matchesIntent(lower, ["appointment", "schedule", "book", "calendar"])) {
      return this.handleAppointmentQuery(lower);
    }
    if (this.matchesIntent(lower, ["compare", "vs", "versus", "difference"])) {
      return this.handleComparisonQuery(lower);
    }
    if (this.matchesIntent(lower, ["warranty", "guarantee", "protect"])) {
      return this.handleWarrantyQuery(lower);
    }
    if (this.matchesIntent(lower, ["inventory", "stock", "available", "in stock"])) {
      return this.handleInventoryQuery(lower);
    }
    if (this.matchesIntent(lower, ["hi", "hello", "hey", "greetings"])) {
      return this.handleGreeting();
    }
    if (this.matchesIntent(lower, ["help", "what can you do", "capabilities", "support"])) {
      return this.handleHelp();
    }
    if (this.matchesIntent(lower, ["clear", "reset", "start over", "new chat"])) {
      return this.handleReset();
    }

    return this.handleUnknown();
  }

  private matchesIntent(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private handleElectricQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "electric");

    if (query.includes("range")) {
      const car = cars[0];
      return {
        text: `${car.name} offers an impressive ${car.range} of range on a full charge. With 15-minute fast charging capability, long trips are effortless. Would you like to know about charging options?`,
        quickReplies: [
          { text: "⚡ Charging options", action: "charging" },
          { text: "💰 Cost to charge", action: "ev_cost" },
          { text: "🔋 Battery warranty", action: "ev_warranty" }
        ]
      };
    }

    const car = cars[0];
    return {
      text: `Our flagship EV is the ${car.name}. It delivers ${car.acceleration}, ${car.range} range, and includes ${car.features.slice(0, 3).join(", ")}. Priced at $${car.price.toLocaleString()} ($${car.monthlyPayment}/month).`,
      attachments: [{
        type: "spec",
        content: {
          acceleration: car.acceleration,
          range: car.range,
          engine: car.engine,
          rating: car.rating
        }
      }],
      quickReplies: [
        { text: "🆚 Compare with hybrid", action: "compare electric hybrid" },
        { text: "💰 Incentives", action: "ev_incentives" },
        { text: "📅 Test drive", action: "schedule ev" }
      ]
    };
  }

  private handleHybridQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "hybrid");
    const car = cars[0];

    return {
      text: `The ${car.name} hybrid achieves 50 MPG combined and has a total range of 600+ miles. It features a solar roof and regenerative braking. Starting at $${car.price.toLocaleString()} ($${car.monthlyPayment}/month).`,
      attachments: [{
        type: "spec",
        content: {
          mpg: "50 combined",
          range: "600+ miles",
          engine: car.engine,
          co2: "89 g/km"
        }
      }],
      quickReplies: [
        { text: "💚 Hybrid vs EV", action: "compare hybrid electric" },
        { text: "💰 Tax credit", action: "hybrid_incentives" },
        { text: "🔧 Maintenance", action: "hybrid_maintenance" }
      ]
    };
  }

  private handlePerformanceQuery(query: string): any {
    let cars = CAR_DATABASE.filter(c => c.type === "performance");

    if (query.includes("fastest")) {
      cars = cars.sort((a, b) => parseFloat(a.acceleration) - parseFloat(b.acceleration));
    }

    const car = cars[Math.floor(Math.random() * cars.length)];

    return {
      text: `For performance, the ${car.name} delivers ${car.acceleration} with ${car.engine} producing ${car.features[1]}. It's rated ${car.rating}/5 by owners. Starting at $${car.price.toLocaleString()}.`,
      attachments: [{
        type: "spec",
        content: {
          "0-60": car.acceleration,
          horsepower: "650+ HP",
          engine: car.engine,
          rating: `${car.rating}/5`
        }
      }],
      quickReplies: [
        { text: "🏁 Track package", action: "track_package" },
        { text: "🆚 Compare models", action: "compare performance" },
        { text: "💰 Financing", action: "finance performance" }
      ]
    };
  }

  private handleLuxuryQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "luxury");
    const car = cars[Math.floor(Math.random() * cars.length)];

    return {
      text: `The ${car.name} redefines luxury with ${car.features.slice(0, 2).join(" and ")}. Our executive package includes 4-zone climate control and massage functions. Priced at $${car.price.toLocaleString()}.`,
      attachments: [{
        type: "spec",
        content: {
          interior: "Nappa leather",
          sound: "Premium audio",
          climate: "4-zone",
          warranty: "6-year/75k mile"
        }
      }],
      quickReplies: [
        { text: "✨ Limited edition", action: "luxury_limited" },
        { text: "👔 Executive package", action: "executive_package" },
        { text: "🎨 Custom interior", action: "custom_interior" }
      ]
    };
  }

  private handleSuvQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "suv");
    const car = cars[Math.floor(Math.random() * cars.length)];

    return {
      text: `The ${car.name} SUV offers seating for 7, panoramic roof, and advanced safety features. Towing capacity up to 7,500 lbs. Starting at $${car.price.toLocaleString()}.`,
      attachments: [{
        type: "spec",
        content: {
          seating: "7 passengers",
          towing: "7,500 lbs",
          cargo: "84.5 cu ft",
          mpg: "23 combined"
        }
      }],
      quickReplies: [
        { text: "🧒 Family package", action: "family_package" },
        { text: "⛰️ Off-road", action: "offroad_package" },
        { text: "🚗 3-row comparison", action: "compare_suvs" }
      ]
    };
  }

  private handlePriceQuery(query: string): any {
    const minPrice = Math.min(...CAR_DATABASE.map(c => c.price));
    const maxPrice = Math.max(...CAR_DATABASE.map(c => c.price));
    const avgPrice = Math.round((minPrice + maxPrice) / 2);

    if (query.includes("budget") || query.includes("afford")) {
      const affordable = CAR_DATABASE.filter(c => c.price <= 55000);
      return {
        text: `Based on budget-conscious shoppers, I recommend:\n• ${affordable[0].name}: $${affordable[0].price.toLocaleString()}\n• ${affordable[1].name}: $${affordable[1].price.toLocaleString()}\n\nWould you like to see all vehicles under $60,000?`,
        quickReplies: [
          { text: "💰 Under $50k", action: "price under 50000" },
          { text: "💎 Best value", action: "best_value" },
          { text: "📊 Compare prices", action: "compare price" }
        ]
      };
    }

    return {
      text: `Our vehicles range from $${minPrice.toLocaleString()} to $${maxPrice.toLocaleString()}. Most models qualify for 0.9% - 3.9% APR financing. What's your preferred price range?`,
      quickReplies: [
        { text: "💰 $30k-$50k", action: "price 30000-50000" },
        { text: "💰 $50k-$70k", action: "price 50000-70000" },
        { text: "💰 $70k+", action: "price 70000+" }
      ]
    };
  }

  private handleFinanceQuery(query: string): any {
    const sampleCar = CAR_DATABASE.find(c => c.type === "luxury");

    if (query.includes("lease")) {
      return {
        text: `Lease special: ${sampleCar?.name} from $${FINANCING_OPTIONS.lease.starting}/month for ${FINANCING_OPTIONS.lease.term} months. $0 down payment available for qualified lessees. Includes ${FINANCING_OPTIONS.lease.miles.toLocaleString()} miles/year.`,
        quickReplies: [
          { text: "📱 Calculate payment", action: "lease_calculator" },
          { text: "🏁 Lease vs buy", action: "lease_vs_buy" },
          { text: "✅ Special offers", action: "lease_offers" }
        ]
      };
    }

    return {
      text: `We offer financing from ${FINANCING_OPTIONS.apr.good}% APR for qualified buyers. Terms available: ${FINANCING_OPTIONS.terms.join(", ")} months. Example: ${sampleCar?.name} with $${sampleCar?.monthlyPayment}/month at 3.9% for 60 months.`,
      quickReplies: [
        { text: "💳 Pre-qualify", action: "prequalify" },
        { text: "📊 Payment calculator", action: "payment_calc" },
        { text: "✨ 0% APR offers", action: "zero_apr" }
      ]
    };
  }

  private handleServiceQuery(query: string): any {
    const popularService = SERVICES.find(s => s.popular);

    if (query.includes("tuning")) {
      const service = SERVICES.find(s => s.id === "tuning");
      return {
        text: `${service?.name}: $${service?.price}. Includes ${service?.includes.join(", ")}. Typically completed in ${service?.duration}. 15-30% horsepower increase guaranteed.`,
        quickReplies: [
          { text: "📅 Schedule tuning", action: "book tuning" },
          { text: "📊 Dyno results", action: "dyno_results" },
          { text: "🔄 Stage 2 upgrade", action: "stage2" }
        ]
      };
    }

    if (query.includes("coating")) {
      const service = SERVICES.find(s => s.id === "coating");
      return {
        text: `${service?.name}: $${service?.price}. 5-year warranty, hydrophobic finish, and enhanced gloss. Includes full paint correction before application.`,
        quickReplies: [
          { text: "🎨 Colors available", action: "coating_colors" },
          { text: "📅 Book now", action: "book coating" },
          { text: "🛡️ Compare packages", action: "compare_protection" }
        ]
      };
    }

    return {
      text: `Popular service packages:\n🔧 ${SERVICES[0].name} - $${SERVICES[0].price}\n🛡️ ${SERVICES[1].name} - $${SERVICES[1].price}\n✨ ${SERVICES[4].name} - $${SERVICES[4].price}\n\nWhich interests you?`,
      quickReplies: SERVICES.slice(0, 3).map(s => ({
        text: `🔧 ${s.name}`,
        action: `service ${s.id}`
      }))
    };
  }

  private handleTestDriveQuery(query: string): any {
    return {
      text: `I can help you schedule a test drive! Choose your experience:\n\n🚗 30-minute standard drive\n🌟 60-minute extended experience\n🏁 90-minute performance demo\n\nAvailable today or this weekend.`,
      quickReplies: [
        { text: "📅 Today", action: "testdrive today" },
        { text: "📅 Weekend", action: "testdrive weekend" },
        { text: "🚀 Performance demo", action: "testdrive performance" },
        { text: "🏠 Home delivery", action: "testdrive home" }
      ]
    };
  }

  private handleTradeInQuery(query: string): any {
    return {
      text: `Get an instant trade-in offer in 3 steps:\n\n1. Tell me the year, make, and model\n2. Share current mileage\n3. Describe condition (Excellent, Good, Fair)\n\nWe guarantee our offer for 7 days.`,
      quickReplies: [
        { text: "🚗 Start valuation", action: "tradein_start" },
        { text: "📊 Estimate guide", action: "tradein_guide" },
        { text: "💰 Payoff calculator", action: "payoff_calc" }
      ]
    };
  }

  private handleAppointmentQuery(query: string): any {
    return {
      text: `Let's find the perfect time for your visit. Our service center is open:\n\n${Object.entries(DEALERSHIP_INFO.hours).map(([day, hours]) => `📅 ${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`).join('\n')}\n\nWhat type of appointment?`,
      quickReplies: [
        { text: "🚗 Test drive", action: "appointment testdrive" },
        { text: "🔧 Service", action: "appointment service" },
        { text: "💰 Finance", action: "appointment finance" },
        { text: "📋 Delivery", action: "appointment delivery" }
      ]
    };
  }

  private handleComparisonQuery(query: string): any {
    const models = query.includes("suv")
      ? CAR_DATABASE.filter(c => c.type === "suv").slice(0, 2)
      : CAR_DATABASE.filter(c => c.type === "performance" || c.type === "luxury").slice(0, 2);

    if (models.length >= 2) {
      return {
        text: `Comparing ${models[0].name} vs ${models[1].name}:\n\n${models[0].name}:\n• ${models[0].price.toLocaleString()}\n• ${models[0].acceleration}\n• ${models[0].features[0]}\n\n${models[1].name}:\n• ${models[1].price.toLocaleString()}\n• ${models[1].acceleration}\n• ${models[1].features[0]}\n\nWhich would you like to test drive?`,
        quickReplies: [
          { text: models[0].name, action: `testdrive ${models[0].id}` },
          { text: models[1].name, action: `testdrive ${models[1].id}` },
          { text: "📊 Detailed comparison", action: `detailed_compare ${models[0].id} ${models[1].id}` }
        ]
      };
    }

    return this.handleUnknown();
  }

  private handleWarrantyQuery(query: string): any {
    return {
      text: `All new Velocity vehicles include:\n\n🛡️ 6-year/75,000-mile basic warranty\n⚡ 8-year/100,000-mile battery warranty\n🚐 5-year/60,000-mile roadside assistance\n🔧 7-year/unlimited-mile corrosion warranty\n\nExtended warranty available up to 10 years/150,000 miles.`,
      quickReplies: [
        { text: "🛡️ Extended warranty", action: "extended_warranty" },
        { text: "🔧 Maintenance plans", action: "maintenance_plan" },
        { text: "📋 Claim process", action: "warranty_claim" }
      ]
    };
  }

  private handleInventoryQuery(query: string): any {
    const inStock = CAR_DATABASE.filter(c => c.inStock);
    const limited = inStock.slice(0, 3);

    return {
      text: `Current inventory: ${inStock.length} vehicles available.\n\nImmediate availability:\n${limited.map(c => `✅ ${c.name} - ${c.color} - $${c.price.toLocaleString()}`).join('\n')}\n\nMost can be delivered within 48 hours.`,
      quickReplies: [
        { text: "📋 All inventory", action: "view_inventory" },
        { text: "🚗 Filter by type", action: "filter_inventory" },
        { text: "💰 Special offers", action: "inventory_offers" }
      ]
    };
  }

  private handleGreeting(): any {
    const hour = new Date().getHours();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    if (hour >= 17) greeting = "Good evening";

    return {
      text: `${greeting}! 👋 I'm your Velocity AI assistant. I can help you explore vehicles, schedule test drives, get financing, or learn about our services. What brings you in today?`,
      quickReplies: [
        { text: "🚗 Explore vehicles", action: "vehicles" },
        { text: "💰 Payment calculator", action: "calculator" },
        { text: "📅 Schedule visit", action: "appointment" },
        { text: "🎁 Special offers", action: "offers" }
      ]
    };
  }

  private handleHelp(): any {
    return {
      text: `Here's how I can assist you:\n\n🚗 Vehicle Recommendations\n💰 Pricing & Financing\n🔧 Service & Maintenance\n📅 Test Drives & Appointments\n🏷️ Trade-In Valuation\n🆚 Model Comparisons\n⚡ Electric & Hybrid Info\n\nJust ask me anything about our vehicles or services!`,
      quickReplies: [
        { text: "🚗 Browse models", action: "vehicles" },
        { text: "💰 Current offers", action: "offers" },
        { text: "📞 Contact human", action: "contact_human" },
        { text: "📍 Find dealer", action: "location" }
      ]
    };
  }

  private handleReset(): any {
    this.context.userPreferences = {};
    return {
      text: "Let's start fresh! I've cleared your previous preferences. How can I help you today?",
      quickReplies: [
        { text: "🚗 Show all vehicles", action: "vehicles" },
        { text: "💰 Financing 101", action: "financing_basics" },
        { text: "✨ Best sellers", action: "bestsellers" }
      ]
    };
  }

  private handleUnknown(): any {
    const suggestions = [
      "Try asking about specific models, pricing, or schedule a test drive.",
      "I can help you compare vehicles or find financing options.",
      "Would you like to see our current inventory or special offers?",
      "I can answer questions about any of our vehicles or services."
    ];

    return {
      text: `I want to make sure I help you properly. ${suggestions[Math.floor(Math.random() * suggestions.length)]}`,
      quickReplies: [
        { text: "🚗 Popular models", action: "popular" },
        { text: "💰 Price ranges", action: "pricing" },
        { text: "✨ Special offers", action: "offers" },
        { text: "📅 Book visit", action: "appointment" }
      ]
    };
  }
}

// ============= Main Component =============
export default function EnhancedChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "👋 Welcome to Velocity AI! I'm your personal automotive assistant. I can help you discover the perfect vehicle, explore financing options, schedule test drives, and more. What would you like to explore today?",
      sender: "bot",
      timestamp: new Date(),
      quickReplies: [
        { text: "🚗 Browse vehicles", action: "vehicles" },
        { text: "💰 Payment calculator", action: "calculator" },
        { text: "🎁 Special offers", action: "offers" },
        { text: "📅 Schedule visit", action: "appointment" }
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const responseEngine = useRef(new ResponseEngine());

  // Scroll to bottom effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");

    // Add user message
    const userMsg: Message = {
      id: uuidv4(),
      text: userMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Generate bot response
    setIsTyping(true);
    try {
      const response = await responseEngine.current.generateResponse(userMessage);

      const botMsg: Message = {
        id: uuidv4(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
        attachments: response.attachments,
        quickReplies: response.quickReplies,
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorMsg: Message = {
        id: uuidv4(),
        text: "I apologize, but I'm having trouble processing your request. Could you please try again?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickReply = async (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        text: "👋 Welcome back to Velocity AI! I'm ready to help you with your automotive needs. What would you like to explore?",
        sender: "bot",
        timestamp: new Date(),
        quickReplies: [
          { text: "🚗 Browse vehicles", action: "vehicles" },
          { text: "💰 Payment calculator", action: "calculator" },
          { text: "🎁 Special offers", action: "offers" },
          { text: "📅 Schedule visit", action: "appointment" }
        ]
      },
    ]);
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg hover:shadow

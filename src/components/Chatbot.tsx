import { AnimatePresence, motion } from "framer-motion";
import {
  BadgeCheck,
  Brain,
  Gauge,
  MessageCircle,
  Package,
  Send,
  Shield,
  Sparkles,
  Users,
  Wrench,
  X,
  Zap
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
  type: "image" | "spec" | "price" | "comparison";
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
  topSpeed?: string;
  horsepower: number;
  torque: number;
  weight?: string;
  mpg?: string;
  warranty: string;
}

interface ServicePackage {
  id: string;
  name: string;
  price: number | string;
  duration: string;
  includes: string[];
  popular?: boolean;
  icon?: React.ReactNode;
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
  monthlyPayment?: number;
}

interface FinancingOption {
  term: number;
  apr: number;
  monthlyPayment: number;
  totalInterest: number;
}

// ============= Data Layer =============
const CAR_DATABASE: CarInfo[] = [
  {
    id: "vxr8",
    name: "VXR-8",
    type: "performance",
    price: 85000,
    monthlyPayment: 1250,
    features: [
      "0-60 in 3.1s",
      "650 HP",
      "Track Mode",
      "Carbon Fiber Package",
      "Launch Control",
      "Active Aerodynamics",
      "Ceramic Brakes"
    ],
    description: "Ultimate performance sports car with track capabilities and aggressive styling",
    rating: 4.8,
    inStock: true,
    color: "Racing Red",
    engine: "4.0L V8 Twin-Turbo",
    acceleration: "3.1s",
    topSpeed: "205 mph",
    horsepower: 650,
    torque: 590,
    weight: "3,450 lbs",
    warranty: "4 years / 50,000 miles"
  },
  {
    id: "phantom-gt",
    name: "Phantom GT",
    type: "performance",
    price: 95000,
    monthlyPayment: 1399,
    features: [
      "0-60 in 3.4s",
      "720 HP",
      "Adaptive Suspension",
      "Premium Sound",
      "Carbon Ceramic Brakes",
      "Rear-Wheel Steering",
      "Head-Up Display"
    ],
    description: "Balanced luxury and performance grand tourer with daily usability",
    rating: 4.9,
    inStock: true,
    color: "Midnight Blue",
    engine: "5.2L V10",
    acceleration: "3.4s",
    topSpeed: "212 mph",
    horsepower: 720,
    torque: 620,
    weight: "3,620 lbs",
    warranty: "4 years / 50,000 miles"
  },
  {
    id: "aurox-lx",
    name: "Aurox LX",
    type: "luxury",
    price: 75000,
    monthlyPayment: 1099,
    features: [
      "Executive Seats",
      "Massage Function",
      "4-Zone Climate",
      "Night Vision",
      "Air Suspension",
      "Rear Entertainment",
      "Refrigerator"
    ],
    description: "Executive luxury sedan with premium comfort and advanced safety features",
    rating: 4.7,
    inStock: true,
    color: "Obsidian Black",
    engine: "3.5L V6 Hybrid",
    acceleration: "5.2s",
    topSpeed: "155 mph",
    horsepower: 450,
    torque: 480,
    weight: "4,120 lbs",
    mpg: "28 combined",
    warranty: "6 years / 75,000 miles"
  },
  {
    id: "velar-prestige",
    name: "Velar Prestige",
    type: "luxury",
    price: 82000,
    monthlyPayment: 1199,
    features: [
      "OLED Dashboard",
      "AI Assistant",
      "Gesture Control",
      "Autonomous Driving",
      "Massage Seats",
      "Ambient Lighting",
      "Premium Audio"
    ],
    description: "Tech-focused luxury vehicle with cutting-edge features and elegant design",
    rating: 4.8,
    inStock: true,
    color: "Silver Frost",
    engine: "3.0L I6 Mild Hybrid",
    acceleration: "5.6s",
    topSpeed: "149 mph",
    horsepower: 395,
    torque: 405,
    weight: "4,350 lbs",
    mpg: "25 combined",
    warranty: "6 years / 75,000 miles"
  },
  {
    id: "titan-x",
    name: "Titan X",
    type: "suv",
    price: 68000,
    monthlyPayment: 999,
    features: [
      "7-Seater",
      "Off-Road Mode",
      "Towing Package",
      "Panoramic Roof",
      "Terrain Response",
      "Air Suspension",
      "Trailer Assist"
    ],
    description: "Performance SUV with family-friendly features and off-road capability",
    rating: 4.6,
    inStock: true,
    color: "Forest Green",
    engine: "3.0L V6 Turbo",
    acceleration: "6.1s",
    topSpeed: "143 mph",
    horsepower: 400,
    torque: 450,
    weight: "4,950 lbs",
    mpg: "21 combined",
    warranty: "5 years / 60,000 miles"
  },
  {
    id: "urban-elite",
    name: "Urban Elite",
    type: "suv",
    price: 55000,
    monthlyPayment: 799,
    features: [
      "Hybrid Engine",
      "Smart Storage",
      "Safety Suite",
      "Wireless Charging",
      "360° Camera",
      "Parking Assist",
      "Heated Seats"
    ],
    description: "Practical and stylish urban SUV with excellent fuel efficiency",
    rating: 4.5,
    inStock: true,
    color: "Urban Gray",
    engine: "2.5L Hybrid",
    acceleration: "7.2s",
    topSpeed: "124 mph",
    horsepower: 215,
    torque: 190,
    weight: "3,850 lbs",
    mpg: "38 combined",
    warranty: "5 years / 60,000 miles"
  },
  {
    id: "volt-prime",
    name: "Volt Prime",
    type: "electric",
    price: 72000,
    monthlyPayment: 1050,
    features: [
      "350-mile range",
      "15-min fast charge",
      "Autopilot",
      "Glass roof",
      "Haptic controls",
      "Frunk storage",
      "Bioweapon filter"
    ],
    description: "All-electric luxury sedan with zero emissions and instant torque",
    rating: 4.9,
    inStock: true,
    color: "Arctic White",
    engine: "Dual Motor AWD",
    range: "350 miles",
    acceleration: "3.8s",
    topSpeed: "162 mph",
    horsepower: 670,
    torque: 720,
    weight: "4,250 lbs",
    warranty: "8 years / 120,000 miles"
  },
  {
    id: "nexus-hybrid",
    name: "Nexus Hybrid",
    type: "hybrid",
    price: 48000,
    monthlyPayment: 699,
    features: [
      "50 MPG combined",
      "Solar roof",
      "Regenerative braking",
      "Eco mode",
      "Smart cruise",
      "Lane keep assist",
      "Blind spot monitor"
    ],
    description: "Efficient hybrid with innovative solar technology and modern design",
    rating: 4.7,
    inStock: true,
    color: "Eco Blue",
    engine: "1.8L Hybrid",
    range: "600+ miles total",
    acceleration: "8.1s",
    topSpeed: "115 mph",
    horsepower: 180,
    torque: 160,
    weight: "3,250 lbs",
    mpg: "50 combined",
    warranty: "6 years / 70,000 miles"
  }
];

const SERVICES: ServicePackage[] = [
  {
    id: "tuning",
    name: "Performance Tuning",
    price: 5000,
    duration: "2 days",
    includes: ["ECU remap", "Dyno testing", "Custom mapping", "Before/after comparison"],
    popular: true,
    icon: <Gauge className="w-4 h-4" />
  },
  {
    id: "coating",
    name: "Ceramic Pro Coating",
    price: 3000,
    duration: "1 day",
    includes: ["5-year warranty", "UV protection", "Hydrophobic finish", "Gloss enhancement"],
    icon: <Shield className="w-4 h-4" />
  },
  {
    id: "fleet",
    name: "Fleet Management",
    price: "Custom",
    duration: "Ongoing",
    includes: ["GPS tracking", "Maintenance scheduling", "Driver reports", "Cost optimization"],
    icon: <Users className="w-4 h-4" />
  },
  {
    id: "maintenance",
    name: "Premium Maintenance",
    price: 2000,
    duration: "Annual",
    includes: ["Oil changes", "Tire rotation", "Multi-point inspection", "Fluid checks"],
    popular: true,
    icon: <Wrench className="w-4 h-4" />
  },
  {
    id: "detailing",
    name: "Executive Detailing",
    price: 800,
    duration: "6 hours",
    includes: ["Full interior/exterior", "Paint correction", "Leather treatment", "Engine bay cleaning"],
    icon: <Sparkles className="w-4 h-4" />
  },
  {
    id: "wrap",
    name: "Vinyl Wrap",
    price: 3500,
    duration: "3 days",
    includes: ["Premium 3M vinyl", "Custom colors", "Paint protection", "Removable"],
    icon: <Package className="w-4 h-4" />
  }
];

const FINANCING_OPTIONS = {
  apr: { excellent: 2.9, good: 3.9, fair: 5.9, poor: 7.9 },
  terms: [36, 48, 60, 72, 84],
  downPayment: { min: 0, recommended: 10, ideal: 20 },
  lease: { starting: 399, term: 36, miles: 12000, residual: 55 }
};

const DEALERSHIP_INFO = {
  name: "Velocity Automotive",
  address: "123 Velocity Drive, Automotive City, CA 90210",
  phone: "+1 (555) 123-4567",
  tollfree: "1-800-VELOCITY",
  email: "concierge@velocityai.com",
  website: "www.velocityai.com",
  hours: {
    monday: "9:00 AM - 8:00 PM",
    tuesday: "9:00 AM - 8:00 PM",
    wednesday: "9:00 AM - 8:00 PM",
    thursday: "9:00 AM - 8:00 PM",
    friday: "9:00 AM - 8:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "11:00 AM - 5:00 PM"
  },
  services: ["Sales", "Service", "Parts", "Financing", "Trade-ins"]
};

// ============= NLP & Response Engine =============
class ResponseEngine {
  private context: {
    lastQuery?: string;
    userPreferences: UserPreference;
    conversationHistory: string[];
    mentionedCars: string[];
  };

  constructor() {
    this.context = {
      userPreferences: {},
      conversationHistory: [],
      mentionedCars: []
    };
  }

  private matchesIntent(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.toLowerCase().includes(keyword.toLowerCase()));
  }

  private extractBudget(text: string): number | null {
    const matches = text.match(/\$?(\d{1,3}(?:,\d{3})*|\d+)(?:\s*k)?/gi);
    if (matches) {
      const numbers = matches.map(m => parseInt(m.replace(/[$,k]/gi, '')) * (m.toLowerCase().includes('k') ? 1000 : 1));
      return numbers[0] || null;
    }
    return null;
  }

  private extractVehicleType(text: string): string | null {
    const types = ['suv', 'performance', 'luxury', 'electric', 'hybrid', 'sports', 'family'];
    for (const type of types) {
      if (text.toLowerCase().includes(type)) {
        return type;
      }
    }
    return null;
  }

  async generateResponse(message: string): Promise<{
    text: string;
    attachments?: Attachment[];
    quickReplies?: QuickReply[];
  }> {
    const lower = message.toLowerCase();
    this.context.lastQuery = lower;
    this.context.conversationHistory.push(lower);

    // Extract preferences
    const budget = this.extractBudget(message);
    if (budget) {
      this.context.userPreferences.budget = budget;
    }

    const vehicleType = this.extractVehicleType(message);
    if (vehicleType) {
      this.context.userPreferences.vehicleType = vehicleType;
    }

    // Enhanced intent detection
    if (this.matchesIntent(lower, ["electric", "ev", "tesla", "volt", "battery", "zero emission"])) {
      return this.handleElectricQuery(lower);
    }
    if (this.matchesIntent(lower, ["hybrid", "eco", "fuel", "efficient", "mpg", "gas mileage"])) {
      return this.handleHybridQuery(lower);
    }
    if (this.matchesIntent(lower, ["performance", "fast", "speed", "sport", "accelerat", "track", "race"])) {
      return this.handlePerformanceQuery(lower);
    }
    if (this.matchesIntent(lower, ["luxury", "premium", "comfort", "executive", "high-end"])) {
      return this.handleLuxuryQuery(lower);
    }
    if (this.matchesIntent(lower, ["suv", "family", "space", "kid", "cargo", "towing", "offroad"])) {
      return this.handleSuvQuery(lower);
    }
    if (this.matchesIntent(lower, ["price", "cost", "budget", "afford", "cheap", "expensive", "how much"])) {
      return this.handlePriceQuery(lower);
    }
    if (this.matchesIntent(lower, ["finance", "loan", "lease", "payment", "apr", "credit", "monthly"])) {
      return this.handleFinanceQuery(lower);
    }
    if (this.matchesIntent(lower, ["service", "maintain", "repair", "tune", "coating", "detailing", "fix"])) {
      return this.handleServiceQuery(lower);
    }
    if (this.matchesIntent(lower, ["test drive", "testdrive", "try", "drive", "test"])) {
      return this.handleTestDriveQuery(lower);
    }
    if (this.matchesIntent(lower, ["trade", "sell", "old car", "part exchange"])) {
      return this.handleTradeInQuery(lower);
    }
    if (this.matchesIntent(lower, ["appointment", "schedule", "book", "calendar", "visit"])) {
      return this.handleAppointmentQuery(lower);
    }
    if (this.matchesIntent(lower, ["compare", "vs", "versus", "difference", "better"])) {
      return this.handleComparisonQuery(lower);
    }
    if (this.matchesIntent(lower, ["warranty", "guarantee", "protect", "coverage"])) {
      return this.handleWarrantyQuery(lower);
    }
    if (this.matchesIntent(lower, ["inventory", "stock", "available", "in stock", "lot"])) {
      return this.handleInventoryQuery(lower);
    }
    if (this.matchesIntent(lower, ["feature", "spec", "technology", "tech", "option"])) {
      return this.handleFeaturesQuery(lower);
    }
    if (this.matchesIntent(lower, ["location", "dealer", "showroom", "address", "hours", "open"])) {
      return this.handleLocationQuery(lower);
    }
    if (this.matchesIntent(lower, ["contact", "phone", "email", "call", "reach", "human", "agent"])) {
      return this.handleContactQuery(lower);
    }
    if (this.matchesIntent(lower, ["hello", "hi", "hey", "greetings", "start", "begin"])) {
      return this.handleGreeting();
    }
    if (this.matchesIntent(lower, ["help", "what can you do", "capabilities", "support", "how work"])) {
      return this.handleHelp();
    }
    if (this.matchesIntent(lower, ["clear", "reset", "start over", "new chat", "restart"])) {
      return this.handleReset();
    }
    if (this.matchesIntent(lower, ["thank", "thanks", "appreciate"])) {
      return this.handleThanks();
    }

    return this.handleUnknown();
  }

  private handleElectricQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "electric");
    const car = cars[0];

    if (query.includes("range")) {
      return {
        text: `${car.name} delivers an impressive ${car.range} of range on a full charge. With 15-minute fast charging (10-80%), you can add 200 miles during a coffee break. The battery is backed by an ${car.warranty} warranty.`,
        attachments: [{
          type: "spec",
          content: {
            "Battery": "100 kWh",
            "Range": car.range,
            "Fast Charge": "15 min (10-80%)",
            "Home Charge": "8 hours (Level 2)",
            "Efficiency": "3.8 mi/kWh",
            "Warranty": car.warranty
          }
        }],
        quickReplies: [
          { text: "⚡ Charging network", action: "charging network" },
          { text: "💰 Cost per mile", action: "ev cost" },
          { text: "🏠 Home installation", action: "home charging" }
        ]
      };
    }

    if (query.includes("cost") || query.includes("save")) {
      const savings = (car.mpg ? 1500 : 2000); // Annual fuel savings estimate
      return {
        text: `Owning a ${car.name} saves approximately $${savings}/year in fuel vs. gas vehicles. With federal tax credit up to $7,500 and HOV lane access, total value is exceptional. Current special: 0.9% APR for 60 months.`,
        quickReplies: [
          { text: "💰 Calculate savings", action: "ev savings" },
          { text: "✅ Tax incentives", action: "ev incentives" },
          { text: "📊 Total cost", action: "ev tco" }
        ]
      };
    }

    return {
      text: `The ${car.name} is our flagship EV, featuring ${car.acceleration} 0-60, ${car.range} range, and ${car.horsepower} HP. It's rated ${car.rating}/5 stars. Available now in ${car.color} with ${car.features.slice(0, 3).join(", ")}.`,
      attachments: [{
        type: "spec",
        content: {
          "Acceleration": car.acceleration,
          "Range": car.range,
          "Power": `${car.horsepower} HP`,
          "Torque": `${car.torque} lb-ft`,
          "Drive": car.engine,
          "Rating": `${car.rating}/5 ⭐`
        }
      }],
      quickReplies: [
        { text: "🆚 Compare with Tesla", action: "compare volt prime model 3" },
        { text: "💰 Pricing & incentives", action: "ev pricing" },
        { text: "📅 Schedule test drive", action: "testdrive volt prime" }
      ]
    };
  }

  private handleHybridQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "hybrid");
    const car = cars[0];

    return {
      text: `The ${car.name} hybrid achieves ${car.mpg} MPG combined and has a total range of 600+ miles. The solar roof adds up to 500 miles/year of free driving. Starting at $${car.price.toLocaleString()} ($${car.monthlyPayment}/month).`,
      attachments: [{
        type: "spec",
        content: {
          "MPG": `${car.mpg} combined`,
          "Range": "600+ miles",
          "CO2": "89 g/km",
          "Solar Roof": "+500 mi/year",
          "Battery": "1.8 kWh",
          "Warranty": car.warranty
        }
      }],
      quickReplies: [
        { text: "💚 Hybrid vs EV", action: "compare hybrid electric" },
        { text: "💰 Tax credit", action: "hybrid incentives" },
        { text: "🔧 Maintenance cost", action: "hybrid maintenance" }
      ]
    };
  }

  private handlePerformanceQuery(query: string): any {
    let cars = CAR_DATABASE.filter(c => c.type === "performance");

    if (query.includes("fastest") || query.includes("quickest")) {
      cars = cars.sort((a, b) => parseFloat(a.acceleration) - parseFloat(b.acceleration));
    }

    if (query.includes("horsepower") || query.includes("hp") || query.includes("power")) {
      cars = cars.sort((a, b) => b.horsepower - a.horsepower);
    }

    const car = cars[0];

    return {
      text: `For ultimate performance, the ${car.name} delivers ${car.acceleration} 0-60 with ${car.horsepower} HP from its ${car.engine}. Features include ${car.features.slice(0, 3).join(", ")}. Rated ${car.rating}/5 by owners. Starting at $${car.price.toLocaleString()}.`,
      attachments: [{
        type: "spec",
        content: {
          "0-60": car.acceleration,
          "Top Speed": car.topSpeed,
          "HP": `${car.horsepower} @ 7,500 rpm`,
          "Torque": `${car.torque} lb-ft`,
          "Weight": car.weight,
          "Power/Weight": `${(car.horsepower / parseInt(car.weight || "3500")).toFixed(2)} hp/lb`
        }
      }],
      quickReplies: [
        { text: "🏁 Track package", action: "track package" },
        { text: "🆚 Compare models", action: "compare performance" },
        { text: "💰 Performance financing", action: "finance performance" }
      ]
    };
  }

  private handleLuxuryQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "luxury");
    const car = cars[Math.floor(Math.random() * cars.length)];

    return {
      text: `The ${car.name} redefines luxury with ${car.features.slice(0, 2).join(" and ")}. The interior features premium Nappa leather, open-pore wood trim, and a ${car.features[2]}. Priced at $${car.price.toLocaleString()} with ${car.warranty} warranty.`,
      attachments: [{
        type: "spec",
        content: {
          "Interior": "Nappa leather",
          "Sound": "1,200W 19-speaker",
          "Climate": "4-zone",
          "Seats": "Heated/ventilated/massage",
          "Display": "OLED curved 31-inch",
          "Warranty": car.warranty
        }
      }],
      quickReplies: [
        { text: "✨ Executive package", action: "executive package" },
        { text: "🎨 Custom interior", action: "custom interior" },
        { text: "🏆 Compare with German", action: "compare luxury german" }
      ]
    };
  }

  private handleSuvQuery(query: string): any {
    const cars = CAR_DATABASE.filter(c => c.type === "suv");
    const car = query.includes("off") || query.includes("trail") ? cars[0] : cars[1];

    return {
      text: `The ${car.name} SUV offers seating for 7, ${car.features[2]}, and ${car.mpg} MPG. Towing capacity up to 7,500 lbs with the available package. Safety features include ${car.features[4] || car.features[3]}. Starting at $${car.price.toLocaleString()}.`,
      attachments: [{
        type: "spec",
        content: {
          "Seating": "7 passengers",
          "Cargo": "84.5 cu ft max",
          "Towing": "7,500 lbs",
          "MPG": car.mpg,
          "Ground Clearance": "8.7 inches",
          "Warranty": car.warranty
        }
      }],
      quickReplies: [
        { text: "🧒 Family package", action: "family package" },
        { text: "⛰️ Off-road package", action: "offroad package" },
        { text: "🚗 3-row comparison", action: "compare suvs" }
      ]
    };
  }

  private handlePriceQuery(query: string): any {
    const minPrice = Math.min(...CAR_DATABASE.map(c => c.price));
    const maxPrice = Math.max(...CAR_DATABASE.map(c => c.price));

    if (query.includes("budget") || query.includes("affordable") || query.includes("cheap")) {
      const affordable = CAR_DATABASE.filter(c => c.price <= 55000).sort((a, b) => a.price - b.price);
      return {
        text: `Based on your budget, I recommend:\n\n${affordable.map(c => `• ${c.name}: $${c.price.toLocaleString()} (${c.mpg || c.range || c.acceleration})`).join('\n')}\n\nAll qualify for special financing rates.`,
        quickReplies: [
          { text: "💰 Under $40k", action: "price under 40000" },
          { text: "💰 $40k-$60k", action: "price 40000-60000" },
          { text: "💎 Best value", action: "best value" }
        ]
      };
    }

    if (query.includes("monthly") || query.includes("payment")) {
      const sample = CAR_DATABASE[3];
      return {
        text: `Monthly payments vary based on term and down payment. Example: ${sample.name} at $${sample.price.toLocaleString()}\n\n• 60 mo @ 3.9%: $${sample.monthlyPayment}/mo\n• 72 mo @ 4.9%: $${Math.round(sample.monthlyPayment * 0.9)}/mo\n• 36 mo lease: $${FINANCING_OPTIONS.lease.starting}/mo\n\nWhat's your target monthly payment?`,
        quickReplies: [
          { text: "💰 Under $500/mo", action: "payment under 500" },
          { text: "💰 $500-$800/mo", action: "payment 500-800" },
          { text: "💰 $800-$1000/mo", action: "payment 800-1000" },
          { text: "📊 Calculator", action: "payment calculator" }
        ]
      };
    }

    return {
      text: `Our vehicles range from $${minPrice.toLocaleString()} to $${maxPrice.toLocaleString()}. Current specials:\n\n• 0.9% APR for 60 months on select models\n• $1,000 bonus cash for trade-ins\n• 1.9% lease money factor\n\nWhat's your preferred price range?`,
      quickReplies: [
        { text: "💰 $30k-$50k", action: "price 30000-50000" },
        { text: "💰 $50k-$70k", action: "price 50000-70000" },
        { text: "💰 $70k-$100k", action: "price 70000-100000" },
        { text: "🎁 Special offers", action: "offers" }
      ]
    };
  }

  private handleFinanceQuery(query: string): any {
    if (query.includes("lease")) {
      return {
        text: `Lease specials starting at $${FINANCING_OPTIONS.lease.starting}/month for ${FINANCING_OPTIONS.lease.term} months with $${FINANCING_OPTIONS.lease.miles.toLocaleString()} miles/year. Current offers:\n\n• Urban Elite: $379/mo, $2,999 due at signing\n• Nexus Hybrid: $329/mo, $2,499 due at signing\n• VXR-8: $799/mo, $4,999 due at signing\n\n36-month terms available.`,
        quickReplies: [
          { text: "📱 Calculate lease", action: "lease calculator" },
          { text: "🏁 Lease vs buy", action: "lease vs buy" },
          { text: "✅ Current specials", action: "lease specials" }
        ]
      };
    }

    if (query.includes("credit") || query.includes("score")) {
      return {
        text: `We work with all credit profiles:\n\n✅ Excellent (720+): ${FINANCING_OPTIONS.apr.excellent}% APR\n✅ Good (660-719): ${FINANCING_OPTIONS.apr.good}% APR\n🟡 Fair (620-659): ${FINANCING_OPTIONS.apr.fair}% APR\n🟢 Building credit: Special programs available\n\nPre-qualification takes 2 minutes and doesn't affect your score.`,
        quickReplies: [
          { text: "💳 Pre-qualify now", action: "prequalify" },
          { text: "📈 Improve credit", action: "credit tips" },
          { text: "🎯 Special programs", action: "credit programs" }
        ]
      };
    }

    return {
      text: `Financing options available from ${FINANCING_OPTIONS.apr.excellent}% APR for qualified buyers. Terms: ${FINANCING_OPTIONS.terms.join(", ")} months. Example: $50,000 vehicle\n• 10% down: $500/mo @ 60 mo\n• 0% down: $920/mo @ 60 mo\n• 72 mo: $795/mo\n\nWould you like a personalized quote?`,
      quickReplies: [
        { text: "💳 Calculate payment", action: "payment calculator" },
        { text: "📝 Apply online", action: "apply financing" },
        { text: "✨ 0% APR offers", action: "zero apr" },
        { text: "💰 Trade-in value", action: "tradein" }
      ]
    };
  }

  private handleServiceQuery(query: string): any {
    if (query.includes("tuning") || query.includes("performance")) {
      const service = SERVICES.find(s => s.id === "tuning")!;
      return {
        text: `${service.name}: $${service.price}. Includes ${service.includes.join(", ")}. Typical gains: 50-80 HP, 60-100 lb-ft torque. 2-day turnaround with 12-month warranty. Stage 2 available with intake/exhaust.`,
        quickReplies: [
          { text: "📅 Schedule tuning", action: "book tuning" },
          { text: "📊 Dyno graphs", action: "dyno results" },
          { text: "🚀 Stage 2 upgrade", action: "stage2 tuning" }
        ]
      };
    }

    if (query.includes("coating") || query.includes("paint") || query.includes("ceramic")) {
      const service = SERVICES.find(s => s.id === "coating")!;
      return {
        text: `${service.name}: $${service.price}. Professional-grade ceramic coating with 9H hardness. Includes ${service.includes.join(", ")}. 5-year warranty against fading, peeling. Maintains 90% gloss after 5 years.`,
        quickReplies: [
          { text: "🎨 Color options", action: "coating colors" },
          { text: "📅 Book now", action: "book coating" },
          { text: "🛡️ Compare packages", action: "compare coating" }
        ]
      };
    }

    const popularServices = SERVICES.filter(s => s.popular);
    return {
      text: `Popular service packages:\n\n${SERVICES.map(s => `• ${s.name}: ${typeof s.price === 'number' ? '$' + s.price.toLocaleString() : s.price} (${s.duration})`).join('\n')}\n\nWhich service can I help you with?`,
      quickReplies: SERVICES.slice(0, 4).map(s => ({
        text: `${s.name}`,
        action: `service ${s.id}`
      }))
    };
  }

  private handleTestDriveQuery(query: string): any {
    let carSuggestion = "";
    if (this.context.userPreferences.vehicleType) {
      const cars = CAR_DATABASE.filter(c => c.type === this.context.userPreferences.vehicleType);
      if (cars.length) {
        carSuggestion = ` Based on your interest in ${this.context.userPreferences.vehicleType} vehicles, I recommend starting with the ${cars[0].name}.`;
      }
    }

    return {
      text: `I can schedule your test drive right now!${carSuggestion}\n\nAvailable experiences:\n🚗 30-min Standard: Get a feel for daily driving\n🌟 60-min Extended: Mixed roads & features demo\n🏁 90-min Performance: Track time & limits (select models)\n\nWhat time works for you?`,
      quickReplies: [
        { text: "📅 Today", action: "testdrive today" },
        { text: "📅 Tomorrow", action: "testdrive tomorrow" },
        { text: "📅 This weekend", action: "testdrive weekend" },
        { text: "🚀 Performance demo", action: "testdrive performance" },
        { text: "🏠 Home delivery", action: "testdrive home" }
      ]
    };
  }

  private handleTradeInQuery(query: string): any {
    return {
      text: `Get an instant cash offer in 3 easy steps:\n\n1️⃣ Tell me your vehicle's year, make, model\n2️⃣ Share current mileage & condition\n3️⃣ Receive guaranteed offer valid for 7 days\n\nWe beat CarMax and Carvana by an average of $1,200. Ready to start?`,
      quickReplies: [
        { text: "🚗 Start valuation", action: "tradein start" },
        { text: "📊 Value estimator", action: "tradein estimate" },
        { text: "💰 Payoff calculator", action: "payoff calculator" },
        { text: "🏆 Trade-in specials", action: "tradein specials" }
      ]
    };
  }

  private handleAppointmentQuery(query: string): any {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      text: `Let's schedule your visit! We're open:\n\n${Object.entries(DEALERSHIP_INFO.hours).map(([day, hours]) => `📅 ${day.charAt(0).toUpperCase() + day.slice(1)}: ${hours}`).join('\n')}\n\nAvailable appointment types:\n• 🚗 Sales Consultation (45 min)\n• 🔧 Service (1-3 hours)\n• 💰 Finance & Delivery (90 min)\n• 📋 Vehicle Return (30 min)`,
      quickReplies: [
        { text: "🚗 Sales", action: "appointment sales" },
        { text: "🔧 Service", action: "appointment service" },
        { text: "💰 Finance", action: "appointment finance" },
        { text: "📅 Tomorrow", action: `appointment ${tomorrow.toISOString().split('T')[0]}` }
      ]
    };
  }

  private handleComparisonQuery(query: string): any {
    let models: CarInfo[] = [];

    if (query.includes("suv")) {
      models = CAR_DATABASE.filter(c => c.type === "suv").slice(0, 2);
    } else if (query.includes("electric") || query.includes("ev")) {
      models = CAR_DATABASE.filter(c => c.type === "electric" || c.type === "hybrid").slice(0, 2);
    } else if (query.includes("performance")) {
      models = CAR_DATABASE.filter(c => c.type === "performance").slice(0, 2);
    } else if (query.includes("luxury")) {
      models = CAR_DATABASE.filter(c => c.type === "luxury").slice(0, 2);
    } else {
      models = CAR_DATABASE.slice(0, 2);
    }

    if (models.length >= 2) {
      return {
        text: `Comparison: ${models[0].name} vs ${models[1].name}\n\n` +
          `**${models[0].name}**\n` +
          `• Price: $${models[0].price.toLocaleString()}\n` +
          `• 0-60: ${models[0].acceleration}\n` +
          `• MPG/Range: ${models[0].mpg || models[0].range || 'N/A'}\n` +
          `• HP: ${models[0].horsepower}\n` +
          `• Rating: ${models[0].rating}/5\n\n` +
          `**${models[1].name}**\n` +
          `• Price: $${models[1].price.toLocaleString()}\n` +
          `• 0-60: ${models[1].acceleration}\n` +
          `• MPG/Range: ${models[1].mpg || models[1].range || 'N/A'}\n` +
          `• HP: ${models[1].horsepower}\n` +
          `• Rating: ${models[1].rating}/5\n\n` +
          `Which would you like to test drive?`,
        attachments: [{
          type: "comparison",
          content: {
            model1: models[0].name,
            model2: models[1].name,
            specs: ["Price", "0-60", "Power", "Efficiency", "Rating"]
          }
        }],
        quickReplies: [
          { text: `🚗 ${models[0].name}`, action: `testdrive ${models[0].id}` },
          { text: `🚗 ${models[1].name}`, action: `testdrive ${models[1].id}` },
          { text: "📊 Detailed comparison", action: `detailed compare ${models[0].id} ${models[1].id}` }
        ]
      };
    }

    return this.handleUnknown();
  }

  private handleFeaturesQuery(query: string): any {
    let car: CarInfo | undefined;

    if (this.context.mentionedCars.length) {
      car = CAR_DATABASE.find(c => c.id === this.context.mentionedCars[0]);
    } else {
      car = CAR_DATABASE.find(c => c.type === (this.context.userPreferences.vehicleType as any) || c.type === "luxury");
    }

    if (!car) {
      car = CAR_DATABASE[3];
    }

    return {
      text: `Key features of the ${car.name}:\n\n${car.features.map(f => `✓ ${f}`).join('\n')}\n\nHighlighted technologies:\n• ${car.engine} powertrain\n• ${car.topSpeed} top speed\n• ${car.warranty} warranty\n• ${car.rating}/5 owner satisfaction\n\nWould you like more details on any specific feature?`,
      quickReplies: [
        { text: "🔧 Performance", action: `features ${car.id} performance` },
        { text: "🛋️ Comfort", action: `features ${car.id} comfort` },
        { text: "🛡️ Safety", action: `features ${car.id} safety` },
        { text: "📱 Technology", action: `features ${car.id} tech` }
      ]
    };
  }

  private handleLocationQuery(query: string): any {
    return {
      text: `📍 **${DEALERSHIP_INFO.name}**\n${DEALERSHIP_INFO.address}\n\n` +
        `🕒 **Hours:**\n` +
        `Mon-Fri: 9:00 AM - 8:00 PM\n` +
        `Sat: 10:00 AM - 6:00 PM\n` +
        `Sun: 11:00 AM - 5:00 PM\n\n` +
        `📞 **Contact:**\n` +
        `Phone: ${DEALERSHIP_INFO.phone}\n` +
        `Toll-free: ${DEALERSHIP_INFO.tollfree}\n` +
        `Email: ${DEALERSHIP_INFO.email}\n\n` +
        `We're located off Highway 101, exit 42B. Complimentary valet parking available.`,
      quickReplies: [
        { text: "🗺️ Get directions", action: "directions" },
        { text: "📅 Schedule visit", action: "appointment" },
        { text: "🅿️ Virtual tour", action: "virtual tour" }
      ]
    };
  }

  private handleContactQuery(query: string): any {
    return {
      text: `📞 **Contact Velocity AI**\n\n` +
        `**Sales:** ${DEALERSHIP_INFO.phone} (ext. 1)\n` +
        `**Service:** ${DEALERSHIP_INFO.phone} (ext. 2)\n` +
        `**Parts:** ${DEALERSHIP_INFO.phone} (ext. 3)\n` +
        `**Finance:** ${DEALERSHIP_INFO.phone} (ext. 4)\n\n` +
        `**Email:** ${DEALERSHIP_INFO.email}\n` +
        `**Website:** ${DEALERSHIP_INFO.website}\n\n` +
        `Our concierge team is available 24/7 for emergencies.`,
      quickReplies: [
        { text: "💬 Chat with human", action: "human agent" },
        { text: "📞 Request call", action: "call request" },
        { text: "✉️ Email support", action: "email support" }
      ]
    };
  }

  private handleWarrantyQuery(query: string): any {
    return {
      text: `**Warranty Coverage Overview**\n\n` +
        `✅ **New Vehicles:** 4-6 years/50k-75k miles basic\n` +
        `✅ **Powertrain:** 6 years/70k miles\n` +
        `✅ **Electric/Hybrid Battery:** 8 years/100k miles\n` +
        `✅ **Corrosion:** 7 years/unlimited miles\n` +
        `✅ **Roadside Assistance:** 5 years/60k miles\n\n` +
        `**Extended Protection:**\n` +
        `• Gold: 7 years/100k miles - $2,500\n` +
        `• Platinum: 10 years/150k miles - $3,800\n` +
        `• EV Specific: 10 years/150k miles - $3,200`,
      quickReplies: [
        { text: "🛡️ Extended warranty", action: "extended warranty" },
        { text: "🔧 Maintenance plan", action: "maintenance plan" },
        { text: "📋 File claim", action: "warranty claim" }
      ]
    };
  }

  private handleInventoryQuery(query: string): any {
    const inStock = CAR_DATABASE.filter(c => c.inStock);
    const limited = inStock.slice(0, 4);

    return {
      text: `🚗 **Current Inventory: ${inStock.length} vehicles**\n\n` +
        `Immediate Delivery Available:\n` +
        `${limited.map(c => `✅ **${c.name}** - ${c.color} - $${c.price.toLocaleString()} - ${c.inStock ? 'In Stock' : 'Call for availability'}`).join('\n')}\n\n` +
        `Most vehicles can be delivered within 48 hours. Special financing available on in-stock units.`,
      quickReplies: [
        { text: "📋 View all", action: "view inventory" },
        { text: "🚗 Filter by type", action: "filter inventory" },
        { text: "💰 Special offers", action: "inventory offers" },
        { text: "🎁 Demo discounts", action: "demo vehicles" }
      ]
    };
  }

  private handleGreeting(): any {
    const hour = new Date().getHours();
    let greeting = "Good morning";
    if (hour >= 12 && hour < 17) greeting = "Good afternoon";
    if (hour >= 17) greeting = "Good evening";

    const hasHistory = this.context.conversationHistory.length > 1;

    if (hasHistory) {
      return {
        text: `${greeting}! Welcome back to Velocity AI! Ready to continue where we left off? I can help you with ${this.context.userPreferences.vehicleType ? `your ${this.context.userPreferences.vehicleType} search` : 'finding the perfect vehicle'}.`,
        quickReplies: [
          { text: "🚗 Continue browsing", action: "vehicles" },
          { text: "💰 Check financing", action: "financing" },
          { text: "📅 Schedule test drive", action: "testdrive" },
          { text: "✨ New arrivals", action: "new arrivals" }
        ]
      };
    }

    return {
      text: `${greeting}! 👋 I'm your Velocity AI automotive assistant. I can help you discover the perfect vehicle, explore financing, schedule test drives, and more. What brings you in today?`,
      quickReplies: [
        { text: "🚗 Browse vehicles", action: "vehicles" },
        { text: "💰 Payment calculator", action: "calculator" },
        { text: "🎁 Special offers", action: "offers" },
        { text: "📅 Schedule visit", action: "appointment" },
        { text: "⚡ Electric vehicles", action: "electric" }
      ]
    };
  }

  private handleHelp(): any {
    return {
      text: `**I can help you with:**\n\n` +
        `🚗 **Vehicles** - Browse, compare, get recommendations\n` +
        `💰 **Pricing** - MSRP, special offers, payment calculator\n` +
        `🏦 **Financing** - Rates, leases, credit options\n` +
        `🔧 **Services** - Tuning, coating, maintenance\n` +
        `📅 **Appointments** - Test drives, service, delivery\n` +
        `🔄 **Trade-ins** - Instant offers, valuation\n` +
        `📍 **Location** - Dealership info, hours, directions\n` +
        `📞 **Contact** - Phone, email, human agent\n\n` +
        `Just type your question or select an option below!`,
      quickReplies: [
        { text: "🚗 Vehicle guide", action: "vehicle guide" },
        { text: "💰 Financing 101", action: "financing basics" },
        { text: "✨ Current specials", action: "offers" },
        { text: "📞 Contact human", action: "human agent" }
      ]
    };
  }

  private handleReset(): any {
    this.context.userPreferences = {};
    this.context.mentionedCars = [];
    this.context.conversationHistory = [];

    return {
      text: "🔄 Conversation reset! I've cleared your preferences and history. Let's start fresh. How can I help you today?",
      quickReplies: [
        { text: "🚗 Show all vehicles", action: "vehicles" },
        { text: "💰 Financing options", action: "financing" },
        { text: "✨ Best sellers", action: "bestsellers" },
        { text: "🎯 Quick quiz", action: "find car quiz" }
      ]
    };
  }

  private handleThanks(): any {
    return {
      text: "You're very welcome! 😊 I'm always here to help with any automotive questions. Is there anything else you'd like to know about our vehicles, services, or special offers?",
      quickReplies: [
        { text: "👍 No, that's all", action: "goodbye" },
        { text: "🚗 More vehicles", action: "vehicles" },
        { text: "⭐ Leave review", action: "review" }
      ]
    };
  }

  private handleUnknown(): any {
    const suggestions = [
      "I can help you explore our vehicle lineup, calculate payments, or schedule a test drive.",
      "Would you like to see our current inventory or learn about special financing offers?",
      "I can answer questions about any specific model or help you find the perfect vehicle for your needs.",
      "We have great lease specials this month starting at just $329/month. Interested?",
      "I can provide detailed specifications, feature lists, and pricing for any of our vehicles."
    ];

    return {
      text: `I want to make sure I help you properly. ${suggestions[Math.floor(Math.random() * suggestions.length)]}`,
      quickReplies: [
        { text: "🚗 Popular models", action: "popular" },
        { text: "💰 Price ranges", action: "pricing" },
        { text: "✨ Special offers", action: "offers" },
        { text: "📅 Book appointment", action: "appointment" },
        { text: "🎯 Help me choose", action: "vehicle quiz" }
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
        { text: "📅 Schedule visit", action: "appointment" },
        { text: "⚡ Electric vehicles", action: "electric" }
      ]
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

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
      setUnreadCount(0);
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

  // Render attachment based on type
  const renderAttachment = (attachment: Attachment) => {
    switch (attachment.type) {
      case "spec":
        return (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700"
          >
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(attachment.content).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="text-zinc-400">{key}:</span>
                  <span className="text-white font-medium">{value as string}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Button with Unread Badge */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full text-xs flex items-center justify-center font-bold"
              >
                {unreadCount}
              </motion.span>
            )}
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-32px)] h-[600px] max-h-[calc(100vh-120px)] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg tracking-tight">MAAI GPT</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-red-100 text-xs">Online • Smart Assistant</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearChat}
                  className="text-red-100 hover:text-white text-xs px-3 py-1.5 rounded-full bg-red-700/30 hover:bg-red-700/50 transition-colors font-medium"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-red-100 hover:text-white p-1 rounded-lg hover:bg-red-700/30 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-zinc-900 to-zinc-900/95">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap break-words ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-br-none shadow-lg"
                          : "bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700 shadow-lg"
                      }`}
                    >
                      <div className="prose prose-invert prose-sm max-w-none">
                        {msg.text.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('•') ? 'ml-2' : ''}>
                            {line.startsWith('**') ? <strong>{line.replace(/\*\*/g, '')}</strong> : line}
                          </p>
                        ))}
                      </div>

                      {msg.attachments?.map((attachment, i) => (
                        <div key={i}>{renderAttachment(attachment)}</div>
                      ))}

                      <div className={`flex items-center justify-between mt-2 text-xs ${
                        msg.sender === "user" ? "text-red-200" : "text-zinc-400"
                      }`}>
                        <span>{formatTime(msg.timestamp)}</span>
                        {msg.sender === "bot" && (
                          <BadgeCheck className="w-3.5 h-3.5 ml-1" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl bg-zinc-800 text-zinc-100 rounded-bl-none border border-zinc-700 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                          <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
                            className="w-2 h-2 bg-red-500 rounded-full"
                          />
                        </div>
                        <span className="text-zinc-300 text-sm">Velocity AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Quick Replies */}
            {messages[messages.length - 1]?.quickReplies && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-sm"
              >
                <div className="flex flex-wrap gap-2">
                  {messages[messages.length - 1].quickReplies?.map((reply) => (
                    <motion.button
                      key={reply.action}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickReply(reply.action)}
                      className="px-4 py-2 text-xs font-medium rounded-full bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white transition-colors border border-zinc-700 hover:border-red-500 shadow-sm flex items-center gap-1.5"
                    >
                      {reply.icon}
                      {reply.text}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="px-4 py-4 border-t border-zinc-800 bg-zinc-900 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-full text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all pr-12"
                    disabled={isTyping}
                  />
                  {input.length > 0 && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                      Enter ↵
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[44px]"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Typing indicator */}
              <div className="flex justify-between items-center mt-2 px-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-zinc-600" />
                  <span className="text-[10px] text-zinc-600">
                    Enterprise-grade security
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-zinc-600" />
                  <span className="text-[10px] text-zinc-600">
                    Instant responses
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

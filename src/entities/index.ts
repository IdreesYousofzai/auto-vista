/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: customerstatistics
 * Interface for CustomerStatistics
 */
export interface CustomerStatistics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  demographicCategory?: string;
  /** @wixFieldType number */
  statisticValue?: number;
  /** @wixFieldType text */
  timePeriod?: string;
  /** @wixFieldType text */
  unitOfMeasurement?: string;
  /** @wixFieldType text */
  notes?: string;
}


/**
 * Collection ID: pricetrends
 * Interface for PriceTrends
 */
export interface PriceTrends {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  vehicleCategory?: string;
  /** @wixFieldType text */
  vehicleMake?: string;
  /** @wixFieldType text */
  vehicleModel?: string;
  /** @wixFieldType number */
  averagePrice?: number;
  /** @wixFieldType date */
  trendDate?: Date | string;
  /** @wixFieldType text */
  currency?: string;
  /** @wixFieldType number */
  priceChangePercentage?: number;
}


/**
 * Collection ID: reviews
 * Interface for Reviews
 */
export interface Reviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  reviewerName?: string;
  /** @wixFieldType number */
  rating?: number;
  /** @wixFieldType text */
  comment?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  reviewerPhoto?: string;
  /** @wixFieldType datetime */
  reviewDate?: Date | string;
  /** @wixFieldType text */
  reviewTitle?: string;
}


/**
 * Collection ID: servicesandproducts
 * Interface for ServicesandProducts
 */
export interface ServicesandProducts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType url */
  callToActionUrl?: string;
}


/**
 * Collection ID: teammembers
 * Interface for TeamMembers
 */
export interface TeamMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  jobTitle?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  photo?: string;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType url */
  linkedInProfile?: string;
}


/**
 * Collection ID: vehicles
 * Interface for Vehicles
 */
export interface Vehicles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  interiorImage?: string;
  /** @wixFieldType url */
  model3dUrl?: string;
  /** @wixFieldType text */
  make?: string;
  /** @wixFieldType text */
  model?: string;
  /** @wixFieldType number */
  year?: number;
  /** @wixFieldType number */
  price?: number;
  /** @wixFieldType number */
  mileage?: number;
  /** @wixFieldType text */
  engineType?: string;
  /** @wixFieldType text */
  transmission?: string;
  /** @wixFieldType text */
  exteriorColor?: string;
  /** @wixFieldType text */
  interiorColor?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  description?: string;
}

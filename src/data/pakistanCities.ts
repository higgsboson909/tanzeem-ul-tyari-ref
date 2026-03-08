export const CITY_NAMES = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Multan",
  "Faisalabad",
  "Peshawar",
  "Hyderabad",
  "Gujranwala",
  "Quetta",
  "Sargodha",
  "Sialkot",
  "Gujrat",
  "Bahawalpur",
  "Sahiwal",
  "Chakwal",
  "Mianwali",
  "Attock",
  "Jhelum",
  "Dera Ghazi Khan",
] as const;

export type CityName = (typeof CITY_NAMES)[number];

export const DEFAULT_CITY: CityName = "Lahore";

/**
 * Map display name to JSON key
 */
export function cityToKey(city: CityName): string {
  return city.toLowerCase().replace(/\s+/g, '-');
}

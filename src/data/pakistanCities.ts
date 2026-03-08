export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "Lahore": { lat: 31.5497, lng: 74.3436 },
  "Karachi": { lat: 24.8607, lng: 67.0011 },
  "Islamabad": { lat: 33.6844, lng: 73.0479 },
  "Rawalpindi": { lat: 33.5651, lng: 73.0169 },
  "Multan": { lat: 30.1575, lng: 71.5249 },
  "Faisalabad": { lat: 31.4504, lng: 73.135 },
  "Peshawar": { lat: 34.0151, lng: 71.5249 },
  "Hyderabad": { lat: 25.396, lng: 68.3578 },
  "Gujranwala": { lat: 32.1877, lng: 74.1945 },
  "Quetta": { lat: 30.1798, lng: 66.975 },
  "Sargodha": { lat: 32.0836, lng: 72.6711 },
  "Sialkot": { lat: 32.4945, lng: 74.5229 },
  "Gujrat": { lat: 32.5742, lng: 74.0789 },
  "Bahawalpur": { lat: 29.3956, lng: 71.6836 },
  "Sahiwal": { lat: 30.6682, lng: 73.1114 },
  "Chakwal": { lat: 32.9328, lng: 72.8556 },
  "Mianwali": { lat: 32.5839, lng: 71.5370 },
  "Attock": { lat: 33.7660, lng: 72.3609 },
  "Jhelum": { lat: 32.9425, lng: 73.7257 },
  "Dera Ghazi Khan": { lat: 30.0489, lng: 70.6455 },
};

export const CITY_NAMES = Object.keys(CITY_COORDS) as unknown as readonly CityName[];

export type CityName = "Lahore" | "Karachi" | "Islamabad" | "Rawalpindi" | "Multan" | "Faisalabad" | "Peshawar" | "Hyderabad" | "Gujranwala" | "Quetta" | "Sargodha" | "Sialkot" | "Gujrat" | "Bahawalpur" | "Sahiwal" | "Chakwal" | "Mianwali" | "Attock" | "Jhelum" | "Dera Ghazi Khan";

export const DEFAULT_CITY: CityName = "Lahore";

/**
 * Map display name to JSON key
 */
export function cityToKey(city: CityName): string {
  return city.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Find nearest city from coordinates
 */
export function findNearestCity(lat: number, lng: number): CityName {
  let nearest: CityName = DEFAULT_CITY;
  let minDist = Infinity;
  for (const [name, coords] of Object.entries(CITY_COORDS)) {
    const d = (coords.lat - lat) ** 2 + (coords.lng - lng) ** 2;
    if (d < minDist) {
      minDist = d;
      nearest = name as CityName;
    }
  }
  return nearest;
}

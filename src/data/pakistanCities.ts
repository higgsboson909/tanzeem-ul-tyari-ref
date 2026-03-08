export interface CityData {
  name: string;
  lat: number;
  lng: number;
  timezone: string;
}

export const PAKISTAN_CITIES: CityData[] = [
  { name: "Lahore", lat: 31.5497, lng: 74.3436, timezone: "Asia/Karachi" },
  { name: "Karachi", lat: 24.8607, lng: 67.0011, timezone: "Asia/Karachi" },
  { name: "Islamabad", lat: 33.6844, lng: 73.0479, timezone: "Asia/Karachi" },
  { name: "Rawalpindi", lat: 33.5651, lng: 73.0169, timezone: "Asia/Karachi" },
  { name: "Faisalabad", lat: 31.4504, lng: 73.1350, timezone: "Asia/Karachi" },
  { name: "Multan", lat: 30.1575, lng: 71.5249, timezone: "Asia/Karachi" },
  { name: "Peshawar", lat: 34.0151, lng: 71.5249, timezone: "Asia/Karachi" },
  { name: "Quetta", lat: 30.1798, lng: 66.9750, timezone: "Asia/Karachi" },
  { name: "Sialkot", lat: 32.4945, lng: 74.5229, timezone: "Asia/Karachi" },
  { name: "Gujranwala", lat: 32.1877, lng: 74.1945, timezone: "Asia/Karachi" },
  { name: "Hyderabad", lat: 25.3960, lng: 68.3578, timezone: "Asia/Karachi" },
  { name: "Bahawalpur", lat: 29.3544, lng: 71.6911, timezone: "Asia/Karachi" },
  { name: "Sargodha", lat: 32.0836, lng: 72.6711, timezone: "Asia/Karachi" },
  { name: "Sukkur", lat: 27.7052, lng: 68.8574, timezone: "Asia/Karachi" },
  { name: "Abbottabad", lat: 34.1463, lng: 73.2117, timezone: "Asia/Karachi" },
];

export const DEFAULT_CITY = PAKISTAN_CITIES[0]; // Lahore

/**
 * Find the nearest city given lat/lng coordinates
 */
export function findNearestCity(lat: number, lng: number): CityData {
  let nearest = PAKISTAN_CITIES[0];
  let minDist = Infinity;

  for (const city of PAKISTAN_CITIES) {
    const dist = Math.sqrt(
      Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = city;
    }
  }

  return nearest;
}

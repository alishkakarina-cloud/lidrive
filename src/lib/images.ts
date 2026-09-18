// Photos come from two places:
//  - "local:<key>" — real Lixiang photos (CC0, Wikimedia Commons) optimized by scripts/fetch-photos.mjs into /img
//  - plain ids — generic accessory shots from Unsplash (no vehicle branding), served via its resizing CDN

const LOCAL_WIDTHS = [480, 960, 1600, 2560];
const local = (key: string) => `local:${key}`;

export const PHOTO = {
  heroL9: local("heroL9"),
  heroL8: local("heroL8"),
  heroL7: local("heroL7"),
  rearMountain: local("l9Rear"),
  dashboardScreen: local("l9Cockpit"),
  interior: local("l6Interior"),
  interiorDetail: local("l8Cockpit"),
  exteriorWheel: local("l9Showroom"),
  familyHome: local("l9Street"),
  wheelDetail: local("l7Black"),
  sillGuard: local("l9Front"),
  freshener: local("l9Cockpit"),
  trunkMat: local("megaStreet"),
  charger: "1698314440355-eaf5ff14899c",
  mechanic: "1615906655593-ad0386982a0f",
  mechanicWide: "1615906655593-ad0386982a0f",
  mudMat: "1602161755661-3781cddac355",
  trunkMatAlt: "1605647381739-9bba88b1c5d1",
  cooler: "1550720295-a59523cb8872",
  organizer: "1602161755661-3781cddac355",
} as const;

export type PhotoKey = keyof typeof PHOTO;

const isLocal = (id: string) => id.startsWith("local:");

function localWidth(w: number) {
  return LOCAL_WIDTHS.find((x) => x >= w) ?? LOCAL_WIDTHS[LOCAL_WIDTHS.length - 1];
}

export function img(id: string, width: number, quality = 80): string {
  if (isLocal(id)) return `/img/${id.slice(6)}-${localWidth(width)}.webp`;
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=webp&w=${width}&q=${quality}`;
}

export function srcSet(id: string, widths: number[], quality = 80): string {
  if (isLocal(id)) {
    const used = [...new Set(widths.map(localWidth))];
    return used.map((w) => `/img/${id.slice(6)}-${w}.webp ${w}w`).join(", ");
  }
  return widths.map((w) => `${img(id, w, quality)} ${w}w`).join(", ");
}

export function fallbackJpg(id: string): string | null {
  return isLocal(id) ? `/img/${id.slice(6)}-1600.jpg` : null;
}

export const WIDTHS_HERO = [640, 960, 1280, 1920, 2560, 3200];
export const WIDTHS_CARD = [400, 600, 800, 1200];
export const WIDTHS_WIDE = [800, 1200, 1600, 2000, 2400];

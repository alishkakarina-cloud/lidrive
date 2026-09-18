// Curated high-resolution Unsplash source photos (photo IDs only).
// Helper builds responsive, format-negotiated URLs (webp via `fm=webp`) at the
// exact width requested — used for both `src` and `srcSet` so images are
// never served larger or blurrier than needed.

export const PHOTO = {
  heroL9: "1722915376935-68279beb1d43",
  heroL8: "1772918081920-86c5eef55528",
  heroL7: "1776043677039-890a33db6f23",
  interior: "1563986642669-49162177a0bc",
  exteriorWheel: "1588910628735-1be499b27ca7",
  charger: "1698314440355-eaf5ff14899c",
  dashboardScreen: "1625690180114-5530b1304127",
  mechanic: "1615906655593-ad0386982a0f",
  mechanicWide: "1615906655593-ad0386982a0f",
  rearMountain: "1778943243038-71f66d1857ca",
  familyHome: "1780418474854-362762afda7a",
  interiorDetail: "1601673632676-12f89e430aa3",
  wheelDetail: "1778938511273-289b609538bc",
  mudMat: "1602161755661-3781cddac355",
  trunkMat: "1759846882935-8d2b890af783",
  trunkMatAlt: "1605647381739-9bba88b1c5d1",
  cooler: "1550720295-a59523cb8872",
  organizer: "1602161755661-3781cddac355",
  sillGuard: "1768659064880-1f8347cdcb8d",
  freshener: "1643142314404-32a911f3ede2",
} as const;

export type PhotoKey = keyof typeof PHOTO;

export function img(id: string, width: number, quality = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&fm=webp&w=${width}&q=${quality}`;
}

export function srcSet(id: string, widths: number[], quality = 80): string {
  return widths.map((w) => `${img(id, w, quality)} ${w}w`).join(", ");
}

export const WIDTHS_HERO = [640, 960, 1280, 1920, 2560, 3200];
export const WIDTHS_CARD = [400, 600, 800, 1200];
export const WIDTHS_WIDE = [800, 1200, 1600, 2000, 2400];

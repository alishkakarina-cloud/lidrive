import { useEffect, useState } from "react";
import type { Product } from "./types";

export type PhotoSrc = { kind: "id"; id: string } | { kind: "url"; url: string };

const EXTENSIONS = ["jpg", "jpeg", "webp", "png"];
const cache = new Map<string, Promise<string[]>>();

function canLoad(url: string) {
  return new Promise<boolean>((resolve) => {
    const im = new Image();
    im.onload = () => resolve(true);
    im.onerror = () => resolve(false);
    im.src = url;
  });
}

// Looks for dir/<name>.(jpg|jpeg|webp|png) in order and stops at the first missing name.
function probe(dir: string, names: string[]) {
  const key = `${dir}|${names.join(",")}`;
  let hit = cache.get(key);
  if (!hit) {
    hit = (async () => {
      const found: string[] = [];
      for (const name of names) {
        let url: string | null = null;
        for (const ext of EXTENSIONS) {
          const candidate = `${dir}/${name}.${ext}`;
          if (await canLoad(candidate)) {
            url = candidate;
            break;
          }
        }
        if (!url) break;
        found.push(url);
      }
      return found;
    })();
    cache.set(key, hit);
  }
  return hit;
}

export function usePhotoList(product?: Product): PhotoSrc[] {
  const spec = product?.photoFiles;
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!spec) return;
    let cancelled = false;
    probe(spec.dir, spec.names).then((found) => {
      if (!cancelled) setUrls(found);
    });
    return () => {
      cancelled = true;
    };
  }, [spec?.dir, spec?.names.join(",")]);

  if (!product) return [];
  if (spec) return urls.map((url) => ({ kind: "url", url }));
  const ids = product.gallery.length ? product.gallery : product.image ? [product.image] : [];
  return ids.map((id) => ({ kind: "id", id }));
}

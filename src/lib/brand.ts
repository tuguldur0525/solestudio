import campaignRedHeels from "@/assets/campaign-red-heels.png";
import heroMain1920 from "@/assets/hero-main-1920.webp";
import heroMain1280 from "@/assets/hero-main-1280.webp";
import heroMain768 from "@/assets/hero-main-768.webp";
import heroMainFallback from "@/assets/hero-main-1920.jpg";
import campaignMirror from "@/assets/campaign-mirror.jpg";
import campaignWhite from "@/assets/campaign-white.jpg";
import storeInterior from "@/assets/store-interior.jpeg";
import flowerBurgundy from "@/assets/flower-burgundy.jpg";
import campaignBlack from "@/assets/campaign-black.jpg";
import flowerLogo from "@/assets/flower-logo.jpg";

export const brandImages = {
  campaignRedHeels: campaignRedHeels,
  heroMain: heroMain1920,
  heroMainSrcSet: `${heroMain768} 768w, ${heroMain1280} 1280w, ${heroMain1920} 1920w`,
  heroMainFallback: heroMainFallback,
  campaignMirror: campaignMirror,
  campaignWhite: campaignWhite,
  storeInterior: storeInterior,
  flowerBurgundy: flowerBurgundy,
  campaignBlack: campaignBlack,
  flowerLogo: flowerLogo,
};

export const SITE_URL = "https://sole-studio.lovable.app";

export function formatMnt(value: number | string | null | undefined) {
  const n = Number(value ?? 0);
  return `₮ ${new Intl.NumberFormat("en-US").format(Math.round(n))}`;
}

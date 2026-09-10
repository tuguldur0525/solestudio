import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
};

export type Variant = {
  id: string;
  product_id: string;
  color: string;
  size: string;
  stock_quantity: number;
};

export type ProductImage = {
  id: string;
  image_url: string;
  sort_order: number;
  color: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  category_id: string | null;
  material: string | null;
  care: string | null;
  featured: boolean;
  new_arrival: boolean;
  active: boolean;
  created_at: string;
  product_images: ProductImage[];
  product_variants: Variant[];
  categories?: { name: string; slug: string } | null;
};

const PRODUCT_SELECT =
  "*, product_images(id,image_url,sort_order,color), product_variants(id,product_id,color,size,stock_quantity), categories(name,slug)";

export function sortedImages(product: Pick<Product, "product_images">) {
  return [...(product.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order);
}

export function primaryImage(product: Pick<Product, "product_images">) {
  return sortedImages(product)[0]?.image_url ?? null;
}

export function imagesForColor(
  product: Pick<Product, "product_images">,
  color: string | null,
) {
  const all = sortedImages(product);
  if (!color) return all;
  const matched = all.filter((i) => (i.color ?? "").toLowerCase() === color.toLowerCase());
  return matched.length ? matched : all;
}

export function stockForColor(product: Pick<Product, "product_variants">, color: string) {
  return (product.product_variants ?? [])
    .filter((v) => v.color === color)
    .reduce((s, v) => s + v.stock_quantity, 0);
}

export function colorsOf(product: Pick<Product, "product_variants">) {
  return Array.from(new Set((product.product_variants ?? []).map((v) => v.color)));
}

export function sizesOf(product: Pick<Product, "product_variants">) {
  return Array.from(new Set((product.product_variants ?? []).map((v) => v.size))).sort();
}

export function effectivePrice(product: Pick<Product, "price" | "sale_price">) {
  return Number(product.sale_price ?? product.price);
}

export const categoriesQuery = queryOptions({
  queryKey: ["categories"],
  queryFn: async (): Promise<Category[]> => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as Category[];
  },
});

export const productsQuery = (filters?: { categorySlug?: string; newOnly?: boolean }) =>
  queryOptions({
    queryKey: ["products", filters ?? {}],
    queryFn: async (): Promise<Product[]> => {
      let q = supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("active", true)
        .order("created_at", { ascending: false });
      if (filters?.newOnly) q = q.eq("new_arrival", true);
      const { data, error } = await q;
      if (error) throw error;
      let rows = (data ?? []) as unknown as Product[];
      if (filters?.categorySlug) {
        rows = rows.filter((p) => p.categories?.slug === filters.categorySlug);
      }
      return rows;
    },
  });

export const productQuery = (slug: string) =>
  queryOptions({
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as unknown as Product) ?? null;
    },
  });

export const adminProductsQuery = queryOptions({
  queryKey: ["admin", "products"],
  queryFn: async (): Promise<Product[]> => {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as unknown as Product[];
  },
});

export type ProductViewCount = {
  product_id: string;
  view_count: number;
  last_viewed: string;
};

export type TopViewedProduct = {
  product_id: string;
  view_count: number;
  last_viewed: string;
  name: string;
  slug: string;
  price: number;
  sale_price: number | null;
  image_url: string | null;
};

function getAnonId(): string {
  const key = "ss-anon-id";
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

export async function trackProductView(productId: string) {
  try {
    const anon_id = getAnonId();
    // dedup per session: only count once per 30 min per product per browser session
    const dedupKey = `ss-view-${productId}`;
    const last = sessionStorage.getItem(dedupKey);
    const now = Date.now();
    if (last && now - Number(last) < 30 * 60 * 1000) return;
    sessionStorage.setItem(dedupKey, String(now));

    const { data: auth } = await supabase.auth.getUser();
    const user_id = auth.user?.id ?? null;

    const { error } = await supabase.from("product_views").insert({
      product_id: productId,
      anon_id,
      user_id,
    });
    if (error) {
      // table may not exist yet in dev before migration applied — fail silently
      console.debug("trackProductView failed", error.message);
    }
  } catch (e) {
    console.debug("trackProductView error", e);
  }
}

export const productViewCountsQuery = queryOptions({
  queryKey: ["admin", "product_view_counts"],
  queryFn: async (): Promise<ProductViewCount[]> => {
    const { data, error } = await supabase.from("product_view_counts").select("*");
    if (error) throw error;
    return (data ?? []) as ProductViewCount[];
  },
});

export type ViewRange = "1-day" | "week" | "month" | "all-time";

export function viewRangeToSince(range: ViewRange): string | null {
  if (range === "all-time") return null;
  const days = range === "1-day" ? 1 : range === "week" ? 7 : 30;
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (days - 1));
  return d.toISOString();
}

export const topViewedProductsQuery = (limit = 10, range: ViewRange = "all-time") =>
  queryOptions({
    queryKey: ["admin", "top_viewed", limit, range],
    queryFn: async (): Promise<TopViewedProduct[]> => {
      const since = viewRangeToSince(range);
      // Try period-aware RPC; fallback to legacy 1-arg RPC or client aggregation if migration not yet applied
      if (since !== null) {
        const { data, error } = await supabase.rpc("get_top_viewed_products", {
          limit_count: limit,
          since,
        } as unknown as { limit_count: number; since: string });
        if (!error) return (data ?? []) as TopViewedProduct[];
        // fallback for DB without period support (42883)
        console.debug("get_top_viewed_products(since) failed, falling back", error.message);
      }
      const { data: legacyData, error: legacyError } = await supabase.rpc("get_top_viewed_products", {
        limit_count: limit,
      } as unknown as { limit_count: number });
      if (!legacyError) {
        // client-side period filter if needed for legacy DB
        if (since === null || !legacyData) return (legacyData ?? []) as TopViewedProduct[];
        const sinceMs = new Date(since).getTime();
        return ((legacyData as TopViewedProduct[]) ?? []).filter((r) => new Date(r.last_viewed).getTime() >= sinceMs);
      }
      // final fallback: aggregate directly from product_views (admin can read)
      const { data: views, error: viewsError } = await supabase
        .from("product_views")
        .select("product_id, viewed_at");
      if (viewsError) throw legacyError ?? viewsError;
      const filtered = since ? (views as { product_id: string; viewed_at: string }[]).filter((v) => new Date(v.viewed_at).getTime() >= new Date(since).getTime()) : (views as { product_id: string; viewed_at: string }[]);
      const counts = new Map<string, { count: number; last: string }>();
      for (const v of filtered) {
        const c = counts.get(v.product_id);
        if (!c) counts.set(v.product_id, { count: 1, last: v.viewed_at });
        else {
          c.count += 1;
          if (new Date(v.viewed_at) > new Date(c.last)) c.last = v.viewed_at;
        }
      }
      const sorted = Array.from(counts.entries())
        .sort((a, b) => b[1].count - a[1].count || new Date(b[1].last).getTime() - new Date(a[1].last).getTime())
        .slice(0, limit);
      if (sorted.length === 0) return [];
      const { data: prods } = await supabase
        .from("products")
        .select("id,name,slug,price,sale_price, product_images(image_url,sort_order)")
        .in("id", sorted.map(([id]) => id));
      const prodMap = new Map((prods as unknown as { id: string; name: string; slug: string; price: number; sale_price: number | null; product_images: { image_url: string; sort_order: number }[] }[] ?? []).map((p) => [p.id, p]));
      return sorted.map(([pid, { count, last }]) => {
        const p = prodMap.get(pid);
        const img = p?.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.image_url ?? null;
        return {
          product_id: pid,
          view_count: count,
          last_viewed: last,
          name: p?.name ?? "Unknown",
          slug: p?.slug ?? "",
          price: p?.price ?? 0,
          sale_price: p?.sale_price ?? null,
          image_url: img,
        };
      });
    },
  });

export type Order = {
  id: string;
  customer_name: string;
  phone: string;
  email: string | null;
  address: string;
  district: string | null;
  notes: string | null;
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: string;
  created_at: string;
  order_items: {
    id: string;
    product_name: string;
    image_url: string | null;
    size: string | null;
    color: string | null;
    quantity: number;
    price: number;
  }[];
};

export const ordersQuery = queryOptions({
  queryKey: ["admin", "orders"],
  queryFn: async (): Promise<Order[]> => {
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as unknown as Order[];
  },
});

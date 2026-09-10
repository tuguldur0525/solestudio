-- Product view tracking for analytics: which product is seen most
CREATE TABLE public.product_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  viewed_at timestamptz NOT NULL DEFAULT now(),
  anon_id text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

CREATE INDEX idx_product_views_product_id ON public.product_views(product_id);
CREATE INDEX idx_product_views_viewed_at ON public.product_views(viewed_at DESC);
CREATE INDEX idx_product_views_product_viewed_at ON public.product_views(product_id, viewed_at DESC);

ALTER TABLE public.product_views ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can record a view
CREATE POLICY "product_views anon insert"
  ON public.product_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can read raw views (analytics)
CREATE POLICY "product_views admin read"
  ON public.product_views FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

GRANT INSERT ON public.product_views TO anon, authenticated;
GRANT SELECT ON public.product_views TO authenticated;
GRANT ALL ON public.product_views TO service_role;

-- Aggregated view for admin dashboard: product_id -> total views
CREATE OR REPLACE VIEW public.product_view_counts AS
  SELECT product_id, COUNT(*)::bigint AS view_count, MAX(viewed_at) AS last_viewed
  FROM public.product_views
  GROUP BY product_id;

GRANT SELECT ON public.product_view_counts TO authenticated, service_role;

-- Helper RPC: get top viewed products with product details, for admin analytics
CREATE OR REPLACE FUNCTION public.get_top_viewed_products(limit_count int DEFAULT 10)
RETURNS TABLE (
  product_id uuid,
  view_count bigint,
  last_viewed timestamptz,
  name text,
  slug text,
  price numeric,
  sale_price numeric,
  image_url text
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    pvc.product_id,
    pvc.view_count,
    pvc.last_viewed,
    p.name,
    p.slug,
    p.price,
    p.sale_price,
    (SELECT pi.image_url FROM public.product_images pi WHERE pi.product_id = p.id ORDER BY pi.sort_order ASC LIMIT 1) AS image_url
  FROM public.product_view_counts pvc
  JOIN public.products p ON p.id = pvc.product_id
  ORDER BY pvc.view_count DESC, pvc.last_viewed DESC
  LIMIT limit_count;
$$;

GRANT EXECUTE ON FUNCTION public.get_top_viewed_products(int) TO authenticated, service_role;

-- Add period filter to view analytics
DROP FUNCTION IF EXISTS public.get_top_viewed_products(int);

CREATE OR REPLACE FUNCTION public.get_top_viewed_products(limit_count int DEFAULT 10, since timestamptz DEFAULT NULL)
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
  FROM (
    SELECT product_id, COUNT(*)::bigint AS view_count, MAX(viewed_at) AS last_viewed
    FROM public.product_views
    WHERE (since IS NULL OR viewed_at >= since)
    GROUP BY product_id
  ) pvc
  JOIN public.products p ON p.id = pvc.product_id
  ORDER BY pvc.view_count DESC, pvc.last_viewed DESC
  LIMIT limit_count;
$$;

GRANT EXECUTE ON FUNCTION public.get_top_viewed_products(int, timestamptz) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_top_viewed_products(int) TO authenticated, service_role;

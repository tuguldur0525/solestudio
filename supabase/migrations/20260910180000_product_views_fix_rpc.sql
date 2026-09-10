-- Fix RPC compatibility: ensure both 1-arg and 2-arg signatures exist for PostgREST

-- Keep the 2-arg version (already created in 20260910170000); ensure 1-arg wrapper exists
CREATE OR REPLACE FUNCTION public.get_top_viewed_products(limit_count int)
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
  SELECT * FROM public.get_top_viewed_products(limit_count, NULL);
$$;

GRANT EXECUTE ON FUNCTION public.get_top_viewed_products(int) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_top_viewed_products(int, timestamptz) TO authenticated, service_role;

UPDATE public.categories
SET name = 'Loafers', slug = 'loafers'
WHERE slug = 'heels';

UPDATE public.categories
SET name = 'Derbies', slug = 'derbies'
WHERE slug = 'pumps';

UPDATE public.categories
SET name = 'Boots', slug = 'boots'
WHERE slug = 'boots';

UPDATE public.categories
SET name = 'Oxfords', slug = 'oxfords'
WHERE slug = 'flats';

UPDATE public.categories
SET name = 'Sandals', slug = 'sandals'
WHERE slug = 'sandals';

INSERT INTO public.categories (name, slug, image_url, sort_order)
VALUES (
  'Sneakers',
  'sneakers',
  '/__l5e/assets-v1/bb7ed85f-29c9-4769-a0b7-925f71000df3/p-nude-flat.jpg',
  6
)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    image_url = EXCLUDED.image_url,
    sort_order = EXCLUDED.sort_order;

UPDATE public.products
SET name = 'Vinci Heritage Loafer',
    slug = 'vinci-heritage-loafer',
    description = 'A refined penny loafer with a structured apron toe and a soft leather footbed for everyday city wear.',
    category_id = (SELECT id FROM public.categories WHERE slug = 'loafers'),
    material = 'Full-grain calf leather, leather lining',
    care = 'Brush dust away after wear and condition the leather seasonally.',
    price = 289000,
    sale_price = NULL
WHERE slug = 'vinci-classic-pump';

UPDATE public.products
SET name = 'Vinci Black Derby',
    slug = 'vinci-black-derby',
    description = 'A clean open-lace derby with a broad toe and durable sole, built for long workdays and late evenings.',
    category_id = (SELECT id FROM public.categories WHERE slug = 'derbies'),
    material = 'Polished full-grain leather, leather lining',
    care = 'Wipe with a soft cloth, then polish lightly to restore the finish.',
    price = 329000,
    sale_price = 299000
WHERE slug = 'vinci-rouge-stiletto';

UPDATE public.products
SET name = 'Vinci City Chukka',
    slug = 'vinci-city-chukka',
    description = 'A streamlined ankle boot with a cushioned collar and grounded profile for daily winter rotation.',
    category_id = (SELECT id FROM public.categories WHERE slug = 'boots'),
    material = 'Water-resistant suede, leather lining, rubber sole',
    care = 'Brush suede gently and protect it with a suitable water-repellent spray.',
    price = 269000,
    sale_price = NULL
WHERE slug = 'vinci-slingback-75';

UPDATE public.products
SET name = 'Vinci Cap-Toe Boot',
    slug = 'vinci-cap-toe-boot',
    description = 'A dependable cap-toe boot with a storm welt and traction sole, made for cold streets and hard miles.',
    category_id = (SELECT id FROM public.categories WHERE slug = 'boots'),
    material = 'Full-grain box calf leather, wool lining',
    care = 'Keep upright between wears and condition the leather before winter.',
    price = 529000,
    sale_price = NULL
WHERE slug = 'vinci-knee-boot';

UPDATE public.products
SET name = 'Vinci Plain-Toe Oxford',
    slug = 'vinci-plain-toe-oxford',
    description = 'A quiet plain-toe Oxford with a precise last and flexible sole for formal days and smart daily wear.',
    category_id = (SELECT id FROM public.categories WHERE slug = 'oxfords'),
    material = 'Soft full-grain leather, leather lining',
    care = 'Use a horsehair brush after wear and condition leather every few months.',
    price = 199000,
    sale_price = 169000
WHERE slug = 'vinci-point-flat';

UPDATE public.products
SET name = 'Vinci Court Sneaker',
    slug = 'vinci-court-sneaker',
    description = 'A low-profile leather sneaker with a clean cupsole and enough structure to dress up or down.',
    category_id = (SELECT id FROM public.categories WHERE slug = 'sneakers'),
    material = 'Smooth calf leather, cotton lining, rubber cupsole',
    care = 'Clean with a damp cloth and allow the pair to dry naturally away from heat.',
    price = 249000,
    sale_price = NULL
WHERE slug = 'vinci-strap-sandal';

DELETE FROM public.product_variants
WHERE product_id IN (
  SELECT id
  FROM public.products
  WHERE slug IN (
    'vinci-heritage-loafer',
    'vinci-black-derby',
    'vinci-city-chukka',
    'vinci-cap-toe-boot',
    'vinci-plain-toe-oxford',
    'vinci-court-sneaker'
  )
);

INSERT INTO public.product_variants (product_id, color, size, stock_quantity)
SELECT p.id, c.color, s.size, (3 + (random() * 8)::int)
FROM public.products p
CROSS JOIN (VALUES ('Black'), ('Brown'), ('White')) AS c(color)
CROSS JOIN (VALUES ('39'), ('40'), ('41'), ('42'), ('43'), ('44'), ('45')) AS s(size)
WHERE p.slug IN (
  'vinci-heritage-loafer',
  'vinci-black-derby',
  'vinci-city-chukka',
  'vinci-cap-toe-boot',
  'vinci-plain-toe-oxford',
  'vinci-court-sneaker'
);
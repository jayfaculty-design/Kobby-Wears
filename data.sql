--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, description, img_url, available, category, color, featured) FROM stdin;
9	Winthrop Uni Eagle Hoodie Maroon	95	Stay warm and cozy in this Philadelphia Bad Boy Kelly Maroon Hoodie, perfect for any football fan.	https://i.postimg.cc/ZKCmHjDC/WIN-1021-18500-Maroon-1.jpg	t	Hoodies	Maroon	t
8	Eagles White Hoodie	95	Stay warm and cozy in this Philadelphia Eagles Kelly White Hoodie, perfect for any football fan.	https://i.postimg.cc/1zxyf6B4/white-eagles.avif	f	Hoodies	White	t
19	Styliish Designer Pink Cap	30	Great Quality Comfortable Caps and Hats Fashion Fitted Cap Embroidery Logo Snapback Hat	https://i.postimg.cc/DzSN9yXh/p-cap.avif	t	Caps	Pink	f
12	Denim blue Jeans	120	Vintage baggy blue washed wide leg faded skater denim jeans 2000s	https://i.postimg.cc/tJXnqbBY/blue-jeans.webp	t	Jeans	Blue	f
6	Wawa T-Shirt Green	55	The classic fit and crew neckline offer comfort and versatility, suitable for various occasions.	https://i.postimg.cc/PfvhwFG5/wawa-green-tshirt.webp	t	Shirts	Green	f
13	Wawa T-Shirt Black	55	The unisex heavy cotton tee is the basic staple of any wardrobe. It is the foundation upon which casual fashion grows. All it needs is a personalized design to elevate things to profitability. The specially spun fibers provide a smooth surface for premium printing vividity and sharpness. No side seams mean there are no itchy interruptions under the arms. The shoulders have tape for improved durability.	https://i.postimg.cc/tCgc6snt/il-794x-N-6694439211-mqlz.jpg	t	Shirts	Black	f
5	Wawa Goldbergs Red	55	The classic fit and crew neckline offer comfort and versatility, suitable for various occasions.	https://i.postimg.cc/25jGsJdd/s-l1600.webp	t	Shirts	Red	t
14	Bad Boy Hoodie - Red	90	Vintage Y2K Bad Boy Hoodie/Size L/Red Colour/Streetwear/Pullover/Embroidered Logo/Long Sleeve	https://i.postimg.cc/Z5c3Jb49/il-794x-N-4368979556-ct9k.jpg	t	Hoodies	Red	f
15	Bad Boy Hoodie - White	90	Vintage Y2K Bad Boy Hoodie/Size L/White Colour/Streetwear/Pullover/Embroidered Logo/Long Sleeve	https://i.postimg.cc/k52xwrPB/hoodie-bad-boy-5206-full.jpg	t	Hoodies	White	f
1	Bad Boy Hoodie - LightBlue	90	Introducing the Bad Boy Hoodie, the ultimate statement piece for the rebels and rule breakers out there!\nThis classic hoodie is designed for those who dare to stand out from the crowd. Made with high-quality, preshrunk fleece knit, it offers unbeatable comfort and durability. No more worrying about annoying pilling! The special air jet yarn gives it a softer feel that you will not find in your average hoodie.\n	https://i.postimg.cc/DZ84n1w0/hoodie-bad-boy-95517-full.jpg	t	Hoodies	Light Blue	t
16	Freak Off - Bad Boy For Life	60	Freak Off Tee, Diddy, P Diddy, Sean Combs, Hip Hop, Court, Trial, Love, Rapper, Producer, Bad Boy Records, Cassie, Puff, Puffy, Hip Hop	https://i.postimg.cc/rsTTQL3T/il-fullxfull-6294015680-24nk.jpg	t	Shirts	Black	f
17	Essentials - Pink	150	Designed for the modern woman who values both comfort and fashion, our Pink Essentials Fleece Hoodie is a versatile must-have. Hug the perfect blend of style and comfort with our replica hoodie. This hoodie is more than just a garment; it’s a statement of relaxed sophistication.	https://i.postimg.cc/k41NynB6/Pink-Essentials-Hoodie.webp	t	Hoodies	Pink	t
20	NYC Men Cammo Green	170	These preloved TRIPP NYC pants are a trendy camo green cargo style with a relaxed fit, size 34 x 32. They are in good used condition with no major defects. However, please note that they do show signs of wear.	https://i.postimg.cc/brVCC7wr/cam.webp	t	Jeans	Green	f
21	King Von Vintage T	60	The unisex soft-style t-shirt puts a new spin on casual comfort. Made from very soft materials, this tee is 100% cotton for solid colors. Heather colors and sports grey include polyester. The shoulders have twill tape for improved durability. There are no side seams. The collar is made with ribbed knitting to prevent curling damage.	https://i.postimg.cc/762S8j9b/musician.webp	t	Shirts	Black	f
2	Denim black Jeans	120	vintage baggy black washed wide leg faded skater denim jeans 2000s	https://i.postimg.cc/sDQF7xvW/denim.jpg	t	Jeans	Black	t
10	Eagles Dark Heather	90	Stay warm and cozy in this Philadelphia Eagles Kelly Dark Hoodie, perfect for any football fan.	https://i.postimg.cc/2S92wFM8/56501308-1.jpg	t	Hoodies	Dark Heather	t
4	Black Lives Matter Cap	30	Stay warm and cozy in this Philadelphia Eagles Kelly Green Hoodie, perfect for any football fan.	https://i.postimg.cc/59G4ZZzw/blm.avif	t	Caps	Navy	t
11	Stylish Designer Cap	30	Simple and perfect cap for any outfit. It gives you a true healthy fashion sense	https://i.postimg.cc/h4bF06rD/apl.avif	t	Caps	White	f
3	Eagles Forest Green Hoodie	150	Stay warm and cozy in this Philadelphia Eagles Kelly Green Hoodie, perfect for any football fan.	https://i.postimg.cc/HxY01rfP/eagl.webp	t	Hoodies	Forest Green	f
7	Missions Denim Jeans Black	110	The classic fit and crew neckline offer comfort and versatility, suitable for various occasions.	https://i.postimg.cc/8kF4p67q/nice-jeans.webp	t	Jeans	Black	f
18	Fashionable Red White Cap	30	3D Embroidery Golf Baseball Sport Cap Contrast Color 5Panel Structured a Frame Baseball Hat Two Tone Cotton Snapback Outdoor Hat	https://i.postimg.cc/xj7sMRrf/capp.avif	t	Caps	Pink	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password) FROM stdin;
1	godfred	$2a$10$E/VeS/6YhMqFZ9qczrFki.xJeUQzVTu8Trqns2lpfgYF773ecbbsu
2	jude	$2a$10$hoC5.P2oShsWEogim7oyYe6454WPjiCHKopQhOzSye2TKMGpKsF9G
3	jayfaculty1	$2a$10$K/wqtOZ4.571f33NjIqz1OUeSteK5O7QZHiBCKCrAtRYCENARlOoy
4	godfred1	$2a$10$0bqpXw14.YJKthFm6gi3YeZLFSitJtDDbE1AE4VRpOKYb3CnVr2vW
\.


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 21, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- PostgreSQL database dump complete
--


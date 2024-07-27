PGDMP  )                    |            taxi_all_drive    16.3 (Debian 16.3-1.pgdg120+1)    16.0 B    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16384    taxi_all_drive    DATABASE     y   CREATE DATABASE taxi_all_drive WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';
    DROP DATABASE taxi_all_drive;
                postgres    false            �            1259    16399    dispatchers    TABLE     �  CREATE TABLE public.dispatchers (
    id integer NOT NULL,
    user_id integer NOT NULL,
    lastname character varying(100) NOT NULL,
    firstname character varying(100) NOT NULL,
    surename character varying(100) DEFAULT 'Отсуствует'::character varying NOT NULL,
    "position" character varying(255) NOT NULL,
    phone character varying(20) DEFAULT 'Отсуствует'::character varying,
    email character varying(255) DEFAULT 'Отсуствует'::character varying,
    address character varying(255) DEFAULT 'Отсуствует'::character varying,
    comment character varying(255) DEFAULT 'Отсуствует'::character varying
);
    DROP TABLE public.dispatchers;
       public         heap    postgres    false            �            1259    16459    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    login_time character varying(50),
    is_active boolean DEFAULT true
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    24584    accounts_view    VIEW     �   CREATE VIEW public.accounts_view AS
 SELECT u.id,
    d.lastname,
    d.firstname,
    d.surename,
    d.phone,
    d.email,
    u.username,
    u.password
   FROM (public.dispatchers d
     JOIN public.users u ON ((u.id = d.user_id)));
     DROP VIEW public.accounts_view;
       public          postgres    false    218    218    218    229    229    229    218    218    218            �            1259    16385    clients    TABLE     %  CREATE TABLE public.clients (
    id integer NOT NULL,
    lastname character varying(100) NOT NULL,
    firstname character varying(100) NOT NULL,
    surename character varying(100) DEFAULT 'Отсуствует'::character varying NOT NULL,
    phone character varying(20) NOT NULL,
    preferences character varying(255) DEFAULT 'Отсуствует'::character varying,
    status character varying(255) DEFAULT 'Отсуствует'::character varying,
    comment character varying(255) DEFAULT 'Отсуствует'::character varying
);
    DROP TABLE public.clients;
       public         heap    postgres    false            �            1259    16394    clients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.clients_id_seq;
       public          postgres    false    215            �           0    0    clients_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;
          public          postgres    false    216            �            1259    16395    clients_view    VIEW     �   CREATE VIEW public.clients_view AS
 SELECT id,
    concat(lastname, ' ', firstname, ' ', surename) AS fullname,
    status,
    phone,
    comment
   FROM public.clients c;
    DROP VIEW public.clients_view;
       public          postgres    false    215    215    215    215    215    215    215            �            1259    16409    dispatchers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dispatchers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dispatchers_id_seq;
       public          postgres    false    218            �           0    0    dispatchers_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dispatchers_id_seq OWNED BY public.dispatchers.id;
          public          postgres    false    219            �            1259    24588    dispatchers_view    VIEW     #  CREATE VIEW public.dispatchers_view AS
 SELECT d.id,
    d.user_id,
    concat(d.lastname, ' ', d.firstname, ' ', d.surename) AS fullname,
    d.phone,
    d.email,
    d.address,
    d.comment,
    u.username
   FROM (public.dispatchers d
     JOIN public.users u ON ((u.id = d.user_id)));
 #   DROP VIEW public.dispatchers_view;
       public          postgres    false    218    218    218    218    218    218    218    229    229    218    218            �            1259    16410    drivers    TABLE     =  CREATE TABLE public.drivers (
    id integer NOT NULL,
    lastname character varying(100) NOT NULL,
    firstname character varying(100) NOT NULL,
    surename character varying(100) DEFAULT 'Отсуствует'::character varying NOT NULL,
    phone character varying(20) DEFAULT 'Отсуствует'::character varying,
    address character varying(255) DEFAULT 'Отсуствует'::character varying,
    driver_licence character varying(255) NOT NULL,
    driver_licence_category character varying(20) NOT NULL,
    drive_experience character varying(99) NOT NULL,
    vehicle_id integer NOT NULL,
    birthday character varying(15) NOT NULL,
    status character varying(255) DEFAULT 'Отсуствует'::character varying,
    comment character varying(255) DEFAULT 'Отсуствует'::character varying
);
    DROP TABLE public.drivers;
       public         heap    postgres    false            �            1259    16420    drivers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.drivers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.drivers_id_seq;
       public          postgres    false    220            �           0    0    drivers_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.drivers_id_seq OWNED BY public.drivers.id;
          public          postgres    false    221            �            1259    16421    vehicles    TABLE     �  CREATE TABLE public.vehicles (
    id integer NOT NULL,
    model character varying(255) NOT NULL,
    color character varying(100) NOT NULL,
    tech_condition character varying(100) DEFAULT 'Отсуствует'::character varying NOT NULL,
    fuel_type character varying(50) NOT NULL,
    licence_plate character varying(255) DEFAULT 'Отсуствует'::character varying,
    comment character varying(255) DEFAULT 'Отсуствует'::character varying
);
    DROP TABLE public.vehicles;
       public         heap    postgres    false            �            1259    16429    drivers_view    VIEW     �  CREATE VIEW public.drivers_view AS
 SELECT d.id,
    concat(d.lastname, ' ', d.firstname, ' ', d.surename) AS fullname,
    concat(v.model, ' ', v.licence_plate) AS veichel,
    d.phone,
    d.address,
    d.driver_licence,
    d.driver_licence_category,
    d.drive_experience,
    d.birthday,
    d.status,
    d.comment
   FROM (public.drivers d
     JOIN public.vehicles v ON ((v.id = d.vehicle_id)));
    DROP VIEW public.drivers_view;
       public          postgres    false    220    222    220    220    220    220    220    220    220    222    220    220    220    220    222    220            �            1259    16434    orders    TABLE     �  CREATE TABLE public.orders (
    id integer NOT NULL,
    driver_id integer NOT NULL,
    client_id integer NOT NULL,
    order_time character varying(25) NOT NULL,
    destination_address character varying(100) NOT NULL,
    pickup_address character varying(100) NOT NULL,
    status character varying(50) DEFAULT 'Отсуствует'::character varying,
    price integer DEFAULT 0 NOT NULL,
    pay_method character varying(10) DEFAULT 'Наличные'::character varying,
    ride_time character varying(25) DEFAULT 'Отсуствует'::character varying,
    end_time character varying(25) DEFAULT 'Отсуствует'::character varying
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16442    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    224            �           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    225            �            1259    16443    orders_view    VIEW     s  CREATE VIEW public.orders_view AS
 SELECT o.id,
    d.fullname AS driver,
    d.veichel,
    c.fullname AS client,
    o.order_time,
    o.destination_address,
    o.pickup_address,
    o.status,
    o.price,
    o.pay_method
   FROM ((public.orders o
     JOIN public.drivers_view d ON ((d.id = o.driver_id)))
     JOIN public.clients_view c ON ((c.id = o.client_id)));
    DROP VIEW public.orders_view;
       public          postgres    false    224    224    224    224    224    223    223    223    217    217    224    224    224    224            �            1259    16448 	   schedules    TABLE       CREATE TABLE public.schedules (
    id integer NOT NULL,
    driver_id integer NOT NULL,
    shift_date character varying(50) DEFAULT 'Отсуствует'::character varying NOT NULL,
    shift_start_time character varying(100) DEFAULT 'Отсуствует'::character varying NOT NULL,
    shift_end_time character varying(100) DEFAULT 'Отсуствует'::character varying NOT NULL,
    completed_orders integer DEFAULT 0 NOT NULL,
    comment character varying(255) DEFAULT 'Отсуствует'::character varying
);
    DROP TABLE public.schedules;
       public         heap    postgres    false            �            1259    16458    schedules_id_seq    SEQUENCE     �   CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.schedules_id_seq;
       public          postgres    false    227            �           0    0    schedules_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedules.id;
          public          postgres    false    228            �            1259    16465    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    229            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    230            �            1259    16466    vehicles_view    VIEW     �   CREATE VIEW public.vehicles_view AS
 SELECT id,
    concat(model, ' ', licence_plate) AS veichel,
    model,
    color,
    tech_condition,
    fuel_type,
    licence_plate,
    comment
   FROM public.vehicles v;
     DROP VIEW public.vehicles_view;
       public          postgres    false    222    222    222    222    222    222    222            �            1259    16470    veicles_id_seq    SEQUENCE     �   CREATE SEQUENCE public.veicles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.veicles_id_seq;
       public          postgres    false    222            �           0    0    veicles_id_seq    SEQUENCE OWNED BY     B   ALTER SEQUENCE public.veicles_id_seq OWNED BY public.vehicles.id;
          public          postgres    false    232            �           2604    16471 
   clients id    DEFAULT     h   ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);
 9   ALTER TABLE public.clients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    16472    dispatchers id    DEFAULT     p   ALTER TABLE ONLY public.dispatchers ALTER COLUMN id SET DEFAULT nextval('public.dispatchers_id_seq'::regclass);
 =   ALTER TABLE public.dispatchers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218            �           2604    16473 
   drivers id    DEFAULT     h   ALTER TABLE ONLY public.drivers ALTER COLUMN id SET DEFAULT nextval('public.drivers_id_seq'::regclass);
 9   ALTER TABLE public.drivers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    16474 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    16475    schedules id    DEFAULT     l   ALTER TABLE ONLY public.schedules ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);
 ;   ALTER TABLE public.schedules ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    227            �           2604    16476    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    229            �           2604    16477    vehicles id    DEFAULT     i   ALTER TABLE ONLY public.vehicles ALTER COLUMN id SET DEFAULT nextval('public.veicles_id_seq'::regclass);
 :   ALTER TABLE public.vehicles ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    232    222            �          0    16385    clients 
   TABLE DATA           i   COPY public.clients (id, lastname, firstname, surename, phone, preferences, status, comment) FROM stdin;
    public          postgres    false    215   #Z       �          0    16399    dispatchers 
   TABLE DATA           }   COPY public.dispatchers (id, user_id, lastname, firstname, surename, "position", phone, email, address, comment) FROM stdin;
    public          postgres    false    218   @Z       �          0    16410    drivers 
   TABLE DATA           �   COPY public.drivers (id, lastname, firstname, surename, phone, address, driver_licence, driver_licence_category, drive_experience, vehicle_id, birthday, status, comment) FROM stdin;
    public          postgres    false    220   �Z       �          0    16434    orders 
   TABLE DATA           �   COPY public.orders (id, driver_id, client_id, order_time, destination_address, pickup_address, status, price, pay_method, ride_time, end_time) FROM stdin;
    public          postgres    false    224   �Z       �          0    16448 	   schedules 
   TABLE DATA           {   COPY public.schedules (id, driver_id, shift_date, shift_start_time, shift_end_time, completed_orders, comment) FROM stdin;
    public          postgres    false    227   �Z       �          0    16459    users 
   TABLE DATA           N   COPY public.users (id, username, password, login_time, is_active) FROM stdin;
    public          postgres    false    229   �Z       �          0    16421    vehicles 
   TABLE DATA           g   COPY public.vehicles (id, model, color, tech_condition, fuel_type, licence_plate, comment) FROM stdin;
    public          postgres    false    222   [       �           0    0    clients_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.clients_id_seq', 16, true);
          public          postgres    false    216            �           0    0    dispatchers_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.dispatchers_id_seq', 4, true);
          public          postgres    false    219            �           0    0    drivers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.drivers_id_seq', 3, true);
          public          postgres    false    221            �           0    0    orders_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.orders_id_seq', 8, true);
          public          postgres    false    225            �           0    0    schedules_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.schedules_id_seq', 1, false);
          public          postgres    false    228            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 15, true);
          public          postgres    false    230            �           0    0    veicles_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.veicles_id_seq', 3, true);
          public          postgres    false    232            �           2606    16479    clients clients_phone_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_phone_key UNIQUE (phone);
 C   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_phone_key;
       public            postgres    false    215            �           2606    16481    clients clients_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.clients DROP CONSTRAINT clients_pkey;
       public            postgres    false    215            �           2606    16483    dispatchers dispatchers_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.dispatchers
    ADD CONSTRAINT dispatchers_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.dispatchers DROP CONSTRAINT dispatchers_pkey;
       public            postgres    false    218            �           2606    16485 "   drivers drivers_driver_licence_key 
   CONSTRAINT     g   ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_driver_licence_key UNIQUE (driver_licence);
 L   ALTER TABLE ONLY public.drivers DROP CONSTRAINT drivers_driver_licence_key;
       public            postgres    false    220            �           2606    16487    drivers drivers_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.drivers DROP CONSTRAINT drivers_pkey;
       public            postgres    false    220            �           2606    16489    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    224            �           2606    16491    schedules schedules_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_pkey;
       public            postgres    false    227            �           2606    16493    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    229            �           2606    16495    vehicles veicles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.vehicles
    ADD CONSTRAINT veicles_pkey PRIMARY KEY (id);
 ?   ALTER TABLE ONLY public.vehicles DROP CONSTRAINT veicles_pkey;
       public            postgres    false    222            �           2606    16496 $   dispatchers dispatchers_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.dispatchers
    ADD CONSTRAINT dispatchers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 N   ALTER TABLE ONLY public.dispatchers DROP CONSTRAINT dispatchers_user_id_fkey;
       public          postgres    false    218    3309    229            �           2606    16501    drivers drivers_vehicle_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.drivers
    ADD CONSTRAINT drivers_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicles(id);
 I   ALTER TABLE ONLY public.drivers DROP CONSTRAINT drivers_vehicle_id_fkey;
       public          postgres    false    222    220    3303            �           2606    16506    orders orders_client_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.clients(id);
 F   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_client_id_fkey;
       public          postgres    false    224    215    3295            �           2606    16511    orders orders_driver_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.drivers(id);
 F   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_driver_id_fkey;
       public          postgres    false    220    3301    224            �           2606    16516 "   schedules schedules_driver_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.drivers(id);
 L   ALTER TABLE ONLY public.schedules DROP CONSTRAINT schedules_driver_id_fkey;
       public          postgres    false    227    220    3301            �      x������ � �      �   D   x�3�4�0�{.츰����.6\�p��¾�4���6^l	_�t���֋M
r��qqq �#�"      �      x������ � �      �      x������ � �      �      x������ � �      �      x�3�LL��̃�1~�%\1z\\\ X58      �      x������ � �     
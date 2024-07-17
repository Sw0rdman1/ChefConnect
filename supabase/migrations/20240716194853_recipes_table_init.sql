create table categories (
  id text primary key,
  name text not null,
  image text not null
);

create table recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text references categories(id) not null,
  prepare_time int not null,
  banner_image text not null,
  created_by uuid references public.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

insert into storage.buckets (id, name)
  values ('recipes', 'recipes');

create policy "Recipe images are publicly accessible." on storage.objects
  for select using (bucket_id = 'recipes');

create policy "Anyone can upload an recipe image." on storage.objects
  for insert with check (bucket_id = 'recipes');
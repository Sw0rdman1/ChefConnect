create table public.saves (
  user_id uuid references users not null,
  recipe_id uuid references recipes not null,
  created_at timestamp with time zone default now() not null
);

alter table public.saves enable row level security;

create policy "Allow logged-in read access" on public.saves
  for select using (auth.role() = 'authenticated');

create policy "Allow individual insert access" on public.saves
  for insert with check ((select auth.uid()) = user_id);


create policy "Allow individual delete access" on public.saves
    for delete using ((select auth.uid()) = user_id);


create table public.chats (
  id uuid primary key default gen_random_uuid(),
  first_user_id uuid references users not null,
  second_user_id uuid references users not null,
  created_at timestamp with time zone default now() not null
);

alter table public.chats enable row level security;

create policy "Allow logged-in read access" on public.chats
  for select using (auth.role() = 'authenticated');

create policy "Allow individual insert access" on public.chats
    for insert with check (auth.role() = 'authenticated');


create table public.messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats not null,
  user_id uuid references users not null,
  text text not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default now() not null
);

alter table public.messages enable row level security;

create policy "Allow logged-in read access" on public.messages
  for select using (auth.role() = 'authenticated');

create policy "Allow individual insert access" on public.messages
    for insert with check ((select auth.uid()) = user_id);

create policy "Allow individual update access" on public.messages
    for update using ((select auth.uid()) = user_id);

create policy "Allow individual delete access" on public.messages
    for delete using ((select auth.uid()) = user_id);




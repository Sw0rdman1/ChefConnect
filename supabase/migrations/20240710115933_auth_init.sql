create table users (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  email text unique,
  display_name text,
  profile_picture text,
  bio text,

  constraint display_name_length check (char_length(display_name) >= 2)
);


alter table users
  enable row level security;

create policy "Allow logged-in read access" on public.users for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.users for insert with check ( auth.uid() = id );
create policy "Allow individual update access" on public.users for update using ((select auth.uid()) = id);


create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, display_name, profile_picture)
  values (new.id, new.email, new.raw_user_meta_data->>'display_name', new.raw_user_meta_data->>'profile_picture');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');
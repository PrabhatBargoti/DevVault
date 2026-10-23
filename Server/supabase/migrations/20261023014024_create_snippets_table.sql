create table public.snippets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 150),
  description text not null default '' check (char_length(description) <= 1000),
  code text not null default '' check (char_length(code) <= 100000),
  language text not null check (char_length(btrim(language)) between 1 and 50),
  category text not null default '' check (char_length(category) <= 50),
  tags text[] not null default '{}' check (
    cardinality(tags) <= 20
    and array_position(tags, null) is null
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index snippets_user_updated_at_idx
  on public.snippets (user_id, updated_at desc);

alter table public.snippets enable row level security;

revoke all on table public.snippets from anon, authenticated, public;
grant select, insert, update, delete on table public.snippets to service_role;

create policy "Users can read their own snippets"
  on public.snippets
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create policy "Users can create their own snippets"
  on public.snippets
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

create policy "Users can update their own snippets"
  on public.snippets
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "Users can delete their own snippets"
  on public.snippets
  for delete
  to authenticated
  using ((select auth.uid()) = user_id);
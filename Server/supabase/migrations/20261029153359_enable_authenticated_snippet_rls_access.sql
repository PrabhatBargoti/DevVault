revoke all on table public.snippets from anon, service_role, public;
grant select, insert, update, delete on table public.snippets to authenticated;
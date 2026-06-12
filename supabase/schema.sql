create extension if not exists pgcrypto;

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  class_name text not null,
  group_size integer not null check (group_size in (1, 2)),
  student_a_seat text not null,
  student_a_name text not null,
  student_b_seat text,
  student_b_name text,
  owner_token text not null,
  ecosystem_type text not null,
  environment_notes text,
  plant_notes text,
  animal_notes text,
  relationship_notes text,
  prompt text not null,
  image_url text not null,
  image_path text,
  image_source text default 'unknown',
  created_at timestamptz not null default now()
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references public.submissions(id) on delete cascade,
  rater_owner_token text not null,
  rater_class text not null,
  rater_seat text not null,
  rater_name text not null,
  score integer not null check (score between 1 and 10),
  strength text,
  suggestion text,
  created_at timestamptz not null default now(),
  unique (submission_id, rater_owner_token)
);

create or replace view public.submissions_with_average as
select
  s.*,
  coalesce(round(avg(r.score)::numeric, 2), 0) as average_score,
  count(r.id) as rating_count
from public.submissions s
left join public.ratings r on r.submission_id = s.id
group by s.id;

alter table public.submissions enable row level security;
alter table public.ratings enable row level security;

drop policy if exists "Students can read submissions" on public.submissions;
create policy "Students can read submissions"
on public.submissions for select
to anon
using (true);

drop policy if exists "Students can insert submissions" on public.submissions;
create policy "Students can insert submissions"
on public.submissions for insert
to anon
with check (true);

drop policy if exists "Teacher can delete submissions" on public.submissions;
create policy "Teacher can delete submissions"
on public.submissions for delete
to anon
using (true);

drop policy if exists "Students can read ratings" on public.ratings;
create policy "Students can read ratings"
on public.ratings for select
to anon
using (true);

drop policy if exists "Students can insert ratings" on public.ratings;
create policy "Students can insert ratings"
on public.ratings for insert
to anon
with check (true);

drop policy if exists "Teacher can delete ratings" on public.ratings;
create policy "Teacher can delete ratings"
on public.ratings for delete
to anon
using (true);

insert into storage.buckets (id, name, public)
values ('generated-images', 'generated-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public image reads" on storage.objects;
create policy "Public image reads"
on storage.objects for select
to anon
using (bucket_id = 'generated-images');

drop policy if exists "Student image uploads" on storage.objects;
create policy "Student image uploads"
on storage.objects for insert
to anon
with check (bucket_id = 'generated-images');

drop policy if exists "Teacher image deletes" on storage.objects;
create policy "Teacher image deletes"
on storage.objects for delete
to anon
using (bucket_id = 'generated-images');

drop index if exists public.submissions_class_seat_idx;
create index submissions_class_seat_idx on public.submissions (class_name, student_a_seat);

drop index if exists public.submissions_ecosystem_idx;
create index submissions_ecosystem_idx on public.submissions (ecosystem_type);

drop index if exists public.ratings_submission_idx;
create index ratings_submission_idx on public.ratings (submission_id);

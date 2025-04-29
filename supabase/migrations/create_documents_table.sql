-- Create documents table
create table if not exists public.documents (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  user_id uuid references auth.users on delete cascade not null,
  category text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.documents enable row level security;

-- Create policies
create policy "Public documents are viewable by everyone"
  on documents for select
  using ( is_published = true );

create policy "Users can view their own documents"
  on documents for select
  using ( auth.uid() = user_id );

create policy "Users can create their own documents"
  on documents for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own documents"
  on documents for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own documents"
  on documents for delete
  using ( auth.uid() = user_id );

-- Create indexes
create index if not exists documents_user_id_idx on documents (user_id);
create index if not exists documents_created_at_idx on documents (created_at);
create index if not exists documents_category_idx on documents (category);
create index if not exists documents_title_idx on documents (title);
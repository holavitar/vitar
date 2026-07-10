-- ─────────────────────────────────────────────────────────────
-- VITAR — Schema (estructura)
-- Paso 1 de 3. Ejecutar en: Supabase Dashboard → SQL Editor
--   1) schema.sql    ← este archivo (tipos, tablas, función + trigger)
--   2) policies.sql  ← seguridad a nivel de fila (RLS)
--   3) crear los 2 usuarios en Authentication → Users
--   4) seed.sql      ← datos demo
-- ─────────────────────────────────────────────────────────────

-- Tipos
create type user_role as enum ('institution', 'patient');
create type risk_level as enum ('low', 'medium', 'high');
create type alert_priority as enum ('low', 'medium', 'high');
create type alert_status as enum ('active', 'resolved');
create type medication_status as enum ('taken', 'missed', 'pending');

-- institutions
create table institutions (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  created_at timestamptz default now()
);

-- users (extiende auth.users de Supabase)
create table users (
  id             uuid primary key references auth.users(id) on delete cascade,
  institution_id uuid references institutions(id) on delete set null,
  role           user_role not null,
  email          text not null,
  name           text not null,
  created_at     timestamptz default now()
);

-- patients
create table patients (
  id             uuid primary key default gen_random_uuid(),
  institution_id uuid not null references institutions(id) on delete cascade,
  name           text not null,
  condition      text not null,
  risk           risk_level not null default 'low',
  adherence      numeric(5,2) not null default 100 check (adherence >= 0 and adherence <= 100),
  created_at     timestamptz default now()
);

-- medications
create table medications (
  id         uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  name       text not null,
  dose       text not null,
  schedule   text not null,
  frequency  text not null,
  created_at timestamptz default now()
);

-- medication_logs
create table medication_logs (
  id            uuid primary key default gen_random_uuid(),
  medication_id uuid not null references medications(id) on delete cascade,
  patient_id    uuid not null references patients(id) on delete cascade,
  taken_at      timestamptz not null,
  status        medication_status not null default 'pending',
  created_at    timestamptz default now()
);

-- symptoms
create table symptoms (
  id         uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  type       text not null,
  notes      text,
  created_at timestamptz default now()
);

-- messages
create table messages (
  id          uuid primary key default gen_random_uuid(),
  sender_id   uuid not null references users(id) on delete cascade,
  receiver_id uuid not null references users(id) on delete cascade,
  content     text not null,
  created_at  timestamptz default now()
);

-- alerts
create table alerts (
  id         uuid primary key default gen_random_uuid(),
  patient_id uuid not null references patients(id) on delete cascade,
  type       text not null,
  priority   alert_priority not null default 'medium',
  status     alert_status not null default 'active',
  created_at timestamptz default now()
);

-- ─────────────────────────────────────────────────────────────
-- FUNCIÓN: recalcular adherencia + generar alerta automática
-- Se dispara cuando se inserta un medication_log
-- ─────────────────────────────────────────────────────────────
create or replace function update_adherence_and_alert()
returns trigger as $$
declare
  v_total   int;
  v_taken   int;
  v_adh     numeric(5,2);
begin
  -- Contar tomas del último mes para este paciente
  select count(*) into v_total
  from medication_logs
  where patient_id = new.patient_id
    and taken_at >= now() - interval '30 days';

  select count(*) into v_taken
  from medication_logs
  where patient_id = new.patient_id
    and status = 'taken'
    and taken_at >= now() - interval '30 days';

  if v_total = 0 then
    v_adh := 100;
  else
    v_adh := round((v_taken::numeric / v_total::numeric) * 100, 0);
  end if;

  -- Actualizar adherencia en patients
  update patients set adherence = v_adh where id = new.patient_id;

  -- Actualizar risk
  update patients set risk =
    case
      when v_adh < 60  then 'high'::risk_level
      when v_adh < 80  then 'medium'::risk_level
      else 'low'::risk_level
    end
  where id = new.patient_id;

  -- Crear alerta si adherencia < 60%
  if v_adh < 60 then
    insert into alerts (patient_id, type, priority, status)
    values (
      new.patient_id,
      'Adherencia crítica: ' || v_adh || '%',
      'high',
      'active'
    )
    on conflict do nothing;
  end if;

  return new;
end;
$$ language plpgsql security definer;

create trigger trg_update_adherence
after insert on medication_logs
for each row execute function update_adherence_and_alert();

-- ─────────────────────────────────────────────────────────────
-- Siguiente paso: ejecutar policies.sql para habilitar la seguridad
-- a nivel de fila (RLS). Luego crear los usuarios y correr seed.sql.
-- ─────────────────────────────────────────────────────────────

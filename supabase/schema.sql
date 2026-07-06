-- ─────────────────────────────────────────────────────────────
-- VITAR — Schema v1
-- Ejecutar en: Supabase Dashboard → SQL Editor
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
    v_adh := round((v_taken::numeric / v_total::numeric) * 100, 2);
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
-- RLS (Row Level Security)
-- ─────────────────────────────────────────────────────────────
alter table institutions    enable row level security;
alter table users           enable row level security;
alter table patients        enable row level security;
alter table medications     enable row level security;
alter table medication_logs enable row level security;
alter table symptoms        enable row level security;
alter table messages        enable row level security;
alter table alerts          enable row level security;

-- users: cada uno ve su propio perfil
create policy "users: ver propio perfil"
  on users for select
  using (id = auth.uid());

-- institutions: los usuarios de la institución la ven
create policy "institutions: ver la propia"
  on institutions for select
  using (
    id in (select institution_id from users where id = auth.uid())
  );

-- patients: institución ve sus pacientes; paciente se ve a sí mismo
create policy "patients: institución ve los suyos"
  on patients for select
  using (
    institution_id in (
      select institution_id
      from users
      where id = auth.uid()
    )
  );

create policy "patients: institución puede actualizar"
  on patients for update
  using (
    institution_id in (select institution_id from users where id = auth.uid())
  );

-- medications
create policy "medications: ver si es de tu paciente"
  on medications for select
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
  );

-- medication_logs: insertar y ver
create policy "medication_logs: ver"
  on medication_logs for select
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
  );

create policy "medication_logs: insertar"
  on medication_logs for insert
  with check (auth.uid() is not null);

-- alerts
create policy "alerts: ver"
  on alerts for select
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
  );

create policy "alerts: actualizar estado"
  on alerts for update
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
  );

-- messages
create policy "messages: ver los propios"
  on messages for select
  using (sender_id = auth.uid() or receiver_id = auth.uid());

create policy "messages: insertar"
  on messages for insert
  with check (sender_id = auth.uid());

-- symptoms
create policy "symptoms: ver"
  on symptoms for select
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
    or patient_id in (select id from patients)
  );

create policy "symptoms: insertar"
  on symptoms for insert
  with check (auth.uid() is not null);

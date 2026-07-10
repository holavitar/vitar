-- ─────────────────────────────────────────────────────────────
-- VITAR — Policies (Row Level Security)
-- Paso 2 de 3. Ejecutar DESPUÉS de schema.sql, en el SQL Editor.
-- Habilita RLS en todas las tablas y define quién ve/escribe qué.
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
drop policy if exists "users: ver propio perfil" on users;
create policy "users: ver propio perfil"
  on users for select
  using (id = auth.uid());

-- institutions: los usuarios de la institución la ven
drop policy if exists "institutions: ver la propia" on institutions;
create policy "institutions: ver la propia"
  on institutions for select
  using (
    id in (select institution_id from users where id = auth.uid())
  );

-- patients: institución ve sus pacientes; paciente se ve a sí mismo
drop policy if exists "patients: institución ve los suyos" on patients;
create policy "patients: institución ve los suyos"
  on patients for select
  using (
    institution_id in (
      select institution_id
      from users
      where id = auth.uid()
    )
    -- El paciente se ve a sí mismo: se compara el nombre directo contra su
    -- usuario, SIN subconsultar patients (evita la recursión infinita de RLS).
    or name = (select name from users where id = auth.uid())
  );

drop policy if exists "patients: institución puede actualizar" on patients;
create policy "patients: institución puede actualizar"
  on patients for update
  using (
    institution_id in (select institution_id from users where id = auth.uid())
  );

-- medications
drop policy if exists "medications: ver si es de tu paciente" on medications;
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
drop policy if exists "medication_logs: ver" on medication_logs;
create policy "medication_logs: ver"
  on medication_logs for select
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
  );

drop policy if exists "medication_logs: insertar" on medication_logs;
create policy "medication_logs: insertar"
  on medication_logs for insert
  with check (auth.uid() is not null);

-- alerts
drop policy if exists "alerts: ver" on alerts;
create policy "alerts: ver"
  on alerts for select
  using (
    patient_id in (
      select id from patients where institution_id in (
        select institution_id from users where id = auth.uid()
      )
    )
  );

drop policy if exists "alerts: actualizar estado" on alerts;
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
drop policy if exists "messages: ver los propios" on messages;
create policy "messages: ver los propios"
  on messages for select
  using (sender_id = auth.uid() or receiver_id = auth.uid());

drop policy if exists "messages: insertar" on messages;
create policy "messages: insertar"
  on messages for insert
  with check (sender_id = auth.uid());

-- symptoms
drop policy if exists "symptoms: ver" on symptoms;
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

drop policy if exists "symptoms: insertar" on symptoms;
create policy "symptoms: insertar"
  on symptoms for insert
  with check (auth.uid() is not null);

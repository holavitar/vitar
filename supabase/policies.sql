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
    or id in (
      select id from patients
      where name = (select name from users where id = auth.uid())
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

-- ─────────────────────────────────────────────────────────────
-- VITAR — Seed de datos demo
-- La demo queda enlazada ÚNICAMENTE a estos dos usuarios de Supabase Auth
-- (por UUID explícito, sin depender del email):
--   admin@vitar.com    → rol: institution
--   paciente@vitar.com → rol: patient
-- Si en el futuro recreás esos usuarios en Auth, actualizá los UUID de abajo
-- con el nuevo "User UID" (Authentication → Users → clic en el usuario).
-- ─────────────────────────────────────────────────────────────

do $$
declare
  -- UUID reales de los usuarios de Supabase Auth (no tocar salvo que se recreen)
  auth_admin_id   uuid := '7108906b-94a6-403e-af46-3fbd5e092743';  -- usuario institución (admin@vitar.com)
  auth_patient_id uuid := '6d022628-d6c8-4326-9f1e-315584a0fa05';  -- usuario paciente (paciente@vitar.com)

  inst_id   uuid := gen_random_uuid();
  p1  uuid := gen_random_uuid();
  p2  uuid := gen_random_uuid();
  p3  uuid := gen_random_uuid();
  p4  uuid := gen_random_uuid();
  p5  uuid := gen_random_uuid();
  p6  uuid := gen_random_uuid();
  p7  uuid := gen_random_uuid();
  p8  uuid := gen_random_uuid();
  p9  uuid := gen_random_uuid();
  p10 uuid := gen_random_uuid();

  m1  uuid; m2  uuid; m3  uuid; m4  uuid; m5  uuid;
  m6  uuid; m7  uuid; m8  uuid; m9  uuid; m10 uuid;
begin

  -- Guarda: los UUID deben corresponder a usuarios existentes en Auth
  if not exists (select 1 from auth.users where id = auth_admin_id)
     or not exists (select 1 from auth.users where id = auth_patient_id) then
    raise exception
      'Alguno de los UUID no existe en auth.users. Verificá que los usuarios estén creados en Authentication → Users.';
  end if;

  -- Institución
  insert into institutions (id, name) values
    (inst_id, 'Clínica San Martín');

  -- Users
  insert into users (id, institution_id, role, email, name) values
    (auth_admin_id,   inst_id, 'institution', 'admin@vitar.com',    'Dr. Administrador'),
    (auth_patient_id, inst_id, 'patient',     'paciente@vitar.com', 'Roberto Martínez');

  -- Pacientes (10)
  insert into patients (id, institution_id, name, condition, risk, adherence) values
    (p1,  inst_id, 'Roberto Martínez',  'Hipertensión arterial',       'high',   42),
    (p2,  inst_id, 'Carmen López',      'Diabetes tipo 2',             'high',   55),
    (p3,  inst_id, 'Héctor Pérez',      'Insuficiencia cardíaca',      'medium', 67),
    (p4,  inst_id, 'Ana García',        'EPOC',                        'medium', 71),
    (p5,  inst_id, 'Luis Torres',       'Hipertensión arterial',       'low',    88),
    (p6,  inst_id, 'María Fernández',   'Diabetes tipo 2',             'low',    92),
    (p7,  inst_id, 'Jorge Rodríguez',   'Enfermedad renal crónica',    'medium', 74),
    (p8,  inst_id, 'Silvia Díaz',       'Artritis reumatoidea',        'low',    95),
    (p9,  inst_id, 'Carlos Méndez',     'Hipotiroidismo',              'low',    89),
    (p10, inst_id, 'Elena Castro',      'Fibrilación auricular',       'medium', 63);

  -- Medicamentos
  insert into medications (id, patient_id, name, dose, schedule, frequency)
  values
    (gen_random_uuid(), p1, 'Enalapril',      '10mg',   '08:00',       'Cada 24 hs'),
    (gen_random_uuid(), p1, 'Amlodipina',     '5mg',    '20:00',       'Cada 24 hs'),
    (gen_random_uuid(), p2, 'Metformina',     '850mg',  '08:00, 20:00','Cada 12 hs'),
    (gen_random_uuid(), p2, 'Glibenclamida',  '5mg',    '12:00',       'Cada 24 hs'),
    (gen_random_uuid(), p3, 'Carvedilol',     '25mg',   '08:00, 20:00','Cada 12 hs'),
    (gen_random_uuid(), p4, 'Salbutamol',     '100mcg', 'A demanda',   'Según necesidad'),
    (gen_random_uuid(), p5, 'Losartán',       '50mg',   '08:00',       'Cada 24 hs'),
    (gen_random_uuid(), p6, 'Insulina NPH',   '20 UI',  '22:00',       'Cada 24 hs'),
    (gen_random_uuid(), p7, 'Furosemida',     '40mg',   '08:00',       'Cada 24 hs'),
    (gen_random_uuid(), p8, 'Metotrexato',    '7.5mg',  'Lunes',       'Semanal'),
    (gen_random_uuid(), p9, 'Levotiroxina',   '50mcg',  '07:00',       'Cada 24 hs'),
    (gen_random_uuid(), p10,'Rivaroxabán',    '20mg',   '20:00',       'Cada 24 hs');

  -- Alertas activas para pacientes de alto riesgo
  insert into alerts (patient_id, type, priority, status, created_at) values
    (p1, 'Sin registro de medicación hace 3 días', 'high',   'active', now() - interval '3 hours'),
    (p2, 'Adherencia crítica: 55%',                'high',   'active', now() - interval '1 day'),
    (p3, 'Adherencia por debajo del 70%',          'medium', 'active', now() - interval '2 days'),
    (p4, 'Síntoma reportado: disnea severa',       'medium', 'active', now() - interval '5 hours'),
    (p10,'Adherencia inferior al 65%',             'medium', 'active', now() - interval '4 hours');

  -- Síntomas recientes
  insert into symptoms (patient_id, type, notes, created_at) values
    (p1,  'dolor',   'Dolor de cabeza persistente', now() - interval '2 days'),
    (p2,  'mareos',  'Mareos al levantarse',        now() - interval '1 day'),
    (p3,  'fatiga',  'Cansancio extremo',           now() - interval '6 hours'),
    (p4,  'otro',    'Disnea al caminar 50 metros', now() - interval '5 hours');

end $$;

# Vitar — MVP

Plataforma SaaS B2B de seguimiento terapéutico para clínicas, obras sociales y prepagas.

## Stack

- **Next.js 15** (App Router) — Server Components + Server Actions
- **TypeScript** (MVP) + JavaScript (landing existente)
- **Supabase** — PostgreSQL + Auth + RLS
- **Tailwind CSS v3**
- **shadcn/ui** + **Lucide Icons**
- **Recharts** — gráficos
- **React Hook Form + Zod** — formularios

## Estructura del proyecto

```
app/
  (marketing)/          ← landing institucional (JS, sin cambios)
    page.jsx
  (auth)/
    login/page.tsx
  (institution)/
    dashboard/
      layout.tsx         ← sidebar institucional
      page.tsx           ← resumen / KPIs
      patients/
        page.tsx         ← listado + filtros
        [id]/page.tsx    ← detalle del paciente
      alerts/page.tsx
      messages/page.tsx
      settings/page.tsx
  (patient)/
    portal/
      layout.tsx         ← sidebar del paciente
      page.tsx           ← inicio + adherencia
      treatment/page.tsx
      symptoms/page.tsx
      messages/page.tsx
      support/page.tsx

components/
  auth/                  ← LoginForm
  dashboard/             ← Sidebar, TopBar, StatCard, charts, tables
  patients/              ← cards, filtros, detalle
  alerts/                ← tabla + botón resolver
  messages/              ← chat con polling
  portal/                ← sidebar, topbar, medication cards, forms

lib/
  supabase/
    client.ts            ← browser client
    server.ts            ← server client (RSC + actions)
  services/              ← queries de Supabase (sin "use server")
  actions/               ← Server Actions (con "use server")
  utils.ts

hooks/
  useUser.ts

types/
  database.ts            ← tipos generados del esquema
  index.ts               ← tipos de dominio

supabase/
  schema.sql             ← esquema + RLS + trigger de adherencia
  seed.sql               ← datos demo
```

## Setup local

### 1. Clonar y configurar

```bash
git clone https://github.com/holavitar/vitar.git
cd vitar
npm install
cp .env.example .env.local
```

### 2. Configurar Supabase

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **Settings → API** y copiar `URL` y `anon key` al `.env.local`
3. Ir a **SQL Editor** y ejecutar `supabase/schema.sql`
4. Ir a **Authentication → Users** y crear dos usuarios:
   - `admin@vitar.com` / `password123`
   - `paciente@vitar.com` / `password123`
5. Copiar los UUIDs de esos usuarios al `supabase/seed.sql` donde dice `REEMPLAZAR-CON-UUID-DE-*`
6. Ejecutar `supabase/seed.sql` en el SQL Editor

### 3. Correr el proyecto

```bash
npm run dev
# → http://localhost:3000
```

## Credenciales demo

| Rol | Email | Contraseña | Redirige a |
|---|---|---|---|
| Institución | admin@vitar.com | password123 | /dashboard |
| Paciente | paciente@vitar.com | password123 | /portal |

## Deploy en Vercel

```bash
# Desde el directorio del proyecto
vercel

# O conectar el repo en vercel.com y agregar las variables de entorno:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Flujo de negocio implementado

```
1. Institución carga pacientes
2. Paciente recibe recordatorio de medicación
3. Paciente marca "Marcar como tomada" → medication_logs
4. Trigger de Supabase recalcula adherencia automáticamente
5. Si adherencia < 60% → se crea alerta automática
6. Institución ve alerta en dashboard
7. Institución envía mensaje al paciente
8. Paciente responde desde su portal
```

## Regla de negocio clave

- **Adherencia** = tomas realizadas / tomas programadas (últimos 30 días)
- **Alerta automática** cuando adherencia baja de 60%
- **Riesgo alto** < 60% · **Riesgo medio** 60–79% · **Riesgo bajo** ≥ 80%

## Sistema de diseño

| Token | Valor |
|---|---|
| Fondo | `#f2f2f2` |
| Primario | `#11325b` |
| Secundario | `#e7ba61` |
| Acento (alertas) | `#ac1c37` |
| Tipografía títulos | Helvetica Now Display → Inter (fallback) |
| Tipografía cuerpo | Verdana |

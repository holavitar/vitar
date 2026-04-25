# Vitar — Landing Page

Landing page completa de Vitar, plataforma B2B de seguimiento terapéutico para clínicas y obras sociales.

## Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Google Fonts**: Playfair Display + DM Sans

## Estructura de componentes

```
app/
├── layout.jsx          # Root layout con fuentes y metadata
├── page.jsx            # Página principal (composición de secciones)
└── globals.css         # Estilos globales + Tailwind

components/
├── Navbar.jsx          # Navegación fija con scroll behaviour
├── Hero.jsx            # Hero con mockup de dashboard
├── Problema.jsx        # Sección del problema (3 cards con stats)
├── Solucion.jsx        # Funcionalidades core con hover interactivo
├── ComoFunciona.jsx    # 4 pasos del proceso
├── Beneficios.jsx      # Impacto financiero, clínico y operativo
├── ImpactoEconomico.jsx # ROI y comparación de costos
├── Seguridad.jsx       # Cumplimiento normativo y seguridad
├── CTAFinal.jsx        # Formulario de solicitud de demo
└── Footer.jsx          # Footer con links y estado del sistema
```

## Setup

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build de producción
npm run build
npm start
```

## Sistema de diseño

| Token | Valor |
|---|---|
| Fondo principal | `#f2f2f2` |
| Color primario | `#11325b` |
| Color secundario | `#e7ba61` |
| Color acento | `#ac1c37` |

## Notas

- Todos los componentes son "use client" donde necesitan interactividad (Navbar)
- El formulario de demo es UI-only; conectar a endpoint propio (API route o servicio externo como HubSpot, Typeform, etc.)
- Las métricas y estadísticas son ilustrativas; reemplazar con datos reales
- El Navbar detecta scroll para cambiar de transparente a blanco con sombra

import "./globals.css";

export const metadata = {
  title: "Vitar — Seguimiento terapéutico para clínicas y obras sociales",
  description:
    "Vitar permite a clínicas y obras sociales monitorear la adherencia de sus pacientes y detectar abandono terapéutico en tiempo real. Simple, automatizado y medible.",
  keywords: ["adherencia terapéutica", "healthtech", "obras sociales", "clínicas", "salud digital", "internaciones evitables"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/*
          Helvetica Now no está disponible en Google Fonts (es fuente comercial de Monotype).
          En producción, reemplazar por la licencia real o usar el siguiente fallback.
          Aquí usamos Inter como proxy para titles + Verdana nativo para body.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

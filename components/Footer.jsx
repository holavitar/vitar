function VitarLogo({ height = 40 }) {
  return (
    <img
      src="/logo.svg"
      alt="Vitar"
      style={{ height }}
      className="w-auto object-contain"
    />
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#f2f2f2] py-14">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 pb-10 border-b border-gray-200">
          <div className="md:col-span-1">
            <VitarLogo height={48} />
            <p className="text-gray-500 text-xs leading-relaxed mt-4"
              style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              Seguimiento terapéutico para clínicas, obras sociales y prepagas.
            </p>
          </div>

          {[
            { title: "Plataforma", links: ["Solución", "Cómo funciona", "Alertas", "Beneficios", "Seguridad"] },
            { title: "Empresa", links: ["Sobre Vitar", "Contacto", "Blog"] },
            { title: "Legal", links: ["Términos de uso", "Privacidad", "Ley 25.326"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-500 hover:text-gray-700 text-xs transition-colors"
                      style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            © {new Date().getFullYear()} Vitar Health Technologies. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[blink_1s_steps(2,start)_infinite]" />
            <span className="text-gray-500 text-xs" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
              Sistema operativo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

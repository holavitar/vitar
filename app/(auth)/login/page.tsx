import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Iniciar sesión — Vitar",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f2f2f2] flex items-center justify-center p-4">
      {/* Background dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/logo.svg"
            alt="Vitar"
            className="h-10 w-auto"
          />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1
            className="text-xl font-bold text-[#11325b] mb-1"
            style={{ fontFamily: "'Helvetica Now Display', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          >
            Iniciar sesión
          </h1>
          <p className="text-gray-400 text-xs mb-6" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
            Plataforma de seguimiento terapéutico
          </p>

          <LoginForm />

          {/* Demo credentials */}
          <div className="mt-6 pt-5 border-t border-gray-100 space-y-2">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Credenciales de demo
            </p>
            <div className="bg-[#f2f2f2] rounded-lg px-3 py-2.5">
              <div className="text-xs font-semibold text-[#11325b] mb-0.5">Institución</div>
              <div className="text-xs text-gray-500 font-mono">admin@vitar.com / password123</div>
            </div>
            <div className="bg-[#f2f2f2] rounded-lg px-3 py-2.5">
              <div className="text-xs font-semibold text-[#11325b] mb-0.5">Paciente</div>
              <div className="text-xs text-gray-500 font-mono">paciente@vitar.com / password123</div>
            </div>
          </div>
        </div>

        <p className="text-center text-white/30 text-xs mt-6" style={{ fontFamily: "Verdana, Geneva, sans-serif" }}>
          © 2026 Vitar Health Technologies
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const supabase = createClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    console.log("AUTH DATA:", authData);
    console.log("AUTH ERROR:", error);

    if (error) {
      setServerError(error.message);
      return;
    }

    // Obtener rol del usuario
    const { data: profileData } = await supabase
      .from("users")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    const role = (profileData as { role?: string } | null)?.role;

    if (role === "patient") {
      router.push("/portal");
    } else {
      router.push("/dashboard");
    }

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@institucion.com"
          {...register("email")}
          className="w-full bg-[#f2f2f2] border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#11325b]/25 focus:border-[#11325b] transition-all"
        />
        {errors.email && (
          <p className="text-[#ac1c37] text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password")}
            className="w-full bg-[#f2f2f2] border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#11325b]/25 focus:border-[#11325b] transition-all"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword
              ? <EyeOff size={16} />
              : <Eye size={16} />
            }
          </button>
        </div>
        {errors.password && (
          <p className="text-[#ac1c37] text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="bg-[#ac1c37]/8 border border-[#ac1c37]/20 rounded-lg px-4 py-3">
          <p className="text-[#ac1c37] text-xs font-medium">{serverError}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#e7ba61] hover:bg-[#d4a94f] disabled:opacity-60 disabled:cursor-not-allowed text-[#11325b] font-bold py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 mt-2"
      >
        {isSubmitting && <Loader2 size={15} className="animate-spin" />}
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}

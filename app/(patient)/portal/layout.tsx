import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PatientSidebar } from "@/components/portal/PatientSidebar";

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = (data as { role?: string } | null)?.role;

  if (role !== "patient") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-[#f2f2f2]">
      <PatientSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}

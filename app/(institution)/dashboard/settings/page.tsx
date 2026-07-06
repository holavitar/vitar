import { TopBar } from "@/components/dashboard/TopBar";
export default function SettingsPage() {
  return (
    <>
      <TopBar title="Configuración" />
      <main className="flex-1 p-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">
          Próximamente
        </div>
      </main>
    </>
  );
}

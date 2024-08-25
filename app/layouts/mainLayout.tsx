import { Sidebar } from "../components/sidebar";

export default function MainLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <div className="main-layout">
      <Sidebar />
      {children}
    </div>
  );
}

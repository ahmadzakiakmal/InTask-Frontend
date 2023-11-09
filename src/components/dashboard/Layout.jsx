import MenuComponent from "../Menu";

export default function Layout({ children }) {
  return (
    <main className="flex bg-neutral">
      <aside className="flex-shrink-0 p-10 min-h-screen bg-transparent">
        <MenuComponent />
      </aside>

      <section className="text-navy p-10 outline w-full">{children}</section>
    </main>
  );
}

import MenuComponent from "../Menu";

export default function Layout({ children }) {
  return (
    <main className="flex flex-row-reverse sm:flex-row bg-neutral gap-5 sm:gap-8 lg:gap-10 px-[5%] xs:px-5 sm:px-8 lg:px-10 py-10">
      <aside className="flex-shrink-0 min-h-screen bg-transparent">
        <MenuComponent />
      </aside>

      <section className="text-navy w-full">{children}</section>
    </main>
  );
}

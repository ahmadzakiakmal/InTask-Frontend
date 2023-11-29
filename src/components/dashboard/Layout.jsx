import MenuComponent from "../Menu";

export default function Layout({ children }) {
  return (
    <main className="flex flex-col-reverse xs:flex-row bg-neutral gap-5 sm:gap-8 lg:gap-10 px-[5%] xs:px-5 sm:px-8 lg:px-10">
      <aside className="absolute sm:relative flex-shrink-0 h-fit sm:h-screen bg-transparent py-10">
        <MenuComponent />
      </aside>

      <section className="text-navy w-full py-10 min-h-screen">{children}</section>
    </main>
  );
}

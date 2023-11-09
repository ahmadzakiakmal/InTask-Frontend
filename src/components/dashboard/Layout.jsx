import MenuComponent from "../Menu";

export default function Layout({ children }) {
  return (
    <main className="flex p-10 bg-neutral">
      <MenuComponent />

      <section className="text-navy p-10 outline w-full">{children}</section>
    </main>
  );
}

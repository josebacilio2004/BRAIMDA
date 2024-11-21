import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-blue-900 text-white p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">BRAIMDA</div>
        <nav className="space-x-4">
          <Link href="#inicio" className="hover:underline">Inicio</Link>
          <Link href="#sobre-nosotros" className="hover:underline">Sobre Nosotros</Link>
          <Link href="#propuesta" className="hover:underline">Propuesta</Link>
          <Link href="#beneficios" className="hover:underline">Beneficios</Link>
          <Link href="#contacto" className="hover:underline">Contacto</Link>
        </nav>
      </div>
    </header>
  )
}
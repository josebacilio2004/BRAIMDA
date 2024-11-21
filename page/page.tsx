import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Resources from "@/components/Resources"
import BrailleTile3D from "@/components/BrailleTile3D"
import ContactForm from "@/components/ContactForm"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Resources />
      <section id="proyecto" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Visualización 3D de Baldosa Braille</h2>
          <p className="text-center mb-8">Explora nuestra baldosa Braille en un entorno tridimensional interactivo.</p>
          <BrailleTile3D word="Biblioteca" />
        </div>
      </section>
      <ContactForm />
    </main>
  )
}
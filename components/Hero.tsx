import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section id="inicio" className="bg-blue-100 text-blue-900 py-20 mt-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">PROMOVIENDO LA INCLUSIÓN SOCIAL</h1>
        <p className="text-xl mb-8">Braimda es un proyecto dedicado a mejorar la vida de las personas con discapacidad mental y visual.</p>
        <h2 className="text-3xl font-semibold mb-4">ODS relacionado a Braimda</h2>
        <p className="text-lg mb-4">Nuestro proyecto se alinea con el Objetivo de Desarrollo Sostenible 10: Reducción de las desigualdades.</p>
        <p className="text-lg mb-8">Al promover la accesibilidad, buscamos garantizar que todas las personas, independientemente de su capacidad, tengan acceso a los mismos derechos y oportunidades.</p>
        <Image src="/placeholder.svg?height=300&width=500" width={500} height={300} alt="Mapa Mental de Braimda" className="mx-auto mb-8 rounded-lg shadow-lg" />
        <Link href="#sobre-nosotros" className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">Conócenos</Link>
      </div>
    </section>
  )
}


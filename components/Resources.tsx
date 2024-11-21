import Image from "next/image"

export default function Resources() {
  const resources = [
    { title: "Carteles en Braille", description: "Los carteles en braille permiten a las personas con discapacidad visual moverse sin depender de terceros, facilitando su orientación en espacios públicos.", image: "/placeholder.svg?height=200&width=300" },
    { title: "Pavimentos en Braille", description: "Los pavimentos en braille permiten a las personas con discapacidad visual moverse y guiarse sin depender de terceros, facilitando su orientación en espacios públicos.", image: "/placeholder.svg?height=200&width=300" },
    { title: "Guías Táctiles", description: "Las guías táctiles en el suelo son una solución que mejora el desplazamiento seguro y autónomo de personas con discapacidades visuales y mentales.", image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <section id="propuesta" className="py-20 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nuestra Propuesta</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">{resource.title}</h3>
              <p className="mb-4">{resource.description}</p>
              <Image src={resource.image} width={300} height={200} alt={resource.title} className="w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
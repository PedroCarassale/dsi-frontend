function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        Bienvenido al Sistema DSI
      </h1>
      <p className="text-gray-600 mb-8">
        Sistema de gestión para el Departamento de Sistemas de Información
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Memorias Anuales</h2>
          <p className="text-gray-600">Gestión de memorias anuales del departamento</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Registros y Patentes</h2>
          <p className="text-gray-600">Administración de patentes y registros</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Trabajos Publicados</h2>
          <p className="text-gray-600">Catálogo de publicaciones científicas</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
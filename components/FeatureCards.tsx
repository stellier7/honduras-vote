import React from 'react'
import { FaEye, FaBalanceScale, FaShieldAlt } from 'react-icons/fa'

const FeatureCards = () => {
  return (
    <div className="space-y-16">
      {/* Top 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEye size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Transparencia Total</h3>
          <p className="text-white text-sm leading-relaxed">
            Cada voto es visible y verificable en la blockchain. Eliminamos la opacidad del proceso electoral tradicional.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaBalanceScale size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Lucha Contra el Fraude</h3>
          <p className="text-white text-sm leading-relaxed">
            Tecnología blockchain inmutable que previene la manipulación de votos y garantiza la integridad electoral.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          <div className="w-16 h-16 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShieldAlt size={28} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">Democracia Digital</h3>
          <p className="text-white text-sm leading-relaxed">
            Modernizamos el sistema electoral hondureño con tecnología de vanguardia para una democracia más fuerte.
          </p>
        </div>
      </div>

      {/* How We Guarantee Transparency Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Cómo Garantizamos la Transparencia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Identidad Verificada</h4>
            <p className="text-white text-sm">
              Verificación biométrica para prevenir votos duplicados
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Voto Inmutable</h4>
            <p className="text-white text-sm">
              Cada voto se registra en blockchain para evitar alteraciones
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Verificación Pública</h4>
            <p className="text-white text-sm">
              Cualquier ciudadano puede verificar que su voto fue contabilizado
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">4</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-3">Resultados Transparentes</h4>
            <p className="text-white text-sm">
              Conteo en tiempo real sin posibilidad de manipulación
            </p>
          </div>
        </div>
      </div>

      {/* Zero Tolerance to Fraud Section */}
      <div className="max-w-6xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-yellow-500 bg-opacity-30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBalanceScale size={28} className="text-yellow-300" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Cero Tolerancia al Fraude</h2>
          <p className="text-white text-lg max-w-4xl mx-auto">
            Nuestro sistema elimina las vulnerabilidades del voto tradicional. Cada voto es único, verificable e imposible de manipular.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-red-500 bg-opacity-20 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">❌</span> Eliminamos
            </h3>
            <ul className="text-white text-sm space-y-2">
              <li>• Votos duplicados</li>
              <li>• Manipulación de urnas</li>
              <li>• Conteos falsos</li>
              <li>• Votos de personas fallecidas</li>
            </ul>
          </div>

          <div className="bg-green-500 bg-opacity-20 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">✅</span> Garantizamos
            </h3>
            <ul className="text-white text-sm space-y-2">
              <li>• Un voto por persona</li>
              <li>• Transparencia total</li>
              <li>• Verificación pública</li>
              <li>• Resultados inmutables</li>
            </ul>
          </div>

          <div className="bg-blue-500 bg-opacity-20 rounded-xl p-6 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <span className="mr-2">🛡️</span> Protegemos
            </h3>
            <ul className="text-white text-sm space-y-2">
              <li>• Privacidad del votante</li>
              <li>• Integridad electoral</li>
              <li>• Democracia hondureña</li>
              <li>• Confianza ciudadana</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureCards 
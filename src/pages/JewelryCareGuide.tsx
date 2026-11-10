import React from 'react';
import { Sparkles, Shield, Droplets, Sun, Box, AlertTriangle } from 'lucide-react';
import { STORE_NAME } from '../data/config';

export const JewelryCareGuide: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Cabecera */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
          Conservación & Brillo
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          Guía de Cuidado de Joyas
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
          Consejos profesionales para proteger el resplandor de tus piezas y preservar su belleza durante muchos años.
        </p>
      </div>

      {/* Regla de Oro */}
      <div className="bg-brand-primary text-white p-8 border border-[#C6A15B]/40 flex flex-col md:flex-row items-center gap-6 shadow-md transition-colors duration-500">
        <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 flex items-center justify-center text-[#C6A15B] shrink-0">
          <Sparkles className="w-8 h-8" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h2 className="font-serif text-2xl text-[#C6A15B]">La regla de oro de la joyería fina:</h2>
          <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
            "Lo último que te pones al salir de casa y lo primero que te quitas al volver." Evita rociar perfumes o aplicar cremas directamente sobre las piezas.
          </p>
        </div>
      </div>

      {/* Cuidados por Material Declarado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Acero Inoxidable y Baño Dorado */}
        <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-4">
          <div className="flex items-center gap-2.5 text-[#C6A15B]">
            <Shield className="w-5 h-5" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">Acero Inoxidable & Baño Dorado</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            El acero quirúrgico 316L es sumamente resistente y no se oxida, pero su capa de baño dorado requiere mimos para evitar la abrasión:
          </p>
          <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
            <li>Limpia suavemente con un paño de microfibra seco tras cada uso para retirar residuos de sudor o polvo.</li>
            <li>No utilices esponjas abrasivas ni limpiadores químicos de metales pesados.</li>
            <li>Evita sumergirte con tus joyas en piscinas cloradas o aguas termales sulfurosas.</li>
          </ul>
        </div>

        {/* Rodio Plateado y Circonias */}
        <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-4">
          <div className="flex items-center gap-2.5 text-[#C6A15B]">
            <Droplets className="w-5 h-5" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">Circonias Cúbicas AAA & Cristales</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Las circonias facetadas reflejan la luz como diamantes, pero pueden acumular una ligera película de aceites con el tiempo:
          </p>
          <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
            <li>Si notas que pierden brillo, sumérgelas brevemente en agua tibia con jabón neutro muy suave.</li>
            <li>Usa un cepillo de dientes de cerdas ultra suaves para limpiar detrás del engaste.</li>
            <li>Enjuaga con agua templada y seca inmediatamente con toalla de papel o franela suave.</li>
          </ul>
        </div>

        {/* Perlas y Gemas Delicadas */}
        <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-4">
          <div className="flex items-center gap-2.5 text-[#C6A15B]">
            <Sun className="w-5 h-5" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">Perlas Cultivadas y Barrocas</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            El nácar orgánico es una superficie porosa y delicada:
          </p>
          <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
            <li>Nunca uses alcohol, cloro, acetona ni limpiadores ultrasónicos cerca de perlas.</li>
            <li>Límpialas únicamente con un paño ligeramente humedecido en agua purificada.</li>
            <li>Guárdalas en estuches ventilados para evitar que el nácar se reseque.</li>
          </ul>
        </div>

        {/* Almacenamiento */}
        <div className="bg-white p-6 sm:p-8 border border-[#E9DFCF] space-y-4">
          <div className="flex items-center gap-2.5 text-[#C6A15B]">
            <Box className="w-5 h-5" />
            <h3 className="font-serif text-xl text-stone-900 font-medium">Almacenamiento Seguro</h3>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            La prevención de rayaduras mecánicas es esencial:
          </p>
          <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
            <li>Guarda cada joya en compartimentos individuales para que los metales no se rocen entre sí.</li>
            <li>Cierra los broches de collares y cadenas antes de guardarlos para evitar nudos imposibles.</li>
            <li>Evita dejar tus joyas expuestas a la luz solar directa prolongada o en baños muy húmedos.</li>
          </ul>
        </div>
      </div>

      {/* Aviso de Transparencia */}
      <div className="p-4 bg-stone-100 border border-stone-200 text-stone-600 text-xs flex gap-3 items-start">
        <AlertTriangle className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Aviso de cuidado:</strong> Las recomendaciones pueden variar según la composición exacta y el acabado específico de cada producto. En {STORE_NAME} garantizamos transparencia en la ficha técnica de cada joya.
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { STORE_NAME, STORE_FULL_NAME } from '../data/config';
import { heroImg, ringsImg } from '../data/products';
import { Sparkles, Gem, ShieldCheck, Heart } from 'lucide-react';
import { ActivePage } from '../types';

interface AboutProps {
  onNavigate: (page: ActivePage) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Nosotros */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C6A15B] font-semibold block">
          Nuestra Filosofía
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-stone-900 font-light leading-tight">
          La devoción por lo auténtico y perdurable
        </h1>
        <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
          En {STORE_NAME}, concebimos la joyería como una prolongación íntima de quien la porta. Cada curva, cada engaste y cada pulido responde a una búsqueda constante de armonía, proporción y serenidad visual.
        </p>
      </div>

      {/* Grid con Fotografía Editorial y Manifiesto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 relative aspect-4/3 overflow-hidden border border-[#E9DFCF] shadow-lg">
          <img
            src={heroImg}
            alt="Taller y estética de alta joyería"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold">
            El Origen del Detalle
          </span>
          <h2 className="font-serif text-3xl text-stone-900 font-normal">
            Lujo contemporáneo sin estridencias
          </h2>
          <div className="text-xs sm:text-sm text-stone-600 space-y-4 leading-relaxed font-light">
            <p>
              Nuestra propuesta nace del deseo de ofrecer piezas de joyería que trasciendan modas fugaces. Seleccionamos materiales nobles y resistentes —como el acero quirúrgico inoxidable 316L, baños dorados de alta fijación y circonias cúbicas de máxima refracción— para garantizar belleza duradera en el día a día.
            </p>
            <p>
              Creemos firmemente en el poder de los pequeños gestos: un anillo de compromiso que sella una promesa, una medalla grabada con una inicial que atesora un lazo, o una pulsera minimalista que acompaña tu rutina con distinción.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E9DFCF] grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-serif text-xl text-stone-900 block font-medium">Diseño Honesto</span>
              <span className="text-stone-500">Transparencia en materiales declarados y acabados reales.</span>
            </div>
            <div>
              <span className="font-serif text-xl text-stone-900 block font-medium">Trato Cercano</span>
              <span className="text-stone-500">Asesoría directa en cada consulta y coordinación.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pilares */}
      <div className="bg-white p-8 sm:p-12 border border-[#E9DFCF]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C6A15B] font-semibold block mb-1">
            Nuestros Pilares
          </span>
          <h3 className="font-serif text-3xl text-stone-900 font-normal">
            Compromiso con la excelencia
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#C6A15B] mx-auto">
              <Gem className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-stone-900 font-medium">Selección Rigurosa</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Cada pieza pasa por un estricto control de engastes, bisagras y broches para asegurar la máxima comodidad de uso.
            </p>
          </div>

          <div className="space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#C6A15B] mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-stone-900 font-medium">Calidad Comprobada</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Piezas hipoalergénicas diseñadas para cuidar tu piel y mantener su lustre característico por años.
            </p>
          </div>

          <div className="space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F8F5EF] flex items-center justify-center text-[#C6A15B] mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg text-stone-900 font-medium">Empaque de Obsequio</h4>
            <p className="text-xs text-stone-500 leading-relaxed">
              Cada orden incluye estuche acolchado y bolsa de boutique lista para entregar a esa persona especial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

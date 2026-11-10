import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useCart();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto bg-brand-primary text-white p-4 shadow-xl border border-[#C6A15B]/40 flex items-start gap-3 transition-all transform animate-in slide-in-from-bottom-5"
          role="alert"
        >
          {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#C6A15B] shrink-0 mt-0.5" />}
          {n.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />}
          {n.type === 'info' && <Info className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />}
          
          <div className="flex-1 text-xs leading-relaxed text-[#F8F5EF]">
            {n.message}
          </div>

          <button
            onClick={() => removeNotification(n.id)}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar notificación"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

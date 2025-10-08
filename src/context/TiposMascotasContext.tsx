import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TipoMascota {
  id: number;
  nombre: string; // Ej: Perro, Gato, Ave...
  descripcion: string;
  icono: string; // URL o nombre de ícono
}

interface TiposMascotasContextType {
  tipos: TipoMascota[];
  agregarTipoMascota: (nuevo: TipoMascota) => void;
  editarTipoMascota: (id: number, datos: Partial<TipoMascota>) => void;
  eliminarTipoMascota: (id: number) => void;
}

const TiposMascotasContext = createContext<TiposMascotasContextType | undefined>(undefined);

export const TiposMascotasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tipos, setTipos] = useState<TipoMascota[]>([
    {
      id: 1,
      nombre: 'Perro',
      descripcion: 'El mejor amigo del hombre 🐶',
      icono: 'https://cdn-icons-png.flaticon.com/512/616/616408.png',
    },
    {
      id: 2,
      nombre: 'Gato',
      descripcion: 'Independiente pero cariñoso 🐱',
      icono: 'https://cdn-icons-png.flaticon.com/512/616/616430.png',
    },
    {
      id: 3,
      nombre: 'Ave',
      descripcion: 'Pequeños cantores y coloridos 🐦',
      icono: 'https://cdn-icons-png.flaticon.com/512/616/616489.png',
    },
  ]);

  const agregarTipoMascota = (nuevo: TipoMascota) => {
    setTipos((prev) => [...prev, { ...nuevo, id: prev.length + 1 }]);
  };

  const editarTipoMascota = (id: number, datos: Partial<TipoMascota>) => {
    setTipos((prev) => prev.map((t) => (t.id === id ? { ...t, ...datos } : t)));
  };

  const eliminarTipoMascota = (id: number) => {
    setTipos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TiposMascotasContext.Provider
      value={{ tipos, agregarTipoMascota, editarTipoMascota, eliminarTipoMascota }}
    >
      {children}
    </TiposMascotasContext.Provider>
  );
};

export const useTiposMascotas = (): TiposMascotasContextType => {
  const ctx = useContext(TiposMascotasContext);
  if (!ctx) throw new Error('useTiposMascotas debe usarse dentro de TiposMascotasProvider');
  return ctx;
};

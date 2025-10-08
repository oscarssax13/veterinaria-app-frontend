import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Mascota {
  id: number;
  nombre: string;
  especie: string;
  raza: string;
  fechaNacimiento: string;
  sexo: string;
  color: string;
  propietario: string;
  notas: string;
  estado: string;
  foto: string;
}

interface MascotasContextType {
  mascotas: Mascota[];
  agregarMascota: (nueva: Mascota) => void;
  editarMascota: (id: number, datos: Partial<Mascota>) => void;
}

const MascotasContext = createContext<MascotasContextType | undefined>(undefined);

export const MascotasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mascotas, setMascotas] = useState<Mascota[]>([
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      fechaNacimiento: "2020-01-15",
      sexo: "Macho",
      color: "Dorado",
      propietario: "Juan Pérez",
      notas: "Vacunado y desparasitado.",
      estado: "Activo",
      foto: "https://placedog.net/300/200?id=1",
    },
    {
      id: 2,
      nombre: "Misty",
      especie: "Gato",
      raza: "Siamés",
      fechaNacimiento: "2021-06-10",
      sexo: "Hembra",
      color: "Gris y blanco",
      propietario: "Ana Gómez",
      notas: "Esterilizada, tranquila.",
      estado: "Activo",
      foto: "https://cdn2.thecatapi.com/images/9j5.jpg",
    },
  ]);

  const agregarMascota = (nueva: Mascota) => {
    setMascotas([...mascotas, { ...nueva, id: mascotas.length + 1 }]);
  };

  const editarMascota = (id: number, datos: Partial<Mascota>) => {
    setMascotas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...datos } : m))
    );
  };

  return (
    <MascotasContext.Provider value={{ mascotas, agregarMascota, editarMascota }}>
      {children}
    </MascotasContext.Provider>
  );
};

export const useMascotas = (): MascotasContextType => {
  const ctx = useContext(MascotasContext);
  if (!ctx) throw new Error("useMascotas debe usarse dentro de MascotasProvider");
  return ctx;
};

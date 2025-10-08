import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CategoriaProducto {
  id: number;
  nombre: string; // Ej: Alimento, Medicamento, Accesorio
  descripcion: string;
  icono: string; // URL de imagen o ícono
}

interface CategoriasProductosContextType {
  categorias: CategoriaProducto[];
  agregarCategoria: (nuevo: CategoriaProducto) => void;
  editarCategoria: (id: number, datos: Partial<CategoriaProducto>) => void;
  eliminarCategoria: (id: number) => void;
}

const CategoriasProductosContext = createContext<CategoriasProductosContextType | undefined>(
  undefined
);

export const CategoriasProductosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categorias, setCategorias] = useState<CategoriaProducto[]>([
    {
      id: 1,
      nombre: "Alimento",
      descripcion: "Comida balanceada y nutritiva 🥩",
      icono: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
    },
    {
      id: 2,
      nombre: "Medicamento",
      descripcion: "Tratamientos y vitaminas 💊",
      icono: "https://cdn-icons-png.flaticon.com/512/2966/2966489.png",
    },
    {
      id: 3,
      nombre: "Accesorios",
      descripcion: "Juguetes, correas y más 🎾",
      icono: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    },
  ]);

  const agregarCategoria = (nuevo: CategoriaProducto) => {
    setCategorias([...categorias, { ...nuevo, id: Date.now() }]);
  };

  const editarCategoria = (id: number, datos: Partial<CategoriaProducto>) => {
    setCategorias((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...datos } : c))
    );
  };

  const eliminarCategoria = (id: number) => {
    setCategorias((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <CategoriasProductosContext.Provider
      value={{ categorias, agregarCategoria, editarCategoria, eliminarCategoria }}
    >
      {children}
    </CategoriasProductosContext.Provider>
  );
};

export const useCategoriasProductos = (): CategoriasProductosContextType => {
  const ctx = useContext(CategoriasProductosContext);
  if (!ctx)
    throw new Error(
      "useCategoriasProductos debe usarse dentro de CategoriasProductosProvider"
    );
  return ctx;
};

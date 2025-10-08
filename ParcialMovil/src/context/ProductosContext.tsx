import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
}

interface ProductosContextType {
  productos: Producto[];
  agregarProducto: (nuevo: Producto) => void;
  editarProducto: (id: number, datos: Partial<Producto>) => void;
  eliminarProducto: (id: number) => void; // 👈 Nueva función
}

const ProductosContext = createContext<ProductosContextType | undefined>(undefined);

export const ProductosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([
    {
      id: 1,
      nombre: "Vacuna Antirrábica",
      categoria: "Medicamento",
      descripcion: "Vacuna para prevenir la rabia en perros y gatos.",
      precio: 25000,
      stock: 50,
      imagen: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    },
    {
      id: 2,
      nombre: "Collar Antipulgas",
      categoria: "Accesorio",
      descripcion: "Collar para prevenir pulgas y garrapatas.",
      precio: 18000,
      stock: 30,
      imagen: "https://cdn-icons-png.flaticon.com/512/2934/2934754.png",
    },
  ]);

  const agregarProducto = (nuevo: Producto) => {
    setProductos([...productos, { ...nuevo, id: Date.now() }]);
  };

  const editarProducto = (id: number, datos: Partial<Producto>) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...datos } : p))
    );
  };

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  }; 

  return (
    <ProductosContext.Provider
      value={{ productos, agregarProducto, editarProducto, eliminarProducto }}
    >
      {children}
    </ProductosContext.Provider>
  );
};

export const useProductos = (): ProductosContextType => {
  const ctx = useContext(ProductosContext);
  if (!ctx) throw new Error("useProductos debe usarse dentro de ProductosProvider");
  return ctx;
};

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: string;
  img: string;
}

interface UsuariosContextType {
  usuarios: Usuario[];
  agregarUsuario: (nuevo: Usuario) => void;
  editarUsuario: (id: number, datos: Partial<Usuario>) => void;
}

const UsuariosContext = createContext<UsuariosContextType | undefined>(undefined);

export const UsuariosProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: 1,
      nombre: 'Carlos Mendoza',
      correo: 'carlos.mendoza@example.com',
      rol: 'Administrador',
      estado: 'Activo',
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 2,
      nombre: 'Sofía Ramírez',
      correo: 'sofia.ramirez@example.com',
      rol: 'Veterinario',
      estado: 'Activo',
      img: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ]);

  const agregarUsuario = (nuevo: Usuario) => {
    setUsuarios([...usuarios, { ...nuevo, id: usuarios.length + 1 }]);
  };

  const editarUsuario = (id: number, datos: Partial<Usuario>) => {
    setUsuarios((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...datos } : u))
    );
  };

  return (
    <UsuariosContext.Provider value={{ usuarios, agregarUsuario, editarUsuario }}>
      {children}
    </UsuariosContext.Provider>
  );
};

export const useUsuarios = (): UsuariosContextType => {
  const ctx = useContext(UsuariosContext);
  if (!ctx) throw new Error('useUsuarios debe usarse dentro de UsuariosProvider');
  return ctx;
};

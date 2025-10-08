import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
  IonIcon,
  IonFab,
  IonFabButton,
  IonButtons,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useUsuarios } from '../context/UsuariosContext';
import '../theme/Usuarios.css';
import DetalleUsuario from './DetalleUsuario';
const Usuarios: React.FC = () => {
  const [search, setSearch] = useState('');
  const { usuarios } = useUsuarios();

  // Filtrar por búsqueda
  const filtered = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      {/* Encabezado */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuarios</IonTitle>

          {/* Botón superior para agregar */}
          <IonButtons slot="end">
            <IonFabButton
              size="small"
              color="success"
              routerLink="/crear-usuario"
            >
              <IonIcon icon={add} />
            </IonFabButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Contenido principal */}
      <IonContent fullscreen className="ion-padding">
        {/* Buscador */}
        <IonSearchbar
          value={search}
          onIonChange={(e) => setSearch(e.detail.value!)}
          placeholder="Buscar usuarios"
        />

        {/* Lista de usuarios */}
        <IonList>
          {filtered.map((u) => (
            <IonItem
              key={u.id}
              button
              detail
              routerLink={`/detalle-usuario?id=${u.id}`}
            >
              <IonAvatar slot="start">
                <img src={u.img} alt={u.nombre} />
              </IonAvatar>

              <IonLabel>
                <h2>{u.nombre}</h2>
                <p>{u.rol}</p>
              </IonLabel>

              <IonBadge
                color={u.estado === 'Activo' ? 'success' : 'medium'}
              >
                {u.estado}
              </IonBadge>
            </IonItem>
          ))}
        </IonList>

        {/* Botón flotante */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="success" routerLink="/crear-usuario">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Usuarios;

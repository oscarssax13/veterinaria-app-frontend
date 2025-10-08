import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonAvatar,
  IonLabel,
  IonChip,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/react';
import { useUsuarios } from '../context/UsuariosContext';
import { useLocation, useHistory } from 'react-router-dom';

const DetalleUsuario: React.FC = () => {
  const { usuarios } = useUsuarios();
  const location = useLocation();
  const history = useHistory();

  // Leer el ID desde la URL
  const query = new URLSearchParams(location.search);
  const id = Number(query.get('id'));

  // Buscar usuario
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/usuarios" />
            </IonButtons>
            <IonTitle>Usuario no encontrado</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p>No se encontró el usuario.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/usuarios" />
          </IonButtons>
          <IonTitle>Detalles del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        <IonAvatar style={{ margin: '0 auto', width: '100px', height: '100px' }}>
          <img src={usuario.img} alt={usuario.nombre} />
        </IonAvatar>

        <h2 style={{ marginTop: '10px' }}>{usuario.nombre}</h2>
        <p style={{ color: '#777' }}>{usuario.correo}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
          <IonChip color="primary">{usuario.rol}</IonChip>
          <IonChip color={usuario.estado === 'Activo' ? 'success' : 'medium'}>
            {usuario.estado}
          </IonChip>
        </div>

        <IonCard style={{ marginTop: '20px', textAlign: 'left' }}>
          <IonCardContent>
            <IonLabel>
              <b>Nombre:</b> {usuario.nombre}
            </IonLabel>
            <br />
            <IonLabel>
              <b>Correo:</b> {usuario.correo}
            </IonLabel>
            <br />
            <IonLabel>
              <b>Rol:</b> {usuario.rol}
            </IonLabel>
            <br />
            <IonLabel>
              <b>Estado:</b> {usuario.estado}
            </IonLabel>
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          color="success"
          onClick={() => history.push(`/editar-usuario?id=${usuario.id}`)}
        >
          Editar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetalleUsuario;

import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonRadioGroup, IonRadio, IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useUsuarios } from '../context/UsuariosContext';

const CrearUsuario: React.FC = () => {
  const { agregarUsuario } = useUsuarios();
  const history = useHistory();

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    rol: '',
    estado: 'Activo',
    img: 'https://randomuser.me/api/portraits/lego/2.jpg',
  });

  const handleSubmit = () => {
    if (!form.nombre || !form.correo || !form.rol) {
      alert('Por favor complete todos los campos');
      return;
    }
    agregarUsuario({ ...form, id: Date.now() });
    history.push('/usuarios');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/usuarios" />
          </IonButtons>
          <IonTitle>Crear Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre completo</IonLabel>
          <IonInput
            value={form.nombre}
            onIonChange={(e) => setForm({ ...form, nombre: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Correo electrónico</IonLabel>
          <IonInput
            value={form.correo}
            onIonChange={(e) => setForm({ ...form, correo: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Rol</IonLabel>
          <IonSelect
            value={form.rol}
            onIonChange={(e) => setForm({ ...form, rol: e.detail.value })}
          >
            <IonSelectOption value="Administrador">Administrador</IonSelectOption>
            <IonSelectOption value="Veterinario">Veterinario</IonSelectOption>
            <IonSelectOption value="Asistente">Asistente</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Estado</IonLabel>
          <IonRadioGroup
            value={form.estado}
            onIonChange={(e) => setForm({ ...form, estado: e.detail.value })}
          >
            <IonItem lines="none">
              <IonLabel>Activo</IonLabel>
              <IonRadio slot="start" value="Activo" />
            </IonItem>
            <IonItem lines="none">
              <IonLabel>Inactivo</IonLabel>
              <IonRadio slot="start" value="Inactivo" />
            </IonItem>
          </IonRadioGroup>
        </IonItem>

        <IonButton expand="block" color="success" onClick={handleSubmit}>
          Crear Usuario
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CrearUsuario;

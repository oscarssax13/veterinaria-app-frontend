import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonContent, IonItem, IonLabel, IonInput, IonTextarea,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useTiposMascotas } from '../context/TiposMascotasContext';

const CrearTipoMascota: React.FC = () => {
  const { agregarTipoMascota } = useTiposMascotas();
  const history = useHistory();

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    icono: 'https://cdn-icons-png.flaticon.com/512/616/616408.png', // icono por defecto
  });

  const handleSubmit = () => {
    if (!form.nombre || !form.descripcion) {
      alert('Por favor complete todos los campos');
      return;
    }
    agregarTipoMascota({ ...form, id: Date.now() });
    history.push('/tipos-mascotas');
  };

  return (
    <IonPage>
      {/* Header */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tipos-mascotas" />
          </IonButtons>
          <IonTitle>Crear Tipo de Mascota</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* Contenido */}
      <IonContent className="ion-padding">
        {/* Nombre */}
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={form.nombre}
            placeholder="Ej: Perro, Gato, Ave..."
            onIonChange={(e) => setForm({ ...form, nombre: e.detail.value! })}
          />
        </IonItem>

        {/* Descripción */}
        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            value={form.descripcion}
            placeholder="Ej: Mamífero doméstico, fiel y juguetón"
            onIonChange={(e) => setForm({ ...form, descripcion: e.detail.value! })}
          />
        </IonItem>

        {/* Icono */}
        <IonItem>
          <IonLabel position="stacked">URL del ícono</IonLabel>
          <IonInput
            value={form.icono}
            placeholder="https://..."
            onIonChange={(e) => setForm({ ...form, icono: e.detail.value! })}
          />
        </IonItem>

        {/* Botón Guardar */}
        <IonButton expand="block" color="success" onClick={handleSubmit}>
          Crear Tipo de Mascota
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CrearTipoMascota;

import React, { useState, useEffect } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonAvatar,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useTiposMascotas } from '../context/TiposMascotasContext';

const EditarTipoMascota: React.FC = () => {
  const { tipos, editarTipoMascota } = useTiposMascotas();
  const history = useHistory();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const id = Number(query.get('id'));

  const tipo = tipos.find((t) => t.id === id);

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    icono: '',
  });

  useEffect(() => {
    if (tipo) {
      setForm({
        nombre: tipo.nombre,
        descripcion: tipo.descripcion,
        icono: tipo.icono,
      });
    }
  }, [tipo]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = () => {
    if (!tipo) {
      alert('⚠️ Tipo no encontrado');
      return;
    }

    editarTipoMascota(id, form);
    alert('✅ Cambios guardados correctamente');
    history.push('/tipos-mascotas');
  };

  if (!tipo) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tipos-mascotas" />
            </IonButtons>
            <IonTitle>Editar Tipo</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p>Tipo de mascota no encontrado</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/detalle-tipo-mascota?id=${id}`} />
          </IonButtons>
          <IonTitle>Editar Tipo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        <IonAvatar
          style={{
            margin: '0 auto',
            width: '100px',
            height: '100px',
            position: 'relative',
          }}
        >
          <img src={form.icono} alt="icono" />
          <IonIcon
            icon={pencil}
            color="success"
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              background: '#fff',
              borderRadius: '50%',
              padding: '5px',
            }}
          />
        </IonAvatar>

        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            name="nombre"
            value={form.nombre}
            onIonChange={handleChange}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            name="descripcion"
            value={form.descripcion}
            onIonChange={handleChange}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Icono (URL)</IonLabel>
          <IonInput
            name="icono"
            value={form.icono}
            onIonChange={handleChange}
          />
        </IonItem>

        <IonButton expand="block" color="success" onClick={handleSave}>
          Guardar Cambios
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditarTipoMascota;

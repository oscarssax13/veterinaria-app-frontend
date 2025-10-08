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
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonButton,
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useUsuarios } from '../context/UsuariosContext';

const EditarUsuario: React.FC = () => {
  const { usuarios, editarUsuario } = useUsuarios();
  const history = useHistory();
  const location = useLocation();

  // Leer el ID desde la URL: /editar-usuario?id=2
  const query = new URLSearchParams(location.search);
  const id = Number(query.get('id'));

  // Buscar el usuario correspondiente
  const usuario = usuarios.find((u) => u.id === id);

  // Estado local del formulario
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    rol: '',
    estado: '',
    img: '',
  });

  // Cargar datos del usuario al entrar
  useEffect(() => {
    if (usuario) {
      setForm({
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
        estado: usuario.estado,
        img: usuario.img,
      });
    }
  }, [usuario]);

  // Manejar cambios en los campos
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Guardar cambios
  const handleSave = () => {
    if (!usuario) {
      alert(' Usuario no encontrado');
      return;
    }

    editarUsuario(id, form);
    alert(' Cambios guardados correctamente');
    history.push('/usuarios');
  };

  // Si no se encontró el usuario
  if (!usuario) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/usuarios" />
            </IonButtons>
            <IonTitle>Editar Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p> Usuario no encontrado</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/detalle-usuario?id=${id}`} />
          </IonButtons>
          <IonTitle>Editar Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        {/* Foto del usuario */}
        <IonAvatar
          style={{
            margin: '0 auto',
            width: '100px',
            height: '100px',
            position: 'relative',
          }}
        >
          <img src={form.img} alt="foto" />
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

        {/* Formulario */}
        <IonItem>
          <IonLabel position="stacked">Nombre completo</IonLabel>
          <IonInput
            name="nombre"
            value={form.nombre}
            onIonChange={handleChange}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Correo electrónico</IonLabel>
          <IonInput
            name="correo"
            value={form.correo}
            onIonChange={handleChange}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Rol</IonLabel>
          <IonSelect
            name="rol"
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

        {/* Botones */}
        <IonButton fill="clear" color="success" className="ion-margin-top">
          Cambiar contraseña
        </IonButton>

        <IonButton expand="block" color="success" onClick={handleSave}>
          Guardar Cambios
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditarUsuario;

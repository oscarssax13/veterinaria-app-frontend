import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonTextarea,
  IonDatetime,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useMascotas } from "../context/MascotasContext";

const CrearMascota: React.FC = () => {
  const { agregarMascota } = useMascotas();
  const history = useHistory();

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    sexo: "",
    color: "",
    propietario: "",
    notas: "",
    estado: "Activo",
    foto: "https://placehold.co/100x100?text=Mascota",
  });

  const handleSubmit = () => {
    if (!form.nombre || !form.especie || !form.raza) {
      alert("Por favor complete todos los campos obligatorios");
      return;
    }
    agregarMascota({ ...form, id: Date.now() });
    history.push("/mascotas");
  };

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/mascotas" />
          </IonButtons>
          <IonTitle>Crear Mascota</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Contenido */}
      <IonContent className="ion-padding">
        {/* Nombre */}
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={form.nombre}
            onIonChange={(e) => setForm({ ...form, nombre: e.detail.value! })}
          />
        </IonItem>

        {/* Especie */}
        <IonItem>
          <IonLabel position="stacked">Especie</IonLabel>
          <IonSelect
            value={form.especie}
            onIonChange={(e) =>
              setForm({ ...form, especie: e.detail.value || "" })
            }
          >
            <IonSelectOption value="Perro">Perro</IonSelectOption>
            <IonSelectOption value="Gato">Gato</IonSelectOption>
            <IonSelectOption value="Pez">Pez</IonSelectOption>
            <IonSelectOption value="Ave">Ave</IonSelectOption>
            <IonSelectOption value="Reptil">Reptil</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Raza */}
        <IonItem>
          <IonLabel position="stacked">Raza</IonLabel>
          <IonInput
            value={form.raza}
            onIonChange={(e) => setForm({ ...form, raza: e.detail.value! })}
          />
        </IonItem>

        {/* Fecha de nacimiento */}
        <IonItem>
          <IonLabel position="stacked">Fecha de nacimiento</IonLabel>
          <IonDatetime
            presentation="date"
            value={form.fechaNacimiento}
            onIonChange={(e) => {
              const value = e.detail.value;
              setForm({ ...form, fechaNacimiento: typeof value === "string" ? value : "" });
            }}
          />
        </IonItem>

        {/* Sexo */}
        <IonItem>
          <IonLabel position="stacked">Sexo</IonLabel>
          <IonSelect
            value={form.sexo}
            onIonChange={(e) =>
              setForm({ ...form, sexo: e.detail.value || "" })
            }
          >
            <IonSelectOption value="Macho">Macho</IonSelectOption>
            <IonSelectOption value="Hembra">Hembra</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Color */}
        <IonItem>
          <IonLabel position="stacked">Color</IonLabel>
          <IonInput
            value={form.color}
            onIonChange={(e) => setForm({ ...form, color: e.detail.value! })}
          />
        </IonItem>

        {/* Propietario */}
        <IonItem>
          <IonLabel position="stacked">Propietario</IonLabel>
          <IonInput
            value={form.propietario}
            onIonChange={(e) =>
              setForm({ ...form, propietario: e.detail.value! })
            }
          />
        </IonItem>

        {/* Notas médicas */}
        <IonItem>
          <IonLabel position="stacked">Notas médicas iniciales</IonLabel>
          <IonTextarea
            value={form.notas}
            onIonChange={(e) => setForm({ ...form, notas: e.detail.value! })}
          />
        </IonItem>

        {/* Estado */}
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

        {/* Botón Guardar */}
        <IonButton expand="block" color="success" onClick={handleSubmit}>
          Crear Mascota
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CrearMascota;

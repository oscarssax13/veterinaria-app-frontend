import React, { useState, useEffect } from "react";
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
  IonButton,
  IonTextarea,
  IonDatetime,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useMascotas } from "../context/MascotasContext";

const EditarMascota: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = Number(query.get("id"));

  const { editarMascota, mascotas } = useMascotas();

  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    fechaNacimiento: "",
    sexo: "",
    color: "",
    propietario: "",
    notas: "",
  });

  useEffect(() => {
    const mascota = mascotas.find((m) => m.id === id);
    if (mascota) {
      setForm({
        nombre: mascota.nombre,
        especie: mascota.especie,
        raza: mascota.raza,
        fechaNacimiento: mascota.fechaNacimiento,
        sexo: mascota.sexo,
        color: mascota.color,
        propietario: mascota.propietario,
        notas: mascota.notas,
      });
    }
  }, [id, mascotas]);

  const handleSave = () => {
    editarMascota(id, form);
    alert("Cambios guardados correctamente ✅");
    history.push(`/detalle-mascota?id=${id}`);
  };

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/detalle-mascota?id=${id}`} />
          </IonButtons>
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            Editar Mascota
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Contenido */}
      <IonContent
        className="ion-padding"
        style={{ background: "#fff", color: "#000" }}
      >
        {/* Nombre */}
        <IonItem lines="full">
          <IonLabel position="stacked">Nombre de la mascota</IonLabel>
          <IonInput
            value={form.nombre}
            placeholder="Ej: Max"
            onIonChange={(e) =>
              setForm({ ...form, nombre: e.detail.value || "" })
            }
          />
        </IonItem>

        {/* Especie */}
        <IonItem lines="full">
          <IonLabel>Especie</IonLabel>
          <IonSelect
            value={form.especie}
            placeholder="Selecciona la especie"
            onIonChange={(e) =>
              setForm({ ...form, especie: e.detail.value })
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
        <IonItem lines="full">
          <IonLabel position="stacked">Raza</IonLabel>
          <IonInput
            value={form.raza}
            placeholder="Ej: Golden Retriever"
            onIonChange={(e) =>
              setForm({ ...form, raza: e.detail.value || "" })
            }
          />
        </IonItem>

        {/* Fecha de nacimiento */}
        <IonItem lines="full">
          <IonLabel position="stacked">Fecha de nacimiento</IonLabel>
          <IonDatetime
            presentation="date"
            value={form.fechaNacimiento}
            onIonChange={(e) => {
              const value = e.detail.value;
              setForm({
                ...form,
                fechaNacimiento: Array.isArray(value)
                  ? value[0] || ""
                  : value || "",
              });
            }}
          />
        </IonItem>

        {/* Sexo */}
        <IonItem lines="full">
          <IonLabel>Sexo</IonLabel>
          <IonSelect
            value={form.sexo}
            placeholder="Selecciona"
            onIonChange={(e) =>
              setForm({ ...form, sexo: e.detail.value })
            }
          >
            <IonSelectOption value="Macho">Macho</IonSelectOption>
            <IonSelectOption value="Hembra">Hembra</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* Color */}
        <IonItem lines="full">
          <IonLabel position="stacked">Color</IonLabel>
          <IonInput
            value={form.color}
            placeholder="Ej: Dorado"
            onIonChange={(e) =>
              setForm({ ...form, color: e.detail.value || "" })
            }
          />
        </IonItem>

        {/* Propietario */}
        <IonItem lines="full">
          <IonLabel position="stacked">Propietario</IonLabel>
          <IonInput
            value={form.propietario}
            placeholder="Ej: Juan Pérez"
            onIonChange={(e) =>
              setForm({ ...form, propietario: e.detail.value || "" })
            }
          />
        </IonItem>

        {/* Notas médicas */}
        <IonItem lines="full">
          <IonLabel position="stacked">Notas médicas iniciales</IonLabel>
          <IonTextarea
            placeholder="Ej: Vacunado, sin antecedentes..."
            value={form.notas}
            onIonChange={(e) =>
              setForm({ ...form, notas: e.detail.value || "" })
            }
          />
        </IonItem>

        {/* Botón Guardar */}
        <IonButton
          expand="block"
          color="success"
          className="ion-margin-top"
          onClick={handleSave}
          style={{
            "--background": "#00C851",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          Guardar Cambios
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditarMascota;
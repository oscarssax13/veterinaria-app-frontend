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
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useCategoriasProductos } from "../context/CategoriasProductosContext";

const CrearCategoriaProducto: React.FC = () => {
  const { agregarCategoria } = useCategoriasProductos();
  const history = useHistory();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  const handleSubmit = () => {
    if (!form.nombre || !form.descripcion || !form.icono) {
      alert("Por favor complete todos los campos");
      return;
    }
    agregarCategoria({ ...form, id: Date.now() });
    history.push("/categorias-productos");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categorias-productos" />
          </IonButtons>
          <IonTitle>Nueva Categoría</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Nombre</IonLabel>
          <IonInput
            value={form.nombre}
            onIonChange={(e) => setForm({ ...form, nombre: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonInput
            value={form.descripcion}
            onIonChange={(e) =>
              setForm({ ...form, descripcion: e.detail.value! })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Icono (URL)</IonLabel>
          <IonInput
            value={form.icono}
            onIonChange={(e) => setForm({ ...form, icono: e.detail.value! })}
          />
        </IonItem>

        <IonButton expand="block" color="success" onClick={handleSubmit}>
          Crear Categoría
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CrearCategoriaProducto;

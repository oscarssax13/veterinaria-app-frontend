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
  IonButton,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useCategoriasProductos } from "../context/CategoriasProductosContext";

const EditarCategoriaProducto: React.FC = () => {
  const { categorias, editarCategoria } = useCategoriasProductos();
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  const categoria = categorias.find((c) => c.id === id);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    icono: "",
  });

  useEffect(() => {
    if (categoria) {
      setForm({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        icono: categoria.icono,
      });
    }
  }, [categoria]);

  const handleSubmit = () => {
    if (!form.nombre || !form.descripcion || !form.icono) {
      alert("Por favor complete todos los campos");
      return;
    }
    editarCategoria(id, form);
    history.push("/categorias-productos");
  };

  if (!categoria) {
    return <p style={{ padding: 20 }}>Categoría no encontrada</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categorias-productos" />
          </IonButtons>
          <IonTitle>Editar Categoría</IonTitle>
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
          Guardar Cambios
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditarCategoriaProducto;

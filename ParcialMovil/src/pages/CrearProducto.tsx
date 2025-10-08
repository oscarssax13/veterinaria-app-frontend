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
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

const CrearProducto: React.FC = () => {
  const { agregarProducto } = useProductos();
  const history = useHistory();

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const handleSubmit = () => {
    if (
      !form.nombre ||
      !form.categoria ||
      !form.descripcion ||
      !form.precio ||
      !form.stock
    ) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    agregarProducto({
      id: Date.now(),
      nombre: form.nombre,
      categoria: form.categoria,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      imagen:
        form.imagen ||
        "https://cdn-icons-png.flaticon.com/512/747/747376.png",
    });

    alert("✅ Producto agregado correctamente");
    history.push("/productos");
  };

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle>Nuevo Producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Formulario */}
      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        <IonItem>
          <IonLabel position="stacked">Nombre del producto</IonLabel>
          <IonInput
            placeholder="Ej: Shampoo para perros"
            value={form.nombre}
            onIonChange={(e) => setForm({ ...form, nombre: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Categoría</IonLabel>
          <IonSelect
            value={form.categoria}
            onIonChange={(e) => setForm({ ...form, categoria: e.detail.value! })}
          >
            <IonSelectOption value="Medicamento">Medicamento</IonSelectOption>
            <IonSelectOption value="Accesorio">Accesorio</IonSelectOption>
            <IonSelectOption value="Alimento">Alimento</IonSelectOption>
            <IonSelectOption value="Higiene">Higiene</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Descripción</IonLabel>
          <IonTextarea
            placeholder="Breve descripción del producto"
            rows={3}
            value={form.descripcion}
            onIonChange={(e) =>
              setForm({ ...form, descripcion: e.detail.value! })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio (COP)</IonLabel>
          <IonInput
            type="number"
            placeholder="Ej: 25000"
            value={form.precio}
            onIonChange={(e) => setForm({ ...form, precio: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Stock</IonLabel>
          <IonInput
            type="number"
            placeholder="Ej: 50"
            value={form.stock}
            onIonChange={(e) => setForm({ ...form, stock: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">URL de imagen (opcional)</IonLabel>
          <IonInput
            type="url"
            placeholder="https://ejemplo.com/imagen.png"
            value={form.imagen}
            onIonChange={(e) => setForm({ ...form, imagen: e.detail.value! })}
          />
        </IonItem>

        <IonButton
          expand="block"
          color="success"
          className="ion-margin-top"
          onClick={handleSubmit}
        >
          Guardar Producto
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CrearProducto;

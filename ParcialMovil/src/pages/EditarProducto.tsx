import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonAlert,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

const EditarProducto: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { productos, editarProducto } = useProductos();

  const query = new URLSearchParams(location.search);
  const id = Number(query.get("id"));

  const producto = productos.find((p) => p.id === id);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const [alertMensaje, setAlertMensaje] = useState("");

  useEffect(() => {
    if (producto) {
      setForm({
        nombre: producto.nombre,
        categoria: producto.categoria,
        descripcion: producto.descripcion,
        precio: producto.precio.toString(),
        stock: producto.stock.toString(),
        imagen: producto.imagen,
      });
    }
  }, [producto]);

  const handleGuardar = () => {
    if (!form.nombre || !form.categoria || !form.descripcion || !form.precio || !form.stock) {
      setAlertMensaje("⚠️ Por favor, complete todos los campos obligatorios.");
      return;
    }

    if (!producto) {
      setAlertMensaje("⚠️ Producto no encontrado.");
      return;
    }

    editarProducto(id, {
      nombre: form.nombre,
      categoria: form.categoria,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock),
      imagen: form.imagen,
    });

    setAlertMensaje("✅ Producto actualizado correctamente.");
  };

  const handleAlertDismiss = () => {
    setAlertMensaje("");
    if (alertMensaje === "✅ Producto actualizado correctamente.") {
      history.push("/productos");
    }
  };

  if (!producto) {
    // Mostrar mensaje si el producto no existe
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/productos" />
            </IonButtons>
            <IonTitle>Editar Producto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <p>⚠️ Producto no encontrado</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/productos`} />
          </IonButtons>
          <IonTitle>Editar Producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        <IonItem>
          <IonLabel position="stacked">Nombre del producto</IonLabel>
          <IonInput
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
            rows={3}
            value={form.descripcion}
            onIonChange={(e) => setForm({ ...form, descripcion: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Precio (COP)</IonLabel>
          <IonInput
            type="number"
            value={form.precio}
            onIonChange={(e) => setForm({ ...form, precio: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Stock</IonLabel>
          <IonInput
            type="number"
            value={form.stock}
            onIonChange={(e) => setForm({ ...form, stock: e.detail.value! })}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">URL de imagen (opcional)</IonLabel>
          <IonInput
            type="url"
            value={form.imagen}
            onIonChange={(e) => setForm({ ...form, imagen: e.detail.value! })}
          />
        </IonItem>

        <IonButton expand="block" color="success" className="ion-margin-top" onClick={handleGuardar}>
          Guardar Cambios
        </IonButton>

        {/* Alertas */}
        <IonAlert
          isOpen={!!alertMensaje}
          onDidDismiss={handleAlertDismiss}
          header="Información"
          message={alertMensaje}
          buttons={["OK"]}
        />
      </IonContent>
    </IonPage>
  );
};

export default EditarProducto;

import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonAlert,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";
import { createOutline, trashOutline } from "ionicons/icons";

const DetalleProducto: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { productos, eliminarProducto } = useProductos();

  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));
  const [producto, setProducto] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const p = productos.find((prod) => prod.id === id);
    if (p) {
      setProducto(p);
    }
  }, [id, productos]);

  const handleEliminar = () => {
    eliminarProducto(id);
    history.replace("/productos"); // ✅ replace para evitar volver al detalle eliminado
  };

  if (!producto) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/productos" />
            </IonButtons>
            <IonTitle>Detalle del Producto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" style={{ textAlign: "center" }}>
          <p style={{ color: "#888", marginTop: "30px" }}>
            ⚠️ Producto no encontrado
          </p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      {/* 🔹 Header */}
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/productos" />
          </IonButtons>
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            {producto.nombre}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Contenido */}
      <IonContent className="ion-padding" style={{ background: "#f9f9f9" }}>
        <IonCard
          style={{
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Imagen */}
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
            }}
          />

          {/* Info */}
          <IonCardHeader>
            <IonCardTitle
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {producto.nombre}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              <strong>Categoría:</strong> {producto.categoria}
            </p>
            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              <strong>Descripción:</strong> {producto.descripcion}
            </p>
            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              <strong>Precio:</strong> ${producto.precio.toLocaleString()}
            </p>
            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              <strong>Stock:</strong>{" "}
              {producto.stock > 0 ? `${producto.stock} unidades` : "Agotado"}
            </p>

            {/* 🔹 Botones */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <IonButton
                color="success"
                expand="block"
                onClick={() =>
                  history.push(`/editar-producto?id=${producto.id}`)
                }
              >
                <IonIcon icon={createOutline} slot="start" />
                Editar
              </IonButton>

              <IonButton
                color="danger"
                expand="block"
                onClick={() => setShowAlert(true)}
              >
                <IonIcon icon={trashOutline} slot="start" />
                Eliminar
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* 🔸 Confirmación de eliminación */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Eliminar Producto"
          message="¿Seguro que deseas eliminar este producto?"
          buttons={[
            { text: "Cancelar", role: "cancel" },
            { text: "Eliminar", handler: handleEliminar },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DetalleProducto;

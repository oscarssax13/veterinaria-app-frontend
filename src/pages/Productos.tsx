import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
} from "@ionic/react";
import { add, chevronForwardOutline, list } from "ionicons/icons"; // 👈 importamos list
import { useHistory } from "react-router-dom";
import { useProductos } from "../context/ProductosContext";

const Productos: React.FC = () => {
  const history = useHistory();
  const { productos } = useProductos();

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            Productos
          </IonTitle>
          <IonButtons slot="end">
            {/* Botón para ver categorías */}
            <IonButton onClick={() => history.push("/categorias-productos")}>
              <IonIcon icon={list} color="primary" />
            </IonButton>

            {/* Botón para crear producto */}
            <IonButton onClick={() => history.push("/crear-producto")}>
              <IonIcon icon={add} color="success" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Contenido */}
      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        {productos.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginTop: "30px",
              fontStyle: "italic",
            }}
          >
            No hay productos registrados 🧴
          </p>
        ) : (
          <IonGrid>
            <IonRow>
              {productos.map((p) => (
                <IonCol size="6" key={p.id}>
                  <IonCard
                    button
                    onClick={() =>
                      history.push(`/detalle-producto?id=${p.id}`)
                    }
                    style={{
                      borderRadius: "12px",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Imagen */}
                    <img
                      src={p.imagen}
                      alt={p.nombre}
                      style={{
                        width: "100%",
                        height: "140px",
                        objectFit: "cover",
                      }}
                    />

                    {/* Info */}
                    <IonCardHeader>
                      <IonCardTitle
                        style={{ fontSize: "1rem", fontWeight: "bold" }}
                      >
                        {p.nombre}
                      </IonCardTitle>
                      <IonCardSubtitle style={{ color: "#666" }}>
                        {p.categoria} — ${p.precio.toLocaleString()}
                      </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {/* Stock */}
                      <IonBadge
                        color={p.stock > 0 ? "success" : "danger"}
                        style={{ fontSize: "0.7rem" }}
                      >
                        {p.stock > 0 ? `Stock: ${p.stock}` : "Agotado"}
                      </IonBadge>

                      {/* Flecha detalle */}
                      <IonIcon
                        icon={chevronForwardOutline}
                        style={{ fontSize: "1.2rem", color: "#888" }}
                      />
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Productos;

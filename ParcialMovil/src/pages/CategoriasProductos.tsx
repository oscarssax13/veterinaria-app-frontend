import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonSearchbar,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonBadge,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useCategoriasProductos } from "../context/CategoriasProductosContext";

const CategoriasProductos: React.FC = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const { categorias } = useCategoriasProductos();

  // 🔎 Filtrar por búsqueda
  const filtered = categorias.filter((c) =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            Categorías de Productos
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push("/crear-categoria-producto")}>
              <IonIcon icon={add} color="success" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Lista */}
      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        <IonSearchbar
          value={search}
          onIonChange={(e) => setSearch(e.detail.value!)}
          placeholder="Buscar categorías"
          style={{ marginBottom: "15px" }}
        />

        {filtered.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginTop: "30px",
              fontStyle: "italic",
            }}
          >
            No hay categorías registradas 📦
          </p>
        ) : (
          <IonList>
            {filtered.map((c) => (
              <IonItem
                key={c.id}
                button
                detail
                onClick={() =>
                  history.push(`/editar-categoria-producto?id=${c.id}`)
                }
                style={{
                  borderRadius: "12px",
                  marginBottom: "12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  background: "#fff",
                }}
              >
                <IonAvatar
                  slot="start"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={c.icono}
                    alt={c.nombre}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </IonAvatar>

                <IonLabel>
                  <h2 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {c.nombre}
                  </h2>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    {c.descripcion}
                  </p>
                </IonLabel>

                <IonBadge
                  color="success"
                  style={{ fontSize: "0.7rem", alignSelf: "center" }}
                >
                  Categoría
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CategoriasProductos;

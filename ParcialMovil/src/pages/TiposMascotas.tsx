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
import { useTiposMascotas } from "../context/TiposMascotasContext";

const TiposMascotas: React.FC = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const { tipos } = useTiposMascotas();

  // 🔎 Filtrar por búsqueda
  const filtered = tipos.filter((t) =>
    t.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            Tipos de Mascotas
          </IonTitle>
          <IonButtons slot="end">
            {/* Botón para crear nuevo tipo */}
            <IonButton onClick={() => history.push("/crear-tipo-mascota")}>
              <IonIcon icon={add} color="success" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Lista de Tipos */}
      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        {/* Buscador */}
        <IonSearchbar
          value={search}
          onIonChange={(e) => setSearch(e.detail.value!)}
          placeholder="Buscar tipos de mascotas"
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
            No hay tipos de mascotas registrados 🐾
          </p>
        ) : (
          <IonList>
            {filtered.map((t) => (
              <IonItem
                key={t.id}
                button
                detail
                onClick={() =>
                  history.push(`/detalle-tipo-mascota?id=${t.id}`)
                }
                style={{
                  borderRadius: "12px",
                  marginBottom: "12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  background: "#fff",
                }}
              >
                {/* Icono circular */}
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
                    src={t.icono}
                    alt={t.nombre}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </IonAvatar>

                {/* Texto */}
                <IonLabel>
                  <h2 style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {t.nombre}
                  </h2>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    {t.descripcion}
                  </p>
                </IonLabel>

                {/* Badge */}
                <IonBadge
                  color="tertiary"
                  style={{
                    fontSize: "0.7rem",
                    alignSelf: "center",
                  }}
                >
                  Tipo
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TiposMascotas;

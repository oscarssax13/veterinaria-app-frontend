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
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from "@ionic/react";
import { add, options } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useMascotas } from "../context/MascotasContext"; // 👈 Contexto global de mascotas

const Mascotas: React.FC = () => {
  const history = useHistory();
  const { mascotas } = useMascotas(); // 👈 Usa las mascotas globales

  return (
    <IonPage>
      {/* 🔹 Encabezado */}
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            Mis Mascotas
          </IonTitle>
          <IonButtons slot="end">
            {/* Botón para crear nueva mascota */}
            <IonButton onClick={() => history.push("/crear-mascota")}>
              <IonIcon icon={add} color="success" />
            </IonButton>

            {/* Botón para gestionar tipos de mascotas */}
            <IonButton onClick={() => history.push("/tipos-mascotas")}>
              <IonIcon icon={options} color="success" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* 🔹 Lista de Mascotas */}
      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        {mascotas.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#777",
              marginTop: "30px",
              fontStyle: "italic",
            }}
          >
            No hay mascotas registradas 🐾
          </p>
        ) : (
          <IonList>
            {mascotas.map((m) => (
              <IonItem
                key={m.id}
                button
                detail
                onClick={() => history.push(`/detalle-mascota?id=${m.id}`)}
                style={{
                  borderRadius: "12px",
                  marginBottom: "12px",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  background: "#fff",
                }}
              >
                {/* Imagen rectangular */}
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    marginRight: "15px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={m.foto}
                    alt={m.nombre}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>

                {/* Texto */}
                <IonLabel>
                  <h2 style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                    {m.nombre}
                  </h2>
                  <p style={{ color: "#666", fontSize: "0.9rem" }}>
                    {m.especie} — {m.raza}
                  </p>
                </IonLabel>

                {/* Estado */}
                <IonBadge
                  color={m.estado === "Activo" ? "success" : "medium"}
                  style={{
                    fontSize: "0.7rem",
                    alignSelf: "center",
                  }}
                >
                  {m.estado}
                </IonBadge>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Mascotas;

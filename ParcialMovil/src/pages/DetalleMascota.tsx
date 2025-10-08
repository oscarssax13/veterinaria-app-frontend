import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { useLocation, useHistory } from "react-router-dom";
import { useMascotas } from "../context/MascotasContext";

const DetalleMascota: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = Number(query.get("id"));
  const { mascotas } = useMascotas();

  const mascota = mascotas.find((m) => m.id === id);

  if (!mascota) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/mascotas" />
            </IonButtons>
            <IonTitle>Mascota no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">Mascota no encontrada</IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/mascotas" />
          </IonButtons>
          <IonTitle>Detalles de {mascota.nombre}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding ion-text-center">
        <IonAvatar
          style={{ margin: "0 auto", width: "120px", height: "120px" }}
        >
          <img src={mascota.foto} alt={mascota.nombre} />
        </IonAvatar>

        <IonCard style={{ marginTop: "20px", textAlign: "left" }}>
          <IonCardContent>
            <p>
              <b>Nombre:</b> {mascota.nombre}
            </p>
            <p>
              <b>Especie:</b> {mascota.especie}
            </p>
            <p>
              <b>Raza:</b> {mascota.raza}
            </p>
            <p>
              <b>Estado:</b> {mascota.estado}
            </p>
            <p>
              <b>Fecha de nacimiento:</b> {mascota.fechaNacimiento}
            </p>
            <p>
              <b>Sexo:</b> {mascota.sexo}
            </p>
            <p>
              <b>Color:</b> {mascota.color}
            </p>
            <p>
              <b>Propietario:</b> {mascota.propietario}
            </p>
            <p>
              <b>Notas:</b> {mascota.notas}
            </p>
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="block"
          color="success"
          onClick={() => history.push(`/editar-mascota?id=${mascota.id}`)}
        >
          Editar Mascota
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default DetalleMascota;
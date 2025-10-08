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
import { useCategoriasProductos } from "../context/CategoriasProductosContext";
import { createOutline, trashOutline } from "ionicons/icons";

const DetalleCategoriaProducto: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { categorias, eliminarCategoria } = useCategoriasProductos();

  const params = new URLSearchParams(location.search);
  const id = Number(params.get("id"));

  const [categoria, setCategoria] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Esperar a que el contexto cargue y luego buscar la categoría
  useEffect(() => {
    if (categorias.length === 0) {
      // aún cargando datos del contexto
      return;
    }
    const c = categorias.find((cat) => cat.id === id);
    if (c) {
      setCategoria(c);
      setNotFound(false);
    } else {
      setCategoria(null);
      setNotFound(true);
    }
  }, [id, categorias]);

  const handleEliminar = () => {
    eliminarCategoria(id);
    // usar replace para evitar regresar a la vista eliminada con "back"
    history.replace("/categorias-productos");
  };

  // Si contexto aún no cargó y no hay `notFound`, no renderizamos nada (evita alert al volver)
  if (!categoria && !notFound) return null;

  // Si no existe la categoría (y ya se cargó el contexto), mostramos mensaje amigable
  if (!categoria && notFound) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="light">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/categorias-productos" />
            </IonButtons>
            <IonTitle>Detalle Categoría</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding" style={{ textAlign: "center" }}>
          <p style={{ color: "#888", marginTop: 30 }}>⚠️ Categoría no encontrada</p>
        </IonContent>
      </IonPage>
    );
  }

  // Vista principal con la categoría encontrada
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categorias-productos" />
          </IonButtons>
          <IonTitle style={{ color: "#00C851", fontWeight: "bold" }}>
            {categoria.nombre}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ background: "#fff" }}>
        <IonCard style={{ borderRadius: 16, boxShadow: "0 4px 12px rgba(0,0,0,0.08)", overflow: "hidden" }}>
          <img
            src={categoria.icono}
            alt={categoria.nombre}
            style={{
              width: "100%",
              height: 200,
              objectFit: "contain",
              padding: 20,
              background: "#fff",
            }}
          />

          <IonCardHeader>
            <IonCardTitle style={{ color: "#00C851", fontWeight: "bold" }}>
              {categoria.nombre}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p style={{ fontSize: "0.95rem", color: "#555" }}>
              <strong>Descripción:</strong> {categoria.descripcion}
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <IonButton
                color="success"
                expand="block"
                onClick={() => history.push(`/editar-categoria-producto?id=${categoria.id}`)}
              >
                <IonIcon icon={createOutline} slot="start" />
                Editar
              </IonButton>

              <IonButton color="danger" expand="block" onClick={() => setShowAlert(true)}>
                <IonIcon icon={trashOutline} slot="start" />
                Eliminar
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Confirmación de eliminación */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Eliminar categoría"
          message="¿Seguro que deseas eliminar esta categoría?"
          buttons={[
            { text: "Cancelar", role: "cancel" },
            { text: "Eliminar", handler: handleEliminar },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DetalleCategoriaProducto;

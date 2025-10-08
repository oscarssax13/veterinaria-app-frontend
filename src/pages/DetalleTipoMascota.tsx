import React, { useEffect, useState } from 'react';
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
} from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import { useTiposMascotas } from '../context/TiposMascotasContext';
import { createOutline, trashOutline } from 'ionicons/icons';

const DetalleTipoMascota: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { tipos, eliminarTipoMascota} = useTiposMascotas();

  const params = new URLSearchParams(location.search);
  const id = Number(params.get('id'));
  const [tipo, setTipo] = useState<any>(null);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const t = tipos.find((tipo) => tipo.id === id);
    if (t) setTipo(t);
  }, [id, tipos]);

  const handleEliminar = () => {
    eliminarTipoMascota(id);
    alert('🗑️ Tipo eliminado correctamente');
    history.push('/tipos-mascotas');
  };

  if (!tipo) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tipos-mascotas" />
          </IonButtons>
          <IonTitle>Detalle del Tipo</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ background: '#fff' }}>
        <IonCard style={{ borderRadius: '16px', boxShadow: '0 3px 10px rgba(0,0,0,0.1)' }}>
          <img
            src={tipo.icono}
            alt={tipo.nombre}
            style={{
              width: '100%',
              height: '220px',
              objectFit: 'contain',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px',
              padding: '20px',
            }}
          />
          <IonCardHeader>
            <IonCardTitle style={{ color: '#00C851', fontWeight: 'bold' }}>
              {tipo.nombre}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <p style={{ fontSize: '0.95rem', color: '#666' }}>
              <strong>Descripción:</strong> {tipo.descripcion}
            </p>

            {/* Botones */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <IonButton
                color="success"
                expand="block"
                onClick={() => history.push(`/editar-tipo-mascota?id=${tipo.id}`)}
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

        {/* Confirmación */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Eliminar Tipo"
          message="¿Seguro que deseas eliminar este tipo de mascota?"
          buttons={[
            { text: 'Cancelar', role: 'cancel' },
            { text: 'Eliminar', handler: handleEliminar },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default DetalleTipoMascota;

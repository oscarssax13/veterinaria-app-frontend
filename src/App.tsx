import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { person, cube, paw, pricetags } from "ionicons/icons";

/* 🧩 Páginas */
import Usuarios from "./pages/Usuarios";
import CrearUsuario from "./pages/CrearUsuario";
import DetalleUsuario from "./pages/DetalleUsuario";
import EditarUsuario from "./pages/EditarUsuario";

import Mascotas from "./pages/Mascotas";
import CrearMascota from "./pages/CrearMascota";
import DetalleMascota from "./pages/DetalleMascota";
import EditarMascota from "./pages/EditarMascota";

import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import DetalleProducto from "./pages/DetalleProducto";

import TiposMascotas from "./pages/TiposMascotas";
import CrearTipoMascota from "./pages/CrearTipoMascota"; 
import EditarTipoMascota from "./pages/EditarTipoMascota";
import DetalleTipoMascota from "./pages/DetalleTipoMascota";

import CategoriasProductos from "./pages/CategoriasProductos";
import CrearCategoriaProducto from "./pages/CrearCategoriaProducto";
import EditarCategoriaProducto from "./pages/EditarCategoriaProducto";
import DetalleCategoriaProducto from "./pages/DetalleCategoriaProducto";

/* 🧩 Contextos */
import { MascotasProvider } from "./context/MascotasContext";
import { UsuariosProvider } from "./context/UsuariosContext";
import { ProductosProvider } from "./context/ProductosContext";
import { TiposMascotasProvider } from "./context/TiposMascotasContext"; 
import { CategoriasProductosProvider } from "./context/CategoriasProductosContext";

/* 🎨 Estilos base de Ionic */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import { Layout } from "./Layouts/Layout";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <Layout>
    {/* ✅ Proveedores globales */}
    <UsuariosProvider>
      <MascotasProvider>
        <ProductosProvider>
          <TiposMascotasProvider>
            <CategoriasProductosProvider>
              <IonReactRouter>
                <IonTabs>
                  <IonRouterOutlet>
                    {/* 🐶 MASCOTAS */}
                    <Route exact path="/mascotas" component={Mascotas} />
                    <Route exact path="/crear-mascota" component={CrearMascota} />
                    <Route exact path="/detalle-mascota" component={DetalleMascota} />
                    <Route exact path="/editar-mascota" component={EditarMascota} />

                    {/* 👤 USUARIOS */}
                    <Route exact path="/usuarios" component={Usuarios} />
                    <Route exact path="/crear-usuario" component={CrearUsuario} />
                    <Route exact path="/detalle-usuario" component={DetalleUsuario} />
                    <Route exact path="/editar-usuario" component={EditarUsuario} />

                    {/* 📦 PRODUCTOS */}
                    <Route exact path="/productos" component={Productos} />
                    <Route exact path="/crear-producto" component={CrearProducto} />
                    <Route exact path="/detalle-producto" component={DetalleProducto} />
                    <Route exact path="/editar-producto" component={EditarProducto} />

                    {/* 🐾 TIPOS DE MASCOTAS */}
                    <Route exact path="/tipos-mascotas" component={TiposMascotas} />
                    <Route exact path="/crear-tipo-mascota" component={CrearTipoMascota} />
                    <Route exact path="/detalle-tipo-mascota" component={DetalleTipoMascota} />
                    <Route exact path="/editar-tipo-mascota" component={EditarTipoMascota} />

                    {/* 🏷️ CATEGORÍAS DE PRODUCTOS */}
                    <Route exact path="/categorias-productos" component={CategoriasProductos} />
                    <Route exact path="/crear-categoria-producto" component={CrearCategoriaProducto} />
                    <Route exact path="/detalle-categoria-producto" component={DetalleCategoriaProducto} />
                    <Route exact path="/editar-categoria-producto" component={EditarCategoriaProducto} />

                    {/* 🔁 Redirección por defecto */}
                    <Route exact path="/">
                      <Redirect to="/mascotas" />
                    </Route>
                  </IonRouterOutlet>

                  {/* 🔹 BARRA INFERIOR DE NAVEGACIÓN */}
                  <IonTabBar slot="bottom" style={{ "--background": "#fff" }}>
                    <IonTabButton tab="usuarios" href="/usuarios">
                      <IonIcon icon={person} style={{ color: "#888" }} />
                      <IonLabel style={{ color: "#888" }}>Usuarios</IonLabel>
                    </IonTabButton>

                    <IonTabButton tab="productos" href="/productos">
                      <IonIcon icon={cube} style={{ color: "#888" }} />
                      <IonLabel style={{ color: "#888" }}>Productos</IonLabel>
                    </IonTabButton>

  
                    <IonTabButton tab="mascotas" href="/mascotas">
                      <IonIcon icon={paw} style={{ color: "#00C851" }} />
                      <IonLabel style={{ color: "#00C851", fontWeight: "bold" }}>
                        Mascotas
                      </IonLabel>
                    </IonTabButton>
                  </IonTabBar>
                </IonTabs>
              </IonReactRouter>
            </CategoriasProductosProvider>
          </TiposMascotasProvider>
        </ProductosProvider>
      </MascotasProvider>
    </UsuariosProvider>
   </Layout>
  </IonApp>
);

export default App;

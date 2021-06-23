import { IonBadge, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { newspaperOutline, cartOutline, starOutline } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router';
import Basket from './basket';
import Coupon from './coupon';
import CouponDetail from './couponDetail';
import './Home.css';
import AuthContext from "../my-context";
import Point from './point';
import HeaderControls from '../components/headerComponent';

const Home: React.FC = () => {
  const { showTabs, basketInfo } = React.useContext(AuthContext);

  let tabBarStyle = showTabs ? undefined : { display: "none" };

  return (
    <IonReactRouter>
      <HeaderControls/>
          <IonTabs>
            <IonRouterOutlet>
              <Route path="/home/coupon" component={Coupon} exact={true} />
              <Route
                path="/home/coupon/detail"
                component={CouponDetail}
                exact={true}
              />
              <Route path="/home/basket" component={Basket} exact={true} />
              <Route path="/home/point" component={Point} exact={true} />
              <Redirect exact path="/home" to="/home/coupon" />
            </IonRouterOutlet>

            <IonTabBar
              slot="bottom"
              style={tabBarStyle}
            >
              <IonTabButton tab={"coupon"} href="/home/coupon">
                <IonIcon icon={newspaperOutline} />
                <IonLabel>Coupon</IonLabel>
              </IonTabButton>
              <IonTabButton tab={"basket"} href="/home/basket">
                <IonBadge color="warning">
                 {basketInfo && basketInfo.basketInfo && 
                   basketInfo.basketInfo.length
                   }
                  </IonBadge>
                <IonIcon icon={cartOutline} />
                <IonLabel>Basket</IonLabel>
              </IonTabButton>
              <IonTabButton tab={"point"} href="/home/point">
                {/* <IonBadge color="warning">P</IonBadge> */}
                <IonIcon icon={starOutline} />
                <IonLabel>Point</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
  );
};

export default Home;

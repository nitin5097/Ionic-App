import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonCardTitle,
} from "@ionic/react";
import { addCircleOutline } from "ionicons/icons";
import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";
import HeaderControls from "../components/headerComponent";

const CouponDetail: React.FC = () => {
  const { setShowTabs, couponDetail } = React.useContext(AuthContext);
  const coupon = couponDetail;
  const mountedRef = useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    setShowTabs(false);
    return () => {
      setShowTabs(true);
      mountedRef.current = false;
    };
  }, [setShowTabs]);
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <HeaderControls />
        <IonItem>
          <IonLabel color="medium">
            <h1>Coupon Detail</h1>
          </IonLabel>
        </IonItem>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard key={coupon.id}>
          <IonCardHeader>
            <IonCardTitle>{coupon.title}</IonCardTitle>
          </IonCardHeader>
          <IonItem>
            <IonImg src={coupon.picture_url} />
          </IonItem>

          <IonCardContent>
            <IonItem>
              <IonLabel className="ion-text-center">
                {coupon.discount_value} Points
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-center">{coupon.subtitle}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-center" color="secondary">
                Add to Basket
              </IonLabel>
              <IonIcon icon={addCircleOutline} slot="end" color="secondary" />
            </IonItem>
            <IonItem>
              <IonLabel className="ion-text-center ion-text-wrap">
                {coupon.ref}
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel
                onClick={() => {
                  history.goBack();
                }}
                color="secondary"
                className="ion-text-center"
              >
                Back to Coupon
              </IonLabel>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CouponDetail;

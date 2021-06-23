import {
  IonContent,
  IonHeader,
  IonPage,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRow,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonImg,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import React, { useRef, useState } from "react";
import validationMessage from "../resource/messages.json";
import AuthContext from "../my-context";

const stores = [
  {
    id: 1,
    code: "all",
    name: "All",
  },
  {
    id: 55,
    code: "minamiKu",
    name: "Minami Ku Shimizugaoka",
  },
  {
    id: 93,
    code: "sakaeKu",
    name: "Sakae Ku Sakuragicho",
  },
  {
    id: 184,
    code: "sakuraKu",
    name: "Sakura Ku Yamato",
  },
];
type Store = typeof stores[number];
const compareStoresWith = (o1: Store, o2: Store) => {
  return o1 && o2 ? o1.id === o2.id : o1 === o2;
};

const Basket: React.FC = () => {
  const { basketInfo } = React.useContext(AuthContext);
  const [coupons] = useState(basketInfo.basketInfo);
  type Coupons = typeof coupons[number];
  const [selectedCoupons, setSelectedCoupons] = useState<Coupons[]>([]);
  const [responseData, setResponseData] = useState(coupons);
  const [selectedStore, setSelectedStore] = useState<Store>({
    id: 1,
    code: "all",
    name: "All",
  });

  function storeFilter(value: any) {
    let filteredData: React.SetStateAction<Coupons[]> = [];
    if (value.length === 0) {
      setResponseData(selectedCoupons);
    } else {
      filteredData = selectedCoupons.filter((entry) => entry.id === value.id);
      setResponseData(filteredData);
    }
    setSelectedStore(value);
  }
  const mountedRef = useRef(false);
  React.useEffect(() => {
    if (coupons && coupons.length > 0) {
      mountedRef.current = true;
      setSelectedCoupons(coupons);
      let filteredData: React.SetStateAction<Coupons[]> = [];
      filteredData = coupons.filter(
        (result: { id: number }) =>
          result.id === selectedStore.id || selectedStore.id === 1
      );
      setResponseData(filteredData);
      return () => {
        mountedRef.current = false;
      };
    }
  }, [coupons, selectedStore.id]);

  return (
    <IonPage>
      <IonHeader>
        <br />
        <br />
        <br />
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol key="titleLabel">
              <IonItem>
                <IonLabel color="medium">
                  <h1>Basket</h1>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol key="selectStore">
              <IonItem>
                <IonLabel>Select a Store</IonLabel>
                <IonSelect
                  interface="action-sheet"
                  compareWith={compareStoresWith}
                  value={selectedStore}
                  onIonChange={(e) => storeFilter(e.detail.value)}
                >
                  {stores.map((store) => (
                    <IonSelectOption key={store.id} value={store}>
                      {store.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent>
        <br />
        <br />
        {(!responseData || responseData.length < 1) && (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle className="ion-text-wrap" color="danger">
                      {validationMessage.msg_8}
                    </IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        <IonGrid>
          <IonRow>
            {responseData &&
              responseData.map((coupon: any) => (
                <IonCol key={coupon.id}>
                  <IonCard
                    style={{ width: "140px" }}
                    className="ion-text-wrap ion-text-center"
                  >
                    <IonCardHeader>
                      <IonCardSubtitle className="ion-text-wrap">
                        {coupon.offer.subtitle}
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonItem>
                      <IonImg
                        src={coupon.offer.picture_url}
                        style={{ width: "100px", height: "110px" }}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel className="ion-text-wrap ion-text-center">
                        {coupon.points} Points
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel className="ion-text-wrap ion-text-center">
                        {coupon.offer.subtitle}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel
                        className="ion-text-wrap ion-text-center"
                        // style={{ fontSize: "11px", height: "30px" }}
                      >
                        Valid until {new Date(coupon.expired_at).getDate()} /{new Date(coupon.expired_at).getMonth()}/{new Date(coupon.expired_at).getUTCFullYear()}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel
                        className="ion-text-wrap ion-text-center"
                        color="secondary"
                        style={{ fontSize: "11px", height: "20px" }}
                      >
                        Delete Coupon
                      </IonLabel>
                      <IonIcon
                        icon={closeCircleOutline}
                        slot="end"
                        style={{ fontSize: "20px" }}
                      />
                    </IonItem>
                  </IonCard>
                </IonCol>
              ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Basket;

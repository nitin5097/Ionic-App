import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCol,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../my-context";

type Coupons = {
  id: number;
  ref: string;
  discount_value: number;
  title: string;
  subtitle: string;
  best: boolean;
  brand_id: number;
  picture_url: string;
  categories: [{ id: number; name: string; tag: string; precedence: number }];
  promocode_value: string;
  reward: string;
  is_new: boolean;
  video: {
    id: number;
    title: string;
    amount: number;
    duration: string;
    small_picture_url: string;
    bonus: string;
  };
  quizz: {
    id: number;
    title: string;
    amount: number;
    small_picture_url: string;
    bonus: string;
  };
};

const Coupon: React.FC = () => {
  const { setCouponDetail, couponsInfo, categoryInfo, storeInfo } =
    React.useContext(AuthContext);
  let categories = [];
  if (categoryInfo && categoryInfo.categoryInfo) {
    categories.push({
      id: 1,
      name: "ALL",
      tag: "All",
      precedence: 1,
    });
    categoryInfo.categoryInfo.forEach((element: { id: number }) => {
      if (element.id !== 1) {
        categories.push(element);
      }
    });
  }

  let stores = [];
  if (storeInfo && storeInfo.storeInfo) {
    stores.push({
      id: 1,
      name: "Select A Store",
      code: "none",
    });

    storeInfo.storeInfo.forEach((element: { id: number }) => {
      if (element.id !== 1) {
        stores.push(element);
      }
    });
  }
  type Category = typeof categories[number];
  type Store = typeof stores[number];

  const compareStoresWith = (o1: Store, o2: Store) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  const compareCategoriesWith = (o1: Category, o2: Category) => {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  };
  
  const history = useHistory();
  const [selectedStore, setSelectedStore] = useState<Store[]>([{
    id: 1,
    name: "Select A Store",
    code: "none",
  }]);
  const [selectedCategory, setSelectedCategory] = useState<Category[]>([{
    id: 1,
    name: "ALL",
    tag: "All",
    precedence: 1,
  }]);

  const [selectedCoupons, setSelectedCoupons] = useState<Coupons[]>([]);
  const [responseData, setResponseData] = useState<Coupons[]>([]);

  const mountedRef = useRef(false);
  React.useEffect(() => {
    async function fetchData() {
      mountedRef.current = true;
      if (couponsInfo && couponsInfo.couponsInfo) {
        setCouponDetail(null);
        setSelectedCoupons(couponsInfo.couponsInfo);
        // let filteredData: React.SetStateAction<Coupons[]> = [];
        // filteredData = couponsInfo.couponsInfo.filter(
        //   (result: { brand_id: number; categories: { id: number }[] }) =>
        //     result.brand_id === selectedStore.id &&
        //     (result.categories[0].id === selectedCategory.id ||
        //       selectedCategory.name === "ALL")
        // );
        // setResponseData(filteredData);
        // if (responseData && responseData.length < 1) {
        //   await couponsData();

        // }
        // ...
      }
      return () => {
        mountedRef.current = false;
      };
    }
    fetchData();
  }, [couponsInfo, setCouponDetail]);

  function categoryFilter(value: any) {
    let filteredData: React.SetStateAction<Coupons[]> = [];
    if (value.length === 0) {
      setResponseData(selectedCoupons);
    } else {
      filteredData = selectedCoupons.filter(
        (entry: any) =>
          entry.categories[0].id === value.id || value.name === "ALL"
      );
      setResponseData(filteredData);
    }
    setSelectedCategory(value);
  }

  function storeFilter(value: any) {
    console.log(JSON.stringify(value.id));

    let filteredData: React.SetStateAction<Coupons[]> = [];
    if (value.length === 0) {
      setResponseData(selectedCoupons);
    } else {
      if(value.id!==1){
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url: "https://cmjp-test.azure-api.net/wl/brands?store_id="+value.id,
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          "Ocp-Apim-Trace": "true",
        },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any; }) {
          console.log(JSON.stringify(response.data));
          filteredData = selectedCoupons.filter(
            (entry) => response.data.filter((brand: { id: number; })=>{
              return entry.brand_id === brand.id;
            })
          );
          setResponseData(filteredData);
        })
        .catch(function (error: any) {
          console.log(error);
        });

      }
      
    }
    setSelectedStore(value);
  }

  return (
    <IonPage>
      <IonHeader>
        <br />
        <br />
        <br />
        {/* <HeaderControls/> */}
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol key="titleLabel">
              <IonItem>
                <IonLabel color="medium">
                  <h1>Coupons</h1>
                </IonLabel>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol key="storeSelect">
              <IonItem>
                <IonLabel>Select a Store</IonLabel>
                <IonSelect
                  interface="action-sheet"
                  compareWith={compareStoresWith}
                  value={selectedStore}
                  key={selectedStore[0] && selectedStore[0].id}
                  onIonChange={e => storeFilter(e.detail.value)}
                >
                  {stores &&
                    stores.map(
                      (store: {
                        id: React.Key | null | undefined;
                        name:
                          | boolean
                          | React.ReactChild
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      }) => (
                        <IonSelectOption key={store.id} value={store}>
                          {store.name}
                        </IonSelectOption>
                      )
                    )}
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol key="categorySelect">
              <IonItem>
                <IonLabel>Select a Category</IonLabel>
                <IonSelect
                  interface="action-sheet"
                  compareWith={compareCategoriesWith}
                  key={selectedCategory[0] && selectedCategory[0].id}
                  value={selectedCategory}
                  onIonChange={(e) => categoryFilter(e.detail.value)}
                >
                  {categories &&
                    categories.map(
                      (category: {
                        id: React.Key | null | undefined;
                        name:
                          | boolean
                          | React.ReactChild
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                      }) => (
                        <IonSelectOption key={category.id} value={category}>
                          {category.name}
                        </IonSelectOption>
                      )
                    )}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonHeader>
      <IonContent>
        <br />
        {responseData && responseData.length < 1 && (
          <IonGrid style={{ padding: "20%", paddingTop: "1%" }}>
            <IonRow>
              <IonCol key="UseDescriptionTitleLabel">
                <IonItem>
                  <IonLabel className="ion-text-wrap ion-text-center">
                    <h1 style={{ fontFamily: "initial" }}>
                      How to Use? So Easy!
                    </h1>
                  </IonLabel>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol key="step1">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-wrap ion-text-center">
                      Step 1
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src="https://risparmiare.info/wp-content/uploads/2018/05/come-risparmiare-con-i-buoni-sconto-da-stampare-800x445.jpg"
                      style={{ width: "100%", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      Add Coupon to the Basket
                    </IonLabel>
                  </IonItem>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-wrap ion-text-center">
                      Step 2
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src="https://indyme.com/wp-content/uploads/2020/11/shopping-cart-icon.png"
                      style={{ width: "100%", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      Buy the selected coupon product at the store
                    </IonLabel>
                  </IonItem>
                </IonCard>

                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle className="ion-text-wrap ion-text-center">
                      Step 3
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonItem>
                    <IonImg
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyhWxwnKWQS7G6wmtZAU-p-at2Lk-EkA2d49zLWLTF8_jFxER1MCQzoCJJu3NuA0uqIWY&usqp=CAU"
                      style={{ width: "100%", height: "110px" }}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap ion-text-center">
                      Get the points to a later date
                    </IonLabel>
                  </IonItem>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
        <IonGrid>
          <IonRow>
            {/* {responseData} */}
            {responseData &&
              responseData.map((coupon) => (
                <IonCol key={coupon.id}>
                  <IonCard
                    style={{ width: "140px" }}
                    className="ion-text-wrap ion-text-center"
                  >
                    <IonCardHeader>
                      <IonCardSubtitle>{coupon.title}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonItem className="ion-text-wrap ion-text-center">
                      <IonImg
                        // slot="primary"
                        src={coupon.picture_url}
                        // style={{ width: "100px", height: "110px" }}
                      />
                    </IonItem>
                    <IonItem>
                      <IonLabel className="ion-text-wrap ion-text-center">
                        {coupon.discount_value} Points
                      </IonLabel>
                    </IonItem>
                    <IonItem
                      onClick={() => {
                        history.push("/home/coupon/detail");
                        setCouponDetail(coupon);
                      }}
                    >
                      <IonLabel className="ion-text-wrap ion-text-center">
                        {coupon.subtitle}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel
                        className="ion-text-wrap ion-text-center"
                        color="secondary"
                      >
                        Add to Basket
                      </IonLabel>
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

export default Coupon;

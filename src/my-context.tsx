import React from "react";

export const Context = React.createContext<any>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [authValues, setAuthValues] = React.useState<any>({
    authentication: false,
    user: null,
    refreshToken: null,
    memberId: null,
    // basketInfo: null,
    errors: null,
    initialized: null,
    token: null,
  });
  // const [coupons, setCoupons] = React.useState<any>({
  //   couponsInfo: null,
  // });
  const [showTabs, setShowTabs] = React.useState<any>(true);
  const [couponDetail, setCouponDetail] = React.useState<any>(null);
  const [basketInfo, setBasketInfo] = React.useState<any>({
    basketInfo: null,
  });
  const [couponsInfo, setCouponsInfo] = React.useState<any>({
    couponsInfo: null,
  });
  const [storeInfo, setStoreInfo] = React.useState<any>({
    storeInfo: null,
  });
  const [categoryInfo, setCategoryInfo] = React.useState<any>({
    categoryInfo: null,
  });

  const login = ({ user, password }: { user: string; password: string }) => {
    return new Promise((resolve) => {
      var axios = require("axios");
      var data = JSON.stringify({
        email: user,
        password: password,
      });

      var config = {
        method: "post",
        url: "https://cmjp-test.azure-api.net/wl/members/authentication",
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          "Ocp-Apim-Trace": "true",
          "Content-Type": "application/json",
          withCredentials: true,
        },
        data: data,
      };

      axios(config)
        .then(function (response: {
          data: { access_token: string; id: number; refresh_token: string };
        }) {
          setAuthValues({
            token: response.data.access_token,
            memberId: response.data.id,
            refreshToken: response.data.refresh_token,
            authentication: true,
            user: { user: user, id: "Nitin" },
          });
          couponRecords(response.data.id, response.data.access_token);
          basketRecords(response.data.id, response.data.access_token);
          storeRecords(response.data.id, response.data.access_token);
          categoryRecords(response.data.id, response.data.access_token);
          resolve(true);
        })
        .catch(function (error: any) {
          setAuthValues({
            authentication: false,
            user: null,
          });
          resolve(false);
        });
    });
  };

  const couponRecords = (memberId: number, token: string) => {
    return new Promise((resolve) => {
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url: "https://cmjp-test.azure-api.net/wl/offers?member_id=" + memberId,
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          'Ocp-Apim-Trace': 'true', 
          Authorization: "Bearer " + token,
          withCredentials: true,
        },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any }) {
          setCouponsInfo({
            couponsInfo: response.data.items,
          });
          console.log(response.data);

          resolve(true);
        })
        .catch(function (error: any) {
          resolve(false);
        });
    });
  };

  const basketRecords = (memberId: number, token: string) => {
    return new Promise((resolve) => {
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url:
          "https://cmjp-test.azure-api.net/wl/members/" + memberId + "/basket",
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          "Ocp-Apim-Trace": "true",
          Authorization: "Bearer " + token,
          withCredentials: true,
        },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any }) {
          console.log(response.data);

          setBasketInfo({
            basketInfo: response.data,
          });
          resolve(true);
        })
        .catch(function (error: any) {
          resolve(false);
        });
    });
  };

  const categoryRecords = (memberId: number, token: string) => {
    return new Promise((resolve) => {
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url: "https://cmjp-test.azure-api.net/wl/categories?member_id="+ memberId,
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          "Ocp-Apim-Trace": "true",
          Authorization: "Bearer " + token,
        },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any }) {
          setCategoryInfo({            
            categoryInfo: response.data,
          });
          console.log(response.data);

          resolve(true);
        })
        .catch(function (error: any) {
          resolve(false);
        });
    });
  };

  const storeRecords = (memberId: number, token: string) => {
    return new Promise((resolve) => {
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url: 'https://cmjp-test.azure-api.net/wl/members/'+memberId+'/stores',
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          "Ocp-Apim-Trace": "true",
          Authorization: "Bearer " + token,
         },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any }) {
          setStoreInfo({            
            storeInfo: response.data,
          });
          console.log(response.data);
          resolve(true);
        })
        .catch(function (error: any) {
          resolve(false);
        });
    });
  };

  const signup = ({ email, password, birthDate }: { email: string; password: string; birthDate:string }) => {

    return new Promise((resolve) => {
      var axios = require("axios");
      var data = JSON.stringify({
        "email": email,
        "password": password,
        "birthday": birthDate,
      });

      var config = {
        method: "post",
        url: "https://cmjp-test.azure-api.net/wl/members",
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          "Ocp-Apim-Trace": "true",
          "Content-Type": "application/json",
          withCredentials: true,
        },
        data: data,
      };

      axios(config)
        .then(function (response: {
          data: { access_token: string; id: number; refresh_token: string };
        }) {
          setAuthValues({
            token: response.data.access_token,
            memberId: response.data.id,
            refreshToken: response.data.refresh_token,
            authentication: true,
            user: { user: email, id: "Nitin" },
          });
          couponRecords(response.data.id, response.data.access_token);
          basketRecords(response.data.id, response.data.access_token);
          categoryRecords(response.data.id, response.data.access_token);
          storeRecords(response.data.id, response.data.access_token);
          resolve(true);
        })
        .catch(function (error: any) {
          setAuthValues({
            authentication: false,
            user: null,
          });
          resolve(false);
        });
    });
  };

  const logout = () => {
    setAuthValues({
      authentication: false,
      user: null,
    });
    return Promise.resolve(true);
  };

  let state = {
    authValues,
    login,
    logout,
    signup,
    showTabs,
    setShowTabs,
    couponDetail,
    setCouponDetail,
    couponsInfo,
    basketInfo,
    categoryInfo,
    storeInfo
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Context;

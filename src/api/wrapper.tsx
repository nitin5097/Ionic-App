import React, { useState } from "react";

export const Context = React.createContext<any>(undefined);
export const WrapperApi: React.FC = ({ children }) => {
  const [responseData, setResponseData] = useState<Coupons[]>([]);
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

  const [authValues, setAuthValues] = React.useState<any>({
    authentication: false,
    user: null,
    refreshToken: null,
    memberId: null,
    basketInfo: null,
    errors: null,
    initialized: null,
    token: null,
  });
  const loginAuth = async ({
    user,
    password,
  }: {
    user: string;
    password: string;
  }) => {
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
          Authorization:
            "Bearer bLs/95wdQ4USiwx56C6UO+xg8VxsVrbzPYmlJUCF5EPtLj1A/oiwbbe/8Cx64YCHv4z5ZJOQU4w5YwuPVUp4RnEPrakXezl8YBd/uOp4d+kpOA460ZYM/pl9uFScaMVxiomERCCBehG13vdhKIk+fJ+wLMlfuBct5aeE+MRDIS1kGs/WK0JEcp0OcdK8bfTb5JkQViaNZfKv5x3XiPViWpOZJ5GKqEICaCgDozkKRaQ=",
          "Content-Type": "application/json",
          Cookie: "request_method=POST",
        },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any }) {
          console.log(JSON.stringify(response.data));
          setAuthValues({
            token: response.data.access_token,
            memberId: response.data.id,
            refreshToken: response.data.refresh_token,
            authentication: true,
            user: { user: user, id: user },
            basketInfo: [
              {
                id: 2227,
                ref: "GHI_PRG01_refDB",
                discount_value: 30,
                title: "GHI_PRG01_nameDBⓇ®",
                subtitle: "いずれか1個で",
                best: true,
                brand_id: 55,
                picture_url:
                  "https://uat-cwallet.catalinacoupons.jp/images/offers/GHI_PRG01_refDB/ghi_prg01_home.jpg",
                categories: [
                  {
                    id: 156,
                    name: "スペシャルクーポン",
                    tag: "SPOFFERS",
                    precedence: 1,
                  },
                ],
                promocode_value: null,
                expireDate: "2021/06/21",
                reward: null,
                is_new: false,
              },
              {
                id: 2166,
                ref: "FT_20180220_5",
                discount_value: 30,
                title: "FLOYDO COUPON",
                subtitle: "いずれか1袋で",
                best: true,
                brand_id: 184,
                picture_url:
                  "https://uat-cwallet.catalinacoupons.jp/images/offers/FT_20180220_5/floydo.png",
                categories: [
                  {
                    id: 156,
                    name: "スペシャルクーポン",
                    tag: "SPOFFERS",
                    precedence: 1,
                  },
                ],
                promocode_value: null,
                expireDate: "2021/06/21",
                reward: null,
                is_new: false,
              },
            ],
          });
          resolve(true);
        })
        .catch(function (error: any) {
          console.log(error);
          setAuthValues({
            authentication: false,
            user: null,
          });
          return Promise.resolve(false);
        });
    });
  };

  const coupons = async ({
    memberId,
    token,
  }: {
    memberId: string;
    token: string;
  }) => {
    return new Promise((resolve) => {
      var axios = require("axios");
      var data = "";

      var config = {
        method: "get",
        url: "https://cmjp-test.azure-api.net/wl/offers?member_id=" + memberId,
        headers: {
          "Ocp-Apim-Subscription-Key": "0c8178167473412299bd8c83652a3f81",
          Authorization: "Bearer " + token,
        },
        data: data,
      };

      axios(config)
        .then(function (response: { data: any }) {
          console.log(JSON.stringify(response.data));
          setResponseData(response.data.items);
          resolve(true);
        })
        .catch(function (error: any) {
          console.error(error);
          return Promise.resolve(false);
        });
    });
  };

  let state = {
    loginAuth,
    authValues,
    coupons,
    responseData,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};
export default WrapperApi;

import {
  IonButton,
  IonButtons,
  IonIcon,
  IonLabel,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import AuthContext from "../my-context";
import React, { useRef } from "react";
import {
  logOutOutline,
  personCircle,
} from "ionicons/icons";
import { useHistory } from "react-router";
// import { useTranslation } from "react-i18next";

// const languages = [
//   {
//     id: 1,
//     code: "eg",
//     name: "English",
//   },
//   {
//     id: 2,
//     code: "ja",
//     name: "Japanese",
//   },
// ];
// type Lang = typeof languages[number];
// const compareLanguagesWith = (o1: Lang, o2: Lang) => {
//   return o1 && o2 ? o1.id === o2.id : o1 === o2;
// };
const HeaderControls: React.FC<{}> = (props) => {
  // const [selectedLang, setSelectedLang] = useState<Lang>({
  //   id: 1,
  //   code: "eg",
  //   name: "English",
  // });

  // const { i18n } = useTranslation();
  // const changeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };

  const { authValues, logout } = React.useContext(AuthContext);
  const mountedRef = useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });
  const history = useHistory();
  return (
    <IonToolbar color="secondary">
      <IonButtons slot="secondary">
        <IonButton>
          <IonIcon slot="icon-only" icon={personCircle} />
        </IonButton>
        <IonLabel>{authValues.user.id}</IonLabel>
      </IonButtons>
      <IonButtons slot="primary">
        <IonButton color="primary" onClick={() => {
              logout();
              history.replace("/login");
            }}>
          <IonIcon
            icon={logOutOutline}
            
          />
        </IonButton>
      </IonButtons>
      <IonTitle>Okuwa</IonTitle>
    </IonToolbar>
  );
};

export default HeaderControls;

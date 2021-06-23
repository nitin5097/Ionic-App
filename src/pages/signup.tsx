import {
  IonContent,
  IonDatetime,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import React, { useRef, useState } from "react";
// import axios from "axios";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import { eye, personCircle } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { IonItem, IonLabel, IonInput, IonButton, IonIcon } from "@ionic/react";
import validationMessage from "../resource/messages.json";
import AuthContext from "../my-context";

function validateEmail(email: string) {
  const re =
    /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
  return re.test(String(email).toLowerCase());
}
function validatePasswordMatch(password: string, confirmPassword: string) {
  return (
    String(password).toLowerCase() === String(confirmPassword).toLowerCase()
  );
}

const Signup: React.FC = () => {
  const mountedRef = useRef(false);
  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const { signup, user } = React.useContext(AuthContext);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const history = useHistory();
  const [email, setEmail] = useState<string>("Admin@gmail.com");
  const [password, setPassword] = useState<string>("Password.1");
  const [confirmPassword, setConfirmPassword] = useState<string>("Password.1");
  const [iserror, setIserror] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const handleSignup = async () => {
    if (!email) {
      setMessage(validationMessage.msg_1);
      setIserror(true);
      return;
    }
    if (validateEmail(email) === false) {
      setMessage(validationMessage.msg_2);
      setIserror(true);
      return;
    }

    if (!password || password.length < 6) {
      setMessage(validationMessage.msg_3);
      setIserror(true);
      return;
    }

    if (validatePasswordMatch(password, confirmPassword) === false) {
      setMessage(validationMessage.msg_6);
      setIserror(true);
      return;
    }
    console.log(selectedDate);
    setShowLoading(true);
    let result = await signup({
      email: email,
      password: password,
      birthDate: selectedDate,
    });
    setShowLoading(false);
    if (result) {
      history.push("/coupon");
    } else {
      setMessage(validationMessage.msg_4);
      setIserror(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding ion-text-center">
        <IonLoading
          message={validationMessage.msg_7}
          isOpen={showLoading}
          onDidDismiss={() => user !== null ?? history.replace("/coupon")}
        />
        <IonGrid>
          <IonRow>
            {/* <IonCol>
            <IonAlert
                isOpen={iserror}
                onDidDismiss={() => setIserror(false)}
                cssClass="my-custom-class"
                header={"Error!"}
                message={message}
                buttons={["Dismiss"]}
            />
          </IonCol> */}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonIcon
                style={{ fontSize: "70px", color: "#0040ff" }}
                icon={personCircle}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating"> Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
                <IonIcon slot="end" icon={eye}></IonIcon>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  type="password"
                  value={confirmPassword}
                  onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>Birth Date</IonLabel>
                <IonDatetime
                  displayFormat="MM/DD/YYYY"
                  min="1904-03-14"
                  max="2021-16-06"
                  value={selectedDate}
                  onIonChange={(e) => setSelectedDate(e.detail.value!)}
                ></IonDatetime>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {/* <p style={{ fontSize: "small" }}>
                  By clicking LOGIN you agree to our <a href="#">Policy</a>
              </p> */}
              <IonButton
                expand="block"
                onClick={() => {
                  handleSignup();
                }}
              >
                Signup
              </IonButton>
              <p style={{ fontSize: "medium" }}>
                Already have an account?{" "}
                <a
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Login!
                </a>
              </p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonToast
        isOpen={iserror}
        onDidDismiss={() => setIserror(false)}
        cssClass="my-custom-class"
        header={"Error!"}
        message={message}
        duration={2000}
        // buttons={["Dismiss"]}
      />
    </IonPage>
  );
};

export default Signup;

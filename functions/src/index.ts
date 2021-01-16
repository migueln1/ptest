import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const db = admin.firestore();

export const addAdminToUser = functions.https.onCall((data, context)=>{
  admin.auth().getUserByEmail(data.email)
      .then((user)=>{
        return admin.auth().setCustomUserClaims(user.uid, {admin: true});
      }).then(()=>{
        return {
          message: `El usuario con el correo ${data.email}
          ha sido modificado como administrador`,
        };
      }).catch((err)=>(err));
});
const createProfile = (userRecord: any, context: any) => {
  const {email, uid} = userRecord;
  return db
      .collection("Users")
      .doc(uid)
      .set({email})
      .catch(console.error);
};

export const authOnCreate = functions.auth.user().onCreate(createProfile);
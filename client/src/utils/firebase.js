import initializeApp from "firebase/app";
import { getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0-X_YQW9qpBsPA2TZN0BI__onn5MAdg4",
    authDomain: "thgpainting-276dd.firebaseapp.com",
    projectId: "thgpainting-276dd",
    storageBucket: "thgpainting-276dd.appspot.com",
    messagingSenderId: "111535948642",
    appId: "1:111535948642:web:797ee1f5236ab04633223b",
    storageBucket: "gs://thgpainting-276dd.appspot.com"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export const uploadImage = async (projectId, file) => {
    const filePath = `projects/${projectId}/files${file.name}`;
    const storageRef = ref(storage, filePath);
    try {
        await uploadBytes(storageRef, file);
        console.log('File uploaded successfully!')
    } catch (error) {
        console.error('Error uploading file:', error)
    }
};


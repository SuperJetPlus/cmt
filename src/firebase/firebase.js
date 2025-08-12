import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCNSO7Ohsfsnna-8NlbuL8B6giwr_CXe68",
    authDomain: "cmt-data.firebaseapp.com",
    projectId: "cmt-data",
    storageBucket: "cmt-data.firebasestorage.app",
    messagingSenderId: "892026150779",
    appId: "1:892026150779:web:0f467517371065f97a27de",
    measurementId: "G-05X18J8HVL"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

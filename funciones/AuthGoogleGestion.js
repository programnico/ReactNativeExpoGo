import React, {useState} from 'react'
import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { Dimensions } from 'react-native';
import db from "../database/firebase";
import uuid from "uuid";

export const AuthGoogleGestion = () => {
    
    const getUsuarioById = async (email, name) => {
        const listData = [];
        var existe =0;      
        //filtrar este de 
        let q = query(collection(db, "itemsUsuarios"), where("email", '==', email));
        const datos = await getDocs(q);
        
        datos.forEach((doc) => {
            console.log("data"+doc.data().email);
            existe=1;
        });

        if(existe===0){
            addUser(email, name);
        }
        /*
        datos.forEach((doc) => {
            listData.push({
                data: doc.data()
            })
        });
        
        setListDataUsuarios(listData);*/
    }

    const addUser = async (email, name)=>{
        const docRef = await addDoc(collection(db, "itemsUsuarios"), {
            id: uuid.v4(),
            email: email,
            name: name
        });
        console.log("usuario agregado"+docRef.id);
    }

    return {
        getUsuarioById
    }
}

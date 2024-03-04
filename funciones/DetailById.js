import React, { useState } from 'react'
import { collection, getDocs, where, query } from "firebase/firestore";

import db from "../database/firebase";
import uuid from "uuid";

export const DetailById = () => {

    const initialState = {
        id: uuid.v4(),
        name: "",
        descriptionShort: "",
        descriptionLarge: "",
        pictureDefault: "",
        category: "",
    };
    
    const [state, setState] = useState(initialState);

    const handleChangeText = (name, value) => {
        setState({[name]: value });
    };

    const [listDataById, setListDataById] = useState([]);
    const [listImage, setListImage] = useState([]);
    
    const getColleccionById = async (coleccion, campo, condicion) => {
        const listData = [];

        //filtrar este de 
        let q = query(collection(db, coleccion), where(campo, '==', condicion));
        const datos = await getDocs(q);

        datos.forEach((doc) => {
             listData.push({
                 data: doc.data()
             })
        });
        setListDataById(listData);
    }

    const getColleccionImage = async (coleccion, campo, condicion) => {
        const listData = [];
        const listReturn = [];
        //filtrar este de 
        let q = query(collection(db, coleccion), where(campo, '==', condicion));
        const datos = await getDocs(q);

        datos.forEach((doc) => {
             listData.push({
                 data: doc.data()
             })
        });

        setListImage(listData);
    }

    return {
        state, 
        getColleccionById,getColleccionImage, 
        listDataById,
        listImage
    }
}
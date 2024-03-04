import React, { useState } from 'react'
import { collection, getDocs, where, query, limit } from "firebase/firestore";
import { Dimensions } from 'react-native';
import db from "../database/firebase";

export const ListData = () => {
    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");

    const [dimensions, setDimensions] = useState({ window, screen });

    const obtenerDimensions = () => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    }

    var widthW = dimensions.window.width;

    const [listCategory, setListCategory] = useState([]);
    const [listData, setListData] = useState([]);
    const [listDataById, setListDataById] = useState([]);
    
    const getCategory = async (coleccion) => {
        const listaDatos = [];
        //filtrar este de 
        let q = query(collection(db, coleccion));
        const datos = await getDocs(q);

        datos.forEach((documento) => {
            //este listado se utiliza para ...
            listaDatos.push({
                id: documento.data().id,
                name: documento.data().name,
                mainPicture: documento.data().mainPicture,
            });
        });

        getColleccionById("itemsDestinos", "category", listaDatos[0].id); 
        
        setListCategory(listaDatos);
    }

    const getColleccion = async (coleccion) => {
        const listData = [];

        //filtrar este de 
        let q = query(collection(db, coleccion));
        const datos = await getDocs(q);
        datos.forEach((doc) => {
            listData.push({
                data: doc.data()
            })
        });

        setListData(listData);
    }

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

        //console.log(listData[0].data.id);

        setListDataById(listData);
    }

    

    return {
        listCategory,
        getCategory,
        obtenerDimensions,
        widthW,
        getColleccion,
        getColleccionById,
        listData,
        listDataById
    }
}
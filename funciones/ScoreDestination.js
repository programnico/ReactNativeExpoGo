import React, {useState} from 'react'
import { collection, getDocs, where, query, addDoc, doc,updateDoc } from "firebase/firestore";
//import { Dimensions, InteractionManager } from 'react-native';
import db from "../database/firebase";
import uuid from "uuid";
//import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

export const ScoreDestination = () => {

    const [listData, setListData] = useState([]);

    const setRatePlace = async (email, id, rate) => {
        const listData = [];
        var existe = 0; 
        var ref = "";
        //var numberPlaceRatings = "";     
        //filtrar este de 
        let q = query(collection(db, "itemsRatePlace"), where("email", '==', email, "idRefItemsDestinos","==",id));
        const datos = await getDocs(q);
        
        datos.forEach((doc) => {
            //numberPlaceRatings = doc.data().numberPlaceRatings;
            console.log("data doc set rate place: "+doc.data().email);
            ref = doc.id;
            existe=1;
        });

        if(existe===1){
            updateItemsRatePlaceByRef(ref, rate);
            getDestinationRef(id);
            console.log("existe registro -- update");
        }else{
            var numberPlaceRatingsCalculated = 1;
            console.log("no existe");
            addItemsRatePlace(email, id, rate, numberPlaceRatingsCalculated);
            getDestinationRef(id);
            existe = 0;
            
        }
    }

    const addItemsRatePlace = async (email, idRef, rate, numberPlaceRatings)=>{
        const docRef = await addDoc(collection(db, "itemsRatePlace"), {
            id: uuid.v4(),
            email: email,
            idRefItemsDestinos: idRef,
            rateUser: rate,
            numberPlaceRatings: numberPlaceRatings,
        });
        //console.log("calidificacion agregada"+docRef.id);
    }

    const updateItemsRatePlaceByRef = async (ref, rate) =>{
        const itemsRef = doc(db, "itemsRatePlace", ref );
        await updateDoc(itemsRef, {
            rateUser: rate
          });

          console.log("modificacion");
    }

    const updateItemsDestinosByRef = async (ref, ratingCalculated) =>{
        const itemsRef = doc(db, "itemsDestinos", ref );
        await updateDoc(itemsRef, {
            rating: ratingCalculated
          });

          console.log("modificacion");
    }

    const calculatedRateGlobal = async (refDestination,id) => {
        //const listData = [];
        var existe =0; 
        var rateGlobal = 0; 
        //filtrar este de 
        let q = query(collection(db, "itemsRatePlace"), where("idRefItemsDestinos","==",id));
        const datos = await getDocs(q);
        
        datos.forEach((doc) => {
            rateGlobal = rateGlobal + parseInt(doc.data().rateUser);
            //numberPlaceRatings = doc.data().numberPlaceRatings;
            //rateGlobal = doc.data().rateGlobal;
            //console.log("data"+doc.data().email);
            existe=1;
        });

        if(existe===1){
            calculatedNumberPlaceRatings(refDestination, id, rateGlobal);
        }
    }

    const calculatedNumberPlaceRatings = async (refDestination, id, rateGlobal) => {
        //const listData = [];
        var existe = 0; 
        var calNumberPlaceRatings = 0; 
        var updateRating = 0;
        //filtrar este de 
        let q = query(collection(db, "itemsRatePlace"), where("idRefItemsDestinos","==",id));
        const datos = await getDocs(q);
        
        datos.forEach((doc) => {
            calNumberPlaceRatings = calNumberPlaceRatings + parseInt(doc.data().numberPlaceRatings);
            //numberPlaceRatings = doc.data().numberPlaceRatings;
            //rateGlobal = doc.data().rateGlobal;
            //console.log("data"+doc.data().email);
            existe=1;
        });

        if(existe===1){
            updateRating = (rateGlobal / calNumberPlaceRatings);
            updateItemsDestinosByRef(refDestination, updateRating);
            console.log("update collection itemsDestinos document rating");
        }

    }

    const getDestinationRef = async (id) => {
        const listData = [];
        var existe = 0; 
        var ref = "";
        //var numberPlaceRatings = "";     
        //filtrar este de 
        let q = query(collection(db, "itemsDestinos"), where("id","==",id));
        const datos = await getDocs(q);
        
        datos.forEach((doc) => {
            //numberPlaceRatings = doc.data().numberPlaceRatings;
            //console.log("data doc set rate place: "+doc.data().email);
            ref = doc.id;
            existe=1;
        });

        if(existe===1){
            //updateItemsRatePlaceByRef(ref, rate);
            calculatedRateGlobal(ref, id);
            console.log("existe registro -- update");
        }
    }

    return {
        setRatePlace
    }
}

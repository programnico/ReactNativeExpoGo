import React from 'react';
import { TouchableWithoutFeedback, Animated, Easing, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import db from "../../database/firebase";
import { collection, getDocs, where, query, addDoc, doc,updateDoc } from "firebase/firestore";
import uuid from "uuid";

export default class Rating extends React.Component {
    state = {
        rating: this.props.rating ?? 1,
        animation: new Animated.Value(1),
        numStars: this.props.numStars ?? 4,
        starColor: this.props.starColor ?? "black",
        sizeStar: this.props.sizeStars ?? 20,
        emailUser: this.props.emailUsers ?? "",
        idDestination: this.props.idDestinations ?? "",
    };

    //const { setRatePlace } = ScoreDestination();
    
    rate = star => {
        this.setState({ rating: star });
    };

    animate = () => {
        Animated.timing(this.state.animation, {
            toValue: 2,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(() => {
            this.state.animation.setValue(1);
        });
    };

    render() {
        //inicia aca
        const setRatePlace = async (email, id, rate) => {
            const listData = [];
            let existe = 0; 
            var ref = "";
            //var numberPlaceRatings = "";     
            //filtrar este de 
            let q = query(collection(db, "itemsRatePlace"), where("email", "==", email), where ("idRefItemsDestinos","==",id));
            const datos = await getDocs(q);
            
            datos.forEach((doc) => {
                //numberPlaceRatings = doc.data().numberPlaceRatings;
                console.log("data doc set rate place: " +doc.data().email);
                console.log("referencia setRatePlace " +doc.id)
                ref = doc.id;
                existe=1;
            });
    
            if(existe===1){
                if(ref!=="" || ref!==null){
                    updateItemsRatePlaceByRef(ref, rate);
                    getDestinationRef(id);
                    console.log("existe registro -- update");
                }
            }else{
                var numberPlaceRatingsCalculated = 1;
                console.log("no existe");
                //updateItemsRatePlaceByRef(ref, rate);
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
    
              console.log("updateItemsRatePlaceByRef");
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
                rateGlobal = rateGlobal + parseInt(doc.data().rateUser.toString(), 10);
                //numberPlaceRatings = doc.data().numberPlaceRatings;
                //rateGlobal = doc.data().rateGlobal;
                //console.log("data"+doc.data().email);
                existe=1;
            });
    
            if(existe===1){
                calculatedNumberPlaceRatings(refDestination, id, rateGlobal);
                console.log("calculatedRateGlobal");
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
                calNumberPlaceRatings = calNumberPlaceRatings + parseInt(doc.data().numberPlaceRatings.toString(), 10);
                //numberPlaceRatings = doc.data().numberPlaceRatings;
                //rateGlobal = doc.data().rateGlobal;
                //console.log("data"+doc.data().email);
                existe=1;
            });
    
            if(existe===1){
                updateRating = ( parseInt(rateGlobal, 10)  / parseInt(calNumberPlaceRatings,10));
                updateItemsDestinosByRef(refDestination, updateRating);
                console.log("updateItemsDestinosByRef");
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
                console.log("getDestinationRef");
            }
        }
        //hasta aca

        let stars = [];

        const animateScale = this.state.animation.interpolate({
            inputRange: [1, 1.5, 2],
            outputRange: [1, 1.4, 1]
        });

        //opacidad de cada estrella
        const animateOpacity = this.state.animation.interpolate({
            inputRange: [1, 1.2, 2],
            outputRange: [1, 0.5, 1]
        });
        //indicamos cuanto girara cada estrella
        const animateWobble = this.state.animation.interpolate({
            inputRange: [1, 1.25, 1.75, 2],
            outputRange: ["0deg", "-3deg", "3deg", "0deg"]
        });

        const animationStyle = {
            transform: [{ scale: animateScale }, { rotate: animateWobble }],
            opacity: animateOpacity
        };

        for (let i = 0; i < this.state.numStars; i++) {
            stars.push(
                <TouchableWithoutFeedback
                    key={i}
                    onPress={() => {
                        this.rate(i), this.animate();

                        //aqui enviamos la info
                        
                        var rate = i+1;
                        console.log(`Su calificacion fue de ${i + 1}`);
                        console.log("hola data ="+this.state.emailUser);
                        console.log("hola data ="+this.state.idDestination);
                        //RatingData().setRatePlace(this.state.emailUser, this.state.idDestination,rate);
                        setRatePlace(this.state.emailUser, this.state.idDestination,rate);
                    }}>
                    <Animated.View style={i <= this.state.rating ? animationStyle : ""}>
                        <Star filled={i <= this.state.rating ? true : false} color={this.state.starColor} size={this.state.sizeStar} emailData={this.state.emailUser} destinatinoIdData={this.state.idDestination} />
                    </Animated.View>
                </TouchableWithoutFeedback>
            );
        }

        return (
            <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>{stars}</View>
            </View>
        );
    }
}

class Star extends React.Component {
    render() {
        return (
            <FontAwesome
                name={this.props.filled === true ? "star" : "star-o"}
                color={this.props.color}
                size={this.props.size}
                style={{ marginHorizontal: 6 }}
                emailData={this.props.emailUser}
                destinatinoIdData = {this.props.idDestination}
            />
        );
    }
}
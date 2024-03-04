import React, { useEffect, useState } from 'react';
import { StatusBar, View, StyleSheet, Text, ScrollView,FlatList, Button, Icon, Linking,LogBox } from 'react-native';
import Rating from './components/Rating';
import CarouselImagenes from './components/Carousel';
import {DetailById} from '../funciones/DetailById';

export const DestinationDetail = ({ navigation, route }) => {
    LogBox.ignoreLogs([`Setting a timer for a long period`]);
    const { state, getColleccionById, listDataById,getColleccionImage, listImage } = DetailById();

    useEffect(() => {
        //console.log("Parametros"+route.params.codigo);
        getColleccionById("itemsDestinos", "id", route.params.codigo);
        getColleccionImage("itemsPicture", "refId", route.params.codigo);
        //console.log(route.params.codigo);
    }, []);

    const Item = ({ title }) => (
        <View style={styles.info}>
            <Text style={styles.titulo}>{ title.data.name}</Text>
            <Text style={styles.descripcion}>{title.data.descriptionLarge}</Text>
            <Text style={styles.textRating}>---------Rating---------</Text>
            <Text style={styles.textRating}>--------- {title.data.rating} ---------</Text>
            <View style={styles.contRating}>
                {/* enviamos el rating (inica de 0), numero de estrellas que tendra para valorar, color */}
                <Rating rating={title.data.rating} numStars={5} starColor="orange" sizeStars={30} emailUsers={route.params.email} idDestinations={title.data.id} />
                {/* <Rating rating={item.rating} numStars={5} starColor="orange" sizeStars={20} emailUsers={route.params.email} idDestinations={item.data.id} /> */}
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    function openNavigation(){
        let lat = listDataById[0].data.latitud;
        let lon = listDataById[0].data.longitud;
        let lugar = listDataById[0].data.name;
        const scheme = Platform.select({ ios: 'maps:'+lat+','+lon+'?q=', android: 'geo:'+lat+','+lon+'?q=' });
        const latLng = `${lat},${lon}`;
        const label = lugar;
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
    }

    return (
        //Contenedor
        <View style={styles.container}>
            <StatusBar hidden />

            <CarouselImagenes data={listImage} />

            <FlatList
                data={listDataById}
                renderItem={renderItem}
                keyExtractor={item => item.data.id}

            />

            {/* Mapa */}
            <View style={styles.navigation}>
            <Button
                icon={
                    <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                    />
                }
                iconRight
                title="Como llegar?"
                onPress={openNavigation}
                />
            </View>
            {/* Mapa */}
        </View>



    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    //Titulo
    info: {
        alignSelf: 'center',
        width: '95%',
        height: 'auto',
        margin: 5,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingBottom: 5,
        shadowOpacity: 0.2,
        shadowRadius: 52,

    },
    titulo: {
        paddingTop: 15,
        paddingBottom: 15,
        fontSize: 30,
        color: '#000e21',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    descripcion: {
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 15,
        fontSize: 20,
        textAlign: 'center',
        color: '#002851',
    },
    textRating: {
        fontSize: 25,
        textAlign: 'center',
        color: '#addbff',
    },
    contRating: {
        padding: 5,
        height: 'auto',
        width: '100%',
        marginBottom: 40
    },
    navigation: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        
    }

});
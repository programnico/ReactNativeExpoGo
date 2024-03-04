import React, { useEffect, useState } from 'react';
import {StatusBar, Text, TouchableOpacity, View, Image, FlatList,Button,Icon, TouchableHighlight, ScrollView, InteractionManager } from 'react-native';
import { styles } from './styles/indexStyle';
import Rating from './components/Rating';
import db from '../database/firebase';
import { ListData } from '../funciones/ListData';

//import { ScoreDestination } from '../funciones/ScoreDestination';
import { alignItems } from 'styled-system';

export default function Index({ navigation, route }) {
    const {
        listCategory,
        getCategory,
        getColleccionById,
        listDataById,
        getColleccionLimit,
        listDataLimit } = ListData();

        //const { setRatePlace } = ScoreDestination();
            
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

        useEffect(()=>{
            //setRatePlace("ni@gmail.com",'4f14c565-eeca-4c24-9914-ade710f2411c', '4');
            //console.log("user email"+ route.params.email);
        })  

    useEffect(() => {
        getCategory("itemsCategory");
        
    }, []);

    useEffect(() => {
        if (categoriaSeleccionada !== "") {
            getColleccionById("itemsDestinos", "category", categoriaSeleccionada);
        }
    }, []);

    const filterByCategory = (id) => {
        setCategoriaSeleccionada(id);
        
        getColleccionById("itemsDestinos", "category", id);
        
        //console.log("hola" + id);
    }

    const showDetails = (id) => {
        //setCategoriaSeleccionada(id);
        
        //getColleccionById("itemsDestinos", "category", id);
        
        navigation.navigate({name: 'DestinationDetail', params: {codigo: id, email: route.params.email}, merge: true,});
    }
    const returnLogin=()=>{
        navigation.navigate("AuthenticationScreen");
    }

    return (
        // <ScrollView>
        <View style={styles.container}>
            <StatusBar hidden />
            {/* Banner */}
            <View style={styles.banner}>
            
            {/* <Button
                icon={
                    <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                    />
                }
                iconRight
                title="Salir"
                onPress={returnLogin()}
                style={styles.navigationButton}
                /> */}
            
                <Image
                    source={require('../assets/banner.jpg')}
                    style={styles.imagenBanner}
                />
            </View>

            {/* filtros */}
            <View style={styles.filtros}>
                <FlatList
                    data={listCategory}
                    horizontal
                    pagingEnabled
                    renderItem={({ item }) => {
                        return <View style={styles.viewFiltro}>
                            <TouchableHighlight
                                style={styles.submit}
                                onPress={() => filterByCategory(item.id)}
                                underlayColor='#fff'>
                                <Text style={styles.submitText}>{item.name}</Text>
                            </TouchableHighlight>
                        </View>
                    }
                    }
                />
            </View>


            {/* Contenedor de lugar */}
            <FlatList style={{ width: '100%' }}
                data={listDataById}
                renderItem={({ item }) => {
                    return <View style={styles.card}>
                        <TouchableOpacity
                            onPress={() => showDetails(item.data.id)}>
                            {/* nombre y descripcion del lugar */}
                            <View style={styles.head}>
                                <Text style={styles.titulo}>{item.data.name}</Text>
                                <Text style={styles.descripcion}>{item.data.descriptionShort}</Text>
                            </View>

                            {/* Pequeña galeria */}
                              <View style={styles.galeria}>
                                <View style={styles.superior}>
                                    <Image
                                        source={{ uri: item.data.pictureDefault }}
                                        style={styles.imagen}
                                    />
                                </View>
                                {/* <View style={styles.izquierda}>
                                    <Image
                                        source={{ uri: item.imagenes[1].url }}
                                        style={styles.imagen}
                                    />
                                </View>
                                <View style={styles.derecha}>
                                    <Image
                                        source={{ uri: item.imagenes[2].url }}
                                        style={styles.imagen}
                                    />
                                </View> */}
                            </View>  

                            {/* RATING */}
                            <Text style={styles.textRating}>--------- Rating ---------</Text>
                            <Text style={styles.textRating}>--------- { item.data.rating} ---------</Text>
                             <View style={styles.contRating}>
                                {/* enviamos el rating (inica de 0), numero de estrellas que tendra para valorar, color  */}
                                <Rating rating={item.data.rating} numStars={5} starColor="orange" sizeStars={20} emailUsers={route.params.email} idDestinations={item.data.id} />
                            </View> 
                        </TouchableOpacity>
                    </View>
                }
                }
                keyExtractor={item => item.data.id}
            />
        </View>

        // </ScrollView>
    );
}


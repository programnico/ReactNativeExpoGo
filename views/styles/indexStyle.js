import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    /*Contenedor*/
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        alignItems: 'center'
    },
    //Banner
    banner: {
        width: '100%',
        height: 225,
        marginBottom: 10,
        shadowOpacity: 0.5,
        shadowRadius: 20,
    },
    imagenBanner: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch'
    },

    imagen: {
        width: "100%",
        height: "100%",
        borderRadius: 45 / 2,
        overflow: "hidden",
    },

    //Seccion de filtros
    filtros: {
        height: 'auto',
        width: '100%',
    },
    viewFiltro: {
        marginLeft: 15,
        marginBottom: 5
    },
    submit: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#4aa9ff',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#7cc2ff',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    },

    //Card de cada destino
    card: {
        alignSelf: 'center',
        width: '95%',
        height: 'auto',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingBottom: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    //Card de cada destino> titulo y descripcion
    head: {
        width: '100%',
        height: 'auto'
    },
    titulo: {
        paddingBottom: 5,
        paddingTop: 5,
        fontSize: 22,
        color: '#0c4a6e',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    descripcion: {
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 15,
        textAlign: 'center',
        color: '#0ea5e9',
    },
    //Card de cada destino> fotos del destino
    galeria: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 5,
        width: '100%',
        height: 300,
    },
    superior: {
        width: '100%',
        height: '100%',
        padding: '1%'
    },
    izquierda: {
        width: '50%',
        height: '50%',
        padding: '1%'
    },
    derecha: {
        width: '50%',
        height: '50%',
        padding: '1%',
    },

    //rating
    textRating: {
        fontSize: 25,
        textAlign: 'center',
        color: '#addbff',
    },
    contRating: {
        padding: 5,
        height: 30,
        width: '100%',
    },
    navigationButton: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        
    }


});
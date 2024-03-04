import React from 'react';
import { Image, View, Dimensions, FlatList } from 'react-native';


const { width } = Dimensions.get('screen');
const imageW = width * 0.6;
const imageH = imageW * 1.54;


export default class Carousel extends React.Component {
    render() {
        return (
            <View style={{ height: 'auto' }}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(_, index) => index.toString()}
                    horizontal
                    pagingEnabled
                    renderItem={({ item }) => {
                        return <View style={{
                            width, marginBottom: 10,
                            shadowOpacity: 0.5,
                            shadowRadius: 8,
                        }}>
                            <Image
                                source={{ uri: item.data.pictureUri }}
                                style={{
                                    width: '100%',
                                    height: imageH,
                                    resizeMode: 'cover'
                                }} />
                        </View>
                    }}
                />
            </View>
        );
    };
};

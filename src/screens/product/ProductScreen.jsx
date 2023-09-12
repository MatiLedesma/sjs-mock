import React from 'react';
import { View, Dimensions, StatusBar } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { cartContext } from '../../context/CartContext';

const { width, height } = Dimensions.get('screen');

export default function Product({ route, navigation }) {
    const { product } = route.params;
    const { addToCart } = React.useContext(cartContext);

    return (
        <Card style={{ width: width, height: height, borderRadius: 0 }} mode='contained' onPress={() =>
            navigation.navigate("Product", { product: product })}>
            <StatusBar translucent barStyle="dark-content" />
            <IconButton icon="chevron-left" size={30} iconColor='#ffffff' style={{ position: 'absolute', top: 30, left: 0, zIndex: 2 }} onPress={() => navigation.goBack()} />
            <Card.Cover style={{ borderRadius: 0, height: height * 0.35 }} source={{ uri: product.image }} />
            <Card.Title title={product.title} titleStyle={{ fontSize: 20 }} />
            <Card.Content style={{ marginBottom: 5 }}>
                <Text variant="bodyMedium">{product.description}</Text>
            </Card.Content>
            <Card.Content style={{ marginBottom: 5 }}>
                <Text variant="bodyMedium">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas minima nihil laborum sint, perferendis consectetur iste impedit quae eum natus obcaecati, nisi aliquam, sapiente voluptatem animi ratione veritatis vitae ducimus?</Text>
            </Card.Content>
            <Card.Content>
                <Text variant="bodySmall" style={{ textAlign: 'right', marginTop: 5 }}>Stock inmediato: <Text style={{ fontWeight: 'bold' }}>{product.stock >= 15 ? "Mas de 15" : product.stock}</Text></Text>
                <Text variant="bodySmall" style={{ textAlign: 'right', marginTop: 5 }}>Stock secundario: <Text style={{ fontWeight: 'bold' }}>{product.stock_secondary >= 15 ? "Mas de 15" : product.stock_secondary}</Text></Text>
            </Card.Content>
            <Button icon="cart-outline" onPress={()=> addToCart(product)} style={{ marginTop: 24, borderRadius: 4, width: width * 0.96, alignSelf: 'center' }} mode='contained'>
                Agregar al carrito
            </Button>
        </Card>
    );
}
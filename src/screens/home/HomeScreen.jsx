import React from 'react';
import { View, StatusBar, FlatList, Dimensions, Image } from 'react-native';
import { Card, IconButton, Text, Appbar, Searchbar, Badge, Button } from 'react-native-paper';
import { mockData as products } from '../../config';
import { cartContext } from '../../context/CartContext';

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
    const [data, setData] = React.useState();
    const [currentPage, setCurrentPage] = React.useState(1);
    const { data: cart, getCartItemsCount } = React.useContext(cartContext);
    const totalPages = Math.ceil(products.length / 10); // Calclar el total de páginas
    const productsByPage = 10;

    const mostrarPagina = (paginaActual, productsByPage) => {
        const inicio = (paginaActual - 1) * productsByPage;
        const fin = inicio + productsByPage;
        const paginaProductos = products.slice(inicio, fin);
        setData(paginaProductos);
    }

    const mostrarSiguientePagina = () => {
        if (currentPage >= totalPages) return;
        setCurrentPage(currentPage + 1);
        mostrarPagina(currentPage, productsByPage);
    }

    const mostrarPaginaAnterior = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            mostrarPagina(currentPage, productsByPage);
        }
    }


    React.useEffect(() => {
        if (!data) {
            mostrarPagina(currentPage, productsByPage);
        }
    }, [data]);

    const renderItem = ({ item }) => {
        return (
            <Card style={{ margin: 4, width: width * 0.45, borderRadius: 0 }} mode='elevated' onPress={() =>
                navigation.navigate("Product", { product: item })}>
                <Card.Cover style={{ borderRadius: 0 }} source={{ uri: item.image }} />
                <Card.Title title={item.title} titleStyle={{ fontWeight: '600' }} />
                <Card.Content style={{ marginBottom: 5 }}>
                    <Text variant="bodyMedium">{item.description}</Text>
                </Card.Content>
                <Card.Content>
                    <Text variant="bodySmall" style={{ textAlign: 'right', marginTop: 5 }}>Stock disponible: <Text style={{ fontWeight: 'bold' }}>{item.stock >= 15 ? "Mas de 15" : item.stock}</Text></Text>
                </Card.Content>
            </Card>
        );
    }

    const filter = (title) => {
        if (title === "") return mostrarPagina(currentPage, productsByPage);
        const filter = data.filter(item => item.title.toLowerCase().includes(title.toLowerCase()));
        if (filter.length === 0) return mostrarPagina(currentPage, productsByPage);
        setData(filter);
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle='dark-content' translucent backgroundColor="rgba(0,0,0,0)" />
            <Appbar.Header style={{ backgroundColor: '#ffffff' }} mode='center-aligned'>
                <Image source={require('../../images/logo.png')} style={{ width: 50, height: 50, objectFit: 'contain' }} />
                <Appbar.Content title="Catalogo" />
                <View>
                    <Appbar.Action icon="cart-outline" onPress={()=> console.log(cart, getCartItemsCount())} />
                    {cart.length !== 0 && (<Badge style={{ position: 'absolute' }}>{getCartItemsCount}</Badge>)}
                </View>
            </Appbar.Header>
            <View style={{ backgroundColor: '#ffffff' }}>
                <Searchbar style={{ backgroundColor: 'rgba(0,0,0,0)', paddingVertical: 3 }} placeholder='Search' onChangeText={(value) => filter(value)} />
            </View>
            <FlatList
                data={data}
                numColumns={2}
                contentContainerStyle={{ alignItems: 'center' }}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, justifyContent: 'space-between', height: 50 }}>
                <Text>Pag: {currentPage} of {totalPages}</Text>
                <View style={{ alignSelfL: 'flex-end', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <IconButton icon='chevron-left' onPress={() => mostrarPaginaAnterior()} />
                    <IconButton icon='chevron-right' onPress={() => mostrarSiguientePagina()} />
                </View>
            </View>
        </View>
    )
}


import React from "react";
import { View, StatusBar, FlatList, Dimensions, Image } from "react-native";
import {
	Card,
	IconButton,
	Text,
	Appbar,
	Searchbar,
	Badge,
	Button,
} from "react-native-paper";
import { mockData as products } from "../../config";
import { cartContext } from "../../context/CartContext";

const { width } = Dimensions.get("window");

export default function Home({ navigation }) {
	const [data, setData] = React.useState();
	const [currentPage, setCurrentPage] = React.useState(1);
	const [searchQuery, setSearchQuery] = React.useState("");
	const { data: cart, getCartItemsCount } = React.useContext(cartContext);
	const totalPages = Math.ceil(products.length / 10);
	const productsByPage = 10;
	const [filteredTotalPages, setFilteredTotalPages] =
		React.useState(totalPages);
	const [filteredData, setFilteredData] = React.useState(null);

	const mostrarPagina = (paginaActual, productsByPage) => {
		const inicio = (paginaActual - 1) * productsByPage;
		const fin = inicio + productsByPage;
		const paginaProductos = filteredData
			? filteredData.slice(inicio, fin)
			: products.slice(inicio, fin);
		setData(paginaProductos);
	};

	const mostrarSiguientePagina = () => {
		if (currentPage >= filteredTotalPages) return;
		setCurrentPage(currentPage + 1);
		mostrarPagina(currentPage + 1, productsByPage);
	};

	const mostrarPaginaAnterior = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
			mostrarPagina(currentPage - 1, productsByPage);
		}
	};

	React.useEffect(() => {
		if (!data) {
			mostrarPagina(currentPage, productsByPage);
		}
	}, [data]);

	const filter = (title) => {
		setSearchQuery(title);

		if (title === "") {
			setCurrentPage(1);
			mostrarPagina(1, productsByPage);
			setFilteredTotalPages(totalPages);
			setFilteredData(null);
		} else {
			const filteredProducts = products.filter((item) =>
				item.title.toLowerCase().includes(title.toLowerCase())
			);
			const newFilteredTotalPages = Math.ceil(
				filteredProducts.length / productsByPage
			);

			if (currentPage > newFilteredTotalPages) {
				setCurrentPage(newFilteredTotalPages);
			}

			setFilteredData(filteredProducts);
			setFilteredTotalPages(newFilteredTotalPages);

			mostrarPagina(1, productsByPage);
		}
	};

	const flatListData = filteredData || data;

	const renderItem = ({ item }) => {
		return (
			<Card
				style={{ margin: 4, borderRadius: 0 }}
				mode="elevated"
				onPress={() =>
					navigation.navigate("Product", { product: item })
				}
			>
				<Card.Cover
					style={{ borderRadius: 0 }}
					source={{ uri: item.image }}
				/>
				<Card.Title
					title={item.title}
					titleStyle={{ fontWeight: "600" }}
				/>
				<Card.Content style={{ marginBottom: 5 }}>
					<Text variant="bodySmall">{item.description}</Text>
				</Card.Content>
				<Card.Content>
					<Text
						variant="bodySmall"
						style={{
							textAlign: "right",
							marginTop: 5,
							fontSize: 10,
						}}
					>
						Stock inmediato:{" "}
						<Text style={{ fontWeight: "bold" }}>
							{item.stock >= 15 ? "Mas de 15" : item.stock}
						</Text>
					</Text>
					<Text
						variant="bodySmall"
						style={{
							textAlign: "right",
							marginTop: 5,
							fontSize: 10,
						}}
					>
						Stock secundario:{" "}
						<Text style={{ fontWeight: "bold" }}>
							{item.stock_secondary >= 15
								? "Mas de 15"
								: item.stock_secondary}
						</Text>
					</Text>
				</Card.Content>
			</Card>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle="dark-content"
				translucent
				backgroundColor="rgba(0,0,0,0)"
			/>
			<Appbar.Header
				style={{ backgroundColor: "#ffffff" }}
				mode="center-aligned"
			>
				<Image
					source={require("../../images/logo.png")}
					style={{ width: 50, height: 50, objectFit: "contain" }}
				/>
				<Appbar.Content title="Catálogo" />
				<View>
					<Appbar.Action
						icon="cart-outline"
						onPress={() => console.log(cart, getCartItemsCount())}
					/>
					{cart.length !== 0 && (
						<Badge style={{ position: "absolute" }}>
							{getCartItemsCount}
						</Badge>
					)}
				</View>
			</Appbar.Header>
			<View style={{ backgroundColor: "#ffffff" }}>
				<Searchbar
					style={{
						backgroundColor: "rgba(0,0,0,0)",
						paddingVertical: 3,
					}}
					placeholder="Buscar..."
					onChangeText={(value) => filter(value)}
				/>
			</View>
			<FlatList
				data={flatListData}
				numColumns={2}
				contentContainerStyle={{ alignItems: "center" }}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
			/>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 12,
					justifyContent: "space-between",
					height: 50,
				}}
			>
				<Text>
					Pag: {currentPage} de {filteredTotalPages}
				</Text>
				<View
					style={{
						alignSelfL: "flex-end",
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<IconButton
						icon="chevron-left"
						onPress={() => mostrarPaginaAnterior()}
					/>
					<IconButton
						icon="chevron-right"
						onPress={() => mostrarSiguientePagina()}
					/>
				</View>
			</View>
		</View>
	);
}

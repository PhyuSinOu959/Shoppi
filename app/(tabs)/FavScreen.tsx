import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProductState } from '../../store/reducers/product';

type RootStackParamList = {
    Home: undefined;
    ProductDetail: { id: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FavoriteProduct = {
    id: string;
    name: string;
    price: number;
    imageUrl?: string;
};

export default function FavScreen() {
    const navigation = useNavigation<NavigationProp>();
    const favorites = useSelector((state: { favorites: FavoriteProduct[] }) => state.favorites) || [];
    console.log(favorites);

    const renderItem = ({ item }: { item: FavoriteProduct }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
        >
            <Image
                source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
                style={styles.productImage}
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    const ItemSeparator = () => <View style={styles.separator} />;

    if (favorites.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No favorites yet</Text>
                <TouchableOpacity
                    style={styles.shopButton}
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text style={styles.shopButtonText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    );
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 16,
    },
    productCard: {
        width: CARD_WIDTH,
        marginBottom: 16,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: CARD_WIDTH,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    productInfo: {
        padding: 12,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        color: '#333',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#E63946',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    shopButton: {
        backgroundColor: '#E63946',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    shopButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    separator: {
        height: 16,
    },
});
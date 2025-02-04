import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useGetCategoriesQuery } from '@/services/api';
import { Category } from '@/services/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');
const COLUMN_NUM = 4;
const SPACING = 8;
const ITEM_WIDTH = (width - (SPACING * (COLUMN_NUM + 1))) / COLUMN_NUM;

type RootStackParamList = {
    Home: undefined;
    ProductDetail: { id: string };
    Category: { categoryId: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CategoryScreen() {
    const navigation = useNavigation<NavigationProp>();
    const { data: categories, isLoading } = useGetCategoriesQuery();
    console.log(categories);

    const renderItem = ({ item }: { item: Category }) => (
        <TouchableOpacity 
            style={styles.categoryItem} 
            onPress={() => navigation.navigate('Category', { categoryId: item.id })}
        >
            <View style={styles.imageContainer}>
                {item.imageUrl ? (
                    <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text style={styles.placeholderText}>📦</Text>
                    </View>
                )}
            </View>
            <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
        </TouchableOpacity>
    );

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={categories}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={COLUMN_NUM}
                contentContainerStyle={styles.listContainer}
                columnWrapperStyle={styles.columnWrapper}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: SPACING,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
        gap: SPACING,
    },
    categoryItem: {
        width: ITEM_WIDTH,
        marginBottom: SPACING,
        alignItems: 'center',
    },
    imageContainer: {
        width: ITEM_WIDTH,
        height: ITEM_WIDTH,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
        overflow: 'hidden',
        marginBottom: 4,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    placeholderText: {
        fontSize: 24,
    },
    categoryName: {
        fontSize: 12,
        textAlign: 'center',
        color: '#333',
        marginTop: 4,
    },
});


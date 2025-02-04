import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useGetCategoriesQuery } from '../../../services/api';
import { Category } from '../../../services/types';
import { useRouter } from 'expo-router';

const PARENT_CATEGORIES = [
    {
        id: '1',
        name: 'Grocery & Staple Food',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '2',
        name: 'Fruits & Vegetables',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '3',
        name: 'Meat & Seafood',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '4',
        name: 'Dairy, Chilled Products & Egg',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '5',
        name: 'Breakfast Essentials & Dessert',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '6',
        name: 'Beverage & Snacks',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '7',
        name: 'Beer, Wine & Liquor',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '8',
        name: 'City Exclusive Range',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    },
    {
        id: '9',
        name: 'Baby & Mother Care',
        imageUrl: require('../../../assets/images/categories/grocery.png'),
    }
];

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24; // 2 columns with padding

export const CategoryList = () => {
    const router = useRouter();

    const handleCategoryPress = (categoryId: string) => {
        router.push({
            pathname: '/category/[id]',
            params: { id: categoryId }
        });
    };

    const renderItem = ({ item }: { item: typeof PARENT_CATEGORIES[0] }) => (
        <TouchableOpacity 
            style={styles.categoryCard}
            onPress={() => handleCategoryPress(item.id)} 
        >
            <Image 
                source={item.imageUrl}
                style={styles.categoryImage}
                resizeMode="contain"
            />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Categories</Text>
            <FlatList
                data={PARENT_CATEGORIES}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    categoryCard: {
        width: COLUMN_WIDTH,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryImage: {
        width: COLUMN_WIDTH - 32,
        height: COLUMN_WIDTH - 32,
        marginBottom: 8,
    },
    categoryName: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
});
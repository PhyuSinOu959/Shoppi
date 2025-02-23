import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions, Animated } from 'react-native';
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { PARENT_CATEGORIES, ParentCategory, SubCategory } from './dummyData';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = width / 2 - 24; // 2 columns with padding

export const CategoryList = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [expandedSubCategory, setExpandedSubCategory] = useState<string | null>(null);
    const animationHeight = useRef(new Animated.Value(0)).current;
    const subAnimationHeight = useRef(new Animated.Value(0)).current;

    const handleCategoryPress = (categoryId: string) => {
        console.warn('ouu', 'categoryId', categoryId)
        if (expandedCategory === categoryId) {
            // Collapse if already expanded
            setExpandedCategory(null);
            setExpandedSubCategory(null);
            Animated.timing(animationHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            // Expand
            setExpandedCategory(categoryId);
            setExpandedSubCategory(null);
            Animated.timing(animationHeight, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleSubCategoryPress = (subCategoryId: string) => {
        if (expandedSubCategory === subCategoryId) {
            setExpandedSubCategory(null);
            Animated.timing(subAnimationHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        } else {
            setExpandedSubCategory(subCategoryId);
            Animated.timing(subAnimationHeight, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleProductTypePress = (categoryId: string) => {
        router.push({
            pathname: '/category/[id]',
            params: { id: categoryId }
        });
    };

    const handleAddProduct = (categoryId: string) => {
        router.push({
            pathname: '/admin/product/add',
            params: { categoryId }
        });
    };

    const renderProductTypes = (subCategory: SubCategory) => {
        if (expandedSubCategory !== subCategory.id) return null;

        return (
            <Animated.View
                style={[
                    styles.productTypesContainer,
                    {
                        maxHeight: subAnimationHeight.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 500]
                        })
                    }
                ]}
            >
                {subCategory.products.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        style={styles.productTypeItem}
                        onPress={() => handleProductTypePress(product.id)}
                    >
                        <Text style={styles.productTypeText}>{product.name}</Text>
                    </TouchableOpacity>
                ))}
                {user?.isAdmin && (
                    <TouchableOpacity
                        style={styles.addProductButton}
                        onPress={() => handleAddProduct(subCategory.id)}
                    >
                        <Ionicons name="add-circle-outline" size={20} color="#007AFF" />
                        <Text style={styles.addProductText}>Add Product</Text>
                    </TouchableOpacity>
                )}
            </Animated.View>
        );
    };

    const renderSubCategories = (parentCategory: ParentCategory) => {
        if (expandedCategory !== parentCategory.id) return null;

        // Get the index of the current category to determine if it's in the left or right column
        const categoryIndex = PARENT_CATEGORIES.findIndex(cat => cat.id === parentCategory.id);
        const isRightColumn = categoryIndex % 2 === 1;

        return (
            <View style={[
                styles.subCategoriesWrapper,
                {
                    left: isRightColumn ? -((width / 2) + 8) : -16
                }
            ]}>
                <Animated.View
                    style={[
                        styles.subCategoriesContainer,
                        {
                            maxHeight: animationHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1000]
                            })
                        }
                    ]}
                >
                    {parentCategory.subCategories.map((subCategory) => (
                        <View key={subCategory.id}>
                            <TouchableOpacity
                                style={[
                                    styles.subCategoryItem,
                                    expandedSubCategory === subCategory.id && styles.subCategoryItemActive
                                ]}
                                onPress={() => handleSubCategoryPress(subCategory.id)}
                            >
                                <Text style={styles.subCategoryText}>{subCategory.name}</Text>
                                <Ionicons 
                                    name={expandedSubCategory === subCategory.id ? "chevron-up" : "chevron-down"} 
                                    size={20} 
                                    color="#666"
                                />
                            </TouchableOpacity>
                            {renderProductTypes(subCategory)}
                        </View>
                    ))}
                </Animated.View>
            </View>
        );
    };

    const renderItem = ({ item }: { item: ParentCategory }) => (
        <View style={styles.categoryWrapper}>
            <TouchableOpacity 
                style={[
                    styles.categoryCard,
                    expandedCategory === item.id && styles.categoryCardActive
                ]}
                onPress={() => handleCategoryPress(item.id)} 
            >
                <Image 
                    source={item.imageUrl}
                    style={styles.categoryImage}
                    resizeMode="contain"
                />
                <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
            {renderSubCategories(item)}
        </View>
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
    categoryWrapper: {
        width: COLUMN_WIDTH,
    },
    categoryCard: {
        width: COLUMN_WIDTH,
        height: COLUMN_WIDTH + 60, // Fixed height: image height + padding + text height
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'space-between', // This will ensure consistent spacing
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryCardActive: {
        borderColor: '#007AFF',
        borderWidth: 2,
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
        height: 40, // Fixed height for text area
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subCategoriesWrapper: {
        position: 'absolute',
        top: '100%',
        width: width,
        zIndex: 1000,
        paddingTop: 8,
    },
    subCategoriesContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        marginHorizontal: 16,
    },
    subCategoryItem: {
        padding: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    subCategoryItemActive: {
        backgroundColor: '#f0f0f0',
    },
    subCategoryText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    productTypesContainer: {
        backgroundColor: '#f8f8f8',
        overflow: 'hidden',
    },
    productTypeItem: {
        padding: 12,
        paddingLeft: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productTypeText: {
        fontSize: 14,
        color: '#666',
    },
    addProductButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingLeft: 24,
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    addProductText: {
        fontSize: 14,
        color: '#007AFF',
        marginLeft: 8,
    },
});
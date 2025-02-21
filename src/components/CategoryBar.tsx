import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { useThemeColor } from '@/src/hooks/useThemeColor';

const categories = [
    {
        id: 'electronics',
        name: 'Electronics',
        icon: '🖥️',
        subcategories: ['Mobiles', 'Laptops', 'Power Banks']
    },
    {
        id: 'sports',
        name: 'Sports',
        icon: '⚽',
        subcategories: []
    },
    {
        id: 'fashion',
        name: 'Fashion',
        icon: '👕',
        subcategories: []
    },
    {
        id: 'home',
        name: 'Home',
        icon: '🏠',
        subcategories: []
    },
    {
        id: 'beauty',
        name: 'Beauty',
        icon: '💄',
        subcategories: []
    }
];

export function CategoryBar() {
    const [selectedCategory, setSelectedCategory] = useState('electronics');
    const [isExpanded, setIsExpanded] = useState(false);
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    const selectedCat = categories.find(cat => cat.id === selectedCategory);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.mainCategory}
                onPress={() => setIsExpanded(!isExpanded)}
            >
                <Text style={styles.mainCategoryText}>Select a category</Text>
                <Text style={styles.chevron}>{isExpanded ? '▼' : '▶'}</Text>
            </TouchableOpacity>
            
            {isExpanded && (
                <View style={styles.categoriesContainer}>
                    {categories.map((category) => (
                        <View key={category.id}>
                            <TouchableOpacity
                                onPress={() => setSelectedCategory(category.id)}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category.id && styles.selectedButton
                                ]}
                            >
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === category.id && styles.selectedText
                                    ]}
                                >
                                    {category.name}
                                </Text>
                                {category.subcategories.length > 0 && (
                                    <Text style={styles.chevronRight}>▶</Text>
                                )}
                            </TouchableOpacity>
                            
                            {selectedCategory === category.id && category.subcategories.length > 0 && (
                                <View style={styles.subcategoriesContainer}>
                                    {category.subcategories.map((subcat) => (
                                        <TouchableOpacity
                                            key={subcat}
                                            style={styles.subcategoryButton}
                                        >
                                            <Text style={styles.subcategoryText}>{subcat}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    mainCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    mainCategoryText: {
        fontSize: 16,
        color: '#666',
    },
    chevron: {
        fontSize: 12,
        color: '#666',
    },
    categoriesContainer: {
        padding: 8,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: '#f5f5f5',
    },
    categoryIcon: {
        fontSize: 18,
        marginRight: 12,
    },
    categoryText: {
        fontSize: 15,
        color: '#333',
        flex: 1,
    },
    selectedText: {
        fontWeight: '500',
    },
    chevronRight: {
        fontSize: 12,
        color: '#666',
    },
    subcategoriesContainer: {
        marginLeft: 44,
        marginTop: 4,
    },
    subcategoryButton: {
        padding: 8,
        paddingLeft: 0,
    },
    subcategoryText: {
        fontSize: 14,
        color: '#666',
    }
}); 
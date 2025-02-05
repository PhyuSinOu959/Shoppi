import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useGetProductQuery } from "@/services/api";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/Reducer/cartSlice";
import { useState } from "react";
import { Picker } from '@react-native-picker/picker';

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: product, isLoading } = useGetProductQuery(id);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [unitType, setUnitType] = useState('liter');

    const handleAddToCart = () => {
        if (product) {
            for (let i = 0; i < quantity; i++) {
                dispatch(addToCart(product.id));
            }
        }
    };

    const handleQuantityChange = (change: number) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    if (isLoading || !product) {
        return (
            <View style={styles.centered}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* <View style={styles.imageContainer}>
                {product.imageUrl && (
                    <Image 
                        source={{ uri: product.imageUrl }} 
                        style={styles.image}
                        defaultSource={require('@/assets/placeholder.png')}
                    />
                )}
            </View> */}
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>${product.price}</Text>
                    {product.originalPrice && (
                        <Text style={styles.originalPrice}>${product.originalPrice}</Text>
                    )}
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>★ {product.rating || 0}</Text>
                    <Text style={styles.soldCount}>• {product.soldCount || 0} Sold</Text>
                </View>
                {product.description && (
                    <Text style={styles.description}>{product.description}</Text>
                )}
                
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleQuantityChange(-1)}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity 
                        style={styles.quantityButton} 
                        onPress={() => handleQuantityChange(1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.unitTypeContainer}>
                    <Text style={styles.unitTypeLabel}>Unit Type:</Text>
                    <Picker
                        selectedValue={unitType}
                        style={styles.unitTypePicker}
                        onValueChange={(itemValue: string) => setUnitType(itemValue)}
                    >
                        <Picker.Item label="Liter" value="liter" />
                        <Picker.Item label="Gram" value="gram" />
                    </Picker>
                </View>

                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    imageContainer: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    infoContainer: {
        padding: 16,
        gap: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
    },
    originalPrice: {
        fontSize: 16,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    rating: {
        fontSize: 14,
        color: '#666',
    },
    soldCount: {
        fontSize: 14,
        color: '#666',
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginTop: 8,
    },
    quantityButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: '500',
        minWidth: 30,
        textAlign: 'center',
    },
    addToCartButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    addToCartButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    unitTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        marginTop: 8,
    },
    unitTypeLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    unitTypePicker: {
        height: 50,
        width: 150,
    },
});
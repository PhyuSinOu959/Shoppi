import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useGetProductQuery } from "@/services/api";

export default function DetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: product, isLoading } = useGetProductQuery(id);

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
});
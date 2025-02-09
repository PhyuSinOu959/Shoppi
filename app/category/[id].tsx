import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGetCategoriesWithProductsQuery } from '@/services/api';
import { Product } from '@/services/types/product';
import { Category } from '@/services/types/category';
import { useState } from 'react';

type QuantityType = 'pack' | 'box' | 'unit' | 'dozen';

export default function CategoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: categories, isLoading } = useGetCategoriesWithProductsQuery();
  const currentCategory = categories?.find(cat => cat.id === id);

  const renderItem = ({ item }: { item: Product }) => {
    const [selectedQuantityType, setSelectedQuantityType] = useState<QuantityType>('pack');
    const [quantity, setQuantity] = useState(1);
    
    return (
      <TouchableOpacity style={styles.productItem}>
        {item.imageUrl && (
          <ThemedView style={styles.imageContainer}>
            {/* Add Image component here if needed */}
          </ThemedView>
        )}
        <ThemedView style={styles.productInfo}>
          <ThemedText style={styles.productName}>{item.name}</ThemedText>
          <ThemedView style={styles.priceContainer}>
            <ThemedText style={styles.productPrice}>${item.price}</ThemedText>
            {item.originalPrice && (
              <ThemedText style={styles.originalPrice}>${item.originalPrice}</ThemedText>
            )}
          </ThemedView>
          <ThemedView style={styles.quantityContainer}>
            <ThemedView style={styles.quantitySelector}>
              <TouchableOpacity 
                onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                style={styles.quantityButton}
              >
                <ThemedText style={styles.quantityButtonText}>-</ThemedText>
              </TouchableOpacity>
              <ThemedText style={styles.quantityText}>{quantity}</ThemedText>
              <TouchableOpacity 
                onPress={() => setQuantity(quantity + 1)}
                style={styles.quantityButton}
              >
                <ThemedText style={styles.quantityButtonText}>+</ThemedText>
              </TouchableOpacity>
            </ThemedView>
            <Picker<QuantityType>
              selectedValue={selectedQuantityType}
              onValueChange={(itemValue: QuantityType) => setSelectedQuantityType(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Pack" value="pack" />
              <Picker.Item label="Box" value="box" />
              <Picker.Item label="Unit" value="unit" />
              <Picker.Item label="Dozen" value="dozen" />
            </Picker>
          </ThemedView>
          {(item.rating || item.soldCount) && (
            <ThemedView style={styles.statsContainer}>
              {item.rating && (
                <ThemedText style={styles.rating}>★ {item.rating}</ThemedText>
              )}
              {item.soldCount && (
                <ThemedText style={styles.soldCount}>• {item.soldCount} sold</ThemedText>
              )}
            </ThemedView>
          )}
        </ThemedView>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (!currentCategory) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Category not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: currentCategory.name || 'Category Products',
          headerShown: true 
        }} 
      />
      <FlatList
        data={currentCategory.products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.container}
        contentContainerStyle={styles.listContent}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    color: '#666',
  },
  soldCount: {
    fontSize: 14,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 4,
  },
  quantityButton: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
  },
  quantityText: {
    paddingHorizontal: 12,
    fontSize: 16,
  },
  picker: {
    height: 40,
    width: 120,
  },
}); 
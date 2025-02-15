import { StyleSheet, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '@/store/Reducer/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { useGetProductQuery } from '@/services/api';
import { useMemo } from 'react';

interface CartItem {
  id: string;
  quantity: number;
}

const CartItemComponent = ({ item }: { item: CartItem }) => {
  const dispatch = useDispatch();
  const { data: product } = useGetProductQuery(item.id);

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  if (!product) return null;

  return (
    <ThemedView style={styles.cartItem}>
      <View style={styles.imageContainer}>
        {product.imageUrl && (
          <Image 
            source={{ uri: product.imageUrl }} 
            style={styles.productImage}
            defaultSource={require('@/assets/placeholder.png')}
          />
        )}
      </View>
      
      <View style={styles.itemDetails}>
        <ThemedText style={styles.productName}>{product.name}</ThemedText>
        <ThemedText style={styles.price}>${product.price}</ThemedText>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => handleQuantityChange(-1)}
          >
            <ThemedText style={styles.quantityButtonText}>-</ThemedText>
          </TouchableOpacity>
          
          <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
          
          <TouchableOpacity 
            style={styles.quantityButton} 
            onPress={() => handleQuantityChange(1)}
          >
            <ThemedText style={styles.quantityButtonText}>+</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.removeButton}
        onPress={handleRemove}
      >
        <Ionicons name="trash-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default function CartScreen() {
  const cartItems = useSelector((state: { cart: { items: CartItem[] } }) => state.cart.items);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  if (cartItems.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={64} color="#999" />
        <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.itemCount}>
        {totalItems} {totalItems === 1 ? 'item' : 'items'}
      </ThemedText>
      
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItemComponent item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  itemCount: {
    fontSize: 16,
    color: '#666',
    padding: 16,
    paddingBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
}); 
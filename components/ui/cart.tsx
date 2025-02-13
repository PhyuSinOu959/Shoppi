import { StyleSheet, FlatList, Image, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity } from '@/store/Reducer/cartSlice';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo } from 'react';

export default function CartScreen() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.products);

  const cartItemsWithDetails = useMemo(() => {
    return cartItems.map(item => {
      const product = products.find(p => p.id === item.id);
      return {
        ...item,
        ...product,
      };
    });
  }, [cartItems, products]);

  const totalPrice = useMemo(() => {
    return cartItemsWithDetails.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
  }, [cartItemsWithDetails]);

  const handleRemoveItem = useCallback((id: string) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  }, [dispatch]);

  const renderItem = ({ item }: { item: any }) => (
    <ThemedView style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText type="body">${item.price}</ThemedText>
        <View style={styles.quantityControl}>
          <TouchableOpacity 
            onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
            style={styles.quantityButton}
          >
            <ThemedText>-</ThemedText>
          </TouchableOpacity>
          <ThemedText style={styles.quantity}>{item.quantity}</ThemedText>
          <TouchableOpacity 
            onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
            style={styles.quantityButton}
          >
            <ThemedText>+</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        onPress={() => handleRemoveItem(item.id)}
        style={styles.removeButton}
      >
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </ThemedView>
  );

  if (cartItems.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <Ionicons name="cart-outline" size={64} color="gray" />
        <ThemedText type="title" style={styles.emptyText}>Your cart is empty</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={cartItemsWithDetails}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <ThemedView style={styles.footer}>
        <View style={styles.totalContainer}>
          <ThemedText type="subtitle">Total:</ThemedText>
          <ThemedText type="title">${totalPrice.toFixed(2)}</ThemedText>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <ThemedText style={styles.checkoutButtonText}>Checkout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 16,
    color: 'gray',
  },
  listContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  quantity: {
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 
import { useGetProductListQuery } from '@/services/api'
import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
} from 'react-native'
import { SearchBar } from './SearchBar'
import { useDispatch } from 'react-redux'
import { router } from 'expo-router'

type Product = {
  id: string
  name: string
  description?: string
  price: number
  originalPrice?: number
  imageUrl?: string
  rating?: number
  soldCount?: number
}

export const ShowData = () => {
  const { data, isLoading, error } = useGetProductListQuery(undefined)
  const products = data?.products || []
  const dispatch = useDispatch();

  const handleProductDetail = (id: string) => {
    router.push({
      pathname: "/product/[id]",
      params: { id }
    });
  }

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable style={styles.productCard} onPress={() => {
      handleProductDetail(item.id)
    }}>
      <View style={styles.imageContainer}>
        {/* <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.productImage}
          defaultSource={require('@/assets/placeholder.png')}
        /> */}
        <Pressable style={styles.favoriteButton}>
          <Text>♡</Text>
        </Pressable>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>★ {item.rating || 0}</Text>
          <Text style={styles.soldCount}>• {item.soldCount || 0} Sold</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          )}
        </View>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.container}>
      <SearchBar />
      
      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {error && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error loading products</Text>
        </View>
      )}

      <View style={styles.headerContainer}>
        <Text style={styles.sectionTitle}>Most Popular</Text>
        <Pressable>
          <Text style={styles.viewAll}>View All</Text>
        </Pressable>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.noProducts}>No products available</Text>
        )}
      />
    </View>
  )
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    color: '#666',
    fontSize: 14,
  },
  productList: {
    padding: 8,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    padding: 12,
    gap: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: '#666',
  },
  soldCount: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  errorText: {
    color: 'red',
  },
  noProducts: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
})

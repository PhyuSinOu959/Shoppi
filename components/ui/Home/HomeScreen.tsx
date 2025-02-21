import { useGetProductListQuery } from '@/src/services/api'
import React, { useState, useMemo } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  SectionList,
} from 'react-native'
import { SearchBar } from '../../../src/components/SearchBar'
import { useDispatch } from 'react-redux'
import { router } from 'expo-router'
import { CategoryBar } from '../../../src/components/CategoryBar'
import { SortBar, SortOption } from '../../../src/components/SortBar'
import { FunctionBar } from '../../../src/components/FunctionBar'
import { CategoryList } from './CategoryList'

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

type Section = {
  title: string
  subtitle?: string
  data: Product[][]
}

export const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductListQuery(undefined)
  const [currentSort, setCurrentSort] = useState<SortOption>('default')
  const dispatch = useDispatch()

  const sortProducts = (products: Product[]) => {
    if (!products) return [];
    
    const sorted = [...products];
    switch (currentSort) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'popularity':
        return sorted.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
      default:
        return sorted;
    }
  };

  const sortedProducts = useMemo(() => {
    return sortProducts(data?.products || []);
  }, [data?.products, currentSort]);

  const sections: Section[] = useMemo(() => [
    {
      title: 'Most Popular',
      subtitle: 'Top picks for you',
      data: [sortedProducts.slice(0, 6)],
    },
    {
      title: 'New Arrivals',
      subtitle: 'Fresh finds for your needs',
      data: [sortedProducts.slice(6, 12)],
    },
    {
      title: 'Best Deals',
      subtitle: 'Great savings on great items',
      data: [sortedProducts.slice(12, 18)],
    },
  ], [sortedProducts]);

  const handleProductDetail = (id: string) => {
    router.push({
      pathname: "/product/[id]",
      params: { id }
    })
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

  const renderSectionHeader = ({ section }: { section: Section }) => (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>{section.title}</Text>
        {section.subtitle && (
          <Text style={styles.sectionSubtitle}>{section.subtitle}</Text>
        )}
      </View>
      <Pressable>
        <Text style={styles.viewAll}>View All</Text>
      </Pressable>
    </View>
  )

  const renderSectionContent = ({ item }: { item: Product[] }) => (
    <FlatList
      data={item}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      horizontal={false}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={styles.productRow}
    />
  )

  return (
    <View style={styles.container}>
      <SearchBar />
      <FunctionBar />
      {/* <CategoryBar /> */}
      {/* <SortBar currentSort={currentSort} onSortChange={setCurrentSort} /> */}
      <CategoryList />
      
      {isLoading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {/* {error && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error loading products</Text>
        </View>
      )} */}

      {/* <SectionList
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderSectionContent}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.sectionList}
      /> */}

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
  sectionList: {
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  viewAll: {
    color: '#666',
    fontSize: 14,
  },
  productRow: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
    backgroundColor: '#f5f5f5',
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
})

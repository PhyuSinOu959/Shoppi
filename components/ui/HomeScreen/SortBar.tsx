import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'popularity';

interface SortBarProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortBar: React.FC<SortBarProps> = ({ currentSort, onSortChange }) => {
  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'price-asc':
        return 'Price: Low to High';
      case 'price-desc':
        return 'Price: High to Low';
      case 'rating':
        return 'Highest Rated';
      case 'popularity':
        return 'Most Popular';
      default:
        return 'Default';
    }
  };

  const sortOptions: SortOption[] = ['default', 'price-asc', 'price-desc', 'rating', 'popularity'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort by:</Text>
      <View style={styles.optionsContainer}>
        {sortOptions.map((option) => (
          <Pressable
            key={option}
            style={[
              styles.option,
              currentSort === option && styles.selectedOption,
            ]}
            onPress={() => onSortChange(option)}
          >
            <Text
              style={[
                styles.optionText,
                currentSort === option && styles.selectedOptionText,
              ]}
            >
              {getSortLabel(option)}
            </Text>
            {currentSort === option && (
              <Ionicons name="checkmark" size={16} color="#007AFF" />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#666',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f5f5f5',
    gap: 4,
  },
  selectedOption: {
    backgroundColor: '#e8f2ff',
  },
  optionText: {
    fontSize: 13,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
}); 
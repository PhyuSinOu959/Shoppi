import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useThemeColor } from '@/src/hooks/useThemeColor';

export function SearchBar() {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, { backgroundColor }]}>
        {/* <IconSymbol name="chevron.right" size={20} color={iconColor} style={styles.searchIcon} /> */}
        <TextInput
          placeholder="Search here..."
          placeholderTextColor="#999"
          style={[styles.input, { color: textColor }]}
        />
      </View>
      <TouchableOpacity style={styles.filterButton}>
        <IconSymbol name="line.3.horizontal.decrease" size={20} color={iconColor} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 44,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 
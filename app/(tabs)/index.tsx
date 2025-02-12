import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { HomeScreen } from '@/components/ui/Home/HomeScreen';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <View style={styles.headerContent}>
            <ThemedText type="title">ClickMart</ThemedText>
            <TouchableOpacity 
              onPress={() => router.push('/cart')}
              style={styles.cartButton}
            >
              <IconSymbol name="cart.fill" size={24} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </ThemedView>
        <HomeScreen />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartButton: {
    padding: 8,
  },
});

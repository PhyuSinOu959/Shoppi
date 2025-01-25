import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DetailScreen from '@/components/ui/HomeScreen/DetailScreen';

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Product Details',
          headerShown: true 
        }} 
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={styles.container}>
          <DetailScreen />
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 
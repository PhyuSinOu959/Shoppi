import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function CategoryDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Category Products',
          headerShown: true 
        }} 
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={styles.container}>
          <ThemedText>Products for category {id}</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
}); 
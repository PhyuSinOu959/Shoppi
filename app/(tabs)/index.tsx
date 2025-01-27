import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DataList } from '@/components/ui/HomeScreen/DataList';
import { ShowData } from '@/components/ui/HomeScreen/ShowData';
import { SearchBar } from '@/components/ui/HomeScreen/SearchBar';
import { CategoryBar } from '@/components/ui/HomeScreen/CategoryBar';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">ClickMart</ThemedText>
        </ThemedView>
        <ShowData />
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
  },
});

import { View, Text, StyleSheet } from 'react-native';

export default function CategoryDetail() {
    return (
        <View style={styles.container}      >
            <View style={styles.header}>
                <Text style={styles.title}>Category Detail</Text>
            </View>
            <View style={styles.productList}>
                <Text>Product List</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productList: {
        padding: 16,
    },
    productItem: {
        padding: 16,
    }
});
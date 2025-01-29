import { StyleSheet, ScrollView, TouchableOpacity, Image, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol, type IconSymbolName } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';

// Temporary mock data - In a real app, this would come from your auth/user state management
const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://via.placeholder.com/100',
  orderCount: 12,
  wishlistCount: 8,
};

const ProfileSection = ({ icon, title, value }: { icon: IconSymbolName; title: string; value: string | number }) => {
  const iconColor = useThemeColor({}, 'icon');
  return (
    <ThemedView style={styles.section}>
      <IconSymbol name={icon} size={24} color={iconColor} />
      <View style={styles.sectionContent}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <ThemedText style={styles.sectionValue}>{value}</ThemedText>
      </View>
      <IconSymbol name="chevron.right" size={20} color={iconColor} />
    </ThemedView>
  );
};

export default function ProfileScreen() {
  const iconColor = useThemeColor({}, 'icon');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <ThemedView style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: mockUserData.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.editAvatarButton}>
            <IconSymbol name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <ThemedText type="title" style={styles.name}>{mockUserData.name}</ThemedText>
        <ThemedText style={styles.email}>{mockUserData.email}</ThemedText>
      </ThemedView>

      {/* Stats Section */}
      <ThemedView style={styles.statsContainer}>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>{mockUserData.orderCount}</ThemedText>
          <ThemedText style={styles.statLabel}>Orders</ThemedText>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <ThemedText style={styles.statValue}>{mockUserData.wishlistCount}</ThemedText>
          <ThemedText style={styles.statLabel}>Wishlist</ThemedText>
        </View>
        <View style={styles.statItem}>
          <ThemedText style={styles.statValue}>4.8</ThemedText>
          <ThemedText style={styles.statLabel}>Rating</ThemedText>
        </View>
      </ThemedView>

      {/* Menu Sections */}
      <ThemedView style={styles.menuContainer}>
        <ProfileSection icon="person.fill" title="Edit Profile" value="Personal Info" />
        <ProfileSection icon="bag.fill" title="My Orders" value={`${mockUserData.orderCount} orders`} />
        <ProfileSection icon="heart.fill" title="Wishlist" value={`${mockUserData.wishlistCount} items`} />
        <ProfileSection icon="location.fill" title="Shipping Address" value="2 addresses" />
        <ProfileSection icon="creditcard.fill" title="Payment Methods" value="3 cards" />
        <ProfileSection icon="bell.fill" title="Notifications" value="On" />
        <ProfileSection icon="gear" title="Settings" value="App settings" />
        <ProfileSection icon="questionmark.circle.fill" title="Help Center" value="FAQs & Support" />
      </ThemedView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <IconSymbol name="arrow.right.square" size={24} color="#E63946" />
        <ThemedText style={styles.logoutText}>Log Out</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#333',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionContent: {
    flex: 1,
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionValue: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#E63946',
  },
}); 
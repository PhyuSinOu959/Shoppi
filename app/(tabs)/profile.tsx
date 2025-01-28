import React, { useState } from 'react';
import { StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { UserProfile } from '@/services/types/user';

// Mock user data - Replace with actual API call in production
const mockUser: UserProfile = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phoneNumber: '+1 234 567 8900',
  avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe',
  address: '123 Main St, City, Country',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isEmailVerified: true,
  preferences: {
    notifications: true,
    newsletter: false,
    darkMode: false,
  },
};

export default function ProfileScreen() {
  const [user] = useState<UserProfile>(mockUser);

  const ProfileSection = ({ icon, title, value, onPress }: { icon: string, title: string, value: string, onPress?: () => void }) => (
    <TouchableOpacity style={styles.section} onPress={onPress}>
      <Ionicons name={icon as any} size={24} color="#666" />
      <ThemedView style={styles.sectionContent}>
        <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        <ThemedText style={styles.sectionValue}>{value}</ThemedText>
      </ThemedView>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{ uri: user.avatarUrl }}
            style={styles.avatar}
          />
          <ThemedView style={styles.editAvatarButton}>
            <Ionicons name="camera" size={20} color="#fff" />
          </ThemedView>
        </TouchableOpacity>
        <ThemedText style={styles.name}>{`${user.firstName} ${user.lastName}`}</ThemedText>
        <ThemedText style={styles.email}>{user.email}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedText style={styles.sectionHeader}>Personal Information</ThemedText>
        <ProfileSection
          icon="person-outline"
          title="Full Name"
          value={`${user.firstName} ${user.lastName}`}
        />
        <ProfileSection
          icon="mail-outline"
          title="Email"
          value={user.email}
        />
        <ProfileSection
          icon="call-outline"
          title="Phone"
          value={user.phoneNumber || 'Add phone number'}
        />
        <ProfileSection
          icon="location-outline"
          title="Address"
          value={user.address || 'Add address'}
        />

        <ThemedText style={[styles.sectionHeader, styles.mt20]}>Settings</ThemedText>
        <ProfileSection
          icon="notifications-outline"
          title="Notifications"
          value={user.preferences?.notifications ? 'On' : 'Off'}
        />
        <ProfileSection
          icon="mail-outline"
          title="Newsletter"
          value={user.preferences?.newsletter ? 'Subscribed' : 'Not subscribed'}
        />
        <ProfileSection
          icon="moon-outline"
          title="Dark Mode"
          value={user.preferences?.darkMode ? 'On' : 'Off'}
        />

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#E63946" />
          <ThemedText style={styles.logoutText}>Log Out</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    backgroundColor: '#007AFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
  },
  sectionContent: {
    flex: 1,
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  sectionValue: {
    fontSize: 14,
    color: '#666',
  },
  mt20: {
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 32,
  },
  logoutText: {
    color: '#E63946',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
}); 
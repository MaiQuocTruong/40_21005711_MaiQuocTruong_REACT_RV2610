import React from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="arrow-back" size={24} color="black" style={styles.backIcon} />
      <Text style={styles.title}>Profile</Text>
      <Ionicons name="settings-outline" size={24} color="black" style={styles.settingsIcon} />

      <View style={styles.profileImageContainer}>
        <Image
          source={require('../assets/Data/ava1.png')}
          style={styles.profileImage}
        />
      </View>
      <Text style={styles.name}>Kim Jennie</Text>
      <Text style={styles.role}>Artist</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value="kim.jennie@gmail.com" editable={false} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value="+6281234567890" editable={false} />

        <Text style={styles.label}>Website</Text>
        <TextInput style={styles.input} value="www.blackpink.com" editable={false} />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput style={styles.input} value="********" secureTextEntry editable={false} />
          <Ionicons name="eye-off-outline" size={20} color="black" />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF3F3',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  profileImageContainer: {
    marginTop: 30,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  role: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  infoContainer: {
    width: '90%',
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: 'gray',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    fontSize: 16,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
  },
  logoutButton: {
    marginTop: 20,
    width: '90%',
    padding: 15,
    backgroundColor: '#FF5A5F',
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  }
});

export default ProfileScreen;

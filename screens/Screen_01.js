import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput } from 'react-native';
import axios from 'axios';

const Screen_01 = () => {
    const [category, setCategory] = useState([]);
    const [location, setLocation] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);

    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
       axios.get('https://671ba9d92c842d92c380d3a1.mockapi.io/category').then((response) => {
        setCategory(response.data);
       });
       axios.get('https://671ba9d92c842d92c380d3a1.mockapi.io/location').then((response) => {
        setLocation(response.data);
       });
    }, []);

    const numColumns = 4;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView style={{width: "100%", height: 500}}>
                {/* Header */}
                <View style={styles.headerContainer}>
                   <View style={styles.header}>
                      <Image source={require('../assets/logoicon.png')} style={styles.logoicon}/>
                      <View style={[styles.searchBox, searchFocused && styles.inputContainerFocused]}>
                         <TextInput
                            style={styles.searchInput}
                            placeholder= "Search here..."
                            value={searchQuery}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            onChangeText={setSearchQuery}
                         />
                         <Image source={require('../assets/findicon.png')} style={styles.searchIcon}/>
                      </View>
                   </View>

                   <View style={styles.userInfoContainer}>
                     <View style={styles.userInfo}>
                        <Image source={require('../assets/personicon.png')} style={styles.userImage}/>
                        <View>
                            <Text style={styles.welcomeText}>Welcome!</Text>
                            <Text style={styles.userName}>Donna Stroupe</Text>
                        </View>
                     </View>
                     <Image source={require('../assets/ringicon.png')} style={styles.iconBell}/>
                   </View>
                </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        backgroundColor: '#fff',
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25:0,
    },
    headerContainer:{
        backgroundColor: '#5958b2',
        height: 220,
    },
    header: {
        padding: 20,
        marginTop: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoicon:{
        width: 50,
        height: 50,
    },
    searchBox:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputContainerFocused:{
        borderColor: '#1f1f1f',
        borderWidth: 1,
    },
    searchInput:{
        backgroundColor: 'transparent',
        outlineWidth: 0,
        flex: 1,
    },
    searchIcon:{
        width: 20,
        height: 20,
    },
    userInfoContainer:{
        paddingRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userInfo:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        paddingLeft: 23,
    },
    userImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    welcomeText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
    userName:{
        fontSize: 16,
        color: '#ddd',
        marginLeft: 10,
    },
    iconBell:{
        width: 50,
        height: 50
    },
});

export default Screen_01;

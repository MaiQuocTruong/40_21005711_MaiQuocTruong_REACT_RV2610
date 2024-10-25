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

                {/* Categories */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Category</Text>
                    <Image source={require('../assets/3gach.png')} style={styles.icon3gach}/>
                </View>
                <FlatList
                    data={category}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={[styles.categoryItem, {width: screenWidth / numColumns }]}>
                            <View style={styles.categoryIconContainer}>
                                <Image source={{ uri: item.image }} style={styles.categoryIcon}/>
                            </View>
                            <Text style={styles.categoryText}>{item.name}</Text>
                        </TouchableOpacity>
                    )}
                    numColumns={numColumns}
                />

                {/* Popular Destination */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Popular Destination</Text>
                    <Image source={require('../assets/3gach.png')} style={styles.icon3gach}/>
                </View>
                <FlatList
                    data={location.slice(0, 3)}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }} style={styles.locationImage}/>
                    )}
                />

                {/* Recommended */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Recommended</Text>
                </View>
                <FlatList
                    data={location.slice(3, 5)}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item.image }} style={styles.locationImageOfRec}/>
                    )}
                />
                </ScrollView>

                {/* Footer or bottom nav */}
                <View style={styles.bottomNav}>
                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('../assets/homeicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Home</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('../assets/exploreicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Explore</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('../assets/searchicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Search</Text>
                   </TouchableOpacity>

                   <TouchableOpacity style={styles.navItem}>
                       <Image source={require('../assets/profileicon.png')} style={styles.navicon}/>
                       <Text style={styles.navLabel}>Profile</Text>
                   </TouchableOpacity>
                </View>
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
    sectionContainer:{
        padding: 20,
        paddingLeft: 10,
        paddingRight: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectionTitle:{
        fontSize: 20,
        margin: 10,
        textAlign: 'left',
    },
    icon3gach:{
        width: 30,
        height: 30,
    },
    categoryItem:{
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    categoryIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#6C63FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIcon:{
        width: 64,
        height: 64,
    },
    categoryText:{
        marginTop: 8,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    locationImage:{
        width: 122,
        height: 122,
        margin: 10,
        borderRadius: 10,
    },
    locationImageOfRec:{
        width: 192,
        height: 192,
        borderRadius: 10,
        margin: 10,
    },
    bottomNav:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#5958b2',
        padding: 25,
    },
    navItem:{
        alignItems: 'center',
    },
    navLabel:{
        color: '#fff',
        fontSize: 14,
        marginTop: 4,
    },
    navicon:{
        width: 40,
        height: 40,
    },
});

export default Screen_01;

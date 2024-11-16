import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API from '../API';

const popularSearches = [
    { title: "Lunilo Hils jacket", searches: "1.6k", tag: "Hot", image: "https://placehold.co/50x50" },
    { title: "Denim Jeans", searches: "1k", tag: "New", image: "https://placehold.co/50x50" },
    { title: "Redil Backpack", searches: "1.23k", tag: "Popular", image: "https://placehold.co/50x50" },
    { title: "JBL Speakers", searches: "1.1k", tag: "New", image: "https://placehold.co/50x50" }
];

const SearchScreen = ({ navigation }: { navigation: any }) => {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [lastSearches, setLastSearches] = useState([]);

    const handleSearch = async () => {
        if (!search) return;

        try {
            const updatedSearches = [...lastSearches, { title: search }];
            setLastSearches(updatedSearches);
            await AsyncStorage.setItem('lastSearches', JSON.stringify(updatedSearches));

            const response = await axios.post(`${API}/product/search?query=`, { query: search });
            setSearchResults(response.data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handlePress = (item) => {
        navigation.navigate('Detail', {
            id: item.id,
            imageUri: `${API}/product/${item.id}/image` ,
            name: item.name,
            description: item.description,
            price: item.price
        });
    };

    const loadLastSearches = async () => {
        try {
            const searches = await AsyncStorage.getItem('lastSearches');
            if (searches) {
                setLastSearches(JSON.parse(searches));
            }
        } catch (error) {
            console.error('Failed to load last searches:', error);
        }
    };

    useEffect(() => {
        loadLastSearches();
    }, []);

    useEffect(() => {
        if (search) {
            handleSearch();
        }
    }, [search]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                    <FontAwesome name="chevron-left" size={24} color="gray" />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={styles.lastSearchContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Last Search</Text>
                    <TouchableOpacity onPress={() => { 
                        setLastSearches([]); // Xóa tất cả tìm kiếm
                        AsyncStorage.removeItem('lastSearches'); // Xóa khỏi AsyncStorage
                    }}>
                        <Text style={styles.clearText}>Clear All</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {lastSearches.map((item, index) => (
                        <View key={index} style={styles.searchTag}>
                            <Text>{item.title}</Text>
                            <TouchableOpacity>
                                <Text style={styles.closeIcon}>×</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View>
                <Text style={styles.headerText}>Popular Search</Text>
                <FlatList
                    data={popularSearches}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.popularItem}>
                            <Image source={{ uri: item.image }} style={styles.popularImage} />
                            <View style={styles.popularInfo}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemSearches}>{item.searches} searches today</Text>
                            </View>
                            <View style={styles.tagContainer}>
                                <Text style={styles.tagText}>{item.tag}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>

            {searchResults.length > 0 && (
                <View style={styles.lastSearchContainer}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Search Results</Text>
                        <TouchableOpacity>
                            <Text style={styles.clearText}>Clear All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {searchResults.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handlePress(item)} style={styles.searchTag}>
                                <Text>{item.name}</Text>
                                <TouchableOpacity>
                                    <Text style={styles.closeIcon}>×</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        marginLeft: 10,
        borderColor: '#A78BFA',
        borderRadius: 50,
    },
    lastSearchContainer: {
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    clearText: {
        fontSize: 14,
        color: '#3B82F6',
    },
    searchTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        padding: 8,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    closeIcon: {
        marginLeft: 8,
    },
    popularItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    popularImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 16,
    },
    popularInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemSearches: {
        fontSize: 12,
        color: '#6B7280',
    },
    tagContainer: {
        backgroundColor: '#FEE2E2',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    tagText: {
        fontSize: 12,
        color: '#EF4444',
    },
});

export default SearchScreen;

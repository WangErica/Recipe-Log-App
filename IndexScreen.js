import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Context } from '../context/DiaryContext';
import RecipeCard from '../components/RecipeCard';
import CustomDropdown from '../components/CustomDropdown';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';

// Define the categories for the dropdown
const categories = ['All', 'Appetizers', 'Main Courses', 'Desserts'];

const IndexScreen = ({ navigation }) => {
  const { state, toggleFavoritePost, deleteDiaryPost } = useContext(Context);
  // Set up state variables
  const [selectedCategory, setSelectedCategory] = useState('All'); // The default category is 'All'
  const [searchQuery, setSearchQuery] = useState(''); // This is the search query string
  const [showFavorites, setShowFavorites] = useState(false); // The toggle for showing favorite recipes
  const [searchedRecipes, setSearchedRecipes] = useState([]); // State to hold the searched recipes

  // useEffect hook to update searched recipes based on search query and selected category
  useEffect(() => {
    // Filter the posts by selected category
    const filteredState = selectedCategory === 'All'
      ? state
      : state.filter(post => post.category === selectedCategory);

    // Filter the posts by search query
    const filteredRecipes = filteredState.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.ingredients.some(ingredient =>
        ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    setSearchedRecipes(filteredRecipes); // Update the searched recipes state

    // Debugging logs
    console.log('Filtered State:', filteredState);
    console.log('Search Query:', searchQuery);
    console.log('Searched Recipes:', filteredRecipes);
  }, [state, selectedCategory, searchQuery]);

  // Separate the favorite recipes and other recipes
  const favoriteRecipes = searchedRecipes.filter(post => post.favorite);
  const otherRecipes = searchedRecipes.filter(post => !post.favorite);

  // Function to render each favorite recipe card
  const renderFavoriteRecipeCard = ({ item }) => (
    <RecipeCard
      recipe={item}
      onPress={() => navigation.navigate('View', { id: item.id })}
      onFavoriteToggle={() => toggleFavoritePost(item.id)}
      onDelete={() => deleteDiaryPost(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={searchedRecipes}
        keyExtractor={(post) => post.id.toString()} // Unique key for each item
        ListHeaderComponent={
          <>
            <TextInput
              style={styles.searchBar}
              placeholder="Search by title or ingredient"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <CustomDropdown
              options={categories}
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              label="Category"
            />
            <TouchableWithoutFeedback onPress={() => setShowFavorites(!showFavorites)}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.section2Header}>Favorites</Text>
                <Feather
                  name={showFavorites ? "chevron-up" : "chevron-down"}
                  size={24} color="black"
                />
              </View>
            </TouchableWithoutFeedback>
            {/* Render the favorite recipes if showFavorites is true */}
            {showFavorites && (
              <FlatList
                data={favoriteRecipes}
                keyExtractor={(post) => post.id.toString()}
                renderItem={renderFavoriteRecipeCard}
                style={styles.favoriteList}
                contentContainerStyle={styles.favoriteListContent}
              />
            )}
            <Text style={[styles.sectionHeader, !showFavorites && styles.collapsedSectionHeader]}>All Recipes</Text>
          </>
        }
        // Render each item in the main recipe list
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            onPress={() => navigation.navigate('View', { id: item.id })}
            onFavoriteToggle={() => toggleFavoritePost(item.id)}
            onDelete={() => deleteDiaryPost(item.id)}
          />
        )}
      />
      {/* Button to navigate to the create screen */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Create')}>
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDEB',
  },
  searchBar: {
    height: 40,
    borderColor: '#666',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginVertical: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F8EDEB', 
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  section2Header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  collapsedSectionHeader: {
    marginTop: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 20,
  },
  favoriteListContent: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#da5552',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default IndexScreen
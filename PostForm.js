import React, { useState } from 'react';
import { StyleSheet,Button, Text, TextInput, View, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomDropdown from '../components/CustomDropdown';

const units = ['count', 'quart', 'pints', 'grams', 'kilograms', 'cups', 
              'ounces', 'pounds', 'tablespoon', 'teaspoons'];
const categories = ['Appetizers', 'Main Courses', 'Desserts'];

// Define the PostForm component with initial values
const PostForm = ({ onSubmit, inititalValues = { title: '', content: '', ingredients: [],
                    difficulty: 1, category: 'Appetizers' } }) => {
  
  // State variables to manage form inputs
  const [title, setTitle] = useState(inititalValues.title); // The title of the recipe
  const [content, setContent] = useState(inititalValues.content); // The content of the recipe
  const [ingredients, setIngredients] = useState(inititalValues.ingredients || []); 
  const [newIngredient, setNewIngredient] = useState({ name: '', quantity: '', unit: 'grams' }); 
  const [difficulty, setDifficulty] = useState(inititalValues.difficulty); 
  const [category, setCategory] = useState(inititalValues.category); // Category of the recipe

  // Function to add a new ingredient to the ingredients list
  const addIngredient = () => {
    setIngredients([...ingredients, newIngredient]);
    setNewIngredient({ name: '', quantity: '', unit: 'grams' });
  };

  // Function to delete an ingredient from the ingredients list
  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Function to edit an existing ingredient in the ingredients list
  const editIngredient = (index, key, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = { ...updatedIngredients[index], [key]: value };
    setIngredients(updatedIngredients);
  };

  // Function to render difficulty buttons
  const renderDifficultyButtons = () => (
    <View style={styles.difficultyContainer}>
      {[1, 2, 3, 4, 5].map((level) => (
        <Button key={level}
          title={String(level)}
          onPress={() => setDifficulty(level)}
          color={difficulty === level ? '#e70e02' : '#666'}
        />
      ))}
    </View>
  );

  // Render the PostForm component
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        autoCapitalize="words"
        autoCorrect={false}
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Category:</Text>
      <CustomDropdown
        options={categories}
        selectedValue={category}
        onValueChange={setCategory}
        label="Course Type"
      />
      <Text style={styles.label}>Ingredients:</Text>
      <View>
        {ingredients.map((ingredient, index) => (
          <View key={index} style={styles.ingredientRow}>
            <TextInput
              style={styles.ingredientInput}
              value={ingredient.name}
              onChangeText={(text) => editIngredient(index, 'name', text)}
              placeholder="Ingredient"
            />
            <TextInput
              style={styles.quantityInput}
              value={ingredient.quantity}
              onChangeText={(text) => editIngredient(index, 'quantity', text)}
              placeholder="Amount"
              keyboardType="numeric"
            />
            <View style={styles.unitInput}>
              <CustomDropdown
                options={units}
                selectedValue={ingredient.unit}
                onValueChange={(value) => editIngredient(index, 'unit', value)}
              />
            </View>
            <TouchableOpacity onPress={() => deleteIngredient(index)}>
              <MaterialIcons name="delete" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.ingredientRow}>
        <TextInput
          style={styles.ingredientInput}
          value={newIngredient.name}
          onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
          placeholder="Ingredient"
        />
        <TextInput
          style={styles.quantityInput}
          value={newIngredient.quantity}
          onChangeText={(text) => setNewIngredient({ ...newIngredient, quantity: text })}
          placeholder="Amount"
          keyboardType="numeric"
        />
        <View style={styles.unitInput}>
          <CustomDropdown
            options={units}
            selectedValue={newIngredient.unit}
            onValueChange={(value) => setNewIngredient({ ...newIngredient, unit: value })}
          />
        </View>
      </View>
      <Button title="Add Ingredient" onPress={addIngredient} color="#007AFF" />
      <Text style={styles.label}>Difficulty:</Text>
      {renderDifficultyButtons()}
      <Button
        title="Save Recipe"
        onPress={() => onSubmit(title, content, ingredients, difficulty, category)}
        color="#007AFF"
      />
    </View>
  );
};

// Styles for the component are defined below but not commented as per request
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8EDEB',
    padding: 10,
  },
  label: {
    fontSize: 20,
    margin: 10,
    marginBottom: 5,
    color: '#333333',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    padding: 5,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientInput: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    margin: 5,
    marginLeft: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  quantityInput: {
    width: 80,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#666',
    margin: 5,
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'white',
  },
  unitInput: {
    flex: 1,
    marginBottom: 25,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
});

export default PostForm;
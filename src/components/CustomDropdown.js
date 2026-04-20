import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Takes in props: options, selectedValue, onValueChange, and label
const CustomDropdown = ({ options, selectedValue, onValueChange, label }) => {
  
  // Maps through the options to create a data array 
  const data = options.map(option => ({ label: option, value: option }));

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.label}>{label}</Text>{/*Label above the dropdown*/}
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        data={data} // Set the dropdown data to the mapped options
        labelField="label" 
        valueField="value" 
        value={selectedValue} 
        onChange={item => onValueChange(item.value)} // Call onValueChange when an item is selected
        renderRightIcon={() => (<MaterialIcons name="arrow-drop-down" size={24} color="#333" />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownWrapper: {
    margin: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5, 
  },
  dropdown: {
    height: 30,
    borderColor: '#666', 
    borderWidth: 1, 
    borderRadius: 5, 
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  dropdownContainer: {
    borderColor: '#666', 
    borderWidth: 1, 
  },
});

export default CustomDropdown;

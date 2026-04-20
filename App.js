import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import IndexScreen from './src/screens/IndexScreen';
import ViewScreen from './src/screens/ViewScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';
// renaming a generic import to something more specific
import { Provider as DiaryProvider } from './src/context/DiaryContext';

const navigator = createStackNavigator(
  {// added navigationOptions to be able to change the title for each page
    //to show differentiation
    Index: {
      screen: IndexScreen,
      navigationOptions: {
        title: 'Recipe Log', // Changes the title on each screen page
      },
    },
    View: {
      screen: ViewScreen,
      navigationOptions: {
        title: 'Recipe Details',
      },
    },
    Create: {
      screen: CreateScreen,
      navigationOptions: {
        title: 'Add New Recipe',
      },
    },
    Edit: {
      screen: EditScreen,
      navigationOptions: {
        title: 'Edit Recipe',
      },
    },
  },
  {
    initialRouteName: 'Index',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#FCD2AF', // Change the header background
      },
      headerTintColor: 'black',
    },
  }
);

// make sure our navigator is wrapped in a React component
const App = createAppContainer(navigator);
// now we export our own custom component, App is children within DiaryProvider
export default () => {
  return (
    <DiaryProvider>
      <App />
    </DiaryProvider>
  );
};

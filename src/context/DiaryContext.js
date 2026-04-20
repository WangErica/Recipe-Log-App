import createDataContext from './createDataContext';

const initialState = [
  {
    id: 123,
    title: 'Test Post 1',
    content: 'test content so that we don’t have to create a new post every time we reload!',
    ingredients: [{ name: 'ingredient 1', quantity: '100', unit: 'grams' }],
    difficulty: 1,
    category: 'Appetizers',
    favorite: false,
  },
];

const postReducer = (state, action) => {
  switch (action.type) {
    case 'add_post':
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 10000),
          title: action.payload.title,
          content: action.payload.content,
          ingredients: action.payload.ingredients,
          difficulty: action.payload.difficulty,
          category: action.payload.category,
          favorite: false,
        },
      ];
    case 'delete_post':
      return state.filter((post) => post.id !== action.payload);
    case 'edit_post':
      return state.map((post) => {
        return post.id === action.payload.id ? action.payload : post;
      });
      //Handling the toggling of favorite
    case 'toggle_favorite':
      return state.map((post) =>
        post.id === action.payload ? { ...post, favorite: !post.favorite } : post
      );
    default:
      return state;
  }
};

const addDiaryPost = (dispatch) => {
  return (title, content, ingredients, difficulty, category, callback) => {
    dispatch({ type: 'add_post', payload: { title, content, ingredients, difficulty, category } });
    if (callback) {
      callback();
    }
  };
};

const deleteDiaryPost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'delete_post', payload: id });
  };
};

const editDiaryPost = (dispatch) => {
  return (id, title, content, ingredients, difficulty, category, callback) => {
    dispatch({ type: 'edit_post', payload: { id, title, content, ingredients, difficulty, category } });
    if (callback) {
      callback();
    }
  };
};

// Defined to dispatch action
const toggleFavoritePost = (dispatch) => {
  return (id) => {
    dispatch({ type: 'toggle_favorite', payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  postReducer,
  {
    addDiaryPost,
    deleteDiaryPost,
    editDiaryPost,
    toggleFavoritePost,
  },
  [
    {
      id: 123,
      title: 'Strawberry Shortcake',
      ingredients: [{ name: 'fresh strawberries', quantity: '1', unit: 'quart' }, 
        { name: 'sugar', quantity: '1/4', unit: 'cups' }, 
        { name: 'whipped cream', quantity: '7', unit: 'ounces' }, 
        { name: 'wackage prepared sponge cake cups', quantity: '12', unit: 'ounces' }], 
      difficulty: 3,
      category: 'Desserts',
      favorite: true,
    },
    {
      id: 124,
      title: 'Strawberry Pudding',
      ingredients: [{ name: 'fresh strawberries', quantity: '2', unit: 'pints' }, 
        { name: 'milk', quantity: '2 1/2', unit: 'cups' }, 
        { name: 'condensed milk', quantity: '14', unit: 'ounces' }, 
        { name: 'package instant vanilla pudding mix', quantity: '5.1', unit: 'ounces' }, 
        { name: 'whipped cream', quantity: '8', unit: 'ounces' }], 
      difficulty: 3,
      category: 'Desserts',
      favorite: false,
    },
    {
      id: 125,
      title: 'Pigs in a Blanket',
      ingredients: [{ name: 'salted butter', quantity: '1', unit: 'tablespoon' }, 
        { name: 'vegetable oil', quantity: '1', unit: 'tablespoon' }, 
        { name: 'crescent roll dough', quantity: '1', unit: 'count' }, 
        { name: 'cocktail-sized sausages', quantity: '10', unit: 'count' }, 
        { name: 'egg', quantity: '1', unit: 'count' }], 
      difficulty: 1,
      category: 'Appetizers',
      favorite: false,
    },
    {
      id: 126,
      title: 'Pigs in a Blanket',
      ingredients: [{ name: 'peeled potatoes', quantity: '2', unit: 'pounds' }, 
        { name: 'all-purpose flour', quantity: '1', unit: 'tablespoon' }, 
        { name: 'vegetable oil', quantity: '3', unit: 'cups' }, 
        { name: 'chopped fresh parsley leaves', quantity: '2', unit: 'tablespoon' }, 
        { name: 'garlic powder', quantity: '1', unit: 'teaspoons' }], 
      difficulty: 1,
      category: 'Appetizers',
      favorite: true,
    },
    {
      id: 127,
      title: 'Macaroni and Cheese',
      ingredients: [{ name: 'dried elbow pasta', quantity: '1', unit: 'pounds' }, 
        { name: 'unsalted butter', quantity: '1/2', unit: 'cups' }, 
        { name: 'all-purpose flour', quantity: '1/2', unit: 'cups' }, 
        { name: 'milk', quantity: '3', unit: 'cups' }, 
        { name: 'shredded Gruyere cheese', quantity: '2', unit: 'cups' },
        { name: 'salt', quantity: '1/2', unit: 'tablespoon' },], 
      difficulty: 1,
      category: 'Main Courses',
      favorite: false,
    },
  ]
);
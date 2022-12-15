const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

    const myRecipe = {
      title: 'Banana Pancakes',
      level: 'Easy Peasy',
      ingredients: [
        '1 1/2 cups (180g) all-purpose flour',
        '2 Tablespoons (25g) sugar (optional)',
        '2 1/2 teaspoons baking powder',
        '1 pinch cinnamon (optional)',
        '1 pinch salt',
        '2 medium ripe bananas',
        '1 cup (240 ml) milk',
        '2 large eggs',
        '1/4 cup (60 ml) canola oil'],
      cuisine: 'American',
      dishType: 'breakfast',
      image: 'https://www.delscookingtwist.com/wp-content/uploads/2020/03/Easy-Fluffy-Banana-Pancakes_7.jpg',
      duration: 20,
      creator: 'Fanny Arles'
    }

    Recipe.create(myRecipe)
      .then(createdRecipe => console.log(`${createdRecipe.title} successfully created!`))
      .then(() => Recipe.insertMany(data))
      .then((addedRecipes) => addedRecipes.forEach(recipe => console.log(`New recipe added: ${recipe.title}`)))
      .then(() => Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }))
      .then(() => console.log(`Rigatoni recipe successfully updated!`))
      .then(() => Recipe.findOneAndDelete( { title: 'Carrot Cake' } ))
      .then(() => console.log(`Carrot Cake recipe successfully deleted.`))
      .then(() => mongoose.connection.close())
      .catch(err => console.log(err));

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

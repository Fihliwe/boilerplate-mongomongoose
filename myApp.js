require('dotenv').config();
let mongoose = require('mongoose');
mongoose.connect(process.env['MONGODB_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema ({
  name : {type: String, required: true},
  age : Number,
  favoriteFoods : [String]
})

let Person =  mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let siya = new Person({name:'Siya Mncube', age : 21, favoriteFoods: ['Chapo', 'Beans']});

  siya.save(function(err,data){
    if(err){
      console.log(err);
    }
    else{
      done(null , data);
    }
  })
  
};

let arrayOfPeople = [
  {name:'Siya Mncube', age : 21, favoriteFoods: ['Chapo', 'Beans']},
  {name:'Khaya Dube', age : 20, favoriteFoods: ['Rice', 'Choma']},
  {name:'Amahle Dube', age : 14, favoriteFoods: ['Biryani', 'Ndizi']}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err,data){
    if(err){
      console.log(err);
    }
    else{
      done(null , data);
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data){
     if(err){
      console.log(err);
    }
    else{
      done(null , data);
    }
  })
};

const findOneByFood = (food, done) => {
  
  Person.findOne({favoriteFoods: {$all : [food]}}, function(err, data){
     if(err){
      console.log(err);
     }
     else{
      done(null , data);
     }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err,data){
    if(err){
      console.log(err);
     }
     else{
      done(null , data);
     }
  })

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  Person.findById(personId, function(err,data){
     if(err){
      console.log(err);
     }
     else{
       data.favoriteFoods.push(foodToAdd);
       
       data.save(function(error,data){
         if(error){
           console.log(error);
         }
        else{
         done(null , data);
        }
      })
     }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true},     
      function(error,data){
         if(error){
           console.log(error);
         }
        else{
         done(null , data);
        }
     })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(error,data){
    if(error){
      console.log(error);
    }
    else{
      done(null, data);
    }
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, function(error,data){
    if(error){
      console.log(error);
    }
    else{
      done(null, data);
    }
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: {$all : [foodToSearch]}})
        .sort({name : 'asc'})
        .limit(2)
        .select('-age')
        .exec(function(error,data){
          if(error){
            console.log(error);
          }
          else{
            done(null, data)
          }
        })
};




/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
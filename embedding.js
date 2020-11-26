const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true})
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  authors:[authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({ 
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}


async function updateAuthor(courseId){
  const course = await Course.update({_id: courseId},{
    $unset:{
      'author': ''
    }
  });
  
}

async function AddAuthor(courseId,author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function RemoveAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

RemoveAuthor('5c2edeb36993cbba92a19e17','5c2edfa1a47e47bc0601fca5');
//AddAuthor('5c2edeb36993cbba92a19e17',new Author({name: 'Jc'}));
//updateAuthor('5c2ecf0dd2dec7aec54512e8');
/*createCourse('Node Course', [
  new Author({ name: 'Irene' }),
  new Author({ name: 'Eli' })
]);*/

const graphql = require("graphql"); //use graphql package

const _ = require("lodash");

const books = require("../models/Book");
const authors = require("../models/Author");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;


//Defining BookType with its fields.
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    price: { type: GraphQLInt },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.findById(parent.authorId);
      }
    }
  })
});

//Defining BookType with its fields.
const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    gender: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.find({ authorId: parent.id });
      }
    }
  })
});


//Defining RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return books.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return authors.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {    // To add Book in DB
      type: BookType,
      args: {
        title: { type: GraphQLString },
        price: { type: GraphQLInt },
        authorId: { type: GraphQLID }
      },
      resolve(parent, args) {
        let book = new books({
          title: args.title,
          price: args.price,
          authorId: args.authorId
        });
        return book.save(); //create owner data in mlab
      }
    },
    addAuthor: {    // To add Author in DB
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        gender: { type: GraphQLString }
      },
      resolve(parent, args) {
        let author = new authors({
          name: args.name,
          age: args.age,
          gender: args.gender
        });
        return author.save(); //create owner data in mlab
      }
    }
  } //fields ends here
});

//exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

const {
  ApolloServer,
  UserInputError,
  AuthenticationError,
  gql,
} = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = "jee";
const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log("not connected:", error.message);
  });

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: async (root, args) => {
      //solution not required but it works even though ugly
      if (args.author && !args.genre) {
        let author = await Author.findOne({ name: args.author });
        let result = await Book.find({ author: { $in: author } });
        return result;
      }
      if (!args.author && args.genre) {
        let result = await Book.find({ genres: { $in: args.genre } });
        return result;
      }
      //find by author and genre does not work, because not required
      if (args.author && args.genre) {
        let author = await Author.findOne({ name: args.author });
        const booksByAuthor = await Book.find({
          author: { name: { $in: author } },
        });
        console.log(booksByAuthor);
        return booksByAuthor.filter((b) => b.genres.includes(args.genre));
      } else {
        return await Book.find({});
      }
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      let result = await Book.find({
        author: root,
      });
      return result.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not logged in");
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }
      let book = new Book({ ...args, author: author });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not logged in");
      }
      try {
        let result = await Author.findOneAndUpdate(
          { name: args.name },
          { born: args.setBornTo },
          {
            new: true,
          }
        );
        return result;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "salainen") {
        throw new UserInputError("wrong...its right there");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

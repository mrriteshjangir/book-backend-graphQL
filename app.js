require("dotenv").config();

const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');

const mongoose = require("mongoose");

//Imports
const schema = require("./schema/schema");

//DB Connection
mongoose.connect(process.env.DB_URI)
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log('error is '+err));

//Middlewares

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        graphiql: true
    })
);


app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`));
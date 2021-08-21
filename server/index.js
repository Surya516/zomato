// importing env variable
require("dotenv").config();


// libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";

// microservice route
import Auth from "./API/Auth"

// Database Connection
import ConnectDB from "./database/connection"; 

const zomato = express();

//application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false}));
zomato.use(cors());
zomato.use(helmet());

// application routes
zomato.use("/auth",Auth);

zomato.get("/", (req,res) => res.json({ message: "setup success"}));

zomato.listen(4001, () => 
  ConnectDB()

    .then(() => console.log("server is running"))
    .catch(()=> console.log("Server is running, but database connection failed"))

);


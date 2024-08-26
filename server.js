// import express from 'express';
// import mysql from 'mysql2';
// import bodyParser from 'body-parser';

// const ex = express();

// ex.use(bodyParser.json());
// ex.use(bodyParser.urlencoded({ extended: true }));

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'admin123',
//     database: 'myadmin',
// });

// db.connect((err) => {
//     if (err) {
//         console.log("Please check your db connection:", err);
//     } else {
//         console.log("Connected to the database");
//     }
// });

// const server = ex.listen(1810, () => {
//     const host = server.address().address;
//     const port = server.address().port;
//     console.log("Server listening on port 1810");
// });

// ex.get("/get", (req, res) => {
//     db.query("SELECT * FROM news", (err, data) => {
//         if (err) {
//             console.log("Error in database query:", err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(data);
//         }
//     });
// });



import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

// const corsOptions = {
//     origin: 'http://localhost:3000',  // Replace with the actual origin of your React Native app
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     optionsSuccessStatus: 204,
// };n




const ex = express();
// ex.use(cors(corsOptions));
ex.use(cors());
ex.use(bodyParser.json());
ex.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'myadmin',
});

db.connect((err) => {
    if (err) {
        console.log("Please check your db connection:", err);
    } else {
        console.log("Connected to the database");
    }
});

ex.listen(1810, (err) => {
    if (err) console.log("errrrrrrrrrrr");
    else
        // console.log(">>>>>>", host);
        console.log("Server listening on port 1810");
});

// Endpoint for fetching news
ex.get("/get", (req, res) => {
    console.log("ssssssss>>>>>>>>>>>>>>>>>>>>>>>>>>");
    console.log("Entered Endpoint");
    db.query("SELECT * FROM news", (err, data) => {
        if (err) {
            console.log("Error in database query:");
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            console.log("sssss");
            res.json(data);
        }
    });

    // console.log("end Endpoint>>>>", res);

});

// Endpoint for adding newsn
ex.post("/add", (req, res) => {
    const status = "Active"
    const { title, description, image, event_date, category } = req.body;
    console.log(category)


    // Validate input (you may want to add more validation logic here)

    // Insert news into the database
    const sql = "INSERT INTO news (title, description, status, image,event_date,category) VALUES (?, ?, ?, ?,?,?)";
    db.query(sql, [title, description, status, image, event_date, category], (err, result) => {
        if (err) {
            console.error("Error in database insertion:", err);
            res.status(500).json({ error: "Internal Server Error", details: err.message });
        } else {
            console.log("News added successfully");
            res.status(200).json({ message: "News added successfully" });
        }
    });
});



// import express from 'express';
// import { MongoClient, ServerApiVersion } from 'mongodb';

// const app = express();
// const port = 1810; // You can change the port number if needed

// const uri = "mongodb+srv://naveen:j0XzeqfWPpxn2uQ1@cluster0.5c8le7q.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// app.get('/api/documentCount', async (req, res) => {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();

//         // Access the "atNews" database
//         const database = client.db("atNews");

//         // Access the specific collection within the database
//         const collection = database.collection("Datas"); // Replace "your_collection_name" with the actual name of your collection

//         // Count documents that meet a specific condition (example: count all documents)
//         const count = await collection.find({}).toArray();

//         res.json({ count });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// });

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });


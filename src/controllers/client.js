
const getAll = async () => {
    try {

        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("users");

        const querry = await coll.find({}).toArray();

        console.log(querry);

    } catch (error) {
        console.log(error.stack);
    }

}

const createOne = async (document) => {

    try {
        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("users");

        const p = await coll.insertOne(document);

    } catch (error) {
        console.log(error.stack);
    }

}


const deleteOne = async (id) => {

    try {

        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("users");

        const target = { _id: new mongo.ObjectId(id) };

        const p = await coll.deleteOne(target);


    } catch (error) {
        console.log(error.stack);
    }

}

const updateOne = async (id,document) => {
    try {

        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("users");

        const myquerry = { _id: new mongo.ObjectId(id) };

        var newValues = { $set: document };

        const p = await coll.updateOne(myquerry, newValues);

    } catch (error) {
        console.log(error.stack);
    }

}

module.exports = {
    getAll: getAll,
    createOne: createOne,
    deleteOne: deleteOne,
    updateOne: updateOne
}
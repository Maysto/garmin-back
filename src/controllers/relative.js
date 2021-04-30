const getOne = async (id) => {
    try {

        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("relatives");

        const querry = await coll.find({_id: id}).toArray();

        console.log(querry);

    } catch (error) {
        console.log(error.stack);
    }
}

const deleteOne = async (id) => {

    try {

        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("relatives");

        const target = { _id: new mongo.ObjectId(id) };

        const p = await coll.deleteOne(target);


    } catch (error) {
        console.log(error.stack);
    }

}

const updateOne = async (id,document) => {
    try {

        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("relatives");

        const myquerry = { _id: new mongo.ObjectId(id) };

        var newValues = { $set: document };

        const p = await coll.updateOne(myquerry, newValues);

    } catch (error) {
        console.log(error.stack);
    }

}

const createOne = async (document) => {

    try {
        const db = dbClient.db("Projet-Garmin");
        const coll = db.collection("relatives");

        const p = await coll.insertOne(document);

        return p;

    } catch (error) {
        console.log(error.stack);
    }

}

module.exports = {
    getOne: getOne,
    createOne: createOne,
    deleteOne: deleteOne,
    updateOne: updateOne
}
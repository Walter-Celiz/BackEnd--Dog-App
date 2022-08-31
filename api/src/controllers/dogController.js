const { getAllDogs } = require("./index")
const { Dog, Temperament } = require("../db");

const getAllDogsOrName = async (req, res) => {
    try {
        let allDogs = await getAllDogs();
        const { name } = req.query;
        if (name) {
            let dogName = await allDogs.filter(
                (obj) => obj.name.toLowerCase().includes(name.toLowerCase())
            );
            dogName.length
                ? res.status(200).send(dogName)
                : res.status(404).send(`Dogge: ${name} not found 🔴🔴🔴🔴`);
        } else {
            res.status(200).send(allDogs);
        }
    } catch (error) {
        res.status(404).send(error + "#getAllDogsOrName fail!!! 🔴🔴🔴🔴");
    }
};

const getDogsById = async (req, res) => {
    try {
        const allDogs = await getAllDogs();
        const { id } = req.params;
        if (id) {
            let dogId = await allDogs.filter((obj) => obj.id == id);
            dogId.length
                ? res.status(200).send(dogId)
                : res.status(404).send("Dogge Not Found!!!  🔴🔴🔴🔴");
        }
    } catch (error) {
        res.status(404).send(error + "#getDogsById fail!!! 🔴🔴🔴🔴");
    }
};


const createDog = async (req, res) => {
    try {
        let {
            name,
            minimHeight,
            maximHeight,
            minimWeight,
            maximWeight,
            lifeSpan,
            image,
            createdAtDb,
            temperament
        } = req.body

        let height = minimHeight + " - " + maximHeight
        let weight = minimWeight + " - " + maximWeight

        let dogCreated = await Dog.create({
            name,
            height,
            weight,
            lifeSpan,
            image,
            createdAtDb
        })

        let temperamentDb = await Temperament.findAll({
            where: {
                name: temperament
            }
        })

        dogCreated.addTemperament(temperamentDb)
        res.status(200).send("Dogge created!!! 🟢🟢🟢🟢")
    }
    catch (error) {
        res.status(404).send(error + "#createDog fail!!! 🔴🔴🔴🔴")
    }
};


module.exports = {
    getAllDogsOrName,
    getDogsById,
    createDog
};
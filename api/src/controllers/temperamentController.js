const { Temperament } = require("../db");
const axios = require('axios')
const { API_KEY } = process.env
//const { getTemperaments } = require("../controllers/")

// const getAllTemperaments = async (req, res) => {
//     const dogTemperaments = await getTemperaments();
//     const allTemperaments = await Temperament.findAll();
//     const filteredTemperaments = await allTemperaments.map((obj) => {
//         obj.id,
//             obj.name
//     });
//     res.status(200).send(filteredTemperaments);
// };

Array.prototype.unique = (function (a) {
    return function () {
        return this.filter(a);
    };
})(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0;
});


const getAllTemperaments = async (req, res) => {
    try {
        const allTemperaments = await Temperament.findAll();
        if (allTemperaments.length === 0) {
            const temperamentsApi = await axios.get(
                `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
            );
            const temperaments = temperamentsApi.data.map((data) => {
                const temps = data.temperament;
                return temps;
            });
            // iterates in the arrays and returns a single array with all the elements
            const noSpaces = temperaments.map((data) => data && data.split(", ")).flat();
            const noRepeats = noSpaces.unique().sort();

            var aux = noRepeats
                .map((data) => {
                    return {
                        name: data,
                    };
                })
                .filter((data) => data.name);
            // receives an array with objects and assigns the value to my table according to the property
            const temps = await Temperament.bulkCreate(aux);
            return res.send(temps);
        } else {
            return res.send(allTemperaments);
        }
    } catch (error) {
        res.status(404).send(error + "#getAllDogsOrName fail!!! 🔴🔴🔴🔴");
    }
}

module.exports = {
    getAllTemperaments,
};
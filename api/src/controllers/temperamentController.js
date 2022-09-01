const { Temperament } = require("../db");
const axios = require('axios')
const { API_KEY } = process.env

/* 
filtra la funcion del parametro a, y se autoincova, retornando que c, sea
distinta de a, b + 1 y que eso sea menos a 0, es decir que este esta dentro del array y una sola vez
*/
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
            const apiCall = await axios.get(
                `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
            );
            const temperaments = apiCall.data.map((data) => {
                const temps = data.temperament;
                return temps;
            });
            // iterates in the arrays and returns a single array with all the elements
            const noSpaces = temperaments.map((data) => data && data.split(", ")).flat(); //split saca los espacios , flat()
            const noRepeats = noSpaces.unique().sort(); //unique => saca los repetidos, sort => orden numerico

            let aux = noRepeats
                .map((data) => {
                    return {
                        name: data,
                    };
                })
                //obtengo los temperamentos y los id
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


// async function laNueva() {
//     let temp = new Set();
//     try {
//         axios.get(`https://api.thedogapi.com/v1/breeds`)
//             .then(res => res.data)
//             .then(json => {
//                 json && json.forEach(
//                     temperament => {
//                         let temps = temperament.temperament && temperament.temperament.split(', ');
//                         temps && temps.forEach(t => { temp.add(t) })
//                     }
//                 )
//                 let arrayTemp = Array.from(temp)
//                 arrayTemp.map(t => (Temperament.findOrCreate({
//                     where: { name: t }
//                 })))
//             })
//             .then(console.log("LO QUE VOS QUIERAS"))
//             .catch(error => console.error(error))
//     } catch (error) {
//         res.status(400).send(error + "asdasd")
//     }
// }

// async function getAllTemperaments(req, res) {
//     try {
//         await laNueva();
//         Temperament.findAll({ order: [['id', 'asc']] }).then((resp) => {
//             resp.length
//                 ? res.send(resp)
//                 : res.send("no se pudo obtener los temperamentos")
//         })
//     } catch (error) {
//         res.status(400).send(error + "ta rotudo")
//     }
// }


module.exports = {
    getAllTemperaments,
};
// const { Temperament } = require("../db");
// const axios = require('axios');
// const { API_KEY } = process.env;

// const AllTemperaments = async (req, res) => {
//     try {
//         const apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
//         const Temperaments = apiCall.data.map(data => data.temperament)
//         const temps = Temperaments.map(data => {
//             for (let i = 0; i < data.length; i++) {
//                 return data[i]
//             }

//             temps.forEach(data => {
//                 Temperament.findOrCreate({
//                     where: { name: data }
//                 })
//             })
//         })
//         const AllTemperaments = await Temperament.findAll();
//         res.status(200).send(AllTemperaments)
//     } catch (error) {
//         res.status(404).send(error + "#getDogsById fail!!! 🔴🔴🔴🔴");
//     }
// }

// module.exports = {
//     AllTemperaments,
// };
const { API_KEY } = process.env
const axios = require('axios')
const { Dog, Temperament } = require('../db');

const getApiInfo = async () => {
    try {
        const apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        const dogInfo = await apiCall.data.map(data => {
            return {
                id: data.id,
                name: data.name,
                height: data.height.metric,
                weight: data.weight.metric,
                lifeSpan: data.life_span,
                image: data.image.url,
                temperament: data.temperament
            }
        })
        return dogInfo;
    } catch (error) {
        console.log(error + "#getApiInfo fail!!! 🔴🔴🔴🔴");
    }
}

const getDBinfo = async () => {
    try {
        const dogInDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            }
        })
        return dogInDB;
    } catch (error) {
        console.log(error + "#getDBinfo fail!!! 🔴🔴🔴🔴");
    }
}

const getAllDogs = async () => {
    try {
        const apiInfo = await getApiInfo();
        const dbInfo = await getDBinfo();
        const allInfo = apiInfo.concat(dbInfo);
        return allInfo
    } catch (error) {
        console.log(error + "#getAllDogs fail!!! 🔴🔴🔴🔴");
    }
}

//  const getAllDogs = async () => {
//     let allInfo = await Promise.all([getApiInfo(), getDBinfo()]).then(response => response)
//     return allInfo
// }

module.exports = {
    getAllDogs,
}
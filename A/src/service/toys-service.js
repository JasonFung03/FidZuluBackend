const ToysDao = require('../dao/toys-dao');

class ToysService {
    async getAllToys(location) {
        const toysDao = new ToysDao();
        const toys = await toysDao.fetchToysFromDB();
        console.log('Fetched toys:', toys);
        if (!location) {
            return toys.map(({ id, currency, ...toy }) => toy);
        }

        const conversionRates = {
            'US-NC': 0.08,
            'IE': 0.23,
            'IN': 0.18
        };

        const conversionRate = conversionRates[location];

        return toys.map(toy => {
            const priceWithConversion = (toy.price * (1 + conversionRate)).toFixed(2);
            const { id, ...rest } = toy;
            return { ...rest, price: priceWithConversion };
        });
    }

    getTeam() {
        return {
            team: "ToyMasters",
            membersNames: ["Irene", "Cían"]
        };
    }
}

module.exports = ToysService;
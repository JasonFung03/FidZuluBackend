const oracle = require('oracledb');

class ToysDao {
    async fetchToysFromDB() {
        let connection;

        try {
            connection = await oracle.getConnection({
                user: '',
                password: '',
                connectString: ''
            });

            console.log('Connection established');
            const result = await connection.execute('SELECT name, brand, age_group, price FROM Toys');
            console.log('Query executed, result:', result);
            return result.rows.map(row => ({
                name: row[0],
                brand: row[1],
                age_group: row[2],
                price: row[3]
            }));
        } catch (err) {
            console.error(err);
            throw err;
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }
}

module.exports = ToysDao;
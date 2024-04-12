const mysql = require('mysql2/promise');
const { connection, year } = require('../connect/undc.js');

const insertDataMef = async (allData) => {
    try {
        const con = await mysql.createConnection({
            host: connection.config.host,
            user: connection.config.user,
            password: connection.config.password,
            database: connection.config.database
        });

        for (const row of allData) {
            const query = `INSERT INTO mef (codigo, descripcion, pia, pim, certificacion, compromiso_anual, compromiso_mensual, devengado, girado, porcentaje_avance,year) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
            const values = [row.codigo, row.descripcion, row.pia, row.pim, row.certificacion, row.compromiso_anual, row.compromiso_mensual, row.devengado, row.girado, row.porcentaje_avance, year];
            await con.query(query, values);
        }

        await con.end();
        return
    } catch (error) {
        console.error('Error al insertar datos en la base de datos:', error);
    } finally {
        console.log('Datos insertados correctamente en la base de datos.');
        con.end()
    }
}

module.exports = { insertDataMef };
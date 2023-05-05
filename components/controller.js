const { query } = require('../database/connection_database');
const moment = require("moment")



async function getAllClients() {
    console.log("data")
    try {
        //Obtener todos los clientes
        const result = await query(`SELECT * FROM clients`);
        console.log("this is result: ", result)

        //Obtener sus valores baneados
        for(let i = 0; i < result.length; i++){
            let oppositedField = await query(`
                SELECT A.nameField FROM fields AS A
                JOIN disable_fields AS B
                ON A.field_id = B.id_field
                WHERE B.id_client = ${result[i].id_clients}
            `)

            //Convertir los valores baneados en ""
            for(let j = 0; j < oppositedField.length; j++) 
                result[i][`${oppositedField[j].nameField}`] = "";
        }
        console.log(result)
        return result;
    } catch (err) {
        console.log(err)
        return err
    }
}

async function getAddress(id_client) {
    try {
        //Logs
        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 1, "${moment().format()}")`)

        const opposition = await query(`SELECT * FROM disable_fields WHERE id_client = ${id_client} AND id_field = 9`)
        
        if(opposition[0]==undefined){
            const result = await query(`SELECT * FROM address WHERE id_client = ${id_client}`)
            return result;
        } else {
            return {message: "El usuario tiene desabilitado el address"}
        }

    } catch (err) {
        return err
    }
}

async function getIdIdentification(id_client) {
    try {

        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 1, "${moment().format()}")`)

        const opposition = await query(`SELECT * FROM disable_fields WHERE id_client = ${id_client} AND id_field = 10`)

        if(opposition[0]==undefined){
            const result = await query(`SELECT * FROM identifications WHERE id_client = ${id_client}`)
            return result;
        } else {
            return {message: "El usuario tiene desabilitado el identificaciones"}
        }
        
    } catch (err) {
        return err
    }
}

async function searchClients(search, type) {
    try {
        let field = '';
        //email
        if(type == 0) {
            field='email';
        }
        //cellphone
        if(type == 1) {
            field='cellphone';
        }
        //curp
        if(type == 2) {
            field='curp';
        }

        const result = await query(`SELECT * FROM clients WHERE ${field} LIKE '%${search}%'`)

        for(let i = 0; i < result.length; i++){
            let oppositedField = await query(`
                SELECT A.nameField FROM fields AS A
                JOIN disable_fields AS B
                ON A.field_id = B.id_field
                WHERE B.id_client = ${result[i].id_clients}
            `)

            for(let j = 0; j < oppositedField.length; j++) 
                result[i][`${oppositedField[j].nameField}`] = "";
        }

        return result;
    } catch (err) {
        return err
    }
}

async function rectificationClient(id_client, data) {
    try{

        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 2, "${moment().format()}")`)

        //Obtener sus valores baneados
        let oppositedField = await query(`
            SELECT A.nameField FROM fields AS A
            JOIN disable_fields AS B
            ON A.field_id = B.id_field
            WHERE B.id_client = ${id_client}
        `)

        //Convertir los valores baneados en ""
        for(let j = 0; j < oppositedField.length; j++) 
            data[`${oppositedField[j].nameField}`] = "";
        for(object in data) {
            //Si "", significa que esta baneado por el usuario
            if(data[object]!="") { 
                 if(typeof data[object] == "number") {
                    await query(`UPDATE clients SET ${object} = ${data[object]} WHERE id_clients = ${id_client}`)
                } else {
                    await query(`UPDATE clients SET ${object} = "${data[object]}" WHERE id_clients = ${id_client}`)
                }
            }
                    
        }        
        return {"message": "Se actualizo exitosamente el cliente"}
    } catch(err) {
        return err;
    }
}


async function rectificationsAddress(id_client, id_address, data) {
    try {   

        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 2, "${moment().format()}")`)
        
        const opposition = await query(`SELECT * FROM disable_fields WHERE id_client = ${id_client} AND id_field = 9`)
        
        
        if(opposition[0]==undefined){
            await query(`
            UPDATE address SET
            country="${data.country}",
            state="${data.state}",
            colony="${data.colony}",
            postalCode="${data.postalCode}",
            street="${data.street}",
            ext_num="${data.ext_num}",
            int_num="${data.int_num}"
            WHERE id_client = ${id_client} AND id_address=${id_address}
            `)
            return {"message": "Se actualizo exitosamente la dirección del cliente"}
        } else {
            return {"message": "El usuario tiene desabilitado el address"}
        }
    } catch (error) {
        return error;
    }
}

async function rectificationsIdentification(id_client, id_identification, data) {
    try {   
        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 3, "${moment().format()}")`)

        const opposition = await query(`SELECT * FROM disable_fields WHERE id_client = ${id_client} AND id_field = 10`)

        if(opposition[0]==undefined){
            await query(`
                UPDATE identifications SET
                type="${data.type}",
                id_num=${data.id_num}
                WHERE id_client = ${id_client} AND id_identification=${id_identification}
            `)
            return {"message": "Se actualizo exitosamente la identificacion del cliente del cliente"}
        } else {
            return {message: "El usuario tiene desabilitado el address"}
        }
    } catch (error) {
        return error;
    }
}

async function addOpposition(id_client, data) {
    try {   
        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 4, "${moment().format()}")`)

        await query(`DELETE FROM disable_fields WHERE id_client = ${id_client}`)
        for(let i = 0; i < data.length; i++) {
            await query(`INSERT INTO disable_fields (id_client, id_field) VALUES (${id_client}, ${data[i]})`)
        }

        return {message: "Opposition added successfully"}
    } catch (error) {
        return error;
    }
}

async function getOppositionIdClient(id_client) {
    try {  
        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 4, "${moment().format()}")`)

        return await query(`SELECT * FROM disable_fields WHERE id_client = ${id_client}`)
    } catch (error) {
        return error;
    }
}

async function getAllOposition(){
    try {
        const result = await query(`SELECT * FROM fields`)
        return result;
    } catch (err) {
        return err
    }
}

async function deleteData(id_client) {
    try {
        await query(`INSERT INTO logs (id_client, id_user, id_derecho_arco, date_performed) 
        VALUES (${id_client}, 1010, 3, "${moment().format()}")`)

        await query(`UPDATE clients SET 
            name=null,
            lastName=null,
            birthday=null,
            nationality=null,
            state=null,
            curp=null,
            cellphone=null,
            email=null,
            is_client=null,
            gender=null
            WHERE id_clients = ${id_client}
        `)
          await query(`DELETE FROM address WHERE id_client = ${id_client}`)
          await query(`DELETE FROM identifications WHERE id_client = ${id_client}`)
        return {message: "Client deleted successfully"};

    } catch (error) {
        return error;
    }
}

async function getHistorical(initial, final){
    try {
        const result = await query(`SELECT * FROM logs WHERE date_performed BETWEEN ${initial} AND ${final}`)
        return result;
    } catch (err) {
        return err
    }
}
module.exports = {
    getAllClients,
    getAddress,
    getIdIdentification,
    searchClients,
    rectificationClient,
    addOpposition,
    getOppositionIdClient,
    getAllOposition,
    deleteData,
    rectificationsAddress,
    rectificationsIdentification,
    getHistorical
}
//Importar libreria
const express = require('express') 


//Importar controllador
const controller = require('../components/controller')

//Inicializar router
const router = express.Router()

//Declarar endpoint
router.get('/clients/', getAllClients) // Todos los clientes 
router.get('/clients/address/:id_client', getAddress) // Obtener dirección de un cliente
router.get('/clients/identification/:id_client', getIdIdentification) // Obtener identificacion de un cliente 
router.get('/clients/certifications/:search/:type_search', searchClients) // Buscador de clientes parametrizable

router.put('/clients/rectification/client/:id_client', rectificationClient)
router.put('/clients/rectification/identification/:id_client/:id_address', rectificationsAddress)
router.put('/clients/rectification/address/:id_client/:id_identification', rectificationsIdentification)

router.delete('/clients/:id_client', deleteData) // Delete client

router.post('/clients/oposition/:id_client', addOpposition) // Agrega oposisiones a un cliente
// Obtienes las oposiciones actuales de un cliente
router.get('/clients/oposition/:id_client', getOppositionIdClient) 
router.get('/clients/getAllOposition', getAllOposition)

//Historial
router.get('/clients/getHistorical/:initDate/:endDate', getHistorical)

//Funcion que utilizaran endpoint
async function getAllClients(req, res) {
    try {
        return await res.status(200).send({response: await controller.getAllClients()});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function getAddress(req, res) {
    try {
        return await res.status(200).send({response: await controller.getAddress(req.params.id_client)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function getIdIdentification(req, res) {
    try {
        
        return await res.status(200).send({response: await controller.getIdIdentification(req.params.id_client)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function searchClients(req, res) {
    try {
        return res.status(200).send({response: await controller.searchClients(req.params.search, req.params.type_search)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function rectificationClient(req, res) {
    try {
        return await res.status(200).send({response: await controller.rectificationClient(req.params.id_client, req.body)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function rectificationsAddress(req, res) {
    try {
        return await res.status(200).send({response: await controller.rectificationsAddress(
            req.params.id_client, req.params.id_address, req.body)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }    
}

async function rectificationsIdentification(req, res) {
    try {
        return await res.status(200).send({response: await controller.rectificationsIdentification(
            req.params.id_client, req.params.id_identification, req.body)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }    
}

async function deleteData(req, res) {
    try {
        return await res.status(200).send({response: await controller.deleteData(req.params.id_client)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function addOpposition(req, res) {
    try {
        return await res.status(200).send({response: await controller.addOpposition(req.params.id_client, req.body.dataArr)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function getOppositionIdClient(req, res) {
    try {
        return await res.status(200).send({response: await controller.getOppositionIdClient(req.params.id_client)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function getAllOposition(req, res) {
    try {
        return await res.status(200).send({response: await controller.getAllOposition(req.params.endDate)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}

async function getHistorical(req, res) {
    try {
        return await res.status(200).send({response: await controller.getHistorical(req.params.initDate, req.params.initDate)});
    } catch (error) {
        return await res.status(500).send({'message': 'Server error'})
    }
}


module.exports = router;
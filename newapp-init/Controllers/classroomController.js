const express = require('express');
const router = express.Router();

const classroomService = require('../Services/classroomService');
const validate = require('../middleware/classroomValidation');

// Les handlers individuels si tu veux les extraire :
const { create, update, deleteC } = classroomService;

router.get('/list', classroomService.read);
router.post('/create', validate, create);
router.put('/:id', validate, update);
router.delete('/:id', deleteC);
router.get('/floor-range', classroomService.searchByFloor);
router.get('/capacity-stats', classroomService.capacityStats);
router.get('/view', classroomService.renderList);

module.exports = router;

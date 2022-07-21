const {Router} = require('express');
const { update } = require('../services/BrandService');
const notificationService = require('../services/NotificationService')
const router = Router({ mergeParams: true })

router
    .post('/', (req,res) => {
        notificationService.create(req.body)
            .then(createdNotification => {
                return res.status(201).json(createdNotification)
            })
            .catch(err => {
                return res.status(400).json({message: err.toString()})
            })
    })
    .get('/',  (req, res) => {
        notificationService.findAll()
            .then(notifications => {
                return res.status(200).json(notifications)
            })
            .catch(err => {
                return res.status(500).json({message: err.toString()})
            })
    })
    .patch('/:id', (req,res) => {
        notificationService.updateIsRead(req.params.id)
            .then(updatedNotification => {
                return res.status(200).json(updatedNotification)
            })
            .catch(err => {
                return res.status(500).json({message: err.toString()})
            })
    })

module.exports = {router}
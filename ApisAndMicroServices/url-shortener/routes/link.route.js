const express = require('express');
const router = express.Router();

const link_controller = require('../controllers/link.controller');

router.get('/test', link_controller.test);
router.get('/:shortUrl(*)', link_controller.getUrl);
router.post('/new', link_controller.newUrl);
router.delete('/:url(*)', link_controller.deleteUrl);

module.exports = router;
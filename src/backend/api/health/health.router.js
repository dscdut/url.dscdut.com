const router = require('express').Router();

router.get('/', (req, res) => {
	res.status(200).send('OK');
});

module.exports.healthRouter = router;

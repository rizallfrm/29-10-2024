const router = require("express").Router();
const swaggerUI = require('swagger-ui-express')
const swaggerDocumentation = require('../docs/swagger.json')

router.use("/", swaggerUI.serve);
router.use("/", swaggerUI.setup(swaggerDocumentation));


module.exports = router;

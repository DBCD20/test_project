const   express         = require('express'),
//ROUTER ALLOWS US TO BREAK ROUTES TO MODULAR CHUNKS
        router          = express.Router(),
//REQUIRE MODELS DIRECTORY
        db              = require('../models'),
        helper          = require('../helpers/data');
        
        
router.route('/')
.get(helper.getDatas)
.post(helper.createData)

router.route('/:dataid')
.get(helper.retrieveData)
.put(helper.updateData)
.delete(helper.deleteData);







module.exports = router;

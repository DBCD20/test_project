const   express         = require('express'),
        app             = express(),
        PORT            = process.env.PORT || 3000,
        api             = require('./routes/api'),
        page            = require('./routes/page'),
        ejs             = require('ejs'),
        bodyParser      = require('body-parser'),
        methodOverride  = require('method-override');
        
        
app.set('view engine', 'ejs');
        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'))

app.use('/', page);
app.use('/api/data', api);

app.listen(PORT, () => console.log("SERVER CONNECTED"))
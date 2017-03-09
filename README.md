# AMDC
AMDC (APRS MobileObject Data Client) is a client used to receive info of mobile objects from the APRS2 server, decode and post the data to a database for multiple purposes.<br/>

### dependencies: Node.js

### What information can you get?
0. The source from which the message is sent;
1. The West/East, degree, minute and hundredths of minutes of Latitude;
2. The North/South, degree, minute and hundredths of minutes of Longitude;
3. The speed of the moving object;
4. The course of the moving object;
5. The altitude of the moving object (optional);
6. The type of the moving object (optional);
7. A MIC-E message (optional);

### How to test?
1. Clone the repo and enter it.
```
git clone git@github.com:Travelinglight/AMDC.git
cd AMDC
```
2. Install express and body-parser modules with NPM
```
npm install express
npm install body-parser
```
3. Run the Server
```
node Server.js
```
4. Open another bash and run the client
```
node client.js
```
5. See the result in the Server bash

![alt text](result.png)

### How to use it?
1. Copy client.js and decode.js to your own repo;
2. Use body-parser in your back-end to parse the request data posted by the client;
```javascript
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/moving_object", function(req, res) {
  // use req.body as a json;
});
```

### Information Explaination
0. The source (CALL) can be obtained from req.body.Source. It is the ID of the object;
1. Longitude can be obtained from req.body.Longitude. A positive number means East and a negative one means West;
2. Latitude can be obtained from req.body.Latitude. A positive number means North and a negative one means South;
3. The speed info can be obtained from req.body.Speed
4. The course info can be obtained from req.body.Course
5. The altitude info can be obtained form req.body.Altitude. If undefined, it means the object's altitude info is not specified;
6. The object type info is stored in req.body.Comments.Type. If undefined, req.body.Destination can be used to determine the type of the object. For more information, please refer to APRS101;
7. The MIC-E message can be obtained from req.body.Comments.MicMst;

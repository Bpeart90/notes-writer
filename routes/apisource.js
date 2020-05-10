var fs = require("fs");
var notesData = require("../db/db.json");
const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {

    function writeToDB(notes) {
        // Converts new JSON Array back to string
        notes = JSON.stringify(notes);
        console.log(notes);
        // Writes String back to db.json
        fs.writeFileSync("./db/db.json", notes, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }


    app.get("/api/notes", function (req, res) {

        res.json(notesData);
    });

    app.post("/api/notes", function (req, res) {
        let id = uuidv4();
        console.log(req.body, id);
        req.body.id = id;
        notesData.push(req.body);

        writeToDB(notesData);
        console.log(notesData);

        res.json(true);

    });

    app.delete("/api/notes/:id", function (req, res) {
        let id = req.params.id

        console.log("id" + id);

        for (i = 0; i < notesData.length; i++) {
            if (notesData[i].id == id) {
                console.log("match!");

                res.send(notesData[i]);

                notesData.splice(i, 1);
                break
            }
        }

    });

};

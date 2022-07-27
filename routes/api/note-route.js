const router = require('express').Router();
const fs = require('fs');
const db = require('../../db/db.json');
const path = require("path");

router.get('/', (req, res)=>{
    res.json(db);    
})

router.post('/', (req, res)=>{
    let jsonFilePath = path.join(__dirname, "../../db/db.json");
    let newNote = req.body;

    let highestId = 99;
        
        for (let i = 0; i < db.length; i++) {
            let individualNote = db[i];
            console.log(individualNote.id)

            if (individualNote.id > highestId) {
                
                highestId = individualNote.id;
            }
        }
        
        newNote.id = highestId + 1;
        
        db.push(newNote)

        
        fs.writeFile(jsonFilePath, JSON.stringify(db), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
         
        res.json(newNote);
    });

    module.exports = router





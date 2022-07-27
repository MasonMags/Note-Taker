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

    let startingId = 0;
        
        for (let i = 0; i < db.length; i++) {
            let individualNote = db[i];

            if (individualNote.id > startingId) {
                
                startingId = individualNote.id;
            }
        }
        
        newNote.id = startingId + 1;
        
        db.push(newNote)

        fs.writeFile(jsonFilePath, JSON.stringify(db), function (err) {

            if (err) {
                return console.log(err);
            }
            console.log("Your note was saved!");
        });
         
        res.json(newNote);
    });

    router.delete('/:id', function (req, res) {
        let jsonFilePath = path.join(__dirname, "../../db/db.json");
        
        for (let i = 0; i < db.length; i++) {
    
            if (db[i].id == req.params.id) {
                
                db.splice(i, 1);
                break;
            }
        }
        
        fs.writeFileSync(jsonFilePath, JSON.stringify(db), function (err) {
    
            if (err) {
                return console.log(err);
            } else {
                console.log("Your note was deleted!");
            }
        });
        res.json(db);
    });

    module.exports = router





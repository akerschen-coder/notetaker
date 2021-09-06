const fs = require('fs');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFromFile('db/db.json', 'utf8');
    }

    write(data) {
        return writeToFile('db/db.json', JSON.stringify(data));
    }

    getNotes() {
        return this.read().then((data) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(data));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    createNote(note) {
        const { title, text } = note;

        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        return this.getNotes().then((data) => [...data, newNote]
        ).then((updatedData) => this.write(updatedData)).then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes().then((data) => data.filter((filteredNote) => filteredNote.id !== id))
            .then((filteredData) => this.write(filteredData));
    }

}

module.exports = new Notes();

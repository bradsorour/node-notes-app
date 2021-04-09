const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title already exists'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const removeNote = (title) => {
    const notes = loadNotes()
    const remainingNotes = notes.filter((note => note.title !== title))

    if (notes.length > remainingNotes.length) {
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse(title + ' note removed'))
    }
    else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.yellow(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red('No note found'))
    }
}

const loadNotes = (notes) => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.yellow('Your Notes'))

    notes.forEach(note => {
        console.log(note.title)
    });
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
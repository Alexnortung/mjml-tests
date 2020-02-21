// get path to mjml-core
// get path to dir to compile
require('babel-register')
require('dotenv').config()
const fs = require('fs')
const argv = require('yargs').argv
const { exec } = require('child_process')

const dir = argv.dir || argv["_"][0]
const filepath = argv.file

if (!dir && !filepath) {
    console.log("You need to provide a directory or a file")
    return
}

// requiring the compile function from mjml
//const mjml2html = require(process.env.PATHTOMJML + '/packages/mjml/lib/index')

const runmjml = (file) => {
    const newFilepath = file.replace(/\.mjml$/g, ".html");
    exec(`${process.env.PATHTOMJML}/packages/mjml/bin/mjml ${file} -o ${newFilepath}`)
}


if (dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            return console.log("Could not open directory", dir)
        }
        files.forEach(filename => {
            if (/.*\.mjml$/.test(filename)) {
                const file = `${dir}/${filename}`
                runmjml(file)
            }
        });
    })
} else if (filepath) {
    runmjml(filepath)
}
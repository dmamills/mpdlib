"use strict";
const mpdConnection = require('./src/mpdConnection');
const port = 6600;

mpdConnection(port).then(conn => {
    conn.status().then(res => {
        console.log(res);
        process.exit();
    });
})


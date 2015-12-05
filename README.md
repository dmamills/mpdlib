# mpdlib

A bit of an experiment in using es6 class/promises to interact with the [mpd protocol](http://www.musicpd.org/doc/protocol/)

### usage

requires node `v5.0.0+`

```
const mpdConnection = require('mpdlib');
const port = process.env.MPD_PORT || 6600;

mpdConnection(port).then(conn => {
    conn.command('play').then(res => {
        console.log(d.toString()); // "OK"
    });
});

```

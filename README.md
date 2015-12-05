# mpdlib

A bit of an experiment in using es6 class/promises to interact with the [mpd protocol](http://www.musicpd.org/doc/protocol/)

### usage

requires node `v5.0.0+`

```javascript
const mpdConnection = require('mpdlib');
const port = process.env.MPD_PORT || 6600;
const host = process.env.MPD_HOST || 'localhost';
const password = 'topsecretmusicpassword'

mpdConnection(host, port, password).then(conn => {
    conn.command('listall').then(res => {
        console.log(d.toString()); //Contents of your mpd library
    });
});

```

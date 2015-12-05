"use strict";

const net = require('net');
const MpdClient = require('./MpdClient');

const mpdConnection = (port) => {

    return new Promise((res, rej) => {
        
        let client = net.connect({port:port}, () => {
            client.once('data', d => {
                d = d.toString();
                if(d.indexOf('OK MPD') > -1) {
                    let version = d.split('OK MPD ')[1];
                    res(new MpdClient(client, version));
                } else {
                    rej('Connection Error');
                }

            })
        })
    });
}

module.exports = mpdConnection;

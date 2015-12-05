"use strict";

const net = require('net');
const MpdClient = require('./MpdClient');

/**
* Establishes a connection to mpd daemon
* @param {String} Server Host
* @param {Number} Server Port
* @param {String} Optional password
* @returns {Promise} Resolves to an MpdClient instance if successful
*/
const mpdConnection = (host, port, password) => {
    
    return new Promise((res, rej) => {
        
        let client = net.connect({host: host, port:port}, () => {
            client.once('data', d => {
                d = d.toString();
                if(d.indexOf('OK MPD') > -1) {
                    let version = d.split('OK MPD ')[1];
                    
                    //if we are using a password, attempt to authenticate
                    if(password) {
                        //listen for the authentication result
                        client.once('data', d => {
                            if(d.toString().split('\n')[0] === 'OK') {
                                res(new MpdClient(client, version));
                            } else {
                                rej(d.toString());
                            }
                        });

                        client.write(`password ${password}\n`);
                        
                    } else {
                        res(new MpdClient(client, version));
                    }
                } else {
                    rej('Connection Error');
                }
            });
        });
    });
}

module.exports = mpdConnection;

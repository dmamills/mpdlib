"use strict";

class MpdClient {

    /**
    * @param {net.Socket} tcp duplex stream from connection
    * @param {String} version number of mpd server
    */
    constructor(client, version) {
        this.client = client;
        this.version = version;
    }

    /**
    * executes a command to the mpd server
    * @param {string} command to execute
    * @returns {Promise}
    */
    command(cmd) {
        return new Promise((res,rej) => {

            //subscribe to the next data event
            // use the result to resolve rhe promise
            this.client.once('data', d => {
                let data = d.toString().split('\n');
                let len = data.length;
                if(data[len-2] === 'OK') {
                    //splice out empty line and OK message
                    data.splice(len-2,2)
                    res(data.join('\n'));
                } else {
                    // no OK == error
                    rej(d.toString());
                }
            })

            //execute the command
            this.client.write(`${cmd}\n`)
        })
    }

    /**
    * Convenience function for status command
    * @return {Object} key/value pair of command results
    */
    status() {
        return this.command('status').then(res => {
            let o = {};
            res = res.toString().split('\n');
            for(let i =0; i < res.length; i++) {

                //split and convert to key/value pairs
                let r = res[i].split(': ');
                o[r[0]] = r[1];
            }

            return o;
        });

    }
}

module.exports = MpdClient;

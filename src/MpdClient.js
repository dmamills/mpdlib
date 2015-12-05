"use strict";

class MpdClient {

    constructor(client, version) {
        this.client = client;
        this.version = version;
    }
    command(cmd) {
        return new Promise((res,rej) => {
            this.client.once('data', d => {
                res(d);
            })

            this.client.write(`${cmd}\n`)
        })
    }
    status() {
        return this.command('status').then(res => {
            let o = {};
            res = res.toString().split('\n');
            for(let i =0; i < res.length; i++) {

                //ignore empty responses
                if(res[i] === 'OK' || res[i] === '') continue;

                //split and convert to key/value pairs
                let r = res[i].split(': ');
                o[r[0]] = r[1];
            }

            return o;
        });

    }
}

module.exports = MpdClient;

describe('mpdlib', () => {

    const mpdConnection = require('../src/mpdConnection');

    beforeEach(() => {

    })

    it('should return a promise', () => {
        expect(mpdConnection() instanceof Promise).toBeTruthy();
    });

});

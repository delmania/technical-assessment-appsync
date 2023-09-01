import { request } from '../api/functions/calculateMode.js'
import  assert from 'assert'

describe('Calculations', function () {    
    it('Should calculate the mode', function (){
        const expectedMode = 1;  
        const values =  [2, 4, 5, 7, 1, 8, 1];        
        const ctx = { stash : {values : values }}
        const result = request(ctx);
        const { mode } = result.payload
        assert.equal(mode, expectedMode);
    });

    it('Should handle a single element', function () {
        const expectedMode = 1;
        const values = [1];
        const ctx = { stash : {values : values }}
        const result = request(ctx);
        const { mode } = result.payload
        assert.equal(mode, expectedMode);
    });

    it('Should handle an empty array', function () {
        const expectedMode = 0;
        const values = [];
        const ctx = { stash : {values : values }}
        const result = request(ctx);
        const { mode } = result.payload
        assert.equal(mode, expectedMode);
    });

    it('Should handle an calculate the mode from multiple repeats', function () {
        const expectedMode = 2;
        const values = [3, 2, 3, 2, 3, 2, 2];
        const ctx = { stash : {values : values }}
        const result = request(ctx);
        const { mode } = result.payload
        assert.equal(mode, expectedMode);
    });

    it('Should handle an calculate the mode from an unsorted array', function () {
        const expectedMode = 1;
        const values = [5, 6, 7, 1, 3, 2, 1];
        const ctx = { stash : {values : values }}
        const result = request(ctx);
        const { mode } = result.payload
        assert.equal(mode, expectedMode);
    });

    it('Should handle an calculate the mode from an unsorted array', function () {
        const expectedMode = 2;
        const values = [2, 5, 6, 7, 1, 3, 2, 1];
        const ctx = { stash : {values : values }}
        const result = request(ctx);
        const { mode } = result.payload
        assert.equal(mode, expectedMode);
    });
  
});
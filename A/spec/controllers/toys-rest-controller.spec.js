console.error = arg => {};

const express = require('express');
const ToysRestController = require('../../src/service/toys-rest-controller');
//const ToysService = require('../business-service/toys-service');

describe('Sample Test', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
});

describe('RESTful controller unit tests for Toys operations:', () => {
    let controller;
    let mockService;
    let mockHttpResponse;
    let mockApp;

    beforeEach(() => {
        mockService = jasmine.createSpyObj('mockService', ['getAllToys', 'getTeam']);
        mockApp = jasmine.createSpyObj('mockApp', ['use']);
        controller = new ToysRestController(mockApp);
        controller.ToysService = mockService;
        mockHttpResponse = jasmine.createSpyObj('mockHttpResponse', ['status', 'json']);
        mockHttpResponse.status.and.returnValue(mockHttpResponse);
    });

    describe('retrieve all toys', () => {
        it('succeeds', async () => {
            const testToys = [
                { name: 'Medical Kit', brand: 'Fisher-Price', age_group: '3 to 9', price: 20.41 }
            ];
            mockService.getAllToys.and.returnValue(Promise.resolve(testToys));
            const req = { params: { location: 'US-NC' } };

            await controller.getAllToys(req, mockHttpResponse);
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testToys);
        });

        it('fails due to a service exception', async () => {
            mockService.getAllToys.and.throwError('error');
            const req = { params: { location: 'US-NC' } };

            await controller.getAllToys(req, mockHttpResponse);
            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });

    describe('retrieve team', () => {
        it('succeeds', async () => {
            const testTeam = { team: 'toymasters', membersNames: ['Cían', 'Irene'] };
            mockService.getTeam.and.returnValue(testTeam);
            const req = {};

            await controller.getTeam(req, mockHttpResponse);
            expect(mockHttpResponse.json).toHaveBeenCalledOnceWith(testTeam);
        });

        it('fails due to a service exception', async () => {
            mockService.getTeam.and.throwError('error');
            const req = {};

            await controller.getTeam(req, mockHttpResponse);
            expect(mockHttpResponse.status).toHaveBeenCalledOnceWith(500);
        });
    });

    describe('ping', () => {
        it('succeeds', () => {
            const req = {};
            const res = { send: jasmine.createSpy('send') };

            controller.ping(req, res);
            expect(res.send).toHaveBeenCalledOnceWith('Service is listening');
        });
    });
});

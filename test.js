
const request = require('supertest');
const controller = require('./controller'); // Your controller for handling the endpoint

describe('GET /events', () => {
  it('should return a list of events', async () => {
    // Mock the response from the controller
    const mockEvents = [      { id: 1, name: 'Event 1' },      { id: 2, name: 'Event 2' },      { id: 3, name: 'Event 3' },    ];
    controller.get = jest.fn().mockResolvedValue(mockEvents);

    // Send a GET request to /events using Supertest
    const response = await request(app)
      .get('/events')
      .expect(200); // Expect a 200 status code for successful request

    // Assert that the response body matches the expected events list
    expect(response.body).toEqual(mockEvents);
  });
});


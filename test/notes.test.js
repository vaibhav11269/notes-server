const chai = require('chai');
const app = require('../app');
const supertest = require('supertest');
const expect = chai.expect;
const request = supertest(app);

let authToken, addedNote; // To store the token for later use

before(async function () {
    this.timeout(5000);
    const loginResponse = await request.post('/api/auth/login').send({
        email: 'test.user1@gmail.com',
        password: 'Password1234@',
    });

    authToken = await loginResponse.body.token;
});


describe('Notes API Unit Tests', () => {
    describe('GET /api/notes', () => {
        it('should return an empty array when no notes are present', async () => {
            const res = await request.get('/api/notes').set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(200);
            expect(res.body.notes).to.be.an('array');
        });
    });

    describe('GET /api/notes/:id', () => {
        it('should return 404 when the note does not exist', async () => {
            const res = await request.get('/api/notes/36ce86d0-abbc-11ee-a548-6f7f36e3aeb6').set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('error').to.equal('No Note found with the given id');
        });
    });

    describe('POST /api/notes', () => {
        it('should create a new note', async () => {
            const newNote = { title: 'Test Note', description: 'This is a test note' };
            const res = await request.post('/api/notes').send(newNote).set('Authorization', `Bearer ${authToken}`);
            expect(res.status).to.equal(201);
            expect(res.body.newNote).to.have.property('title').to.equal('Test Note');
            expect(res.body.newNote).to.have.property('description').to.equal('This is a test note');
            addedNote = res.body.newNote;
        });
    });

    describe('Notes API Update/Delete Tests', () => {
        it('should update a note by id', async () => {
            const updatedNote = { title: 'Updated Title' };
            const res = await request.put(`/api/notes/${addedNote.id}`).send(updatedNote).set('Authorization', `Bearer ${authToken}`);

            expect(res.status).to.equal(200);
            expect(res.body.note).to.have.property('title').to.equal('Updated Title');
            expect(res.body.note).to.have.property('description').to.equal('This is a test note');
        });

        it('should delete a note by id', async () => {
            console.log("Added Note", addedNote)
            const res = await request.delete(`/api/notes/${addedNote.id}`).set('Authorization', `Bearer ${authToken}`);

            expect(res.status).to.equal(200);
            expect(res.body.note).to.have.property('title').to.equal('Updated Title');
            expect(res.body.note).to.have.property('is_active').to.equal(false);
        });
    });
});

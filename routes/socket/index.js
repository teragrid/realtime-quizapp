const { socketIo } = require("socket.io");

const JOIN_QUIZ_EVENT = 'joinQuiz';

module.exports = function (io) {
    io.on('connection', (socketIo) => {
        const { token } = socketIo.handshake.query;
        if (validateSocketToken(token)) {
            socketIo.on(JOIN_QUIZ_EVENT, ({ quizId }) => {
                socketIo.join(quizId);
                console.log(`User joined quiz ${quizId}`);
                io.to(quizId).emit('newParticipant', { message: `A new user has joined the quiz.` });
            });

            socketIo.on('disconnect', () => {
                console.log('User disconnected');
            });
        } else {
            socketIo.disconnect(true);
            console.log('Disconnected due to invalid token');
        }
    });
};

function validateSocketToken(token) {
    // Validate the token
    return true; // Dummy validation
}
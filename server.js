const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

const presentations = [
  { id: 1, title: 'Propuesta AI para clientes',     author: 'Jaime Durán',          role: 'Architect Advisor',          emoji: '🎯' },
  { id: 2, title: 'AI es la nueva UI',               author: 'Sergi Millans',         role: 'Solution Advisor Finanzas',  emoji: '✨' },
  { id: 3, title: 'Estado de la nación',             author: 'José Enríquez',         role: 'Solution Advisor EPM',       emoji: '🌍' },
  { id: 4, title: 'Mentoring Companion',             author: 'Florencia Martino',     role: 'Graphic Recording EMEA',     emoji: '🤝' },
  { id: 5, title: 'Me@SAP como AA',                  author: 'Carles Viaplana',       role: 'Architect Advisor',          emoji: '🚀' },
  { id: 6, title: 'Navegas o escribes',              author: 'Javier Fdez Gallego',   role: 'Solution Advisor SCM',       emoji: '⌨️' },
  { id: 7, title: 'FeedMeBack',                      author: 'Daniel Álamo',          role: 'Solution Advisor BTP',       emoji: '💬' },
  { id: 8, title: 'Scape Box Digital',               author: 'Fran San Fructuoso',    role: 'Solution Advisor Innovation',emoji: '🎮' },
];

let votes = {};        // { socketId: presentationId }
let revealed = false;

presentations.forEach(p => { votes[p.id] = 0; });

function getVoteCounts() {
  const counts = {};
  presentations.forEach(p => { counts[p.id] = 0; });
  return counts;
}

let voteCounts = getVoteCounts();
let voterSessions = new Set();  // track voted sessions

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/api/presentations', (req, res) => {
  res.json(presentations);
});

app.get('/api/state', (req, res) => {
  res.json({
    totalVotes: Object.values(voteCounts).reduce((a, b) => a + b, 0),
    revealed,
    counts: revealed ? voteCounts : null,
  });
});

io.on('connection', (socket) => {
  const totalVotes = Object.values(voteCounts).reduce((a, b) => a + b, 0);

  socket.emit('state', {
    totalVotes,
    revealed,
    counts: revealed ? voteCounts : null,
    presentations,
  });

  socket.on('vote', ({ presentationId, sessionId }) => {
    if (revealed) return;
    if (voterSessions.has(sessionId)) {
      socket.emit('alreadyVoted');
      return;
    }

    const id = parseInt(presentationId);
    if (!presentations.find(p => p.id === id)) return;

    voterSessions.add(sessionId);
    voteCounts[id] = (voteCounts[id] || 0) + 1;

    const total = Object.values(voteCounts).reduce((a, b) => a + b, 0);
    io.emit('voteUpdate', { totalVotes: total });

    socket.emit('votedOk', { presentationId: id });
  });

  socket.on('reveal', ({ adminKey }) => {
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'admin2024') return;
    revealed = true;
    io.emit('reveal', { counts: voteCounts, presentations });
  });

  socket.on('reset', ({ adminKey }) => {
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'admin2024') return;
    voteCounts = getVoteCounts();
    voterSessions.clear();
    revealed = false;
    io.emit('reset');
  });
});

server.listen(PORT, () => {
  console.log(`Voting app running on http://localhost:${PORT}`);
  console.log(`Admin panel: http://localhost:${PORT}/admin.html`);
});

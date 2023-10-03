const io = require("socket.io")(5000)

io.on("connection", socket => {
  const id = socket.handshake.query.id;
  socket.join(id)

  socket.on("send-message", ({ recipients, message }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipient.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients, 
        sender: id, 
        message
      })
    })
  })
})
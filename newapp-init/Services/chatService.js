const Chat = require('../Models/chat');

function create(req, res, next) {
  new Chat({
    content: req.body.content,
    dateCreation: new Date()
  })
    .save()
    .then((data) => {
      res.json({
        msg: 'Chat created',
        chat: data
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating chat: ' + error });
    });
}

const read = (req, res, next) => {
  Chat.find()
    .then((chats) => {
      res.json(chats);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error reading chats: ' + error });
    });
};

const update = (req, res, next) => {
  const chatId = req.params.id;
  const updatedContent = req.body.content;

  Chat.findByIdAndUpdate(chatId, { content: updatedContent }, { new: true })
    .then((updatedChat) => {
      if (!updatedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json({
        msg: 'Chat updated',
        chat: updatedChat
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating chat: ' + error });
    });
};

const deleteC = (req, res, next) => {
  const chatId = req.params.id;

  Chat.findByIdAndDelete(chatId)
    .then((deletedChat) => {
      if (!deletedChat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      res.json({ msg: 'Chat deleted', chat: deletedChat });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting chat: ' + error });
    });
};

module.exports = { create, read, update, deleteC };

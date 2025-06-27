const Classroom = require('../Models/classroom');

function create(req, res, next) {
  new Classroom({
    name: req.body.name,
    floor: req.body.floor,
    capacity: req.body.capacity,
    date: req.body.date || new Date()
  })
    .save()
    .then((data) => {
      res.json({
        msg: 'Classroom created',
        classroom: data
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error creating classroom: ' + error });
    });
}

const read = (req, res, next) => {
  Classroom.find()
    .then((classrooms) => {
      res.json(classrooms);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error reading classrooms: ' + error });
    });
};

const update = (req, res, next) => {
  const classroomId = req.params.id;
  const updatedData = {
    name: req.body.name,
    floor: req.body.floor,
    capacity: req.body.capacity,
    date: req.body.date
  };

  Classroom.findByIdAndUpdate(classroomId, updatedData, { new: true })
    .then((updatedClassroom) => {
      if (!updatedClassroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
      res.json({
        msg: 'Classroom updated',
        classroom: updatedClassroom
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error updating classroom: ' + error });
    });
};

const deleteC = (req, res, next) => {
  const classroomId = req.params.id;

  Classroom.findByIdAndDelete(classroomId)
    .then((deletedClassroom) => {
      if (!deletedClassroom) {
        return res.status(404).json({ error: 'Classroom not found' });
      }
      res.json({ msg: 'Classroom deleted', classroom: deletedClassroom });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error deleting classroom: ' + error });
    });
};

//bonus question1
const searchByFloor = (req, res, next) => {
  const min = parseInt(req.query.min);
  const max = parseInt(req.query.max);

  Classroom.find({ floor: { $gte: min, $lte: max } })
    .then((classrooms) => res.json(classrooms))
    .catch((error) =>
      res.status(500).json({ error: "Error searching classrooms: " + error })
    );
};
//bonus question2

const capacityStats = (req, res, next) => {
  const minCapacity = parseInt(req.query.min);

  Classroom.countDocuments({ capacity: { $gt: minCapacity } })
    .then((count) => res.json({ total: count }))
    .catch((error) =>
      res.status(500).json({ error: "Error getting stats: " + error })
    );
};
//bonus question3

const renderList = (req, res, next) => {
  Classroom.find()
    .then((classrooms) =>
      res.render("classroom_list.twig", { classrooms })
    )
    .catch((error) =>
      res.status(500).json({ error: "Error rendering page: " + error })
    );
};

module.exports = {
  create, read, update, deleteC, searchByFloor, capacityStats, renderList
};


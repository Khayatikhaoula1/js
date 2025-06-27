const yup = require('yup');

const validate = async (req, res, next) => {
  try {
    const schema = yup.object().shape({
      name: yup.string()
        .min(3, "au moins 3 caractères")
        .required("Le nom est requis"),
      floor: yup.number()
        .positive("Etage doit être positif")
        .required("Etage requis"),
      capacity: yup.number()
        .positive("Capacité positive")
        .required("Capacité requise"),
      date: yup.date()
        .min(new Date(), "Date future ou aujourd'hui")
        .required("Date requise")
    });

    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
};

module.exports = validate;

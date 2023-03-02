const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    const validPassword = await userData.checkPassword(req.body.password);

    if (!userData || !validPassword) {
      // // res.statusMessage = 'Incorrect email, please try again!';
      // res.writeHead(400,'Incorrect email or password, please try again');
      // return res.end();
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // const validPassword = await userData.checkPassword(req.body.password);

    // if (!validPassword) {
    //   // res.statusMessage = 'Incorrect password, please try again!';
    //   res.status(400).send('Incorrect pass please try again!');
    //   // res
    //   //   .status(400)
    //   //   .json({ message: 'Incorrect email or password, please try again' });
    //   return;
    // }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

const db = require('../models');
const config = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {WHITELISTED_ROLES_SIGNUP, DEFAULT_ROLES} = require('../helper/roles');
// const authHelper = require('../helper/auth');


exports.signup = async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, 10);
  const phoneNumber = req.body.phoneNumber;
  const courseType = req.body.courseType;
  const role = DEFAULT_ROLES;
  let transaction;

  try {
    transaction = await db.sequelize.transaction();

    // Save User to Database
    const user = await db.user.create({
      firstName,
      lastName,
      email,
      password,
      isActive: 0,
      phoneNumber,
      courseType
    }, {transaction});

    // Validate with restricted roles from direct signup
    if (!WHITELISTED_ROLES_SIGNUP.includes(role)) {
      return res.status(400).send({status: 0, message: 'Failed! Unauthorized role'});
    }

    // Assign default role to user
    await db.userRole.create({userId: user.id, roleName: role, createdBy: user.id}, {transaction});

    await transaction.commit();

    return res.status(200).send({status: 1, message: 'Thank you for registering. We’ll send an email when your account has been activated.'});
  } catch (e) {
    if (transaction) {
      // Rollback inserted records when it fails
      await transaction.rollback();
    }
    res.status(500).send({status: 0, message: e.message});
  };
};

exports.signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    if (!email || !password) {
      return res.status(400).send({status: 0, message: 'Email or Password should not be empty.'});
    }

    const user = await db.user.findOne({
      include: [{
        model: db.userRole,
        as: 'userRoles',
        required: true,
      }],
      where: {email: email},
    });

    if (!user) {
      return res.status(404).send({status: 0, message: 'User Not found.'});
    } else if (!user.isActive) {
      return res.status(401).send({status: 0, message: 'This account is inactive. Please contact Admin.'});
    }

    const passwordIsValid = bcrypt.compareSync( password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({status: 0, message: 'Invalid Password!'});
    }

    user.userRoles = user.userRoles.map( (e) => e.roleName );


    // const accessToken = authHelper.generateAccessToken(user);
    // const refreshToken = await authHelper.generateRefreshToken(user);

    return res
        // .cookie('refreshToken', refreshToken.token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: 'none',
        // })
        .status(200)
        .json({
          // accessToken: accessToken,
          // tokenType: 'Bearer',
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.fullName,
            email: user.email,
            emailVerified: user.emailVerified,
            roles: user.userRoles,
            phoneNumber: user.phoneNumber,
            courseType: user.courseType
          },
        });
  } catch (e) {
    res.status(500).send({status: 0, message: e.message});
  };
};

exports.refreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.status(401).send({status: 0, message: 'Invalid refresh token'});

  const refreshToken = cookies.refreshToken;
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  const foundToken = await db.userRefreshToken.findOne({where: {token: refreshToken}});

  // Detected refresh token reuse!
  if (!foundToken) {
    try {
      const decodedOne = jwt.verify(refreshToken, config.jwtRefreshTokenSecret);
      await db.userRefreshToken.destroy({where: {userId: decodedOne.userId}});
      return res.status(401).send({status: 0, message: 'Invalid refresh token'}); // Unauthorized
    } catch (e) {
      return res.status(401).send({status: 0, message: 'Invalid refresh token'}); // Unauthorized
    }
  }

  // evaluate jwt
  jwt.verify(
      refreshToken,
      config.jwtRefreshTokenSecret,
      async (err, decoded) => {
        if (err) {
          console.log('expired refresh token');
          await db.userRefreshToken.destroy({where: {token: refreshToken}});
        }
        if (err || foundToken.userId !== decoded.userId) return res.status(403).send({status: 0, message: 'Forbidden'});

        // Refresh token was still valid
        const user = await db.user.findOne( {
          include: [{
            model: db.userRole,
            as: 'userRoles',
            required: true,
          }],
          where: {id: decoded.userId},
        });

        user.userRoles = user.userRoles.map( (e) => e.roleName );

        const accessToken = authHelper.generateAccessToken(user);
        const newRefreshToken = await authHelper.generateRefreshToken( user, false);

        // Update old token
        foundToken.token = newRefreshToken.token;
        foundToken.expires = newRefreshToken.expires;
        foundToken.save();

        // await db.userRefreshToken.destroy({ where: { token: refreshToken } });

        // Creates Secure Cookie with refresh token
        return res
            .cookie('refreshToken', newRefreshToken.token, {
              httpOnly: true,
              secure: true,
              sameSite: 'none',
            })
            .status(200)
            .json({
              accessToken: accessToken,
              tokenType: 'Bearer',
              roles: user.userRoles,
            });
      },
  );
};

exports.logout = async (req, res) => {
  // const cookies = req.cookies;
  // if (!cookies?.refreshToken) return res.status(401).send({status: 0, message: 'Invalid refresh token'});

  // const refreshToken = cookies.refreshToken;
  // const foundToken = await db.userRefreshToken.findOne({where: {token: refreshToken}});

  // res.clearCookie('refreshToken', {
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'none',
  // });

  // if (foundToken) {
  //   try {
  //     const decodedOne = jwt.verify(refreshToken, config.jwtRefreshTokenSecret);
  //     await db.userRefreshToken.destroy({where: {userId: decodedOne.userId, token: refreshToken}});
  //     return res.status(200).send({status: 1, message: 'Logout...'});
  //   } catch (e) {
  //     return res.status(401).send({status: 0, message: 'Invalid refresh token'}); // Unauthorized
  //   }
  // }
  return res.status(200).send({status: 1, message: 'Logout...'});
};

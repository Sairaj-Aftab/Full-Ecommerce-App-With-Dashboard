import User from "../models/user.js";
import createError from "../utility/createError.js";
import { hashPassword, passwordVerify } from "../utility/hash.js";
import { createToken } from "../utility/token.js";
import { isEmail } from "../utility/validates.js";
import jwt from "jsonwebtoken";

/**
 *
 * @access public
 * @route /api/v1/register
 * @method Post
 */
export const register = async (req, res, next) => {
  try {
    const { name, auth, password } = req.body;

    // Validation
    if (!name || !auth || !password) {
      return next(createError(400, "All fields are required"));
    }

    // Initialize auth
    let emailData = null;
    let phoneNumberData = null;

    if (isEmail(auth)) {
      emailData = auth;
      const usedEmail = await User.findOne({ email: auth });
      if (usedEmail) {
        return next(createError(404, "Email already exist"));
      } else {
        // Generate Account Activation Code
        // const activationCode = getRandomCode(10000, 99999);
        // const checkCode = await User.findOne({ access_token: activationCode });
        // if (checkCode) {
        //   activationCode = getRandomCode(10000, 99999);
        // }

        // Crate Data to Data Base
        const users = await User.create({
          name,
          email: emailData,
          password: hashPassword(password),
          // access_token: activationCode,
        });
        if (users) {
          // Create Account Activation Token
          // const accountVerifyToken = createToken({ id: users._id }, "30d");

          // // Send account acctivation link to user
          // accountActivationMail(users.email, {
          //   name: users.name,
          //   link: `${process.env.APP_URL}${process.env.PORT}/api/v1/user/activate/${accountVerifyToken}`,
          //   code: activationCode,
          // });

          res
            .status(200)
            .cookie("otp", users.email, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "User successfully created",
              user: users,
            });
        }
      }
    } else {
      return next(createError(404, "Invalid email"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @access public
 * @route /api/v1/auth/login
 * @method Post
 */
export const login = async (req, res, next) => {
  try {
    const { auth, password } = req.body;

    if (isEmail(auth)) {
      const emailUser = await User.findOne({ email: auth }).populate("role");
      if (!emailUser) {
        next(createError(400, "User not found"));
      } else {
        if (!passwordVerify(password, emailUser.password)) {
          next(createError(400, "Wrong password"));
        } else {
          const token = createToken({ email: emailUser.email }, "365d");
          // const refresh_token = jwt.sign(
          //   { email: emailUser.email },
          //   process.env.REFRESH_TOKEN_SECRET,
          //   {
          //     expiresIn: "365d",
          //   }
          // );

          res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.APP_ENV == "Development" ? false : true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 1000,
          });

          res.status(200).json({
            message: "User login successfull",
            user: emailUser,
            token,
          });
        }
      }
    } else {
      next(createError(404, "Invalid email"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @access public
 * @route /api/v1/auth/logout
 * @method Post
 */

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("auth_token")
      .status(200)
      .json({ message: "Successfully log out" });
  } catch (error) {
    next(error);
  }
};

export const logedInUser = async (req, res, next) => {
  try {
    if (!req.me) {
      return next(createError(404, "User not found"));
    }
    res.json(req.me);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.me;

    if (id === req.params.id) {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (user) {
        res.status(200).json({ user, message: "Successfully updated" });
      }
    } else {
      return next(createError(404, "User not found"));
    }
  } catch (error) {
    return next(error);
  }
};

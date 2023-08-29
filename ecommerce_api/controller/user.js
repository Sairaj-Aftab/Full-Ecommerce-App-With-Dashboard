import createError from "../utility/createError.js";
import multer from "multer";
import User from "../models/user.js";
import { isEmail, isPhoneNumber } from "../utility/validates.js";
import { hashPassword, passwordVerify } from "../utility/hash.js";
import { createToken, verifyToken } from "../utility/token.js";
import { sendEmailUserLoginInfo } from "../utility/sendMail.js";

/**
 * Get All User
 */
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").populate("role");
    if (users.length > 0) {
      res.status(200).json({ users });
    }
  } catch (error) {
    return next(error);
  }
};

/**
 *
 * @access public
 * @route /api/v1/user.create
 * @method Post
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return next(createError(400, "All fields are required"));
    }

    if (isEmail(email)) {
      const usedEmail = await User.findOne({ email: email });
      if (usedEmail) {
        return next(createError(404, "Email already exist"));
      } else {
        // Crate Data to Data Base
        const user = await User.create({
          name,
          email,
          password: hashPassword(password),
          role,
        });
        if (user) {
          sendEmailUserLoginInfo({
            to: email,
            sub: "Account login info...",
            msg: `Hi! ${name}. You can login through the email : ${email} and password : ${password}`,
          });
          res.status(200).json({ user, message: `${name} has been created` });
        }
      }
    } else {
      return next(createError(404, "Invalid email"));
    }
  } catch (error) {
    next(error);
  }
};

// Update Rule status
export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ user, message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/user
 * @method Post
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validation
    if (!id) {
      return next(createError(404, "User not found"));
    }

    const deleteUser = await User.findByIdAndDelete(id);

    if (deleteUser) {
      res
        .status(200)
        .json({ user: deleteUser, message: "Successfully deleted" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @access public
 * @route /api/v1/me
 * @method get
 */
export const logedInUser = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(createError(404, "Token not found"));
    }
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];

      const user = verifyToken(token);
      if (!user) {
        next(createError(404, "Invalid user"));
      }
      if (user) {
        const logedInUser = await User.findById(user.id);
        if (!logedInUser) {
          next(createError(404, "User not found"));
        } else {
          res.status(200).json({
            message: "user stabled",
            user: logedInUser,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Account Activation by Email
 * @access public
 * @route /api/v1/activate/:token
 * @method get
 */
export const activateAccountByLink = async (req, res, next) => {
  try {
    const { token } = req.params;

    // Validation Token for Activate account
    if (!token) {
      next(createError(404, "Invalid URL"));
    } else {
      const tokenVerify = verifyToken(token);
      if (!tokenVerify) {
        next(createError(404, `It's not matched URL. Please try again`));
      }
      if (tokenVerify) {
        const account = await User.findById(tokenVerify.id);

        if (account.isActivate == true) {
          next(createError(404, "Account already activated"));
        } else {
          await User.findByIdAndUpdate(tokenVerify.id, {
            isActivate: true,
            access_token: "",
          });

          res.status(200).json({
            message: "Account has been acctivated successfully",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Account Activation by Code
 * @access public
 * @route /api/v1/activate
 * @method get
 */
export const activateAccountByCode = async (req, res, next) => {
  try {
    const { code, auth } = req.body;

    const user = await User.findOne().or([{ email: auth }, { phone: auth }]);

    if (!user) {
      next(createError(404, "User not found"));
    } else {
      if (user.isActivate == true) {
        next(createError(404, "User already activated"));
      } else {
        if (user.access_token != code) {
          next(createError(404, "OTP is not matching"));
        } else {
          await User.findByIdAndUpdate(user._id, {
            isActivate: true,
            access_token: "",
          });

          res.status(200).json({
            message: `Account's been activated successfully`,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Send Email for Resend Code and Link for Activate account
 * @access public
 * @route /api/v1/resend-mail
 * @method post
 */
export const sendActivateAccountResendMail = async (req, res, next) => {
  try {
    const { auth } = req.body;
    const user = await User.findOne().or([{ email: auth }, { phone: auth }]);

    if (!user) {
      next(createError(404, "User not found"));
    } else {
      if (user.isActivate == true) {
        next(createError(404, "User already verified"));
      } else {
        let verificationCode = getRandomCode(10000, 99999);
        const checkCode = await User.findOne({
          access_token: verificationCode,
        });
        if (checkCode) {
          verificationCode = getRandomCode(10000, 99999);
        }

        if (isEmail(auth)) {
          // Create Account Activation Token
          const accountVerifyToken = createToken({ id: user._id }, "30d");

          await User.findByIdAndUpdate(user._id, {
            access_token: verificationCode,
          });
          // Send account acctivation link to user
          accountActivationMail(user.email, {
            first_name: user.first_name,
            sur_name: user.sur_name,
            link: `${process.env.APP_URL}${process.env.PORT}/api/v1/user/activate/${accountVerifyToken}`,
            code: verificationCode,
          });
          res
            .status(200)
            .cookie("otp", user.email, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "Already sent to your email",
              user: user,
            });
        } else if (isPhoneNumber(auth)) {
          // Create Account Activation Token
          const accountVerifyToken = createToken({ id: user._id }, "30d");

          await User.findByIdAndUpdate(user._id, {
            access_token: verificationCode,
          });
          sendOTP(
            user.phone,
            `Hi! ${user.first_name} ${user.sur_name}. Your OTP code is ${verificationCode}`
          );
          res
            .status(200)
            .cookie("otp", user.phone, {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            })
            .json({
              message: "Already sent to your phone number",
              user: user,
            });
        } else {
          next(createError(404, "User not found"));
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

// Send Resend Email or Message for for forgot or recovery or set new password
export const sendResendMessageForPassword = async (req, res, next) => {
  try {
    const { auth } = req.body;
    const user = await User.findOne().or([{ email: auth }, { phone: auth }]);

    if (!user) {
      next(createError(404, "User not found"));
    } else {
      let verificationCode = getRandomCode(10000, 99999);
      const checkCode = await User.findOne({
        access_token: verificationCode,
      });
      if (checkCode) {
        verificationCode = getRandomCode(10000, 99999);
      }

      if (isEmail(auth)) {
        // Create Account Activation Token
        const accountVerifyToken = createToken({ id: user._id }, "30d");

        await User.findByIdAndUpdate(user._id, {
          access_token: verificationCode,
        });
        // Send account acctivation link to user
        accountActivationMail(user.email, {
          first_name: user.first_name,
          sur_name: user.sur_name,
          link: `${process.env.APP_URL}${process.env.PORT}/api/v1/user/activate/${accountVerifyToken}`,
          code: verificationCode,
        });
        res
          .status(200)
          .cookie("otp", user.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Already sent to your email",
            user: user,
          });
      } else if (isPhoneNumber(auth)) {
        // Create Account Activation Token
        const accountVerifyToken = createToken({ id: user._id }, "30d");

        await User.findByIdAndUpdate(user._id, {
          access_token: verificationCode,
        });
        sendOTP(
          user.phone,
          `Hi! ${user.first_name} ${user.sur_name}. Your OTP code is ${verificationCode}`
        );
        res
          .status(200)
          .cookie("otp", user.phone, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Already sent to your phone number",
            user: user,
          });
      } else {
        next(createError(404, "User not found"));
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Send Link and Code to Email for recoverying Forgot Password
 * @access public
 * @route /api/v1/recover-password
 * @method post
 */
export const sendRecoveryPasswordMail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      next(createError(404, "User not found"));
    }
    if (user) {
      const passwordResetToken = createToken({ id: user._id }, "30d");

      let verificationCode = getRandomCode(10000, 99999);
      const checkCode = await User.findOne({ access_token: verificationCode });
      if (checkCode) {
        verificationCode = getRandomCode(10000, 99999);
      }

      // Send mail
      passwordResetMail(user.email, {
        name: user.first_name + " " + user.sur_name,
        link: `${process.env.APP_URL}${process.env.PORT}/api/v1/user/reset-password/${passwordResetToken}`,
        code: verificationCode,
      });

      await User.findByIdAndUpdate(user._id, {
        access_token: verificationCode,
      });
      res.status(200).json({
        message: "A password reset link has been sent to your email.",
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Reset Password
 * @access public
 * @route /api/v1/recover-password
 * @method post
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!token) {
      next(createError(404, "Token not found"));
    } else {
      const tokenVerify = verifyToken(token);

      if (!tokenVerify) {
        next(createError(404, "Token is not matching"));
      }
      if (tokenVerify) {
        const user = await User.findById(tokenVerify.id);

        if (!user) {
          next(createError(404, "User not found"));
        } else {
          await User.findByIdAndUpdate(user._id, {
            password: hashPassword(password),
            access_token: "",
          });
          res.status(200).json({
            message: "Password successfully updated",
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Find User Account for reseting password
 */
export const findUserAccount = async (req, res, next) => {
  try {
    const { auth } = req.body;
    // Initialize auth
    let emailData = null;
    let phoneNumberData = null;

    if (isEmail(auth)) {
      emailData = auth;
      const usedEmail = await User.findOne({ email: auth });
      if (!usedEmail) {
        return next(createError(404, "Email is not found"));
      } else {
        res
          .status(200)
          .cookie(
            "user",
            JSON.stringify({
              photo: usedEmail.profile_photo,
              name: usedEmail.first_name + " " + usedEmail.sur_name,
              email: usedEmail.email,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: usedEmail,
          });
      }
    } else if (isPhoneNumber(auth)) {
      phoneNumberData = auth;
      const usedNumber = await User.findOne({ phone: auth });
      if (!usedNumber) {
        return next(createError(404, "Phone number is not found"));
      } else {
        res
          .status(200)
          .cookie(
            "user",
            JSON.stringify({
              photo: usedNumber.profile_photo,
              name: usedNumber.first_name + " " + usedNumber.sur_name,
              phone: usedNumber.phone,
            }),
            {
              expires: new Date(Date.now() + 1000 * 60 * 15),
            }
          )
          .json({
            user: usedNumber,
          });
      }
    } else {
      return next(createError(404, "Invalid email or phone number"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Send Password reset OTP
 */
export const sendPasswordResetOTP = async (req, res, next) => {
  try {
    const { auth } = req.body;
    const user = await User.findOne().or([{ email: auth }, { phone: auth }]);

    if (user) {
      let verificationCode = getRandomCode(10000, 99999);
      const checkCode = await User.findOne({
        access_token: verificationCode,
      });
      if (checkCode) {
        verificationCode = getRandomCode(10000, 99999);
      }

      if (isEmail(auth)) {
        // Create Account Activation Token
        const accountVerifyToken = createToken({ id: user._id }, "30d");

        await User.findByIdAndUpdate(user._id, {
          access_token: verificationCode,
        });
        // Send account acctivation link to user
        accountActivationMail(user.email, {
          first_name: user.first_name,
          sur_name: user.sur_name,
          link: `${process.env.APP_URL}${process.env.PORT}/api/v1/user/activate/${accountVerifyToken}`,
          code: verificationCode,
        });
        res
          .status(200)
          .cookie("otp", user.email, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Already sent to your email",
            user: user,
          });
      } else if (isPhoneNumber(auth)) {
        // Create Account Activation Token
        const accountVerifyToken = createToken({ id: user._id }, "30d");

        await User.findByIdAndUpdate(user._id, {
          access_token: verificationCode,
        });
        sendOTP(
          user.phone,
          `Hi! ${user.first_name} ${user.sur_name}. Your OTP code is ${verificationCode}`
        );
        res
          .status(200)
          .cookie("otp", user.phone, {
            expires: new Date(Date.now() + 1000 * 60 * 15),
          })
          .json({
            message: "Already sent to your phone number",
            user: user,
          });
      } else {
        next(createError(404, "User not found"));
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Check Password Reset OTP
 */
export const checkPasswordResetOTP = async (req, res, next) => {
  try {
    const { code, auth } = req.body;

    if (isEmail(auth)) {
      const userEmail = await User.findOne({ email: auth });
      if (!userEmail) {
        next(createError(404, "Email not matched"));
      } else {
        if (userEmail.access_token != code) {
          next(createError(404, "Invalid Code"));
        } else {
          res
            .status(200)
            .cookie("user-id", userEmail.id, {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .cookie("code", code, {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .json({
              message: "Ok",
            });
        }
      }
    } else if (isPhoneNumber(auth)) {
      const userPhone = await User.findOne({ phone: auth });
      if (!userPhone) {
        next(createError(404, "Phone number not matched"));
      } else {
        if (userPhone.access_token != code) {
          next(createError(404, "Invalid Code"));
        } else {
          res
            .status(200)
            .cookie("user-id", userPhone.id, {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .cookie("code", code, {
              expires: new Date(Date.now() + 1000 * 60 * 30),
            })
            .json({
              message: "Ok",
            });
        }
      }
    } else {
      next(createError(404, "Email or phone number not matched"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Change Password
 */
export const changePassword = async (req, res, next) => {
  try {
    const { id, code, password } = req.body;
    const user = await User.findOne().and([{ id: id }, { access_token: code }]);
    if (!user) {
      next(createError(404, "User not found"));
    } else {
      await User.findByIdAndUpdate(id, {
        password: hashPassword(password),
        access_token: null,
      });
      res
        .status(200)
        .clearCookie("otp")
        .clearCookie("user-id")
        .clearCookie("code")
        .clearCookie("user")
        .json({
          message: "Successfully updated",
        });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * User Profile Update
 */
export const userProfileUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const userUpdate = await User.findByIdAndUpdate(id, data, { new: true });
    if (userUpdate) {
      res.status(200).json({
        message: "Profile successfully updated",
        user: userUpdate,
      });
    } else {
      next(createError(404, "Updated fail"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Featured Sliders with Image
 */
export const featuredSlides = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { collection_name } = req.body;
    const photos = [];
    req.files.forEach((item) => {
      photos.push(item.filename);
    });
    const { featured_collection } = await User.findById(id);
    await User.findByIdAndUpdate(
      id,
      {
        featured_collection: [
          ...featured_collection,
          { collection_name, photos },
        ],
      },
      { new: true }
    );
    res.send("done");
  } catch (error) {
    return next(error);
  }
};

/**
 * User Profile Update
 */
export const profilePhotoUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { profile_photo: req.file.filename },
      { new: true }
    );
    if (user) {
      res.status(200).json({
        message: "Successfully profile photo update",
        filename: req.file.filename,
      });
    }
  } catch (error) {
    return next(error);
  }
};
/**
 * User Cover Update
 */
export const coverPhotoUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { cover_photo: req.file.filename },
      { new: true }
    );
    if (user) {
      res.status(200).json({
        message: "Successfully cover photo update",
        filename: req.file.filename,
      });
    }
  } catch (error) {
    return next(error);
  }
};

/**
 * Send Friend Request
 */
export const sendFriendRequest = async (req, res, next) => {
  try {
    const { receiver, sender } = req.params;
    const send = await User.findById(sender);
    const receive = await User.findById(receiver);

    if (receive.friends_request != sender) {
      await receive.updateOne({
        $push: { friends_request: sender },
      });
    }

    if (receive.follower != sender) {
      await receive.updateOne({
        $push: { follower: sender },
      });
    }

    if (send.send_request != receiver) {
      await send.updateOne({
        $push: { send_request: receiver },
      });
    }

    if (send.following != receiver) {
      await send.updateOne({
        $push: { following: receiver },
      });
    }

    const senderUserUpdated = await User.findById(sender);
    res.status(200).json({
      user: senderUserUpdated,
    });
  } catch (error) {
    return next(error);
  }
};
/**
 * Accept Friend Request
 */
export const acceptFriendRequest = async (req, res, next) => {
  try {
    const { meId, requestId } = req.params;

    const me = await User.findById(meId);
    const requested = await User.findById(requestId);

    await me.updateOne({
      $push: { friends: requestId },
    });
    await me.updateOne({
      $push: { following: requestId },
    });
    await me.updateOne({
      $pull: { friends_request: requestId },
    });

    await requested.updateOne({
      $push: { friends: meId },
    });
    await requested.updateOne({
      $push: { follower: meId },
    });
    await requested.updateOne({
      $pull: { send_request: meId },
    });
    const meUserUpdated = await User.findById(meId);
    res.status(200).json({
      user: meUserUpdated,
    });
  } catch (error) {
    return next(error);
  }
};
/**
 * Accept Friend Request
 */
export const deleteFriendRequest = async (req, res, next) => {
  try {
    const { meId, requestId } = req.params;

    const me = await User.findById(meId);
    const requested = await User.findById(requestId);

    await me.updateOne({
      $pull: { friends_request: requestId },
    });
    await requested.updateOne({
      $pull: { send_request: meId },
    });
    const meUserUpdated = await User.findById(meId);
    res.status(200).json({
      user: meUserUpdated,
    });
  } catch (error) {
    return next(error);
  }
};

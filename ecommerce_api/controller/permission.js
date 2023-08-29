import createError from "../utility/createError.js";
import Permission from "../models/permission.js";
import { createSlug } from "../utility/createSlug.js";

/**
 *
 * @access public
 * @route /api/v1/getAllPermission
 * @method GET
 */

export const getAllPermission = async (req, res, next) => {
  try {
    const permissions = await Permission.find();

    if (permissions.length > 0) {
      res.status(200).json(permissions);
    }

  } catch (error) {
    next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/getSinglePermission
 * @method GET
 */

export const getSinglePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findById(id);

    if (!permission) {
      return next(createError(404, "Permission not found"));
    }

    res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/create
 * @method POST
 */

export const createPermission = async (req, res, next) => {
  try {
    const { name } = req.body;
    const permission = await Permission.findOne({ name });

    if (permission) {
      return next(createError(404, "Permission already exist"));
    }

    const create = await Permission.create({
      name,
      slug: createSlug(name),
    });

    if (create) {
      res
        .status(200)
        .json({ permission: create, message: "Successfully created" });
    }
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/delete
 * @method DELETE
 */

export const deletePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const permission = await Permission.findByIdAndDelete(id);

    res.status(200).json({ permission, message: "Successfully deleted" });
  } catch (error) {
    next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/:id
 * @method DELETE
 */

export const updatePermission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const checkPermission = await Permission.findOne({ name });
    if (checkPermission) {
      return next(createError(404, "Permission already exist"));
    }
    const permission = await Permission.findByIdAndUpdate(
      id,
      {
        name,
        slug: createSlug(name),
      },
      { new: true }
    );

    res.status(200).json(permission);
  } catch (error) {
    next(error);
  }
};

// Update Permission status
export const updatePermissionStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const permission = await Permission.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ permission, message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};

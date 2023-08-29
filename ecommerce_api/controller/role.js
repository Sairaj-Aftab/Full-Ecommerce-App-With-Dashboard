import createError from "../utility/createError.js";
import Role from "../models/role.js";
import { createSlug } from "../utility/createSlug.js";

/**
 *
 * @access public
 * @route /api/v1/getAllRules
 * @method GET
 */

export const getAllRule = async (req, res, next) => {
  try {
    const rules = await Role.find();

    if (rules.length > 0) {
      res.status(200).json({ rules });
    }
  } catch (error) {
    return next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/:id
 * @method GET
 */

export const getSingleRule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rule = await Role.findById(id);

    if (!rule) {
      return next(createError(404, "Permission not found"));
    }

    res.status(200).json(rule);
  } catch (error) {
    return next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/create
 * @method POST
 */

export const createRule = async (req, res, next) => {
  try {
    const { name, permissions } = req.body;
    const prevRule = await Role.findOne({ name });

    if (prevRule) {
      return next(createError(404, "Rule already exist"));
    }

    const rule = await Role.create({
      name,
      slug: createSlug(name),
      permissions,
    });

    res.status(200).json({ rule, message: "Successfully created" });
  } catch (error) {
    return next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/delete
 * @method DELETE
 */

export const deleteRule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rule = await Role.findByIdAndDelete(id);

    res.status(200).json({ rule, message: "Successfully deleted" });
  } catch (error) {
    return next(error);
  }
};
/**
 *
 * @access public
 * @route /api/v1/:id
 * @method Update
 */

export const updateRule = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    const rule = await Role.findByIdAndUpdate(
      id,
      {
        name,
        slug: createSlug(name),
        permissions,
      },
      { new: true }
    );

    if (rule) {
      res.status(200).json({ rule, message: "Successfully updated" });
    }
  } catch (error) {
    return next(error);
  }
};

// Update Rule status
export const updateRuleStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const rule = await Role.findByIdAndUpdate(
      id,
      {
        status: !status,
      },
      { new: true }
    );

    res.status(200).json({ rule, message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};

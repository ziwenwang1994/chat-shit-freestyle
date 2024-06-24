import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

export const loginValidator = [
    body("email").notEmpty().trim().isEmail().withMessage("Email is required"),
    body("password")
      .notEmpty()
      .trim()
      .isLength({ min: 6, max: 100 })
      .withMessage("Password should contain at least 6 characters"),
  ];

export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator
];

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) return next();
    res.status(422).json({ errors: errors.array() });
  };
};

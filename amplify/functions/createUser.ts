import Ajv from "ajv";
import UserModel from "../models/user.model";
import { sendEmail } from "../utils/sendgrid";
import {
  VERIFICATION_CODE_LENGTH,
} from "../constants/constants";
import {
  SENDGRID_TEMPLATES,
  STATUS_CODES,
} from "../constants/enums";


const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email'},
    address: { type: 'string' }
  },
  required: ['email', 'address'],
};

const ajv = new Ajv();
const validate: any = ajv.compile(schema);

export const handler = async (event: any) => {
  const body = await event.body;

  const isValidBody = validate(body);
  
  if (!isValidBody) {
    console.log(validate?.errors);
    return { 
      message: validate?.errors[0],
      status: STATUS_CODES.VALIDATION_ERROR 
    };
  }

  // check if user already exists but not verified
  const userExist = await UserModel.findOne({ email: body.email }).lean();

  // if user exist and verified - return success
  if (userExist && userExist.isVerified) {
    return { 
      message: '',
      status: STATUS_CODES.OK,
    };
  }

  // generate code
  const code: string = Math.random().toString().substr(2, VERIFICATION_CODE_LENGTH);

  // if user exist but not verified - update code
  if (userExist) {
    // update code
    await UserModel.findOneAndUpdate(
      { id: userExist.id }, 
      {
        codeVerification: code,
        updatedAt: new Date(),
      },
      { new: true }
    );
    
    // sent code to client through email (for verification, via SendGrid)
    await sendEmail({
      email: body.email,
      data: { code }, 
      templateId: SENDGRID_TEMPLATES.VERIFICATION_CODE
    });
    
    return { status: STATUS_CODES.OK, message: '' };
  }

  // create new user
  const newUser = new UserModel.create({ email: body.email, address: body.address, codeVerification: code });
  await newUser.save();
  
  // sent code to client through email (for verification, via SendGrid)
  await sendEmail({
    email: body.email,
    data: { code }, 
    templateId: SENDGRID_TEMPLATES.VERIFICATION_CODE
  });

  return {
    status: STATUS_CODES.CREATED,
    message: '',
  };
};
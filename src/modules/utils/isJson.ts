import { StatusMessages, Messages } from './enums/message';

export default function isJson(err: any, req: any, res: any, next: any) {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(500).json({
      status: StatusMessages.ERROR,
      message: Messages.NOT_VALID_JSON,
    });
  } else {
    next(err);
  }
}

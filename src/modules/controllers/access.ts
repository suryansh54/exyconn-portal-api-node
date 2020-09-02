// Add this to the top of the file
import roles from '../utils/roles';

const grantAccess = function(action: any, resource: any) {
 return async (req: any, res: any, next: any) => {
  try {
   const permission = roles.can(req.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: 'You don\'t have enough permission to perform this action'
    });
   }
   next();
  } catch (error) {
   next(error);
  }
 };
};

const allowIfLoggedin = async (req: any, res: any, next: any) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user) {
   return res.status(401).json({
    error: 'You need to be logged in to access this route'
   });
  }
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
};

export { grantAccess, allowIfLoggedin };

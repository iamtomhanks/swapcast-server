// Interfaces../../
import { Connection } from 'mysql';
import { Request, Response, Application, NextFunction } from 'express';

// @ts-ignore
import { Requests, DBTables } from 'swapcast-types';

// Modules
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Services
import { getUser } from '../Services/Auth';

module.exports = (app: Application, connection: Connection) => {
  app.post('/api/Signin', (req: Request, res: Response) => {
    console.log('/api/Signin');
    const params = req.body;
  
    getUser(params, connection)
      .then((getUserResponse: DBTables.User) => {
        // username entered doesn't exist
        if(getUserResponse === null) {
          return { status: Requests.RequestStatus.FAILURE };
        } 
        
        return bcrypt.compare(req.body.Password, getUserResponse.password)
          .then((matches: boolean) => {
            if(matches) {
              const token = jwt.sign(
                {
                  userId: getUserResponse.id,
                  username: getUserResponse.username
                },
                'SwapCast_123_$',
                { expiresIn: 129600 }
              );
              return {
                status: Requests.RequestStatus.SUCCESS,
                token,
                payload: {
                  user: getUserResponse,
                }, 
              };
            }
            return { status: Requests.RequestStatus.FAILURE };
          });
  
      })
      .then((returnData) => {
        res.send(returnData);
      });
  });
};
import express from 'express';
import * as userService from '../services/user-service';

export const userRouter = express.Router();

const users = [];

userRouter.get('', (request, response, next) => {
    userService.getAllUsers().then(users => {
       // console.log('request recieved - processing at middleware 2 user-router');
       response.set('content-type', 'application/json');
        response.json(users);
        next();
    }).catch(err => {
       // console.log(err);
        response.sendStatus(500);
    });
});

userRouter.get('/:id', (request, response, next) => {
    const id = +request.params.id;
    userService.getUserById(id).then(user => {
        if(!user)
        {
            response.sendStatus(404);
        }
        else{
            response.json(user);
        }
    })
});

userRouter.post('', (request, response, next) => {

    const user = request.body;

    userService.saveUser(user)
    .then(newUser => {
        response.status(201);
        response.json(newUser);
        next();
    }).catch(err => {
      //  console.log(err);
        response.sendStatus(500);
        next();
    });
});

userRouter.patch('', (request, response, next) => {
    const user = request.body;
    userService.patchUser(user)
    .then(updatedUser => {
        response.json(updatedUser);
    }).catch(err => {
        //console.log(err);
        response.sendStatus(500);
    }).finally(() => {
        next();
    });
});

//starts the app, which begins listening on the port
//app.listen(port, ()=>{
  //  console.log(`app is listening at http://localhost:${port}`);

  // todo delete User

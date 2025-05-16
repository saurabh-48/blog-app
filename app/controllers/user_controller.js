class UserController {

    async login(req, res, next){
        console.log('Hello');
        res.send('Hello World');
    }
}
export default UserController;
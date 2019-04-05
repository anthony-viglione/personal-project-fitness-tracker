const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req,res) => {
        // console.log('hit controller register')
        // console.log(req.body)
        const { email, password } = req.body;
        const { session } = req;

        const db =req.app.get('db');
        let takenEmail = await db.auth.check_email({email});
        takenEmail = +takenEmail[0].count

        if(takenEmail !== 0) {
            return res.sendStatus(409)
        }

        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let user = await db.auth.register({email, password: hash, user_image:`https://robohash.org/${email}.png?set=set4`});
        user = user[0];
        session.user = user;
        res.status(200).send(session.user)
    },

    login: async(req,res) => {
        // console.log('hit login')
        const {email, password} = req.body;
        const {session} = req;

        const db = req.app.get('db')
        let user = await db.auth.login({ email})
        user = user[0]

        if (!user) {
            return res.sendStatus(400)
        }

        let authenticated = bcrypt.compareSync(password, user.password)
        // console.log(authenticated)
        if(authenticated) {
            delete user.password;
            session.user = user;
            // console.log({session})
            res.status(200).send(session.user)
        } else {
            res.sendStatus(401)
        }

    },
    getUser: (req,res) => {
        const {user} = req.session;
        if (user) {
            res.status(200).send(user)
        } else {
            res.sendStatus(401)
        }
    },
    
    logout: (req,res) => {
        console.log('DESTROYED')
        req.session.destroy(()=>{
            res.sendStatus(200) // response must be in the callback to avoid strange bugs
        });
    }, 

    editGoals: async(req,res) => {
        const {email} = req.params;
        const {calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent} = req.body

        const db =req.app.get('db');
        let updatedUser = await db.tracker.update_goals({email, calorieGoal, fatGoalPercent, proteinGoalPercent, carbGoalPercent})
        console.log('changed goals')
        res.status(200).send(updatedUser)
    },

    getGoals: async(req,res) => {
        const{id}=req.session.user;
        const db =req.app.get('db');
        let goals = await db.tracker.get_goals({id})
        if(goals) {
            console.log("got goals")
            res.status(200).send(goals)
        } else {
            res.sendStatus(400)
        }
    },
    
    addFood: async(req,res) => {
        // console.log('hit addFood')
        // console.log(req.body)
        // console.log(req.params)
        const{food, calories, protein, carb, fat} = req.body
        let id = req.params.id.split('d')[1]
        console.log({userId:id})

        const db = req.app.get('db');
        let foods = await db.tracker.add_food({id, food, calories, protein, carb, fat})
        console.log({userFoods:foods})
        res.status(200).send(foods)

    },

    getFoods: async(req,res) => {
        // console.log('controller foods')
        const {id, email} = req.session.user;
        // console.log(id)
        // console.log({session:req.session.user})

        const db = req.app.get('db');
        let foods = await db.tracker.get_foods({id})
        // console.log(foods.length)
        if(foods.length !== 0){
            res.status(200).send(foods)
        }
        else {
            foods.unshift({email, food:"YOU", calories:"MUST", carb:"ADD", protein:"A", fat:"Food", id:0});
            // console.log(foods);
            res.status(200).send(foods)
            // SInce it keeps one item in array, last item doesn't update in app.
        }
    },

    deleteFood: async(req, res) => {
        console.log({params:req.params})
        const {id}=req.params;
        console.log(req.session)
        const {id: user_id} = req.session.user;

        const db = req.app.get('db');
        let remaining = await db.tracker.delete_food(id, user_id);
        console.log({remaining:remaining})
        if(remaining) {
            res.status(200).send(remaining)
        } else {
            res.sendStatus(500)
        }
    }
}
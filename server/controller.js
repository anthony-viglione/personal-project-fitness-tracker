const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req,res) => {console.log(req)},
    login: async(req,res) => {console.log('hit login')},
    getUser: (req,res) => {console.log('hit getUser')},
    logout: (req,res) => {console.log('hit logout')}
}
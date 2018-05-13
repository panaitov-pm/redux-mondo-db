const Validator = require('validator');
const isEmpty = require('../validation/isEmpty');

module.exports = function validateLoginInput(data){
    let errors = {}

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // Email

    if(!Validator.isEmail(data.email)) {
        errors.email = "Email must has correct format"
    }
    if(Validator.isEmpty(data.email)) {
        errors.email="Email field is empty"
    }

    // Password
    if(Validator.isEmpty(data.password)) {
        errors.password="Password field is empty"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
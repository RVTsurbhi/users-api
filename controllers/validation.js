
exports.customValidator = function (body, callback) {
    var checkBlankData = checkBlankValues(body);
    if (checkBlankData.length) {
        callback(400, checkBlankData);
    } else {
        var validate = checkValidations(body);
        if (validate.length) {
            callback(400, validate);
        } else {
            callback(null);
        }
    }
}
function checkBlankValues(obj) {
    var blankArray = [];
    for (key in obj) {
        if (obj[key].required == 1) {
            if (obj[key].value === '') {
                blankArray.push(key + " is empty string");
            } else if (obj[key].value === undefined) {
                blankArray.push(key + " is undefined");
            } else if (obj[key].value === null) {
                blankArray.push(key + " is null");
            } else if (!obj[key].value && obj[key].value != 0) {
                blankArray.push(key + " is not defined");
            } else if (obj[key].is_array && !checkBlankArray(obj[key].value)) {
                blankArray.push(key + " is empty array");
            }
        }
    }
    return blankArray;
}

exports.checkBlankValues = checkBlankValues;

function checkValidations(obj) {
    var err = [];
    for (key in obj) {
        if (obj[key].is_email == 1 && !validateEmail(obj[key].value)) {
            err.push(key + " is not valid email.");
        } else if (obj[key].is_string == 1 && !validateString(obj[key].value)) {
            err.push(key + " is not valid string.");
        } else if (obj[key].is_date == 1 && !validateDate(obj[key].value)) {
            err.push(key + " is not valid date.");
        } else if (obj[key].is_object == 1 && !validateObject(obj[key].value)) {
            err.push(key + " is not valid object.");
        } else if (obj[key].is_device_type == 1 && !validateDeviceType(obj[key].value)) {
            err.push(key + " is not valid device Type.");
        } else if (obj[key].is_array && !validateArray(obj[key].value)) {
            err.push(key + " is not valid array.");
        }
    }
    return err;
}

exports.checkValidations = checkValidations;

function validateEmail(email) {
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email===null || re.test(email)){
        return true;
    }else{
        return false;
    }
}

function validateString(password) {
    if (password===null || typeof password === 'string') {
        return true;
    } else {
        return false;
    }
}

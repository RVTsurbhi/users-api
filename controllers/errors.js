exports.errors = function() {
    console.log(err);
    res.statusCode = 500;
    res.send({
        "error": "internal_server_error",
         "error_description": "error"
    });
};

    

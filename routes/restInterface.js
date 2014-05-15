client = new Client();

// direct way
client.get("http://127.0.0.1:8111/v2/environments/?media=json", function(data, response){
    // parsed response body as js object
    console.log(data);
    // raw response
    console.log(response);
});
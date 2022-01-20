exports.handler = function(context, event, callback) {
  console.log("event!", event);
  console.log("context!", context);
  // Add the NodeJS Helper Library by calling context.getTwilioClient()
  const client = context.getTwilioClient();

  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  // response.setBody("Hello World");
  // callback(null, response);

  // Use the NodeJS Helper Library to make an API call.
  // Note how you are passing the workspace SID using a key from the event parameter.
  client.taskrouter.v1
    .workspaces("WS14e6951ee0baea6f157e84f6aced9b19")
    //.workspaces(event.WorkspaceSid)
    .workers()
    .cumulativeStatistics()
    .fetch()
    .then(data => {
        response.appendHeader('Content-Type', 'application/json');
        response.setBody(data);
        // Return a success response using the callback function.
        callback(null, response);
    })
    .catch(err => {
        response.appendHeader('Content-Type', 'plain/text');
        response.setBody(err.message);
        response.setStatusCode(500);
        // If there's an error, send an error response
        // Keep using the response object for CORS purposes
        callback(null, response);
    });
};
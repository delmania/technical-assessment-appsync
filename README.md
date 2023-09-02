# Technical Assessment Submission
This project is a solution for the technical assessment for Gaggle.  The ask was to "Implement a fully deployable GraphQL API using AWS AppSync can return the Mean, Median and Mode of a series of numbers".

As such, this follow the schema given, with modifications.  

# Prerequisites
This project uses the AWS CDK and Python.  It needs the following:
* Node.js 10.13 or later
* Python 3.6 or later

Assuming these are installed,  `npm install -g aws-cdk`  will install the CDK.  You also need to run `aws configure` to set up your access key, secret, and default region.

Full documentation can be found here:
* [AWS CDK Prerequisites](https://docs.aws.amazon.com/cdk/v2/guide/work-with.html#work-with-prerequisites)
* [Working with the AWS CDK in Python](https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-python.html)

# To Deploy
Assuming all the prerequisites have been fulfilled, running `cdk bootstrap` and `cdk deploy` will deploy the API.  Note that `cdk bootstrap` needs to be run only once.

# Unit Testing
As mentioned, the functional requirements are implemented in Javascript.  As such, unit tests are implemented using Mocha to test, execute `npm i` and `npm test`.  This assumes you have the latest LTS version of node installed.

# Design
A few words on the design.  The documentation for AppSync mentions that VTL will be retired.  Taking that into account, all resolvers are Javascript.  The actual implementation is a pipeline resolver that executes a series of functions that calculate the mean, the median, and the mode individually.  Of note is the median as that array to be sorted.  The AppSync runtime does not allow you to pass in a function to the sort method, and  so invoking Array.sort will cause the elements to be sort lexicographically; i.e. [1,2,10] -> [1,10,2]. To work around this, the median handler invokes a lambda written in Javascript to perform the calculation.

For the mode, if the set is multimodal, it simply returns the first value. 

All functions return 0 is the data set is empty. 

# Testing
The URL the API is located at and the API key needed to authorize are printed to the console after the deployment is finished.  These can be use with any API testing tool, like Postman.  When making requests, the header is x-api-key.  The query is 
`{
    calculate (value:[]) {
        mean,
        median,
        mode
    }
}`
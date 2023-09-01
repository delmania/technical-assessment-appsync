# Technical Assessment Submission

This project is a solution for the technical assessment for Gaggle.  The ask was to "Implement a fully deployable GraphQL API using AWS AppSync can return the Mean, Median and Mode of a series of numbers".

As such, this follow the schema given, with modifications.  

# To Deploy

This project is deploy using the AWS CDK tool.  It is a mixed language solution, with the IaaC portion written in Python, and the actual functional requirements written in Javascript.  As such, deploying this requires using the AWS CDK CLI tool and Python library.  Full details can be found in this article:
* [Working with the AWS CDK in Python|https://docs.aws.amazon.com/cdk/v2/guide/work-with-cdk-python.html]

Assuming all the requirements have been installed and met, the first thing to do is to use ``aws configure`` to fill in your access key, access secret, and default region.  Once that's done, running ``cdk bootstrap`` and ``cdk deploy`` will deploy the stack to AWS (assuming you have the correct permissions; if not, talk to your AWS administrator.)

# Unit Test

As mentioned, the functional requirements are implemented in Javascript.  As such, unit tests are implemented using Mocha to test, execute ``npm i`` and ``npm test``.  This assumes you have the latest LTS version of node installed.

# Design

A few words on the design.  The documentation for AppSync mentions that VTL will be retired.  Taking that into account, all resolvers are Javascript.  The actual implementation is a pipeline resolver that executes a series of functions that calculate the mean, the median, and the mode individually.  Of note is the median.  Calculating the median requires the array to be sorted.  The AppSync runtime does not allow you to pass in a function to the sort method, and  so invoking Array.sort will cause the elements to be sort lexicographically; i.e. [1,2,10] -> [1,10,2]. To work around this, the median handler invokes a lambda written in Javascript to perform the calculation.

For the mode, if the set is multimodal, it simply returns the first value. 

All functions return 0 is the data set is empty. 
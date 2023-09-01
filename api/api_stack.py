from os import path
import builtins
import typing
from constructs import Construct
from aws_cdk import CfnOutput, Duration, Expiration, Stack, aws_appsync as appsync, aws_lambda as lambda_

class ApiStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Set up the paths to files.
        __directory = path.dirname(path.realpath(__file__))
        SCHEMA_FILE = path.join(__directory,'schema.graphql')
        CALC_MEAN_SOURCE = path.join(__directory,'functions', 'calculateMean.js')
        CALC_MEDIAN_SOURCE = path.join(__directory, 'functions','calculateMedian.js')
        CALC_MODE_SOURCE = path.join(__directory, 'functions','calculateMode.js')
        MEDIAN_LAMBDA_SOURCE = path.join(__directory,'calculate_median_lambda')
        QUERY_RESOLVER = path.join(__directory, 'resolvers', 'calculate_resolver.js')        

        # Create the API with no data source since we're not storing anything.
        api = appsync.GraphqlApi(self,
                             'tech-assessment-api',
                             name='Gaggle API',
                             schema=appsync.SchemaFile.from_asset(SCHEMA_FILE),
                             authorization_config = appsync.AuthorizationConfig(
                                 default_authorization=appsync.AuthorizationMode(                                                          
                                authorization_type=appsync.AuthorizationType.API_KEY,                                
                                api_key_config=appsync.ApiKeyConfig(
                                  description='public key for getting data',
                                  expires=Expiration.after(Duration.days(30)),
                                  name='Gaggle API Token')
                                 )
                              ),
                             log_config=appsync.LogConfig(field_log_level=appsync.FieldLogLevel.ALL, exclude_verbose_content=False)
                             )
        
        medianLambda = lambda_.Function(self, 
                                        'calculateMedianLambda',
                                        runtime=lambda_.Runtime.NODEJS_18_X,
                                        handler='main.handler',
                                        code=lambda_.Code.from_asset(MEDIAN_LAMBDA_SOURCE)
                                        )
        none_data_source = api.add_none_data_source("NoDataSource")
        lambda_data_source = api.add_lambda_data_source('CalculateMedianLambda',
                                                        lambda_function=medianLambda,
                                                        description="The lambda to calculate the median")

        # Pipeline functions.
        calculateMeanFunction = appsync.AppsyncFunction(self, 
                                                        'meanFunction',
                                                        name="calculateMean",
                                                        api=api,
                                                        data_source=none_data_source,
                                                        code=appsync.Code.from_asset(CALC_MEAN_SOURCE),
                                                        runtime=appsync.FunctionRuntime.JS_1_0_0
                                                        )
        
        calculateMedianFunction = appsync.AppsyncFunction(self, 
                                                          'medianFunction',
                                                        name ="calculateMedian",
                                                        api=api,
                                                        data_source=lambda_data_source,
                                                        code=appsync.Code.from_asset(CALC_MEDIAN_SOURCE),
                                                        runtime=appsync.FunctionRuntime.JS_1_0_0
                                                        )
        
        calculateModeFunction = appsync.AppsyncFunction(self, 
                                                        'modeFunction',
                                                        name="calculateMode",
                                                        api=api,
                                                        data_source=none_data_source,
                                                        code=appsync.Code.from_asset(CALC_MODE_SOURCE),
                                                        runtime=appsync.FunctionRuntime.JS_1_0_0
                                                        )
        # Make the resolver, the path of execution is:
        # Request template to sort -> calculate mean -> calculate median -> calculate mode -> response template
        query_resolver = appsync.Resolver(self, 'calculatePipeline',
                                          api=api,                                          
                                          field_name="calculate",
                                          type_name="Query",
                                          code=appsync.Code.from_asset(QUERY_RESOLVER),
                                          runtime=appsync.FunctionRuntime.JS_1_0_0,
                                          pipeline_config=[calculateMeanFunction,calculateMedianFunction,calculateModeFunction]                                          
                                          )
        
        CfnOutput(self, "GraphQLAPIURL", value=api.graphql_url);
        CfnOutput(self, "GraphQLAPIKey", value=api.api_key);
    
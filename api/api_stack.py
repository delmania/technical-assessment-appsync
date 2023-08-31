from os import path
import builtins
import typing
from constructs import Construct
from aws_cdk import Environment, IStackSynthesizer, PermissionsBoundary, Stack, aws_appsync as appsync


class ApiStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Set up the paths to files.
        __directory = path.dirname(path.realpath(__file__))
        SCHEMA_FILE = path.join(__directory,'schema.graphql')
        CALC_MEAN_SOURCE = path.join(__directory, 'calculateMean.js')
        CALC_MEDIAN_SOURCE = path.join(__directory, 'calculateMedian.js')
        CALC_MODE_SOURCE = path.join(__directory, 'calculateMode.js')
        RESOLVER_BEFORE_SOURCE = path.join(__directory, 'beforeHandler.vtl')
        RESOLVER_AFTER_SOURCE = path.join(__directory, 'afterHandler.vtl')

        # Create the API with no data source since we're not storing anything.
        api = appsync.GraphqlApi(self,
                             'tech-assessment-api',
                             name='Gaggle API',
                             schema=appsync.SchemaFile.from_asset(SCHEMA_FILE),
                             log_config=appsync.LogConfig(field_log_level=appsync.FieldLogLevel.ALL, exclude_verbose_content=False)
                             )
        none_data_source = api.add_none_data_source("NoDataSource")

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
                                                        data_source=none_data_source,
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
                                          request_mapping_template=appsync.MappingTemplate.from_file(RESOLVER_BEFORE_SOURCE),                                          
                                          pipeline_config=[calculateMeanFunction,calculateMedianFunction,calculateModeFunction],
                                          response_mapping_template=appsync.MappingTemplate.from_file(RESOLVER_AFTER_SOURCE)
                                          )
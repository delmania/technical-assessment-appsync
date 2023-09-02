#!/usr/bin/env python3
import os

import aws_cdk as cdk

from api.api_stack import ApiStack


app = cdk.App()
ApiStack(app, "ApiStack",
         env=cdk.Environment(account=os.getenv(
             'CDK_DEFAULT_ACCOUNT'), region=os.getenv('CDK_DEFAULT_REGION')),
         )

app.synth()

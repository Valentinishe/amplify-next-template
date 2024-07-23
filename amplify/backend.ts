import { defineBackend, defineFunction } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "aws-cdk-lib/aws-apigatewayv2";
import {
  HttpIamAuthorizer,
  HttpUserPoolAuthorizer,
} from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Policy, PolicyStatement } from "aws-cdk-lib/aws-iam";
import {  } from "./functions/users/resource";
import { auth } from "./auth/resource";
import { data } from "./data/resource";




// define functions
export const getUserFunction = defineFunction({
  name: "getUser",
  entry: "./functions/users/getUser.ts",
  timeoutSeconds: 20,
  memoryMB: 512,
});


const backend = defineBackend({
  auth,
  data,
  getUserFunction,
});

// create a new API stack
const apiStack = backend.createStack("HoG-API");

// create a new HTTP API with IAM as default authorizer
const httpApi = new HttpApi(apiStack, "HttpApi", {
  apiName: "myHttpApi",
  corsPreflight: {
    // Modify the CORS settings below to match your specific requirements
    allowMethods: [
      CorsHttpMethod.GET,
      CorsHttpMethod.POST,
      CorsHttpMethod.PUT,
      CorsHttpMethod.DELETE,
    ],
    // Restrict this to domains you trust
    allowOrigins: ["*"],
    // Specify only the headers you need to allow
    allowHeaders: ["*"],
  },
  createDefaultStage: true,
});

// create a IAM authorizer
// const iamAuthorizer = new HttpIamAuthorizer();

// // create a User Pool authorizer
// const userPoolAuthorizer = new HttpUserPoolAuthorizer(
//   "userPoolAuth",
//   backend.auth.resources.userPool,
//   {
//     userPoolClients: [backend.auth.resources.userPoolClient],
//   }
// );






// definde lambdas integration
const getUserLambda = new HttpLambdaIntegration(
  "LambdaIntegration",
  backend.getUserFunction.resources.lambda
);






// added routes to the API
httpApi.addRoutes({
  path: "/users",
  methods: [HttpMethod.GET, HttpMethod.OPTIONS, HttpMethod.HEAD ],
  integration: getUserLambda,
});

// create a new IAM policy to allow Invoke access to the API
const apiPolicy = new Policy(apiStack, "ApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: ["execute-api:Invoke"],
      resources: [
        `${httpApi.arnForExecuteApi("*", "/users")}`,
        `${httpApi.arnForExecuteApi("*", "/users/*")}`,
        // `${httpApi.arnForExecuteApi("*", "/cognito-auth-path")}`,
      ],
    }),
  ],
});

// attach the policy to the authenticated and unauthenticated IAM roles
backend.auth.resources.authenticatedUserIamRole.attachInlinePolicy(apiPolicy);
backend.auth.resources.unauthenticatedUserIamRole.attachInlinePolicy(apiPolicy);

// add outputs to the configuration file
backend.addOutput({
  custom: {
    API: {
      [httpApi.httpApiName!]: {
        endpoint: httpApi.url,
        region: Stack.of(httpApi).region,
        apiName: httpApi.httpApiName,
      },
    },
  },
});

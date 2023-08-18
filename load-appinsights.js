// https://medium.com/microsoftazure/enabling-the-node-js-application-insights-sdk-in-next-js-746762d92507

const path = require('path')
require('dotenv').config({path: path.resolve(process.cwd(), '.env.local')})

let appInsights = require('applicationinsights');
appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectConsole(true, true)
  .setAutoCollectDependencies(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectHeartbeat(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectRequests(true)
  .setAutoDependencyCorrelation(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .setSendLiveMetrics(true)
  .setUseDiskRetryCaching(true);
//appInsights.defaultClient.setAutoPopulateAzureProperties(true);
appInsights.start();
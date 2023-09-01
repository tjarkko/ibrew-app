// https://medium.com/microsoftazure/enabling-the-node-js-application-insights-sdk-in-next-js-746762d92507

const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.local') })

let appInsights = require('applicationinsights')
appInsights
  .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
  .setAutoCollectConsole(true, true)
  .setAutoCollectDependencies(false)
  .setAutoCollectExceptions(true)
  .setAutoCollectHeartbeat(false)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectRequests(true)
  .setAutoDependencyCorrelation(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .setSendLiveMetrics(false)
  .setUseDiskRetryCaching(false)
//appInsights.defaultClient.setAutoPopulateAzureProperties(true);
appInsights.start()

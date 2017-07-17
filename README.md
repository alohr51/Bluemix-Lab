## Bluemix Watson Personality Insights Lab
See what Watson has to say about you!

### Get Started with the lab by following the steps below

1. Create a Watson personality service in your Bluemix Dashboard 
	1. Go [Here](https://console.bluemix.net/catalog/services/personality-insights?env_id=ibm:yp:us-south) and name your Service `MyPersonalityInsights` and click **Create** in the bottom right corner.
	1. Paste the Watson service name `MyPersonalityInsights` in app.js. Replace this text `<your service name here>`
1. Push your app to Bluemix
	1. Download the [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads) to interact with Bluemix from the command line
	1. On your terminal go to your applications directory
	1. login to the US-South Region and select your org and the space your created the Watson service in
		1. `cf api api.ng.bluemix.net`
		1. `cf login`
	1. `cf push` 
	That is it! the manifest.yml will take care of all the extra options. When your app is done the url will show in logs
1. Your application is now up and running in the public cloud!
	1. Go to the Bluemix application URL and write a 100 word bio about your self and click `Ask Watson`!
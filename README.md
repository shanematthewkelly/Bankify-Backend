<img  width="100%"  src="https://i.imgur.com/dmaNP8x.png">

&nbsp;

<h1>Testing Locally</h1>

<p>1. Clone this repository and <code>cd</code> into the project folder</p>

<p>2. Each Lambda function holds an express application, to install the node module dependencies for each, navigate to the following directories and run <code>npm install</code> within both.</p>

<pre><code>amplify/backend/function/Authentication/src</code></pre>

<pre><code>amplify/backend/function/Plaid/src</code></pre>

&nbsp;

<p>3. Within the same terminals, run <code>npm run start</code> for each application to start the local development server at <code>localhost:3000</code></p>
<p><b>Note:</b> Both applications/functions will be trying to connect to the same port at 3000, so you may get an error in one of the terminals. You can either configure the project to run on different ports or test each one individually.</p>

&nbsp;

<h1>Testing In Production</h1>
<p><b>Note:</b> You will need to setup AWS Amplify via the Amplify CLI if you wish to test and deploy this application on the cloud for yourself. You will also require a valid personal AWS account.</p>

<p>1. Initialize a new Amplify project by running <code>amplify init</code></p>

<p>2. You will be asked to configure your environment, follow the steps presented to you in your CLI.</p>

<p>3. The CLI will prompt you to authenticate with AWS using either your IAM <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html"><b>access keys</b></a> or your <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html"><b>AWS Profile.</b></a> This will initialize the project on the cloud. </p>

<p>4. From here you can create routes via the AWS API Gateway by running <code>amplify add api</code> and selecting REST. You will need to create the exact same route names the applications expects e.g. <code>users/register</code>.</p>

<p>5. You can also create lambda functions by running <code>amplify add function</code> and linking them to the specified routes associated with each lambda function. </p>

<p>6. When your changes are completed you can run <code>amplify status</code> to view where changes have been made, and finally run <code>amplify push</code> to migrate your changes to the cloud.</p>

<p>For further assistance refer to the official <a href="https://docs.aws.amazon.com/index.html"><b>AWS Documentation</b></a></p>

&nbsp;

<h1>Developer Details & Contributors</h1>
<p><b>LinkedIn:</b></p>
<ul>
	<li><a href="https://www.linkedin.com/in/shanematthewkelly/"> Shane Kelly - LinkedIn</a></li>
</ul>
<p><b>Email:</b></p>
<ul>
	<li>shane.kelly2408@gmail.com</li>
</ul>

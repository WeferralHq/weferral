
<p align="center">
<a href="#">
<img width="500" heigth="500" src="https://res.cloudinary.com/spotshop/image/upload/v1614472368/weferral/weferral-dashboard_clbi9e.png">
</a>
</p>

___
<p align="center">
<b>Weferral is a referral management & affiliate tracking software to grow your buiness</b>
<p align="center"></p>
</p>

## Overview
Weferral provides all the tools needed to start, manage, and grow your affiliate program. Weferral affiliate management software is simple, powerful and easily customizable based on your needs.

* Note: It's not production ready yet, still a work in progress. So please use with caution. Thanks


## Features
- **Affiliates Reward:** Engage affiliates with just the right reward.
    - **Recurring or lifetime:** Attract top influencers by linking a customer to an affiliate using our lifetime commissions feature.
    - **One-time commissions:** Award one-time commissions(e-commerce).
    - **Monthly commissions:** Award monthly commissions (subscription/SaaS).
    - **Fixed or percentage-based commission** Award Fixed or percentage-based commission.
    
- **Setup you affiliate program:**.
    - **Customize your affiliate portal:** You can easily setup your own affiliate portal by adding your logo, cahnge the colors, text for your affiliate landing page.
    - **Track Automatically:** Our system tracks all of your visitors, leads and sales immediately. Access the information in real-time from your own dashboard.
    - **Affiliate Dashboard:** Wefraal save you time by providing affiliates an always up-to-date view of the status of leads, referrals and commissions.
    - **Email Automation:** Set up emails that are automatically send to affiliates.
    - **RBAC:** Customize roles for staff (coming soon)
    - **Invite Customers:** Your customers can be the best affiliates. Send an invitation to your customer that asks them to join your affiliate program or import a csv list of customers & an invitation will be sent to them automatically.

- **Extensibility:**
    - **Full REST API:** Integrate Weferral with your existing website or application
    - **Webhook:** Automate your workflow with Weferral webhooks
    - **Plugin framework:** Develop plugins to extend the functionality of weferral (coming soon)


**Managed Solution** - (comming soon)

### Demo 
- [Check out the demo](https://weferral-demo.vercel.app/)
Email: demo@example.com
password: demo

### Documation 
- [Documation](https://weferralhq.github.io/weferral-docs/#/) 


## Setup Guide
Get the app running locally in the following way:

### Frontend

```
# Clone the Repo
git clone https://github.com/WeferralHq/weferral.git
cd weferral
npm install
npm start
```
### Backend
```
# Clone the weferral Server Repo
git clone https://github.com/WeferralHq/weferral-api.git
cd weferral-api
npm install 
npm start

then go to http://localhost:4100/setup to setup the database and admin user
```
### Weferral Tracker
Go to https://github.com/Ezehuche/tracker to learn how to use weferral javascript tracker.

### Weferral Server & API 
You checkout the api repo here https://github.com/WeferralHq/weferral-api

### Production
To create a production build type `npm run build:prod`. After the process is complete you can copy the output from the `/dist/` directory. The output files are minified and ready to be used in a production environment.

### Build Customization
You can customize the build to suit your specific needs by adjusting the [Webpack](https://webpack.js.org) configuration files. Those files can be found in the `/build` directory. For more details checkout the documentation of WebPack.



## Built With
- [NodeJS](https://github.com/nodejs/node) &mdash; Our back end API is a Node express app. It responds to requests RESTfully in JSON.
- [React](https://github.com/facebook/react) &mdash; Our front end is a React app that communicates with the Node Express api server.
- [PostgreSQL](http://www.postgresql.org/) &mdash; Our database is Postgres.

## Author
Ezeokeke Uche 
* Email: <ezeokeke.remigius@gmail.com>

* Github: [@ezehuche](https://github.com/ezehuche)

* Twitter: [@ezeokekeuche](https://twitter.com/ezeokekeuche)
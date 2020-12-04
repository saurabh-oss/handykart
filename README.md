# handykart
Web application for an online shop using ReactJS and Microservices based backend with MongoDB NoSql database.

## Technology
- Web application: ReactJS
- Database: MongoDB
- Microservices: Quarkus
- Hosting: RedHat OpenShift containerized platform

## Features
1. Home page with Header, Footer, Main content displaying list of products in simple Bootstrap card view
2. Main navigation menu items containing Home, Register, Login and Cart
3. Product details page displaying product's title, price, description and reviews
4. Cart displaying selected products with unit price, quantity and total price
5. Checkout to display a placed order details page without any payment integration (@TODO)
6. User registration form
7. User login form
8. Data persisted into MongoDB
9. Data getting loaded using Quarkus microservices

## Quickstart with HandyKart project
1. Install NodeJS (latest stable version is preferred)
2. Test installation using commands `node --version` & `npm --version`
3. Clone this project into an empty directory using command `git clone https://github.com/s-a-u-r-a-b-h/handykart.git`
4. Navigate to the project directory using command `cd handykart`
5. Insall all dependencies using the command `npm install` and run the project directly using command `npm start`

A browser window will automatically be opened and you will find the application running on `localhost:3000`.

## Openshift deployment details (with Jenkins)
Create project = handykart
Create Jenkins app from catalog with Jenkins (persistent) template. Change memory to 2Gi and Disable memory intensive administrative monitors: true

Jenkins should be up and running
Click the route URL of jenkins and allow permissions to access the web console.

Create React UI app from GIT repo using Modern Web App template of openshift..
https://github.com/s-a-u-r-a-b-h/handykart.git
on the OC command prompt > use the project & then create app with the following sample command :
oc new-app jboss-eap71-openshift:1.3~https://github.com/redhat-gpte-devopsautomation/openshift-tasks

Expose service (as route) if needed
oc expose svc react-ui


set the automatic deployment triggers to manual as we would be triggering the deployment by Jenkins
oc set triggers dc react-ui --manual

On Jenkins web console, create a new pipeline with the following script (the same is available at https://github.com/s-a-u-r-a-b-h/handykart/blob/main/pipeline_script.txt) :
node {
  stage('Build Tasks') {
    openshift.withCluster() {
      openshift.withProject("handykart") {
        openshift.selector("bc", "react-ui").startBuild("--wait=true")
      }
    }
  }
  stage('Tag Image') {
    openshift.withCluster() {
      openshift.withProject("handykart") {
        openshift.tag("react-ui:latest", "react-ui:${BUILD_NUMBER}")
      }
    }
  }
  stage('Deploy new image') {
    openshift.withCluster() {
      openshift.withProject("handykart") {
        openshift.selector("dc", "react-ui").rollout().latest();
      }
    }
  }
}
Trigger the jenkins pipeline build and it will deployme the application

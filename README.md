# Timetracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

We upgraded this from 6.0.8 tby installing 7 and then running
(npm i -g pnpm)
pnpm install --save @angular/material @angular/cdk @angular/animations
pnpm install --save hammerjs
pnpm install @angular/flex-layout --save
pnpm install @ngrx/store
pnpm install firebase @angular/fire --save
pnpm install --save moment

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Model

companies/cid also use for agents
  name
  email (groupEmail)
  address
  website
  phone
  users (i.e. people working with company)
      uid, name, email, .
  employees 
      uid, name, email

  roles: crud , canApproveTimeSheets/ canApproveInvoices / canIssuePayment/ canAddCompanyUsers

users/{uid}
  email, Roles, 
staticData/
           holidays
           roles
               ReadOnly/ GlobalAdmin
           {uid}/
timesheets/{uid}/
invoices/{uid}

User
  Wants to see stuff to do .. Create Timesheet
                              Submit Timesheet
                              Create invoice
                              Submit Invoice
                              Complete Ros
                              


Admin User
 Wants to see stuff to  ...    Approve Submitted timesheets
                               Process Submitted Invoices

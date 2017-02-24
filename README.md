# Coding Challenge (Front End)

## Expectations

1. This project should not take more than 6-8 hours to complete.
2. Fewer well built, well considered features are better than many features that do not work properly.
3. Tests are encouraged, but not required.
4. It's OK to over-achieve, but consider the implications of #2. It may hurt you rather than help.
5. **The app should run locally with a dev webserver.**
    - Update the `start` command within `package.json` with your app start command
    - Update this readme with any installation instructions needed to get your app running.
6. The app does **NOT** need to persist data.
    - You can leverage LocalStorage if you like, but this is not required of you.
7. **You should treat the `data/*.json` as if they were from an API.** 
    - That means you should fetch them via an AJAX request to use within your app.
8. You can use whichever JS/Template/CSS frameworks or preprocessors you see fit to complete this project.
    - Candidates that choose to use the technologies discussed in the interview process 
      will be given extra consideration, and so it is very highly recommended that you demonstrate your skills using them. 
9. The app should be built on a single `html` page and not refresh the browser between view state changes.
10. You can create as many folders as you see fit and organize the app in any way you think is best.

## The Project

You'll be building a mini app that shows a single Pushbot process and all of it's tasks.

In this project folder is a `data` folder. It has 3 pieces of data you'll need to complete this objective. 
- **Process**  
    A process is like the subject of a series of tasks. It is the parent of a collection of *steps*. 
- **Steps**  
    Steps always belong to a process. They are the individual tasks that are assigned to people when a 
    process is started. They can be assigned to _many users_ at once. They can also require other steps to be completed before they are started. Sometimes, a step can be started based on _conditions_ of other steps.
- **Users**  
    Self-explanatory. These users will be the people on the team that can be assigned to steps, or own a process.


## Objectives

**Create a page that displays the Process details, and the steps in that process.**

See the provided screen shots within the `DESIGN_ASSETS` folder to help guide you. There are also some images you can use in your app to help along the design if you like. *It's not required that you try to implement this design exactly.* This is just meant as a visual guide to how to organize the data.

### **IMPORTANT NOTES**

Clearly there are some implied features shown in these screenshots you will not be able to display or build in the given time. As long as you include the functionality goals below, you can freely omit other parts of this layout that would "do nothing" in your app. 

You are also free to change the UX and layout of how the Step List, Process Details, and Step details are displayed if you like, or you can follow the design.

Also, note the naming differences between the design and the data. Most notably, a "Process" is shown as a "Template". Either is fine in your display.

## Functionality Goals

Your project MUST satisfy all of the below requirements. Anything else is "bonus".

- You should be able to view a **Process**'s:
    * Display Name
    * Description
    * Owner/Creator
    * Category
    * Total Number of Steps

- You should be able to edit a **Process**'s:
    * Display Name
    * Description

- You should be able to view all the **Steps** in the process in a LIST VIEW. It should include:
    * The Step Name
    * The Step Number
    * Whether the Step is assigned to someone (blank/nothing if not)
    * A Steps' Dependencies

- When you click on a Step, you should see the Step details. They should include:
    * Display Name
    * Description
    * Dependencies (view only)
    * Conditions (view only)
    * Fields (view only)
    * **User Assigned List**

- You should be able to edit a **Step**'s:
    * Display Name
    * Description
    * Assigned Users (many or none)




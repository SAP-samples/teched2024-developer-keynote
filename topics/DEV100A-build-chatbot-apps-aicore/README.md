# Build a chatbot with SAP Build Apps and SAP AI Core

## Video Tutorial

[![Chatbot Development made easy with SAP AI Core and Build Apps](https://img.youtube.com/vi/mE7nHx9XHAY/0.jpg)](https://www.youtube.com/watch?v=mE7nHx9XHAY)


## Pre-steps

1. Create a BTP sub account in Free Tier (US East Region) Account(or if you have a commercial BTP Account use that account). You may follow the steps here to create the sub account https://developers.sap.com/tutorials/btp-free-tier-account..html.
2. Set up SAP Build Apps via booster, refer to this tutorial - https://developers.sap.com/tutorials/build-apps-trial-booster..html.
3. Set up an AI Core instance and choose **Extended** Service Plan to get the Generative AI hub capabilities. Use the below documentation to setup the AI Core instance.
   
    Reference links
    - https://developers.sap.com/tutorials/ai-core-launchpad-provisioning.html
    - https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/create-service-instance

4. Create a service key and download it as shown here https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/create-service-key. You will need the service key credentials to connect to AI Core from the AI Launchpad as well as to create a BTP destination.
   
5. You would need a client to access SAP AI Core runtime, and here we use AI Launchpad as the client to configure the deployment. Use the below tutorials to setup the AI Launchpad.

    Reference links
    - https://developers.sap.com/tutorials/ai-core-setup.html
    - https://help.sap.com/docs/ai-launchpad/sap-ai-launchpad/generative-ai-hub

6. Assign relevant role collections to your user from Security > Users in the BTP cockpit as shown below. If you are don’t have apps (like SAP AI Core Administration and ML Operations) on the navigations pane of the AI Launchpad, it could be due to missing the required role rollections.
   
    ![Role Collections](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100A-build-chatbot-apps-aicore/images/user-role-collections-ai-core-launchpad.png)

7. Create an AI API connection with the details from SAP AI Core service key. Select **default** as Resource Group.
    
8. Create a Configuration and Deployment for the AI model.
   
    <ol type="a">
        <li>Check foundation model is available under scenarios(will appear only if **Extended** Service Plan is chosen while creation of AI Core instance). The foundation model is pre-configured by SAP. </li>
        <li>You could also create your own scenarios to train custom machine learning models or to serve your models(ie. deploy your model on AI core).</li>
        <li>Create a configuration as shown here
        https://developers.sap.com/tutorials/ai-core-generative-ai.html#cb63430f-b89e-4165-b1b3-13d65c84c2e2</li>
        <li>Create a deployment as shown here https://developers.sap.com/tutorials/ai-core-generative-ai.html#9b3e5d79-f6b5-47e0-a623-a22be9d9648f</li>
        <li>Get the deploymentUrl and this deployment url can be used to query the AI model. The current status of the deployment should be running. Note down the deployment url since you will need it while configuring the data entity from SAP Build Apps</li>
    </ol>

    ![Deployment status running](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100A-build-chatbot-apps-aicore/images/deployment-status-running.png)


## Set up a destination in the BTP Cockpit for AI Core

 1. Login to SAP BTP Account and enter the sub account.
 2. Under Connectivity > Destinations, set up a new destination(for eg: **ai-core**).
 3. Get the SAP AI Core keys from **Instances and Subscriptions** tab > **Instances** > **1 key**. 

  ![AI Core instance key ](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100A-build-chatbot-apps-aicore/images/servicekey-ai-core-instance.png)

 A sample given below for reference.
   
    ```
        {
            "clientid": "ss-2222-aaa-4444-888-8555!bbb|aicore!bbb",
            "appname": "2222-aaa-4444-888-8555!bbb|aicore!bbb",
            "identityzone": "tutorial",
            "identityzoneid": "11111-dddd-444-888-888888",
            "clientsecret": "qwertyuiop",
            "serviceurls": {
            "AI_API_URL": "https://api.ai.prod.xy.aws.ml.hana.ondemand.com/v2"
            },
            "url": "https://tutorial.authentication.us10.hana.ondemand.com"
        }
    ```

 5. Use the **AI_API_URL** from the service key in the **URL** field for eg: https://api.ai.prod.xy.aws.ml.hana.ondemand.com/v2. Please ensure you add the suffix **/v2** at the end of your URL as current SAP AI Core endpoint version is v2.
 6. Use the **url** field from the service key for the **Token Service URL** and append **/oauth/token** to the url in the destination configuration.
 7. Add additional properties shown below
    -  **AppgyverEnabled** to true
    -  **HTML5.DynamicDestination** to true
    -  **URL.headers.AI-Resource-Group** to default
    -  **URL.headers.Content-Type** to application/json
 8. Refer this sample to create the destination https://github.com/SAP-samples/azure-openai-aicore-cap-api/blob/main/documentation/02-cap-api/03-attach-aicore.md


## Steps for the creation of Chatbot in SAP Build Apps

 1. Login to SAP Build Apps Lobby.
 2. Create a new Build Apps Project and provide the project name as **SAP Custom Chatbot**.
 3. From the Data tab, create a data entity with name as **SAP_AI** and choose destination as **ai-core**(ie. use the same name used to create a destination in the previous step of destination configuration from the dropdown).
 4. Add a Resource Schema with **messages** as a list of objects with **role** and **content** as the properties.
   
    ![Resource schema messages](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100A-build-chatbot-apps-aicore/images/dataentity-input-format.png)

 5. Enable the **Create** method and from the Config tab, provide relative path of the deployment url  **/inference/deployments/abcdedfgh/** as a static text. Append **chat/completions?api-version=2024-06-01** to it and use **POST** method.
 6. From the Test tab, provide values for **role** as **user** and **content** as **What is SAP BTP?**, then click **Run test**, once you get **200 OK**, click **Autodetect schema from response** and then **Save data entity**.
 7.  Go to the UI Canvas, switch to **Variables** tab.
 8.  Create an app variable **history** as a list of objects with **role** and **content** as properties with text as the data type and remove the **id** field.
 9.  Create a page variable **input** with type as text.
 10. Create a data variable from the data entity **SAP_AI** and leave the defaults selected.
 11. Switch to the UI Canvas > **View** tab.
 12. Delete the default elements on the page and drag and drop a **Large image list item component** on to the canvas.
 13. Select the **Large image list item component** and from the properties pane, click on the **Component Editor Icon**.
   
![Component Editor Icon](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100A-build-chatbot-apps-aicore/images/component-editor-icon.png)

 15. Delete the **Image** from the **Large image list item component** and drag and drop an **Icon** in its place.
 16. Add an **input** field on the canvas below the **Large image list item**  and remove the label from the properties panel.
 17. Add a **button** field under the **Large image list item** component. Change button field Label to **Send** in the **properties** tab.
 18. Select the **Large image list item** component on the canvas and bind the **Repeat With** to App variable -> **history** and **title** and **description** fields to **role** and **content** respectively.
 19. Bind the input field to the page variable **input**.
 20. Open the **logic canvas** by choosing the button field on the canvas and clicking the link at the bottom.
 21. On component tap of the button, set the app variable history to the page variable input using the WITH_ITEM formula.  
   
        ```
            WITH_ITEM(appVars.history, { role: "user", content: pageVars.input })
        ```
Due to the above formula, the user input stored in the pageVars.input is appended to the history variable and the user input is reflected on the user interface due to the history variable already bound to the Large image list item.

 1.  Add a create record flow function, map the resource name to **SAP_AI** and record field to formula
   
        ```
            {"messages": appVars.history }
        ```

On button tap, since we append the user input to the history variable and later after getting the AI response, append the role and content from the response to the history variable, the entire chat history is sent to the generative AI hub via the **Create Record** function. Since the generative AI hub has the context, it will respond with context relevant answers.

 23.  After the success of **Create Record** flow function, set the app variable history to the role and content from the Generative AI Hub response using the formula below. 

   
        ```
            WITH_ITEM(appVars.history, { role: outputs["Create record"].response.choices[0].message.role, content: outputs["Create record"].response.choices[0].message.content })
        ```

 The role and content from the backend response is fetched and appended to the app variable **history** using the **WITH_ITEM** formula and since the history variable is bound to the large image list item, the response now will reflect on the UI.

 24. Connect a page variable, map the **Variable name** to input(page variable). Set the **Assigned value** of the input to a blank space to reset the input field after the response is returned from the backend.

 25.  At the end of the setting up of the logic, it should appear like so
   
![Logic canvas](https://github.com/SAP-samples/teched2024-developer-keynote/blob/main/topics/DEV100A-build-chatbot-apps-aicore/images/logic-canvas-button-logic.png)
    
 26.  Launch the App to Preview and test.

## Further Styling of the User Interface

1. Select the **Page Layout** component from the **Tree** view and from the **Style** tab, change the background color to the color of your choice. The background color chosen in this example is #36454F, the hex code for charcoal black. A custom color can be chosen by pasting the hex code in the NEW PALETTE.

2. To change the icon to appear visually different for user vs bot, select the **Large image list item** on the canvas and click on the **component template editor** icon.
   
3. Select on the icon on the canvas and from the properties tab, under icon -> formula, enter the formula as
   
   ```
    IF(repeated.current.role == "user", "user", "android")
   ```

   This formula shows the **user** icon, if the current role is user and **android** icon if the current role is assistant.
 
4. To change the background of the row color to appear visually different for user vs bot, click on the **Large image list item**.
   
5.  Go to the Style tab and edit the Style class, Select the Background color button and choose **NEW PALETTE** on the menu and on the Formula tab, enter the below formula

    ```
        IF(repeated.current.role == "user", "#F1F1F2", "#F6FFFF")
    ```

    This formula shows light grey color if the current role is user and light green color if the current role is assistant.

6. To change the border corners to have a radius, while being on the same Style tab, Scroll to the SHAPE -> Corner radius and choose the type of rounding as required.
   
7. Select "NEW STYLE" button on top and give a name so as to preserve these styles as a new Style class
   
9. Launch the App to Preview and test.


## Reference links

1. Can we connect to the Generative AI Hub with clients other than AI Launchpad?
   - Yes. you can use Postman, Python SDK, SAP AI Core Toolkit Extension in VS Code, AI Core SDK etc. Different options shown here in different tabs https://developers.sap.com/tutorials/ai-core-setup.html.
2. Any reference links that explains the basics of Generative AI Hub,  Large Language Models, SAP AI Core, Launch pad etc?
   - Video by Nora: https://www.youtube.com/watch?v=MEJJnzNjGKE&list=PL6RpkC85SLQCDxe58RfZaLCcPqcgwTIhj&index=11&ab_channel=SAPDevelopers		
3. How to use custom machine learning models instead of the foundation models provided by SAP?
   - Video by Dhrub: https://www.youtube.com/live/h3Xs862M-RU?si=gfAzKDN-RpYVr2xa
   - Related tutorial: https://developers.sap.com/tutorials/ai-core-vs-code-toolkit.html
4. Difference between Joule and AI foundation
   - Blog post by Raja Gupta : https://community.sap.com/t5/technology-blogs-by-sap/generative-ai-with-sap-part-2-components-of-sap-business-ai/ba-p/13792752

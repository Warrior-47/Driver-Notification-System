# Driver-Notification-System

A notification service that sends a message according to the completion rate of the last 100 rides up to yesterday. Requires the driver ID as input.

This service is for ride sharing apps such as Uber, PATHAO, etc. The purpose of this project is to increase driver ride completion rate. Thus, improving rider service quality.

The core purpose of this project is to help the companies provide standard service by choosing skilled and responsible human resources who represent their company on the field and can ensure a quality service. Using this project, companies can send messages to all the riders based on their completion rate. In this way, company can monitor their rider's active participation in the field and can provide them feedback through messages so that they can improve their service. Moreover, through this service, Admins can also monitor the performance of the riders from the very begining of their joining day.

## Getting Started
To clone the repository, go to the directory you want to clone the repository into from command line and enter:
```git
git clone https://github.com/Warrior-47/Driver-Notification-System.git
```
Then, go to the project directory (where package.json exists) and execute:
```
npm install --save
```
Now, to start the server:
```
npm start
```
<br/>
<b>Note: A MySql server must be running for the project to work</b>

## Details
#### Routes
* ```127.0.0.1/register``` : Method = POST
* ```127.0.0.1/place_order``` : Method = POST
* ```127.0.0.1/admin``` : Method = POST
* ```127.0.0.1/driver/:driver_id?token=[insert auth token here]``` : Method = GET
* ```127.0.0.1/notify?driver_id=[insert id here]``` : Method = GET

#### 127.0.0.1/register
Takes a JSON object containing rider's information like,
```javascript
{
	"name": "[Rider's name]",
	"nid_number": "[Rider's NID number]",
	"phone": "[Rider's phone number]",
	"vehicle_id": "[Rider's vehicle ID]"
}
```
and inserts the rider's information into the database. Returns a success message as a JSON object if successfully registered.

#### 127.0.0.1/place_order
Takes a JSON object containing order information like,
```javascript
{
	"order_id": "[Order ID]",
	"driver_id": "[Rider's ID who accepted the order]",
	"status": "[Status of the ride, '1' for COMPLETED and '0' for CANCELLED]"
}
```
and inserts the order information into the database. Returns a success message as a JSON object if successfully inserted.

#### 127.0.0.1/admin
Takes a JSON object containing admin login information like,
```javascript
{
	"username": "[admin username]",
	"password": "[admin password]"
}
```
and logs in the user as admin. Returns a JSON object that contains a authorization token if successfully registered.

>Default Username: admin
Default Password: asd

#### 127.0.0.1/driver/:driver_id?token=[insert auth token here]
Takes a rider's ID as parameter and a authorization token as query and fetch the corresponding rider's information. Information returned as a JSON object like,
```javascript
{
	"driver_id": "[ID]",
	"name": "[Name]",
	"nid_number": "[NID Number]",
	"phone": "[Phone Number]",
	"vehicle_id": "[Vehicle ID]",
	"rides_cancelled": [Rides Cancelled],
	"rides_completed": [Rides Completed],
	"total_rides": [Total Rides]
}
```
Requires admin token to fetch data. Without it, an error message is shown. Also, returns an error message if rider ID is invalid and not in the database.
>Default Authorization token: dummy
#### 127.0.0.1/notify?driver_id=[insert id here]
Takes a rider's ID as a query, then calculates completion rate and returns a message corresponding to the completion rate. Example:
```javascript
{
    "Completion_rate": 0.71,
    "Message": "Please complete more to get more requests."
}
```
Also returns an error message if rider ID is invalid and not in the database.


## Current Status

#### Features:
* New riders can register through verification using NID number and vehicle ID
* Database update when new orders are placed
* Calculates completion rate and sends a notification message

 #### Summary:
 From the given problem, the achivement of our project is that it can verify the data before storing and provide a error message for invalid inputs or missing rider ID. It can provide a notification message to our riders corresponding to their completion rate. Only admin can access a rider's information.

#### Risk:
* Missing Authorization system

#### Progress:
All the tasks, given in the problem are done. But some of the new features will definitely provide a better experince to our riders. Our future plan is to implement those features.

## Bugs
So far there is no bug we have found. In future, some problem may arise because of the release of the latest version but hopefully that can be resolved with a little bit of modification.

## Future Plan
* Create a front-end using React js to complete the client-server architecture to make it more attractive and user friendly 
*  The front end will notify the riders at a fixed interval using the notification service
* An Authorization system will be added to make sure that only admins can access a rider's information
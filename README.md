# VRS An OpenSource Virtual Reality 3D Streaming Station

Using Google Cardboard, this project let you see another place in Real Time.

Demo [here](https://www.youtube.com/watch?v=HG2e9lBOV7o) 

This project was inspired by John Choi @ Instructables, BUT the software and the architecture that was provided is not that real time ,system limited (working only in windows) and properitary software that you can not hack into.

So i wrote another code : 

1. the Streaming server `/StreamingServer` that uses CVLC and HTTP MJPEG.

2. The Position Server `/motionServer` that grabes REST Requests from the Phone Gyroscope and Send them to the Arduino Through Serial. Technologies used : Python, Tornado and PySerial.

3. VR ready Mobile App `/mobileApp` , made by Ionic so it can be used on Iphone or Android, that consume the two Streams and send the Gyroscope data to the WebServer Created by `/motionServer`

4. Arduino Code `/Arduino` to move the Servos to the desired place 

This code works on any plateform (Linux, Windows and Mac) and changed the architecture used for better performance. Although i didn't test it in an embedded device (Like the Raspberry Pi) , but this should work.

// VRS
// https://github.com/volkovmqx/VRS


#include <Servo.h> 
 
Servo z;
Servo servox;
Servo y;
int pos = 0;
int posx = 0;
int posy = 0;
int posz = 0;

int code = 0;
int axe = 0;
void setup()  
{ 
  Serial.begin(9600);
  z.attach(9);
  z.write(90);
  servox.attach(10);
  servox.write(90);
  y.attach(3);
  y.write(10);
} 
 
 
void loop() 
{ 
  if (Serial.available() > 0) {
                // read the incoming byte:
                
                code = Serial.parseInt();

               
                Serial.println(code);
                if(code==0) {
                  return;
                }
                else if(code<200) {
                    Serial.print(" Ok Z ");
                    posz = z.read() + code;
                    //Serial.println("Z"+pos);
                      z.write(posz);
                    delay(1);
                  }
                  else if(code>=200 && code<600) {
                    Serial.print(" Ok X ");
                    posx = servox.read() - (code-400);
                    //Serial.println("X"+pos);
                      servox.write(posx);
                    delay(1);
                  }
                  else if(code>=600 && code<1000) {
                    Serial.print(" Ok Y ");
                    posy = y.read() - (code-800);
                    //Serial.println("Y"+pos);
                    if(posy>0 && posy<140)
                      y.write(posy);
                    delay(1);
                  }                
                //reset function
                else if (code == 1001) {
                  z.write(90);
                  servox.write(90);
                  y.write(10);
                }
                else if(code == 1002) {
                  Serial.print("OK test");
                  for(pos = 0; pos < 180; pos += 1) 
                    {                     
                    Serial.print("OK X");
                      servox.write(pos); 
                      delay(15);
                    }
                    delay(100); 
                    for(pos = 180; pos>=1; pos-=1) 
                    {         
                      servox.write(pos);             
                      delay(15);                       
                    }delay(100);  
                    for(pos = 0; pos < 140; pos += 1)  
                    {                    
                      y.write(pos); 
                      delay(15);
                    }delay(100); 
                    for(pos = 140; pos>=1; pos-=1) 
                    {         
                      y.write(pos);        
                      delay(15);                    
                    }delay(100); 
                    for(pos = 10; pos < 150; pos += 1) 
                    {                                  
                      z.write(pos); 
                      delay(15);
                    }delay(100); 
                    for(pos = 150; pos>=10; pos-=1) 
                    {         
                      z.write(pos);
                      delay(15);             
                    }
                }
                  
                
        }
        
  
} 

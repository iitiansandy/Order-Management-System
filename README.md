# Order Management System

This simple order management application with the below requirements : </br>
● Creation of Customers </br>
● Customers can create orders. For simplicity, once an order is created, thats final.
There is no order status like created, payment done, completed etc. It is
assumed that customer has already made the payment while creating the order. </br>
● Customers are categorized as regular, gold, platinum </br>
● By default, a customer is regular. </br>
&nbsp;&nbsp;&nbsp;○ Customer is promoted to gold when he has placed 10 orders </br>
&nbsp;&nbsp;&nbsp;○ Customer is promoted to platinum when he has placed 20 orders </br>
● Gold = 10% discount, platinum = 20% discount </br>
● When a customer creates an order, if he is a gold customer, automatically 10%
discount is applied on the order. 20% for platinum customers. </br>
● Since it is assumed that customer has already made the full payment during
creation of the order, this discount information has to be kept safe by the
application. We need to keep track of how much discount is given to which
customer and for which order, so that customers can claim money back later. </br>
● It is not mandatory to implement any other entities which are not mentioned here,
like products or payments etc. </br>
<h3> Hints </h3> </br>
● Identify the entities </br>
● Think of the REST APIs needed. </br>
● Identify things which can be done asynchronuosly </br>
<h3> Expectations </h3> </br>
● Clean, standard REST APIs </br> 
● Well defined entities. You can use any database of your choice </br>
● Junit test cases </br>
<h3> Nice to have </h3> </br>
● Cron job to send emails to customer when they are approaching the
gold/platinum barriers. For e.g., email to customer when a customer has 9 orders </br>
<strong>:</strong> "You have placed 9 orders with us. Buy one more stuff and you will be
promoted to Gold customer and enjoy 10% discounts!" </br>
You dont need to actually send the emails. It can be a dummy method like this : </br>
void sendMail() { </br>
System.out.println("Sent mail to customer"); </br>
}

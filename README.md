# GoHome2.0
本项目名为归宿，是基于Vue和SpringBoot框架开发的Web端应用。项目不仅能给使用者提供民宿使用的便捷服务，同时也能够在使用过程中获得较好的体验，真正获得一种“归宿”的感觉。此外，本项目具有界面美观、使用简单、功能全面等特点，同时也集聚了现代化网页以及民宿应用的特色设计风格等。

## 课程项目
本项目是JavaEE课程和软件工程课程项目的前端。

# 1 Project Preview

​	The name of the project is **GoHome**, which is a web application developed by **Vue** and **Spring Cloud** framework. 

​	The project can not only provide users with convenient services for home stay, but also get a better experience in the use process and really get a feeling of *home*. In addition, the project has the characteristics of beautiful interface, simple use and comprehensive functions. At the same time, it also gathers the characteristic design style of modern web pages and home-stay applications(Of course, that's what I think :)

​	Here is the member information of our group:

| Full Name    | Matriculation number | 
| ------------ | -------------------- | 
| Mingjie Wang | 1851055              | 
| Zhengyi Zhuo | 1850384 |
| Liyou Wang   | 1851231              |
| Qiao Liang   | 1853572              | 
| Letian Li    | 1950849              | 


# 2 System Functionalities

​	We have achievd system functionalities as above:

- Login Service
  - Login & Logout(With sa-token)
  - Register
  - Verify Code
  - SMS message code
- Personal Information Service
  - Customer Information
  - Host Information
  - Collection of stays
- Stay Information Service
  - Create / Delete a stay
  - View a stay
  - Stay map(With Gaude Map)
  - Nearby place
- Order Service
  - Create / Search an order
  - Add comment for Customer / Host
  - Report an order
- Trade Service
  - From create an order to pay
  - Update order after paying
- Sale Service
  - Coupon
- Payment Service
  - Pay an order(With Alipay)
  - Refund
  - Recall after paying(With Redis)
- Post Service
  - Post Square
  - Create / Comment a post / comment (Support For Markdown Syntax)
  - Share a post to QQ / Wechat / ...
  - Word cloud of post
  - Tag filtering
  - Associated with stays
  - Report a post!
- Statistics Service
  - The most popular / cheapest / ... stays
  - Stay sale data for host
- Admin Service
  - Delete reported stays / posts / ...
  - Arrange customers / hosts
  - Review stay

<div style="page-break-after: always;"></div>

# 3 User Manual and System Deployment

## 3.1 User manual

- Overview

  <img src='https://pic.imgdb.cn/item/61c173682ab3f51d9170f2eb.jpg'>

- Login Service

  - Login & Logout(With sa-token)

    <img src='https://pic.imgdb.cn/item/61c167da2ab3f51d91693b32.jpg'>

  - Register

    ![image-20211221133859973](https://pic.imgdb.cn/item/61c168782ab3f51d9169682e.jpg)

  - Verify Code

    ![image-20211221134222017](https://pic.imgdb.cn/item/61c169452ab3f51d9169a325.jpg)

  - SMS message code

    ![image-20211221134121029](https://pic.imgdb.cn/item/61c169052ab3f51d91699361.jpg)

- Personal Information Service

  - Customer Information

    ![image-20211221134724198](https://pic.imgdb.cn/item/61c16b332ab3f51d916a56cb.jpg)

  - Collection of stays

    ![](https://pic.imgdb.cn/item/61c16dac2ab3f51d916b3ac4.jpg)

- Stay Information Service

  - Create / Delete a stay

    

    ![](https://pic.imgdb.cn/item/61c16f282ab3f51d916ca9c3.jpg)

    

  - View a stay

    ![](https://pic.imgdb.cn/item/61c1716c2ab3f51d916f357b.jpg)

  - Stay map(With Gaude Map)

    ![](https://pic.imgdb.cn/item/61c1772a2ab3f51d9173bc31.jpg)

- Order Service

  - Create / Search an order

    ![](https://pic.imgdb.cn/item/61c173cf2ab3f51d91714826.jpg)

    

  - Add comment for Customer / Host

    ![](https://pic.imgdb.cn/item/61c177862ab3f51d9173fe61.jpg)

    ![](https://pic.imgdb.cn/item/61c17a712ab3f51d9175dd9d.jpg)

    ![](https://pic.imgdb.cn/item/61c17af62ab3f51d917627e0.jpg)

  - Report an order

    ![](https://pic.imgdb.cn/item/61c17c952ab3f51d917744e8.jpg)

- Trade Service

  - From create an order to pay

    ![](https://pic.imgdb.cn/item/61c18ab32ab3f51d917fc9dc.jpg)

  - Update order after paying

    ![](https://pic.imgdb.cn/item/61c174d62ab3f51d91721487.jpg)

- Sale Service

  - Coupon

    

- Payment Service

  - Pay an order(With Alipay)

    ![](https://pic.imgdb.cn/item/61c1740b2ab3f51d917175e1.jpg)

  - Refund

    ![](https://pic.imgdb.cn/item/61c186a72ab3f51d917d6fa0.jpg)

  - Recall after paying(With Redis)

    ![](https://pic.imgdb.cn/item/61c183662ab3f51d917b6447.jpg)

- Post Service

  - Post Square

    ![](https://pic.imgdb.cn/item/61c18b8e2ab3f51d918041d3.jpg)

    ![](https://pic.imgdb.cn/item/61c18d5a2ab3f51d91814514.jpg)

  - Create / Comment a post / comment (Support For Markdown Syntax)

    ![](https://pic.imgdb.cn/item/61c18c912ab3f51d9180c4c8.jpg)

    

    ![](https://pic.imgdb.cn/item/61c18d992ab3f51d918162be.jpg)

  - Share a post to QQ / Wechat / ...

    ![](https://pic.imgdb.cn/item/61c18cf22ab3f51d9180ffc2.jpg)

  - Word cloud of post

    ![](https://pic.imgdb.cn/item/61c18e042ab3f51d918194f3.jpg)

  - Tag filtering

    ![](https://pic.imgdb.cn/item/61c18e1f2ab3f51d9181a5d8.jpg)

  - Associated with stays

    ![](https://pic.imgdb.cn/item/61c18cbc2ab3f51d9180e13b.jpg)

  - Report a post

    ![](https://pic.imgdb.cn/item/61c18e722ab3f51d9181d249.jpg)

- Statistics Service

  - The most popular / cheapest / ... stays

    ![](https://pic.imgdb.cn/item/61c18f202ab3f51d91823454.jpg)

  - Stay sale data for host

    ![](https://pic.imgdb.cn/item/61c18f442ab3f51d9182464e.jpg)

- Admin Service

  - Login

    ![](https://pic.imgdb.cn/item/61c1885f2ab3f51d917e66e6.jpg)

  - Delete reported stays / posts / ...

    ![](https://pic.imgdb.cn/item/61c188a72ab3f51d917e8efd.jpg)

  - Arrange customers / hosts

    ![](https://pic.imgdb.cn/item/61c188ce2ab3f51d917ea67e.jpg)

  - Review stay

    ![](https://pic.imgdb.cn/item/61c1888f2ab3f51d917e80df.jpg)

<div style="page-break-after: always;"></div>

## 3.2 System deployment

​	For front-end, we use instruction ***npm run build***  to make a html file, and put it on the Alibaba cloud server simply. After that, we map it to port 80 of the server through nginx. You can visit it here: 	

​                                                  http://8.131.225.65/

​	For back-end, we package different services into jar packages. After that, we deploy eruka and multiple microservices on different cloud servers to reduce the pressure on a single server. Here, eruka plays the role of API forwarding.

<div style="page-break-after: always;"></div>

# 4 System Architecture

<img src='https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/Java.png'>

On the whole, this system adopts a **microservice architecture**. 

First, the front-end interactive interface is deployed on the server through nginx, and the service call in the interactive process is completed by sending a service request to the API gateway.

The back-end uses eureka to realize service registration and discovery, and realizes the presentation of the overall external function interface of the service system by registering the gateway in eureka, and realizes the forwarding and call return of the service.

In this system, the microservices to be registered are divided into basic services and business logic services. The basic services are applied to a wide range of business logic services to provide the necessary underlying support. The business logic microservices realize the discovery and invocation of services through eureka. Combine the necessary middleware support to complete the corresponding functional logic.

The microservice completes the ORM mapping with the database through Hibernate, and completes the access and operation of the database through JPA.

<div style="page-break-after: always;"></div>

# 5 Component Design

## 5.1 Overall component design

​	The server side of this project is based on Spring Cloud and uses Spring Cloud gateway integration and service registration discovery center to register and discover each microservice. Therefore, the server component design of our project mainly relies on the highly cohesive microservices and component design of each business The schematic diagram of the overall architecture is shown in the following figure:

![](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/未命名文件 (16).png)

In the Spring cloud architecture, we designed various components based on microservices:

- **Gateway component**. Responsible for gateway integration, unified configuration of CORS (Cross-origin Resource Sharing) gateway to configure the routing of each service, to achieve access to the API of each component or service on the same port.

- **Eureka components**. The purpose of this component is to achieve service registration and service discovery. Using this component, we can register the ip and port of each service to the public component, which is convenient for the configuration update and maintenance of microservices, and it is also more convenient for internal microservices to call each other and reduce maintenance costs.

  ![](https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/eureka.png)

  As shown in the figure above, you can view the running status and running ports of each microservice in real time on the eureka service registration page.

- **Business-driven components**. In this project, the components responsible for completing each independent and cohesive business are all designed as a microservice. Each microservice is responsible for fulfilling the requirements in each sub-business area. The components include Controller, Config and other packages. Each package is responsible for fulfilling its own functions and is highly decoupled.

## 5.2 Detailed design of server-side components

For each microservice, we have unified the internal component design of the microservice. Taking Order Micro-Service as an example, the detailed design of its components is as follows:

1. **Configs.**  Used to complete the basic configuration required before each component starts. For this microservice, an Id generator needs to be configured before the service is started to obtain the primary key ID of the database. The core code is as follows:

   ```java
   @Component
   public class ApplicationConfigRunner implements ApplicationRunner {
       @Override
       public void run(ApplicationArguments args) throws Exception {
           IdGeneratorOptions options = new IdGeneratorOptions((short) 1);
           YitIdHelper.setIdGenerator(options);
           System.out.println("Id generator initial configuration is complete");
       }
   }
   ```

   This class is added to the @Component annotation, and the configuration class is instantiated into the Spring container as Pojo.

2. **Controller**. As the call entry of the microservice business logic, the package contains one or more Controller classes and annotated with @RestController to complete the main business requirements of the microservice.

3. **dto**. The completion of the microservice business often requires the use of converted data. This package is mainly used to convert the data persistence object into the form required to complete the business logic. It contains several data transfer objects that we need.

4. **model** .This component is responsible for completing the persistent mapping of the database through Hibernate Jpa, which uses the @entity annotation to implement the persistent storage of each entity.

5. **repository**. This package implements the DAO layer and is responsible for database query and other operations. Each of the Repository classes implements the JpaRepository interface to complete the database operation.

6. **Service**. This component is the main realization part of business logic. Through the realization of several service interfaces and service interfaces, each business logic is completed, which is the final encapsulation layer of the interface. The classes inside the pakage are added with the @Service annotation to automatically inject the class into the Spring container in the form of a service, without the need to define beans in application.xml

   ```java
   @Service
   public interface OrderService {
       HashMap<String, Object> searchOrderInfoForCustomerId(long customerId, Integer currentPage, Integer pageSize);
       HashMap<String, Object> searchOrderInfoForCustomerIdAndOrderStatus(long customerId, int orderStatus, Integer currentPage, Integer pageSize);
       HashMap<String, Object> searchOrderInfoForHost(long customerId, Integer currentPage, Integer pageSize);
       HashMap<String, Object> searchOrderDetailedInfoForOrderId(long orderId, Integer currentPage, Integer pageSize);
       Long addOrderAndDetailedInformation(OrderContent orderContent);
       void updateOrderStatus(long orderId, int orderStatus);
       Map<String,Object> searchUsableCouponForCustomerId(long customerId, BigDecimal couponLimit, Integer currentPage, Integer pageSize);
       void updateOCouponStatus(long couponId, int couponStatus);
       List<FootMapInfoDto> getFootMapInformation(long customerId);
   }
   ```

   As shown in the above code, the microservice mainly designs the following functional interfaces:

   - Query the detailed order information of a customer with a certain Id
   - Query the detailed order information of a certain order status of a certain Id customer
   - Query order information placed by a landlord
   - According to the detailed order information of a certain order Id
   - Add order details
   - Update the order status of an order
   - Query information about all gift certificates available to a certain guest for a certain order
   - Update the status of the gift certificate
   - Get footprint map information

<div style="page-break-after: always;"></div>

# 6 Database Design

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/DataBaseERDiagram.png">

​	Here is the E-R diagram of our database design.  And here is our tables in the database:

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/GoHomeDatabaseDiagram.png">

<div style="page-break-after: always;"></div>

# 7 Engineering Highlights

​	We have achieved 2 *engineering highlights* as follows:

- Design of microservices

  We carefully designed different microservices to make different services responsible for different functions. We use the technology of spring cloud to implement different micro services on the back end, and use eruka as the forwarding center. 
  
  For eruka configuration, you can visit: http://8.131.225.65:8100 . 
  
  At the same time, each microservice connects to the database with its own unique identity, and they have different operation permissions for the database. For example, stay service can have the priviledge to update and delete on stay table while others can only select from it.

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/ProcessDiagram.jpg" style="width:60%">



- Stress Testing

  In order to test the performance of our website, we used the stress testing tool provided by Tencent to test the web page's affordability. Here is our result:
  
  <img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/stressTesting1.png">
  
  <img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/stressTesting2.png">

​    Besides, We have also had cordial and friendly exchanges with teaching assistants on JetBrains space.

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/Space.png">


<div style="page-break-after: always;"></div>

# 8 Technical Details

## 7.1 External API

​	In order to better fulfill our requirements, we have called many external APIs in the project.

- Payment interface: the system needs to complete the payment operation in the process of placing orders. In order to complete this operation, the system invokes the payment interface of *Alipay* and the sandbox environment provided by Alipay developer platform to complete the operation.
- Map interface: since the guest houses of the system are distributed in different regions, the system calls the map interface of *Gaude map* to convert longitude and latitude information and draw map coordinates;
- Chart interface: in order to realize data analysis and data visualization, the system calls *E-chart* to realize the drawing of bar chart, line chart and sector chart related to housing sales;
-  Waterfall flow interface: because the forum section presents a large number of Posts and involves more information loading, the system realizes better loading and display of posts by directly calling the waterfall flow interface;
- Sharing interface: to enable users to share their favorite home stay with relatives and friends in the process of using the home system. Therefore, the system calls the *cliboard* interface to realize the sharing function of home stay.

<div style="page-break-after: always;"></div>

## 7.2 Collaboration between team members

​	In order to better cooperate among teams, we have established two warehouses on *GitHub*, front-end and back-end, respectively, for code management. At the same time, the conflict is resolved through the pull request method. Here is our repository of front-end and back-end.

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/repository1.png">

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/repository2.png">

​	In addition, we have established a knowledge base on Feishu for technology related exchanges.

<img src="https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/GoHome-DataBook.png">
<div style="page-break-after: always;"></div>

## 7.3 Important Issues
1. The order status is complicated and the conversion process is difficult to realize
   	In this system, a complete order status conversion process is involved, and because part of the order operations can only be performed on a specific order status, it is necessary to strictly grasp the realization method of the order status conversion trigger event.

   ​	First, we designed a state diagram for the order status conversion process:

   ![](https://tongjigohome.oss-cn-shanghai.aliyuncs.com/docx/order%20state%20diagram.png)

   ​	According to the status conversion diagram, the verification of the overall order status conversion can be realized. However, the implementation process of some trigger events is not unique in detail, so the specific implementation process can be considered.

   - Unpaid orders will be automatically cancelled after 15 minutes
     	Solution: This project uses Redis middleware to complete the timeout cancellation of the order. Before placing an order but not paying, insert the order information into the database and **insert the order ID as the key into the Redis cache.** The removal of Redis is completed by monitoring the key invalidation for 15 minutes. Synchronous update of the order data in the database.
   - Automatically update order status based on date
         Solution: In this project, it is necessary to determine the start and end time of the order and the current time to update the order status. The initial idea is to use events provided by the database to implement timing operations. However, **since dynamic SQL statements cannot be executed in triggers**, we have adopted **circular timing events** to frequently update the status. Although there is a certain delay, it can also meet the basic update requirements.
   - Order status update for other operations
         Solution: For the order status update, there are two preliminary ideas, one is achieved through API calls, and the other is achieved through database triggers. This project **uses the trigger method to update the status**. The reason is that the update operation is simple, easy to write back-end code, and easy to function decomposition and implementation.

2.  System Security Assurance

   ​	Security needs to be guaranteed in the project, not only for the password security of the user using the platform, but also for the protection of the connection password in the configuration file.
   ​	Solution: In this project, we call the encryption algorithm provided by **jasypt-spring-boot** and the config class to read the configuration information stored in the secret to encrypt the connection name and password of the database, and on the other hand, realize the user login information through sa-token Save and obtain.


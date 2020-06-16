# Penguin Beautinator

# The team

The Penguin Team has 5 members, all 2nd year Computer Science students at UniBuc: [Livia Magureanu](https://github.com/Oepeling), [Miruna-Andreea Zavelca](https://github.com/Loila11), [Radu-Adrian Andreica](https://github.com/AndreicaRadu), [Eugen-Cristian “Bleo” Bleotiu](https://github.com/bleotiu) and [Alexandru-Gabriel Oprea](https://github.com/OpAlex8).

# The app

Penguin Beautinator is a web application designed to help Beauty Salons, Barbershops or freelancers offer an easy way for their customers to make appointments. Also, customers can browse through our database to discover new salons they might want to make an appointment to.
Once a salon decides to use our service all it has to do is sign up, add their contact information and services and it will be featured on our main page where potential clients can see what they are offering. A logged in client can browse through the services and select an available timeslot to make an appointment.
Our app aims to give small businesses and freelancers a platform where they can reach out to potential customers and expand their client base.

# User Stories

(will do)

# The development process

Github repo: https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator
Trello page: https://trello.com/b/xfp9B2v3/penguin-beautinator

----------
## Framework choices
- [Django](https://www.djangoproject.com) — python3-based framework, which offers a beautiful way to set up websites, using it’s MVC-based approach. It was our first choice due to its own built-in ORM and the ease of developing back-end in the python programming language.
- [React](https://reactjs.org) — state of the art, Facebook backed, front-end JavaScript library. React stands out against other options due to its widespread adoption which led to a big community of developers and, therefore, great resources, including documentation, applets and various examples.
- [Axios](https://github.com/axios/axios) — an open-source JS library to offer a way for the React front-end to communicate with the Django back-end. We went with this option over more traditional options like Ajax because it offers an API which is better suited for the React coding paradigm.

First of all, we chose those frameworks to seize an opportunity to improve ourselves, to widen our horizons by working with the latest technologies available.
Secondly, we wanted to keep our options on the table for a mobile app and a native desktop experience, so React Native came as a natural choice.
This combination of frameworks allowed us to split our workflow in an efficient way, covering back-end tests and database administration for the Django team, while the front-end team works in a separate environment, using React, Wireframe and abstract APIs.

----------
## Early stages

Initially our github repository and team was divided into the back-end branch (Bleo and Radu) and the front-end branch (Miruna and Oprea) with Livia working and coordinating the efforts on both branches. The whole team would have a meeting every couple of weeks to set tasks and discuss the design and the challenges ahead, while having irregular calls within the branches when any difficulties in development would arise. 
In the first month the back-end branch created the database model (early design in Figure 1), the admin page and most of the functions needed database queries, while the front-end team designed the architecture of the site and the layout of most of the pages. Below there are a couple of mocks created in the initial stages of development (Figure 2, Figure 3).

![Figure 1](https://paper-attachments.dropbox.com/s_6C9954A1AEE82229A8F115DE7A3EC7FC6489CA8D4371D31A4AE8FEE9665E6EB1_1591786870082_datab.png)

![Figure 2](https://paper-attachments.dropbox.com/s_947DF1972D443873FF559F696CDA42446867FE9B3B748566293BBDEDB8F20CA1_1591805044794_SalonPage3.png)

![Figure 3](https://paper-attachments.dropbox.com/s_6C9954A1AEE82229A8F115DE7A3EC7FC6489CA8D4371D31A4AE8FEE9665E6EB1_1591786934058_SalonPicker.png)

----------
## Late stages

Once most of the tasks in the first stage were completed, the two branches merged into the master branch which required a major code refactoring in order to tie together the work of the whole team. The front-end team continued to develop the site and its pages while adding new features such as the shopping cart (aici mai puteti adauga voi ca nush exact ce ati facut).  The back-end team started working on automated tests (Bleo) and on Axios requests (Livia daca poti explica mai bn aici) that make the connections between the back-end database functions and the front-end (Livia and Radu), while updating the database with the data required by the front-end team.
Unlike the first stage (where everyone worked mostly independently), the second stage dealt with a lot more bug reporting (Figure 4, Figure 5).

![Figure 4](https://paper-attachments.dropbox.com/s_947DF1972D443873FF559F696CDA42446867FE9B3B748566293BBDEDB8F20CA1_1591805219971_Screenshot+2020-06-10+at+19.06.01.png)
![Figure 5](https://paper-attachments.dropbox.com/s_947DF1972D443873FF559F696CDA42446867FE9B3B748566293BBDEDB8F20CA1_1591805219984_Screenshot+2020-06-10+at+19.05.49.png)

# Challenges
- Learning the chosen frameworks
- Cookie handling (making an artificial refresh for the cookies to get updated)
- Team mobility and workload distribution: the two branches had differing workload requirements throughout the development process so we had to adjust our schedule and redistribute some tasks
- Keeping our functions and code design clear and coherent: making sure everyone uses the same code style and is up to date with design changes
- Connecting Django back-end and React front-end through Axios requests

The developing of the last one can be followed in this [issue](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/issues/10#issue-638143464).
At first, the [Axios query functions](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/blob/master/frontend/src/Universal/Queries.js) had an unexpected behavior due to some asynchronous requests that were not handled properly. It is needless to say that this kind of error is not easy to spot and it took a lot of debugging and JavaScript console logs to figure it out.
Afterwards, we had to options:

    - to make the query functions await for the back-end to respond
    - to change some of the front-end architecture in order to support state changes whenever we would receive data from back-end

We went with the second one, thus now we have a class-based front-end architecture as opposed to the function-based one that we had before.

# Portability and Maintainability

First of all, when creating the app we have tried to use newer software solutions, in order to make our code more maintainable and keep our options open to adapt it in the future to different platforms.
As we have mentioned earlier, when choosing our frameworks we had in mind the ability to port our app to mobile devices. Further development is easy due to our solid back-end. The [automated tests](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/blob/master/backend/beautinator/tests.py) ensure that developing new features is safe and smooth, while the fact that our back-end server is separated makes it possible to run regardless of the front-end.
On the other hand, the front-end is highly modularized, with every component made to be as independent as possible. This way, we have a flexible and reusable code, ready to be modified and improved in the future. Additionally, React Native works similarly on mobile platforms, giving us the opportunity to port our app fast.


# Further development

In the future we intend to add the following features in order to improve the user-experience:

- service filters
- a rating system: the users will be able to rate the salons and their services on a scale from 1 to 5
- reviews: users will be able to leave reviews (even anonymously)
- location: show or recommend salons based on how close they are to the user’s location
- the option to sign in with Google/Facebook
- an Invite Friends feature
- developing a native Android/IOS app
- online payments
- email notifications
# Notare proiect
- user stories/ backlog creation: [Trello link](https://trello.com/b/xfp9B2v3/penguin-beautinator) and see in User Stories section
- design/architecture/UML: [Mocks link](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/tree/master/Mocks) and see in Early Stages section
- source control: [Github repo](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator) and see above in Early Stages section
- automated tests: [Link to code](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/blob/master/backend/beautinator/tests.py)
- bug reporting: [Link to Github issues](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/issues?q=is%3Aissue+is%3Aclosed) and see above in Challenges section
- refactoring, code standards: [Link to Github Network](https://github.com/Echipa-Pinguinii-MDS/Penguin-Beautinator/network)

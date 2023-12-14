import React from "react";
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

// function VerticalExample() {
//   return (
//     <Stack gap={3}>
//       <div className="p-2">First item</div>
//       <div className="p-2">Second item</div>
//       <div className="p-2">Third item</div>
//     </Stack>
//   );
// }

function About() {
  return (
      <>
        <Stack style={{marginLeft: '2.5%' , marginRight: '2.5%'}} gap={3}>
          <h2>About Us</h2>
          <article>
            <h3>The Project</h3>
            <p>
              This site is the result of a collaborative student project by CodeFellows Coding Program out of Seattle, WA.The purpose is to demonstrate the ability to work in pairs and quickly deploy a full stack app. The front-end utilized a React Framework with Bootstrap Components. The server was built with NodeJS and our database was MongoDB. Other dependencies included express, axios, cors, dotenv, and mongoose.
            </p>
            <p>
              For this application books were used as our sample resource. REST principles allow the visitor to access and manipulate book data through four methods - Create, Read, Update, and Delete also known as CRUD. The user can add a book to the database, view all books in the database, update a book in the database, and delete a book from the database. The user can also view a list of books that they have added to the database.
            </p>
          </article>
          <article>
            <h3>The Team</h3>
              <p>
                Xin always wanted to get into acting since a kid. She has the opportunity to do that now, but alas, it's not quite that sustainable, so she is learning to code hoping to get into the tech field to make money. Her favorite book is It by Stephen King.
              </p>
              <p>
                Johnny was raised in Virginia, but for the past twelve years, he has been residing in Portland. When not watching his beloved Trail Blazers at the local pub, he finds his true sense of belonging in nature. After completion of this program, Johnny hopes to make his mark in healthcare tech. His favorite book is The Nimrod Flipout by Etgar Keret.
              </p>
              <a 
                href="https://github.com/xind14" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: '#0366d6', 
                  textDecoration: 'none', 
                  fontSize: '1.2em', 
                  margin: '0.5em'
                }}
              >
                Xin's GitHub
              </a>
              <a 
                href="https://github.com/JohnnyBackus" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ 
                  color: '#0366d6', 
                  textDecoration: 'none', 
                  fontSize: '1.2em', 
                  margin: '0.5em'
                }}
              >
                Johnny's GitHub
              </a>
          </article>
        </Stack>
      </>
  )
}

export default About;
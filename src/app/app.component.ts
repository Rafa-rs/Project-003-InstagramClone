import { Component , OnInit } from '@angular/core';
import * as firebase from '@firebase/app'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app3';

  ngOnInit(): void{

    const firebaseConfig = {
      apiKey: "AIzaSyApD4r3VZWagXc4cNPUjswicgoaMuG5I8E",
      authDomain: "jta-instagram-clone-a06c7.firebaseapp.com",
      projectId: "jta-instagram-clone-a06c7",
      storageBucket: "jta-instagram-clone-a06c7.appspot.com",
      messagingSenderId: "230285212098",
      appId: "1:230285212098:web:efa858ae420d326da0be5b",
      measurementId: "G-F5QF6NKJM6",
      databaseURL: "https://jta-instagram-clone-a06c7-default-rtdb.firebaseio.com"
    };


    firebase.initializeApp(firebaseConfig)
  }
}

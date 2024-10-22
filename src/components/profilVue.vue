<template>
   <div>
    <h1>Profil</h1>
    <div>

    </div>
   </div>
  </template>
  
  <script>
import { getAuth } from 'firebase/auth';

  
  export default {
      name: 'ProfilComponent',
    
      data() {
        return {
            user: null,
        };
      },
      mounted() {
        this.getUserProfile();
      },
      methods:{
        async getUserProfile(){
            const auth = getAuth();
            this.user = auth.currentUser;
            if (this.user){
                console.log('User ID:', this.user.email);
            }else{
                console.log('ERROR 404');
            }
        },
      }
  
      
  };
  </script>
  
  <style scoped>
  .meteo-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
      text-align: center;
  }
  
  h1 {
      margin-bottom: 20px;
      font-size: 2rem;
  }
  
  .city-info {
      margin-bottom: 20px;
  }
  
  .city-info h2 {
      font-size: 1.8rem;
      margin-bottom: 30px;
  }
  
  .temperature {
      font-size: 2.5rem;
      color: #ff5722;
  }
  
  .condition {
      font-size: 1.2rem;
      margin-bottom: 10px;
  }
  
  .details {
      font-size: 1rem;
      color: #777;
  }
  
  .buttons {
      display: flex;
      justify-content: center;
      gap: 10px;
  }
  
  button {
      background-color: #5cb85c;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
  }
  
  button:hover {
      background-color: #4cae4c;
  }
  </style>
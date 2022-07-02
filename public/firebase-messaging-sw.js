importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.2/firebase-messaging.js');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
        console.log('Service worker registration failed, error:', err);
      });
    }

firebase.initializeApp({
  messagingSenderId: "56503410117",
  projectId: "the-cv-tube-a0174",
  apiKey: "AIzaSyB5IcDHgnDncyrkUXab7rT9eZnuryaX8NI",
  appId: "1:56503410117:web:5211b6a5def408843a7fac",
  })

const initMessaging = firebase.messaging()
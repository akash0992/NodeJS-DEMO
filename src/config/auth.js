const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
    appId: process.env.FIREBASE_APP_ID
};

class Auth {
    initialize() {
        const app = initializeApp(firebaseConfig);
        this.auth = getAuth(app);
    }

    async verifyToken(token) {
        try {
            return await this.auth.verifyIdToken(token);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

exports.auth = new Auth();

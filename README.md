Oke 👍 Aku akan **menambahkan panduan install backend API dan database** ke README kamu **tanpa menghapus konten asli**.
Berikut versi lengkapnya yang bisa langsung kamu gunakan sebagai `README.md`:

---

````md
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
````

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

* [development build](https://docs.expo.dev/develop/development-builds/introduction/)
* [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
* [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
* [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

---

## Learn more

To learn more about developing your project with Expo, look at the following resources:

* [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
* [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

---

## Join the community

Join our community of developers creating universal apps.

* [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
* [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

---

## 🧩 Backend API Installation (PHP)

This mobile app uses a **PHP Native REST API** as backend.

### 🔗 Download Backend API

Download or clone the repository:

```text
https://github.com/Variski/api-balcade
```

---

### 1️⃣ Place API Folder in `htdocs`

If you are using **XAMPP**, move the backend folder to:

```text
C:\xampp\htdocs\api-balcade
```

Expected structure:

```text
htdocs/
└── api-balcade/
    ├── api/
    ├── auth/
    ├── products/
    ├── orders/
    ├── config/
    ├── utils/
    └── upload/
```

---

### 2️⃣ Create Database

Open **phpMyAdmin**, then:

1. Create a new database named:

```text
balcade_kicks
```

2. Import the provided **SQL file** into the database
   (usually `balcade_kicks.sql` in backend folder).

---

### 3️⃣ Configure Database Connection

Edit the database configuration file:

```text
api-balcade/config/database.php
```

Example configuration:

```php
<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "balcade_kicks";

$conn = mysqli_connect($host, $user, $pass, $db);
```

---

### 4️⃣ Run Backend

Make sure:

* Apache is running
* MySQL is running

Test API in browser or Postman:

```text
http://localhost/api-balcade
```

---

## 🔗 Connect Frontend to Backend

In frontend service file (`app/services/api.ts`):

```ts
export const API_URL = "http://localhost/api-balcade";
```

---

## 🛠 Tech Stack

### Frontend

* Expo
* React Native
* Expo Router
* NativeWind / Tailwind CSS

### Backend

* PHP Native
* MySQL
* REST API
* Token-based Authentication

---

## 🎯 Application Features

* User Registration & Login
* Product Catalog
* Product Detail
* Cart System
* Checkout & Orders
* User Profile

---

## 🎓 Project Information

This application is developed as a **Final Exam Project (UAS)**
for the **Balcade Kick Co Shoes Store Application**.

---

## 👨‍💻 Author

**Variski**

* Frontend Repository:
  [https://github.com/Variski/balcade-kick-co](https://github.com/Variski/balcade-kick-co)
* Backend Repository:
  [https://github.com/Variski/api-balcade](https://github.com/Variski/api-balcade)

```


```

## 🚀 Quick Start

### 1. Clone the Repository

``` bash
git clone https://github.com/tansibMuttakin/pixofix-assignment.git
cd pixofix-assignment
```

### 2. Install PHP Dependencies

```bash
composer install
```

### 3. Configure Environment

```bash
cp .env.example .env
php artisan key:generate
```

### 4. Set Up the Database

Make sure your database is running and configured in .env. Then run:

```bash
php artisan migrate
```

Run the seeder file to generate admin and employee user with the respective roles

```bash
php artisan db:seed
```

### 5. Install Node.js Dependencies

Ensure you have Node.js and npm/yarn installed.

```bash
npm install
npm run dev
# OR
yarn && yarn dev
```

### 6. Start the Development Server

 ```bash
 php artisan serve
```

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

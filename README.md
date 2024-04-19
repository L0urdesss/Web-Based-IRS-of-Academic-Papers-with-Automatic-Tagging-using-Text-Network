# Laravel-React-IRS
IRS project with Laravel-React Framework + Inertia

## Installation (For CMS)
You will need PHP8.2, composer and Node.js.

1. Download the project (or clone using GIT) 
2. Copy `.env.example` into `.env` and configure database credentials (skip 3 and 4 if database is sqlite)
3. Open xampp and start Apache and Mysql
4. Create Database name it `inertia`
5. Navigate to the project's root directory using terminal (or just open it in editor)
6. Run `composer install`
7. Set the encryption key by executing `php artisan key:generate --ansi`
8. Start local server by executing `php artisan serve`
9. Open new terminal and Run `npm install`
10. Run `php artisan migrate`
11. Run `php artisan db:seed`
12. Open new terminal and Run `npm run dev` to start vite server for React
fdfd
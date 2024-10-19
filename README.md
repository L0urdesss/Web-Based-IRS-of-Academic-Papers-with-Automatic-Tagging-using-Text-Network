# Laravel-React-IRS

Sample Users
User - sample@tup.edu.ph
Admin - admin@tup.edu.ph
Password - password
# IRS project with Laravel-React Framework + Inertia

## Installation (For CMS)

You will need PHP8.2, composer and Node.js.

1. Download the project (or clone using GIT)
2. Copy `.env.example` into `.env` and configure database credentials (skip 3 and 4 if database is sqlite)
3. Open xampp and start Apache and Mysql
4. Create Database name it `inertia`
5. Navigate to the project's root directory using terminal (or just open it in editor)
6. Run `composer install`
7. Set the encryption key by executing `php artisan key:generate --ansi`
8. Run `php artisan storage:link`
9. Start local server by executing `php artisan serve`
10. Open new terminal and Run `npm install`
11. Run `php artisan migrate`
12. Run `php artisan db:seed`
13. Open new terminal and Run `npm run dev` to start vite server for React

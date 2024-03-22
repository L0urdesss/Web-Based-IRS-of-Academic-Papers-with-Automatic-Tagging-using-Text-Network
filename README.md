# Laravel-React-IRS
IRS project with Laravel-React Framework + Inertia

## Installation (For CMS)
You will need PHP8.2, composer and Node.js.

1. Download the project (or clone using GIT) 
2. Copy `.env.example` into `.env` and configure database credentials
3. Navigate to the project's root directory using terminal (or just open it in editor)
4. Run `composer install`
5. Set the encryption key by executing `php artisan key:generate --ansi`
6. Start local server by executing `php artisan serve`
7. Open new terminal and Run `npm install`
8. Run `php artisan db:seed`
9. Open xampp and start Apache and Mysql
10. Open new terminal and Run `npm run dev` to start vite server for React

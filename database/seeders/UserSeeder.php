<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'), // Use secure password
            ]
        );
        $adminRole = Role::where('name', 'admin')->firstOrFail();
        $admin->assignRole($adminRole);

        // Create Employee 1
        $employee1 = User::updateOrCreate(
            ['email' => 'employee1@example.com'],
            [
                'name' => 'Employee_1',
                'password' => Hash::make('password'),
            ]
        );
        $employeeRole = Role::where('name', 'employee')->firstOrFail();
        $employee1->assignRole($employeeRole);

        // Create Employee 2
        $employee2 = User::updateOrCreate(
            ['email' => 'employee2@example.com'],
            [
                'name' => 'Employee_2',
                'password' => Hash::make('password'),
            ]
        );
        $employee2->assignRole($employeeRole);
    }
}

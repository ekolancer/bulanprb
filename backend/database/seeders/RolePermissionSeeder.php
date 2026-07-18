<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Seed roles & permissions dasar untuk RBAC panel admin.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        Cache::forget(config('permission.cache.key'));

        $resources = [
            'users',
            'roles',
        ];

        $actions = ['view', 'create', 'update', 'delete'];

        foreach ($resources as $resource) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => "{$action} {$resource}"]);
            }
        }

        $superAdmin = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdmin->syncPermissions(Permission::all());

        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions(
            Permission::whereIn('name', [
                'view users',
                'create users',
                'update users',
            ])->get()
        );

        Role::firstOrCreate(['name' => 'editor']);
    }
}

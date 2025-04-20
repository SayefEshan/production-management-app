<?php

namespace Database\Seeders;

use App\Models\Folder;
use App\Models\Order;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FolderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all order IDs
        $orderIds = Order::pluck('id')->toArray();
        
        if (empty($orderIds)) {
            $this->command->info('No orders found. Please run OrderSeeder first.');
            return;
        }
        
        // Define folder structure templates
        $folderStructures = [
            // Template 1: Standard Production Structure
            [
                'Documents' => [
                    'Contracts',
                    'Specifications' => [
                        'Technical Requirements',
                        'Design Guidelines'
                    ],
                    'Client Communications'
                ],
                'Assets' => [
                    'Images' => [
                        'Raw',
                        'Processed',
                        'Finals'
                    ],
                    'Videos',
                    'Audio'
                ],
                'Production' => [
                    'Drafts' => [
                        'Version 1',
                        'Version 2',
                        'Client Review'
                    ],
                    'Finals' => [
                        'Approved',
                        'Published'
                    ],
                    'Source Files'
                ],
                'Invoices' => [
                    'Quotes',
                    'Payments',
                    'Receipts'
                ]
            ],
            
            // Template 2: Simplified Structure
            [
                'Documents',
                'Images',
                'Deliverables' => [
                    'Drafts',
                    'Finals'
                ],
                'Billing'
            ],
            
            // Template 3: Project Management Structure
            [
                'Planning' => [
                    'Requirements',
                    'Timeline',
                    'Resources'
                ],
                'Execution' => [
                    'Designs',
                    'Development',
                    'Testing'
                ],
                'Delivery' => [
                    'Client Approval',
                    'Final Deliverables'
                ],
                'Post-Project' => [
                    'Feedback',
                    'Analytics'
                ]
            ]
        ];
        
        foreach ($orderIds as $orderId) {
            // Select a random structure template
            $templateIndex = array_rand($folderStructures);
            $structure = $folderStructures[$templateIndex];
            
            // Create the folder structure for this order
            $this->createFolderStructure($structure, null, $orderId);
            
            // Add some random variation
            if (rand(0, 1)) {
                $this->addRandomFolders($orderId);
            }
        }
        
        $this->command->info('Created folder structures for ' . count($orderIds) . ' orders.');
    }
    
    /**
     * Recursively create folder structure
     *
     * @param array|string $structure The folder structure to create
     * @param int|null $parentId The parent folder ID
     * @param int $orderId The order ID
     * @return void
     */
    private function createFolderStructure($structure, $parentId, $orderId)
    {
        // If structure is just a string, create a single folder
        if (is_string($structure)) {
            Folder::create([
                'name' => $structure,
                'order_id' => $orderId,
                'parent_id' => $parentId
            ]);
            return;
        }
        
        // Otherwise, it's an associative or indexed array
        foreach ($structure as $key => $value) {
            if (is_string($key)) {
                // This is a parent folder with children
                $folder = Folder::create([
                    'name' => $key,
                    'order_id' => $orderId,
                    'parent_id' => $parentId
                ]);
                
                // Recursively create children
                $this->createFolderStructure($value, $folder->id, $orderId);
            } else {
                // This is a standalone folder (indexed array item)
                $this->createFolderStructure($value, $parentId, $orderId);
            }
        }
    }
    
    /**
     * Add random folders to add variety
     *
     * @param int $orderId The order ID
     * @return void
     */
    private function addRandomFolders($orderId)
    {
        // Get some existing folders that could be parents
        $potentialParents = Folder::where('order_id', $orderId)
                                   ->inRandomOrder()
                                   ->limit(rand(1, 3))
                                   ->get();
        
        $randomFolderNames = [
            'Custom Files', 'Archives', 'Backups', 'References',
            'Client Materials', 'Research', 'Notes', 'Miscellaneous',
            'Samples', 'Templates', 'Exports', 'External Assets'
        ];
        
        foreach ($potentialParents as $parent) {
            // Add 1-3 random folders under each selected parent
            $count = rand(1, 3);
            for ($i = 0; $i < $count; $i++) {
                $name = $randomFolderNames[array_rand($randomFolderNames)];
                // Add a unique identifier to avoid name collisions
                $uniqueName = $name . ' ' . Str::random(3);
                
                Folder::create([
                    'name' => $uniqueName,
                    'order_id' => $orderId,
                    'parent_id' => $parent->id
                ]);
            }
        }
        
        // Also create a few random root folders
        $rootFolderCount = rand(0, 2);
        for ($i = 0; $i < $rootFolderCount; $i++) {
            $name = $randomFolderNames[array_rand($randomFolderNames)];
            $uniqueName = $name . ' ' . Str::random(3);
            
            Folder::create([
                'name' => $uniqueName,
                'order_id' => $orderId,
                'parent_id' => null
            ]);
        }
    }
}
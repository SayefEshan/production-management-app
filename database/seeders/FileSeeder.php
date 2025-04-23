<?php

namespace Database\Seeders;

use App\Models\File;
use App\Models\User;
use App\Models\Folder;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Check if we have folders
        $folderCount = Folder::count();
        if ($folderCount === 0) {
            $this->command->info('No folders found. Please run FolderSeeder first.');
            return;
        }

        // Get all folders grouped by order
        $foldersByOrder = Folder::select(['id', 'order_id', 'name'])
            ->get()
            ->groupBy('order_id');

        $fileStatuses = ['unclaimed', 'in_progress', 'completed', 'approved', 'rejected'];
        $totalFilesCreated = 0;

        // Get employee IDs
        $employeeIds = User::role('employee')->pluck('id')->toArray();

        foreach ($foldersByOrder as $orderId => $folders) {
            // Define how many files to create for this order (between 5 and 50)
            $numberOfFiles = rand(5, 50);

            for ($i = 0; $i < $numberOfFiles; $i++) {
                $claimedBy = null;
                $claimed_at = null;

                // Pick a random folder for this file
                $randomFolder = $folders->random();

                // Determine file type based on folder name
                $fileType = $this->determineFileType($randomFolder->name);

                // Create a realistic file name
                $fileName = $this->generateFileName($faker, $fileType, $randomFolder->name);

                // Create a file path (simulated as if stored in storage)
                $filePath = 'orders/' . $orderId . '/files/' . Str::slug($randomFolder->name) . '/' . $fileName;

                // Set a random status for the file
                $status = $fileStatuses[array_rand($fileStatuses)];

                if ($status !== 'unclaimed') {
                    $claimedBy = $employeeIds[array_rand($employeeIds)];
                    $claimed_at = now();
                }
                // Create the file record
                File::create([
                    'folder_id' => $randomFolder->id,
                    'order_id' => $orderId,
                    'file_name' => $fileName,
                    'file_path' => $filePath,
                    'claimed_by' => $claimedBy,
                    'claimed_at' => $claimed_at,
                    'status' => $status,
                ]);

                $totalFilesCreated++;
            }
        }

        $this->command->info("Created {$totalFilesCreated} files across " . $foldersByOrder->count() . " orders.");
    }

    /**
     * Determine appropriate file type based on folder name
     *
     * @param string $folderName
     * @return string
     */
    private function determineFileType(string $folderName): string
    {
        $folderName = strtolower($folderName);

        if (Str::contains($folderName, ['image', 'photo', 'picture', 'raw', 'processed', 'finals'])) {
            return 'image';
        }

        if (Str::contains($folderName, ['document', 'contract', 'spec', 'requirement'])) {
            return 'document';
        }

        if (Str::contains($folderName, ['invoice', 'payment', 'receipt', 'billing', 'quote'])) {
            return 'invoice';
        }

        if (Str::contains($folderName, ['video', 'audio'])) {
            return 'media';
        }

        if (Str::contains($folderName, ['source', 'draft', 'final', 'design', 'development'])) {
            return 'source';
        }

        // Default
        return 'misc';
    }

    /**
     * Generate a realistic file name based on type and folder
     *
     * @param \Faker\Generator $faker
     * @param string $fileType
     * @param string $folderName
     * @return string
     */
    private function generateFileName($faker, string $fileType, string $folderName): string
    {
        $prefix = Str::slug(substr($folderName, 0, 3)) . '_';
        $datePart = date('Ymd');
        $randomPart = Str::random(4);

        switch ($fileType) {
            case 'image':
                $extensions = ['jpg', 'png', 'gif', 'psd', 'tiff', 'webp'];
                $descriptors = ['image', 'photo', 'mockup', 'design', 'banner', 'logo', 'product'];
                return $prefix . $faker->randomElement($descriptors) . '_' . $datePart . '_' . $randomPart . '.' . $faker->randomElement($extensions);

            case 'document':
                $extensions = ['pdf', 'docx', 'txt', 'rtf', 'odt'];
                $descriptors = ['contract', 'spec', 'terms', 'agreement', 'requirements', 'documentation'];
                return $prefix . $faker->randomElement($descriptors) . '_' . $datePart . '_' . $randomPart . '.' . $faker->randomElement($extensions);

            case 'invoice':
                $extensions = ['pdf', 'xlsx', 'csv'];
                $descriptors = ['invoice', 'receipt', 'quote', 'payment', 'billing'];
                return $prefix . $faker->randomElement($descriptors) . '_' . $datePart . '_' . $randomPart . '.' . $faker->randomElement($extensions);

            case 'media':
                $extensions = ['mp4', 'mov', 'avi', 'mp3', 'wav'];
                $descriptors = ['video', 'recording', 'presentation', 'demo', 'trailer'];
                return $prefix . $faker->randomElement($descriptors) . '_' . $datePart . '_' . $randomPart . '.' . $faker->randomElement($extensions);

            case 'source':
                $extensions = ['ai', 'psd', 'xd', 'sketch', 'fig', 'html', 'css', 'js', 'php', 'zip'];
                $descriptors = ['source', 'project', 'component', 'template', 'module', 'asset'];
                return $prefix . $faker->randomElement($descriptors) . '_' . $datePart . '_' . $randomPart . '.' . $faker->randomElement($extensions);

            case 'misc':
            default:
                $extensions = ['pdf', 'txt', 'zip', 'json', 'md'];
                $descriptors = ['file', 'data', 'info', 'backup', 'notes', 'miscellaneous'];
                return $prefix . $faker->randomElement($descriptors) . '_' . $datePart . '_' . $randomPart . '.' . $faker->randomElement($extensions);
        }
    }
}

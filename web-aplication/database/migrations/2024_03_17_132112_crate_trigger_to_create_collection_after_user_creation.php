<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

                $collectionsTable = \App\Models\Collection::TABLE;

                DB::statement("
                                CREATE TRIGGER create_collection_for_user
                                AFTER INSERT ON users
                                FOR EACH ROW
                                BEGIN
                                    INSERT INTO $collectionsTable (user_id, name, is_default,created_at,updated_at)
                                    VALUES (NEW.id, 'Default', 1,now(),now());
                                END
                ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP TRIGGER IF EXISTS create_collection_for_user;");
    }
};

<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase {
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample() {
        $this->withoutMiddleware();
        $this->withoutExceptionHandling();
        $response = $this->json('post', '/auth/register', [
            'username' => 'randomTestUser',
            'password' => 'randomSuperSecretPassword',
        ]);


        // $response->assertStatus(200)->assertJsonStructure([
        //     'result', 'id', 'username',
        // ]);
    }
}

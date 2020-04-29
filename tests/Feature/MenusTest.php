<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// use Illuminate\Foundation\Testing\WithoutMiddleware;

class MenusTest extends TestCase {
    // use WithoutMiddleware;
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample() {
        $this->withoutMiddleware();
        $this->withoutExceptionHandling();
        $response = $this->json('GET', '/api/menu');

        $response->assertStatus(200)->assertJsonStructure(
            ['*' => ['id', 'name', 'price', 'description', 'img']]
        );
    }
}

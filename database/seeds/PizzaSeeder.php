<?php

use Illuminate\Database\Seeder;

class PizzaSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        //
        DB::Table('pizzas')->insert([
            [
                'name' => 'Margherita Pizza',
                'price' => 7.99,
                'description' => 'Margherita is the mother of all pizzas. This Neopaltian-style pizza has thin crust, fresh tomato sauce, fresh mozzarella cheese, and just a few leaves of basil. Margherita’s toppings are simple but they also have the power to be truly sublime in a way few other toppings can be.',
                'img' => 'margarita.jpeg',
            ],
            [
                'name' => 'Pepperoni Pizza',
                'price' => 9.99,
                'description' => 'We’d wager that pepperoni is still America’s number-one, most-popular pizza topping. This singular topping even graces the pizza emoji! It makes sense if you really consider everything that is good about pepperoni: The salty and slightly spicy taste holds its own against waves of melty, gooey cheese and gets ever-so-slightly crisped in the hot oven in such a crave-worthy way that no one can resist pulling them straight from the smoldering hot pizza and dropping them directly into their mouths.',
                'img' => 'pepperoni.jpeg',
            ],
            [
                'name' => 'BBQ Chicken Pizza',
                'price' => 12,
                'description' => 'BBQ chicken pizza does not, as its name suggests, require a barbecue pit. Instead, use an equal mixture of smoky barbecue and tomato sauces. The cooked chicken can be cubed or shredded and must be held in place with a combination of cheeses: cheddar or Gouda and part-skim mozzarella are a nice mix. Whisper-thin red onion slices add bite and contrasting texture and flavor to the pizza.',
                'img' => 'bbq_chicken.jpeg',
            ],
            [
                'name' => 'Hawaiian Pizza',
                'price' => 15,
                'description' => 'A combination of tomato sauce, cheese, ham, and pineapple that is as beloved as it is despised still makes our list of iconic pizzas. Hawaiian pizza was reportedly invented in Canada, not the American islands it is named for. Like BBQ chicken pizza, those who love it cite the sweet and savory combination as the biggest draw to this popular pizza.',
                'img' => 'hawaiian.jpeg',
            ],
            [
                'name' => 'Meatlover Pizza',
                'price' => 14.99,
                'description' => 'Homemade thin crust pizza, topped off with two types of cheese, bacon, ham, pepperoni and hot sausage! A must make for meat lover’s.',
                'img' => 'meatlover.jpg',
            ],
            [
                'name' => 'American Pizza',
                'price' => 6,
                'description' => 'The patriot of Pizzas is here, enjoy the best American made pizza around, you don\'t need to go to Texas to feel the taste of a real American bacon, eggs and sausage, this pizza offers the perfect pack to make you feel like the number #1 🇺🇸',
                'img' => 'american.jpeg',
            ],
            [
                'name' => 'Vegetarian Pizza',
                'price' => 9.99,
                'description' => 'A wonderful crust layered with herbed tomato sauce and toppings encourages my family of six to dig right in to this low-fat main course. —Denise Warner, Red Lodge, Montana',
                'img' => 'vegetarian.jpg',
            ],
            [
                'name' => 'Spinach and Artichoke Pizza',
                'price' => 7.30,
                'description' => 'My from-scratch pizza has a whole wheat crust flavored with beer. Top it with spinach, artichoke hearts and tomatoes, then add chicken or ham and fresh basil if you want to include meat.',
                'img' => 'spinach.jpg',
            ],
            [
                'name' => 'Pepsi',
                'price' => 1.22,
                'description' => 'A Pepsi filled cup to refresh your mouth!',
                'img' => 'pepsi.png',
            ],
            [
                'name' => 'Coffee',
                'price' => 3.50,
                'description' => 'For the more mature that would like to start the day off with a nice cup of coffee',
                'img' => 'coffeecup.jpg',
            ],
            [
                'name' => 'Baked BBQ Onion Rings',
                'price' => 24.99,
                'description' => 'Onion rings have been around for at least one hundred years and have risen in popularity to be a favorite appetizer or side dish all around the world. Generally, Reinaldo’s Onion Rings are cross-sectional and are generally deep fried. These wholesale onion rings can be seasoned to taste with salt and pepper or lemon seasoning. Add a layer of parmesan cheese while cooking for a cheesy onion ring variety sure to please your restaurant patrons. Onion rings make great options beside the traditional frozen french fry commonly offered in restaurants and will be appreciated for its dipping ability in ketchup, ranch dressing, honey mustard, or vinegar. Pair with great lunch combos such as hamburgers or chicken tenders or make more exotic by pairing with Philly cheese steak or fried shrimp. Reinaldo\'s strives to offer the best customer service in town.',
                'img' => 'onionrings.webp'
            ]
        ]);
    }
}

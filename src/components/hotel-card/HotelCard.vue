<template>
    <div class="max-w-full mx-auto p-2">
        <div v-for="(hotel, index) in hotels" :key="index">
            <a :href="hotel.url">
                <div class="border-solid border-1 shadow-lg rounded mt-6">
                    <div class="lg:flex">
                        <div class="lg:w-1/4">
                            <img :src="hotel.hotelImage" alt="" class="w-100">
                        </div>
                        <div class="lg:w-3/4">
                            <div class="p-4">
                                <div class="float-left">
                                    <h3 class="uppercase font-bold text-2xl mb-2">{{ hotel.title }}</h3>
                                    <p class="text-gray-500 capitalize mb-3">{{ hotel.country }}</p>
                                    <div class="lg:flex">
                                        <div class="lg:flex self-center">
                                            <div v-for="index in hotel.numberOfRank" :key="index">
                                                <div class="rounded-full bg-yellow-500 h-4 w-4 mr-1"></div>
                                            </div>
                                            
                                        </div>
                                        <div class="self-center mr-1">
                                            <img :src=" hotel.tripadvisorImage " alt="" class="w-100">
                                        </div>
                                        <span class="text-gray-500 self-center">
                                            {{ hotel.numberOfReviews }} reviews
                                        </span>
                                    </div>
                                    <div class="lg:flex">
                                        <div v-for="(icon, index) in hotel.icons" :key="index">
                                            <div class="rounded-full h-10 w-10 flex items-center justify-center bg-gray-300 mr-2 mt-10">
                                                <i :class="'fa fa-'+ icon"></i>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div class="float-right">
                                    <p class="">
                                        <span class="">{{ hotel.numberOfNights }} night</span>
                                        from (AUD)
                                    </p>
                                    <p class="line-through text-gray-500">${{ hotel.discount }}</p>
                                    <p class="text-red-600 text-4xl font-bold">${{ hotel.price }}</p>
                                    <p>Earn <span class="font-semibold">{{ hotel.points }}</span> Quatas Points^</p>
                                </div>
                            
                            </div>

                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: "HotelCard",
    data() {
        return {
            hotels: [
                {
                    title: 'Hotel',
                    country: 'VietNam',
                    tripadvisorImage: 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg',
                    hotelImage:'https://i.travelapi.com/hotels/3000000/2060000/2057700/2057692/d1374aea_b.jpg',
                    url: 'void:javascript(0)',
                    discount: 300,
                    price: 200,
                    numberOfNights: 1,
                    numberOfReviews: 3000,
                    numberOfRank: 4, 
                    points: 90,
                    icons: [
                        'phone',
                        'car'
                    ]
                },
                {
                    title: 'Hotel 2',
                    country: 'US',
                    tripadvisorImage: 'https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg',
                    hotelImage:'https://i.travelapi.com/hotels/3000000/2060000/2057700/2057692/d1374aea_b.jpg',
                    url: 'void:javascript(0)',
                    discount: 300,
                    price: 200,
                    numberOfNights: 2,
                    numberOfReviews: 4000,
                    numberOfRank: 5,
                    points: 90,
                    icons: [
                        'book',
                        'car'
                    ]
                }
            ]

        }
    }    
}
</script>
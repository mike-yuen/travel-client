function fakeApi() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          title: "Hotel",
          country: "VietNam",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage:
            "https://i.travelapi.com/hotels/3000000/2060000/2057700/2057692/d1374aea_b.jpg",
          url: "void:javascript(0)",
          discount: 300,
          price: 200,
          numberOfNights: 1,
          numberOfReviews: 3000,
          numberOfRank: 4,
          points: 90,
          isDeal: true,
          icons: ["phone", "car"]
        },
        {
          title: "Hotel 2",
          country: "US",
          tripadvisorImage:
            "https://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/4.5-15969-4.svg",
          hotelImage:
            "https://i.travelapi.com/hotels/3000000/2060000/2057700/2057692/d1374aea_b.jpg",
          url: "void:javascript(0)",
          discount: 300,
          price: 200,
          numberOfNights: 2,
          numberOfReviews: 4000,
          numberOfRank: 5,
          points: 100,
          isDeal: false,
          icons: ["book", "car"]
        }
      ]);
    }, 2000);
  });
}

export default {
  data() {
    return {
      data: null,
      error: null,
      loading: true
    };
  },
  async created() {
    try {
      this.data = await fakeApi();
      this.loading = false;
    } catch (error) {
      this.error = error;
    }
  },
  render() {
    return this.$scopedSlots.default({
      data: this.data,
      error: this.error,
      loading: this.loading
    });
  }
};

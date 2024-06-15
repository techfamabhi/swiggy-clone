import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Index() {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  
  const [filters, setFilters] = useState({
    rating: false,
    type: '',
    offer: false
  });

  useEffect(() => {
    const fetchedData = [
      {
        aggregatedDiscountInfoV3: { header: "20% OFF" },
        restaurants: { info: { name: "Pizza Hut" } },
        sla: { slaString: "30 mins" },
        cuisines: " Bold BBQ Veggies , Schezwan Margherita , Mazedar Makhni Paneer",
        location: "Pune",
        rating:"4.2",
        price:"400",
        type:"nonveg",
        offerprice:"129 OFF Above 249",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIibPbOeDQQscm9g-fDNdCvROokQJukg8nYQ&s"
      },
      {
        aggregatedDiscountInfoV3: { header: "15% OFF" },
        restaurants: { info: { name: "Dominos" } },
        sla: { slaString: "25 mins" },
        cuisines: " Pepperoni Pizza  Margherita Pizza, Veggie Paradise Pizza ",
        location: "Pune",
        rating:"4.4",
        price:"300",
        type:"veg",
        image: "https://www.dominos.co.in/blog/wp-content/uploads/2019/12/third.jpg"
      },
      {
        aggregatedDiscountInfoV3: { header: "10% OFF" },
        restaurants: { info: { name: "Burger King" } },
        sla: { slaString: "20 mins" },
        cuisines: "Whopper Big Kin,Premium burgers,Sliders,BK Stackers",
        location: "Pune",
        rating:"4.1",
        price:"350",
        type:"veg",
        image: "https://gumlet-images.assettype.com/afaqs/2023-05/815b4cd1-095c-47b7-868f-c7701074ebe7/Tasty_Meals_KV.jpg?auto=format,compress&fmt=webp&format=webp&w=1200&h=900&dpr=1.0"
      },
      {
        aggregatedDiscountInfoV3: { header: "25% OFF" },
        restaurants: { info: { name: "Subway" } },
        sla: { slaString: "15 mins" },
        cuisines: "Sandwiches, Healthy Food, Pizza  Margherita Pizza",
        location: "Pune",
        rating:"3.4",
        price:"180",
        type:"veg",
        offerprice:"299 OFF Above 220",
        image: "https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/63178e3e64d503a479f2a2048a474552"
      },
      {
        aggregatedDiscountInfoV3: { header: "30% OFF" },
        restaurants: { info: { name: "KFC" } },
        sla: { slaString: "35 mins" },
        cuisines: "Chicken, Fast Food,Single Chicken Roll,onions & a punchy sauce",
        location: "Pune",
        rating:"4.6",
        price:"450",
        type:"nonveg",
        image: "https://b.zmtcdn.com/data/pictures/4/2100644/9410759d611db9c62c3acc23c1f27e06.jpg?fit=around|750:500&crop=750:500;*,*"
      },
      {
        aggregatedDiscountInfoV3: { header: "50% OFF" },
        restaurants: { info: { name: "Taco Bell" } },
        sla: { slaString: "40 mins" },
        cuisines: "Mexican, Fast Food,tacos, burritos, vegetarian options, fountain drinks and desserts",
        location: "Pune",
        rating:"4.0",
        price:"100",
        type:"veg",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQetzfcWKxMuZatqYKZCYkKyBxEk2dwW6WcWg&s"
      },
      {
        aggregatedDiscountInfoV3: { header: "5% OFF" },
        restaurants: { info: { name: "McDonald's" } },
        sla: { slaString: "25 mins" },
        cuisines: "Burgers, Fast Food,Spicy McCrispy,Chicken McNuggets,Iced Coffee",
        location: "Pune",
        rating:"3.5",
        price:"130",
        type:"veg",
        image: "https://www.shutterstock.com/image-photo/282022-double-mcdonalds-hamburger-combo-260nw-2150568447.jpg"
      },
    
      {
        aggregatedDiscountInfoV3: { header: "40% OFF" },
        restaurants: { info: { name: "Barbeque Nation" } },
        sla: { slaString: "45 mins" },
        cuisines: "TANDOORI MUSHROOM,TANDOORI PANEER TIKKA,Dum Biryani",
        location: "Pune",
        rating:"4.9",
        price:"600",
        type:"nonveg",
        image: "https://img4.nbstatic.in/tr:w-500/64216cf98db992000bb6631b.jpg"
      },
      
    ];

    setRestaurants(fetchedData);
    setFilteredRestaurants(fetchedData); // Initialize filtered list
  }, []);

  const handleSort = () => {
    const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setFilteredRestaurants(sortedRestaurants);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterByRating = () => {
    const newFilters = { ...filters, rating: !filters.rating };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const filterByType = (type) => {
    const newFilters = { ...filters, type: filters.type === type ? '' : type };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const filterByOffer = () => {
    const newFilters = { ...filters, offer: !filters.offer };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const allProducts = () => {
    setFilteredRestaurants(restaurants); // Reset the filtered list to show all restaurants
    setFilters({ rating: false, type: '', offer: false }); // Reset all filters
  };

  const applyFilters = (newFilters) => {
    let updatedList = [...restaurants];

    if (newFilters.rating) {
      updatedList = updatedList.filter(restaurant => parseFloat(restaurant.rating) >= 4.0);
    }

    if (newFilters.type) {
      updatedList = updatedList.filter(restaurant => restaurant.type === newFilters.type);
    }

    if (newFilters.offer) {
      updatedList = updatedList.filter(restaurant => restaurant.offerprice);
    }

    setFilteredRestaurants(updatedList);
  };

  const handleSearch = (searchQuery) => {
    const filteredRestaurants = restaurants.filter((restaurant) => {
      return (
        restaurant.restaurants.info.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisines.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  
    setFilteredRestaurants(filteredRestaurants);
  };
  
  return (
    <>
      <div className="main-container">
      <Navbar handleSearch={handleSearch} />

        <main className="content-section">
          <section className="restaurants">
            <h3>
              <b>Restaurants with online food delivery in Pune</b>
            </h3>
            <div className="container" style={{ marginTop: "-11px" }}>
              <div className="item-bar">
                <div className="filters ml-5">
                  <div className="relevance" onClick={handleSort}>
                    Filter{" "}
                    <i className="fa-solid fa-arrow-right-arrow-left" style={{ color: "grey" }} />
                  </div>
                  <div className="rating" onClick={filterByOffer}>New On Swiggy</div>

                  <div className="cost-lh" onClick={allProducts}>
                    All
                  </div>
                  <div className="delivery-time" onClick={handleSort}>
                    Sort{" "}
                    <i className="fa-solid fa-caret-down" style={{ color: "grey" }} />{" "}
                  </div>
                  <div className="rating" onClick={filterByRating}>
                    Rating 4.0
                  </div>
                  <div className="rating" onClick={() => filterByType('veg')}>
                    Pure Veg
                  </div>
                  <div className="cost-lh" onClick={filterByOffer}>
                    Offers
                  </div>
                  <div className="cost-hl" onClick={handleSort}>Rs . 300- Rs. 600</div>
                  <div className="cost-hl" onClick={handleSort}>Less than Rs . 600</div>
                  
                </div>
              </div>

              <div className="restaurant-list">
                {filteredRestaurants.map((restaurant, index) => (
                  <div className="place" key={index}>
                    <a href={restaurant.image} className="place-link">
                      <div className="list-item">
                        <div className="item-content">
                          <div className="top-img">
                            <img src={restaurant.image} alt={restaurant.restaurants.info.name} className="restaurant-image" style={{ width: "100%", height: "164px", borderRadius: "30px" }} />
                            <p style={{ marginTop: "-40px", marginLeft: "15px", color: "white" }}>
                              {restaurant.offerprice ? (
                                <b>
                                  <i className="fa fa-rupee"></i>&nbsp;{restaurant.offerprice}
                                </b>
                              ) : (
                                ""
                              )}
                            </p>
                            <p className="p1">
                              <i className="fa fa-rupee" />
                              <span className="ml-2">
                                &nbsp;{restaurant.aggregatedDiscountInfoV3.header}
                              </span>
                            </p>
                          </div>
                          <div className="place-name-div">
                            <div className="name">{restaurant.restaurants.info.name}</div>
                            <div className="food-items" title={restaurant.cuisines}></div>
                          </div>
                          <div className="info-div">
                            <div className="rating">
                              <span className="icon-star">
                                <i className="fa-solid fa-star" />
                              </span>
                              <span />
                            </div>
                            &nbsp;&nbsp;{restaurant.rating}
                            <div> &nbsp; &nbsp;•</div>
                            <div> &nbsp;{restaurant.sla.slaString}</div>
                          </div>
                          <div className="place-name-div">
                            <div className="food-items" title={restaurant.cuisines}>
                              {restaurant.cuisines}
                            </div>
                          </div>
                        </div>
                        <div className="quick-view">
                          <span role="button" aria-label="Open" className="view-btn">
                            Quick View
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Index;

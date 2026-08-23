import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import Offer from "../components/Offer";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <div>
            <section id="home">
                <Hero />
            </section>

            <section id="features">
                <Features />
            </section>

            <section id="categories">
                <Categories />
            </section>

            <section id="shop">
                <Offer />
            </section>

            <section id="contact">
                <Footer />
            </section>
        </div>
    );
};

export default Home;

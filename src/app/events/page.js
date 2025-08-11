'use client';
import SliderComponent from "@/components/events/eventSlider";
import Navbar from "@/components/Navbar";

export default function Events() {
    return (
        <>
        <Navbar />
        <main
            style={{
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                width: '100vw',
                height: '100vh',
            }}>
                <SliderComponent />
        </main>
        </>
    );
}
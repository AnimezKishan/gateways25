'use client';
import { LampDemo } from "@/components/about/about";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";

export default function Events() {
    return (
        <>
        <Navbar />
        <main
            style={{
                margin: 0,
                padding: 0,
                width: '100vw',
            }}>
                <LampDemo />
        </main>
        <Footer />
        </>
    );
}
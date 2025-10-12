"use client";

import Image from "next/image";

export default function AttendeeTicket() {
    const gold = "#CDA23B";

    return (
        <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: gold }}>
                Your Attendee Ticket 🎟️
            </h1>

            <p className="text-gray-400 max-w-xl mb-8">
                Welcome to <span className="font-semibold">Afro Fashion Fest 2025</span>.
                Contact the number on the screen to purchase your ticket.
                Present this ticket at the entrance to gain access to the main event.
            </p>

            <div className="relative w-80 h-90 border-2 border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src="/images/attendee-ticket.jpg" // Replace with your actual ticket image path
                    alt="Attendee Ticket"
                    fill
                    className="object-cover"
                />
            </div>

            <p className="mt-8 text-gray-500 text-sm">
                Keep this ticket safe. Your name will be verified at the gate.
            </p>
        </section>
    );
}

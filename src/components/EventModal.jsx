'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Users, MapPin, Calendar, Trophy, Clock } from 'lucide-react';
import gsap from 'gsap';

const EventModal = ({ isOpen, onClose, eventData }) => {
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleWheel = (e) => {
            // Prevent wheel events from bubbling to background when modal is open
            if (isOpen) {
                e.stopPropagation();
            }
        };

        const handleTouchMove = (e) => {
            // Prevent touch scroll events from bubbling to background when modal is open
            if (isOpen) {
                e.stopPropagation();
            }
        };

        if (isOpen && modalRef.current) {
            // Animate modal in
            gsap.set(modalRef.current, { display: 'flex' });
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.3, ease: 'power2.out' }
            );
            gsap.fromTo(contentRef.current,
                { scale: 0.8, opacity: 0, y: 50 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
            );

            // Prevent body scroll and background interactions
            document.body.style.overflow = 'hidden';

            // Add event listeners to prevent background scrolling
            document.addEventListener('wheel', handleWheel, { passive: false, capture: true });
            document.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });

        } else if (!isOpen && modalRef.current) {
            // Animate modal out
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in'
            });
            gsap.to(contentRef.current, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                duration: 0.2,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.set(modalRef.current, { display: 'none' });
                }
            });

            // Restore body scroll and remove event listeners
            document.body.style.overflow = 'unset';
            document.removeEventListener('wheel', handleWheel, { capture: true });
            document.removeEventListener('touchmove', handleTouchMove, { capture: true });
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('wheel', handleWheel, { capture: true });
            document.removeEventListener('touchmove', handleTouchMove, { capture: true });
        };
    }, [isOpen]);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleRegister = () => {
        // You can implement registration logic here
        alert('Registration functionality to be implemented!');
    };

    if (!eventData) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 z-[100] items-center justify-center"
            style={{ display: 'none' }}
        >
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={handleOverlayClick}
            />

            {/* Modal Content */}
            <div
                ref={contentRef}
                className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-purple-900/20 to-black border border-cyan-500/30 rounded-lg shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #0f0f0f 0%, #1a0033 25%, #000011 50%, #001122 75%, #000000 100%)',
                    boxShadow: '0 0 50px rgba(0, 255, 255, 0.3), inset 0 0 50px rgba(139, 69, 19, 0.1)'
                }}
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 hover:bg-cyan-500/10 rounded-full"
                >
                    <X size={24} />
                </button>

                {/* Glitch Border Effect */}
                <div className="absolute inset-0 rounded-lg opacity-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>

                {/* Content */}
                <div className="relative p-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                            <span className="text-cyan-400 text-sm font-mono uppercase tracking-widest">
                                {eventData.Type} Event
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00FFFF] via-[#6FFF00] to-[#D4FF00] bg-clip-text text-transparent mb-3 font-mono">
                            {eventData["Event Name"]}
                        </h1>
                        <div className="text-gray-400 text-lg font-light">
                            {eventData.Events}
                        </div>
                    </div>

                    {/* Event Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <div className="bg-black/40 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-500/40 transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <Users className="text-[#D4FF00]" size={20} />
                                <span className="text-[#D4FF00] text-sm font-mono">Team Size</span>

                            </div>
                            <div className="text-white font-bold">{eventData["Team Size"]}</div>
                        </div>

                        <div className="bg-black/40 border border-purple-500/20 rounded-lg p-4 hover:border-purple-500/40 transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <Trophy className="text-[#D4FF00]" size={20} />
                                <span className="text-[#D4FF00] text-sm font-mono">Prize Pool</span>
                            </div>
                            <div className="text-white font-bold">₹{eventData["Prize Pool"]?.toLocaleString()}</div>
                        </div>

                        <div className="bg-black/40 border border-pink-500/20 rounded-lg p-4 hover:border-pink-500/40 transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <MapPin className="text-[#D4FF00]" size={20} />
                                <span className="text-[#D4FF00] text-sm font-mono">Venue</span>
                            </div>
                            <div className="text-white font-bold">{eventData.Venue}</div>
                        </div>

                        <div className="bg-black/40 border border-yellow-500/20 rounded-lg p-4 hover:border-yellow-500/40 transition-colors duration-300">
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="text-[#D4FF00]" size={20} />
                                <span className="text-[#D4FF00] text-sm font-mono">Date</span>
                            </div>
                            <div className="text-white font-bold">{eventData["Date (tentative)"]}</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h3 className="text-xl font-bold mb-4 font-mono flex items-center gap-2">
                            <div className="w-1 h-6 bg-gradient-to-b from-[#00FFFF] via-[#6FFF00] to-[#D4FF00]" />
                            <span className="bg-gradient-to-r from-[#00FFFF] via-[#6FFF00] to-[#D4FF00] bg-clip-text text-transparent">
                                Event Description
                            </span>
                        </h3>

                        <div className="bg-black/20 border border-gray-700/50 rounded-lg p-6">
                            <p className="text-gray-300 leading-relaxed font-light">
                                {eventData.Description}
                            </p>
                        </div>
                    </div>

                    {/* Event Heads */}
                    {eventData["Event Heads"] && eventData["Event Heads"].length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4 font-mono flex items-center gap-2">
                                <div className="w-1 h-6 bg-gradient-to-b from-[#00FFFF] via-[#6FFF00] to-[#D4FF00]" />
                                <span className="bg-gradient-to-r from-[#00FFFF] via-[#6FFF00] to-[#D4FF00] bg-clip-text text-transparent">
                                    Event Coordinators
                                </span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {eventData["Event Heads"].map((head, index) => (
                                    <div key={index} className="bg-black/30 border border-gray-700/30 rounded-lg p-4 hover:border-purple-500/40 transition-colors duration-300">
                                        <div className="text-white font-semibold mb-1">{head.Name}</div>
                                        <div className="text-gray-400 text-sm mb-2">{head.Class}</div>
                                        {head.Contact && (
                                            <div className="text-cyan-400 text-sm font-mono">{head.Contact}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Additional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-black/20 border border-gray-700/30 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="text-[#D4FF00]" size={16} />
                                <span className="text-[#D4FF00] text-sm font-mono">Registration</span>
                            </div>
                            <div className="text-white">{eventData.Registration}</div>
                        </div>

                        {eventData.Eligibility && (
                            <div className="bg-black/20 border border-gray-700/30 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Users className="text-[#D4FF00]" size={16} />
                                    <span className="text-[#D4FF00] text-sm font-mono">Eligibility</span>
                                </div>
                                <div className="text-white">{eventData.Eligibility}</div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleRegister}
                            className="flex-1 bg-gradient-to-r  from-[#00FFFF] via-[#6FFF00] to-[#D4FF00] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-cyan-500/25 font-mono uppercase tracking-wider"
                        >
                            Register Now
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 sm:flex-none bg-transparent border-2 border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-bold py-4 px-8 rounded-lg transition-all cursor-pointer duration-300 font-mono uppercase tracking-wider"
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* Animated Corner Accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-400/50 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-pink-400/50 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-yellow-400/50 rounded-br-lg" />
            </div>
        </div>
    );
};

export default EventModal;

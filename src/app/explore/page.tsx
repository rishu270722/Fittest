"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Coins, Trophy, Flame, Users, Search,
    Gift, Calendar, Star, ChevronRight, Check,
    X
} from 'lucide-react';
import Link from 'next/link';
import { BrowserProvider, ethers } from 'ethers';
import contractAddress from "../contractInfo/contractAddress.json"
import contractAbi from "../contractInfo/contractAbi.json"

declare global {
    interface Window {
        ethereum?: {
            isMetaMask: boolean;
            request: (args: { method: string; params?: any[] }) => Promise<any>;
        };
    }
}

const ExplorePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [claimedDay, setClaimedDay] = useState<number | null>(null);
    const [showReward, setShowReward] = useState(false);
    const [bookingTrainer, setBookingTrainer] = useState<any>(null)
    const [walletAddress, setWalletAddress] = useState('');
    const [walletConnected, setWalletConnected] = useState(false);


    const connectWallet = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setWalletAddress(accounts[0]);
                setWalletConnected(true);
            } catch (error) {
                console.error("Error connecting to wallet:", error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    };


    const handleBookSession = (trainer: any) => {
        setBookingTrainer(trainer);
    };

    const handleConfirmBooking = () => {
        // Here you would handle the actual booking logic
        setBookingTrainer(null);
        // You could show a success message or handle the booking confirmation
        deposit()
    };

    const dailyRewards = [
        { day: 1, coins: 10, claimed: true },
        { day: 2, coins: 15, claimed: true },
        { day: 3, coins: 20, claimed: true },
        { day: 4, coins: 25, claimed: false },
        { day: 5, coins: 30, claimed: false },
        { day: 6, coins: 35, claimed: false },
        { day: 7, coins: 50, claimed: false },
    ];

    const handleClaim = (day: number, coins: number) => {
        if (!dailyRewards[day - 1].claimed) {
            setClaimedDay(day);
            setShowReward(true);
            withdraw(dailyRewards[day - 1].coins)
            setTimeout(() => {
                setShowReward(false);
                // setClaimedDay(null);
            }, 2000);
        }
    };

    const deposit = async ()=> {
        const {abi} = contractAbi;
        if(!window.ethereum){
            return
        }
        const provider = new BrowserProvider(window.ethereum);
        console.log(bookingTrainer, "===============")
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const bounceContract = new ethers.Contract(contractAddress.address, abi, signer)
    
        await (await bounceContract.donate(address,"0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe", ethers.parseUnits(bookingTrainer.coins.toString(), 18))).wait();
      
      }
      const withdraw = async (amount:any)=> {
        if(!window.ethereum){
            return
        }
        const {abi} = contractAbi;
        const provider = new BrowserProvider(window.ethereum);
    
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const bounceContract = new ethers.Contract(contractAddress.address, abi, signer)
    
        await (await bounceContract.mint(address, ethers.parseUnits(amount.toString(), 18))).wait();
      
      }

    const trainers = [
        {
            name: "Alex Johnson",
            speciality: "HIIT & Strength",
            rating: 4.9,
            sessions: 120,
            coins: 50,
            image: "https://img.freepik.com/premium-photo/3d-style-avatar-profile-picture-featuring-male-character-generative-ai_739548-13622.jpg?w=740"
        },
        {
            name: "Mike Chen",
            speciality: "Yoga & Meditation",
            rating: 4.8,
            sessions: 200,
            coins: 45,
            image: "https://img.freepik.com/premium-photo/3d-style-avatar-profile-picture-featuring-male-character-generative-ai_739548-13625.jpg?w=740"
        },
        {
            name: "Lisa Peterson",
            speciality: "CrossFit Expert",
            rating: 4.7,
            sessions: 150,
            coins: 55,
            image: "https://img.freepik.com/premium-photo/cartoon-character-girl-with-her-arms-crossed_978914-10311.jpg?w=740"
        }
    ];

    const statsCards = [
        {
            title: "Daily Streak",
            value: "7 Days",
            icon: Flame,
            color: "from-orange-500 to-red-500"
        },
        {
            title: "Bonus Points",
            value: "2,450",
            icon: Trophy,
            color: "from-yellow-500 to-orange-500"
        },
        {
            title: "Available Coins",
            value: "150",
            icon: Coins,
            color: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <div className="min-h-screen bg-black">
            {/* Navbar */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm"
            >
                <div className="container mx-auto px-6 py-2">
                    <nav className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-12">
                            <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="text-white text-3xl font-extrabold tracking-wide"
                            >
                                Fittest
                            </motion.div>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            {!walletConnected ? (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                                    onClick={connectWallet}
                                >
                                    Connect Wallet
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                                >
                                    <span >{walletAddress.slice(0, 5) + '...' + walletAddress.slice(-4)}</span>
                                </motion.button>
                            )}
                        </div>
                    </nav>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="pt-24 container mx-auto px-6">
                {/* Daily Claim Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 bg-gray-900 rounded-xl p-6 border border-gray-800"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                            <Gift className="w-6 h-6 text-purple-500" />
                            <h2 className="text-2xl font-bold text-white">Daily Rewards</h2>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="w-5 h-5 text-purple-500" />
                            <span className="text-gray-400">Current Streak: 3 days</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-4">
                        {dailyRewards.map((reward, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleClaim(reward.day, reward.coins)}
                                    className={`w-full aspect-square rounded-lg border-2 
                    ${reward.claimed || claimedDay === reward.day
                                            ? 'bg-purple-500/20 border-purple-500'
                                            : 'bg-gray-800 border-gray-700 hover:border-purple-500/50'}
                    flex flex-col items-center justify-center transition-colors`}
                                    disabled={reward.claimed}
                                >
                                    <span className="text-sm text-gray-400">Day</span>
                                    <span className="text-xl font-bold text-white">{reward.day}</span>
                                    <div className="flex items-center mt-1">
                                        <Coins className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span className="text-yellow-500">{reward.coins}</span>
                                    </div>
                                    {(reward.claimed || claimedDay === reward.day) && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 bg-purple-500 rounded-full p-1"
                                        >
                                            <Check className="w-4 h-4 text-white" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Reward popup */}
                    <AnimatePresence>
                        {showReward && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                         bg-gray-900 rounded-xl p-8 border-2 border-purple-500 shadow-2xl
                         flex flex-col items-center z-50"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, ease: "linear" }}
                                >
                                    <Star className="w-16 h-16 text-yellow-500" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mt-4">Reward Claimed!</h3>
                                <p className="text-gray-400 mt-2">
                                    {dailyRewards[claimedDay! - 1].coins} coins added to your wallet
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {statsCards.map((stat, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className="bg-gray-900 rounded-xl p-6 border border-gray-800"
                        >
                            <div className="flex items-center space-x-4">
                                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-gray-400">{stat.title}</p>
                                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Search Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-12"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search trainers by name or specialty..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-800 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500"
                        />
                    </div>
                </motion.div>

                {/* Trainers Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {trainers.map((trainer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800"
                        >
                            <img
                                src={trainer.image}
                                alt={trainer.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{trainer.name}</h3>
                                <p className="text-gray-400 mb-4">{trainer.speciality}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-purple-500" />
                                        <span className="text-gray-400">{trainer.sessions} sessions</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Coins className="w-4 h-4 text-yellow-500" />
                                        <span className="text-gray-400">{trainer.coins} coins/session</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg"
                                    onClick={() => handleBookSession(trainer)}
                                >
                                    Book Session
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Custom Booking Modal */}
                <AnimatePresence>
                    {bookingTrainer && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                onClick={() => setBookingTrainer(null)}
                            />
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-gray-900 rounded-xl p-6 border border-gray-800 w-full max-w-md relative z-50"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setBookingTrainer(null)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                {/* Modal Content */}
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Confirm Booking</h3>
                                        <p className="text-gray-400">
                                            You are about to book a session with{' '}
                                            <span className="text-white font-semibold">{bookingTrainer.name}</span>
                                        </p>
                                    </div>

                                    {/* Cost Display */}
                                    <div className="bg-gray-800 p-4 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Coins className="w-6 h-6 text-yellow-500" />
                                                <span className="text-white font-medium">Session Cost</span>
                                            </div>
                                            <span className="text-white font-bold">{bookingTrainer.coins} coins</span>
                                        </div>
                                    </div>

                                    {/* Session Details */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-gray-400">
                                            <span>Specialty</span>
                                            <span className="text-white">{bookingTrainer.speciality}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-gray-400">
                                            <span>Total Sessions</span>
                                            <span className="text-white">{bookingTrainer.sessions}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4 mt-6">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setBookingTrainer(null)}
                                            className="flex-1 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleConfirmBooking}
                                            className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                        >
                                            Confirm Booking
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ExplorePage;
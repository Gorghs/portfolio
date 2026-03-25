import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCornerDownRight } from 'react-icons/fi';
import ScrollRevealText from './ScrollRevealText';

gsap.registerPlugin(ScrollTrigger);

interface LeetCodeStats {
  username: string;
  realName: string;
  avatar: string;
  badges: number;
  reputation: number;
  problemsSolved: {
    All: number;
    Easy: number;
    Medium: number;
    Hard: number;
  };
  acceptanceRate: number;
  ranking: number;
  totalProblems: number;
  contributionPoints: number;
}

const LeetCodeProfile: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);

  const leetcodeUsername = 'gorghs';
  const leetcodeProfileUrl = 'https://leetcode.com/u/gorghs/';

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        // Try using Alfa LeetCode API (CORS-friendly alternative)
        const apiUrl = `https://leetcode-api-fxckht.vercel.app/${leetcodeUsername}`;

        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error('Failed to fetch LeetCode data');

        const userData = await response.json();

        if (!userData || userData.status === 'error') {
          throw new Error('User not found');
        }

        // Parse response from alternative API
        const problemsSolved = {
          All: userData.totalSolved || 0,
          Easy: userData.easySolved || 0,
          Medium: userData.mediumSolved || 0,
          Hard: userData.hardSolved || 0,
        };

        const totalProblems = (userData.totalQuestions || 3500);

        setStats({
          username: userData.username || leetcodeUsername,
          realName: userData.name || 'LeetCode User',
          avatar: userData.avatar || '',
          badges: userData.badges?.length || 0,
          reputation: userData.reputation || 0,
          problemsSolved,
          acceptanceRate: parseFloat(
            (((problemsSolved.All || 0) / totalProblems) * 100).toFixed(1)
          ),
          ranking: userData.ranking || 0,
          totalProblems,
          contributionPoints: userData.contributionPoints || 0,
        });
      } catch (err) {
        console.error('LeetCode Fetch Error:', err);
        
        // Fallback: Show profile card with link even if API fails
        setStats({
          username: leetcodeUsername,
          realName: 'gorghs',
          avatar: '',
          badges: 5,
          reputation: 0,
          problemsSolved: { All: 296, Easy: 200, Medium: 64, Hard: 32 },
          acceptanceRate: 8.5,
          ranking: 0,
          totalProblems: 3500,
          contributionPoints: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leetcode"
      className="relative py-24 md:py-10 bg-white dark:bg-black font-sans text-black dark:text-white overflow-hidden min-h-screen"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        {/* --- HEADER --- */}
        <div className="mb-12 md:mb-20 relative">
          <div className="flex items-center gap-4 mb-6">
            <FiCornerDownRight className="text-red-500 w-6 h-6" />
            <span className="font-mono text-xs uppercase tracking-widest text-red-500">
              Coding // Challenges
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold uppercase tracking-tight"
          >
            <ScrollRevealText text="LEETCODE" />
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
            Real-time coding challenges and problem-solving metrics.
          </p>
        </div>

        {/* --- PROFILE SECTION --- */}
        {loading ? (
          <div className="py-24 text-center font-mono uppercase tracking-widest opacity-50 animate-pulse">
            Loading Profile...
          </div>
        ) : stats ? (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-6 pb-8 border-b border-black/20 dark:border-white/20">
              {stats.avatar && (
                <img
                  src={stats.avatar}
                  alt={stats.username}
                  className="w-20 h-20 rounded object-cover border border-black/20 dark:border-white/20"
                />
              )}
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight">
                  {stats.username}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1 font-mono">
                  {stats.realName}
                </p>
              </div>
            </div>

            {/* Compartments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Compartment 1: Easy */}
              <div className="border border-black/20 dark:border-white/20 p-6 md:p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-black mb-4">
                  Easy Problems
                </div>
                <div className="flex items-end gap-3">
                  <div className="text-5xl md:text-6xl font-bold">
                    {stats.problemsSolved.Easy}
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest opacity-60 mb-2">
                    Solved
                  </div>
                </div>
              </div>

              {/* Compartment 2: Medium */}
              <div className="border border-black/20 dark:border-white/20 p-6 md:p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-black mb-4">
                  Medium Problems
                </div>
                <div className="flex items-end gap-3">
                  <div className="text-5xl md:text-6xl font-bold">
                    {stats.problemsSolved.Medium}
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest opacity-60 mb-2">
                    Solved
                  </div>
                </div>
              </div>

              {/* Compartment 3: Hard */}
              <div className="border border-black/20 dark:border-white/20 p-6 md:p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-black mb-4">
                  Hard Problems
                </div>
                <div className="flex items-end gap-3">
                  <div className="text-5xl md:text-6xl font-bold">
                    {stats.problemsSolved.Hard}
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest opacity-60 mb-2">
                    Solved
                  </div>
                </div>
              </div>

              {/* Compartment 4: Success Rate */}
              <div className="border border-black/20 dark:border-white/20 p-6 md:p-8 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors duration-300">
                <div className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-black mb-4">
                  Success Rate
                </div>
                <div className="flex items-end gap-3">
                  <div className="text-5xl md:text-6xl font-bold">
                    {stats.acceptanceRate.toFixed(1)}%
                  </div>
                  <div className="text-sm font-mono uppercase tracking-widest opacity-60 mb-2">
                    Total
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="border border-black/20 dark:border-white/20 p-6 md:p-8 bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-black transition-colors duration-300">
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div>
                  <div className="text-2xl md:text-3xl font-bold">
                    {stats.problemsSolved.All}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 mt-2">
                    Total Solved
                  </div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold">
                    {stats.badges}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-widest text-gray-600 dark:text-gray-400 mt-2">
                    Badges
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href={leetcodeProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest text-sm hover:opacity-80 transition-opacity duration-300"
              >
                Visit LeetCode Profile
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default LeetCodeProfile;

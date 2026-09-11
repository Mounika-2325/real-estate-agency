import React, { useState, useEffect } from 'react';
import { Building2, ShieldCheck, Target, Eye, Users, Award, CheckCircle } from 'lucide-react';
import ImageFallback from '../components/ImageFallback';
import { fetchAgents } from '../services/api';

const About = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const loadAgents = async () => {
      try {
        const res = await fetchAgents();
        if (res && res.data) {
          setAgents(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadAgents();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen py-12 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">About EstatePro</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Transforming Real Estate Experiences Across <span className="text-primary-600">India</span>
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Founded with a commitment to integrity, transparency, and client satisfaction, EstatePro has grown to become India’s premier real estate consultancy. We specialize in luxury residential apartments, premium villas, independent homes, and commercial plot investments.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              Our team combines deep regional market knowledge across Hyderabad, Bangalore, Mumbai, Chennai, and Pune with cutting-edge digital search capabilities to make buying, selling, or renting properties effortless.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-900 text-sm">100% Legal Due Diligence</span>
                  <span className="text-xs text-slate-500">Verified Titles</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
                <Award className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-900 text-sm">Excellence Award</span>
                  <span className="text-xs text-slate-500">Top Consultancy 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[450px]">
              <ImageFallback
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80"
                alt="EstatePro Agency Office"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-6 rounded-3xl shadow-xl hidden sm:block max-w-xs space-y-1">
              <span className="text-2xl font-extrabold text-amber-400">12+ Years</span>
              <span className="block text-xs font-semibold text-slate-300">Of Real Estate Leadership in Indian Metro Markets</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Our Mission</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To empower homebuyers, sellers, and investors with accurate market data, 100% verified listings, and personalized professional guidance, making every transaction seamless, secure, and rewarding.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Our Vision</h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              To redefine the Indian real estate landscape through innovation, ethical practices, and customer-centric service, setting the benchmark as the most trusted property advisory brand nationwide.
            </p>
          </div>
        </div>

        {/* Expert Agents Showcase */}
        {agents.length > 0 && (
          <div className="space-y-10 pt-8">
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Our Leadership</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Meet Our Senior Property Advisors</h2>
              <p className="text-slate-500 text-sm sm:text-base">
                Experienced real estate specialists committed to helping you find your ideal property.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent._id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all space-y-4 text-center group"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden mx-auto border-4 border-slate-100 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <ImageFallback
                      src={agent.photo}
                      alt={agent.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{agent.name}</h3>
                    <p className="text-primary-600 text-xs font-semibold">{agent.designation}</p>
                  </div>
                  <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                    {agent.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;

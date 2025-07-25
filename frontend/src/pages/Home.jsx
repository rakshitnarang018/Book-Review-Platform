import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 -mx-4 -my-8">
      {/* Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-10 animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full opacity-15 animate-bounce" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        

        <div className="container mx-auto text-center max-w-6xl">
          {/* Main Hero Content */}
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">BookReview</span>
              <br />
              <span className="text-gray-800">Redefined</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              <strong>This isn't just functional – it's art.</strong><br />
              A masterpiece of UI/UX design, months of careful planning,<br />
              and countless hours of precision coding.
            </p>
            
            <div className="bg-white/30 backdrop-blur-md inline-block px-8 py-3 rounded-full mb-12 border border-white/20">
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">🏆 Award-Winning Design Excellence</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link 
              to="/books"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl text-lg font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-110 hover:shadow-2xl"
            >
              <span className="flex items-center space-x-3">
                <span>🚀</span>
                <span>Explore Books</span>
              </span>
            </Link>
            <Link 
              to="/signup"
              className="bg-white/30 backdrop-blur-md px-12 py-4 rounded-2xl text-lg font-bold text-gray-700 hover:scale-105 transition-all border-2 border-transparent hover:border-blue-300"
            >
              <span className="flex items-center space-x-3">
                <span>📚</span>
                <span>Join Community</span>
              </span>
            </Link>
          </div>

          {/* Floating Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/25 backdrop-blur-md p-8 rounded-3xl transform hover:scale-105 transition-all border border-white/20">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">500+</div>
              <div className="text-gray-600 font-semibold">Hours of Development</div>
            </div>
            <div className="bg-white/25 backdrop-blur-md p-8 rounded-3xl transform hover:scale-105 transition-all border border-white/20">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">50+</div>
              <div className="text-gray-600 font-semibold">UI Components Crafted</div>
            </div>
            <div className="bg-white/25 backdrop-blur-md p-8 rounded-3xl transform hover:scale-105 transition-all border border-white/20">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-gray-600 font-semibold">Attention to Detail</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">Engineered for Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Every pixel, every interaction, every animation has been meticulously crafted to deliver an unparalleled user experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="group bg-white/25 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/20">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Modern Design System</h3>
              <p className="text-gray-600 leading-relaxed">Custom-built components with consistent styling, smooth animations, and responsive layouts that work flawlessly across all devices.</p>
            </div>

            <div className="group bg-white/25 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/20">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Lightning Performance</h3>
              <p className="text-gray-600 leading-relaxed">Optimized code architecture with lazy loading, efficient state management, and smooth 60fps animations.</p>
            </div>

            <div className="group bg-white/25 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/20">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure Architecture</h3>
              <p className="text-gray-600 leading-relaxed">Built with security-first principles, protected routes, input validation, and secure authentication flows.</p>
            </div>

            <div className="group bg-white/25 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/20">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Mobile Excellence</h3>
              <p className="text-gray-600 leading-relaxed">Fully responsive design that feels native on every device, from mobile phones to large desktop displays.</p>
            </div>

            <div className="group bg-white/25 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/20">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🧠</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Smart UX</h3>
              <p className="text-gray-600 leading-relaxed">Intuitive user flows, smart error handling, contextual feedback, and accessibility-first design principles.</p>
            </div>

            <div className="group bg-white/25 backdrop-blur-md p-8 rounded-3xl hover:scale-105 transition-all duration-500 border border-white/20">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Purpose-Built</h3>
              <p className="text-gray-600 leading-relaxed">Every feature designed with book lovers in mind, from advanced filtering to social reviews and recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">What People Are Saying</h2>
            <p className="text-xl text-gray-600">The response has been overwhelming</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/25 backdrop-blur-md p-8 rounded-3xl transform hover:scale-105 transition-all border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-700 mb-6 italic">"This is hands down the most beautiful book review platform I've ever used. The attention to detail is incredible!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">A</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Alex Chen</div>
                  <div className="text-gray-600 text-sm">Book Enthusiast</div>
                </div>
              </div>
            </div>

            <div className="bg-white/25 backdrop-blur-md p-8 rounded-3xl transform hover:scale-105 transition-all border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-700 mb-6 italic">"The user experience is phenomenal. Every interaction feels smooth and intuitive. Clearly a lot of thought went into this."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">S</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Sarah Johnson</div>
                  <div className="text-gray-600 text-sm">UI/UX Designer</div>
                </div>
              </div>
            </div>

            <div className="bg-white/25 backdrop-blur-md p-8 rounded-3xl transform hover:scale-105 transition-all border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 text-xl">★★★★★</div>
              </div>
              <p className="text-gray-700 mb-6 italic">"I'm impressed by the technical excellence. Fast, responsive, and the animations are buttery smooth. Professional quality work!"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">M</span>
                </div>
                <div>
                  <div className="font-bold text-gray-800">Michael Rodriguez</div>
                  <div className="text-gray-600 text-sm">Software Engineer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">The Vision Behind the Code</h2>
          <div className="bg-white/25 backdrop-blur-md p-12 rounded-3xl border border-white/20">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              "BookReview isn't just another web application – it's a testament to what's possible when passion meets precision. Every line of code, every design decision, every user interaction has been carefully crafted to create something truly exceptional."
            </p>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-6">
                <span className="text-white text-2xl font-bold">RN</span>
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Made By RN</div>
                <div className="text-gray-600">Full-Stack Developer & UI/UX Designer</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
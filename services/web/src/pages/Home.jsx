function Home() {
  return (
    <div>
      {/* hero section */}
      <section
        style={{
          // background image style
          backgroundImage: "url('/learningBoard.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-gray-100 h-screen"
      >
        <div
          style={{
            // overlay style
            // backgroundColor: "rgba(255,255,255,0.6)",
          }}
          className="w-full h-full text-center flex flex-col justify-center items-center"
        >
          <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-md h- max-w-1/2">
            <h1 className="lg:text-5xl sm:text-3xl font-bold text-center text-blue-600 mb-8">
              Welcome to Learning Board
            </h1>
            <hr className="" />
            <p className="mt-4 text-center text-gray-700 text-lg">
              Your gateway to a world of knowledge and learning.
            </p>
            <p className="mt-2 text-center text-gray-700 text-lg">
              Explore courses, track your progress, and achieve your learning
              goals. Enjoy your learning journey with us!
            </p>
            <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </section>
      {/* welcome section */}
      <section className="bg-white shadow-md h-screen flex items-center justify-center">
        <div className="p-8 text-center max-w-2xl bg-blue-500 rounded-lg text-white shadow-lg w-3/4">
          <h2 className="text-3xl font-semibold mb-4 text-white">
            Empowering Learning, One Click at a Time
          </h2>
          <p className="text-white text-lg">
            At Learning Board, we believe that education is the key to unlocking
            your potential. Our platform is designed to provide you with the
            tools and resources you need to succeed in your learning journey.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;

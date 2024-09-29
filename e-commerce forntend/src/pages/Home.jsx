import aboutImg from "../assets/hero-bcg.jpeg";
import PageHero from "../components/PageHero";

const Home = () => {
  return (
    <main>
      <PageHero />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <img
            src={aboutImg}
            alt="nice desk"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <article>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="w-20 h-1 bg-indigo-600 mt-2"></div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
};

export default Home;

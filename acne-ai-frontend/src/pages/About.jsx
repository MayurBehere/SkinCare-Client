
import Navbar from "../custom/Navbar"

const Landing = () => {




  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
        <Navbar />
        <section className="mt-24 flex flex-col gap-8">
            <div className="flex">
            <h2 className="mt-2 font-bold text-2xl md:text-4xl text-black">
                What is DermaAI ?
            </h2>
            </div>
            <div>
                <p className="text-lg">
                DermaAI is an innovative AI-driven platform designed to revolutionize acne detection and treatment. 
                Leveraging advanced artificial intelligence, our system provides precise skin analysis and develops 
                customized treatment strategies tailored to individual needs. By combining cutting-edge technology with 
                dermatological expertise, DermaAI  empowers users to monitor their skin health and achieve effective, 
                evidence-based results—all from a convenient, accessible interface. Transform your skincare journey with DermaAI.
                </p>
            </div>

            <div className="flex">
                <h2 className="mt-2 font-bold text-2xl md:text-4xl text-black">
                    Our mission
                </h2>
            </div>
            <div>
                <p className="text-lg">
                At DermaAI, our mission is to democratize access to professional-grade skincare solutions. We believe everyone 
                deserves clear, healthy skin without the complexity or cost of traditional methods. By harnessing AI technology, 
                we aim to deliver accurate diagnostics, personalized care, and ongoing support, making advanced skincare both 
                attainable and affordable.
                </p>
            </div>

            <div className="flex">
                <h2 className="mt-2 font-bold text-2xl md:text-4xl text-black">
                    Our Technology
                </h2>
            </div>
            <div>
                <p className="text-lg">
                DermaAI is powered by state-of-the-art machine learning algorithms trained on vast datasets of dermatological 
                imagery and research. Our system identifies acne with clinical-level accuracy, distinguishing between types like 
                cystic, hormonal, or comedonal acne. Paired with a robust database of treatment protocols, DermaAI ensures every 
                recommendation is precise and scientifically validated.
                </p>
            </div>
        </section>

        <div className="h-[2px] bg-gray-200 rounded-full mt-16"></div>

       
    </div>
  );
};

export default Landing;
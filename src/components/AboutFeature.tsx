function AboutFeature() {
  return (
    <div className="bg-[#f8f8fb] py-6 md:py-10 font-clarity ">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div></div>
          <h2 className="max-w-lg mb-6  text-2xl md:text-4xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            The values that drives everything we do
          </h2>
          <p className="text-base text-slate-700 md:px-14 ">
          Our vision is to unlock these six core values in the life of <br /> legal professionals through technology.
          </p>
        </div>
        <div className="grid  gap-8  sm:grid-cols-1 lg:grid-cols-3 px-5 md:px-20">
          <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
                <img src="/about1.svg" alt="" />
              </div>
              <h6 className="mb-5 text-xl font-bold ">Integration</h6>
              <p className="mb-5 text-base text-slate-500 leading-6">
              Inculcate technology into your workflow, ensuring smooth operation.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
                <img src="/about2.svg" alt="" />
              </div>
              <h6 className="mb-5 text-xl font-bold ">Value for Investment</h6>
              <p className="mb-5 text-base text-slate-500 leading-6">
              Tangible returns on investment, that deliver functionality and ROI.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
                <img src="/about3.svg" alt="" />
              </div>
              <h6 className="mb-5 text-xl font-bold ">Innovation</h6>
              <p className="mb-5 text-base text-slate-500 leading-6">
              Push the boundaries of traditional legal practice, unlocking new possibilities.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
                <img src="/about4.svg" alt="" />
              </div>
              <h6 className="mb-5 text-xl font-bold ">Collaboration</h6>
              <p className="mb-5 text-base text-slate-500 leading-6">
              Foster teamwork and connectivity, enabling effortless communication.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
                <img src="/about5.svg" alt="" />
              </div>
              <h6 className="mb-5 text-xl font-bold ">Efficiency</h6>
              <p className="mb-5 text-base text-slate-500 leading-6">
              Maximise productivity, freeing up valuable time to focus on what truly matters.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between p-5 border rounded-2xl shadow-md bg-white">
            <div>
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary2 ">
                <img src="/about6.svg" alt="" />
              </div>
              <h6 className="mb-5 text-xl font-bold ">Impact</h6>
              <p className="mb-5 text-base text-slate-500 leading-6">
              Driving meaningful change in how you serve clients and achieve results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutFeature;

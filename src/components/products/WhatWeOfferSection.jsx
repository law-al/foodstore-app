function WhatWeOfferSection() {
  return (
    <section className="py-[100px] px-[150px]">
      <div className="grid grid-cols-4 gap-0">
        <div className="p-5 flex flex-col items-center">
          <img
            src={"/assets/Quality-img-2.png"}
            alt=""
            className="mb-6
          "
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">Quality Products</h2>
            <p className="text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Officiis, ipsum!
            </p>
          </div>
        </div>
        <div className="p-5 flex flex-col items-center">
          <img
            src={"/assets/Quality-img-1.png"}
            alt=""
            className="mb-6
          "
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">Online Order</h2>
            <p className="text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Officiis, ipsum!
            </p>
          </div>
        </div>
        <div className="p-5 flex flex-col items-center">
          <img
            src={"/assets/Quality-img-3.png"}
            alt=""
            className="mb-6
          "
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">Fast Delivery </h2>
            <p className="text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Officiis, ipsum!
            </p>
          </div>
        </div>
        <div className="p-5 flex flex-col items-center">
          <img
            src={"/assets/Quality-img-4.png"}
            alt=""
            className="mb-6
          "
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">24/7 Service</h2>
            <p className="text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Officiis, ipsum!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeOfferSection;

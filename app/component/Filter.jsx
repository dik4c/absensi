export default function Filter({ filterData }) {
  return (
    <div className="container-filter my-[20px]">
      {filterData.map((i, idx) => {
        return (
          <div key={idx}>
            <h1 className="font-poppins-bold text-[.7em]" key={idx}>
              {i.name} :
            </h1>

            <div className="flex gap-[8px]">
              {i.option.map((opt, index) => {
                return (
                  <div className="flex gap-[5px]" key={index + 1}>
                    <button
                      className={`btn-filter ${
                        i.filter.condition === opt ? "filter-active" : ""
                      }`}
                      onClick={() => {
                        if (i.filter.condition === opt)
                          return i.filter.set(undefined);
                        i.filter.set(opt);
                      }}
                    >
                      {opt}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function NewClient() {
  const issue = {
    reporter: {
      type: "text",
      lable: "Reporter",
      id: "reporter",
    },
    Assignee: {
      type: "text",
      lable: "Assignee",
      id: "Assignee",
    },
  };

  return (
    <>
      <div>
        <h1>New Issue</h1>
        <form>
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              Reporter
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>{" "}
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              Assignee
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              Type
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>{" "}
          <div className="relative mb-4">
            <label htmlFor="name" className="text-sm leading-7 text-gray-600">
              Description
            </label>
            <textarea
              type="text"
              id="name"
              name="name"
              className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            ></textarea>
          </div>
        </form>
        <button className="rounded border-0 bg-indigo-500 px-8 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none">
          SAVE
        </button>
      </div>
    </>
  );
}

export default NewClient;

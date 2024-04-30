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
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Reporter
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>{" "}
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Assignee
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Type
            </label>
            <input
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>{" "}
          <div class="relative mb-4">
            <label for="name" class="leading-7 text-sm text-gray-600">
              Description
            </label>
            <textarea
              type="text"
              id="name"
              name="name"
              class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </form>
        <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
          SAVE
        </button>
      </div>
    </>
  );
}

export default NewClient;

import React from "react";
import Bar from "./components/Bar";
import PostList from "./components/PostList";

const App = () => {
  return (
    <section className="px-10">
      <div className="border-1 border-slate-500 items-center justify-center flex flex-col py-4 gap-5">
        <img src="src/assets/reactQuery.svg" alt="logo" className="h-30 w-40" />
        <Bar />
      </div>
     
      <PostList />
    </section>
  );
};

export default App;
